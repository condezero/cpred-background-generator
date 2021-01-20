<template>
  <div class="charsheet-generator">
    <section class="charsheet-header">
      <div class="charsheet-header__roles">
        <select
          class="select-input"
          @change="
            onChangeRole($event);
            set_role = !set_role;
          "
          v-model="chosen_role"
        >
          <option v-for="role in role_options" :key="`${role}`">
            {{ role }}
          </option>
        </select>
      </div>
      <div class="charsheet-header__roles">
        <button v-if="set_role" @click="generate">Generate</button>
      </div>
    </section>
    <section v-if="set_role" class="lifepath-gen">

      <h1 class="lifepath-gen__title">Cultural Origins</h1>
      <section class="charsheet-lifepath">
        <div class="charsheet-lifepath__block">
          <h3 class="charsheet-lifepath__title">region and language</h3>
          <p class="charsheet-lifepath__content">
            {{ origin !== "" ? origin + ", Language: " + language : "" }}
          </p>
        </div>
      </section>
    </section>
    <section v-if="set_role" class="lifepath-gen">

      <h1 class="lifepath-gen__title">Your Personality</h1>
       <section class="charsheet-lifepath">
        <div class="charsheet-lifepath__block">
          <h3 class="charsheet-lifepath__title">What Are You Like?</h3>
          <p class="charsheet-lifepath__content">
            {{ pers !== "" ? pers : "" }}
          </p>
        </div>
         </section>
    </section>
    <section v-if="set_role" class="lifepath-gen">
        <h1 class="lifepath-gen__title">Dress and Personal Style</h1>
      <section class="charsheet-lifepath">
        <div class="charsheet-lifepath__block">
          <h3 class="charsheet-lifepath__title">Clothing Style</h3>
          <p class="charsheet-lifepath__content">
            {{ clothingstyle !== "" ? clothingstyle : "" }}
          </p>
        </div>
        <div class="charsheet-lifepath__block">
          <h3 class="charsheet-lifepath__title">Hairstyle</h3>
          <p class="charsheet-lifepath__content">
            {{ hairstyle !== "" ? hairstyle : "" }}
          </p>
        </div>
         <div class="charsheet-lifepath__block">
          <h3 class="charsheet-lifepath__title">Affectation You Are Never Without</h3>
          <p class="charsheet-lifepath__content">
            {{ affectation_you !== "" ? affectation_you : "" }}
          </p>
        </div>
      </section>
    </section>
    <section v-if="set_role" class="lifepath-gen">
        <h1 class="lifepath-gen__title">Your Motivations and Relationships</h1>
      <section class="charsheet-lifepath">
        <div class="charsheet-lifepath__block">
          <h3 class="charsheet-lifepath__title">What Do You Value Most?</h3>
          <p class="charsheet-lifepath__content">
            {{ you_value_most !== "" ? you_value_most : "" }}
          </p>
        </div>
        <div class="charsheet-lifepath__block">
          <h3 class="charsheet-lifepath__title">
            How Do You Feel About Most People?
          </h3>
          <p class="charsheet-lifepath__content">
            {{ feel_about_people !== "" ? feel_about_people : "" }}
          </p>
        </div>
        <div class="charsheet-lifepath__block">
          <h3 class="charsheet-lifepath__title">
            Most Valued Person in Your Life?
          </h3>
          <p class="charsheet-lifepath__content">
            {{ most_valued_person !== "" ? most_valued_person : "" }}
          </p>
        </div>
        <div class="charsheet-lifepath__block">
          <h3 class="charsheet-lifepath__title">
            Most Valued Possession You Own?
          </h3>
          <p class="charsheet-lifepath__content">
            {{ most_valued_possession !== "" ? most_valued_possession : "" }}
          </p>
        </div>
      </section>
    </section>
    <section v-if="set_role" class="lifepath-gen">

        <h1 class="lifepath-gen__title">Your Background</h1>
      <section class="charsheet-lifepath">
        <div class="charsheet-lifepath__block">
          <h3 class="charsheet-lifepath__title">Your Original Family Background</h3>
          <p class="charsheet-lifepath__content">
            {{ original_family_background !== "" ? original_family_background : "" }}
          </p>
        </div>
         <div class="charsheet-lifepath__block">
          <h3 class="charsheet-lifepath__title">Childhood Environment</h3>
          <p class="charsheet-lifepath__content">
            {{ child_env !== "" ? child_env : "" }}
          </p>
        </div>
         <div class="charsheet-lifepath__block">
          <h3 class="charsheet-lifepath__title">Your Family Crisis: Background</h3>
          <p class="charsheet-lifepath__content">
            {{ crisis_background !== "" ? crisis_background : "" }}
          </p>
        </div>
      </section>
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
      chosen_role: "",
      origin: "",
      language: "",
      pers: "",
      clothingstyle:"",
      hairstyle: "",
      affectation_you:"",
      you_value_most: "",
      feel_about_people: "",
      most_valued_person: "",
      most_valued_possession: "",
    
      original_family_background: "",
      child_env: "",
      crisis_background:""
    };
  },
  computed: {
    role_options: function () {
      return Database.roles;
    },
    cultural_origins: function () {
      return Database.cultural_origins;
    },
    personality: function () {
      return Database.personality;
    },
    clothing_style: function () {
      return Database.dress;
    },
    hair_style: function () {
      return Database.hairstyle;
    },
    affectation: function () {
      return Database.affectation;
    },
    value_most: function () {
      return Database.value_most;
    },
    about_people: function () {
      return Database.about_people;
    },
    valued_person: function () {
      return Database.valued_person;
    },
    valued_possession: function () {
      return Database.valued_possession;
    },
  },
  methods: {
    onChangeRole: function (event) {
      this.chosen_role = event.target.value;
    },
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
          Math.floor(Math.random() * theOrigin.languages.length)
        ];
      this.clothingstyle =
        this.clothing_style[diceroll.d10()];
      this.hairstyle = this.hair_style[diceroll.d10()];
       
      this.affectation_you = this.affectation[diceroll.d10()];      
      this.pers = this.personality[diceroll.d10()];
      this.you_value_most = this.value_most[diceroll.d10()];
      this.feel_about_people = this.about_people[diceroll.d10()];
      this.most_valued_person = this.valued_person[diceroll.d10()];
      this.most_valued_possession = this.valued_possession[diceroll.d10()];
      var bckground = Database.background[diceroll.d10()];
      this.original_family_background= `Original Background: ${bckground.name}. Description: ${bckground.description}.`;
      this.child_env = Database.childhood_environment[diceroll.d10()];
      this.crisis_background = Database.childhood_background[diceroll.d10()];
    },
  },
};
</script>