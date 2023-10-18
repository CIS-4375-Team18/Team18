<template>

    <apexchart type="bar" 
    height="300" 
    :options="chartOptions" 
    :series="series">
    </apexchart>

</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            series: [{
                name: 'Closed Tickets',
                data: []
            }],
            chartOptions: {
                chart: {
                    height: 350,
                    type: 'bar',
                    toolbar: {
                        show: true,
                        offsetX: 0,
                        offsetY: 0,
                        tools: {
                            zoom: true,
                            zoomin: true,
                            zoomout: true,
                            pan: true,
                            reset: true
                        }
                    }
                },
                plotOptions: {
                    bar: {
                        borderRadius: 10,
                        dataLabels: {
                            position: 'top', // top, center, bottom
                        },
                    }
                },
                dataLabels: {
                    enabled: true,
                    offsetY: -20,
                    style: {
                        fontSize: '12px',
                        colors: ["#304758"]
                    }
                },
            
                xaxis: {
                    categories: [],
                    position: 'top',
                    axisBorder: {
                        show: false
                    },
                    tickPlacement: "on",
                    axisTicks: {
                        show: false
                    },
                    crosshairs: {
                        fill: {
                            type: 'gradient',
                            gradient: {
                                colorFrom: '#D8E3F0',
                                colorTo: '#BED1E6',
                                stops: [0, 100],
                                opacityFrom: 0.4,
                                opacityTo: 0.5,
                            }
                        }
                    },
                    tooltip: {
                        enabled: true,
                    }
                },
                yaxis: {
                    axisBorder: {
                        show: false
                    },
                    axisTicks: {
                        show: false,
                    },
                    labels: {
                        show: false,
                    }
            
                },
                title: {
                    text: 'Tickets Closed Per Month, 2023',
                    align: 'center',
                    style: {
                        color: '#444'
                    }
                }
            },
        }
    },

    mounted() {
        this.fetchAndPopulateBarchart();
    },

    methods: {
        updateAxis(data) {
            this.chartOptions = {
                ...this.chartOptions,
                xaxis: {
                    categories: data
                }
            }
        },

        createMonthsAndYear() {
            const currentYear = new Date().getFullYear();
            const monthsAndYear = [];
            for(let i = 11; i >= 0; i--) {
                const month = i < 9 ? `0${i+1}` : `${i+1}`;
                const monthName = new Date(`${currentYear}-${month}-01`).toLocaleString('default', { month: 'short' });
                const formattedMonthYear = `${monthName}${currentYear}`;
                monthsAndYear.push(formattedMonthYear);
            }
            return monthsAndYear;
        },

        fetchAndPopulateBarchart() {
            axios.get(`http://localhost:8001/api/ticketsclosedcountmonthly`)
            .then(res => {
                const apiData = res.data;
                const monthsData = this.createMonthsAndYear();
                this.updateAxis(monthsData);

                monthsData.forEach((monthYear) => {
                    const matchingData = apiData.find(item => {
                        const itemMonthYear = this.formatMonthYear(item.MONTHYEAR);
                        return itemMonthYear === monthYear;
                        
                    });
                    if (matchingData) {
                        this.series[0].data.push(matchingData.CLOSED_TICKETS_COUNT);
                    } else {
                        this.series[0].data.push(0);
                    }
                })
                console.log(this.chartOptions.xaxis.categories)
                console.log(this.series[0].data)
            })
            .catch(error => {
                console.error('Error fetching data: ', error)
            })
        },

        formatMonthYear(monthYear) {
            const [month, year] = monthYear.split('-');
            const monthName = new Date(`${year}-${month}-01`).toLocaleString('default', { month: 'short' });
            return `${monthName}${year}`;
        }

    },
}

</script>