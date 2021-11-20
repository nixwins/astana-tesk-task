<template>
  <div class="home">
    <header class="flex-row">
      <todo-filter />
      <search-panel @search="search" />
    </header>
    <todo-list :items="todos" />
    <footer>
      <todo-add />
    </footer>
  </div>
</template>

<script>
import TodoList from "@/components/todo/TodoList.vue";
import TodoFilter from "@/components/todo/TodoFilter.vue";
import TodoAdd from "@/components/todo/TodoAdd.vue";
import SearchPanel from "@/components/SearchPanel.vue";
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Home",
  components: { TodoFilter, SearchPanel, TodoList, TodoAdd },
  computed: {
    ...mapGetters({ todos: "getTodos" }),
  },
  mounted() {
    this.cachedTodos();
  },
  methods: {
    ...mapActions(["cachedTodos", "searchTodos"]),
    search(term) {
      this.searchTodos(term);
    },
  },
};
</script>
