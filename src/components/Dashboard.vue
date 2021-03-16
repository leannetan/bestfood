<template>
  <div>
    <div id="itemsList">
      <ul>
        <li> <router-link to="/" exact> Home </router-link> </li>
        <li> <router-link to="/orders" exact > Orders </router-link> </li>
        <li> <router-link to="/dashboard" exact > Dashboard </router-link> </li>
      </ul>
    </div>

    <div id="dividers">Bar Chart</div>

    <div id="chart">  
      <BarChart></BarChart>
    </div>

    <div id="dividers">Line Chart</div>

    <div id="chart">
      <psi></psi>
    </div>

  </div>
</template>

<script>
import BarChart from './charts/BarChart.vue'
import psi from './CallAPI.js'
export default {
    components: {
        BarChart, psi
    }
}
</script>

<style scoped>
  * {
      font-family: garamond;
      letter-spacing: 0.8px;
  }
  #itemsList {
    width: 100%;
    margin: 0px;
    padding: 5px;
    box-sizing: border-box;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
  }
  li {
    flex-grow: 1;
    flex-basis: 280px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 10px;
  }

  #chart{
    height:auto;
    width:100%;
    padding:5px;
    position: relative;
  }

  #dividers {
    background-color: #519c9e;
    color: #ffffff;
    padding: 20px;
    margin: 20px;
    font-size: 30px;
    text-align: center;
  }

</style>
