export const ImageToUri = async (uploadedFile) => {
  let base64Img;
  if (uploadedFile) {
    try {
      const file = uploadedFile;
      const getBase64file = (file) => {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      };

      base64Img = await getBase64file(file);
    } catch (err) {
      base64Img = uploadedFile;
    }
    return base64Img;
  } else return null;
};
