<template>
  <!-- Display loading spinner when the page is loading -->
  <LoadingSpinner v-if="isLoading" />
  <div class="container">
    <div class="row align-items-center">
      <div class="col-md-6">
        <!-- The CardContainer.vue component which makes the register form box-shadow -->
        <card-container>
          <!-- Register Heading -->
          <h4 class="text-center fw-bold mb-4" style="color: #f60">Register</h4>
          <!-- Register form -->
          <form @submit.prevent="handleSubmit">
            <!-- Username input -->
            <div class="mb-3">
              <input
                type="text"
                class="form-control p-2"
                placeholder="Enter your Username"
                v-model="userName"
                :class="{ 'is-invalid': validationErrors.userName }"
              />
              <!-- Show error message if username is not entered -->
              <div v-if="validationErrors.userName" class="invalid-feedback">
                {{ validationErrors.userName }}
              </div>
            </div>
            <!-- Email input -->
            <div class="mb-3">
              <input
                type="email"
                class="form-control p-2"
                placeholder="Enter you email"
                v-model="email"
                :class="{ 'is-invalid': validationErrors.email }"
              />
              <!-- Show error message if the email address is not valid -->
              <div v-if="validationErrors.email" class="invalid-feedback">
                {{ validationErrors.email }}
              </div>
            </div>
            <!-- Password Input -->
            <div class="mb-3">
              <input type="password" class="form-control p-2" placeholder="Type a Strong Password" v-model="password"
                :class="{ 'is-invalid': validationErrors.password }"
              />
              <!-- Show error message if the password is not valid -->
              <div v-if="validationErrors.password" class="invalid-feedback">
                {{ validationErrors.password }}
              </div>
            </div>
            <!-- Confirm Password Input -->
            <div class="mb-3">
              <input type="password" class="form-control p-2" placeholder="Confirm your Password" v-model="confirmPassword"
                :class="{ 'is-invalid': validationErrors.confirmPassword }"
              />
              <!-- Show error message if password confirmation doesn't match with password -->
              <div v-if="validationErrors.confirmPassword" class="invalid-feedback">
                {{ validationErrors.confirmPassword }}
              </div>
            </div>
            <!-- Register Button -->
            <div class="d-grid mx-auto">
              <button type="submit" class="btn btn-primary border border-0" :disabled="isLoading || !isValid">
                Register
              </button>
            </div>
            <!-- If the user has registered before; he can go to the login page from here -->
            <p class="mt-2 mb-0">
              You have already an account?
              <router-link class="text-decoration-none" to="/login"
                >Login</router-link
              >
            </p>
          </form>
        </card-container>
      </div>
      <!-- Login page image -->
      <div class="d-none d-md-block col-md-6">
        <img
          src="../../assets/auth/register.png"
          class="w-100"
          alt="register image"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardContainer from "@/components/CardContainer.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

import { getAuth, createUserWithEmailAndPassword } from "@firebase/auth";
import { doc, setDoc } from "@firebase/firestore";
import { db } from "@/firebaseConfig";

export default {
  name: "register-page",
  components: {
    CardContainer,
    LoadingSpinner,
  },
  data() {
    return {
      userName: "",
      email: "",
      password: "",
      confirmPassword: "",
      isLoading: false,
      validationErrors: {
        userName: null,
        email: null,
        password: null,
        confirmPassword: null,
      },
    };
  },
  computed: {
    isValid() {
      return (
        this.userName.trim() !== "" &&
        this.email.trim() !== "" &&
        this.password.trim() !== "" &&
        this.confirmPassword.trim() !== ""
      );
    },
  },
  methods: {
    validateForm() {
      this.validationErrors = {
        userName: this.userName ? null : "Please enter your username.",
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)
          ? null
          : "Please enter a valid email address.",
        password:
          this.password.length >= 6
            ? null
            : "Please enter a password with at least 6 characters.",
        confirmPassword:
          this.confirmPassword === this.password
            ? null
            : "Passwords do not match.",
      };
      /*
        Extract the values of the validationErrors object and loop through it by "every" method
        The "every" method takes a callback function that takes a single paramter "error"
        it check if the "error" value is falsy, the callback function returns true
        and if the "error" value is truthy, the callback function returns false  
      */ 
      return Object.values(this.validationErrors).every((error) => !error);
    },
    handleSubmit() {
      if (this.validateForm()) {
        this.isLoading = true;

        // Register User
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            try {
              setDoc(doc(db, "users", user.uid), {
                userName: this.userName,
                userPhoto: '',
                isLoggedIn: false,
                role: 'user'
              });
            } catch (e) {
              console.error("Error When store user data in document", e);
            }
            this.isLoading = false;
            this.$router.push("/login");
          })
          .catch((error) => {
            const errorMessage = error.message;

            if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
              this.validationErrors.email =  "You have already registered by this email!";
            }

            this.isLoading = false;
          });
      }
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
