<script>
    import "../../app.css";
    import {authStore} from "../../store/store.js";
    import {fade, scale, slide} from "svelte/transition"
    import {goto} from "$app/navigation";
    import {onDestroy, onMount} from "svelte";

    $: home = ($authStore.currentPath === '/' || $authStore.currentPath === '/wedding/date' ? 'bg-pink-700 hover:bg-pink-700 focus:ring-pink-300' : 'bg-wedding-400');
    $: couple = ($authStore.currentPath === '/wedding/couple' ? 'bg-pink-700 hover:bg-pink-700 focus:ring-pink-300' : 'bg-wedding-400');
    $: events = ($authStore.currentPath === '/wedding/event' ? 'bg-pink-700 hover:bg-pink-700 focus:ring-pink-300' : 'bg-wedding-400');
    $: gift = ($authStore.currentPath === '/wedding/gift' ? 'bg-pink-700 hover:bg-pink-700 focus:ring-pink-300' : 'bg-wedding-400');
    $: comment = ($authStore.currentPath === '/wedding/comments' ? 'bg-pink-700 hover:bg-pink-700 focus:ring-pink-300' : 'bg-wedding-400');

    onMount(() => {
    });

    function togglePlay() {
        if (!$authStore.audioInitialized) {
            document.removeEventListener('click', togglePlay);
        }

        console.log('dsd')

        if ($authStore.play) {
            $authStore.audio.pause();
        } else {
            $authStore.audio.play();
        }
        $authStore.play = !$authStore.play;

        if (!$authStore.audioInitialized) {
            $authStore.audioInitialized = true;
        }
    }

    if (typeof document !== 'undefined') {
        if (!$authStore.play) {
            document.addEventListener('click', togglePlay);
        }
    }
</script>

<div class="w-full h-full relative text-md font-catamaran justify-center">
    <slot></slot>
    <div class="relative bottom-0 w-full flex flex-row items-center justify-center z-40">

        <div in:slide={{delay: 400, duration: 400}}
             class="fixed justify-center  flex flex-col items-center bottom-3 z-50 w-full px-3 max-w-[50rem]">
            <div class="w-full p-3 border border-wedding-100 flex flex-row justify-between rounded-lg bg-wedding-100">
                <div on:click={togglePlay} class="absolute text-gray-500 right-6 bottom-[5.1rem]">
                    {#if $authStore.play}
                        <span class="icon-[solar--pause-circle-bold-duotone] w-10 h-10 "></span>
                    {:else}
                        <span class="icon-[solar--play-circle-bold-duotone] w-10 h-10 "></span>
                    {/if}
                </div>
                <a href="/"
                   class="focus:ring-4 focus:outline-none w-10 h-10 flex items-center justify-center rounded-full {home}">
                    <span class="icon-[mage--home-3-fill] text-white w-5 h-5"></span>
                </a>
                <a href="/wedding/couple"
                   class=" focus:ring-4 focus:outline-none  w-10 h-10 flex items-center justify-center rounded-full {couple}">
                    <span class="icon-[mingcute--love-fill] text-white w-5 h-5"></span>
                </a>
                <a href="/wedding/event"
                   class="focus:ring-4 focus:outline-none  w-10 h-10 flex items-center justify-center rounded-full {events}">
                    <span class="icon-[material-symbols-light--event-note-rounded] text-white w-5 h-5"></span>
                </a>
                <a href="/wedding/gift"
                   class="focus:ring-4 focus:outline-none w-10 h-10 flex items-center justify-center rounded-full {gift}">
                    <span class="icon-[fa--gift] text-white h-5 w-5"></span>
                </a>
                <a href="/wedding/comments"
                   class=" focus:ring-4 focus:outline-none  w-10 h-10 flex items-center justify-center rounded-full {comment}">
                    <span class="icon-[solar--chat-round-line-bold] text-white h-5 w-5"></span>
                </a>
            </div>
        </div>

    </div>

</div>