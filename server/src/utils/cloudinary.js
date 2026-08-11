import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: 'auto',
    });
    fs.unlinkSync(localFilePath);
    return response;
  } catch (error) {
    if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath);
    return null;
  }
};

const cloudnaryDelete = async (input) => {
  try {
    if (!input) return null;
    let publicId = input;
    if (input.startsWith('http')) {
      const urlParts = input.split('/');
      const fileWithExt = urlParts.pop();
      const folder = urlParts.pop();
      const fileName = fileWithExt.split('.')[0];
      publicId = `${folder}/${fileName}`;
    }
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: 'image',
    });
    return result;
  } catch (error) {
    return null;
  }
};

export { uploadOnCloudinary, cloudnaryDelete };
