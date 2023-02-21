import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Financer's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyABpHgw1zHJYFOWGWrhHTsxlAPmhBF-G2E",
  authDomain: "financer-31c28.firebaseapp.com",
  projectId: "financer-31c28",
  storageBucket: "financer-31c28.appspot.com",
  messagingSenderId: "594821396842",
  appId: "1:594821396842:web:2298893ad3e227595f8d13"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);