import firebase, { auth } from '@/services/fireinit.js'


export const state = () => ({
    user: null
})

export const getters = {
    activeUser: (state, getters) => {
        return state.user
    }
}

export const mutations = {
    setUser: (state, payload) => {
        state.user = payload
    },
}

export const actions = {
    autoSignIn: ({ commit }, payload) => {
        commit('setUser', payload)
    },

    signOut: ({ commit }) => {
        auth.signOut()
            .then(() => {
                commit('setUser', null)
            }).catch(err => {
                console.log(err)
            })
    }
}

export const strict = false