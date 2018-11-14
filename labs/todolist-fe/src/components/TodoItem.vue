<template>
  <div>
    <div class="itemCardAndFlag">
    <md-list-item
      @click="markCompleted()"
      >
      <checkbox v-model="todoItem.completed" class="checkbox-completed"/>

        <span class="md-list-item-text" :class="{'strike-through': todoItem.completed}">{{ todoItem.title }}</span>
      </md-list-item>
      <!-- TODO - SVG for use in Lab3 -->
        <!-- <svg  height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg" ><path d="M0 0h24v24H0z" fill="none"/><path d="M14.4 6L14 4H5v17h2v-7h5.6l.4 2h7V6z"/></svg> -->
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { Checkbox, Radio } from "vue-checkbox-radio";
Vue.component("checkbox", Checkbox);
Vue.component("radio", Radio);
let biscuits;

export default {
  name: "TodoItem",
  props: {
    // type any object ;)
    todoItem: {}
  },
  methods: {
    markCompleted() {
      this.$store.dispatch("updateTodo", { id: this.todoItem._id });
      console.info("INFO - Mark todo as completed ", this.todoItem.completed);
    },
    markImportant() {
      // TODO - FILL THIS OUT IN THE LAB EXERCISE
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.md-list-item {
  width: 320px;
  max-width: 100%;
  height: 50px;
  display: inline-block;
  overflow: auto;
}

.md-list-item-text {
  padding-left: 0.5em;
}

.itemCardandFlag {
  display: inline-block;
}

.strike-through {
  text-decoration: line-through;
  font-style: italic;
}

.important-flag {
  height: 50px;
  margin: 0px;
}
.red-flag {
  fill: #cc0000;
}
</style>
