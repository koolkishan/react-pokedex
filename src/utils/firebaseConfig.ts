import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNkwUXJFMOOYjNpnTkrCo1Y9nCeTpFC04",
  authDomain: "pokedex-fe543.firebaseapp.com",
  projectId: "pokedex-fe543",
  storageBucket: "pokedex-fe543.appspot.com",
  messagingSenderId: "948503681986",
  appId: "1:948503681986:web:79250d83d60f75960a545b",
  measurementId: "G-4Z4DWLHXGS",
};

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
export const firebaseDB = getFirestore(app);

export const usersRef = collection(firebaseDB, "users");
export const pokemonListRef = collection(firebaseDB, "pokemonList");
