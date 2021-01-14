<template>
  <div class="charsheet-generator" >
    <section class="charsheet-header">
      <div class="charsheet-header__roles">
         <select class="select-input" v-on="c">
          <option v-for="role in role_options" :key='`role_option_${role}`'>{{role}}</option>
        </select>
      </div>
    </section>
   <section c
   lass="lifepath-gen">
   </section>
   </div>
</template>
<script>
// import Character from "@/character.js";
import Database from "@/database";
export default {
   name: "home",
    components: {

    },
    data: function(){
      return{
        character: undefined,
        set_role: false
    };
    },
    computed:{
      role_options: function(){
        return Database.roles;
      }
    },
    methods:{
      generateBackground : function(){
      let char_options = {};
      if(this.set_role){
        char_options.set_role= this.chosen_role;
      }
      }
    }

}
</script>