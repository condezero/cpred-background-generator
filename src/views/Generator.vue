<template>
  <div class="charsheet-generator">
    <section class="charsheet-header">
      <div class="charsheet-header__roles">
        <select class="select-input" v-on="c">
          <option v-for="role in role_options" :key="`${role}`">
            {{ role }}
          </option>
        </select>
      </div>
      <div class="charsheet-header__roles">
        <button @click="generate">Generate</button>
      </div>
    </section>
    <section class="lifepath-gen">
      <section class="charsheet-lifepath">
        <div class="charsheet-lifepath__block">
          <h3 class="charsheet-lifepath__title">
            Your cultural region and language
          </h3>
          <p class="charsheet-lifepath__content">
            {{ origin !== "" ? origin + ", Language: " + language : "" }}
          </p>
        </div>
      </section>
      
        <div class="charsheet-lifepath__block">
          <h3 class="charsheet-lifepath__title">
            What Are You Like?
          </h3>
          <p class="charsheet-lifepath__content">
            {{ pers !== "" ? pers: "" }}
          </p>
        </div>
   
    </section>
  </div>
</template>
<script>
// import Character from "@/character.js";
import Database from "@/database";
import diceroll from "../diceroll";

export default {
  name: "home",
  components: {},
  data: function () {
    return {
      character: undefined,
      set_role: false,
      origin: "",
      language: "",
      pers: ""
    };
  },
  computed: {
    role_options: function () {
      return Database.roles;
    },
    cultural_origins: function () {
      return Database.cultural_origins;
    },
    personality: function (){
      return Database.personality;
    }
  },
  methods: {
    generateBackground: function () {
      let char_options = {};
      if (this.set_role) {
        char_options.set_role = this.chosen_role;
      }
    },
    generate: function () {
      let origins = this.cultural_origins;
      var redDice = diceroll.d10();
      var theOrigin = origins[redDice];
      this.origin = theOrigin.region;
      this.language =
        theOrigin.languages[
          Math.floor(Math.random() * theOrigin.languages.length - 1)
        ];
      
      this.pers =  this.personality[diceroll.d10()];
    },
  },
};
</script>