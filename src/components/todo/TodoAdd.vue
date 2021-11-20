<template>
  <form @submit.prevent="addTodo" class="todo-add-form" ref="todoForm">
    <div class="form-col todo-add-form__inputs">
      <label class="todo-add-form__label">Todo title</label>
      <input v-model="title" class="input" type="text" name="todo" />
    </div>
    <div class="form-col">
      <label class="todo-add-form__label">Todo text</label>
      <input v-model="text" class="input" type="text" name="todo" />
    </div>
    <div class="todo-add-form__actions form-row">
      <v-button class="button-primary">Add new</v-button>
    </div>
  </form>
</template>

<script>
import VButton from "@/components/ui/VButton.vue";
import { mapActions } from "vuex";

export default {
  name: "TodoAdd",
  components: { VButton },
  data() {
    return {
      title: "",
      text: "",
    };
  },
  methods: {
    ...mapActions(["saveTodos"]),
    addTodo() {
      if (this.title && this.text) {
        const id = new Date().getTime();
        // console.log(id);
        this.saveTodos({ id, title: this.title, text: this.text, done: false });

        this.$refs.todoForm.reset();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.todo-add-form {
  &__inputs {
    // margin-bottom: 2rem;
  }
  &__actions {
    justify-content: center;
  }
  &__label {
    margin-bottom: 0.5rem;
  }
}
.form-col {
  margin-bottom: 0.5rem;
}
</style>
