<script>
    import "../app.css";
    import {onMount} from "svelte";
    import {getDoc, collection, doc} from "firebase/firestore";
    import {db} from "$lib/firebase";
    import {page} from '$app/stores';
    import {authStore} from "../store/store.js";
    import { fade, scale, slide } from "svelte/transition"
    import {goto} from "$app/navigation";

    $: ref = $page.url.searchParams.get('ref');
    $: currentPath = $page.url.pathname;
    $: to = '';
    $: coverName = '';

    onMount(async () => {
        if (!ref || ref === null) {
            ref = localStorage.getItem('guest');
            to = 'Kepada Bapak/Ibu/Saudara/i';
            coverName = 'Tamu Undangan'
            await setUser();
        } else {
            await setUser();
            $authStore.loading = false;
        }

        if ((currentPath !== '/' && currentPath !== '/kinkin') && (localStorage.getItem('guest') === null) || localStorage.getItem('guest') === undefined) {
            await goto('/');
        }
    });

    async function setUser() {
        const docRef = doc(db, "invited_guests", ref ? ref : 'Default');

        const docSnap = await getDoc(docRef);
        if (docSnap.data() && ref && ref !== null) {
            const user = docSnap.data();
            if (user.grup) {
                to = 'Kepada Bapak/Ibu/Saudara/i';
            } else {
                to = 'Kepada';
            }

            coverName = user.guest_name_cover ? user.guest_name_cover : user.name;
            authStore.update((u) => ({
                ...u,
                user: {
                    id: ref,
                    name: user.name,
                    title: to,
                    attend: user.attend,
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

<div class="relative w-full h-full relative text-md font-catamaran ">
    {#if $authStore.loading}
        <div out:fade={{duration: 400}} class="absolute w-full h-full bg-gradient-to-b from-wedding-200 to-pink-100 flex flex-col justify-center items-center" style="z-index: 999">
            <span class="font-lobster font-bold text-4xl text-pink-600 py-6">Anis & Annas</span>
            <span class="icon-[line-md--loading-loop] w-10 h-10 text-pink-700"></span>
        </div>
    {/if}
    <slot></slot>
</div>




