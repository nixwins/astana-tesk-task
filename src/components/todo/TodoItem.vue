<template>
  <div class="todo-item flex-col">
    <div
      class="todo-item__content"
      :class="[item.done ? 'todo-item__done' : '']"
    >
      <div class="todo-item__title-wrapper flex-row">
        <input
          class="todo-item__title"
          :class="{ 'input-disabled': isDisabledTitle }"
          v-model="todoTitle"
          :disabled="isDisabledTitle"
          ref="titleInputRef"
        />
        <a v-if="!item.done" @click.stop="editTitle" href="#">
          {{ isDisabledTitle ? "edit" : "save" }}
        </a>
      </div>
      <p class="todo-item__description">{{ item.text }}</p>
    </div>
    <div class="todo-item__actions flex-row">
      <v-button
        class="button-danger todo-item__button-delete"
        @click="deleteTodo(item.id)"
      >
        <i class="far fa-trash-alt"></i>
      </v-button>
      <v-button
        class="button-important todo-item__button-done"
        @click="makeTodoDone(item.id)"
      >
        <i :class="[item.done ? 'fas fa-bookmark' : 'far fa-bookmark']"></i>
      </v-button>
    </div>
  </div>
</template>

<script>
import VButton from "@/components/ui/VButton.vue";
import { mapActions } from "vuex";

export default {
  name: "TodoItem",
  components: { VButton },
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data: () => ({
    todoTitle: "",
    isDisabledTitle: true,
  }),

  mounted() {
    this.todoTitle = this.item?.title;
    // this.todoItem = JSON.parse(JSON.stringify(this.item));
  },
  methods: {
    ...mapActions(["deleteTodo", "makeTodoDone", "updatedTitle"]),
    editTitle() {
      //   this.$refs["titleInputRef"].$el.focus();
      if (this.isDisabledTitle) {
        this.isDisabledTitle = false;
        return;
      }
      this.updatedTitle({ ...this.item, title: this.todoTitle });
      this.isDisabledTitle = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-item {
  width: 100%;
  padding: 0.5rem 1rem;
  justify-content: space-between;
  border: 1px solid #b5b5b5;
  margin: 0.5rem 0;

  &__content {
    flex-grow: 2;
    margin-right: 0.5rem;
    margin-bottom: 0.5rem;
    border-radius: 0.5em;
  }
  &__done {
    background-color: olive;
    .todo-item__title,
    .todo-item__description {
      text-decoration: line-through;
    }
  }
  &__title-wrapper {
    justify-content: center;
  }
  &__title {
    text-align: center;
  }
  &__title,
  &__description {
    margin: 0.25rem;
  }
  &__actions {
    justify-content: center;
  }
  &__button-delete {
    margin-right: 0.5rem;
  }
}
</style>
