<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
import Body from './components/Body.vue'

export default {
  name: 'App',
  components: {Header, Footer, Body}
}
</script>

<template>
  <div id="app">
    <Header/>
    <Body>
    <router-view></router-view>
    </Body>
    <Footer/>
  </div>
</template>

<style>
</style>