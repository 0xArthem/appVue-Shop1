<template>
  <nav>
    <nav-container>
      <router-link to="/"><em class="fas fa-home"></em></router-link>
    </nav-container>
  </nav>
  <router-view/>
</template>

<style scoped>
  nav {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    color: black;
    padding:15px;
  }
  nav-container{
    display: flex;
    justify-content:flex-end;
    padding-top:10px;
  }
  .fas{
    margin-left:25px;
    margin-right:25px;
  }
  img{
    width:75px;
    float:left;
    border-radius: 100%;
  }

  nav a{
    font-size:20px;
    color: black;
  }
  nav a.router-link-exact-active {
    color: #42b983;
  }
</style>

<style>
  #app{
      overflow-x: hidden;
  }
</style>