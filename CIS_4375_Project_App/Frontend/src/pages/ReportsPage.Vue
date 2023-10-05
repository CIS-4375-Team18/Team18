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
          <pieChart> </pieChart>
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

}

</script>

<style scoped>

</style>