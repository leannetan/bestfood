<template>
  <div id="itemsList">
    <ul>
      <li> <router-link to="/" exact> Home </router-link> </li>
      <li> <router-link to="/orders" exact > Orders </router-link> </li>
      <li> <router-link to="/dashboard" exact > Dashboard </router-link> </li>
    </ul>

    <ul>
      <li v-for="item in items" :key="item.id">
        <p id="itemName">{{ item.name }}</p> <br>
        <img v-bind:src=item.imageURL> <br>
        <p id="price">${{ item.price }}</p>
        <QuantityCounter id="counter" v-bind:item="item" v-on:counter="onCounter"></QuantityCounter>
      </li>   
    </ul>

    <div>
      <Basket v-bind:itemsSelected="itemsSelected" :items="items" id="shoppingBasket"></Basket>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import database from "../firebase.js"
  export default { 
    components: {
      QuantityCounter,
      Basket
    },
    data() {
        return {
            itemsSelected: [],
            items: []
        }
    },
    methods: {
        onCounter: function (item, count) {
          if (this.itemsSelected.length === 0 && count > 0) {
            //If there is nothing in items selected, push the ORDER in
            this.itemsSelected.push([item.name, count, item.price]);
          } else {
            // Loop through everything to check what is not in the basket
            for (let i = 0; i < this.itemsSelected.length; i++) {
              const curr_item = this.itemsSelected[i];
              const item_name = curr_item[0];
              // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
              if (item_name == item.name && count > 0) {
                  Vue.set(this.itemsSelected[i], 1, count);
                  return;
              
              // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
              } else if (item_name == item.name && count == 0) {
                  this.itemsSelected.splice(i, 1);
                  return;
              }
            }
            // otherwise, if the item is not in itemSelected, add it to itemsSelected by pushing the ORDER in.
            this.itemsSelected.push([item.name, count, item.price]);
          }
        },
        fetchItems: function () {
          database.collection('menu').get().then(x => {
            x.docs.forEach(doc => {
              let item = doc.data();
              this.items.push(item);
            });
          });
        }
    },
    created() {
      this.fetchItems()
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
    max-width: 70%;
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
  img {
    width: 135px;
    height: 135px;
  }

  #price {
    font-size: 20px;
  }

  #itemName {
    font-size: 30px;
  }

  #shoppingBasket {
    position: absolute;
    top: 24%;
    left: 76%;
    font-size: 20px;
    margin-top: 50px;
  }

  #counter {
    margin: 10px;
  }

</style>
