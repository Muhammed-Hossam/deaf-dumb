<template>
  <LoadingSpinner v-if="isLoading" />
  <div class="container">
    <div class="row justify-content-center">
      <div v-if="sendEmailMessage.success" class="alert w-75 mt-5 alert-success alert-dismissible fade show" role="alert">
        {{ sendEmailMessage.success }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <div v-else-if="sendEmailMessage.failure" class="alert w-75 mt-5 alert-danger alert-dismissible fade show" role="alert">
        {{ sendEmailMessage.failure }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>
      <div class="forgot-password">
        <card-container>
          <h4 class="text-center fw-bold mb-4" style="color: #f60">Type your email</h4>
          <form @submit.prevent="handleSubmit">
            <div class="mb-3">
              <input type="email" class="form-control p-2" placeholder="Enter your Email" v-model="email"  :class="{ 'is-invalid': emailError }" />
              <!-- Show error message if the email address is not valid -->
              <div class="invalid-feedback" v-if="emailError">
                {{ emailError }}
              </div>
            </div>
            <div class="text-center">
              <button type="submit" class="btn btn-primary border border-0" :disabled="isLoading || !isEmailNotEmpty">
                send reset email
              </button>
            </div>
          </form>
        </card-container>
      </div>
    </div>
  </div>
</template>


<script>
import LoadingSpinner from '@/components/common/LoadingSpinner.vue';
import CardContainer from '@/components/common/CardContainer.vue';

import { auth } from '@/firebaseConfig';
import { sendPasswordResetEmail } from 'firebase/auth';

export default {
  name: 'forgot-password',
  components: {
    CardContainer,
    LoadingSpinner
  },
  data() {
    return {
      email: "",
      emailError: "",
      isLoading: false,
      sendEmailMessage: {
        success: '',
        failure: ''
      }
    }
  },
  methods: {
    isValidEmail(email) {
      // check if email is valid using regular expression
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailPattern.test(email);
    },
    handleSubmit() {
      this.emailError = "";

      // if the email is empty show this error message
      if (!this.isEmailNotEmpty) {
        this.emailError = "Email is required!";
        // if the email is not valid show this error message
      }else if (!this.isValidEmail(this.email)) {
        this.emailError = "Please enter a valid email address";
      }

      // if the email is valid and there is no error messages perform sending password reset email
      if (this.isEmailNotEmpty && this.emailError === "") {
        this.isLoading = true;

        sendPasswordResetEmail(auth, this.email)
        .then(() => {
          // password reset email sent
          this.isLoading = false;
          this.sendEmailMessage.success = "Reset email has sent successfully, Check your email";
          this.email = "";
        })
        .catch (error => {
          if (error.message === "Firebase: Error (auth/user-not-found).") {
            this.emailError = "This email not found! try to create an accout";
          }
          this.sendEmailMessage.failure = error.message;
          this.isLoading = false;
        })

      }

    }
  },
  computed: {
    isEmailNotEmpty() {
      return this.email.trim() !== "";
    }
  }
}
</script>

<style lang="scss" scoped>
.forgot-password {
  width: 30rem;
}
</style>