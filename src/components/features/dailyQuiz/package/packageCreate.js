import React, { useState } from "react";
import PackageForm from "../../commonFeatures/packageForm";
import { useSelector } from "react-redux";
import {  dailyQuizHeader, practiceQaHeader } from "../../../../services/constHeaders";
import { dailyQuizApi } from "../../../../services/apis/dailyQuizApi";
import { dailyQuiz } from "../../../../services/Constant";

function PackageCreate() {
const { dailyQuizList } = useSelector((state) => state.dailyQuiz);
  const [values, setValues] = useState({
    title: "",
    description: "",
    list: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  

  return (
    <>
      <PackageForm
        handleChange={handleChange}
        values={values}
        tableData={dailyQuizList}
        headCells={dailyQuizHeader}
        apiUrl={`${dailyQuiz.endPoint}/package`}
        redirectUrl={`/main/exam/dailyQuiz`}
        title="Package"
      />
    </>
  );
}

export default PackageCreate;
