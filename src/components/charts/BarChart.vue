<template>
    <div>
        <div id="bar">
            <bar-chart></bar-chart>
        </div>
    </div>
</template>

<script>
import barchart from './BarChart.js'
export default {
    components: {
        'bar-chart': barchart
    }
}
</script>

<style scoped>

</style>
