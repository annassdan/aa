<script>
    import {authStore} from "../store/store.js";
    import { fade, scale, slide } from "svelte/transition"
    import { flip } from "svelte/animate"
    import { goto } from "$app/navigation"

    function openInvite() {
        goto('/wedding/date');

    }

</script>

<div out:slide={{duration: 1000 }} class="relative flex px-3 flex-col justify-center items-center h-full bg-gradient-to-b from-wedding-200 to-pink-100 pb-10">


    <img  src="aa.png" alt="Anis Annas" class="w-[39%] max-w-80"/>
    <span class=" text-xl text-wedding-600 pt-4 font-bold">Pernikahan</span>
    <span class="font-lobster font-bold text-4xl text-pink-600 py-6">Anis & Annas</span>
    <span class=" text-wedding-600 pt-2 ">{$authStore.user.title}</span>
    <span class=" text-wedding-600 font-bold -mt-1">{$authStore.user.coverName}</span>
    <a href="/wedding/date" on:click={openInvite}
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