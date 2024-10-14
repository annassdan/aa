<script>
    import "../../app.css";
    import {authStore} from "../../store/store.js";
    import { fade, scale, slide } from "svelte/transition"
    import { flip } from "svelte/animate"
    import { goto } from "$app/navigation"

    function go(link) {
        goto(link);
    }

</script>

<div class="w-full h-full relative text-md font-catamaran justify-center">
    <slot></slot>
    <div class="fixe bottom-0 w-full flex flex-row items-center justify-center">
        <div in:slide={{delay: 400, duration: 400}} class="fixed justify-center  flex flex-col items-center bottom-3 z-50 w-full px-3 max-w-[50rem]">
            <div class="w-full p-3 border border-wedding-100 flex flex-row justify-between rounded-lg bg-wedding-100">
                <a href="/"  class="hover:bg-wedding-800 focus:ring-4 focus:outline-none focus:ring-wedding-300 w-10 h-10 flex items-center justify-center rounded-full {$authStore.currentPath === '/wedding/date' ? 'bg-wedding-800' : 'bg-wedding-400'}" >
                    <span class="icon-[mage--home-3-fill] text-white w-5 h-5"></span>
                </a>
                <a href="#" on:click={() => go('/wedding/couple')} class="hover:bg-wedding-800 focus:ring-4 focus:outline-none focus:ring-wedding-300 w-10 h-10 flex items-center justify-center rounded-full {$authStore.currentPath === '/wedding/couple' ? 'bg-wedding-800' : 'bg-wedding-400'}">
                    <span class="icon-[mingcute--love-fill] text-white w-5 h-5"></span>
                </a>
                <a href="#" on:click={() => go('/wedding/event')} class="hover:bg-wedding-800 focus:ring-4 focus:outline-none focus:ring-wedding-300 w-10 h-10 flex items-center justify-center rounded-full {$authStore.currentPath === '/wedding/event' ? 'bg-wedding-800' : 'bg-wedding-400'}">
                    <span class="icon-[material-symbols-light--event-note-rounded] text-white w-5 h-5"></span>
                </a>
                <a href="/wedding/gift" class="hover:bg-wedding-800 focus:ring-4 focus:outline-none focus:ring-wedding-300 w-10 h-10 flex items-center justify-center rounded-full {$authStore.currentPath === '/wedding/gift' ? 'bg-wedding-800' : 'bg-wedding-400'}">
                    <span class="icon-[fa--gift] text-white h-5 w-5"></span>
                </a>
                <a href="/wedding/comments" class="hover:bg-wedding-800 focus:ring-4 focus:outline-none focus:ring-wedding-300 w-10 h-10 flex items-center justify-center rounded-full {$authStore.currentPath === '/wedding/comments' ? 'bg-wedding-800' : 'bg-wedding-400'}">
                    <span class="icon-[solar--chat-round-line-bold] text-white h-5 w-5"></span>
                </a>
            </div>
        </div>

    </div>

</div>