<template>
  <Teleport to="body">
    <LoadingSpinner v-if="isLoading" />
  </Teleport>
  <form @submit.prevent="submitForm">
    <div class="mb-3">
      <label for="letters-select" class="form-label">Select a letter:</label>
      <select
        name="letters"
        class="form-select"
        id="letters-select"
        v-model="dictionary.letter"
        :value="dictionary.letter"
      >
        <option v-for="letter in letters" :key="letter" :value="letter">
          {{ letter }}
        </option>
      </select>
    </div>
    <div class="mb-3">
      <label for="dictionary-word" class="form-label ms-2">Word:</label>
      <input
        type="text"
        class="form-control"
        id="dictionary-word"
        placeholder="Enter a word starts with your selected letter"
        v-model="dictionary.word"
      />
    </div>
    <div class="mb-3">
      <label for="dictionary-prev" class="form-label ms-2"
        >Preview Image:</label
      >
      <input
        class="form-control"
        type="file"
        id="dictionary-prev"
        @change="handleDictionaryPreviewInput"
      />
    </div>
    <div class="mb-3">
      <label for="dictionary-inner" class="form-label ms-2">Inner Image:</label>
      <input
        class="form-control"
        type="file"
        id="dictionary-inner"
        @change="handleDictionaryInnerInput"
      />
    </div>
    <div class="mb-3">
      <label for="description" class="form-label ms-2">Description:</label>
      <textarea
        class="form-control"
        id="description"
        placeholder="Enter the description of the Image"
        v-model="dictionary.description"
        rows="3"
      ></textarea>
    </div>
    <button class="btn btn-primary" type="submit">Submit</button>
  </form>
</template>

<script>
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import { arrayUnion, doc, updateDoc } from "@firebase/firestore";
import { db, storage } from "@/firebaseConfig";
import { useToast } from "vue-toastification";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
  components: { LoadingSpinner },
  data() {
    return {
      isLoading: false,
      dictionary: {
        letter: "",
        word: "",
        previewImage: "",
        innerImage: "",
        description: "",
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
    handleDictionaryPreviewInput(e) {
      const dictionaryPreviewImg = e.target.files[0];
      this.dictionary.previewImage = dictionaryPreviewImg;
    },
    handleDictionaryInnerInput(e) {
      const dictionaryInnerImg = e.target.files[0];
      this.dictionary.innerImage = dictionaryInnerImg;
    },
    uploadDictionaryData() {
      const toast = useToast();
      this.isLoading = true;
      const previewImageStorageRef = storageRef(
        storage,
        `dictionary/${this.dictionary.previewImage.name}`
      );
      const innerImageStorageRef = storageRef(
        storage,
        `dictionary/${this.dictionary.innerImage.name}`
      );
      const uploadPreviewImage = uploadBytesResumable(
        previewImageStorageRef,
        this.dictionary.previewImage
      );
      const uploadInnerImage = uploadBytesResumable(
        innerImageStorageRef,
        this.dictionary.innerImage
      );
      Promise.all([uploadPreviewImage, uploadInnerImage]).then(() => {
        // Get the download URLs and save the dictinary sign data to firestore
        Promise.all([
          getDownloadURL(uploadPreviewImage.snapshot.ref),
          getDownloadURL(uploadInnerImage.snapshot.ref),
        ]).then(async ([previewDownloadURL, innerDownloadURL]) => {
          const dictionaryRef = doc(db, "dictionary", this.dictionary.letter);
          const newWord = {
            word: this.dictionary.word,
            previewImg: previewDownloadURL,
            innerImg: innerDownloadURL,
            description: this.dictionary.description,
          };
          await updateDoc(dictionaryRef, { words: arrayUnion(newWord) })
            .then(() => {
              this.isLoading = false;
              toast.success("Data Added Successfully.", this.toastOptions);
              this.dictionary.word = "";
              this.dictionary.previewImage = "";
              this.dictionary.innerImage = "";
              this.dictionary.description = "";
            })
            .catch((error) => {
              toast.error(error.message, this.toastOptions);
            });
        });
      });
    },
    submitForm() {
      if (
        this.dictionary.letter &&
        this.dictionary.word &&
        this.dictionary.previewImage &&
        this.dictionary.innerImage &&
        this.dictionary.description
      ) {
        this.uploadDictionaryData();
      }else {
        const toast = useToast();
        toast.error('You should Complete All fields!')
      }
    },
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
  },
};
</script>
