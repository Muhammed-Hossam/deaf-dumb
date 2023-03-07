<template>
  <LoadingSpinner v-if="isLoading" />
  <div class="container">
    <card-container>
      <h2 class="text-center">Add New Item</h2>
      <form @submit.prevent="submitForm">
        <div class="select-page">
          <h3>Select a page</h3>
          <div class="radios mt-3 d-flex justify-content-around mb-3">
            <div class="form-check" v-for="page in pageTypes" :key="page.value">
              <input
                class="form-check-input"
                type="radio"
                :id="page.value"
                :value="page.value"
                name="page"
                :checked="selectedPageType === page.value"
                v-model="selectedPageType"
              />
              <label class="form-check-label" :for="page.value">
                {{ page.label }}
              </label>
            </div>
          </div>
        </div>
        <div v-if="selectedPageType === 'alphabets'" class="letters-inputs">
          <div class="mb-3">
            <label for="formFile" class="form-label">Select a letter:</label>
            <select
              name="letters"
              class="form-select"
              id="letters-select"
              v-model="form.alphabets.letter"
            >
              <option v-for="letter in letters" :key="letter" :value="letter">
                {{ letter }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="formFile" class="form-label">Letter Image:</label>
            <input
              class="form-control"
              type="file"
              id="formFile"
              @change="handleLetterImageInput"
              accept="image/*"
            />
          </div>
        </div>
        <div
          v-if="selectedPageType === 'common-signs'"
          class="common-signs-inputs"
        >
          <div class="mb-3">
            <label for="formFile" class="form-label ms-2">Word:</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter Common Sign Word"
              v-model="form.commonSigns.word"
            />
          </div>
          <div class="mb-3">
            <label for="formFile" class="form-label ms-2">Preview Image:</label>
            <input
              class="form-control"
              type="file"
              id="formFile"
              @change="handleCommonSignPreviewInput"
            />
          </div>
          <div class="mb-3">
            <label for="formFile" class="form-label ms-2">Inner Image:</label>
            <input
              class="form-control"
              type="file"
              id="formFile"
              @change="handleCommonSignInnerInput"
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label ms-2"
              >Description:</label
            >
            <textarea
              class="form-control"
              id="description"
              placeholder="Enter the description of the Image"
              v-model="form.commonSigns.description"
              rows="3"
            ></textarea>
          </div>
        </div>
        <div v-if="selectedPageType === 'dictionary'">
          <div class="mb-3">
            <label for="formFile" class="form-label">Select a letter:</label>
            <select
              name="letters"
              class="form-select"
              id="letters-select"
              v-model="form.dictionary.letter"
            >
              <option v-for="letter in letters" :key="letter" :value="letter">
                {{ letter }}
              </option>
            </select>
          </div>
          <div class="mb-3">
            <label for="formFile" class="form-label ms-2">Word:</label>
            <input
              type="text"
              class="form-control"
              placeholder="Enter a word starts with your selected letter"
              v-model="form.dictionary.word"
            />
          </div>
          <div class="mb-3">
            <label for="formFile" class="form-label ms-2">Preview Image:</label>
            <input
              class="form-control"
              type="file"
              id="formFile"
              @change="handleDictionaryPreviewInput"
            />
          </div>
          <div class="mb-3">
            <label for="formFile" class="form-label ms-2">Inner Image:</label>
            <input
              class="form-control"
              type="file"
              id="formFile"
              @change="handleDictionaryInnerInput"
            />
          </div>
          <div class="mb-3">
            <label for="description" class="form-label ms-2"
              >Description:</label
            >
            <textarea
              class="form-control"
              id="description"
              placeholder="Enter the description of the Image"
              v-model="form.dictionary.description"
              rows="3"
            ></textarea>
          </div>
        </div>
        <button class="btn btn-primary" type="submit">Submit</button>
      </form>
    </card-container>
  </div>
</template>

<script>
import CardContainer from "@/components/CardContainer.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import {
  ref as storageRef,
  uploadBytesResumable,
  getDownloadURL,
} from "@firebase/storage";
import { arrayUnion, doc, setDoc, updateDoc } from "@firebase/firestore";
import { db, storage } from "@/firebaseConfig";
import { useToast } from "vue-toastification";

