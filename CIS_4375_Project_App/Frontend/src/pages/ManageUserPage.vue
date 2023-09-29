<template>
    <div class="q-pa-md q-gutter-sm" style="margin-left: 15px; margin-right: 15px;">
        <q-card class="requests-card">
            <q-card-section class="text-white" style="background-color: #af0000;">
                <div class="text-h6 text-left"> Manage Users </div>
            </q-card-section>
            <q-separator />

            <div style="margin-left: 16%;">
                <div class="q-pa-md" style="margin: 0 auto;">
                    <q-table title="Users" color="secondary" :align="left" :loading="loading" 
                        :rows="userData" :columns="userColumns" style="width: 80%;">

                    </q-table>

                    <q-btn v-if="userRole==='System Administrator' || userRole==='IT Teacher'" 
                        @click="createNewUser" outline icon="add" text-color="primary" label="Create New User" 
                        style="margin-top: 30px ; min-width: 140px; background-color: #03521c;"
                    />
                </div>
            </div>
        </q-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios'

export default {
    data () {
        return {
            userData: [],
        }
    },
    methods: {
        createNewUser () {
            this.$router.push('/createUser');
        }
    },

    setup() {
        const userColumns = [
            {name: 'First Name', label: 'First Name', field: 'END_USER_FIRST_NAME', align: 'left'},
            {name: 'Last Name', label: 'Last Name', field: 'END_USER_LAST_NAME', align: 'left'},
            {name: 'Email', label: 'Email', field: 'END_USER_EMAIL', align: 'left'},
            {name: 'Role', label: 'Role', field: 'USER_ROLE_ID', align: 'left'},
            {name: 'Status', label: 'Status', field: 'ACTIVE_STATUS_ID', align: 'left'}
        ]
    },

    computed: {
      ...mapGetters('auth', ['userRole']),

    }
}
</script>

<style scoped>

</style>