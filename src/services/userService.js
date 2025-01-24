import { doc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * Save user data to Firestore
 * @param {object} user - User object from Clerk
 */
export const saveUserToFirebase = async (user) => {
  if (!user) return;

  const userRef = doc(db, "users", user.id);
  const userData = {
    id: user.id,
    email: user.emailAddresses[0]?.emailAddress,
    firstName: user.firstName,
    lastName: user.lastName ,
    avatar: user.imageUrl, // Avatar URL
    createdAt: new Date(),
  };

  try {
    await setDoc(userRef, userData, { merge: true });
    console.log("User saved to Firebase successfully.");
  } catch (error) {
    console.error("Error saving user to Firebase:", error);
  }
};
