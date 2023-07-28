import { fbStorage } from "@/utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const uploadFileToFirebaseStorage = async (
  file: File | null,
  filename: string | undefined,
): Promise<string> => {
  if (!file) {
    return "";
  }

  // Create a reference to the Firebase Storage location where you want to store the file
  const storageRef = ref(fbStorage, `files/${filename}`);

  try {
    const snapshot = await uploadBytes(storageRef, file);
    // File uploaded successfully
    console.log("File uploaded successfully:", snapshot);

    const downloadURL = await getDownloadURL(storageRef);
    // Get the download URL of the uploaded file
    console.log("File download URL:", downloadURL);

    return downloadURL;
  } catch (error) {
    // Handle any errors that occurred during the upload process
    console.error("Error uploading file:", error);
    throw error;
  }
};

export default uploadFileToFirebaseStorage;
