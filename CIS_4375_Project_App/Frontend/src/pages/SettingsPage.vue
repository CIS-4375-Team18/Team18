<template>
    <div class="q-pa-md">
        <div class="q-gutter-y-md" style="margin-left: 15px; margin-right: 15px;">
            <q-card>
                <q-tabs v-model="tab" dense class="text-white" indicator-color="white" :align="'justify'" narrow-indicator
                    style="background-color: #ad0000;">
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
                            <q-table title="Category Types" color="secondary" :align="left" :loading="loading"
                                :rows="categoryData" :columns="catColumns" style="width: 80%;">
                                <template #body-cell-status="props">
                                    <q-td :props="props">
                                        <q-chip :color="props.row.ACTIVE_STATUS_ID === 1 ? 'green' : 'red'"
                                            text-color="white" dense class="text-weight-bolder" square>{{
                                                props.row.ACTIVE_STATUS_DESC }}</q-chip>
                                    </q-td>
                                </template>
                                <template v-slot:body-cell-actions="props">
                                    <q-td :props="props">
                                        <q-btn dense round flat @click="editRow('Category', props)" icon="edit"
                                            style="color: #ad0000;"></q-btn>
                                    </q-td>
                                </template>
                                
                            </q-table>

                            

                        </div>
                        <q-btn v-if="userRole==='System Administrator' || userRole==='IT Teacher'"
                        outline icon="person_add" text-color="primary" label="Add New Category"
                        style="min-width: 140px; background-color: #03521c;" 
                        class="text-left"
                        />

                    </q-tab-panel>
    
                    <!-- 
                    Ticket Priorities panel
                    -->
                    <q-tab-panel name="priorities">
                        <!-- Priorities Table -->
                        <q-table title="Prioirities" color="secondary" :align="left" :loading="loading" :rows="priorityData"
                            :columns="prioritiesColumns" style="width: 80%;">
                            <template #body-cell-status="props">
                                <q-td :props="props">
                                    <q-chip :color="props.row.ACTIVE_STATUS_ID === 1 ? 'green' : 'red'" text-color="white"
                                        dense class="text-weight-bolder" square>{{ props.row.ACTIVE_STATUS_DESC }}</q-chip>
                                </q-td>
                            </template>
                            <template v-slot:body-cell-actions="props">
                                <q-td :props="props">
                                    <q-btn dense round flat @click="editRow('Priority', props)" icon="edit"
                                        style="color: #ad0000;"></q-btn>
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
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue'
import axios from "axios";
import EditSettingDialog from "../components/EditSettingDialog.vue";
import { mapGetters } from 'vuex';
const apiURL = import.meta.env.VITE_API_URL

export default {
    components: {
        EditSettingDialog,
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
            categoryData: [],
            priorityData: [],
        }
    },
    created() {
        axios.get(`${apiURL}/categories`).then((res) => {
            this.categoryData = res.data
            this.loading = false
        })
        axios.get(`${apiURL}/priorities`).then((res) => {
            this.priorityData = res.data
        })
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
    },
    setup() {
        const catColumns = [
            { name: 'category_type', label: 'Category', field: 'TICKET_CATEGORY_DESC', align: 'left' },
            { name: "status", align: "center", label: "Status", field: "ACTIVE_STATUS_DESC", sortable: true },
            { name: 'actions', label: 'Edit', field: '', align: 'left' },
        ];
        const prioritiesColumns = [
            { name: 'priorities', label: 'Priorities', field: 'TICKET_PRIORITY_DESC', align: 'left' },
            { name: "status", align: "center", label: "Status", field: "ACTIVE_STATUS_DESC", sortable: true },
            { name: 'actions', label: 'Edit', field: '', align: 'left' },
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
}
</script>
  