<script>
    import {onMount} from "svelte";
    import {getDocs, collection, doc} from "firebase/firestore";
    import {db} from "$lib/firebase";
    import { page } from '$app/stores';
    import {authStore} from "../../../store/store.js";

    // Get the current path
    let currentPath;
    $: currentPath = $page.url.pathname;
    setInterval(updateCountdown, 1000);

    onMount(() => {
        authStore.update(u => ({ ...u, currentPath: currentPath }));
        console.log(currentPath);
    })

    let timeLeft = {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0
    };

    const weddingDate = new Date('2024-10-28T15:30:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = weddingDate - now;

        timeLeft = {
            days: Math.floor(difference / (1000 * 60 * 60 * 24)),
            hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
            minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
            seconds: Math.floor((difference % (1000 * 60)) / 1000)
        };

        if (difference < 0) {
            timeLeft = {days: 0, hours: 0, minutes: 0, seconds: 0};
        }
    }
</script>

<div class="flex flex-col  items-center h-full bg-gradient-to-t from-wedding-200 to-pink-100">
    <img src="../flower-top-left.png" alt="Flower Left" class="absolute left-0 top-0 w-[35%] "/>
    <img src="../flower-top-right.png" alt="Flower Right" class="absolute right-0 top-[50%] w-[35%]"/>
    <img src="../aa.png" alt="Anis Annas" class="w-[35%] mt-[7%]"/>
    <span class=" text-xl text-wedding-600 pt-4 font-bold">Pernikahan</span>
    <span class="font-lobster font-bold text-4xl text-wedding-600 mt-3 z-10">Anis & Annas</span>


    <div class="absolute w-full flex flex-col bottom-24 px-6 gap-3 items-center z-10">
        <span class="text-wedding-600 text-lg  bottom-[10%] font-bold">Senin, 28 Oktober 2024</span>

        <div class="grid grid-cols-4 gap-4">
            <div class="rounded-lg bg-pink-50 p-4 text-pink-600 flex flex-col font-semibold justify-center items-center">
                <span class="text-2xl">{timeLeft.days}</span>
                <span class="text-xs text-pink-950">Hari</span>
            </div>
            <div class="rounded-lg bg-pink-50 p-4 text-pink-600 flex flex-col font-semibold justify-center items-center">
                <span class="text-2xl">{timeLeft.hours}</span>
                <span class="text-xs text-pink-950">Jam</span>
            </div>
            <div class="rounded-lg bg-pink-50 p-4 text-pink-600 flex flex-col font-semibold justify-center items-center">
                <span class="text-2xl">{timeLeft.minutes}</span>
                <span class="text-xs text-pink-950">Menit</span>
            </div>
            <div class="rounded-lg bg-pink-50 p-4 text-pink-600 flex flex-col font-semibold justify-center items-center">
                <span class="text-2xl">{timeLeft.seconds}</span>
                <span class="text-xs text-pink-950">Detik</span>
            </div>
        </div>


        <a href="#" class="bottom-[2%] focus:outline-none mt-1 text-white bg-wedding-700 hover:bg-wedding-800 focus:ring-4 focus:ring-wedding-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-wedding-600 dark:hover:bg-wedding-700 dark:focus:ring-wedding-800">
            <div class="flex flex-row items-center gap-2">
                Tambahkan ke kalender
                <span class="icon-[stash--calendar-solid] w-5 h-5"></span>
            </div>
        </a>
    </div>

</div>