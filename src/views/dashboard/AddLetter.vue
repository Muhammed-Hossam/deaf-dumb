<template>
  <Teleport to="body">
    <LoadingSpinner v-if="isLoading" />
  </Teleport>
  <form @submit.prevent="submitForm">
    <div class="mb-3">
      <label for="letters-select" class="form-label">Select a letter:</label>
      <select name="letters" class="form-select" id="letters-select" v-model="alphabet.letter">
        <option v-for="letter in letters" :key="letter" :value="letter">
          {{ letter }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <label for="letter-img" class="form-label">Letter Image:</label>
      <input
        class="form-control"
        type="file"
        id="letter-img"
        @change="handleLetterImageInput"
        accept="image/*"
      />
    </div>
    <button class="btn btn-primary" type="submit">Submit</button>
  </form>
</template>
<script>
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { db, storage } from "@/firebaseConfig";
import { doc, setDoc } from "@firebase/firestore";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import { useToast } from "vue-toastification";

export default {
  components: { LoadingSpinner },
  data() {
    return {
      isLoading: false,
      alphabet: {
        letter: "",
        signImage: "",
      },
      letters: [
        "A",
        "B",
        "C",
        "D",
        "E",
        "F",
        "G",
        "H",
        "I",
        "J",
        "K",
        "L",
        "M",
        "N",
        "O",
        "P",
        "Q",
        "R",
        "S",
        "T",
        "U",
        "V",
        "W",
        "X",
        "Y",
        "Z",
      ],
    };
  },
  methods: {
    handleLetterImageInput(e) {
      const signImage = e.target.files[0];
      this.alphabet.signImage = signImage;
    },
    uploadLettersImgs() {
      const toast = useToast();
      this.isLoading = true;
      const imageStorageRef = storageRef(
        storage,
        `Alphabets/${this.alphabet.signImage.name}`
      );
      const uploadImage = uploadBytesResumable(
        imageStorageRef,
        this.alphabet.signImage
      );
      uploadImage.on("state_changed", null, null, async () => {
        // Get the download URL and save the letter and the signImage to Firestore
        const downloadURL = await getDownloadURL(uploadImage.snapshot.ref);
        const lettersRef = doc(db, "letters", this.alphabet.letter);
        setDoc(lettersRef, {
          letter: this.alphabet.letter,
          signImage: downloadURL,
        })
          .then(() => {
            console.log("Data added succesfully");
            this.isLoading = false;
            toast.success("Data Added Succesfully.", this.toastOptions);
            this.alphabet.letter = "";
            this.alphabet.signImage = "";
          })
          .catch((error) => {
            toast.error(error.message, this.toastOptions);
          });
      });
    },
    async submitForm() {
      const toast = useToast();
      if (this.alphabet.letter && this.alphabet.signImage) {
        this.uploadLettersImgs();
      }else {
        toast.error('Letter or sign image not selected', this.toastOptions)
      }
    }
  },
  computed: {
    toastOptions() {
      return {
        position: "top-right",
        timeout: 2000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: true,
        closeButton: "button",
        icon: true,
        rtl: false,
      };
    },
  }
};
</script>
