import { toast } from "react-toastify";
import * as yup from "yup";
export const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const createCollectionSchema = yup.object().shape({
  logo_image: yup
    .mixed()
    .test("fileSize", "The file is too large", (value) => {
      if (!value.length) return true; // attachment is optional
      return value.size <= 100000024;
    })
    .required(),
  banner_image: yup
    .mixed()
    .test("fileSize", "The file is too large", (value) => {
      if (!value.length) return true; // attachment is optional
      return value.size <= 100000024;
    })
    .required(),
  name: yup.string().required(),
  description: yup.string().required(),
  facebook_url: yup.string().url().nullable(),
  twitter_url: yup.string().url().nullable(),
  telegram_url: yup.string().url().nullable(),
  is_sensitive_content: yup.boolean().required(),
  category_id: yup.number().required(),
});

export const updateCollectionSchema = yup.object().shape({
  name: yup.string().required(),
  description: yup.string().required(),
  facebook_url: yup.string().url().nullable(),
  twitter_url: yup.string().url().nullable(),
  telegram_url: yup.string().url().nullable(),
  is_sensitive_content: yup.boolean().required(),
  category_id: yup.number().required(),
});

export const createNftSchema = yup.object().shape({
  title: yup.string().required(),
  description: yup.string().required(),
  file_path: yup.string().required(),
  collection_id: yup.number().required(),
  price: yup.number().required().positive().min(0.01).max(5.0),
});

export const updatePriceSchema = yup.object().shape({
  price: yup.number().required().positive().min(0.01).max(5.0),
});

export const contactSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  subject: yup.string().required(),
  message: yup.string().required(),
});

export const kycSchema = yup.object().shape({
  gender: yup.string().required(),
  country: yup.string().required(),
  city: yup.string().required(),
  address: yup.string().required(),
  phone_number: yup
    .string()
    .matches(phoneRegExp, "invalid phone number")
    .required(),
  author_type: yup.string().required(),
  author_art_type: yup.string().required(),
  passport_id: yup
    .mixed()
    .test("fileSize", "The file is too large", (value) => {
      if (!value.length) return true; // attachment is optional
      return value.size <= 100000024;
    }),
});

export const updateAccountSchema = yup.object().shape({
  first_name: yup.string().required(),
  last_name: yup.string().required(),
  username: yup.string().required().trim(),
  email: yup.string().email().required(),
  bio: yup.string().nullable(),
  website_url: yup.string().url().nullable(),
  facebook_url: yup.string().url().nullable(),
  twitter_url: yup.string().url().nullable(),
  telegram_url: yup.string().url().nullable(),
  banner_photo: yup
    .mixed()
    .test("fileSize", "The file is too large", (value) => {
      if (!value?.length) return true; // attachment is optional
      return value.size <= 100000024;
    }),
  profile_photo: yup
    .mixed()
    .test("fileSize", "The file is too large", (value) => {
      if (!value?.length) return true; // attachment is optional
      return value.size <= 100000024;
    }),
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
