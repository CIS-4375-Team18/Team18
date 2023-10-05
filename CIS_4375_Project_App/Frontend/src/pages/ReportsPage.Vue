<template>

  <q-page>

    <div class="flex-container">
      <div class="main">

        <div class="row flex q-mt-lg">

          <div class="col-md-5 q-ml-xl" style="border: 1px solid black">
            <barChart> </barChart>
          </div>
          <div class="col-md-4 q-ml-xl" style="border: 1px solid black">
            <pieChart class="q-mt-xl"> </pieChart>
          </div>

        </div>

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
.flex-container {
  max-width: 1280px;
  margin: 0 auto;
  border: 1px solid black;
}

</style>