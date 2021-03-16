<template>
  <div>
      <ul>
        <li> <router-link to="/" exact> Home </router-link> </li>
        <li> <router-link to="/orders" exact > Orders </router-link> </li>
      <li> <router-link to="/dashboard" exact > Dashboard </router-link> </li>
      </ul>

      <ul>
          <li v-for="order in orders" :key="order.name">
              <p v-for="o in order[1]" :key="o"> {{ o.name }}: {{ o.count }} </p>
              <button v-bind:id="order[0]" v-on:click="deleteItem($event)"> Delete </button>
              <button v-bind:id="order[0]" v-on:click="route($event)"> Modify </button>
          </li>
      </ul>
      
  </div>
</template>

<script>
import database from "../firebase.js"
export default {
    data() {
        return {
            orders: []
        }
    },
    methods: {
        fetchItems: function() {
          database.collection('orders').get().then(x => {
            x.docs.forEach(doc => {
                let id = doc.id;
                let ord = Object.values(doc.data());
                this.orders.push([id, ord]);
            });
          });
        },
        deleteItem: function(event) {
            let doc_id = event.target.getAttribute("id");
            console.log("Deleting: " + doc_id);
            database.collection('orders').doc(doc_id).delete().then(() => {
                var filteredList = this.orders.filter( x => x.id != doc_id );
                this.orders = filteredList;
            });
        },
        route: function(event) {
            let doc_id = event.target.getAttribute("id");
            this.$router.push({ path: 'modify', query: {id: doc_id} });
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
      letter-spacing: 0.8px;
  }
  ul {
    display: flex;
    flex-wrap: wrap;
    list-style-type: none;
    padding: 0;
  }

  li {
    flex-grow: 1;
    flex-basis: 300px;
    text-align: center;
    padding: 10px;
    border: 1px solid #222;
    margin: 10px;
  }
  button {
    background-color: #d1c0ac;
    color: white;
    border: none;
    border-radius: 5px;
    margin: 8px;
    padding: 8px;
  }

  button:focus {
    border: 2px solid #a79785;
    outline: #a79785;
  }
</style>
