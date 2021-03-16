import { Bar } from 'vue-chartjs'
import database from '../../firebase.js'

export default {
    extends: Bar,
    data: () => ({
        barchartdata: {
            labels: [],
            datasets: [
              {
                label: "Bar Chart",
                data: [],
                backgroundColor: [],
              }
            ]
        },
        options: {
            legend: { display: false },
            title: {
                display: true,
                text: "Total Number of Each Dish"
            },
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        },
        items: {}
    }),
    methods: {
        fetchItems: function() {
            let i = 0;
            database.collection('menu').get().then(qs => {
                qs.forEach(doc => {
                    this.barchartdata.labels.push(doc.data().name)
                    this.items[doc.data().name] = i; // key: item names, value: index in data
                    this.barchartdata.datasets[0].data[i] = 0; // initialise data
                    this.barchartdata.datasets[0].backgroundColor[i] = this.getRandColor(); // initialise colors of bars
                    i++;
                })
            });
            database.collection('orders').get().then(qs => {
                qs.forEach(doc => {
                    var order = doc.data();
                    for (var id in order) {
                        var index = this.items[order[id].name];
                        this.barchartdata.datasets[0].data[index] += parseInt(order[id].count);
                    }
                });
                this.renderChart(this.barchartdata, this.options);
            })
        },
        getRandColor: function() {
            return '#'+Math.floor(Math.random()*16777215).toString(16);
        }
    },
    created() {
        this.fetchItems()
    },
    mounted() {
        //this.renderChart(this.barchartdata, this.options);
    }
}
