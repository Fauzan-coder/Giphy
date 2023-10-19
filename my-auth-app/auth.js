import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from './firebase'; 


const firebaseAuth = getAuth(auth);

export const signUp = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    throw error;
  }
};

export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(firebaseAuth, email, password);
  } catch (error) {
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await signOut(firebaseAuth);
  } catch (error) {
    throw error;
  }
};
