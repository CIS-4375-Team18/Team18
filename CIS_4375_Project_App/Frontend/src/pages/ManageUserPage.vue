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
                    <q-table title="Users" :key="tableKey" color="secondary" :align="left" :loading="loading "
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
                                        <q-btn dense round flat @click="editItem(props)" icon="edit"
                                            style="color: #ad0000;"></q-btn>
                                    </q-td>
                                </template>
                                <template v-slot:body-cell-delactions="props"> <!-- On click will bring out dialog box to confirm deletion-->
                                    <q-td :props="props">
                                        <q-btn dense round flat @click=deleteUserDialog(props) icon="delete"
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
                <template>
                    <q-dialog v-model="deleteItemDial" persistent>
                        <q-card style="min-width: 350px;">
                        <q-card-section class="row items-center" style="background-color: #af0000">
                            <div class="text-h6" style="color: white;">Confirm to Delete User</div>
                        </q-card-section>
                        <q-card-section>
                        <q-avatar icon="warning" color="white" text-color="warning" size="" />
                        <span class="text-body2 q-mt-lg">You are about to delete user: 
                            {{ this.itemFirstName + " " + this.itemLastName}}</span>
                        </q-card-section>

                        <q-card-actions align="right">
                        <q-btn flat label="Cancel" color="primary" v-close-popup />
                        <!-- On confirmation will execute deletion-->
                        <q-btn flat label="Confirm" color="primary" @click="deleteUser(this.itemID)" v-close-popup />
                        </q-card-actions>
                    </q-card>
                    </q-dialog>
                </template>
            </div>
        </q-card>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import axios from 'axios';
import { ref } from 'vue';

export default {
    setup(){
        return{
        deleteItemDial: ref(false),
        }
    },
    beforeMount() {
        this.getUsers()
    },
    data () {
        return {
            itemID: "",
            itemFirstName: "",
            itemLastName: "",
            userData: [],

            userColumns : [ //Table template
            {name: 'First Name', required: true, label: 'First Name', field: 'END_USER_FIRST_NAME', align: 'left'}, 
            {name: 'Last Name', label: 'Last Name', field: 'END_USER_LAST_NAME', align: 'left'},
            {name: 'Email', label: 'Email', field: 'END_USER_EMAIL', align: 'left'},
            {name: 'Role', label: 'Role', field: 'USER_ROLE_NAME', align: 'left'},
            {name: "status", align: "center", label: "Status", field: "ACTIVE_STATUS_DESC", sortable: true},
            {name: 'actions', label: 'Edit', field: '', align: 'left' },
            {name: 'delactions', label: 'Delete', field: '', align: 'left' },
            
            ],
            tableKey : 0, //will be used to re-render table

        }
    },
    methods: {
        async getUsers(){
            axios.get(`http://localhost:8001/api/endusers`).then((res) => { //Loads data when creating the page
            this.userData = res.data;
            this.rerenderTable;
            this.loading = false;
        })
        },
        createNewUser() {
            this.$router.push('/createUser');
        },
        editItem(item) {
            console.log(item.row)
            console.log("Edit")
            //fd.editedIndex = fd.currencyData.findIndex((v, i) =>v.__index === item.__index)
            //fd.editedItem = Object.assign({}, item);
            //fd.show_dialog = true;
        },
        rerenderTable(){
            this.tableKey +=1;
            console.log("rendered table")
        },
        deleteUserDialog(item){ //saves needed information into variables
            this.deleteItemDial = true;
            this.itemID = item.row.END_USER_ID;
            this.itemFirstName = item.row.END_USER_FIRST_NAME;
            this.itemLastName = item.row.END_USER_LAST_NAME;
            this.rerenderTable();
        },
        async deleteUser(userID){ //executes delete
            axios.delete(`http://localhost:8001/api/enduser/${userID}`).then((res) => { //deletes from database
                const index = this.userData.findIndex(userData => userData.END_USER_ID === userID) 
                if (~index){
                    this.userData.splice(index, 1)//finds in local table and deletes
                }

                if (res.status === 200) {
                        this.$q.notify({ color: 'positive', message: 'User deleted successfully' });
                        this.$router.push('/users');
                    } else {
                        this.$q.notify({ color: 'negative', message: 'Error while deleting' });
                    }
            });

            this.rerenderTable;//rerenders table

        },
    },

    computed: {
      ...mapGetters('auth', ['userRole']),

    },
}
</script>

<style scoped>

</style>