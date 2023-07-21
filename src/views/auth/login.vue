<template>
  <!-- Display the loading spinner when the page is loading -->
  <LoadingSpinner v-if="isLoading" />
  <div class="container">
    <div class="row">
      <!-- The login page image -->
      <div class="d-none d-md-block col-md-6">
        <img src="../../assets/auth/login.png" class="w-100" alt="Login Image" />
      </div>
      <div class="col-md-6">
        <!-- The CardContainer.vue component which makes the register form box-shadow -->
        <card-container>
          <h4 class="text-center fw-bold mb-4" style="color: #f60">Login</h4>
          <!-- Login with Google provider -->
          <LoginProviderBtn :providerLogo="require('../../assets/auth/google-logo.svg')" providerName="Google"
            alt="Google logo" @click="loginWithGoogle" />
          <!-- Login with Facebook provider -->
          <LoginProviderBtn :providerLogo="require('../../assets/auth/facebook-logo.svg')" providerName="Facebook"
            alt="Facebook logo" />
          <!-- Login form -->
          <form @submit.prevent="handleSubmit">
            <!-- Email input -->
            <div class="mb-3">
              <input type="email" class="form-control p-2" placeholder="Enter your Email" v-model="email"
                :class="{ 'is-invalid': emailError }" />
              <!-- Show error message if the email address is not valid -->
              <div class="invalid-feedback" v-if="emailError">
                {{ emailError }}
              </div>
            </div>
            <!-- Password input -->
            <div class="mb-3">
              <input type="password" class="form-control p-2" placeholder="Enter your password" v-model="password"
                :class="{ 'is-invalid': passwordError }" />
              <!-- Show error message if the password is not valid -->
              <div class="invalid-feedback" v-if="passwordError">
                {{ passwordError }}
              </div>
            </div>
            <!-- Login button -->
            <div class="d-grid mx-auto">
              <button type="submit" class="btn btn-primary border border-0" :disabled="isLoading || !isEmailAndPasswordNotEmpty">
                Login
              </button>
            </div>
            <!-- If the user has not created an account yet, He can go to register from here and create an accout -->
            <p class="mt-2 mb-0">
              forgot your password?
              <router-link class="text-decoration-none" to="/forgot-password">forgot password</router-link>
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
import { doc, setDoc, updateDoc, getDoc } from "@firebase/firestore";
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
    isEmailAndPasswordNotEmpty() {
      return this.email.trim() !== "" && this.password.trim() !== "";
    },
  },
  methods: {
    handleSubmit() {
      this.emailError = "";
      this.passwordError = "";

      // if the email is empty show this error message
      if (this.email.trim() === "") {
        this.emailError = "Email is required";
        // if email is not valid show this error message
      } else if (!this.isValidEmail(this.email)) {
        this.emailError = "Please enter a valid email address";
      }
      // if the password is empty show this error message
      if (this.password.trim() === "") {
        this.passwordError = "Password is required";
      }

      // If the email and password is valid and there is no error messages perform login
      if (this.isEmailAndPasswordNotEmpty && this.emailError === "" && this.passwordError === "") {
        // perform login action
        this.isLoading = true;

        const auth = getAuth();
        signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Sign In
            const user = userCredential.user;
            // Update isLoggin to true
            updateDoc(doc(db, "users", user.uid), {
              isLoggedIn: true,
            });
            this.isLoading = false;
            this.$router.push("/");
          })
          .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
            if (errorMessage === "Firebase: Error (auth/user-not-found).") {
              this.emailError = "This email not found! Please create an account.";
            }
            if (errorMessage === "Firebase: Error (auth/wrong-password).") {
              this.passwordError = "This password is wrong! try a correct password.";
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
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;

          if (user !== null) {
            const userRef = doc(db, "users", user.uid);

            getDoc(userRef)
              .then(docSnapshot => {
                // if the user is exist update document
                if (docSnapshot.exists()) {
                  updateDoc(userRef, { isLoggedIn: true });
                  this.$router.push("/");
                } else {
                  // is the user not exist create a document
                  try {
                    const userData = docSnapshot.data();
                    setDoc(userRef, {
                      userName: user.displayName,
                      userPhoto: user.photoURL,
                      isLoggedIn: true,
                      role: "user",
                    });

                    this.$store.dispatch("setUserPhoto", userData.userPhoto);
                    this.setLoginState(true);
                    this.$router.push("/");
                  } catch (error) {
                    console.error("Error When store user data in document: ", error.message);
                  }
                }
              })
              .catch((error) => {
                console.error(error.message);
              });
          }
        }).catch(error => {
          console.error(error.message)
        })

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
