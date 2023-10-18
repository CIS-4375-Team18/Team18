<template>
  
    <q-page padding> 
      <div class="row q-col-gutter-lg">
        <div class="col-md-4">
          <q-card class="shadow-up-10" style="height: 130px;">
            <q-card-section class="q-ml-xl">
                <div v-if="userRole != 'Staff'" class="text-h3 text-bold q-mt-md">{{ totalTicketCount }}</div>
                <div v-else class="text-h3 text-bold q-mt-md">{{ userTicketCount }}</div>
                <div class="text-subtitle3 text-bold" style="color: #626262;">Total Number Of Tickets</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-4">
          <q-card class="shadow-up-10" style="height: 130px;">
            <q-card-section class="q-ml-xl">
                <div v-if="userRole != 'Staff'" class="text-h3 text-bold q-mt-md">{{ totalOpenTickets }}</div>
                <div v-else class="text-h3 text-bold q-mt-md">{{ userOpenTickets }}</div>
                <div class="text-subtitle3 text-bold" style="color: #626262;">Open Tickets</div>
            </q-card-section>
          </q-card>
        </div>
        <div class="col-md-4">
          <q-card class="shadow-up-10" style="height: 130px;">
            <q-card-section class="q-ml-xl">
                <div v-if="userRole != 'Staff'" class="text-h3 text-bold q-mt-md">{{ totalClosedTickets }}</div>
                <div v-else class="text-h3 text-bold q-mt-md">{{ userClosedTickets }}</div>
                <div class="text-subtitle3 text-bold" style="color: #626262;">Completed Tickets</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
  
      <div class="row q-col-gutter-md" style="margin-top: 10px;">
        <div class="col-md-6 col-xs-12">
          <q-card class="shadow-up-9">
            <barChart> </barChart>
          </q-card>
        </div>
        <div class="col-md-6 col-xs-12">
          <q-card class="fit shadow-up-9">
            <div v-if="!isPieLoading">
              <q-inner-loading :showing="isVisible" size="100px" color="primary" label="Please Wait..."></q-inner-loading>
            </div>
            <div v-else>
              <pieChart
                v-if="showPieChart"
                :series="userRole !== 'Staff' ? pieSeries : userPieSeries"
                :options="userRole !== 'Staff' ? chartOptions : userChartOptions"
              >
              </pieChart>
              <div v-else class="q-pa-md">
                <div class="q-mb-md text-center">
                  <q-flex justify="center">
                    <q-space />
                    <q-icon name="warning" size="2em" color="warning" class="q-mr-md" />
                    <p class="text-h6">User Has No Data to Be Shown.</p>
                    <q-space />
                  </q-flex>
                </div>
              </div>
            </div>
          </q-card>
        </div>
      </div>
  
      <div class="row" style="margin-top: 20px;">
        <div class="col-md-12">
          <q-card class="shadow-up-9">
            <lineChart
              v-if="userRole != 'Staff'"
            >
            </lineChart>
          </q-card>
        </div>
      </div>
  
    </q-page>
  
  </template>
  
  <script>
  import { defineAsyncComponent } from 'vue';
  import axios from 'axios';
  import { mapGetters } from 'vuex';
  
  const barChart = defineAsyncComponent(() =>
    import('components/charts/BarChart.vue')
  )
  
  const pieChart = defineAsyncComponent(() =>
    import('components/charts/PieChart.vue')
  )
  
  const lineChart = defineAsyncComponent(() => 
    import('components/charts/LineChart.vue')
  )
  
  export default {
  
    components: {
      barChart,
      pieChart,
      lineChart,
    },
  
    data() {
      return {
        pieSeries: [],
        chartOptions: {
          labels: [],
          title: {
            text: ''
          },
        },
        userPieSeries: [],
        userChartOptions: {
          labels: [],
          title: {
            text: ''
          },
        },
  
        isPieLoading: false,
        isVisible: true,
        totalTicketCount: '',
        userTicketCount: '',
        totalOpenTickets: '',
        userOpenTickets: '',
        totalClosedTickets: '',
        userClosedTickets: '',
      }
    },
  
    created() {
      axios.get(`http://localhost:8001/api/supporttickets`).then((res) => {
        const allTickets = res.data;
  
        const userTickets = allTickets.filter(ticket => ticket.END_USER_ID === this.userID);
        const openTickets = allTickets.filter(ticket => ticket.SUPPORT_TICKET_STATUS_ID === 1);
        const openTicketsByUser = allTickets.filter(ticket => ticket.SUPPORT_TICKET_STATUS_ID === 1 
          && ticket.END_USER_ID === this.userID);
        const closedTickets = allTickets.filter(ticket => ticket.SUPPORT_TICKET_STATUS_ID === 3);
        const closedTicketsByUser = allTickets.filter(ticket => ticket.SUPPORT_TICKET_STATUS_ID === 3 
          && ticket.END_USER_ID === this.userID);
  
        this.totalTicketCount = allTickets.length;
        this.userTicketCount = userTickets.length;
        this.totalOpenTickets = openTickets.length;
        this.userOpenTickets = openTicketsByUser.length;
        this.totalClosedTickets = closedTickets.length;
        this.userClosedTickets = closedTicketsByUser.length;
      })
  
    },
  
    methods: {
      async getTicketCountByCat() {
        try {
          const res = await axios.get(`http://localhost:8001/api/ticketbycat`)
  
          const filterData = res.data.filter(sub => sub.NUMBER_OF_TICKETS_BY_CAT >= 0)
          if (filterData.length > 0) {
            this.pieSeries = filterData.map((sub) => sub.NUMBER_OF_TICKETS_BY_CAT)
            this.chartOptions.labels = filterData.map((sub) => sub.TICKET_CATEGORY_DESC)
            this.chartOptions.title.text = 'Tickets By Categories'
            this.isPieLoading = true
  
            setTimeout(() => {
              this.isVisible = false;
            }, 4000);
          } else {
            this.isVisible = true;
          }
        } catch(err) {
          console.log(err)
        }
      },
      async getTicketCountByCatByUSER() {
        try {
          const userID = this.userID;
  
          const res = await axios.get(`http://localhost:8001/api/ticketbycat/${userID}`)
  
          const filterData = res.data.filter(sub => sub.NUMBER_OF_TICKETS_BY_CAT >= 0)
          if (filterData.length > 0) {
            this.userPieSeries = filterData.map((sub) => sub.NUMBER_OF_TICKETS_BY_CAT)
            this.userChartOptions.labels = filterData.map((sub) => sub.TICKET_CATEGORY_DESC)
            this.userChartOptions.title.text = 'Tickets By Categories'
            this.pieLoading = false
            console.log(this.userPieSeries.data)
            console.log(this.userChartOptions.labels)
  
            setTimeout(() => {
              this.visible = false;
            }, 4000);
          } else {
            this.visible = true;
          }
        } catch(err) {
          console.log(err)
        }
      },
  
    },
  
    mounted() {
      this.getTicketCountByCat();
      this.getTicketCountByCatByUSER();
    },
  
    computed: {
      ...mapGetters('auth', ['userID', 'userRole']),
      showPieChart() {
        if (this.userRole !== 'Staff') {
          return this.pieSeries.length > 0;
        } else {
          return this.userPieSeries.some(value => value !== 0);
        }
      },
    }
  
  }
  </script>
  
  <style>
  
  .text-container {
    margin-left: 30px;
  }
  
  </style>
  