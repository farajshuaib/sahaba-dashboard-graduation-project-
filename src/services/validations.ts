import { toast } from "react-toastify";
import * as yup from "yup";


export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const passwordRegexp = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;



export const loginSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required(),
});



export const forgotPasswordSchema = yup.object().shape({
  email: yup.string().email().required(),
});



export const resetPasswordSchema = yup.object().shape({
  password: yup.string().required().min(8).matches(passwordRegexp),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "password must match")
    .required(),
});



export const validateImage = (file: any) => {
  const fileType = file.type;
  const fileSize = file.size;
  const validImageTypes = [
    "image/jpg",
    "image/jpeg",
    "image/png",
    "image/gif",
    "image/svg",
    "image/webp",
    "image/svg+xml",
  ];
  if (!validImageTypes.includes(fileType)) {
    toast.error(
      "invalid file type, make sure you are uploading an image|jpeg,png,jpg,gif,svg,webp"
    );
    return false;
  }
  if (fileSize > 100000024) {
    toast.error("your image is too large, make sure it is less than 10MB");
    return false;
  }
  return true;
};
