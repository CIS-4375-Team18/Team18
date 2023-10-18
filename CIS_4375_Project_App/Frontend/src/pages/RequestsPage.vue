<template>
    <div class="q-pa-md">
        <div class="q-gutter-y-md" style="margin-left: 15px; margin-right: 15px;">
            <q-card>
                <q-tabs v-model="tab" dense class="text-white" indicator-color="white" :align="'justify'" narrow-indicator
                    style="background-color: #ad0000;">
                    <q-tab name="requests" label="View Requests" />
                </q-tabs>
                <q-separator />
                <q-tab-panels v-model="tab" animated :align="'center'">
                    <q-tab-panel name="requests">
                        <div class="q-pa-md">
                            <q-table title="Requests" color="secondary" :align="left" :loading="loading"
                                :rows="supporttickets" :columns="supportticketsColumns" style="width: 80%;">
                                <template #body-cell-status="props">
                                    <q-td :props="props">
                                        <q-chip :color="props.row.SUPPORT_TICKET_STATUS_ID === 1 ? 'green' : 'red'"
                                            text-color="white" dense class="text-weight-bolder" square>
                                            {{ props.row.SUPPORT_TICKET_STATUS_ID === 1 ? 'ACTIVE' : 'INACTIVE'}}</q-chip>
                                    </q-td>
                                </template>
                            </q-table>
                        </div>
                    </q-tab-panel>
                </q-tab-panels>
            </q-card>
        </div>
    </div>
</template>
  
<script>
import { ref } from 'vue'
import axios from "axios";
const apiURL = import.meta.env.VITE_API_URL

export default {
    data() {
        return {
            supporttickets: [],
            priorities: {}
        }
    },
    async created() {
        // call active prioties api to get the list of all apis
        const activePriorities = await axios.get(`${apiURL}/activepriorities`)
        // map the id and priority description
        activePriorities.data.forEach((priority) => {
          this.priorities[priority.TICKET_PRIORITY_ID] = priority.TICKET_PRIORITY_DESC;
        });

        axios.get(`${apiURL}/supporttickets`).then((res) => {
            this.supporttickets = res.data.map((supportticket) => {
              // add a new property called priority status to supportticket
              // set it to the status from priorities based on the current ticket priority id
              return {
                prioritystatus: this.priorities[supportticket.TICKET_PRIORITY_ID],
                ...supportticket
              }
            });
            this.loading = false
        });
    },
    methods: {
    },
    setup() {
        const supportticketsColumns = [
            { name: 'subject', label: 'Subject', field: 'SUPPORT_TICKET_SUBJECT', align: 'left', sortable: true  },
            { name: "creationDate", align: "left", label: "Creation Date", field: "SUPPORT_TICKET_DATE_CREATED", sortable: true, format: (val) => `${new Date(val)}` },
            { name: "status", align: "center", label: "Status", field: "SUPPORT_TICKET_STATUS_ID", sortable: true },
            { name: "priority", align: "center", label: "Priority", field: "prioritystatus", sortable: true },
        ];
        return {
            tab: ref('requests'),
            setActive: ref('Active'),
            loading: ref(true),
            supportticketsColumns,
            selected: ref([]),
            redModel: ref(true),
        };
    },
}
</script>
  