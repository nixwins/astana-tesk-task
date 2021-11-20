<template>
  <button class="button" @click="$emit('click')">
    <slot />
  </button>
</template>

<style lang="scss" scoped>
.button {
  font-size: 1.2rem;
  padding: 0.5em 2em;
  text-align: center;
  border: none;
  border-radius: 0.5em;
  color: #fff;

  cursor: pointer;
  &:focus {
    outline: none;
  }
}
</style>
