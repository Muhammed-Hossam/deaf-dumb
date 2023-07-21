import { createStore } from "vuex";
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const db = getFirestore();
const auth = getAuth();

const store = createStore({
  modules: {},
  state() {
    return {
      userName: localStorage.getItem('userName') || "",
      isLoggedIn: localStorage.getItem('loginState') === "true" || false,
      role: "user",
      userPhoto: localStorage.getItem('userPhoto') || "",
    };
  },
  mutations: {
    SET_USER_NAME(state, userName) {
      state.userName = userName;
      localStorage.setItem('userName', userName);
    },
    SET_LOGIN_STATE(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
      localStorage.setItem('loginState', isLoggedIn);
    },
    SET_ROLE(state, role) {
      state.role = role;
    },
    SET_USER_PHOTO(state, photoURL) {
      state.userPhoto = photoURL;
      localStorage.setItem('userPhoto', photoURL);
    },
  },
  actions: {
    setUserName({ commit }, payload) {
      commit("SET_USER_NAME", payload);
    },
    setLoginState({ commit }, payload) {
      commit("SET_LOGIN_STATE", payload);
    },
    setUserRole({ commit }, payload) {
      commit("SET_ROLE", payload);
    },
    setUserPhoto({ commit }, payload) {
      commit('SET_USER_PHOTO', payload);
    },
    fetchCurrentUserData({ commit }) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          const userRef = doc(db, 'users', user.uid);
          onSnapshot(userRef, (snapshot) => {
            const userData = snapshot.data();
            commit('SET_USER_NAME', userData.userName);
            commit('SET_LOGIN_STATE', userData.isLoggedIn);
            commit('SET_ROLE', userData.role);
            commit('SET_USER_PHOTO', userData.userPhoto);
          });
        } else {
          // User is signed out
          commit('SET_USER_NAME', '');
          commit('SET_LOGIN_STATE', false);
          commit('SET_ROLE', 'user');
          // Reset any other user-related state properties
        }
      });
    },
  },
  getters: {
    getUserName(state) {
      return state.userName;
    },
    getUserLoginState(state) {
      return state.isLoggedIn;
    },
    getUserRole(state) {
      return state.role;
    },
    getUserPhoto(state) {
      return state.userPhoto;
    },
  },
});


export default store;