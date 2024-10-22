<script>
  import SignupForm from "@/components/SignupForm.vue";
  import TopicChoice from "@/components/TopicChoice.vue";
  import Game from "@/components/Game.vue";

  export default{
    name: 'Body',
    components: {SignupForm, TopicChoice, Game},
    data() {
      return {
        showSignUp: true,
        showTopicsChoice: false,
        showGame: false
      }
    },
    methods: {
      toggleSignUp() {
        this.showSignUp = !this.showSignUp;
      },
      toggleTopics() {
        this.showTopicsChoice = !this.showTopicsChoice;
      },
      toggleGame() {
        this.showGame = !this.showGame;
      }
    }
  }
</script>

<template>
  <div class="body">
    <div v-if="showSignUp" class="signUpForm">
      <SignupForm/>
    </div>
    <div v-if="showTopicsChoice">
      <TopicChoice/>
    </div>
    <div v-if="showGame">
      <Game/>
    </div>
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
    display: flex;
    justify-content: center;
    box-shadow: rgba(134, 134, 190, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  }

  div.body h1 {
    text-align: center;
  }

  div.signUpForm {
    width: 50%;
  }
</style>