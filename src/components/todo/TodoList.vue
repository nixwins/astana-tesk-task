<template>
  <div class="todo-list">
    <todo-item v-for="item in items" :key="item.id" :item="item" />
  </div>
</template>

<script>
import TodoItem from "@/components/todo/TodoItem.vue";

export default {
  name: "TodoList",
  components: { TodoItem },
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped></style>
