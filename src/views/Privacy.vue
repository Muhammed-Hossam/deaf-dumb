<template>
  <div class="privacy-policy">
    <div class="banner"></div>
    <div class="container">
      <div class="privacy-content my-5 py-5">
        <div class="text-center">
          <h2 class="heading d-inline-block fw-bold fst-italic h1">
            Privacy policy
          </h2>
        </div>
        <p class="my-5 fs-4 text-secondary text-center lh-lg mx-1">
          Thank you for using our website. We take your privacy seriously, and
          we want you to know how we collect and use your information. This
          privacy policy explains what information we collect from you, how we
          use it, and how we protect it.
        </p>
        <div class="accordion" id="accordionPanelsStayOpenExample">
          <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-headingOne">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseOne"
                aria-expanded="true"
                aria-controls="panelsStayOpen-collapseOne"
              >
                Information We Collect
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseOne"
              class="accordion-collapse collapse"
              aria-labelledby="panelsStayOpen-headingOne"
            >
              <div class="accordion-body">
                We only collect authentication data, such as usernames and
                passwords, for the purpose of allowing users to access our
                website's features. We do not collect any other data.
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-headingTwo">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseTwo"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseTwo"
              >
                Method of Collection
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseTwo"
              class="accordion-collapse collapse"
              aria-labelledby="panelsStayOpen-headingTwo"
            >
              <div class="accordion-body">
                We collect authentication data through a login form
              </div>
            </div>
          </div>
          <div class="accordion-item">
            <h2 class="accordion-header" id="panelsStayOpen-headingThree">
              <button
                class="accordion-button collapsed"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#panelsStayOpen-collapseThree"
                aria-expanded="false"
                aria-controls="panelsStayOpen-collapseThree"
              >
                Security measures
              </button>
            </h2>
            <div
              id="panelsStayOpen-collapseThree"
              class="accordion-collapse collapse"
              aria-labelledby="panelsStayOpen-headingThree"
            >
              <div class="accordion-body">
                We take the security of your authentication data seriously. We
                use industry-standard security measures to protect your data,
                including encryption and secure data storage.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'privacy-view'
};
</script>

<style lang="scss" scoped>
@import "@/scss/custom.scss";

.banner {
  background-image: url("../assets/privacy/privacy-banner.webp");
  background-size: cover;
  height: calc(100vh - 65px);
  background-position: center -5rem;
}

.privacy-content {
  // border: 2px solid #ccc;
  box-shadow: $main-shadow;
  border-radius: 5px;
  .heading {
    position: relative;

    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 3px;
      background-color: #000;
      left: -3px;
      bottom: -11px;
    }
  }

  .accordion {
    border: none;
    margin-right: 1rem;
    margin-left: 1rem;
    .accordion-button {
      transition: all 0.3s ease-in-out;
      font-weight: bold;
      &::after {
        transform: all 0.3s ease-in-out !important;
      }
    }
    .accordion-collapse {
      transition: all 0.3s ease-in-out;
    }
  }
}

@include media-breakpoint-down(lg) {
  .privacy-policy {
    margin-top: 10.5rem;
  }
}

@include media-breakpoint-down(md) {
  .privacy-content {
    p {
      font-size: 1rem !important;
    }
  }
} 
</style>
