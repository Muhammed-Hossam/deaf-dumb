<template>
  <div class="about-us">
    <div class="banner"></div>
    <div class="container py-5">
      <div class="row">
        <div class="content">
          <div class="mission d-flex flex-column align-items-center">
            <p class="heading mission-heading d-inline-block p-3 h1 fw-bold border border-3 rounded-pill">Our Mission</p>
            <div class="line line1">
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 640 395"><g stroke-width="5" stroke="hsl(227, 71%, 57%)" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="matrix(1,0,0,1,-55,-209)"><path d="M138.74813950061798 218.5Q128.74813950061798 447.5 320.248139500618 400Q495.748139500618 347.5 501.748139500618 581.5 " marker-end="url(#SvgjsMarker2118)"></path></g><defs><marker markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" viewBox="0 0 5 5" orient="auto" id="SvgjsMarker2118"><polygon points="0,5 1.6666666666666667,2.5 0,0 5,2.5" fill="hsl(227, 71%, 57%)"></polygon></marker></defs></svg>
            </div>
            <card-container class="mt-0 mb-0 p-3 fw-bold fst-italic lh-lg" style="width: 57%; margin-left: 45%;">
              <p>
                At Deaf & Dumb, our mission is to empower and elevate the lives 
                of deaf-dumb individuals through innovative and inclusive technologies. 
                We strive to bridge the communication gap and create a supportive 
                environment where everyone can express themselves freely and with 
                confidence.
              </p>
            </card-container>
          </div>
          <div class="line line2">
            <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 640 380"><g stroke-width="4" stroke="hsl(227, 71%, 57%)" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="matrix(-1, 0, 0, 1, 695, -209)"><path d="M138.74813950061798 218.5Q128.74813950061798 447.5 320.248139500618 400Q495.748139500618 347.5 501.748139500618 581.5"></path></g><defs><marker markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" viewBox="0 0 5 5" orient="auto" id="SvgjsMarker2118"><polygon points="0,5 1.6666666666666667,2.5 0,0 5,2.5" fill="hsl(227, 71%, 57%)"></polygon></marker></defs></svg>
          </div>

          <div class="founder d-flex flex-column align-items-center">
            <p class="heading founder-heading d-inline-block p-3 h1 fw-bold border border-3 rounded-pill">Founder</p>
            <div class="line line3">
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 640 388"><g stroke-width="4" stroke="hsl(227, 71%, 57%)" fill="none" stroke-linecap="round" stroke-linejoin="round" transform="matrix(-1, 0, 0, 1, 695, -209)"><path d="M138.74813950061798 218.5Q128.74813950061798 447.5 320.248139500618 400Q495.748139500618 347.5 501.748139500618 581.5" marker-end="url(#SvgjsMarker2118)"></path></g><defs><marker markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" viewBox="0 0 5 5" orient="auto" id="SvgjsMarker2118"><polygon points="0,5 1.6666666666666667,2.5 0,0 5,2.5" fill="hsl(227, 71%, 57%)"></polygon></marker></defs></svg>
            </div>
            <card-container class="mt-0 mb-0 fw-bold fst-italic lh-lg" style="width: 57%; margin-right: 45%; padding: 1rem !important;">
              <div class="founder-details d-flex">
                <div class="founder-pic border border-2 rounded-circle">
                  <img src="../assets/about/founder-picture.jpg" class="w-100 h-100 rounded-circle" alt="founder-pic">
                </div>
                <div class="position-relative ms-1 mt-1">
                  <span class="founder-name d-block fs-5">Mohamed Haroun</span>
                  <span class="founder-job d-block position-absolute text-muted">Junior Frontend Developer</span>
                </div>
              </div>
              <p class="founder-message">
                I'm a Frontend Developer who passionate about Technologies. I have built
                this website for helping deaf-dumb individuals to learn 
              </p>
            </card-container>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>


<script>
import CardContainer from '@/components/CardContainer.vue';

export default {
  components: {
    CardContainer
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/scss/custom.scss";
$about-us-color: hsl(227deg, 71%, 57%);

.banner {
  background-image: url("../assets/about/team-banner-bg.jpg");
  background-size: cover;
  height: calc(100vh - 65px);
}

p.heading {
  color: $about-us-color;
  border-color: $about-us-color !important;
}

.mission {
  .mission-heading {
    margin-bottom: 0 !important;
  }

  .line1 {
    width: 29%;
    margin-left: 21%
  }
}

.founder {
  .founder-heading {
    margin-right: 20%;
    margin-bottom: 0 !important;
  }

  .line3 {
    width: 30%;
    margin-right: 43%;
  }

  .founder-details {
    .founder-pic {
      width: 60px;
      height: 60px;
    }
    .founder-name {
      top: 0.3rem;
      color: $about-us-color;
    }
    .founder-job {
      font-size: 0.8rem;
      top: 1.9rem;
    }
  }
}


.line2 {
  width: 37%;
  margin-left: 29%;
}
</style>
