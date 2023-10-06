<template>

  <q-page padding>

    <div class="row q-col-gutter-md">

      <div class="col-md-6 col-xs-12">
        <q-card>
          <barChart> </barChart>
        </q-card>
      </div>
      <div class="col-md-6 col-xs-12">
        <q-card class="fit">
          <pieChart
            v-if="pieLoading"
            :series="pieSeries"
            :options="chartOptions"
          >
          </pieChart>
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
    }
  },

  methods: {
    async getCount() {
      try {
        const res = await axios.get(`http://localhost:8001/api/countsubcat`)

        const filterData = res.data.filter(sub => sub.NUMBER_OF_SUBCATEGORIES >= 0)
        if (filterData.length > 0) {
          this.pieSeries = filterData.map((sub) => sub.NUMBER_OF_SUBCATEGORIES)
          this.chartOptions.labels = filterData.map((sub) => sub.TICKET_CATEGORY_DESC)
          this.chartOptions.title.text = 'Pie Chart Example'
          this.pieLoading = true
        }
      } catch(err) {
        console.log(err)
      }
    }
  },

  mounted() {
    this.getCount();
  },

}

</script>