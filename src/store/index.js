import Vue from "vue";
import Vuex from "vuex";
import { TodoStorage } from "../services/TodoStorage";
import {
  SET_TODOS,
  DELETE_TODO,
  UPDATE_TODO,
  SET_FILTER_VALUE,
  SET_SEARCH_TERM,
} from "./mutations-types";

Vue.use(Vuex);
const storage = new TodoStorage("localStorage");

export default new Vuex.Store({
  state: {
    todos: [],
    filterValue: "",
    term: "",
  },
  mutations: {
    [SET_TODOS](state, { type, payload }) {
      switch (type) {
        case "init":
          state.todos = payload;
          return;
        case "add":
          console.log("TODO MUTATIONS ", payload);
          state.todos.push(payload);
          storage.save("todos", state.todos);
          return;
        default:
          return;
      }
    },

    [UPDATE_TODO](state, { type, payload }) {
      const index = state.todos.findIndex((todo) => todo.id === payload.id);
      switch (type) {
        case "done":
          Vue.set(state.todos, index, {
            ...state.todos[index],
            done: !state.todos[index].done,
          });
          storage.save("todos", state.todos);
          return;
        case "title":
          Vue.set(state.todos, index, {
            ...state.todos[index],
            title: payload.title,
          });
          storage.save("todos", state.todos);
          return;
        default:
          return;
      }
    },

    [DELETE_TODO](state, id) {
      const index = state.todos.findIndex((todo) => todo.id === id);
      Vue.delete(state.todos, index);
      storage.save("todos", state.todos);
    },

    [SET_FILTER_VALUE](state, { type, payload }) {
      switch (type) {
        case "init":
          state.filterValue = payload;
          storage.save("filter_value", state.filterValue);
          return;
        case "set":
          state.filterValue = payload;
          storage.save("filter_value", state.filterValue);
          return;
        default:
          return;
      }
    },
    [SET_SEARCH_TERM](state, term) {
      state.term = term;
    },
  },
  actions: {
    saveTodos({ commit }, todo) {
      commit(SET_TODOS, { type: "add", payload: todo });
    },

    cachedTodos({ commit }) {
      if (storage.getTodos() !== null) {
        commit(SET_TODOS, { type: "init", payload: storage.getTodos() });
      }
    },

    saveFilter({ commit }, filter) {
      commit(SET_FILTER_VALUE, {
        type: "set",
        payload: filter,
      });
    },
    cachedFilter({ commit }) {
      if (storage.getFilterValue() !== null) {
        commit(SET_FILTER_VALUE, {
          type: "init",
          payload: storage.getFilterValue(),
        });
      }
    },
    makeTodoDone({ commit }, id) {
      commit(UPDATE_TODO, { type: "done", payload: { id } });
    },
    updatedTitle({ commit }, todo) {
      commit(UPDATE_TODO, { type: "title", payload: todo });
    },
    deleteTodo({ commit }, id) {
      commit(DELETE_TODO, id);
    },
    searchTodos({ commit }, term) {
      commit(SET_SEARCH_TERM, term);
    },
  },
  getters: {
    getTodos: (state) => {
      if (state.term !== "") {
        return state.todos.filter((todo) => todo.title.includes(state.term));
      }
      if (state.filterValue === "all" || state.filterValue === "") {
        return state.todos;
      }
      if (state.filterValue === "done") {
        return state.todos.filter((todo) => todo.done === true);
      }
      if (state.filterValue === "undone") {
        return state.todos.filter((todo) => todo.done === false);
      }
    },
  },
});
