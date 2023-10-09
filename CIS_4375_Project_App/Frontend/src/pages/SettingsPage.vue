<template>
    <div class="q-pa-md">
        <div class="q-gutter-y-md" style="margin-left: 15px; margin-right: 15px;">
            <q-card>
                <q-tabs 
                    v-model="tab"  
                    class="text-white bg-secondary" 
                    indicator-color="white" 
                    :align="'justify'" 
                    narrow-indicator>
                    <q-tab name="categories" label="Categories" />
                    <q-tab name="priorities" label="Priorities" />
                </q-tabs>
                <q-separator />
                <!-- 
                    Ticket Categories panel
                -->
                <q-tab-panels v-model="tab" animated :align="'center'">
                    <q-tab-panel name="categories">
                        <div class="q-pa-md">
                            <!-- Categries Table -->
                            <q-table 
                                :class="my-sticky-virtscroll-table"
                                title="Category Types" 
                                :key="tableKey"
                                color="secondary"
                                class="cat-sticky-virtscroll-table"
                                virtual-scroll
                                :align="left" 
                                :loading="loading"
                                :rows="categoryData" 
                                :columns="catColumns" 
                                :virtual-scroll-sticky-size-start="20"
                                :visible-columns="visibleCategoryColumns" 
                                style="width: 80%;">
                                <template #body-cell-status="props">
                                    <q-td :props="props">
                                        <q-chip 
                                            :color="props.row.ACTIVE_STATUS_ID === 1 ? 'green' : 'red'"
                                            text-color="white" dense class="text-weight-bolder" square>
                                            {{props.row.ACTIVE_STATUS_DESC }}
                                        </q-chip>
                                    </q-td>
                                </template>
                                <template v-slot:body-cell-actions="props">
                                    <q-td :props="props">
                                        <q-btn 
                                            dense 
                                            round 
                                            flat 
                                            color="secondary"
                                            @click="editRow('Category', props)" 
                                            icon="edit">
                                        </q-btn>
                                    </q-td>
                                </template>
                                <template v-slot:body-cell-delactions="props" >
                                    <q-td :props="props">
                                        <q-btn 
                                            dense 
                                            round 
                                            flat 
                                            @click="deleteRow('Category', props)" 
                                            icon="delete"
                                            color="secondary"></q-btn>
                                    </q-td>
                                </template>
                            </q-table>
                        </div>

                    </q-tab-panel>
                    <!-- 
                    Ticket Priorities panel
                    -->
                    <q-tab-panel name="priorities">
                        <!-- Priorities Table -->
                        <q-table 
                            title="Prioirities" 
                            color="secondary" 
                            :key="catTableKey"
                            :align="left" 
                            :loading="loading" 
                            :rows="priorityData"
                            :columns="prioritiesColumns" 
                            style="width: 80%;">
                            <template #body-cell-status="props">
                                <q-td :props="props">
                                    <q-chip :color="props.row.ACTIVE_STATUS_ID === 1 ? 'green' : 'red'" text-color="white"
                                        dense class="text-weight-bolder" square>{{ props.row.ACTIVE_STATUS_DESC }}</q-chip>
                                </q-td>
                            </template>
                            <template v-slot:body-cell-actions="props">
                                <q-td :props="props" >
                                    <q-btn 
                                        dense 
                                        round 
                                        flat 
                                        @click="editRow('Priority', props)" 
                                        icon="edit"
                                        color="secondary"></q-btn>
                                </q-td>
                            </template>
                            <template v-slot:body-cell-delactions="props">
                                    <q-td :props="props" >
                                        <q-btn 
                                            dense 
                                            round 
                                            flat
                                            @click="deleteRow('Priority', props)" 
                                            icon="delete"
                                            color="secondary"></q-btn>
                                    </q-td>
                                </template>
                        </q-table>
                    </q-tab-panel>
                </q-tab-panels>
            </q-card>

            <!-- Edit Settings Dialog -->
            <template v-if="editedItem.showDialog">
                <EditSettingDialog 
                    :id="editedItem.itemId"
                    :name="editedItem.itemName"
                    :isActive="editedItem.isItemActive"
                    :type="editedItem.itemType"
                    @close-dialog="handleCloseDialog"
                    @save-dialog="handleSaveDialog"
                />
            </template>

            <!-- Delete Settings Dialog -->
            <template v-if="deleteItem.showDialog">
                <DeleteSettingsDialog
                    :id="deleteItem.itemId"
                    :name="deleteItem.itemName"
                    :type="deleteItem.itemType"
                    @close-dialog="handleCloseDeleteDialog"
                    @delete-dialog="handleDeleteDialog"
                />
            </template>
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue'
import axios from "axios";
import { mapGetters } from 'vuex'
import EditSettingDialog from "../components/EditSettingDialog.vue";
import DeleteSettingsDialog from "../components/DeleteSettingsDialog.vue"

