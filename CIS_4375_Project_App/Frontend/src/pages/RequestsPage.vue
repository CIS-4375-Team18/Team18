<template>
    <div class="q-pa-md q-gutter-sm" style="margin-left: 15px; margin-right: 15px;">
        <q-card class="requests-card">
            <q-card-section class="text-white" style="background-color: #af0000;">
                <div class="text-h6 text-left"> Manage Requests </div>
            </q-card-section>
            <q-separator />

            <div class="q-pa-md" style="margin: 0 auto;">
                <q-table title="Requests" color="secondary" :align="left" :loading="loading"
                    :rows="supporttickets" :columns="supportticketsColumns" style="width: 95%; margin: auto">
                    <template v-slot:top>
                        <q-select
                            v-model="filterByModel"
                            :options="filterByOptions"
                            option-value="SUPPORT_TICKET_STATUS_ID" 
                            option-label="SUPPORT_TICKET_STATUS_DESC"
                            label="Filter By Status"
                            style="min-width: 120px; margin-right:10px;"
                            @update:model-value="getSupportTickets"
                        />
                        <q-select
                            v-if="userRole ==='System Administrator' || userRole ==='IT Teacher'"
                            use-input
                            hide-selected
                            fill-input
                            v-model="userModel"
                            :options="endUsersOptions"
                            option-value="END_USER_ID" 
                            option-label="END_USER_FULL_NAME"
                            label="Filter By User"
                            style="min-width: 120px;"
                            @update:model-value="getSupportTickets"
                            @filter="filterFn"
                        />
                    </template>
                     <template #body-cell-status="props">
                        <q-td :props="props">
                            <q-chip :color="props.row.prioritystatus === 'Critical' ? 'red' : (props.row.prioritystatus === 'High' ? 'black' :  (props.row.prioritystatus === 'Medium' ? 'blue' : 'green'))" text-color="white"
                                dense class="text-weight-bolder" square>{{ props.row.prioritystatus }}</q-chip>
                        </q-td>
                    </template>
                </q-table>
            </div>
        </q-card>
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
            supporttickets: [],
            priorities: {},
            filterByOptions: [],
            endUsers: [],
            endUsersOptions: [],
            allUser: { END_USER_ID: null, END_USER_FULL_NAME: 'All Users' }
        }
    },
    async created() {
        // call active prioties api to get the list of all apis
        const activePriorities = await axios.get(`${apiURL}/activepriorities`)
        // map the id and priority description
        activePriorities.data.forEach((priority) => {
          this.priorities[priority.TICKET_PRIORITY_ID] = priority.TICKET_PRIORITY_DESC;
        });

        axios.get(`${apiURL}/activeticketstatuses`).then((res) => {
            this.filterByOptions = res.data;
            this.filterByModel = this.filterByOptions[0]; 
            
            this.setTicketColumns();
            this.getSupportTickets();
        });

        axios.get(`${apiURL}/endusers`).then((res) => {
            const users = res.data.map((user) => {
                return {
                    END_USER_FULL_NAME: `${user.END_USER_FIRST_NAME} ${user.END_USER_LAST_NAME}`,
                    ...user
                }
            });

            this.endUsers = users;
            this.userModel = this.allUser;
            // first option is "All Users"
            // only show 9 users in case the list of users is too long
            this.endUsersOptions = [this.allUser, ...this.endUsers.slice(0, 9)];

        });
    },
    methods: {
        getSupportTickets() {
            this.loading = true;
            this.supporttickets = [];
            axios.post(`${apiURL}/ticketDisplay`, {
                userId: this.userId,
                userRole: this.userRole,
                status: this.filterByModel.SUPPORT_TICKET_STATUS_ID,
                createdByUserId: this.userModel?.END_USER_ID || null
            }).then((res) => {
                if (res.data) {
                    this.setSupportTickets(res.data);
                } else {
                    console.log(res.error);
                }
                this.loading = false;
            });
        },
        setSupportTickets(supporttickets) {
            if (supporttickets) {
                this.supporttickets = supporttickets.map((supportticket) => {
                    // add a new property called priority status to supportticket
                    // set it to the status from priorities based on the current ticket priority id
                    return {
                        prioritystatus: this.priorities[supportticket.TICKET_PRIORITY_ID],
                        ...supportticket
                    }
                });
            }
        },
        setTicketColumns() {
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
                } 
            }];

            if (this.userRole !== 'Staff') {
                
                supportticketsColumns.push({ name: "firstName", align: "center", label: "First Name", field: "END_USER_FIRST_NAME", sortable: true });
                supportticketsColumns.push({ name: "lastName", align: "center", label: "Last Name", field: "END_USER_LAST_NAME", sortable: true });
                supportticketsColumns.push({ name: "email", align: "center", label: "Email", field: "END_USER_EMAIL", sortable: true });
            }

            supportticketsColumns.push({ name: "status", align: "center", label: "Priority", field: "TICKET_PRIORITY_ID", sortable: true });

            this.supportticketsColumns = supportticketsColumns;
        },
        filterFn (val, update, abort) {
            update(() => {
                if (val.length === 0) {
                    this.endUsersOptions = [this.allUser, ...this.endUsers.slice(0, 9)];
                } else {
                    const searchTerm = val.toLowerCase()
                    const results = this.endUsers.filter(user => user.END_USER_FULL_NAME.toLowerCase().indexOf(searchTerm) > -1);
                    this.endUsersOptions = [this.allUser, ...results.slice(0, 9)];
                }
            });
        }
    },
    setup() {
        return {
            tab: ref('requests'),
            setActive: ref('Active'),
            loading: ref(true),
            supportticketsColumns: ref([]),
            selected: ref([]),
            redModel: ref(true),
            filterByModel: ref(null),
            userModel: ref(null),
        };
    },
    computed: {
      ...mapGetters('auth', ['userId','userRole']),

    }
}
</script>
  