
# Sign Language Project (deaf-dump)

This project is a Vue.js application that aims to provide resources and information related to sign language. It allows users to learn about sign language, access tutorials, and explore a collection of signs.

## Table of Contents

- [Features](#features)
- [Project Components](#project-components)
  - [Frontend Components](#Front-end-Components-and-Routes)
  - [Backend](#backend)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)


## Features

- Learn about sign language and its importance.
- Browse for specific signs with their meanings.
- Access tutorials and videos for learning sign language.
- User-friendly interface with responsive design for various devices.

## Project Components

### Front-end Components and Routes

The following is a list of front-end components and their corresponding routes in the project:

- **HomeView**
  - Path: `/` or `/home`
  - Description: Displays the home page of the application.

- **AboutView**
  - Path: `/about`
  - Description: Displays information about the application.

- **ContactView**
  - Path: `/contact`
  - Description: Provides contact information.

- **PrivacyView**
  - Path: `/privacy`
  - Description: Displays the privacy policy of the application.

- **AlphabetView**
  - Path: `/alphabet`
  - Description: Displays the alphabet view.

- **CommonSignsView**
  - Path: `/common-signs`
  - Description: Displays a list of common signs.

- **CommonSignDetails**
  - Path: `/common-signs/:word`
  - Description: Displays detailed information about a specific common sign.

- **DictionaryIndex**
  - Path: `/dictionary`
  - Description: Displays the index of the dictionary.

- **DictionaryShow**
  - Path: `/dictionary/:letter`
  - Description: Displays a list of words for a specific letter in the dictionary.

- **ShowWordDetials**
  - Path: `/dictionary/:letter/details`
  - Description: Displays detailed information about a specific word in the dictionary.

- **FlashCards**
  - Path: `/flash-cards`
  - Description: Displays flashcards for learning.

- **RegisterPage**
  - Path: `/register`
  - Description: Provides a registration form for new users.

- **LoginPage**
  - Path: `/login`
  - Description: Provides a login form for existing users.

- **AdminDashboard**
  - Path: `/dashboard`
  - Description: Displays the admin dashboard.





### Backend

#### Schema
##### Schema for the "commonSigns" Collection

Each document within the "commonSigns" collection represents a word or sign in the sign language.

###### Document: word

- **description** (string): A description or additional information about the word or sign.
- **innerImg** (string): The URL or path to an image representing the word or sign in a detailed view.
- **previewImg** (string): The URL or path to a smaller image representing the word or sign in a preview or thumbnail view.
- **word** (string): The word or sign in the sign language.

##### Schema for the "dictionary" Collection

This collection contains documents representing letters in sign language.

###### Document: letters

- **words** (array)
  - **index**
    - **description** (string): Description of the sign or word.
    - **innerImg** (string): URL or path to the image representing the word or sign in a detailed view.
    - **previewImg** (string): URL or path to a smaller image representing the word or sign in a preview or thumbnail view.
    - **word** (string): The word or sign in the sign language.
##### Schema for the "flashCards" Collection

This collection contains documents representing flashcards for learning sign language.

###### Document: word

- **signs** (array)
  - **index**
    - **isCorrect** (boolean): Indicates whether the sign is correct or not.
    - **sign** (string): The URL or path to an image representing the sign.

##### Schema for the "letters" Collection

This collection contains documents representing letters in sign language.

###### Document: letter

- **letter** (string): The letter in the sign language.
- **signImage** (string): The URL or path to an image representing the sign for the letter.
##### Schema for the "users" Collection

This collection contains documents representing user profiles.

###### Document: id

- **isLoggedIn** (boolean): Indicates whether the user is logged in or not.
- **role** (string): The role of the user.
- **userName** (string): The username of the user.
### Storage Structure

The storage structure for the project is organized as follows:

- **Alphabets/** (folder)
  - This folder contains files related to alphabets.

- **common-signs/** (folder)
  - This folder contains files related to common signs.

- **dictionary/** (folder)
  - This folder contains files related to the dictionary.

- **flash-cards/** (folder)
  - This folder contains files related to flashcards.



## Getting Started

### Prerequisites

- Node.js: Make sure you have Node.js installed on your machine. You can download the latest version from the official Node.js website: https://nodejs.org

### Installation

1. Clone the repository:

   ```
   git clone https://github.com/Mohamed-EL-Hawary/deaf-dumb.git
   ```

2. Navigate to the project directory:

   ```
   cd deaf-dumb
   ```


3. Install the dependencies:

   ```
   npm install -g @vue/cli
   npm install
   ```

## Usage

1. Start the development server:

   ```
   npm run serve
   ```

2. Open your web browser and visit the following URL:

   ```
   http://localhost:8080
   ```

3. You should see the sign language application running. Explore the different features and sections available.

## Contributing

We welcome contributions to enhance the Sign Language Project. If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make the necessary changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request to the main repository.

## License

This project is licensed under the [MIT License](LICENSE).
