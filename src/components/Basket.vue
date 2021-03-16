<template>
  <div>
      <p>Menu</p>
      <ul>
          <li v-for="item in itemsSelected" :key="item.name">
              {{ item[0] }} x {{ item[1] }}
          </li>    
      </ul>
      <button v-on:click="findTotal(); sendOrder()"> Calculate total </button>
      <div v-show="clicked">
          <p>Subtotal: ${{ total }}</p>
          <p>Grand Total: ${{ grandTotal }} </p>
      </div>

  </div>
</template>

<script>
import database from "../firebase.js"
  export default {
      props:  {
          itemsSelected : Array,
          items : Array
      },
      data() {
          return {
              clicked: false,
              total:0
          }
      },
      computed: {
          grandTotal: function() {
              return Math.round(this.total * 1.07 * 100) / 100;
          }
      },
      methods: {
          findTotal: function() {
              var price = 0;
              for (let i = 0; i < this.itemsSelected.length; i++) {
                  price += this.itemsSelected[i][1] * this.itemsSelected[i][2];
              }
              this.total = price;
              this.clicked = true;
          },
          sendOrder: function() {
              const data = {}

              for (var i = 0; i < this.items.length; i++) {
                  let thisName = this.items[i].name;
                  var order = {}
                  for (var j = 0; j < this.itemsSelected.length; j++) {
                      let item = this.itemsSelected[j];

                      // if item is found in basket, add count to order
                      if (thisName == item[0]) {
                          order = {
                              name: item[0],
                              count: item[1], 
                              price: item[2],
                          };
                          break;
                      }
                  }

                  // if item is not found in basket, add count 0
                  if (Object.keys(order).length === 0) {
                      order = {
                          name: thisName,
                          count: 0,
                          price: this.items[i].price
                      }
                  } 
                  console.log("Added: " + order.name);
                  data[i] = order;
                  order = {};
              }
              database.collection('orders').add(data).then(() => { location.reload() });
          }
      }
  }
</script>

<style scoped>
  button {
    font-family: garamond;
    font-size: 15px;
    color: white;
    background-color: #a79785;
    border: none;
    padding: 10px;
    border-radius: 5px;
  }

  button:focus {
    border: 2px solid #66543f;
    outline:  none;
  }

</style>
