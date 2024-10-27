<script>
  export default{
    name: 'Body',
  }
</script>

<template>
  <div class="body">
    <slot></slot>
  </div>
</template>

<style scoped>
  div.body {
    width: 50%;
    height: 80vh;
    align-content: center;
    margin: auto;
    background-color: #333;
    border-radius: 20px;
    justify-content: center;
    box-shadow: rgba(134, 134, 190, 0.25) 0 13px 27px -5px, rgba(0, 0, 0, 0.3) 0 8px 16px -8px;
  }

  div.body h1 {
    text-align: center;
  }
</style>