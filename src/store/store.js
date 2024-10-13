import {writable} from "svelte/store";

export const authStore = writable({
    currentPath: '',
    group: true,
    qris: {
        id: import.meta.env.VITE_SAWERIA_USER_ID,
        amount: 0,
        string: '',
        json: ''
    }
});
