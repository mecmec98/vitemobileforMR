import { defineStore } from 'pinia'

export const useDbConnectStore = defineStore('dbConnectStore', {
    
    state: () => ({
        dbConnectState: false, //initial db state
    }),

    actions: {
        // set the state if db is opened
        dbConnected() {
            this.dbConnectState = true
        },
        // set the state if db is closed
        dbDisconnected() {
            this.dbConnectState = false
        }
    }

})