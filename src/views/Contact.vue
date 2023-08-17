<template>
  <div class="contact-us">
    <div class="banner"></div>
    <div class="container-fluid">
      <div class="row my-5">
        <div class="col-12 col-md-6">
          <form @submit.prevent class="p-5 mx-auto rounded">
            <h4 class="text-center mb-3 fw-bold">Send Us Message</h4>
            <div class="mb-3">
              <input
                type="text"
                class="form-control p-3"
                placeholder="Enter your Username"
              />
            </div>
            <div class="mb-3">
              <input
                type="email"
                class="form-control p-3"
                placeholder="name@example.com"
              />
            </div>
            <div class="mb-3">
              <textarea
                class="form-control p-3"
                rows="3"
                placeholder="Enter your message..."
              ></textarea>
            </div>
            <div class="mb-3">
              <input type="submit" value="Send Message" class="btn btn-primary">
            </div>
          </form>
        </div>
        <div class="col-12 col-md-6">
          <img
            src="../assets/contact/contactus-page-image.webp"
            class="w-100"
            alt="contact us image"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'contact-view'
};
</script>

<style lang="scss" scoped>
@import "@/scss/custom.scss";

.banner {
  background: url("../assets/contact/contact-us-banner.webp");
  height: calc(100vh - 65px);
  background-size: cover;
  background-position: 50% 58%;
}

form {
  width: 80%;
  margin-top: 7rem;
  box-shadow: 0 1px 5px 2px rgba(0, 0, 0, 0.1);

  h4 {
    color: #f60;
  }
}

@include media_breakpoint_down(lg) {
  .contact-us {
    margin-top: 10.5rem;
  }
}
</style>
