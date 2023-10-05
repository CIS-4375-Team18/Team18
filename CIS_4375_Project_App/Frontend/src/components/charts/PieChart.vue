<template>

    <div class="pie-chart-container">
        <apexchart type="pie" 
        height="300"
        :options="chartOptions" 
        :series="series">
        </apexchart>
    </div>

</template>

<script>
export default {
    data() {
        return {
            series: [44, 55, 13, 43, 22],
            chartOptions: {
                chart: {
                    width: 300,
                    type: 'pie',
                },
                labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
                responsive: [{
                    breakpoint: 480,
                    options: {
                        chart: {
                            width: 300
                        },
                        parentHeightOffset: 0,
                    },
                    legend: {
                        position: 'right'
                    }
                }],
                title: {
                    text: "Pie Chart Example"
                },
            },
        }
    }
}

</script>

<style>
.pie-chart-container {
    width: 100%;
}

</style>