<template>
  <div class="home">
    <h1>User settings</h1>
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'UserSettingsView',
  components: {
    HelloWorld
  }
}
</script>