export default {
    components: {
        EditSettingDialog,
        DeleteSettingsDialog
    },
    data() {
        return {
            editedItem: {
                itemType: '', // keeps track of it we're editing a category or priority
                showDialog: false, // keeps track of if the edit dialog should pop open 
                itemId: '', // keeps track of the id of the item (category or priority)
                itemName: '', // keeps track of the desc of the item (category or priority)
                isItemActive: true, // // keeps track of the active status of the item (category or priority)
            },
            deleteItem: {
                itemType: '', // keeps track of it we're editing a category or priority
                showDialog: false, // keeps track of if the edit dialog should pop open 
                itemId: '', // keeps track of the id of the item (category or priority)
                itemName: '', // keeps track of the desc of the item (category or priority)
               
            },
            visibleCategoryColumns :['category_type', 'status', 'actions', 'delactions'], // Set visible columns of category table
            visiblePriorityColumns: ['priorities', 'status', 'actions', 'delactions'], // Set visible columns of priorities table
            categoryData: [],  // Holds the category data retrieved from the database
            priorityData: [], // Holds the priority data retrieved from the database
            updatedCategoryData:[],
            tableKey: 0, // Used to re-render q-tables after a row has been deleted
          
          
        }
    },
    created() {
        this.getPriorities();  // Method which calls the GET API for Priorities
        this.getCategories();  // Method which calls the GET API for Categories      
        this.hideColums() // handles the visibility of the delete columns based on user role
    },
    methods: {
        /**
         * @param type item type (expected values are "Category" or "Property")
         * @param props properties related to the edited row (e.g. id, desc, status)
         */
        editRow(type, props) {
            let itemId;
            let itemDesc;

            // get item values from props based on what type it is
            if (type === 'Category') {
                // get category id/desc
                itemId = props.row.TICKET_CATEGORY_ID;
                itemDesc = props.row.TICKET_CATEGORY_DESC;
            } else {
                // get priority id/desc
                itemId = props.row.TICKET_PRIORITY_ID;
                itemDesc = props.row.TICKET_PRIORITY_DESC;
            }

            // update component data variables
            this.editedItem.itemId = itemId;
            this.editedItem.itemName = itemDesc;
            this.editedItem.isItemActive = props.row.ACTIVE_STATUS_ID === 1;
            this.editedItem.itemType = type;
            // show dialog
            this.editedItem.showDialog = true;
        },

        handleCloseDialog() {
            // close dialog
            this.editedItem.showDialog = false;
        },

        handleCloseDeleteDialog() {
            // close delete dialog
            this.deleteItem.showDialog = false;
        },

        handleSaveDialog(response) {
            // destruct to access id property name and item from the response after you clicked save on the dialog
            const { idPropertyName, item } = response;
            // get id to use in the put api for the item
            const itemId = item[idPropertyName];

            // check if item type is category, else it is a priority
            if (this.editedItem.itemType === 'Category') {
                // find the index for the category item based on it's id
                const index = this.categoryData.findIndex((category) => (category[idPropertyName] === itemId));
                // update the category data list with the updated category item
                this.categoryData[index] = item;
            } else {
                // find the index for the priority item based on it's id
                const index = this.priorityData.findIndex((priority) => (priority[idPropertyName] === itemId));
                // update the priority data list with the updated priority item
                this.priorityData[index] = item;
            }

            // call save api
            axios.put(`http://localhost:8001/api/${this.editedItem.itemType}/${itemId}`, item);

            // close dialog
            this.editedItem.showDialog = false;
        },

        handleDeleteDialog(response) {
            // Destruct to access id property name and item from the response after you clicked delete on the dialog
            const { idPropertyName, item } = response;
            // Get id to use in the delete api for the item
            const itemId = item[idPropertyName];
            const itemTypetoDelete = (this.deleteItem.itemType).toLocaleLowerCase();
            // Call delete api
            axios.delete(`http://localhost:8001/api/${itemTypetoDelete}/${itemId}`);
            this.tableKey += 1 ;this.getCategories();
            console.log("Key updt: ", this.tableKey)
            this.getCategories();
            this.getPriorities();
            // close delete dialog
            this.deleteItem.showDialog = false; 
        },

        // Hide delete column is user role is not 'IT Teacher'
        hideColums(){
            if (this.userRole != 'IT Teacher'){
                this.visibleCategoryColumns =  ['category_type', 'status', 'actions']
                this.visiblePriorityColumns = ['priorities', 'status', 'actions']
            }
        }, 

        // Call GET API for categories
        getCategories(){
            axios.get(`http://localhost:8001/api/categories`).then((res) => {
            this.categoryData = res.data
            console.log(this.categoryData)
            this.loading = false
        })
        },

        // Call GET API for priorities
        getPriorities(){
             // Retrieve priority data by calling GET priority API
        axios.get(`http://localhost:8001/api/priorities`).then((res) => {
            this.priorityData = res.data
            this.loading = false
        })
        },

        // Function for delete dialog
        deleteRow(type, props) {
            let itemId;
            let itemDesc;
            // get item values from props based on what type it is
            if (type === 'Category') {
                // get category id/desc
                itemId = props.row.TICKET_CATEGORY_ID;
                itemDesc = props.row.TICKET_CATEGORY_DESC;
            } else {
                // get priority id/desc
                itemId = props.row.TICKET_PRIORITY_ID;
                itemDesc = props.row.TICKET_PRIORITY_DESC;
            }
           // update component data variables
            this.deleteItem.itemId = itemId;
            this.deleteItem.itemName = itemDesc;
            this.deleteItem.itemType = type;
            // show dialog
            this.deleteItem.showDialog = true;
        },
    },

    setup() {
        const catColumns = [
            { name: 'category_type', label: 'Category', field: 'TICKET_CATEGORY_DESC', align: 'left' },
            { name: "status", align: "center", label: "Status", field: "ACTIVE_STATUS_DESC", sortable: true },
            { name: 'actions', label: 'Edit', field: '', align: 'left' },
            { name: 'delactions', label: 'Delete', field: '', align: 'left' },
        ];
        const prioritiesColumns = [
            { name: 'priorities', label: 'Priorities', field: 'TICKET_PRIORITY_DESC', align: 'left' },
            { name: "status", align: "center", label: "Status", field: "ACTIVE_STATUS_DESC", sortable: true },
            { name: 'actions', label: 'Edit', field: '', align: 'left' },
            { name: 'delactions', label: 'Delete', field: '', align: 'left' },
        ];


        const statuses = ['Active', 'Inactive'];
        return {
            tab: ref('categories'),
            setActive: ref('Active'),
            loading: ref(true),
            catColumns,
            prioritiesColumns,
            selected: ref([]),
            redModel: ref(true),
         
        };
    },
    computed: {
      ...mapGetters('auth', ['isAuthenticated', 'userEmail', 'userFirstName', 'userRole']),
    }
}
</script>

<style lang="sass">

.q-table__top,

thead tr:first-child th
  /* bg color is important for th; just specify one */
  background-color: #e6e2e2
</style>