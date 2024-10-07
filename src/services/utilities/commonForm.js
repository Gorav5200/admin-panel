// validationUtils.js
import{validateName,validateMobile,validateSelectArray,validateSelectValue,validateEmail} from "../common"


export const validationSchema = {
  name: {
    validator: validateName,
    message: 'Name is required and should not be empty.',
  },
  email: {
    validator: validateEmail,
    message: 'Please enter a valid email address.',
  },
  mobile: {
    validator: validateMobile,
    message: 'Mobile number must be 10 digits and numeric.',
  },
  dob: {
    validator: validateSelectValue,
    message: 'Enter Date of Birth',
  },
  age: {
    validator: validateSelectValue,
    message: 'Please select the Age.',
  },
  gender: {
    validator: validateSelectValue,
    message:'Please select the Gender.',
  },
  language: {
    validator: validateSelectValue,
    message: 'Please select the language.',
  },
  designation: {
    validator: validateSelectValue,
    message: 'Please select the Designation.',
  },
  exams: {
    validator: validateSelectArray,
    message: 'Select atleast one exam or more '
  },


};


export default validationSchema;



