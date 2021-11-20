<template>
  <select v-model="filter">
    <option v-for="opt in options" :key="opt.id" :value="opt.value">
      {{ opt.label }}
    </option>
  </select>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "TodoFilter",
  computed: {
    ...mapState(["filterValue"]),
  },
  data() {
    return {
      filter: "",
      options: [
        { id: 1, value: "all", label: "All", selected: false },
        { id: 2, value: "done", label: "Done", selected: false },
        { id: 3, value: "undone", label: "Undone", selected: true },
      ],
    };
  },
  mounted() {
    this.cachedFilter();
    this.filter = this.filterValue;
  },
  methods: {
    ...mapActions(["cachedFilter", "saveFilter"]),
  },
  watch: {
    filter: {
      handler() {
        this.saveFilter(this.filter);
      },
    },
  },
};
</script>

<style lang="scss" scoped></style>
