import * as Yup from "yup";

// REGULAR EXPRESSSIONS
const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const uppercaseRegExp = /(?=.*?[A-Z])/;
const lowercaseRegExp = /(?=.*?[a-z])/;
const digitsRegExp = /(?=.*?[0-9])/;
const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
const isValid =
  uppercaseRegExp && lowercaseRegExp && digitsRegExp && specialCharRegExp;
const whiteSpace =
  /^(?!\s+$).*/ ||
  /^(?!\s+$)/ ||
  /^\s*\S.*$/ ||
  /^\s*\S[^]*$/ ||
  /^\s*\S[\s\S]*$/;

//COMMON VALIDATIONS
const emailValidation = Yup.string()
  .required()
  .email()
  .matches(whiteSpace, "Cant'\t be white spaces only");
const phoneValidation = Yup.string()
  .required()
  .matches(phoneRegExp, "Phone number is not valid")
  .min(10, "Phone must have 10 digits")
  .max(10, "Phone must have 10 digits");
const createPassword = Yup.string()
  .required("No password provided.")
  .min(8, "password must contain at least 8 characters")
  .matches(
    isValid,
    "Contain at least one uppercase, lowercase, number and special character"
  )
  .matches(whiteSpace, "Cant'\t be white spaces only");

//PROFILE PAGE VALIDATION SCHEMA

//PROFILE PAGE USER SECURITY SCHEMA
export const securityProfileSchema = Yup.object().shape({
  currentPassword: Yup.string()
    .required("No password provided")
    .matches(whiteSpace, "Cant'\t be white spaces only"),
  newPassword: createPassword,
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .matches(whiteSpace, "Cant'\t be white spaces only"),
});

//PROFILE PAGE USER DETAIL SCHEMA
export const showProfileSchema = Yup.object().shape({
  fullName: Yup.string()
    .required()
    .matches(whiteSpace, "Cant'\t be white spaces only"),
  phoneNumber: phoneValidation,
  email: emailValidation,
  address: Yup.string()
    .required()
    .matches(whiteSpace, "Cant'\t be white spaces only"),
  pincode: Yup.string()
    .required()
    .matches(whiteSpace, "Cant'\t be white spaces only"),
  // state:Yup.string().required().matches(whiteSpace, "Cant'\t be white spaces only"),
  // country:Yup.string().required().matches(whiteSpace, "Cant'\t be white spaces only")
});

// LOGIN SCHEMA
export const loginSchema = Yup.object().shape({
  email: emailValidation,
  password: Yup.string()
    .required("No password provided")
    .matches(whiteSpace, "Cant'\t be white spaces only"),
});

// SIGN UP SCHEMA
export const signUpSchema = Yup.object().shape({
  fullName: Yup.string()
    .required()
    .matches(whiteSpace, "Cant'\t be white spaces only")
    .matches(whiteSpace, "Cant'\t be white spaces only"),
  email: emailValidation,
  password: createPassword,
  phone: phoneValidation,
});

//  ADMIN SCHEMA

const textVal = (min, max, name) =>
  Yup.string()
    .required(`${name} is Required Field`)
    .min(min, `${name} at least ${min} letter long`)
    .max(max, `${name} at most ${max} letter long`)
    .matches(whiteSpace, "Cant'\t be white spaces only");

const macId = Yup.string()
  .required()
  .min(8, "MAC ID must be 8 letter long")
  .max(8, "MAC ID must be 8 letter long")
  .matches(whiteSpace, "Cant'\t be white spaces only");

export const addUserByAdmin = Yup.object().shape({
  name: textVal(3, 30),
  email: emailValidation,
  phone: phoneValidation,
  password: createPassword,
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});

export const editUserByAdmin = Yup.object().shape({
  name: textVal(3, 30),
  email: emailValidation,
  phone: phoneValidation,
});

export const addGateway = Yup.object().shape({
  uid: textVal(3, 50, "UID"),
  name: textVal(3, 30, "NAME"),
  macId: macId,
});

export const addBranchManager = Yup.object().shape({
  uid: textVal(3, 50, "UID"),
  name: textVal(3, 30, "NAME"),
  macId: macId,
});

export const editDevice = Yup.object().shape({
  uid: textVal(3, 50, "UID"),
  name: textVal(3, 30, "Name"),
});

// ADD SITE
export const addSiteDetailsSchema = Yup.object().shape({
  uid: textVal(3, 50, "UID"),
  name: textVal(3, 30, "Name"),
  address: textVal(3, 500, "Address"),
  pinCode: textVal(6, 6, "Pin code"),
});
