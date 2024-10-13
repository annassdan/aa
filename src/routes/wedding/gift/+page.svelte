<script>
    import {onMount} from "svelte";
    import {getDocs, collection, doc} from "firebase/firestore";
    import {db} from "$lib/firebase";
    import {page} from '$app/stores';
    import {authStore} from "../../../store/store.js";
    import Qris from "../../../components/Qris.svelte";
    import ShopeePay from "../../../components/ShopeePay.svelte";
    import Bca from "../../../components/Bca.svelte";
    import QRCode from '@castlenine/svelte-qrcode';

    // Get the current path
    let currentPath;
    $: currentPath = $page.url.pathname;
    let showQrisCode = false;

    $: value = '';
    $: message = '';

    function formatCurrency(event) {
        let input = event.target.value.replace(/[^0-9.]/g, '');

        // Ensure only one decimal point
        const parts = input.split('.');
        if (parts.length > 2) {
            parts[1] = parts.slice(1).join('');
            input = parts.join('.');
        }

        // Limit to two decimal places
        if (parts.length > 1) {
            parts[1] = parts[1].slice(0, 2);
            input = parts.join('.');
        }

        // Add commas for thousands
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        value = 'Rp ' + parts.join('.');
    }

    function isNominalEmpty() {
        let toEvaluate = value.trim();
        return !value || toEvaluate.replaceAll('0', '') === 'Rp';
    }

    function clearCurrency() {
        if (isNominalEmpty()) {
            value = ''
        }
    }

    function parseNumericValue(val) {
        // Remove currency symbol, commas, and convert to float
        let parsed = parseFloat(val.replace(/[^\d.]/g, ''));
        return isNaN(parsed) ? 0 : parsed
    }

    onMount(() => {
        authStore.update(u => ({...u, currentPath: currentPath}));
    });

    async function qris() {
        if (isNominalEmpty()) {
            return;
        }

        const amount = parseNumericValue(value);
        const body = {
            agree: true,
            notUnderage: true,
            message: message,
            amount,
            payment_type: "qris",
            vote: "",
            currency: "IDR",
            customer_info: {
                first_name: "Invited",
                email: "invited@gmail.com",
                phone: ""
            }
        }

        console.log(JSON.stringify(body));

        try {
            const response = await fetch(`/api/donations/${$authStore.qris.id}`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-type': 'application/json',
                },
            });
            if (!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log(data);

            const qr = await fetch(`/api/donations/generate/${data.data.id}`);
            if (!qr.ok) throw new Error('Network response was not ok');
            const qrPayload = await qr.json();

            authStore.update(u => ({
                ...u, qris: {
                    amount,
                    string: qrPayload.pageProps.data.qr_string,
                    id: u.qris.id,
                    json: data.data.id
                }
            }));

        } catch (err) {
            console.error(err);
        }
    }

    function bca() {
        navigator.clipboard.writeText('7910819997');
    }

    function shopeePay() {
        navigator.clipboard.writeText('085746335508');
    }

</script>
<div class="px-4 pt-6 pb-24 flex flex-col items-center h-full bg-gradient-to-t from-wedding-200 to-pink-100 text-wedding-600 gap-3  text-sm">
    <div class="flex flex-row justify-center item-center items-center gap-3 w-full text-wedding-500 -mt-5">
        <span class="icon-[fa--gift] w-16 h-16"></span>
        <h2 class="text-sm font-semibold mt-1">Tanpa mengurangi rasa hormat, bagi anda yang ingin memberikan tanda kasih
            untuk mempelai dapat melalui:</h2>
    </div>

    <div class="relative w-full pt-5 pb-3 px-4 bg-wedding-100  border border-wedding-200 rounded-lg  flex gap-3 flex-col ">
        <Qris class="w-24 h-24 fill-pink-600"></Qris>
        {#if $authStore.qris.string}
            <QRCode data="{$authStore.qris.string}"/>
        {/if}

        <div class="flex flex-col gap-1 text-wedding-500 ml-1 z-10 w-full">
            <div class="flex flex-row items-center gap-2">
                <span class="icon-[icon-park-twotone--people]"></span>
                <span class="font-bold">Saweria</span>
            </div>
            <input type="text" bind:value={value} on:blur={clearCurrency} on:input={formatCurrency}
                   class="outline-wedding-500 bg-wedding-50 border border-wedding-300 text-wedding-700 placeholder-wedding-300  text-sm rounded-lg focus:ring-wedding-500 focus:border-wedding-500 block w-full p-2.5"
                   placeholder="Inputkan Nominal...">
            <input type="text" bind:value={message}
                   class="outline-wedding-500 bg-wedding-50 border border-wedding-300 text-wedding-700 placeholder-wedding-300  text-sm rounded-lg focus:ring-wedding-500 focus:border-wedding-500 block w-full p-2.5"
                   placeholder="Catatan...">
            <div class="flex w-fit mt-1 w-full">
                <a href="#" on:click={qris}
                   class="items-center pl-3 w-full pr-4 py-2 text-sm text-center text-white bg-wedding-500 hover:bg-wedding-600 rounded-lg  focus:ring-4 focus:outline-none focus:ring-wedding-300 ">
                    <div class="flex flex-row gap-2 justify-between">
                        <span>Buat QRIS dan Scan</span>

                        <span class="icon-[solar--qr-code-bold] w-5 h-5"></span>
                    </div>
                </a>
            </div>
        </div>

    </div>

    <div class="relative w-full pt-5 pb-3 px-4 bg-wedding-100  border border-wedding-200 rounded-lg  flex gap-3 flex-col ">
        <Bca class="w-24 h-24 fill-wedding-500"></Bca>
        <div class="flex flex-col gap-1 text-wedding-500 ml-1 z-10 w-full">
            <div class="flex flex-row items-center gap-2">
                <span class="icon-[icon-park-twotone--people]"></span>
                <span class="font-bold">Muhammad Nur Annas</span>
            </div>
            <div class="flex w-fit mt-1 w-full">
                <a href="#" on:click={bca}
                   class="items-center pl-3 w-full pr-4 py-2 text-sm text-center text-white bg-wedding-500 hover:bg-wedding-600 rounded-lg  focus:ring-4 focus:outline-none focus:ring-wedding-300 ">
                    <div class="flex flex-row gap-2 justify-between">
                        <span>Salin Nomor Akun BCA</span>
                        <span class="icon-[iconamoon--copy-fill] h-5 w-5"></span>
                    </div>
                </a>
            </div>
        </div>

    </div>

    <div class="relative w-full pt-5 pb-3 px-4 bg-wedding-100  border border-wedding-200 rounded-lg  flex gap-3 flex-col ">
        <ShopeePay class="w-24 h-24 fill-wedding-500"></ShopeePay>
        <div class="flex flex-col gap-1 text-wedding-500 ml-1 z-10 w-full">
            <div class="flex flex-row items-center gap-2">
                <span class="icon-[icon-park-twotone--people]"></span>
                <span class="font-bold">Fransiska Yudha Nugrahaniseta</span>
            </div>
            <div class="flex w-fit mt-1 w-full">
                <a href="#" on:click={shopeePay}
                   class="items-center pl-3 w-full pr-4 py-2 text-sm text-center text-white bg-wedding-500 hover:bg-wedding-600 rounded-lg  focus:ring-4 focus:outline-none focus:ring-wedding-300 ">
                    <div class="flex flex-row gap-2 justify-between">
                        <span>Salin Nomor Akun Shopee Pay</span>
                        <span class="icon-[iconamoon--copy-fill] h-5 w-5"></span>
                    </div>
                </a>
            </div>
        </div>

    </div>
</div>