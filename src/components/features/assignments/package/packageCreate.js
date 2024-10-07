import React, { useState } from "react";
import PackageForm from "../../commonFeatures/packageForm";
import { useSelector } from "react-redux";

import { assignmentApi } from "../../../../services/Constant";

import { assignmentHeader } from "../../../../services/constHeaders";

function PackageCreate() {
  const { assignmentList } = useSelector((state) => state.assignment);

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
        tableData={assignmentList || []}
        headCells={assignmentHeader}
        apiUrl={`${assignmentApi.endPoint}/package`}
        redirectUrl={`/main/exam/assignment`}
        title="Package"
      />
    </>
  );
}

export default PackageCreate;
