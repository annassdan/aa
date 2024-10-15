<script>
    import {fade, scale, slide, blur, fly, draw} from "svelte/transition";
    import {onMount} from "svelte";
    import {authStore} from "../../store/store.js";
    import {collection, getDocs, onSnapshot} from "firebase/firestore";
    import {db} from "$lib/firebase.js";
    import {goto} from "$app/navigation";

    $: comments = [];
    let initialized = false;
    $: value = '';
    $: showAlert = false;
    $: alertMessage = '';

    onMount(async () => {
        const commentsCollection = collection(db, 'invited_guests');

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


    function copyCode(code) {
        showAlert = false;
        showAlert = true;
        alertMessage = 'Kode undangan tersalin';
        navigator.clipboard.writeText(code)

        setTimeout(() => { showAlert = false}, 1500)
    }

    function copyLink(code) {
        const url = `www.anisannas.com/?ref=${code}`;
        console.log(url);
        showAlert = false;
        showAlert = true;
        alertMessage = 'Link undangan tersalin';
        navigator.clipboard.writeText(url)

        setTimeout(() => { showAlert = false}, 1500)

    }

    function share(code, name, grup) {
        const url = `https://anisannas.com/?ref=${code}`;
        console.log(url);

        if (navigator.share) {
            navigator.share({
                title: 'Pernikahan Anis & Annas',
                text: `*Pernikanan Anis & Annas*\n\n${grup ? '' : 'Hai '}${name}, klik alamat berikut untuk membuka undangan${grup ? '' : 'mu'}.\n`,
                url: url,
            }).then(() => console.log('Content shared successfully!'))
                .catch((error) => console.error('Error sharing content:', error));

        }
    }

    function preview(comment) {
        const url = `https://anisannas.com/?ref=${comment.code}`;
        window.open(url, '_blank');
    }

</script>

<svelte:head>
    <title>KinKin</title>
</svelte:head>

<div out:fade={{duration: 600 }}
     class="relative flex px-3 flex-col justify-start pt-10 gap-4 items-center h-full bg-gradient-to-b from-wedding-200 to-pink-100 pb-10">

    {#if showAlert}
        <div class="border max-w-[50rem] border-wedding-500 bg-wedding-400 absolute w-[80%] self-center top-3 p-4 mb-4 text-sm text-white rounded-lg"
             style="z-index: 1001" role="alert">
            <span class="font-medium font-bold">Kode Undangan tersalin</span>
        </div>
    {/if}

    <span class="font-bold text-2xl">DAFTAR UNDANGAN</span>

    {#each comments as comment, i}
        <div class="flex flex-col w-[95%] max-w-[50rem] border border-gray-300 bg-gray-200 p-4 rounded-xl">
            <div class="flex flex-row gap-2">
                <div class="w-20 font-bold">Nama</div>
                <div class="flex-grow">{comment.grup ? 'Grup ' : ''}{comment.name}</div>
            </div>
            <div class="flex flex-row gap-2">
                <div class="w-20 font-bold">Alamat</div>
                <div class="flex-grow">{comment.address ? comment.address : '-'}</div>
            </div>
            <div class="flex flex-row gap-2">
                <div class="w-20 font-bold">Kehadiran</div>
                <div class="flex-grow">{comment.many ? comment.many : 'Belum mengkonfirmasi untuk hadir'}</div>
            </div>
            <div class="flex flex-row justify-between mt-3">
                <div class="flex gap-1">
                    <a href="#" on:click={() => copyCode(comment.id)}
                       class="w-fit focus:outline-none text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-wedding-600 dark:hover:bg-wedding-700 ">
                        <div class="flex flex-row justify-between gap-2">
                    <span>
                        Kode
                    </span>
                            <span class="icon-[iconamoon--copy-fill] h-5 w-5"></span>
                        </div>
                    </a>
                    <a href="#" on:click={() => copyLink(comment.id)}
                       class="w-fit focus:outline-none text-white bg-gray-600 hover:bg-gray-700 focus:ring-4 focus:ring-gray-400 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-wedding-600 dark:hover:bg-wedding-700 ">
                        <div class="flex flex-row justify-between gap-2">
                    <span>
                        Link
                    </span>
                            <span class="icon-[iconamoon--copy-fill] h-5 w-5"></span>
                        </div>
                    </a>
                    <a href="#" on:click={preview(comment)}>Preview</a>
                </div>

                <a href="#" on:click={() => share(comment.id, comment.name, comment.grup)}
                   class="w-fit  focus:outline-none text-white bg-wedding-700 hover:bg-wedding-800 focus:ring-4 focus:ring-wedding-300 font-medium rounded-lg text-sm px-5 py-2.5 dark:bg-wedding-600 dark:hover:bg-wedding-700 ">
                    <div class="flex flex-row justify-between gap-2">
                    <span>
                        Bagikan
                    </span>
                        <span class="icon-[solar--share-linear] w-5 h-5"></span>
                    </div>
                </a>
            </div>
        </div>
    {/each}

</div>