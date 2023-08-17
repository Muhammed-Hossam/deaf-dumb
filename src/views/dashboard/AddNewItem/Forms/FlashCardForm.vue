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
          @change="handleFlashCardsInput(flashCards.signs[0], $event)"
        />
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flashRadio"
            id="firstFlashRadio"
            :value="true"
            :checked="flashCards.signs[0].isCorrect"
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
          @change="handleFlashCardsInput(flashCards.signs[1], $event)"
        />
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flashRadio"
            id="secondFlashRadio"
            :value="true"
            :checked="flashCards.signs[1].isCorrect"
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
          @change="handleFlashCardsInput(flashCards.signs[2], $event)"
        />
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flashRadio"
            id="thirdFlashRadio"
            :value="true"
            :checked="flashCards.signs[2].isCorrect"
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
          @change="handleFlashCardsInput(flashCards.signs[3], $event)"
        />
        <div class="form-check">
          <input
            class="form-check-input"
            type="radio"
            name="flashRadio"
            id="fourthFlashRadio"
            :value="true"
            :checked="flashCards.signs[3].isCorrect"
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

import LoadingSpinner from "@/components/common/LoadingSpinner.vue";

export default {
  components: { LoadingSpinner },
  data() {
    return {
      isLoading: false,
      flashCards: {
        word: "",
        signs: [
          {
            sign: "",
            isCorrect: false,
          },
          {
            sign: "",
            isCorrect: false,
          },
          {
            sign: "",
            isCorrect: false,
          },
          {
            sign: "",
            isCorrect: false,
          },
        ],
      },
    };
  },
  methods: {
    handleFlashCardsInput(chosenSign, e) {
      const img = e.target.files[0];
      chosenSign.sign = img;
      console.log(this.flashCards.signs);
    },
    handleRadioChange(index) {
      for (let i = 0; i < this.flashCards.signs.length; i++) {
        if (i === index) {
          this.flashCards.signs[i].isCorrect = true;
        } else {
          this.flashCards.signs[i].isCorrect = false;
        }
      }
      console.log(this.flashCards.signs)
    },
    uploadFlashCardsData() {
      const toast = useToast();
      this.isLoading = true;
      const firstSignRef = storageRef(
        storage,
        `flash-cards/${this.flashCards.signs[0].sign.name}`
      );
      const secondSignRef = storageRef(
        storage,
        `flash-cards/${this.flashCards.signs[1].sign.name}`
      );
      const thirdSignRef = storageRef(
        storage,
        `flash-cards/${this.flashCards.signs[2].sign.name}`
      );
      const fourthSignRef = storageRef(
        storage,
        `flash-cards/${this.flashCards.signs[3].sign.name}`
      );
      const uploadFirstSign = uploadBytesResumable(
        firstSignRef,
        this.flashCards.signs[0].sign
      );
      const uploadSecondSign = uploadBytesResumable(
        secondSignRef,
        this.flashCards.signs[1].sign
      );
      const uploadThirdSign = uploadBytesResumable(
        thirdSignRef,
        this.flashCards.signs[2].sign
      );
      const uploadFourthSign = uploadBytesResumable(
        fourthSignRef,
        this.flashCards.signs[3].sign
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
                  signs: [
                    {
                      sign: firstSignDownloadURL,
                      isCorrect: this.flashCards.signs[0].isCorrect
                    },
                    {
                      sign: secondSignDownloadURL,
                      isCorrect: this.flashCards.signs[1].isCorrect
                    },
                    {
                      sign: thirdSignDownloadURL,
                      isCorrect: this.flashCards.signs[2].isCorrect
                    },
                    {
                      sign: fourthSignDownloadURL,
                      isCorrect: this.flashCards.signs[3].isCorrect
                    }
                  ]
                })
                  .then(() => {
                    this.isLoading = false;
                    toast.success(
                      "Data Added Successfully.",
                      this.toastOptions
                    );
                    this.flashCards.word = "";
                    this.flashCards.signs[0].sign = "";
                    this.flashCards.signs[0].isCorrect = false;
                    this.flashCards.signs[1].sign = "";
                    this.flashCards.signs[1].isCorrect = false;
                    this.flashCards.signs[2].sign = "";
                    this.flashCards.signs[2].isCorrect = false;
                    this.flashCards.signs[3].sign = "";
                    this.flashCards.signs[3].isCorrect = false;
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
      const toast = useToast();
      if (
        this.flashCards.word &&
        this.flashCards.signs[0].sign &&
        this.flashCards.signs[1].sign &&
        this.flashCards.signs[2].sign &&
        this.flashCards.signs[3].sign
      ) {
        this.uploadFlashCardsData();
      }else {
        toast.error('You should Complete All fields!', this.toastOptions);
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
