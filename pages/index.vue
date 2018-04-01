<template lang="pug">
  .main
    .header
      button.btn(type="button" v-on:click="$store.dispatch('form/editListItem', null)" v-if="update") Create Form
      nuxt-link.anc(to="/form_list") Form Lists
      button(type="button" v-on:click="signOut" v-if="!loading") Logout
      button(type="button" v-else disabled) Loading...
    .body
      create-form
</template>

<style scoped>
.main {
  max-width: 500px;
  margin: 0 auto;
  border: 2px solid;
  padding: 20px;
  margin-top: 50px;
}

.anc {
  text-decoration: none;
  background-color: white;
  padding: 2px 8px;
  display: inline-block;
  margin-top: 5px;
  margin-right: 10px;
  font-size: 11px;
  color: #000;
  border-radius: 4px;
  border: 1px solid #d2d2d2;
}

.btn {
  margin-right: 10px;
}
</style>

<script>
import createForm from "@/components/create_form.vue";
export default {
  components: {
    createForm
  },
  computed: {
    update() {
      return this.$store.state.form.update;
    }
  },
  data: () => ({
    loading: false
  }),
  methods: {
    signOut() {
      const self = this;
      self.loading = true;
      self.$store.dispatch("signOut");
      setTimeout(function() {
        self.loading = false;
        self.$router.push("/login");
      }, 500);
    }
  }
};
</script>
