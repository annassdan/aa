<script>
    import {authStore} from "../store/store.js";
    import {fade, scale, slide, blur, fly, draw} from "svelte/transition"
    import {flip} from "svelte/animate"
    import {goto} from "$app/navigation"
    import {doc, getDoc} from "firebase/firestore";
    import {db} from "$lib/firebase.js";

    $: noGuest = false;
    $: showInviteCode = false;
    $: value = '';
    $: to = '';
    $: coverName = '';
    $: openingInvite = false;
    $: showAlert = false;

    async function openWithCode() {
        openingInvite = true;
        await setUser(value);

        if (!(localStorage.getItem('guest') === null || localStorage.getItem('guest') === undefined)) {
            showInviteCode = false;
            setTimeout(() => {
                openingInvite = false;
                value = '';
                openInvite()
            }, 600)
        } else {
            showAlert = true;
            openingInvite = false;
            setTimeout(() => showAlert = false, 1500);
        }
    }

    function openInvite() {
        noGuest = localStorage.getItem('guest') === null || localStorage.getItem('guest') === undefined
        if (noGuest) {
            showInviteCode = true;
        } else {
            goto('/wedding/date');
        }
    }

    async function setUser(ref) {
        const docRef = doc(db, "invited_guests", ref ? ref : 'Default');

        console.log('sads')

        const docSnap = await getDoc(docRef);
        if (docSnap.data()) {
            const user = docSnap.data();
            if (user.grup) {
                to = 'Keluarga Besar';
            } else {
                to = 'Kepada';
            }

            coverName = user.guest_name_cover ? user.guest_name_cover : user.name;
            console.log(user);
            authStore.update((u) => ({
                ...u,
                user: {
                    ...u,
                    ...user,
                    title: to,
                    coverName,
                }
            }));

            localStorage.setItem('guest', ref);

            setTimeout(() => {
                authStore.update((u) => ({
                    ...u,
                    loading: false
                }));
            }, 500)
        } else {
            if (ref || ref !== null) {
                localStorage.removeItem('guest');
            }

            to = 'Kepada Bapak/Ibu/Saudara/i';
            authStore.update((u) => ({
                ...u,
                loading: false
            }));
        }
    }

</script>

<svelte:head>
    <title>Anis & Annas</title>
</svelte:head>

<div out:slide={{duration: 1000 }}
     class="relative flex px-3 flex-col justify-center items-center h-full bg-gradient-to-b from-wedding-200 to-pink-100 pb-10">

    {#if showAlert}
        <div class="border max-w-[50rem] border-wedding-500 bg-wedding-400 absolute w-[80%] self-center top-3 p-4 mb-4 text-sm text-white rounded-lg"
             style="z-index: 1001" role="alert">
            <span class="font-medium font-bold">Kode undangan tidak ditemukan</span>
        </div>
    {/if}

    {#if showInviteCode}
        <div on:click={() => { showInviteCode = false; value = ''; }}
             class="absolute flex flex-col p-3 border border-gray-300 z-40 top-0 opacity-80 bg-gray-700  w-full h-full ">
        </div>
        <div in:blur out:slide
             class="absolute flex flex-col p-3 border  rounded-lg border-gray-300 z-40 top-40 max-w-[50rem] bg-white gap-4 w-[80%] h-fit text-sm">
            <span class="font-bold mt-3">Hanya dapat dibuka dengan Kode Undangan</span>
            <input type="text" bind:value={value}
                   class="flex-grow w-full outline-wedding-500 bg-wedding-50 border border-wedding-300 text-wedding-700 placeholder-wedding-300  text-sm rounded-lg focus:ring-wedding-500 focus:border-wedding-500 block w-full p-2.5"
                   placeholder="Masukan Kode Undangan...">
            <a href="#" on:click={openWithCode}
               class=" focus:outline-none text-white bg-wedding-700 hover:bg-wedding-800 focus:ring-4 focus:ring-wedding-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-wedding-600 dark:hover:bg-wedding-700 ">
                <div class="flex flex-row justify-between gap-2">
                    <span>
                        Buka Undangan
                    </span>

                    {#if openingInvite}
                        <span class="icon-[line-md--loading-twotone-loop] w-5 h-5"></span>
                    {:else}
                        <span class="icon-[mynaui--envelope-solid] w-5 h-5"></span>
                    {/if}
                </div>
            </a>
        </div>
    {/if}

    <img src="aa.png" alt="Anis Annas" class="w-[39%] max-w-80"/>
    <span class=" text-xl text-wedding-600 pt-4 font-bold">Pernikahan</span>
    <span class="font-lobster font-bold text-4xl text-pink-600 pt-4 pb-6">Anis & Annas</span>
    <span class=" text-wedding-600 pt-2 text-sm ">{$authStore.user.title}</span>
    <span class=" text-wedding-600 font-bold mt-1">{$authStore.user.coverName}</span>
    {#if $authStore.user.address}
        <span class=" text-wedding-600 text-xs ">{$authStore.user.address}</span>
    {/if}

    <a href="#" on:click={openInvite}
       class="mt-6 focus:outline-none text-white bg-wedding-700 hover:bg-wedding-800 focus:ring-4 focus:ring-wedding-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-wedding-600 dark:hover:bg-wedding-700 dark:focus:ring-wedding-800">
        <div class="flex flex-row items-center gap-2">
            Buka Undangan
            <span class="icon-[mynaui--envelope-solid] w-5 h-5"></span>
        </div>
    </a>

    <i class=" text-pink-500 text-xs absolute bottom-5 z-10">* Mohon maaf jika penulisan nama atau gelar tidak
        sesuai</i>
    <img src="flower-right.png" alt="Flower Right" class="absolute right-0 bottom-0 w-[35%]"/>
    <img src="flower-left.png" alt="Flower Left" class="absolute left-0 bottom-0 w-[35%]"/>
</div>