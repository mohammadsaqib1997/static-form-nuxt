<template lang="pug">
  form.form(v-on:submit.prevent="submit")
    h2.heading Login Form
    p.error(v-if="form.err && form.err !== ''") {{ form.err }}
    p.success(v-if="form.suc && form.suc !== ''") {{ form.suc }}
    input.form-field(type="text" placeholder="Enter Email" v-model="email")
    input.form-field(type="password" placeholder="Enter Password" v-model="password")
    button(type="submit" v-if="!form.loading") Login
    button(type="submit" v-else disabled) Loading...
</template>

<style scoped>
.form {
  max-width: 500px;
  margin: 0 auto;
  margin-top: 100px;
}

.heading {
  text-align: center;
  margin-bottom: 20px;
}

.form-field {
  display: block;
  width: 100%;
  height: 30px;
  border-radius: 5px;
  border: 2px solid #c1c1c1;
  padding: 5px;
  margin-bottom: 10px;
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
import firebase from "firebase";

export default {
  data() {
    return {
      form: {
        suc: "",
        err: "",
        loading: false
      },
      email: "",
      password: ""
    };
  },
  methods: {
    submit() {
      const self = this;
      self.form.err = "";
      self.form.suc = "";
      if (self.email !== "" && self.password !== "") {
        self.form.loading = true;
        firebase
          .auth()
          .signInWithEmailAndPassword(self.email, self.password)
          .then(function() {
            self.form.suc = "Succcessfully Login!";
            setTimeout(function() {
              self.form.loading = false
              self.$router.push('/')
            }, 500);
          })
          .catch(function(error) {
            var errorCode = error.code;
            self.form.err = error.message;
            self.form.loading = false;
          });
      } else {
        self.form.err = "Some Field Empty!";
      }
    }
  }
};
</script>
