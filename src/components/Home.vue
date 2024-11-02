<script>
export default {
  methods: {
    navigateToAbout() {
      this.$router.push('/login');
    }
  }
};

</script>

<template>
  <p>Hello there</p>
  <button @click="navigateToAbout"> Click me </button>
</template>

<style>

</style>