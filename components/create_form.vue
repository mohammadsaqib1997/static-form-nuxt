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
                        select.form-control(v-model="in_form.fields[ind].type")
                            option(value="string") String
                            option(value="boolean") Boolean
                            option(value="float") Float
                            option(value="list") List
                    div.form-group
                        label Required?
                        .checkbox
                            input(type="checkbox" v-model="in_form.fields[ind].required")
                    div.form-group
                        button.remove_btn(type="button" v-on:click="removeField(ind)") Remove
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
  padding-left: 15px;
}

.fields li {
  margin-top: 15px;
}

.fields .form-group {
  display: inline-block;
  margin-right: 10px;
  vertical-align: top;
}

.fields .form-group label {
  display: block;
}

.fields .form-control {
  display: inline-block;
  max-width: 150px;
}

.checkbox {
  text-align: right;
  padding-top: 3px;
}

.remove_btn {
  margin-left: 40px;
  margin-top: 30px;
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
    form () {
      return this.$store.state.form.form_progress;
    }
  },
  data() {
    return {
      
    };
  },
  methods: {
    ...mapMutations({
        addField: 'form/addField',
        removeField: 'form/removeField'
    }),
    ...mapActions({
        save_form: 'form/save_form'
    }),

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