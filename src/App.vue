<template>
  <div>
    <header id="store"> 
      <h1> BEST FOOD </h1>
      <p> Good food at affordable prices </p>
    </header>
    <!-- <PageContent></PageContent> -->
    <router-view></router-view>
  </div>
</template>

<script>
//import PageContent from './components/PageContent.vue'
export default {
  components: {
    //PageContent
  }
}
</script>

<style>
  h1 {
    font-size: 50px;
    letter-spacing: 3px;
    margin-bottom: 0;
  }
  p {
    font-family: garamond;
    letter-spacing: 0.2px;
  }
  #store {
    width:100%;
    height: 150px;
    padding: 10px;
    color: white;
    background-color: #9fccd1;
    text-align: center;
  }
</style>
