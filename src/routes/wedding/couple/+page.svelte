<script>
    import {onMount} from "svelte";
    import {getDocs, collection, doc} from "firebase/firestore";
    import {db} from "$lib/firebase";
    import { page } from '$app/stores';
    import {authStore} from "../../../store/store.js";
    import { fade, scale, slide, fly, blur } from "svelte/transition"
    import { flip } from "svelte/animate"
    import { goto } from "$app/navigation"

    // Get the current path
    let currentPath;
    $: currentPath = $page.url.pathname;

    onMount(() => {
        authStore.update(u => ({ ...u, currentPath: currentPath }));
        console.log(currentPath);
    })

</script>

<div in:slide={{duration: 500, delay: 300 }} out:blur={{duration: 300}} class="flex flex-col items-center h-full bg-gradient-to-t from-wedding-200 to-pink-100 text-wedding-600 gap-5 text-sm">
    <div class=" w-full flex flex-col items-center mt-2 gap-1 px-4 ">
        <img src="../bismillah.png" alt="Bismillah" class="w-[40%] max-w-80"/>
        <div class="text-center">
            <span class="font-bold text-xl">Assalamu'alaikum Warahmatullahi</span>
        </div>
        <div class="text-center my-1 text-wrap">
            <span class="text-wrap leading-snug">Dengan memohon rahmat dan ridho</span>
            <span>Allah Subhanahu Wa Ta’ala, </span>
            <span>Insya Allah kami akan menyelenggarakan Acara Pernikahan :</span>
        </div>
    </div>

    <div class="flex flex-col items-center gap-6 text-sm">
        <div class="relative flex flex-col items-center gap-1 text-xs">
            <img src="../anis.png" alt="Anis" class="w-[27%] "/>
            <span class="font-lobster text-lg z-10 text-pink-600 mt-1">Fransiska Yudha Nugrahaniseta</span>
            <span class="-mt-1">Putri dari</span>
            <i class="-mt-1">Bapak Pudjo Wahyudi dan Ibu Linda Rosdianati (Almh)</i>
            <img src="../flower-right.png" alt="Flower Right" class="absolute right-0 bottom-0 w-[35%] z-0"/>
        </div>
        <span class="font-lobster text-4xl">&</span>
        <div class="relative flex flex-col items-center gap-1 text-xs">
            <img src="../annas.png" alt="Anis" class="w-[27%]"/>
            <span class="font-lobster text-lg text-pink-600 mt-1">Muhammad Nur Annas</span>
            <span class="-mt-1">Putra dari</span>
            <i class="-mt-1">Bapak La Pure (Alm) dan Ibu Nurhayati</i>
            <img src="../flower-left.png" alt="Flower Right" class="absolute left-0 bottom-0 w-[35%] "/>
        </div>

    </div>
    <!--    <img src="flower-top-left.png" alt="Flower Left" class="absolute left-0 top-0 w-[35%] "/>-->
    <!--    <img src="flower-top-right.png" alt="Flower Right" class="absolute right-0 top-[50%] w-[35%]"/>-->
    <!--    <img src="aa.png" alt="Anis Annas" class="w-[39%] mt-[7%]"/>-->


</div>