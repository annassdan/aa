<script>
    import {onMount} from "svelte";
    import {getDocs, setDoc, collection, doc, getDoc} from "firebase/firestore";
    import {db} from "$lib/firebase";
    import {page} from '$app/stores';
    import {authStore} from "../../../store/store.js";
    import Qris from "../../../components/Qris.svelte";
    import QRCode from "@castlenine/svelte-qrcode";
    import { fade, scale, slide, fly, blur } from "svelte/transition"
    import { flip } from "svelte/animate"
    import { goto } from "$app/navigation"

    // Get the current path
    let currentPath;
    $: currentPath = $page.url.pathname;
    $: showRsvp = false;
    $: loadingRsvp = false;
    $: value = false;
    $: person = value ? '1 Orang' : '';
    $: loadingUpdateRsvp = false;


    onMount(() => {
        authStore.update(u => ({...u, currentPath: currentPath}));
        console.log(currentPath);
    });

    function closeRsvp() {
        showRsvp = false;
    }

    async function openRsvp() {
        if (loadingRsvp) {
            return;
        }

        loadingRsvp = true;
        const docRef = doc(db, "invited_guests", $authStore.user.id ? $authStore.user.id : 'Default');
        const docSnap = await getDoc(docRef);
        if (!docSnap.data() || docSnap.data() === null) {
            loadingRsvp = false;
        } else {
            authStore.update(u => ({
                ...u,
                user: {
                    ...u.user,
                    ...docSnap.data()
                }
            }));
            value = docSnap.data().attend;
            setTimeout(() => person = docSnap.data().many, 100)
            showRsvp = true;
            loadingRsvp = false;
        }
    }


    function formatCurrency(event) {
        let input = event.target.value.replace(/[^0-9.]/g, '');

        // Ensure only one decimal point
        const parts = input.split('.');
        if (parts.length > 2) {
            parts[1] = parts.slice(1).join('');
            input = parts.join('.');
        }

        // Limit to two decimal places
        if (parts.length > 1) {
            parts[1] = parts[1].slice(0, 2);
            input = parts.join('.');
        }

        // Add commas for thousands
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        person = parts.join('.') + ' Orang';
    }

    function isNominalEmpty() {
        let toEvaluate = person.trim();
        return !person || toEvaluate.replaceAll('0', '') === 'Orang';
    }

    function clearCurrency() {
        if (isNominalEmpty()) {
            person = '1 Orang'
        }
    }

    async function updateRsvp() {
        loadingUpdateRsvp = true;
        const user = {
            ...$authStore.user,
            attend: value,
            many: value ? person : ''
        };

        delete user.id;
        delete user.title;
        delete user.coverName;

        let u = await setDoc(doc(collection(db, "invited_guests"), $authStore.user.id), {
            ...user
        });


        const docRef = doc(db, "invited_guests", $authStore.user.id ? $authStore.user.id : 'Default');
        const docSnap = await getDoc(docRef);
        if (docSnap.data()) {
            authStore.update(u => ({
                ...u,
                user: {
                    ...u.user,
                    ...docSnap.data()
                }
            }));
        }

        loadingUpdateRsvp = false;
    }
</script>

