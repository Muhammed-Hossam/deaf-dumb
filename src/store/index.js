import { createStore } from "vuex";
import { getFirestore, doc, onSnapshot } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

const store = createStore({
  modules: {},
  state() {
    return {
      userName: "",
      isLoggedIn: false,
      role: "user",
      userPhoto: ''
    };
  },
  mutations: {
    SET_USER_NAME(state, userName) {
      state.userName = userName;
      localStorage.setItem('userName', JSON.stringify(userName));
    },
    SET_LOGIN_STATE(state, isLoggedIn) {
      state.isLoggedIn = isLoggedIn;
      localStorage.setItem('isLoggedIn', JSON.stringify(isLoggedIn));
      console.log(state.isLoggedIn)
    },
    SET_ROLE(state, role) {
      state.role = role;
      localStorage.setItem('role', JSON.stringify(role));
    },
    SET_USER_PHOTO(state, photoURL) {
      state.userPhoto = photoURL;
      localStorage.setItem('userPhoto', JSON.stringify(photoURL));
    },
    RESTORE_STATE(state) {
      const userName = JSON.parse(localStorage.getItem('userName'));
      const isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));
      const role = JSON.parse(localStorage.getItem('role'));
      const userPhoto = JSON.parse(localStorage.getItem('userPhoto'));
      console.log('data from localStorage', {userName, isLoggedIn, role})

      if (userName !== null && isLoggedIn !== null && role !== null && userPhoto !== null) {
        state.userName = userName;
        state.isLoggedIn = isLoggedIn;
        state.role = role;
        state.userPhoto = userPhoto;
      }
    }
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
          // user is signed in
          const userDoc = doc(db, 'users', user.uid);
          onSnapshot(userDoc, (snapshot) => {
            const userData = snapshot.data();
            console.log('user', user)
            if (user.displayName === null) {
              commit('SET_USER_NAME', userData.userName);
            }else {
              commit('SET_USER_NAME', user.displayName);
            }
            commit('SET_LOGIN_STATE', userData.isLoggedIn);
            commit('SET_ROLE', userData.role);
          });
        }else {
          // user is singed out
        }
      })
    }

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
    }
  },
});

store.commit('RESTORE_STATE');

export default store;
