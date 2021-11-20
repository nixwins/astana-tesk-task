<template>
  <div class="search-panel">
    <form @submit.prevent="$emit('search', term)">
      <div class="form-row">
        <input
          v-model="term"
          @input="$emit('search', term)"
          type="text"
          class="input search-panel__input"
        />
        <v-button class="button-primary">Search</v-button>
      </div>
    </form>
  </div>
</template>

<script>
import VButton from "@/components/ui/VButton.vue";

export default {
  name: "SearchPanel",
  components: { VButton },
  data() {
    return {
      term: "",
    };
  },
};
</script>

<style lang="scss" scoped>
.search-panel {
  &__input {
    margin-right: 1rem;
    @media screen and (max-width: 375px) {
      margin-bottom: 0.5rem;
    }
  }
}
</style>
