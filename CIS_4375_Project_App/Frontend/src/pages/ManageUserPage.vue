<template>
    <div class="q-pa-md q-gutter-sm" style="margin-left: 15px; margin-right: 15px;">
        <q-card class="requests-card">
            <q-card-section class="text-white" style="background-color: #af0000;">
                <div class="text-h6 text-left"> Manage Users </div>
            </q-card-section>
            <q-separator />

            <div style="margin-left: 2%;">
                <div class="q-pa-md" style="margin: 0 auto;">
                    <!-- Users Table -->
                    <q-table title="Users" color="secondary" :align="left" :loading="loading"
                        :rows="userData" :columns="userColumns" style="width: 98%;"> <!-- Puts table with user data -->
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
                    </q-table>

                    <!-- Only valid users are able to select this role-->
                    <q-btn v-if="userRole==='System Administrator' || userRole==='IT Teacher'" 
                        @click="createNewUser" outline icon="person_add" text-color="primary" label="Create New User" 
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
    created() {
        axios.get(`http://localhost:8001/api/endusers`).then((res) => { //Loads data when creating the page
            this.userData = res.data
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
}
</script>

<style scoped>

</style>