<template>

  <q-page padding style="background-color: #666262">

    <div class="row q-col-gutter-md">

      <div class="col-md-6 col-xs-12">
        <q-card>
          <barChart> </barChart>
        </q-card>
      </div>
      <div class="col-md-6 col-xs-12">
        <q-card class="fit">
          <div v-if="!pieLoading">
            <q-inner-loading :showing="visible" size="100px" color="primary" label="Please Wait..."></q-inner-loading>
          </div>
          <div v-else>
            <pieChart
              v-if="pieLoading"
              :series="pieSeries"
              :options="chartOptions"
            >
            </pieChart>
          </div>
        </q-card>
      </div>

    </div>

  </q-page>

</template>

<script>
import { defineAsyncComponent } from 'vue';
import axios from 'axios'

const barChart = defineAsyncComponent(() =>
  import('components/charts/BarChart.vue')
)

const pieChart = defineAsyncComponent(() =>
  import('components/charts/PieChart.vue')
)

export default {

  components: {
    barChart,
    pieChart,
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
      pieLoading: false,
      visible: true,
    }
  },

  methods: {
    async getTicketByCatCount() {
      try {
        const res = await axios.get(`http://localhost:8001/api/ticketbycat`)

        const filterData = res.data.filter(sub => sub.NUMBER_OF_TICKETS_BY_CAT >= 0)
        if (filterData.length > 0) {
          this.pieSeries = filterData.map((sub) => sub.NUMBER_OF_TICKETS_BY_CAT)
          this.chartOptions.labels = filterData.map((sub) => sub.TICKET_CATEGORY_DESC)
          this.chartOptions.title.text = 'Tickets By Categories'
          this.pieLoading = true

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
    this.getTicketByCatCount();
  },



}

</script>
