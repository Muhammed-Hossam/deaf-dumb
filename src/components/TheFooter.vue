<template>
  <footer class="bg-dark text-secondary">
    <div class="container-fluid">
      <div class="row">
        <div class="col-md-2">
          <div class="logo text-center">
            <img src="../assets/logo.webp" width="250" height="250" alt="logo" />
          </div>
        </div>
        <div class="col-md-4">
          <div class="aim mt-5">
            <p class="text-center fs-4">
              Our website aim to provide resources for deaf and dumb people to
              make their life more easier by provide sign language images.
            </p>
          </div>
        </div>
        <div class="col-md-6">
          <div class="site-map mt-5 text-center">
            <h5 class="fs-2">Site Map</h5>
            <ul class="links">
              <li>
                <router-link to="/">Home</router-link>
              </li>
              <li>
                <router-link to="/contact">Contact Us</router-link>
              </li>
              <li>
                <router-link to="/about">About Us</router-link>
              </li>
              <li>
                <router-link to="/privacy">Privacy</router-link>
              </li>
            </ul>
            <ul class="links">
              <li>
                <router-link to="/alphabet"
                  >Sign Alphabets</router-link
                >
              </li>
              <li>
                <router-link to="/common-signs">Most Common Signs</router-link>
              </li>
              <li>
                <router-link to="/dictionary">Signs Dictionary</router-link>
              </li>
              <li>
                <router-link to="/flash-cards">Flash Cards</router-link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <p class="copyright text-light text-center m-0 p-2">
      Copyright &copy; created by
      <span class="text-primary"><a href="https://github.com/Muhammed-Hossam" class="text-decoration-none" target="_blank">Mohamed Haroun</a></span>.
    </p>
  </footer>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
footer {

  .links {
    list-style: none;
    display: inline-block !important;
  
    li {
      margin-top: 1rem;
      margin-bottom: 1rem;
      a {
        text-decoration: none;
        color: rgb(108, 117, 125);
  
        &:hover {
          color: #ccc;
        }
      }
    }
  }

  .copyright {
    background-color: #2c2e30;
    border-top: 1px solid #222;
  }
}
</style>
