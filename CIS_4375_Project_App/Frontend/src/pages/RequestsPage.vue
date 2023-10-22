<template>
    <div class="q-pa-md">
        <div class="q-gutter-y-md" style="margin-left: 15px; margin-right: 15px;">
            <div class="q-pa-md">
                <q-table title="Requests" color="secondary" :align="left" :loading="loading"
                    :rows="supporttickets" :columns="supportticketsColumns" style="width: 80%;">
                    <template v-slot:top>
                        <q-select v-model="filterByModel" :options="filterByOptions" label="Filter By" />
                    </template>
                </q-table>
            </div>
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
            { name: "creationDate", align: "left", label: "Creation Date", field: "SUPPORT_TICKET_DATE_CREATED", sortable: true, format: (val) => {
                const date = new Date(val);
                const month = (date.getMonth() + 1).toString().padStart(2, '0');
                const day = date.getDate().toString().padStart(2, '0');
                const year = date.getFullYear();
                let hours = date.getHours();
                const minutes = date.getMinutes().toString().padStart(2, '0');
                let ampm = 'AM';

                // Convert to 12-hour format and determine AM/PM
                if (hours >= 12) {
                    ampm = 'PM';
                    if (hours > 12) {
                    hours -= 12;
                    }
                }

                // Create the formatted date string
                const formattedDate = `${month}/${day}/${year} ${hours.toString().padStart(2, '0')}:${minutes} ${ampm}`;

                return formattedDate;
            } },
            { name: "priority", align: "center", label: "Priority", field: "prioritystatus", sortable: true },
        ];
        const filterByOptions = ['All', 'In Progress', 'Closed'];
        return {
            tab: ref('requests'),
            setActive: ref('Active'),
            loading: ref(true),
            supportticketsColumns,
            selected: ref([]),
            redModel: ref(true),
            filterByModel: ref('All'),
            filterByOptions
        };
    },
}
</script>
  