import {
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";
import { firestore } from "../config/firebaseConfig";

export type userProp = {
  firstname: string;
  id: string;
  lastname: string;
  middlename: string;
  password: string;
  email: string;
};

export const getUser = async () => {
  return new Promise((resolve, reject) => {
    getDocs(collection(firestore, "user"))
      .then(function (response: any) {
        const newData: userProp[] = response.docs.map((doc: any) => ({
          ...doc.data(),
          id: doc.id,
        }));
        return resolve(newData);
      })
      .catch(function (error: any) {
        return reject(error);
      });
  });
};

export const addUser = async (data: userProp[]) => {
  console.log(data)
  return new Promise((resolve, reject) => {
   try{
    addDoc(collection(firestore, "user"), data)
    return resolve("User Created Successfully");
   }
   catch{
    return reject("Error Occured");
   }
        
      
  });
};
