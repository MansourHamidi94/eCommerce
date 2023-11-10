import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, getDocFromCache } from 'firebase/firestore';
import { db } from '../firebase/config';

// Your Firebase configuration object
import { firebaseConfig } from "./config";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Auth and get a reference to the service
const auth = getAuth(app);

// Initialize Firestore
const firestore = getFirestore(app); // Initialize Firestore

// Initialize the GoogleAuthProvider
const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: 'select_account' });

// Define the signInWithGoogle function
export const signInWithGoogle = () => {
    // Make sure to use signInWithPopup with the correct auth reference
    return signInWithPopup(auth, googleProvider);
};

export const handleUserProfile = async (userAuth, additionalData) => {
    if (!userAuth) return;
    const { uid } = userAuth;

    const userRef = doc(firestore, `users/${uid}`);
    const snapshot = await getDoc(userRef);

    if (!snapshot.exists) {
        const {displayName, email} = userAuth;
        const timestamp = new Date();
        try {
            await setDoc(userRef, {
                displayName,
                email,
                createdDate: timestamp,
                ...additionalData 
            });
        } catch (err) {
            // console.log(err);
        }
    }
    return userRef;
}; 