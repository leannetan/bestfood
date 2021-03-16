import { Line } from 'vue-chartjs'
import axios from 'axios'

export default {
    extends: Line,
    data: function() {
        return {
            linedata: {
                labels: [],
                datasets: [
                    {
                        data: [],
                        fill: false
                    }
                ]
            },
            options: {
                legend: { 
                    display: true
                },
                title: {
                    display: true,
                    text: 'PSI Twenty Four Hourly (By Region)'
                },
                responsive: true,
                maintainAspectRatio: false
            },
            regions: {} // stores key: region, value: index on dataset
        }
    },
    methods: {
        fetchItems: function() {
            axios.get('https://api.data.gov.sg/v1/environment/psi?date=2021-02-23')
            .then(response => {
                response.data.items.forEach(data => {
                    this.linedata.labels.push(data.timestamp);
                    var psi_data = data.readings.psi_twenty_four_hourly;
                    var i = 0;
                    for (let key in psi_data) { // iterate through regions 

                        if (Object.keys(this.regions).length < Object.keys(psi_data).length) { //check if all regions are initialised
                            this.regions[key] = i; // give each region a position on dataset
                            this.linedata.datasets[i] = { label: key, data: [], fill: false, borderColor: this.getRandColor() }; // initialise datasets
                            i++;
                        }

                        // push data from each region into its own dataset
                        this.linedata.datasets[this.regions[key]].data.push(psi_data[key]);
                    }
                })
                this.renderChart(this.linedata, this.options);
            })
        },
        getRandColor: function() {
            return '#'+Math.floor(Math.random()*16777215).toString(16);
        }
    },
    created() {
        this.fetchItems()
    }
}
