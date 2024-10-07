import {
  FormErrors,
  validateEntity,
  validateName,
  validateRewardGrantChart,
  validateSelectArray,
  validateSelectTopic,
  validateSelectValue,
  validateSingleEntityType,
  validateSubject,
  validateTitle,
  validateTopperRewards,
  
} from "./formHandling";

export const packageSchema = (values,title) => {
  const newErrors = {};

  const nameResult = validateName(values.title);
  if (nameResult !== true) {
    newErrors.title = nameResult;
  }


  if (!validateSelectArray(values.list)) {
    newErrors.subject = FormErrors.SELECT_SUBJECT;
  }

  return newErrors;
};

export const practiceQaSchema = (values) => {
  const newErrors = {};

  const titleResult = validateTitle(values.title);
  if (titleResult !== true) {
    newErrors.title = titleResult;
  }

  const selectTopic = validateSelectTopic(values.subject);
  if (selectTopic !== true) {
    newErrors.topic = selectTopic;
  }

   if (values.subject !== undefined) {
    const subject = validateSubject(values.subject);
    if (subject !== true) {
      newErrors.subject = subject;
    }
   } else {
     newErrors.subject = "Subject is required";
   }


  if (values.entity !== undefined) {
    const entity = validateEntity(values.entity);
    if (entity !== true) {
      newErrors.entity = entity;
    }
  } else {
    newErrors.entity = "Entity is required";
  }

  if (values.entityType !== undefined) {
    const entityType = validateSingleEntityType(values.entityType);
    if (entityType !== true) {
      newErrors.entityType = values.entity
        ? entityType
        : "Please Select Entity First";
    }
  } else {
    newErrors.entityType = "Entity Type is required";
  }

  if (values.paid?.status) {
    if (values.paid.charge === "") {
      newErrors.paid = "Enter the Paid Value";
    }
  }

   
if (values.difficultyLevel === "") {
  newErrors.difficultyLevel = "Please Add the Difficulty Level";
}


  if (values.coinCheck || values.pointCheck) {
    if (values.coinCheck && values.coin === "") {
      newErrors.coin = "Please Enter the Coins";
    }
    if (values.pointCheck && values.points === "") {
      newErrors.points = "Please Enter the Point";
    }
  }

  const rewardGrantChart = validateRewardGrantChart(values.rewardGrantChart);
  if (rewardGrantChart !== true) {
    newErrors.rewardGrantChart = rewardGrantChart;
  }

  if (values.rewardCheck) {
    const toppersReward = validateTopperRewards(values.toppersReward);
    if (toppersReward !== true) {
      newErrors.toppersReward = toppersReward;
    }
  }

  if (values.isCommonTimer) {
    if (values.commonTimer === null) {
      newErrors.isCommonTimer = "Please Enter the Common Timer Value";
    }
  } else {
    if (values.timePerQuestion === null) {
      newErrors.timePerQuestion = "Please Enter the Time Per Question";
    }
  }

  


  return newErrors;
};


export const AssignmentSchema = (values) => {
  const newErrors = {};

  const titleResult = validateTitle(values.title);
  if (titleResult !== true) {
    newErrors.title = titleResult;
  }

  const selectTopic = validateSelectTopic(values.subject);
  if (selectTopic !== true) {
    newErrors.topic = selectTopic;
  }

  if (values.subject !== undefined) {
    const subject = validateSubject(values.subject);
    if (subject !== true) {
      newErrors.subject = subject;
    }
  } else {
    newErrors.subject = "Subject is required";
  }

  if (values.entity !== undefined) {
    const entity = validateEntity(values.entity);
    if (entity !== true) {
      newErrors.entity = entity;
    }
  } else {
    newErrors.entity = "Entity is required";
  }

  if (values.entityType !== undefined) {
    const entityType = validateSingleEntityType(values.entityType);
    if (entityType !== true) {
      newErrors.entityType = values.entity
        ? entityType
        : "Please Select Entity First";
    }
  } else {
    newErrors.entityType = "Entity Type is required";
  }

  if (values.paid.status && values.paid.charge === "") {
  
      newErrors.paid = "Enter the Paid Value";
    
  }

  if (values.submissionDeadline === "" || values.submissionDeadline === ""){
    newErrors.submissionDeadline="Choose the Submission Deadline"
  }
    if (values.difficultyLevel === "") {
      newErrors.difficultyLevel = "Please Add the Difficulty Level";
    }

  if (values.coinCheck || values.pointCheck) {
    if (values.coinCheck && values.coin === "") {
      newErrors.coin = "Please Enter the Coins";
    }
    if (values.pointCheck && values.points === "") {
      newErrors.points = "Please Enter the Point";
    }
  }

  const rewardGrantChart = validateRewardGrantChart(values.rewardGrantChart);
  if (rewardGrantChart !== true) {
    newErrors.rewardGrantChart = rewardGrantChart;
  }

  if (values.rewardCheck) {
    const toppersReward = validateTopperRewards(values.toppersReward);
    if (toppersReward !== true) {
      newErrors.toppersReward = toppersReward;
    }
  }

  if (values.isCommonTimer) {
    if (values.commonTimer === null) {
      newErrors.isCommonTimer = "Please Enter the Common Timer Value";
    }
  } else {
    if (values.timePerQuestion === null) {
      newErrors.timePerQuestion = "Please Enter the Time Per Question";
    }
  }

  return newErrors;
};
