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
                                        <q-btn dense round flat @click="editRow(props)" icon="edit"
                                            style="color: #ad0000;"></q-btn>
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
                                    <q-btn dense round flat @click="editItem(props)" icon="edit"
                                        style="color: #ad0000;"></q-btn>
                                </q-td>
                            </template>
                        </q-table>
                    </q-tab-panel>
                </q-tab-panels>
            </q-card>

            <!-- Edit Category Dialog -->
            <template v-if="category.showCategoryDialog">
                <EditCategoryDialog 
                    :id="category.categoryId"
                    :name="category.categoryName"
                    :isActive="category.isCategoryActive"
                    @close-dialog="handleCategoryDialogClosed"
                    @save-dialog="handleCategoryChangesSaved"
                />
            </template>
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue'
import axios from "axios";
import EditCategoryDialog from "../components/EditCategoryDialog.vue";

export default {
    components: {
        EditCategoryDialog,
    },
    data() {
        return {
            category: {
                showCategoryDialog: false,
                categoryId: '',
                categoryName: '',
                isCategoryActive: true,
            },
            categoryData: [],
            priorityData: [],
        }
    },
    created() {
        axios.get(`http://localhost:8001/api/categories`).then((res) => {
            this.categoryData = res.data
            this.loading = false
        })
        axios.get(`http://localhost:8001/api/priorities`).then((res) => {
            this.priorityData = res.data
        })
    },

    methods: {
        editRow(props) {
            // destruct from props to get row properties as variables
            const {
                row: {
                    TICKET_CATEGORY_ID,
                    TICKET_CATEGORY_DESC,
                    ACTIVE_STATUS_ID,
                }
            } = props;
            // update component data variables
            this.category.categoryId = TICKET_CATEGORY_ID;
            this.category.categoryName = TICKET_CATEGORY_DESC;
            this.category.isCategoryActive = ACTIVE_STATUS_ID === 1;
            // show category dialog
            this.category.showCategoryDialog = true;
        },
        handleCategoryDialogClosed() {
            // close category dialog
            this.category.showCategoryDialog = false;
        },
        handleCategoryChangesSaved(updatedCategory) {
            // get category id to use in the put api for category
            const categoryId = updatedCategory.TICKET_CATEGORY_ID;
            // find category from categoryData
            const categoryIndex = this.categoryData.findIndex((category) => (category.TICKET_CATEGORY_ID === updatedCategory.TICKET_CATEGORY_ID));
            // update category at index 
            this.categoryData[categoryIndex] = updatedCategory;
            // call save api for category
            axios.put(`http://localhost:8001/api/category/${categoryId}`, updatedCategory);
            // close category dialog
            this.category.showCategoryDialog = false;
        },
    },

    setup() {
       
        const catColumns = [
            { name: 'category_type', label: 'Category', field: 'TICKET_CATEGORY_DESC', align: 'left' },
            { name: "status", align: "center", label: "Status", field: "ACTIVE_STATUS_DESC", sortable: true },
            { name: 'actions', label: 'Edit', field: '', align: 'left' },
        ]
        const prioritiesColumns = [
            { name: 'priorities', label: 'Priorities', field: 'TICKET_PRIORITY_DESC', align: 'left' },
            { name: "status", align: "center", label: "Status", field: "ACTIVE_STATUS_DESC", sortable: true },
            { name: 'actions', label: 'Edit', field: '', align: 'left' },
        ]
        const statuses = [
            'Active', 'Inactive']
        return {
            tab: ref('categories'),
            setActive: ref('Active'),
            loading: ref(true),
            catColumns,
            prioritiesColumns,
            selected: ref([]),
            redModel: ref(true),
            

        }
        function editItem(item) {
      fd.editedIndex = fd.currencyData.findIndex((v, i) =>v.__index === item.__index)
      fd.editedItem = Object.assign({}, item);
      fd.show_dialog = true;
    }
    },



}


</script>
  