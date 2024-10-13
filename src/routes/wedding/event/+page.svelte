<script>
    import {onMount} from "svelte";
    import {getDocs, collection, doc} from "firebase/firestore";
    import {db} from "$lib/firebase";
    import { page } from '$app/stores';
    import {authStore} from "../../../store/store.js";

    // Get the current path
    let currentPath;
    $: currentPath = $page.url.pathname;

    onMount(() => {
        authStore.update(u => ({ ...u, currentPath: currentPath }));
        console.log(currentPath);
    })
</script>

<div class=" relative px-5 pt-4 flex flex-col items-center h-full bg-gradient-to-b from-wedding-200 to-pink-100 text-wedding-600 gap-5 text-sm">
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
                <a href="#"
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
                <a href="#"
                   class="px-3 py-1 mr-1 rounded-lg flex flex-col justify-center hover:bg-wedding-600 items-center text-sm text-center text-white bg-wedding-500  focus:ring-4 focus:outline-none focus:ring-wedding-300 ">
                    <div class="flex flex-row items-center gap-2">
<!--                        <span class="icon-[fluent-emoji-high-contrast&#45;&#45;party-popper] w-4 h-4"></span>-->
                        <span>RSVP</span>
                        <span class="icon-[proicons--tag-multiple]  w-4 h-4"></span>
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
                <a href="#"
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