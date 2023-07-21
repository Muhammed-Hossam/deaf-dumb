<template>
  <LoadingSpinner v-if="isLoading" />
  <div class="container">
    <div class="row justify-content-center">
      <div v-if="resetPasswordMessages.success" class="alert w-75 mt-5 alert-success alert-dismissible fade show" role="alert">
        {{ resetPasswordMessages.success }} - You will be redirect to login after {{ redirect.counter }} sec.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <div v-else-if="resetPasswordMessages.failure" class="alert w-75 mt-5 alert-danger alert-dismissible fade show" role="alert">
        {{ resetPasswordMessages.failure }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <div class="reset-password">
        <card-container>
          <h4 class="text-center fw-bold mb-4" style="color: #f60">Type New Password</h4>
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <input type="password" class="form-control p-2" placeholder="New Password" v-model="password"
                :class="{ 'is-invalid': validationErrors.password }"
              />
              <!-- Show error message if the password is not valid -->
              <div v-if="validationErrors.password" class="invalid-feedback">
                {{ validationErrors.password }}
              </div>
            </div>
            <!-- Confirm Password Input -->
            <div class="mb-3">
              <input type="password" class="form-control p-2" placeholder="Confirm New Password" v-model="confirmPassword"
                :class="{ 'is-invalid': validationErrors.confirmPassword }"
              />
              <!-- Show error message if password confirmation doesn't match with password -->
              <div v-if="validationErrors.confirmPassword" class="invalid-feedback">
                {{ validationErrors.confirmPassword }}
              </div>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary border border-0" :disabled="isLoading || !isPasswordNotEmpty">
                Reset
              </button>
            </div>
          </form>
        </card-container>
      </div>
    </div>
  </div>
</template>

<script>
import LoadingSpinner from '@/components/LoadingSpinner.vue';
import CardContainer from '@/components/CardContainer.vue';

import { auth } from '@/firebaseConfig';
import { confirmPasswordReset } from 'firebase/auth';

export default {
  name: 'reset-password',
  components: {
    LoadingSpinner,
    CardContainer
  },
  data() {
    return {
      password: '',
      confirmPassword: '',
      validationErrors: {
        password: '',
        confirmPassword: ''
      },
      isLoading: false,
      resetPasswordMessages: {
        success: '',
        failure: ''
      },
      redirect: {
        counter: 3,
        intervalId: null
      }
    }
  },
  methods: {
    validatePassword() {
      this.validationErrors = {
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
      if (this.validatePassword()) {
        this.isLoading = true;
        // Extract the oobCode from the URL parameters
        const searchParams = new URLSearchParams(window.location.search);
        const oobCode = searchParams.get('oobCode');
        
        if (oobCode) {
          confirmPasswordReset(auth, oobCode, this.password)
          .then(() => {
            // Password reset successfully
            this.isLoading = false;
            this.password = "";
            this.confirmPassword = "";
            this.resetPasswordMessages.success = "Your password has been reset successfully";
            this.redirect.intervalId = setInterval(this.redirectWhenPasswordHasBeenReset, 1000);
          })
          .catch(error => {
            this.isLoading = false;
            if (error.message === "Firebase: Error (auth/expired-action-code).") {
              
              this.resetPasswordMessages.failure = "Your reset password link is expired! try forgot password again.";
            }else {
              this.resetPasswordMessages.failure = error.message;
            }
          })
        }
      }
    },
    redirectWhenPasswordHasBeenReset() {
      this.redirect.counter--;
      
      if (this.redirect.counter === 0) {
        clearInterval(this.redirect.intervalId);
        this.$router.push('/login');
      }
    }
  },
  computed: {
    isPasswordNotEmpty() {
      return this.password.trim() !== "" && this.confirmPassword.trim() !== "";
    }
  },
  watch: {
    redirectCounter(newValue) {
      console.log(newValue);
    }
  }
}
</script>


<style lang="scss" scoped>
.reset-password {
  width: 30rem;
}
</style>