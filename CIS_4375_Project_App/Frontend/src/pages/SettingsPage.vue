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
                                    <q-btn dense round flat @click="editItem(props)" icon="edit"
                                        style="color: #ad0000;"></q-btn>
                                </q-td>
                            </template>
                        </q-table>
                    </q-tab-panel>
                </q-tab-panels>
            </q-card>
            <!-- q-dialo -->
            <template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn label="Show HTML Dialog" color="primary" @click="showDialog" />
  </div>
</template>
        </div>
       
    </div>
</template>
  
<script>
import { ref } from 'vue'
import axios from "axios";
import { mapGetters } from 'vuex';
const apiURL = import.meta.env.VITE_API_URL

export default {
    data() {
        return {
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

    methods:{

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

    computed : {
        ...mapGetters('auth', ['userRole'])
    }



}


</script>
  