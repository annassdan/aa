import {writable} from "svelte/store";

export const authStore = writable({
    currentPath: '',
    group: true,
    user: {
        id: '',
        name: ''
    },
    qris: {
        id: import.meta.env.VITE_SAWERIA_USER_ID,
        amount: 0,
        amountString: 'Rp 0',
        logo: import.meta.env.VITE_QRIS_LOGO,
        string: '',
        json: ''
    }
});
