# PicCloud

PicCloud is an intuitive online image management application built with React. It empowers you to effortlessly save and organize your image collection by offering a user-friendly interface and seamless integration with Google Firestore.

## Features

Image URL Saving: PicCloud simplifies the process of saving images from the web. All you need is the image's URL, and PicCloud takes care of the rest, ensuring your images are securely stored.

Album Categorization: Organize your images into customizable albums. Create albums for different occasions, themes, or any category that suits your needs. Easily move images between albums.

Firestore Integration: PicCloud leverages Google Firestore as the backend database. This means your images are stored in a secure and scalable cloud-based environment.

## Installation

Install pic-cloud with npm

```bash
  npm install my-project
  cd pic-cloud
```

then you need to configure your Google Firebase configuration in the `firebaseInitjs` file inside the `src`. Here's a simple set of instructions to configure:

- Open your React project folder, which should be named "Pic-Cloud."

- Locate firebaseInit.js which will be inside of src folder:

- Open the firebaseInit.js file using a code editor of your choice.

- In the firebaseInit.js file, you will see a section where you can configure Firebase. There should be placeholders for your Firebase configuration.

### Get Firebase Configuration:

To obtain your Firebase configuration, follow these steps:

- Go to the Firebase Console. Select your Firebase project or create a new one.In the project settings, look for the "Firebase SDK snippet" and select "Config." You will see an object with configuration properties like apiKey, authDomain, projectId, and others. Copy this object.Replace Configuration:

- In the firebaseInit.js file, replace the existing configuration with the one you copied from the Firebase Console. It should look something like this:

javascript Copy code

```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};
//replace the above code block with your configuration

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db };
```

Save the File:

Save the firebaseInit.js file after updating the configuration.

Start Using the Project:

You've successfully configured your Firebase settings in the firebaseInit.js file. You can now start using the "Pic-Cloud" React project with Firebase integration.

## Screenshots

### Home page

<img src='Screenshots\home.png' width='50%'>

### Image list page

<img src='Screenshots\all-image.png' width='50%'>

### Add image and Edit image page

<img src='Screenshots\add-new-image-page.png' width='50%'>

### View image page

<img src='Screenshots\image-view.png' width='50%'>

##

<h2 align="center">
 ThankYou
</h2>
