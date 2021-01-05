<template>
  <div class="charsheet-generator" v-if="character" >

    <!-- Header Buttons -->
    <section class="charsheet-header">
      <div class="charsheet-header__roles">
        <button class="button" @click="chosen_role = character.role; set_role = !set_role;">
          Set Role
        </button>
        <select v-if="set_role" v-model="chosen_role" class="select-input">
          <option v-for="role in role_options" :key='`role_option_${role}`'>{{role}}</option>
        </select>
      </div>

    </section>
    <!-- End Header Buttons -->

    <div class="charsheet-bottom">
      <div class="charsheet-bottom__column">
        <!-- Char Lifepath -->
        <char-lifepath :lifepath='character.lifepath' :emptyLifePath='emptyLifePath' />
        <!-- End Char Lifepath -->

        <!-- Char Style -->
        <char-style :appearance='character.appearance' :emptyStyle='emptyStyle' v-if="renderStyle" />
        <!-- End Char Style -->
      </div>
     
    </div><!-- charsheet-bottom -->

    <modal name="options-modal" class="options-modal">
      <button class="options-modal__close" @click="hideOptionsModal" title="Close modal" aria-label="Close modal">X</button>
      <h3 class="options-modal__title">Options</h3>

      <label class=" options-modal__option">
        <input type="checkbox" v-model="showSkillTotal">
        Show skills calculated total
      </label>

      <label class=" options-modal__option">
        <input type="checkbox" v-model="renderStyle">
        Show character style
      </label>

      <label class=" options-modal__option">
        <input type="checkbox" v-model="emptyLifePath">
        Show empty character lifepath
      </label>

      <label class=" options-modal__option">
        <input type="checkbox" v-model="emptyStyle">
        Show empty character style
      </label>

      <label class="options-modal__option">
        <input type="checkbox" v-model="renderPhoto">
        Show character photo <small>(beta)</small>
      </label>
    </modal>

  </div>
</template>

<script>
import Character from "@/character.js";
import Database from "@/database";

// Components
import CharBaseInfo from "@/components/CharBaseInfo.vue";
import CharLifepath from "@/components/CharLifepath.vue";
import CharStyle from "@/components/CharStyle.vue";


export default {
    name: "home",
    components: {
      CharBaseInfo,
      CharLifepath,
      CharStyle,

    },
    data: function() {
      return {
        character: undefined,
        set_role: false,
        chosen_role: "",
        edit: false,
        renderPhoto: false,
        renderStyle: true,
        emptyLifePath: false,
        emptyStyle: false,
        showSkillTotal: true,
      };
    },
    computed: {
      role_options: function() {
        return Database.roles;
      }
    },
    methods: {
      generateCharacter: function() {
        let char_options = {};
        if (this.set_role) {
            char_options.role = this.chosen_role;
        }
        let char = new Character(char_options);
        this.$set(this, "character", char);
        this.$router.push("/" + this.character.encode64());
      },
      toggleEdit: function() {
        this.edit = !this.edit;
        this.character.recalculate();
        if (!this.edit) {
          // Update link based on changes
          this.$router.push("/" + this.character.encode64());
        }
      },
      showOptionsModal () {
        this.$modal.show('options-modal');
      },
      hideOptionsModal () {
        this.$modal.hide('options-modal');
      }
    },
    mounted: function() {
      // let base64 = false;
      let base64 = this.$route.params.base64;
      // console.debug(base64);
      if (base64) {
          this.$set(this, "character", new Character(base64));
      } else {
          this.generateCharacter();
      }
      // setInterval( ()=>{
      // this.generateCharacter();
      // }, 2000);
      console.debug(this.character);
    }
};
</script>
