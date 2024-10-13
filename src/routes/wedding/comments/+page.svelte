<script>
    import {onMount} from "svelte";
    import {getDocs, collection, onSnapshot, addDoc} from "firebase/firestore";
    import {db} from "$lib/firebase";
    import {page} from '$app/stores';
    import {authStore} from "../../../store/store.js";

    // Get the current path
    let currentPath;
    $: currentPath = $page.url.pathname;
    $: comments = [];
    let initialized = false;
    $: value = ''

    onMount(async () => {
        authStore.update((u) => ({...u, currentPath: currentPath}));
        const commentsCollection = collection(db, 'comments');

        onSnapshot(commentsCollection, snapshot => {
            snapshot.docChanges().forEach(doc => {
                if (initialized) {
                    const index = comments.findIndex((comment) => comment.id === doc.doc.id);
                    if (doc.type === 'removed') {
                        comments.splice(index, 1);
                        comments = [ ...comments ];
                        return;
                    }

                    if (index >= 0) {
                        comments[index] = { ...comments[index], ...doc.doc.data() };
                    } else {
                        comments = [ ...comments, { ...doc.doc.data(), id: doc.doc.id } ];
                    }
                } else {
                    initialized = true;
                }
            });
        })

        const docs = await getDocs(commentsCollection);
        comments = docs.docs.map((doc, i) => ({ ...doc.data(), id: doc.id }));
    });


    async function addComment() {
        await addDoc(collection(db, "comments"), {
            name: $authStore.user.name,
            wish: value
        });
        value = ''
    }

</script>

<div class="relative px-4 pt-6 pb-24 flex flex-col items-center h-full bg-gradient-to-b from-wedding-200 to-white text-wedding-600 gap-3 text-sm">
    <img src="../flower2-left-top.png" alt="Flower Right" class="absolute left-0 top-9 w-[55%] "/>

    <div class="flex flex-row items-center justify-between text-pink-700 z-10 w-full sticky">
        <div class="flex gap-2 items-start w-full text-wedding-500">
            <span class="icon-[solar--chat-round-dots-bold] w-12 h-12"></span>

            <form class="w-full">
                <div class="w-full mb-4 border border-gray-200 rounded-lg bg-wedding-50 ">
                    <div class="px-3 py-3 bg-wedding-50 rounded-t-lg text-gray-600">
                        <label for="comment" class="sr-only">Your comment</label>
                        <textarea id="comment" rows="4" bind:value={value}
                                  class="text-wedding-600 outline-none w-full px-0 text-sm text-gray-900 bg-wedding-50 border-0   focus:ring-0 "
                                  placeholder="Hai {$authStore.user.name}, berikan ucapan terbaik ya..." required></textarea>
                    </div>
                    <div class="flex items-center justify-end px-3 pb-2 border-t  rounded-bl-lg rounded-br-lg w-full">
                        <div class="flex w-fit mt-2">
                            <a href="#" on:click={addComment}
                               class="items-center pl-3 pr-4 py-2 text-sm text-center text-white bg-wedding-500 hover:bg-wedding-600 rounded-lg focus:ring-4 focus:outline-none focus:ring-wedding-300 ">
                                <div class="flex flex-row gap-2">
                                    <span>Kirim</span>
                                    <span class="icon-[iconamoon--send-duotone] w-5 h-5"></span>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </form>


        </div>
    </div>

    <div class="flex flex-col w-full text-gray-600 gap-1 z-10">
        {#each comments as comment, i}
            <div class="flex flex-col w-full text-gray-600 z-10">
                <div class="flex flex-row gap-5">
                    <span class="icon-[fluent--people-chat-16-filled] w-10 h-10"></span>

                    <div class="flex flex-col items-start pt-2">
                        <span class="text-base font-bold">{comment.name}</span>
                        <div class="text-start my-1 text-wrap text-[0.8rem]">
                            <span class="text-wrap leading-snug">{comment.wish}</span>
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>