<div in:slide={{duration: 500, delay: 300 }} out:blur={{duration: 300}} class=" relative px-5 pt-4 flex flex-col items-center h-full bg-gradient-to-b from-wedding-200 to-pink-100 text-wedding-600 gap-5 text-sm">
    {#if showRsvp}
        <div on:click={closeRsvp}
             class="absolute flex flex-col p-3 border border-gray-300 z-40 top-0 opacity-80 bg-gray-700  w-full h-full">
        </div>
        <div class="absolute flex flex-col py-3 right-10 left-10  gap-3 px-4 py-3 items-center rounded-xl border border-gray-300 z-50 top-0 bg-gray-100 top-[10%] ">
            <div class="flex flex-col justify-center items-start gap-2 pr-2 w-full">
                <span class="font-bold text-lg">Konfirmasi kehadiran</span>
                <div class="flex flex-row items-center gap-3 mt-3">
                    <span class="icon-[icon-park-solid--people] w-11 h-6"></span>
                    <span>{$authStore.user.name}</span>
                </div>
                <div class="flex flex-row items-center gap-3">
                    <span class="icon-[ph--map-pin-duotone] w-11 h-6"></span>
                    <span>{$authStore.user.address ? $authStore.user.address : '-'}</span>
                </div>
                <label class="inline-flex items-center cursor-pointer mt-1">
                    <input type="checkbox" bind:checked={value} class="sr-only peer">
                    <div class="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-wedding-300 rounded-full peer  peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-wedding-600"></div>
                    <span class="ms-3 text-sm font-medium text-wedding-700 ">Hadir</span>
                </label>
                <div class="flex flex-row items-center gap-3 mt-1 w-full">
                    <span class="icon-[fluent--people-checkmark-16-filled] w-11 h-6"></span>
                    <input type="text" bind:value={person} on:blur={clearCurrency} on:input={formatCurrency}
                           class="flex-grow w-full outline-wedding-500 bg-wedding-50 border border-wedding-300 text-wedding-700 placeholder-wedding-300  text-sm rounded-lg focus:ring-wedding-500 focus:border-wedding-500 block w-full p-2.5"
                           placeholder="Jumlah kehadiran...">
                </div>
                <div class="flex flex-row justify-end w-full gap-2 pt-1 pb-2">
                    <div class="flex flex-row gap-2">
                        {#if $authStore.user.attend}
                            <a href="#"
                               class="w-fit rounded-full justify-center text-sm text-center text-white bg-gray-500 hover:bg-pink-800  focus:ring-4 focus:outline-none focus:ring-pink-300 ">
                                <div class="flex mt-2 flex-col  items-center px-2">
                                    <span class="icon-[fluent--print-28-filled] w-5 h-5"></span>
                                </div>
                            </a>
                        {/if}

                        <a href="#" on:click={updateRsvp}
                           class="w-32 items-center pl-3 w-full pr-4 py-2 text-sm text-center text-white bg-wedding-500 hover:bg-wedding-600 rounded-lg  focus:ring-4 focus:outline-none focus:ring-wedding-300 ">
                            <div class="flex flex-row gap-2 justify-between">
                                <span>Konfirmasi</span>
                                {#if loadingUpdateRsvp}
                                    <span class="icon-[line-md--loading-twotone-loop] w-5 h-5"></span>
                                {:else}
                                    <span class="icon-[line-md--circle-filled-to-confirm-circle-filled-transition] w-5 h-5"></span>
                                {/if}
                            </div>
                        </a>
                    </div>

                </div>

            </div>

        </div>
    {/if}

    <div class="relative w-full pt-4 pb-3 px-3 bg-wedding-100  border border-wedding-200 rounded-lg  flex gap-3 flex-col ">
        <div class="flex flex-row items-center justify-between  text-pink-700">
            <div class="flex gap-1 items-center">
                <span class="icon-[mdi--ring] w-8 h-8 "></span>
                <div class="font-bold flex flex-col">
                    <h5 class="text-xl font-bold ">Akad Nikah</h5>
                    <i class="text-[0.6rem] -mt-2 text-wedding-500">Khusus Keluarga</i>
                </div>
            </div>
        </div>
        <div class="flex flex-col gap-1 text-wedding-500 ml-1 z-10">
            <div class="flex flex-row items-center gap-2">
                <span class="icon-[stash--calendar-solid] w-6 h-6"></span>
                <span class="font-bold">Senin, 28 Oktober 2024</span>
            </div>
            <div class="flex flex-row items-center gap-2">
                <span class="icon-[material-symbols--timelapse-rounded] w-6 h-6"></span>
                <span class="font-bold">Pukul 09.00 WIB</span>
            </div>
            <div class="flex w-fit mt-2">
                <a href="https://maps.app.goo.gl/k6Sfd63ZyJEVqdeS9" target="_blank"
                   class="items-center pl-3 pr-4 py-2 text-sm text-center text-white bg-wedding-500 hover:bg-wedding-600 rounded-lg  focus:ring-4 focus:outline-none focus:ring-wedding-300 ">
                    <div class="flex flex-row gap-2">
                        <span>KUA Gayungan Surabaya</span>
                        <!--                        <span class="icon-[logos&#45;&#45;google-maps] w-5 h-5 "></span>-->
                        <span class="icon-[line-md--map-marker-filled-loop] w-5 h-5"></span>
                    </div>
                </a>
            </div>
        </div>

        <img src="../flower2-left.png" alt="Right Flower" class="absolute w-[40%] -right-5 -top-16 "/>

    </div>

    <div class="relative w-full pt-4 pb-3 px-3 bg-wedding-100 border border-wedding-200 rounded-lg  flex gap-3 flex-col ">
        <div class="flex flex-row items-center justify-between text-pink-700 z-10">
            <div class="flex gap-1 items-center">
                <span class="icon-[mdi--event-heart] w-8 h-8"></span>
                <h5 class="text-xl font-bold ">Resepsi</h5>
            </div>

            <div class="flex gap-2 items-center">
                <a href="#" on:click={openRsvp}
                   class="px-3 py-1 mr-1 rounded-lg flex flex-col justify-center hover:bg-wedding-600 items-center text-sm text-center text-white bg-wedding-500  focus:ring-4 focus:outline-none focus:ring-wedding-300 ">
                    <div class="flex flex-row items-center gap-2">
                        <!--                        <span class="icon-[fluent-emoji-high-contrast&#45;&#45;party-popper] w-4 h-4"></span>-->
                        <span>RSVP</span>
                        {#if loadingRsvp}
                            <span class="icon-[line-md--loading-twotone-loop] w-5 h-5"></span>
                        {:else}
                            <span class="icon-[proicons--tag-multiple]  w-4 h-4"></span>
                        {/if}

                        <!--                        <span class="icon-[mdi&#45;&#45;party-popper] w-4 h-4"></span>-->
                    </div>
                </a>
                <!--                <a  -->
            </div>

        </div>
        <div class=" flex flex-col gap-1 text-wedding-500 ml-1 z-10">
            <div class="flex flex-row items-center gap-2">
                <span class="icon-[stash--calendar-solid] w-6 h-6"></span>
                <span class="font-bold">Senin, 28 Oktober 2024</span>
            </div>
            <div class="flex flex-row items-center gap-2">
                <span class="icon-[material-symbols--timelapse-rounded] w-6 h-6"></span>
                <span class="font-bold">Pukul 15.30 - 17.30 WIB</span>
            </div>
            <div class="flex w-fit mt-2">
                <a href="https://maps.app.goo.gl/HBcM9kEkVi8YqMXVA" target="_blank"
                   class="items-center pl-3 pr-4 py-2 text-sm text-center text-white bg-wedding-500 hover:bg-wedding-600 rounded-lg hover:bg-wedding-00 focus:ring-4 focus:outline-none focus:ring-wedding-300 ">
                    <div class="flex flex-row gap-2">
                        <span>Agis Restaurant Surabaya</span>
                        <!--                        <span class="icon-[logos&#45;&#45;google-maps] w-5 h-5 "></span>-->
                        <span class="icon-[line-md--map-marker-filled-loop] w-5 h-5"></span>
                    </div>
                </a>
            </div>
        </div>


    </div>
    <div class="flex flex-col  text-center my-1 text-wrap z-10">
        <span class="text-wrap leading-snug font-bold">وَمِنْ اٰيٰتِهٖٓ اَنْ خَلَقَ لَكُمْ مِّنْ اَنْفُسِكُمْ اَزْوَاجًا لِّتَسْكُنُوْٓا اِلَيْهَا وَجَعَلَ بَيْنَكُمْ مَّوَدَّةً وَّرَحْمَةً ۗاِنَّ فِيْ ذٰلِكَ لَاٰيٰتٍ لِّقَوْمٍ يَّتَفَكَّرُوْنَ</span>
        <span class="text-wrap leading-snug mt-3">
            “Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang. Sungguh, pada yang demikian itu benar-benar terdapat tanda-tanda (kebesaran Allah) bagi kaum yang berpikir. “
        </span>
        <span class="text-wrap leading-snug mt-2">( Q.S. Ar-Rum : 21 )
        </span>
    </div>


</div>