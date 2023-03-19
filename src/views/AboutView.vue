<template>
  <div class="">
    <div class="banner rounded"></div>
    <div class="container my-5 py-5">
      <div class="row justify-content-center mb-5">
        <div class="col-4 w-auto">
          <div class="pic rounded-circle mx-auto">
            <img
              src="../assets/about/Mohamed-EL-Hawary.png"
              class="w-100 h-100 rounded-circle"
              alt=""
            />
          </div>
          <h5 class="name text-center fw-bold text-primary mt-2">
            Mohamed El-Hwary
          </h5>
        </div>
      </div>
      <div class="row justify-content-around mb-5">
        <div class="col-4 w-auto">
          <div class="pic rounded-circle mx-auto">
            <img
              src="../assets/about/abdrahman-mahmoud.jpeg"
              class="w-100 h-100 rounded-circle"
              alt=""
            />
          </div>
          <h5 class="name text-center fw-bold text-primary mt-2">
            Abdrahman Mahmoud
          </h5>
        </div>
        <div class="col-4 w-auto">
          <div class="pic rounded-circle mx-auto">
            <img
              src="../assets/about/ahmed-khaled.jpg"
              class="w-100 h-100 rounded-circle"
              alt=""
            />
          </div>
          <h5 class="name text-center fw-bold text-primary mt-2">
            Ahmed Khaled
          </h5>
        </div>
        <div class="col-4 w-auto">
          <div class="pic rounded-circle mx-auto">
            <img
              src="../assets/about/mahmoud-radwan.jpeg"
              class="w-100 h-100 rounded-circle"
              alt=""
            />
          </div>
          <h5 class="name text-center fw-bold text-primary mt-2">
            Mahmoud Radwan
          </h5>
        </div>
      </div>
      <div class="row mt-5 justify-content-between">
        <div class="col-4 w-auto">
          <div class="pic rounded-circle mx-auto">
            <img
              src="../assets/about/aya-baker.jpeg"
              class="w-100 h-100 rounded-circle"
              alt=""
            />
          </div>
          <h5 class="name text-center fw-bold text-primary mt-2">
            Aya Baker
          </h5>
        </div>
        <div class="col-4 w-auto">
          <div class="pic rounded-circle mx-auto">
            <img
              src="../assets/about/fatma-elkhzamy.jpeg"
              class="w-100 h-100 rounded-circle"
              alt=""
            />
          </div>
          <h5 class="name text-center fw-bold text-primary mt-2">
            Fatma Elkhzamy
          </h5>
        </div>
        <div class="col-4 w-auto">
          <div class="pic rounded-circle mx-auto">
            <img
              src="../assets/about/noura-shrief.jpeg"
              class="w-100 h-100 rounded-circle"
              alt=""
            />
          </div>
          <h5 class="name text-center fw-bold text-primary mt-2">
            Noura Shrief
          </h5>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.banner {
  background-image: url("../assets/about/team-banner-bg.jpg");
  background-size: cover;
  height: calc(100vh - 100px);
  margin: 0.8rem;
}

.pic {
  width: 150px;
  height: 150px;
  border: 5px solid #ccc;
}
</style>
