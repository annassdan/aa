import {writable} from "svelte/store";

export const authStore = writable({
    currentPath: '',
    group: true,
    loading: true,
    user: {
        id: '',
        name: '',
        grup: false,
        attend: false,
        many: 0,
        address: '',
        part_of: '',
        guest_name_cover: '',
        title: 'Kepada Bapak/Ibu/Saudara/i',
        coverName: 'Tamu Undangan'
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
