<template lang="pug">
    .main
        .topbar
            button.btn(type="button" v-on:click="createForm") Create Form
        h1.heading Form Lists
        template(v-if="loading")
            p Loading...
        template(v-else)
            table.table(v-if="list !== null")
                thead
                    tr
                        th #
                        th Form Name
                        th Actions
                tbody
                    tr(v-for="(item, key, ind) in list" v-bind:key="ind")
                        td {{ ind+1 }}
                        td {{ item.form_name }}
                        td 
                            button.btn(type="button" v-on:click.prevent="editItem(key, item)") Edit
                            button.btn(type="button" v-on:click.prevent="removeItem(key)") Remove
            p(v-else) No Data Found!
</template>

<style scoped>
.main {
  max-width: 500px;
  margin: 0 auto;
  border: 2px solid;
  padding: 20px;
  margin-top: 50px;
}

.heading {
  text-align: center;
  margin: 25px 0;
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

.table {
  border: 1px solid;
  width: 100%;
}

.table td,
.table th {
  border: 1px solid;
  padding: 5px;
}

.btn {
  margin-right: 5px;
}
</style>

<script>
import { mapActions } from "vuex";
export default {
  mounted() {
    this.listLoad();
  },
  destroyed() {
    this.listListenerOff();
  },
  computed: {
    loading() {
      return this.$store.state.form.list_loading;
    },
    list() {
      return this.$store.state.form.forms_list;
    }
  },
  methods: {
    ...mapActions({
      listLoad: "form/listListenerOn",
      listListenerOff: "form/listListenerOff",
      removeItem: "form/removeListItem"
    }),
    editItem(key, item) {
      const self = this;
      self.$store.dispatch("form/editListItem", { key: key, form_data: item }).then(response => {
        self.$router.push("/");
      });
    },
    createForm() {
      const self = this;
      self.$store.dispatch("form/editListItem", null).then(res => {
        self.$router.push('/');
      });
    }
  }
};
</script>