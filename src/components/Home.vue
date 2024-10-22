<script>
import Header from './Header.vue';
import Footer from './Footer.vue';
import Body from './Body.vue';

export default {
  methods: {
    navigateToAbout() {
      this.$router.push('/signup');
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