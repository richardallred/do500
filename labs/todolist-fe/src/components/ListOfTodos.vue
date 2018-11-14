<template>
  <div>
    <md-list>
      <!-- TODO - change to an actual KEY when i connect to the DB -->
      <div v-for="item in todos" :key="item.id" >
        <TodoItem
          :todoItem=item
        ></TodoItem>
      </div>
    </md-list>
  </div>
</template>


<script>
import TodoItem from "@/components/TodoItem.vue";
import { mapGetters } from "vuex";

export default {
  name: "ListOfTodos",
  props: {},
  components: {
    TodoItem
  },
  computed: {
    ...mapGetters(["todos"])
  },
  created() {
    this.$store.dispatch("loadTodos");
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
