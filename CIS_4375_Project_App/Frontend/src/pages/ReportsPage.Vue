<template>

  <q-page>
    <barChart> </barChart>
  </q-page>

</template>

<script>
import { defineAsyncComponent } from 'vue';
import axios from 'axios'

const barChart = defineAsyncComponent(() =>
  import('components/charts/BarChart.vue')
)

export default {

  components: {
    barChart,
  },

}

</script>