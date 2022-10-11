// initialize first db
import { initializeApp } from 'firebase/app';
import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword
} from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"


// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyD48FgLRovAV22aBmYxlNS8UISRqb4tnAU",
    authDomain: "crwn-project-db-3c55d.firebaseapp.com",
    projectId: "crwn-project-db-3c55d",
    storageBucket: "crwn-project-db-3c55d.appspot.com",
    messagingSenderId: "72065136117",
    appId: "1:72065136117:web:b6ca15a27a3a95bea35cbc"
  };

  // Initialize Firebase
  const firebaseApp = initializeApp(firebaseConfig);

  const googleProvider = new GoogleAuthProvider();

  googleProvider.setCustomParameters({
      prompt: "select_account"
  });

  export const auth = getAuth();
  export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider)
  export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider)

  export const db = getFirestore();

  export const createUserDocumentFromAuth = async (userAuth, additionalInformation) => {
    const userDocRef = doc(db, 'users', userAuth.uid);

    console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);

    //check if user does not exist

    if(!userSnapshot.exists()) {
        const { displayName, email} = userAuth
        const createdAt= new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            })
        } catch (error) {
            console.log("error creating the user", error.message)
        }
    }
    //check if exists
    return userDocRef;
  }

  export const createAuthUserWithEmailAndPassword = async(email, password) => {
      if(!email || !password) return;
      return await createUserWithEmailAndPassword(auth, email, password);

  }