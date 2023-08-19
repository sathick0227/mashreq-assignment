import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../config/firebaseConfig";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const signInWithEmailPassword = async (
  email: string,
  password: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      return resolve(user);
    } catch (error: any) {
      if (error.code === "auth/user-not-found") {
        error.message = "User not found";
        return reject(error.message);
      } else if (error.code === "auth/wrong-password") {
        error.message = "Wrong Password";
        return reject(error.message);
      } else {
        return reject(error);
      }
    }
  });
};

export const signUpWithEmailPassword = async (
  email: string,
  password: string,
  displayName: string
) => {
  return new Promise(async (resolve, reject) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      await updateProfile(user, {
        displayName: displayName,
      });
      return resolve(user);
    } catch (error: any) {
      return reject(error.message);
    }
  });
};

export const SuccessToast = async (message: any) => {
  toast.success(message, {
    position: "bottom-center",
    autoClose: 1000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: 0,
    theme: "dark",
  });
  setTimeout(() => {
    window.location.reload();
  }, 1200);
};

export const ErrorToast = (message: string) => {
  toast.error(message, {
    position: "bottom-center",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: 0,
    theme: "dark",
  });
};
