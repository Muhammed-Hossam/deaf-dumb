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
      fullUserPhoto: localStorage.getItem('fullUserPhoto') || "",
      croppedUserPhoto: localStorage.getItem('croppedUserPhoto') || "",
      profileCoverImg: localStorage.getItem('profileCoverImg') || null,
      profileCoverImgPosition: 50
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
    SET_FULL_USER_PHOTO(state, fullUserPhotoURL) {
      state.fullUserPhoto = fullUserPhotoURL;
      localStorage.setItem('fullUserPhoto', fullUserPhotoURL);
    },
    SET_CROPPED_USER_PHOTO(state, croppedUserPhotoURL) {
      state.croppedUserPhoto = croppedUserPhotoURL;
      localStorage.setItem('croppedUserPhoto', croppedUserPhotoURL);
    },
    SET_PROFILE_COVER_IMG(state, profileCoverImg) {
      state.profileCoverImg = profileCoverImg;
      localStorage.setItem('profileCoverImg', profileCoverImg);
    },
    SET_PROFILE_COVER_IMG_POSITION(state, position) {
      state.profileCoverImgPosition = position;
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
    setFullUserPhoto({ commit }, payload) {
      commit('SET_FULL_USER_PHOTO', payload);
    },
    setCroppedUserPhoto({ commit }, payload) {
      commit('SET_CROPPED_USER_PHOTO', payload);
    },
    setProfileCoverImg({ commit }, payload) {
      commit('SET_PROFILE_COVER_IMG', payload);
    },
    setProfileCoverImgPosition({ commit }, payload) {
      commit('SET_PROFILE_COVER_IMG_POSITION', payload);
    },
    fetchCurrentUserData() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in
          const userRef = doc(db, 'users', user.uid);
          onSnapshot(userRef, (snapshot) => {
            const userData = snapshot.data();
            this.dispatch('setUserName', userData.userName);
            this.dispatch('setLoginState', userData.isLoggedIn);
            this.dispatch('setUserRole', userData.role);
            this.dispatch('setFullUserPhoto', userData.fullUserPhoto);
            this.dispatch('setCroppedUserPhoto', userData.croppedUserPhoto);
            this.dispatch('setProfileCoverImg', userData.profileCoverImg);
            this.dispatch('setProfileCoverImgPosition', userData.profileCoverImgPosition);
          });
        } else {
          // User is signed out
          // Reset any other user-related state properties
            this.dispatch('setUserName', '');
            this.dispatch('setLoginState', false);
            this.dispatch('setUserRole', 'user');
            this.dispatch('setFullUserPhoto', '');
            this.dispatch('setCroppedUserPhoto', '');
            this.dispatch('setProfileCoverImg', null);
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
    getFullUserPhoto(state) {
      return state.fullUserPhoto;
    },
    getCroppedUserPhoto(state) {
      return state.croppedUserPhoto;
    },
    getProfileCoverImg(state) {
      return state.profileCoverImg;
    },
    getProfileCoverImgPosition(state) {
      return state.profileCoverImgPosition;
    }
  },
});


export default store;