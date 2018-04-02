import Vue from 'vue'
import firebase, { DB, auth } from '@/services/fireinit.js'

export const state = () => ({
    update: null,
    list_loading: true,
    forms_list: null,
    in_form: {
        form_name: '',
        fields: []
    },
    form_progress: {
        suc: "",
        err: "",
        loading: false
    }
})

export const mutations = {
    addField: (state, next_ind) => {
        let field_add = {
            id: next_ind,
            field_name: "",
            type: "string",
            required: false
        };

        Vue.set(state.in_form.fields, next_ind, field_add);
    },

    removeField: (state, index) => {
        Vue.delete(state.in_form.fields, index);
    },

    reset_form: (state) => {
        state.in_form.form_name = ''
        state.in_form.fields = []
        state.update = null
    },

    completeForm: (state, payload) => {
        state.form_progress = payload
        setTimeout(function () {
            state.form_progress.suc = ''
        }, 1500)
    },

    setLoadingList: (state) => {
        state.list_loading = true
        state.forms_list = null
    },

    setList: (state, payload) => {
        state.forms_list = payload
        state.list_loading = false
    },

    updateListItem: (state, payload) => {
        state.update = payload
    },

    updateFieldItems: (state, payload) => {
        state.in_form.form_name = payload.form_name
        state.in_form.fields = payload.fields
    },

    init_list: (state, payload) => {
        Vue.set(state.in_form.fields[payload], 'list_items', [{
            id: 0,
            list_item_value: ''
        }]);
    },

    remove_list: (state, payload) => {
        Vue.delete(state.in_form.fields[payload], 'list_items');
    },

    addListItem: (state, payload) => {
        console.log(payload)
        Vue.set(state.in_form.fields[payload.parent_ind].list_items, payload.next_ind, {
            id: payload.next_ind,
            list_item_value: ''
        });
    },
}

export const actions = {

    listListenerOn: ({ commit }) => {
        commit('setLoadingList')
        DB.ref("forms")
            .orderByChild("uid")
            .equalTo(auth.currentUser.uid)
            .on("value", snap => {
                commit('setList', snap.val())
            })
    },

    listListenerOff: ({ commit }) => {
        commit('setLoadingList')
        DB.ref("forms").off()
    },

    removeListItem: ({ dispatch }, payload) => {
        DB.ref("forms").child(payload).remove()
        dispatch('listListenerOn')
    },

    editListItem: ({ commit }, payload) => {
        return new Promise((resolve, reject) => {
            let set_update = (payload !== null) ? payload.key : null
            if (set_update !== null) {
                commit('updateListItem', set_update)
                commit('updateFieldItems', payload.form_data)
            } else {
                commit('reset_form')
            }

            resolve()
        })
    },

    save_form: ({ commit, state }) => {
        let data = state.in_form
        data['uid'] = auth.currentUser.uid
        let push_ref = (!state.update) ? DB.ref('forms').push() : DB.ref('forms').child(state.update)
        push_ref
            .set(data, (err, res) => {
                if (err) {
                    commit('completeForm', {
                        err: err.message,
                        suc: '',
                        loading: false
                    })
                } else {
                    commit('completeForm', {
                        err: '',
                        suc: 'Successfully Saved Form.',
                        loading: false
                    })
                    commit('reset_form')
                }

            });

    }
}