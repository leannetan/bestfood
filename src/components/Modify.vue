<template>
  <div>
      <button v-on:click="back()" id="backBtn"> ← </button>
      <ul>
          <li v-for="(item, index) in datapacket" :key="index">
              {{ item.name }}: {{ item.count }} <br>
              <input v-bind:id="index" placeholder="0" type="number" min="0">
          </li> 
          <button v-on:click="updateOrder()"> Update Order </button>
      </ul>
  </div>
</template>

<script>
import database from "../firebase.js"
export default {
    data() {
        return {
            datapacket: {}
        }
    },
    methods: {
        fetchItems: function() {
          let doc_id = this.$route.query.id;
          var docRef = database.collection('orders').doc(doc_id);
          docRef.get().then(x => {
              if (x.exists) {
                  this.datapacket = x.data();
                  console.log(this.datapacket);
              } else {
                  console.log("not found!");
              }
          });
        },
        updateOrder: function() {
            const data = Object.assign({}, this.datapacket);
            for (let i = 0; i < Object.keys(this.datapacket).length; i++) {
                let newNum = document.getElementById(i).value;
                console.log("new: " + newNum);
                if (newNum != 0) {
                    data[i].count = newNum;
                }
            }
            database.collection('orders').doc(this.$route.query.id).update(data).then(() => {
                this.$router.push( {path: '/orders'});
            });
        },
        back: function() {
            this.$router.push({path: '/orders'});
        }
    },
    created() {
        this.fetchItems();
    }
}
</script>

<style scoped>
  * {
      font-family: garamond;
      letter-spacing: 0.2;
  }

  ul {
      list-style-type: none;
      border: 1px solid #222;
      margin: 20px;
      padding: 20px;
      width: 15%;
      float: left;
  }

  input {
      padding: 5px;
      width: 80px;
      margin-top: 5px;
      margin-bottom: 15px;
  }

  button {
    background-color: #d1c0ac;
    color: white;
    border: none;
    border-radius: 5px;
    padding: 8px;
  }

  button:focus {
    border: 2px solid #a79785;
    outline: #a79785;
  }
  
  #backBtn {
    background-color: #d1c0ac;
    color: white;
    padding: 4px;
    width: 30px;
    margin-left: 20px;
    margin-top: 20px;
    float: left;

  }

</style>
