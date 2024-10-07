export const FormErrors = {
  INVALID_NAME: "Please Enter Correct Name",
  INVALID_TITLE: "Please Enter Correct Title",
  INVALID_EMAIL: "Please Enter Correct Email",
  INVALID_PHONE_NO: "Please Enter Correct Phone Number",
  INVALID_PASSWORD: "Please Enter Correct Password",
  INVALID_DESCRIPTION: "Please Enter Correct Description",
  EMPTY_DESCRIPTION: "Please Enter  Description",
  SHORT_DESCRIPTION: "Description should be more than 10 words",
  SELECT_TOPIC: "Please Select Topic",
  SELECT_SUBTOPIC: "Please Select Subtopic",
  SELECT_ENTITY: "Please Select Entity",
  SELECT_SUBJECT: "Please Select Subject",
  SELECT_ENTITYTYPE: "Please Select Entity Type",
  SELECT_PROFILE_IMAGE: "Please Select Profile Image",
  SELECT_COVER_IMAGE: "Please Select Cover Image",
  INVALID_REWARD_CHART: "Please Add Values in reward Grant Chart",
  INVALID_REWARD_OBJECT: "Please Add Correct Values in reward Grant Chart",
  INVALID_TOPPER_REWARDS: "Please Add Correct Values in Topper Rewards",
};

export const validateName = (value) => {
  const trimmedValue = String(value).trim(); 
  return trimmedValue.length > 0 ? true : FormErrors.INVALID_NAME;
};

export const validateTitle = (value) => {
  const trimmedValue = String(value).trim();
  return trimmedValue.length > 0 ? true : FormErrors.INVALID_TITLE;
};



export const validateDescription = (value) => {
  const trimmedValue = String(value).trim(); 
  if (trimmedValue.length === 0) {
    return FormErrors.EMPTY_DESCRIPTION; 
  } else if (trimmedValue.split(/\s+/).length <= 10) {
    return FormErrors.SHORT_DESCRIPTION; 
  }
  return true; 
};


export const validateEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 return emailRegex.test(value) ? true : FormErrors.INVALID_EMAIL;
};

export const validateMobile = (value) => {
  return value.length === 10 && !isNaN(value) ? true : FormErrors.INVALID_PHONE_NO;
};


export const validateSelectArray = (value) => {
  return value.length > 0;
};

export const validateSelectValue = (value) => {
  return value !== undefined && value === ""&& value !== null;
};

export const validateSelectTopic = (value) => {
  const trimmedValue = String(value).trim();
  return trimmedValue.length > 0 ? true : FormErrors.SELECT_TOPIC
};

export const validateSubject = (value) => {
  const trimmedValue = String(value).trim();
  return trimmedValue.length > 0 ? true : FormErrors.SELECT_SUBJECT;
};

export const validateEntity = (value) => {
  const trimmedValue = String(value).trim();
  return trimmedValue.length > 0 ? true : FormErrors.SELECT_SUBJECT;
};
export const validateSingleEntityType = (value) => {
  const trimmedValue = String(value).trim();
  return trimmedValue.length > 0 ? true : FormErrors.SELECT_ENTITY;
};

export const validateMultiSelectEntityType = (value) => {
  return Array.isArray(value) && value.length > 0
    ? true
    : FormErrors.SELECT_ENTITYTYPE;
};


export const validateRewardGrantChart = (value) => {
  if (!Array.isArray(value) || value.length === 0) {
    return FormErrors.INVALID_REWARD_CHART;
  }

  for (const obj of value) {
    if (typeof obj !== "object" || obj === null) {
      return FormErrors.INVALID_REWARD_CHART;
    }

    if (
      obj.floorValue === null ||
      obj.floorValue === undefined ||
      obj.floorValue === "" ||
      obj.multiplier === null ||
      obj.multiplier === undefined ||
      obj.multiplier === ""
    ) {
      return FormErrors.INVALID_REWARD_OBJECT
  }

  return true;
}}

export const validateTopperRewards = (value) => {

  if (typeof value !== "object" || value === null) {
    return FormErrors.INVALID_TOPPER_REWARDS;
  }

  const requiredKeys = ["first", "second", "third"];
  for (const key of requiredKeys) {
    if (
      !value.hasOwnProperty(key) ||
      value[key] === null ||
      value[key] === undefined ||
      value[key] === ""
    ) {
      return FormErrors.INVALID_TOPPER_REWARDS;
    }
  }

  return true;
};
