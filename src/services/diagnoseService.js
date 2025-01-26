import { doc, getDoc, collection, query, where, getDocs ,setDoc } from "firebase/firestore";
import { db } from "./firebase";


/**
 * Filter out undefined values from an object
 * @param {object} obj - The object to sanitize
 * @returns {object} - A sanitized object with no undefined values
 */
const sanitizeData = (obj) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, value]) => value !== undefined)
  );
};

/**
 * Save plant care data to Firestore linked to the current user
 * @param {object} plantData - The plant care data to save
 * @param {object} currentUser - The authenticated user object
 */
export const savePlantDiagnosisDataToFirebase = async (plantData, currentUser ,addedPhotos) => {
  if (!plantData || !currentUser) {
    console.error("Plant data or user information is missing.");
    return;
  }

  const userId = currentUser.id; // Extract the authenticated user's ID
  // const plantRef = doc(db, "diagnosis_data"); // Use the user ID as the document ID
  const plantRef = doc(collection(db, "diagnosis_data")); 

  // Add the user_id dynamically and sanitize the data
  const plantCareData = sanitizeData({
    ...plantData,
    user_id: userId,
    user_photos:addedPhotos,
    createdAt: new Date(),
  });

  try {
    await setDoc(plantRef, plantCareData, { merge: true });
    console.log("Plant care data saved to Firebase successfully.");
    return plantRef.id;  // Return the ID of the newly created document
  } catch (error) {
    console.log("Error saving plant care data to Firebase:", error);
  }
};


/** 
 * Get a specific diagnosis record by its ID.
 * @param {string} diagnosisId - The ID of the diagnosis record.
 * @returns {Promise<object|null>} - A promise resolving to the diagnosis record or null if not found.
 */
export const getDiagnosisDataById = async (diagnosisId) => {
  if (!diagnosisId) {
    console.error("Diagnosis ID is required to fetch a diagnosis record.");
    return null;
  }

  try {
    const diagnosisRef = doc(db, "diagnosis_data", diagnosisId);
    const docSnap = await getDoc(diagnosisRef);

    if (docSnap.exists()) {
      const diagnosisRecord = { id: docSnap.id, ...docSnap.data() };
      console.log("Diagnosis record fetched successfully:", diagnosisRecord);
      return diagnosisRecord;
    } else {
      console.warn("No diagnosis record found with the given ID.");
      return null;
    }
  } catch (error) {
    console.error("Error fetching diagnosis data by ID:", error);
    return null;
  }
};



/**
 * Get all diagnosis data records for a specific user.
 * @param {string} userId - The ID of the user.
 * @returns {Promise<Array>} - A promise resolving to an array of diagnosis records.
 */
export const getDiagnosisDataByUserId = async (userId) => {
  if (!userId) {
    console.error("User ID is required to fetch diagnosis data.");
    return [];
  }

  try {
    const diagnosisRef = collection(db, "diagnosis_data");
    const q = query(diagnosisRef, where("user_id", "==", userId));
    const querySnapshot = await getDocs(q);

    const diagnosisRecords = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    console.log("Diagnosis data fetched successfully:", diagnosisRecords);
    return diagnosisRecords;
  } catch (error) {
    console.error("Error fetching diagnosis data by user ID:", error);
    return [];
  }
};
