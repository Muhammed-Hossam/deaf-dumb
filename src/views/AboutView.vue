<template>
  <div>
    <div class="image-container my-5">
   <img src="../assets/about/abdrahman-mahmoud.jpeg" alt="Image 1">
   <img src="../assets/about/ahmed-khaled.jpg" alt="Image 1">
   <img src="../assets/about/fatma-elkhzamy.jpeg" alt="Image 1">
   <img src="../assets/about/aya-baker.jpeg" alt="Image 1">
   <img src="../assets/about/mahmoud-radwan.jpeg" alt="Image 1">
   <img src="../assets/about/noura-shrief.jpeg" alt="Image 1">
   <img src="../assets/about/Mohamed-EL-Hawary.png" alt="Image 1">
</div>

  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.image-container {
  position: relative;
  width: 500px; /* increase the size of the container */
  height: 500px;
  border-radius: 50%;
  overflow: hidden;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  overflow: visible;
}

.image-container img {
  width: 80px; /* decrease the size of the images */
  height: 80px;
  border-radius: 50%;
  position: absolute;
  transform: translate(-50%, -50%);
  border: 1px solid #ccc;
}

.image-container img:nth-child(1) {
  top: 0%;
  left: 50%;
}

.image-container img:nth-child(2) {
  top: 20%;
  left: 90%;
}

.image-container img:nth-child(3) {
  top: 70%;
  left: 96%;
}

.image-container img:nth-child(4) {
  top: 100%;
  left: 50%;
}

.image-container img:nth-child(5) {
  top: 70%;
  left: 5%;
}

.image-container img:nth-child(6) {
  top: 20%;
  left: 10%;
}

.image-container img:nth-child(7) {
  top: 50%;
  left: 50%;
}


</style>
