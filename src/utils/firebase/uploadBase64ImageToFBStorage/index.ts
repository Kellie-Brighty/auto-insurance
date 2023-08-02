import { fbStorage } from "@/utils/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const uploadBase64ImageToFirebaseStorage = async (
  base64Image: string,
  filename: string,
): Promise<string> => {
  // Remove the data URL prefix (e.g., "data:image/png;base64,")
  const base64ImageWithoutPrefix = base64Image.replace(
    /^data:image\/[a-z]+;base64,/,
    "",
  );

  // Convert the base64 image to a Uint8Array
  const byteCharacters = atob(base64ImageWithoutPrefix);
  const byteNumbers: number[] = [];
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers.push(byteCharacters.charCodeAt(i));
  }
  const byteArray = new Uint8Array(byteNumbers);

  // Create a reference to the Firebase Storage location where you want to store the image
  const storageRef = ref(fbStorage, `images/${filename}`);

  // Upload the image as a Blob
  const imageBlob = new Blob([byteArray], { type: "image/png" }); // Change the 'type' according to your image format

  try {
    const snapshot = await uploadBytes(storageRef, imageBlob);
    // Image uploaded successfully
    console.log("Image uploaded successfully:", snapshot);

    const downloadURL = await getDownloadURL(storageRef);
    // Get the download URL of the uploaded image
    console.log("Image download URL:", downloadURL);

    return downloadURL;
  } catch (error) {
    // Handle any errors that occurred during the upload process
    console.error("Error uploading image:", error);
    throw error;
  }
};

export default uploadBase64ImageToFirebaseStorage;
