import { defineStore } from "pinia";
import { pinia } from '../store'

export const useMyStore = defineStore('loginStore', {
    state: () => ({
        isAuthenticated: true,
    }),
})

