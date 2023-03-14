<template>
  <Teleport to="body">
    <LoadingSpinner v-if="isLoading" />
  </Teleport>
  <form @submit.prevent="submitForm">
    <div class="mb-3">
      <label for="word-input" class="form-label ms-2">Word:</label>
      <input
        type="text"
        class="form-control"
        id="word-input"
        placeholder="Enter a word"
        v-model="flashCards.word"
      />
    </div>
    <div class="mb-3">
      <label for="formFile" class="form-label ms-2">First Image:</label>
      <div class="d-flex justify-content-between align-items-center">
        <input
          class="form-control w-75"
          type="file"
          id="formFile"
          @change="
            handleFlashCardsInput(flashCards.choosingSigns.firstSign, $event)
          "
        />
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flashRadio"
            id="firstFlashRadio"
            :value="true"
            :checked="flashCards.choosingSigns.firstSign.isCorrect"
            @change="handleRadioChange(0)"
          />
          <label class="form-check-label" for="firstFlashRadio">
            Correct
          </label>
        </div>
      </div>
    </div>
    <div class="mb-3">
      <label for="formFile" class="form-label ms-2">Second Image:</label>
      <div class="d-flex justify-content-between align-items-center">
        <input
          class="form-control w-75"
          type="file"
          id="formFile"
          @change="
            handleFlashCardsInput(flashCards.choosingSigns.secondSign, $event)
          "
        />
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flashRadio"
            id="secondFlashRadio"
            :value="true"
            :checked="flashCards.choosingSigns.secondSign.isCorrect"
            @change="handleRadioChange(1)"
          />
          <label class="form-check-label" for="secondFlashRadio">
            Correct
          </label>
        </div>
      </div>
    </div>
    <div class="mb-3">
      <label for="formFile" class="form-label ms-2">Third Image:</label>
      <div class="d-flex justify-content-between align-items-center">
        <input
          class="form-control w-75"
          type="file"
          id="formFile"
          @change="
            handleFlashCardsInput(flashCards.choosingSigns.thirdSign, $event)
          "
        />
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flashRadio"
            id="thirdFlashRadio"
            :value="true"
            :checked="flashCards.choosingSigns.thirdSign.isCorrect"
            @change="handleRadioChange(2)"
          />
          <label class="form-check-label" for="thirdFlashRadio">
            Correct
          </label>
        </div>
      </div>
    </div>
    <div class="mb-3">
      <label for="formFile" class="form-label ms-2">Fourth Image:</label>
      <div class="d-flex justify-content-between align-items-center">
        <input
          class="form-control w-75"
          type="file"
          id="formFile"
          @change="
            handleFlashCardsInput(flashCards.choosingSigns.fourthSign, $event)
          "
        />
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flashRadio"
            id="fourthFlashRadio"
            :value="true"
            :checked="flashCards.choosingSigns.fourthSign.isCorrect"
            @change="handleRadioChange(3)"
          />
          <label class="form-check-label" for="fourthFlashRadio">
            Correct
          </label>
        </div>
      </div>
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
import { doc, setDoc } from "@firebase/firestore";
import { db, storage } from "@/firebaseConfig";
import { useToast } from "vue-toastification";

import LoadingSpinner from "@/components/LoadingSpinner.vue";

