<template>
    <md-field>
      <label>New ToDo</label>
      <md-input :placeholder="placeholderMsg"
        @keyup.enter="newTodoAdded"
        v-model="newTodo"
      ></md-input>
    </md-field>
  </template>
<script>
export default {
  name: "NewTodo",
  props: {
    placeholderMsg: String
  },
  data() {
    return {
      newTodo: ""
    };
  },
  methods: {
    newTodoAdded(e) {
      console.info("INFO - Adding new todo ", this.newTodo);
      this.newTodo = e.target.value;
      this.$store.dispatch("setNewTodo", this.newTodo);
      this.$store.dispatch("addTodo");
      this.$store.dispatch("clearNewTodo");
      this.newTodo = "";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
