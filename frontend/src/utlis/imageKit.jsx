import ImageKit from "imagekit";

const imageKit = new ImageKit({
  publicKey: import.meta.env.VITE_APP_IMAGEKIT_PUBLIC_KEY,
  privateKey: import.meta.env.VITE_APP_IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: import.meta.env.VITE_APP_IMAGEKIT_URL_END_POINT,
});

const uploadToImageKit = async (file) => {
  return await imageKit.upload({
    file: file,
    fileName: file.name,
  });
};

export default uploadToImageKit;