export default {
  components: { LoadingSpinner },
  data() {
    return {
      isLoading: false,
      flashCards: {
        word: "",
        choosingSigns: {
          firstSign: {
            sign: "",
            isCorrect: false,
          },
          secondSign: {
            sign: "",
            isCorrect: false,
          },
          thirdSign: {
            sign: "",
            isCorrect: false,
          },
          fourthSign: {
            sign: "",
            isCorrect: false,
          },
        },
      },
    };
  },
  methods: {
    handleFlashCardsInput(chosenSign, e) {
      const img = e.target.files[0];
      chosenSign.sign = img;
      console.log(this.flashCards.choosingSigns);
    },
    handleRadioChange(index) {
      for (let key in this.flashCards.choosingSigns) {
        if (key === `firstSign` && index === 0) {
          this.flashCards.choosingSigns.firstSign.isCorrect = true;
        } else if (key === `secondSign` && index === 1) {
          this.flashCards.choosingSigns.secondSign.isCorrect = true;
        } else if (key === `thirdSign` && index === 2) {
          this.flashCards.choosingSigns.thirdSign.isCorrect = true;
        } else if (key === `fourthSign` && index === 3) {
          this.flashCards.choosingSigns.fourthSign.isCorrect = true;
        } else {
          this.flashCards.choosingSigns[key].isCorrect = false;
        }
      }
    },
    uploadFlashCardsData() {
      const toast = useToast();
      this.isLoading = true;
      const firstSignRef = storageRef(
        storage,
        `flash-cards/${this.flashCards.choosingSigns.firstSign.sign.name}`
      );
      const secondSignRef = storageRef(
        storage,
        `flash-cards/${this.flashCards.choosingSigns.secondSign.sign.name}`
      );
      const thirdSignRef = storageRef(
        storage,
        `flash-cards/${this.flashCards.choosingSigns.thirdSign.sign.name}`
      );
      const fourthSignRef = storageRef(
        storage,
        `flash-cards/${this.flashCards.choosingSigns.fourthSign.sign.name}`
      );
      const uploadFirstSign = uploadBytesResumable(
        firstSignRef,
        this.flashCards.choosingSigns.firstSign.sign
      );
      const uploadSecondSign = uploadBytesResumable(
        secondSignRef,
        this.flashCards.choosingSigns.secondSign.sign
      );
      const uploadThirdSign = uploadBytesResumable(
        thirdSignRef,
        this.flashCards.choosingSigns.thirdSign.sign
      );
      const uploadFourthSign = uploadBytesResumable(
        fourthSignRef,
        this.flashCards.choosingSigns.fourthSign.sign
      );
      Promise.all([
        uploadFirstSign,
        uploadSecondSign,
        uploadThirdSign,
        uploadFourthSign,
      ])
        .then(() => {
          // Get the download URLs and save the flash-cards data to firestore
          this.isLoading = true;
          Promise.all([
            getDownloadURL(uploadFirstSign.snapshot.ref),
            getDownloadURL(uploadSecondSign.snapshot.ref),
            getDownloadURL(uploadThirdSign.snapshot.ref),
            getDownloadURL(uploadFourthSign.snapshot.ref),
          ])
            .then(
              ([
                firstSignDownloadURL,
                secondSignDownloadURL,
                thirdSignDownloadURL,
                fourthSignDownloadURL,
              ]) => {
                const commonSignsRef = doc(
                  db,
                  "flashCards",
                  this.flashCards.word
                );
                setDoc(commonSignsRef, {
                  word: this.flashCards.word,
                  firstSign: {
                    sign: firstSignDownloadURL,
                    isCorrect:
                      this.flashCards.choosingSigns.firstSign.isCorrect,
                  },
                  secondSign: {
                    sign: secondSignDownloadURL,
                    isCorrect:
                      this.flashCards.choosingSigns.secondSign.isCorrect,
                  },
                  thirdSign: {
                    sign: thirdSignDownloadURL,
                    isCorrect:
                      this.flashCards.choosingSigns.thirdSign.isCorrect,
                  },
                  fourthSign: {
                    sign: fourthSignDownloadURL,
                    isCorrect:
                      this.flashCards.choosingSigns.fourthSign.isCorrect,
                  },
                })
                  .then(() => {
                    this.isLoading = false;
                    toast.success(
                      "Data Added Successfully.",
                      this.toastOptions
                    );
                    this.flashCards.word = "";
                    this.flashCards.choosingSigns.firstSign.sign = "";
                    this.flashCards.choosingSigns.firstSign.isCorrect = false;
                    this.flashCards.choosingSigns.secondSign.sign = "";
                    this.flashCards.choosingSigns.secondSign.isCorrect = false;
                    this.flashCards.choosingSigns.thirdSign.sign = "";
                    this.flashCards.choosingSigns.thirdSign.isCorrect = false;
                    this.flashCards.choosingSigns.fourthSign.sign = "";
                    this.flashCards.choosingSigns.fourthSign.isCorrect = false;
                  })
                  .catch((error) => {
                    toast.error(error.message, this.toastOptions);
                    this.isLoading = false;
                  });
              }
            )
            .catch((error) => {
              toast.error(error.message, this.toastOptions);
              this.isLoading = false;
            });
        })
        .catch((error) => {
          toast.error(error.message, this.toastOptions);
          this.isLoading = false;
        });
    },
    submitForm() {
      if (
        this.flashCards.word &&
        this.flashCards.choosingSigns.firstSign.sign &&
        this.flashCards.choosingSigns.secondSign.sign &&
        this.flashCards.choosingSigns.thirdSign.sign && 
        this.flashCards.choosingSigns.firstSign.sign
      ) {
        this.uploadFlashCardsData();
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
