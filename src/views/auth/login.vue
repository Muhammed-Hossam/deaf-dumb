<template>
  <LoadingSpinner v-if="isLoading" />
  <div class="container">
    <div class="row">
      <div class="col-none col-md-6">
        <img
          src="../../assets/auth/login.png"
          class="w-100"
          alt="Login Image"
        />
      </div>
      <div class="col-md-6">
        <card-container>
          <h4 class="text-center fw-bold mb-4" style="color: #f60">Login</h4>
          <LoginProviderBtn
            :providerLogo="require('../../assets/auth/google-logo.svg')"
            providerName="Google"
            alt="Google logo"
            @click="loginWithGoogle"
          />
          <LoginProviderBtn
            :providerLogo="require('../../assets/auth/facebook-logo.svg')"
            providerName="Facebook"
            alt="Facebook logo"
          />
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <input
                type="email"
                class="form-control p-2"
                placeholder="Enter your Email"
                v-model="email"
                :class="{ 'is-invalid': emailError }"
              />
              <div class="invalid-feedback" v-if="emailError">
                {{ emailError }}
              </div>
            </div>
            <div class="mb-3">
              <input
                type="password"
                class="form-control p-2"
                placeholder="Enter your password"
                v-model="password"
                :class="{ 'is-invalid': passwordError }"
              />
              <div class="invalid-feedback" v-if="passwordError">
                {{ passwordError }}
              </div>
            </div>
            <div class="d-grid mx-auto">
              <button
                type="submit"
                class="btn btn-primary border border-0"
                :disabled="isLoading || !isValid"
              >
                Login
              </button>
            </div>
            <p class="mt-2 mb-0">
              Create an account:
              <router-link class="text-decoration-none" to="/register"
                >Register</router-link
              >
            </p>
          </form>
        </card-container>
      </div>
    </div>
  </div>
</template>
<script>
import CardContainer from "@/components/CardContainer.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import LoginProviderBtn from "@/components/LoginProviderBtn.vue";

// import firebase required modules
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "@firebase/auth";
import { doc, setDoc, updateDoc } from "@firebase/firestore";
import { auth, db } from "@/firebaseConfig";
import { mapActions } from "vuex";

export default {
  name: "login-page",
  components: {
    CardContainer,
    LoadingSpinner,
    LoginProviderBtn,
  },
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
      emailError: "",
      passwordError: "",
    };
  },
  computed: {
    isValid() {
      return this.email.trim() !== "" && this.password.trim() !== "";
    },
  },
  methods: {
    handleSubmit() {
      this.emailError = "";
      this.passwordError = "";

      if (this.email.trim() === "") {
        this.emailError = "Email is required";
      } else if (!this.isValidEmail(this.email)) {
        this.emailError = "Please enter a valid email address";
      }

      if (this.password.trim() === "") {
        this.passwordError = "Password is required";
      }

      if (this.isValid && this.emailError === "" && this.passwordError === "") {
        // perform login action
        this.isLoading = true;

        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Sign In
            const user = userCredential.user;
            // Update isLoggin to true
            if (user.email !== "alhwartmhmd@gmail.com") {
              updateDoc(doc(db, "users", user.uid), {
                isLoggedIn: true,
              });
            } else {
              updateDoc(doc(db, "users", user.uid), {
                isLoggedIn: true,
                role: "admin",
              });
            }
            // this.$store.dispatch('')
            this.isLoading = false;
            this.$router.push("/");
          })
          .catch((error) => {
            // const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);
            if (errorMessage === "Firebase: Error (auth/user-not-found).") {
              this.emailError =
                "This email not found! Please create an account.";
            }
            if (errorMessage === "Firebase: Error (auth/wrong-password).") {
              this.passwordError =
                "This password is wrong! try a correct password.";
            }
            this.isLoading = false;
          });
      }
    },
    isValidEmail(email) {
      // check if email is valid using regular expression
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },
    ...mapActions(["setLoginState"]),
    loginWithGoogle() {
      const provider = new GoogleAuthProvider();
      // provider.addScope('profile')
      signInWithPopup(auth, provider)
        .then((result) => {
          // This gives you a Google Access Token. You can use it to access the Google API.
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
          // IdP data available using getAdditionalUserInfo(result)
          // ...
          if (user !== null) {
            if (user.email !== "alhwartmhmd@gmail.com") {
              try {
                setDoc(doc(db, "users", user.uid), {
                  userName: user.displayName,
                  isLoggedIn: true,
                  role: "user",
                });
              } catch (e) {
                console.error("Error When store user data in document", e);
              }
            } else {
              try {
                setDoc(doc(db, "users", user.uid), {
                  userName: user.displayName,
                  isLoggedIn: true,
                  role: "admin",
                });
              } catch (e) {
                console.error("Error When store user data in document", e);
              }
            }

            if (user.photoURL) {
              this.$store.dispatch("setUserPhoto", user.photoURL);
            } else {
              this.$store.dispatch("setUserPhoto", "");
            }
            console.log("Token: ", token);
            console.log("user: ", user);
            this.setLoginState(true);
            this.$router.push("/");
          }
        })
        .catch(() => {
          // Handle Errors here.
          // const errorCode = error.code;
          // const errorMessage = error.message;
          // // The email of the user's account used.
          // const email = error.customData.email;
          // // The AuthCredential type that was used.
          // const credential = GoogleAuthProvider.credentialFromError(error);
          // ...
        });
    },
  },
};
</script>

<style lang="scss" scoped>
button {
  background-color: #e67c04;
  &:hover {
    background-color: #f60;
    transition: all 0.3s ease-in-out;
  }
}
</style>
