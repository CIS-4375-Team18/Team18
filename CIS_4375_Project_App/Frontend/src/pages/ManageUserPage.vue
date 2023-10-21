<template>
    <div class="q-pa-md q-gutter-sm" style="margin-left: 15px; margin-right: 15px;">
        <q-card class="requests-card">
            <q-card-section class="text-white" style="background-color: #af0000;">
                <div class="text-h6 text-left"> Manage Users </div>
            </q-card-section>
            <q-separator />

            <q-btn v-if="userRole==='System Administrator' || userRole==='IT Teacher'" 
                    @click="createNewUser" outline icon="person_add" text-color="primary" label="Create New User" 
                    style="margin-top: 20px ; min-width: 140px; margin-left: 3%;"
                />

            <div style="margin-left: 2%;">
                <div class="q-pa-md" style="margin: 0 auto;">
                    <!-- Users Table -->
                    <q-table title="Users" color="secondary" :align="left" :loading="loading" 
                        :rows="userData" :columns="userColumns" virtual-scroll style="width: 98%;"> <!-- Puts table with user data -->
                        <template #body-cell-status="props">
                                    <q-td :props="props">
                                        <q-chip :color="props.row.ACTIVE_STATUS_ID === 1 ? 'green' : 'red'"
                                            text-color="white" dense class="text-weight-bolder" square>{{
                                                props.row.ACTIVE_STATUS_DESC }}</q-chip>
                                    </q-td>
                                </template>
                                <template v-slot:body-cell-actions="props">
                                    <q-td :props="props">
                                        <q-btn dense round flat @click="editRow(props)" icon="edit"
                                            style="color: #ad0000;"></q-btn>
                                    </q-td>
                        </template>
                        <template #loading>
                            <q-inner-loading
                                showing
                                color="primary">
                            </q-inner-loading>
                        </template>
                    </q-table>

                    <!-- Only valid users are able to select this role-->
                </div>
            </div>
        </q-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import { ref } from 'vue';

export default {
    created() {
        axios.get(`http://localhost:8001/api/endusers`).then((res) => { //Loads data when creating the page
            this.userData = res.data
            this.loading = false
        })
    },

    data () {
        return {
            userData: [],

            userColumns : [ //Table template
            {name: 'First Name', required: true, label: 'First Name', field: 'END_USER_FIRST_NAME', align: 'left'}, 
            {name: 'Last Name', label: 'Last Name', field: 'END_USER_LAST_NAME', align: 'left'},
            {name: 'Email', label: 'Email', field: 'END_USER_EMAIL', align: 'left'},
            {name: 'Role', label: 'Role', field: 'USER_ROLE_NAME', align: 'left'},
            { name: "status", align: "center", label: "Status", field: "ACTIVE_STATUS_DESC", sortable: true},
            { name: 'actions', label: 'Edit', field: '', align: 'left' },
        ],
        }
    },
    methods: {
        createNewUser () {
            this.$router.push('/createUser');
        },
        editItem(item) {
            fd.editedIndex = fd.currencyData.findIndex((v, i) =>v.__index === item.__index)
            fd.editedItem = Object.assign({}, item);
            fd.show_dialog = true;
        }
    },

    computed: {
      ...mapGetters('auth', ['userRole']),

    },

    setup() {
        return {
            loading: ref(true)
        }
    },
}
</script>

<style scoped>

</style>