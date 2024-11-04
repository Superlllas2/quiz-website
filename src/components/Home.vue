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
  <div class="home-page-wrapper">
    <h1 class="h1-home-page">Hello there</h1>
    <h2 class="h2-home-page">This website was created by:</h2>
    <a class="me" href="https://nevrov.org/" target=”_blank”>Ilia Nevrov</a>
    <p class="text-home-page">Test your knowledge and compete against time!</p>
    <p class="text-home-page">Write topics you of your interest in any language</p>
    <p class="text-home-page">ChatGPT will create 9 questions about them!</p>
    <p class="warning-home-page">Sometime answers may be incorrect, but that's chatgpt's fault :(</p>
    <p class="text-home-page">This website still in development, apologies for any bugs</p>
    <button @click="navigateToAbout" class="home-page-button"> Click me</button>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@1,800&display=swap');

h1 {
  margin-top: 5vw;
}

.home-page-wrapper {
  display: flex;
  margin: 0 auto;
  padding: 20px;
  flex-direction: column;
  text-align: center;
  height: 100%;
  max-width: 600px;
}

.me {
  font-family: "JetBrains Mono", monospace;
  font-size: 1.5rem;
  margin: 15px 0;
  text-decoration: none;
  background: linear-gradient(90deg, #03a9f4, #f441a5, #ffeb3b, #03a9f4);
  background-size: 200% 200%;
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  animation: gradientAnimation 5s linear infinite;
}

.text-home-page, .warning-home-page {
  font-size: 1rem;
  margin-bottom: 10px;
}

@keyframes gradientAnimation {
  0% {
    background-position: 0 50%;
  }
  100% {
    background-position: 1000% 50%;
  }
}

.warning-home-page {
  color: #ffcc00;
  margin-top: 5vw;
}

.home-page-button {
  width: 50%;
  max-width: 200px;
  margin: 20px auto;
  font-size: 1.2rem;
  padding: 10px;
  border: none;
  background-color: #03a9f4;
  color: #fff;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.home-page-button:hover {
  background-color: #0288d1;
}
</style>
