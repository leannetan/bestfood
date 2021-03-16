<template>
  <div>
      <button v-on:click="decrement()">-</button>
      {{counter}}
      <button v-on:click="increment()">+</button>
  </div>
</template>

<script>
export default {
  name: "QuantityCounter",
  props: ["item"],
  data() {
    return {
      counter: 0
    }
  },
  methods: {
    increment: function() {
      if (this.counter >= 10) {
        window.alert("You cannot buy more than 10 items.");
      } else {
        this.counter++;
        this.$emit('counter', this.item, this.counter);
      }
    },
    decrement: function() {
      if (this.counter > 0) {
        this.counter--;
        this.$emit('counter', this.item, this.counter);
      }
    }
  }
}
</script>

<style scoped>
  button {
    background-color: #d1c0ac;
    color: white;
    border: none;
    height: 40px;
    width: 40px;
    border-radius: 5px;
    margin: 10px
  }

  button:focus {
    border: 2px solid #a79785;
    outline: #a79785;
  }

</style>
