import React, { useState } from "react";
import PackageForm from "../../commonFeatures/packageForm";
import { useSelector } from "react-redux";
import { practiceQaApi } from "../../../../services/Constant";
import {  practiceQaHeader } from "../../../../services/constHeaders";

function PackageCreate() {
const { practiceQaList } = useSelector((state) => state.practiceQa);
  const [values, setValues] = useState({
    title: "",
    description: "",
    list: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  console.log("🚀 ~ PackageCreate ~ values:", values);

  return (
    <>
      <PackageForm
        handleChange={handleChange}
        values={values}
        tableData={practiceQaList}
        headCells={practiceQaHeader}
        apiUrl={`${practiceQaApi.endPoint}/package`}
        redirectUrl={`/main/exam/practiceQa`}
        title="Package"
      />
    </>
  );
}

export default PackageCreate;
