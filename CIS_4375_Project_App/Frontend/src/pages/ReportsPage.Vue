<template>

  <q-page>

    <div class="flex-container">
      <div class="main">

        <div class="row flex q-mt-xl justify-around">

          <div class="col-5 q-ml-lg shadow-up-20">
            <barChart> </barChart>
          </div>
          <div class="col-5 q-ml-lg shadow-up-20" >
            <div class="center-content q-mt-xl">
              <pieChart> </pieChart>
            </div>
          </div>

        </div>

      </div>
    </div>

  </q-page>

</template>

<script>
import barChart from 'components/charts/BarChart.vue';
import pieChart from 'components/charts/PieChart.vue';
import axios from 'axios'

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
}

.center-content{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>