<template lang="pug">
    div
        h1.heading {{ (update) ? "Update Form":"Create New Form" }}
        p.error(v-if="form.err && form.err !== ''") {{ form.err }}
        p.success(v-if="form.suc && form.suc !== ''") {{ form.suc }}
        form(v-on:submit.prevent="save")
            div.form-group
                label Form name
                input.form-control(type="text" v-model="in_form.form_name")
            button(type="button" v-on:click="addField(count_fields)") Add Field
            ul.fields
                li(v-for="(field, ind) in in_form.fields" v-bind:key="ind")
                    div.form-group
                        label Field name
                        input.form-control(type="text" v-model="in_form.fields[ind].field_name")
                    div.form-group
                        label Type
                        select.form-control(v-on:input="selectType($event, ind)" v-model="in_form.fields[ind].type")
                          option(value="string") String
                          option(value="boolean") Boolean
                          option(value="float") Float
                          option(value="list") List
                        div.form-group(v-if="in_form.fields[ind].list_items")
                          div.form-group.add_list_item_con
                            button(type="button" v-on:click="addListItem({ next_ind: in_form.fields[ind].list_items.length, parent_ind: ind })")
                              | Add item
                          ul.list_items
                            li(v-for="(list_item, li_ind) in in_form.fields[ind].list_items")
                              .form-group
                                label List Item {{ li_ind+1 }}
                                input.form-control(type="text" v-model="in_form.fields[ind].list_items[li_ind].list_item_value")
                          

                    div.form-group
                        label Required?
                        .checkbox
                            input(type="checkbox" v-model="in_form.fields[ind].required")
                    div.form-group.remove_btn_con
                        button(type="button" v-on:click="removeField(ind)") Remove
            template(v-if="count_fields > 0")
              button(type="submit" v-if="!form.loading") Save
              button(type="button" v-else disabled) Loading...

</template>

<style scoped>
.heading {
  text-align: center;
  margin: 25px 0;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  margin-bottom: 5px;
  display: inline-block;
}

.form-control {
  display: block;
  width: 100%;
  height: 30px;
  padding: 5px;
  font-size: 14px;
}

.fields {
  list-style: none;
  padding-left: 0;
}

.fields > li {
  margin-top: 15px;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid;
}

.fields .form-group {
  vertical-align: top;
}

.fields .form-group label {
  display: block;
}

.checkbox {
  text-align: left;
  padding-top: 3px;
}

.remove_btn_con {
  text-align: right;
}

.success {
  margin-bottom: 15px;
  font-size: 14px;
  color: green;
}

.error {
  margin-bottom: 15px;
  font-size: 14px;
  color: red;
}

.list_items {
  list-style: none;
  padding-left: 0;
  margin-left: 35px;
  margin-bottom: 15px;
  border-bottom: 1px solid #ddd;
}

.add_list_item_con {
  text-align: right;
  margin-top: 15px;
}
</style>

<script>
import { mapMutations, mapActions } from "vuex";
export default {
  computed: {
    update() {
      return this.$store.state.form.update;
    },
    count_fields() {
      return this.$store.state.form.in_form.fields.length;
    },
    in_form() {
      return this.$store.state.form.in_form;
    },
    form() {
      return this.$store.state.form.form_progress;
    }
  },
  methods: {
    ...mapMutations({
      addField: "form/addField",
      addListItem: "form/addListItem",
      removeField: "form/removeField"
    }),
    ...mapActions({
      save_form: "form/save_form"
    }),

    selectType(event, ind) {
      const self = this;
      if (event.target.value === "list") {
        self.$store.commit("form/init_list", ind);
      } else {
        self.$store.commit("form/remove_list", ind);
      }
    },

    save() {
      const self = this;
      self.form.err = "";
      self.form.suc = "";
      if (self.in_form.form_name !== "" && self.count_fields > 0) {
        self.save_form();
      } else {
        self.form.err = "Form name required! OR Add feilds in form!";
      }
    }
  }
};
</script>