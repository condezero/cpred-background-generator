<template>
  <div id="app">
    <header class="header">
      <div class="container">
      <router-link to="/" class="header__link">Cyberpunk Red Character Generator</router-link>
      </div>
    </header>

    <main class="container">
      <router-view />
    </main>

    <footer class="footer container">
      <div class="footer__content">
      </div>
      <div class="footer__content">
        <a href="">Contribute on Github</a>
      </div>
    </footer>
  </div>
</template>