export default {
  name: "admin-dashboard",
  components: {
    CardContainer,
    LoadingSpinner,
  },
  data() {
    return {
      isLoading: false,
      pageTypes: [
        { label: "Sign Language Alphabets", value: "alphabets" },
        { label: "Common Signs", value: "common-signs" },
        { label: "Signs Dictionary", value: "dictionary" },
        { label: "Flash Cards", value: "flash-cards" },
      ],
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
      selectedPageType: "",
      selectedLetter: "",
      form: {
        alphabets: { letter: "", signImage: "" },
        commonSigns: {
          word: "",
          previewImage: "",
          innerImage: "",
          description: "",
        },
        dictionary: {
          letter: "",
          word: "",
          previewImage: "",
          innerImage: "",
          description: "",
        },
        flashCards: { word: "", choosingSigns: [], correctSign: "" },
      },
    };
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
  methods: {
    uploadLettersImgs() {
      const toast = useToast();
      this.isLoading = true;
      const imageStorageRef = storageRef(
        storage,
        `Alphabets/${this.form.alphabets.signImage.name}`
      );
      const uploadImage = uploadBytesResumable(
        imageStorageRef,
        this.form.alphabets.signImage
      );
      uploadImage.on("state_changed", null, null, async () => {
        // Get the download URL and save the letter and the signImage to Firestore
        const downloadURL = await getDownloadURL(uploadImage.snapshot.ref);
        const lettersRef = doc(db, "letters", this.form.alphabets.letter);
        setDoc(lettersRef, {
          letter: this.form.alphabets.letter,
          signImage: downloadURL,
        })
          .then(() => {
            console.log("Data added succesfully");
            this.isLoading = false;
            toast.success("Data Added Succesfully.", this.toastOptions);
            this.form.alphabets.letter = "";
            this.form.alphabets.signImage = "";
          })
          .catch((error) => {
            toast.error(error.message, this.toastOptions);
          });
      });
    },
    uploadCommonSignsData() {
      const toast = useToast();
      this.isLoading = true;
      const previewImageStorageRef = storageRef(
        storage,
        `common-signs/${this.form.commonSigns.previewImage.name}`
      );
      const innerImageStorageRef = storageRef(
        storage,
        `common-signs/${this.form.commonSigns.innerImage.name}`
      );
      const uploadPreviewImage = uploadBytesResumable(
        previewImageStorageRef,
        this.form.commonSigns.previewImage
      );
      const uploadInnerImage = uploadBytesResumable(
        innerImageStorageRef,
        this.form.commonSigns.innerImage
      );

      Promise.all([uploadPreviewImage, uploadInnerImage]).then(() => {
        // Get the download URLs and save the common sign data to firestore
        Promise.all([
          getDownloadURL(uploadPreviewImage.snapshot.ref),
          getDownloadURL(uploadInnerImage.snapshot.ref),
        ]).then(([previewDownloadURL, innerDownloadURL]) => {
          const commonSignsRef = doc(
            db,
            "commonSigns",
            this.form.commonSigns.word
          );
          setDoc(commonSignsRef, {
            word: this.form.commonSigns.word,
            previewImg: previewDownloadURL,
            innerImg: innerDownloadURL,
            description: this.form.commonSigns.description,
          })
            .then(() => {
              this.isLoading = false;
              toast.success("Data Added Successfully.", this.toastOptions);
              this.form.commonSigns.word = "";
              this.form.commonSigns.previewImage = "";
              this.form.commonSigns.innerImage = "";
              this.form.commonSigns.description = "";
            })
            .catch((error) => {
              toast.error(error.message, this.toastOptions);
            });
        });
      });
    },
    uploadDictionaryData() {
      const toast = useToast();
      this.isLoading = true;
      const previewImageStorageRef = storageRef(
        storage,
        `dictionary/${this.form.dictionary.previewImage.name}`
      );
      const innerImageStorageRef = storageRef(
        storage,
        `dictionary/${this.form.dictionary.innerImage.name}`
      );
      const uploadPreviewImage = uploadBytesResumable(
        previewImageStorageRef,
        this.form.dictionary.previewImage
      );
      const uploadInnerImage = uploadBytesResumable(
        innerImageStorageRef,
        this.form.dictionary.innerImage
      );

      Promise.all([uploadPreviewImage, uploadInnerImage]).then(() => {
        // Get the download URLs and save the dictinary sign data to firestore
        Promise.all([
          getDownloadURL(uploadPreviewImage.snapshot.ref),
          getDownloadURL(uploadInnerImage.snapshot.ref),
        ]).then(async ([previewDownloadURL, innerDownloadURL]) => {
          const dictionaryRef = doc(
            db,
            "dictionary",
            this.form.dictionary.letter
          );
          const newWord = {
            word: this.form.dictionary.word,
            previewImg: previewDownloadURL,
            innerImg: innerDownloadURL,
            description: this.form.dictionary.description,
          };

          await updateDoc(dictionaryRef, { words: arrayUnion(newWord) })
            .then(() => {
              this.isLoading = false;
              toast.success("Data Added Successfully.", this.toastOptions);
              this.form.dictionary.word = "";
              this.form.dictionary.previewImage = "";
              this.form.dictionary.innerImage = "";
              this.form.dictionary.description = "";
            })
            .catch((error) => {
              toast.error(error.message, this.toastOptions);
            });
        });
      });
    },
    async submitForm() {
      if (
        this.selectedPageType === "alphabets" &&
        this.form.alphabets.letter &&
        this.form.alphabets.signImage
      ) {
        this.uploadLettersImgs();
      } else if (
        this.selectedPageType === "common-signs" &&
        this.form.commonSigns.word &&
        this.form.commonSigns.previewImage &&
        this.form.commonSigns.innerImage &&
        this.form.commonSigns.description
      ) {
        this.uploadCommonSignsData();
      } else if (
        this.selectedPageType === "dictionary" &&
        this.form.dictionary.letter &&
        this.form.dictionary.word &&
        this.form.dictionary.previewImage &&
        this.form.dictionary.innerImage &&
        this.form.dictionary.description
      ) {
        this.uploadDictionaryData();
      }
    },
    handleLetterImageInput(e) {
      this.form.alphabets.signImage = e.target.files[0];
    },
    handleCommonSignPreviewInput(e) {
      this.form.commonSigns.previewImage = e.target.files[0];
    },
    handleCommonSignInnerInput(e) {
      this.form.commonSigns.innerImage = e.target.files[0];
    },
    handleDictionaryPreviewInput(e) {
      this.form.dictionary.previewImage = e.target.files[0];
    },
    handleDictionaryInnerInput(e) {
      this.form.dictionary.innerImage = e.target.files[0];
    },
  },
  mounted() {
    this.selectedPageType = this.pageTypes[0].value;
  },
};
</script>

