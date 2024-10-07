import React, { useState } from "react";
import PackageForm from "../../commonFeatures/packageForm";
import { useSelector } from "react-redux";
import { learnApi } from "../../../../services/Constant";

function PackageCreate() {
    const learnDataKeys = [
        { dataKey: "topic", label: "Topic Name", minWidth: 170 ,type: "object",innerKey:"title"},
        {
          dataKey: "status",
          label: "Publishing Status",
          align: "left",
        },
        { dataKey: "reported", label: "Class Time", align: "left", type: "date" },
        { dataKey: "createdAt", label: "Created At", align: "left", type: "date" },
    ];
    
  const { learnList } = useSelector((state) => state.learn);
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
    <PackageForm
      handleChange={handleChange}
      values={values}
      tableData={learnList || []}
      headCells={learnDataKeys}
      apiUrl={`${learnApi.endPoint}/package`}
      redirectUrl={`/main/exam/learn`}
      title="Learn Package"
    />
  );
}

export default PackageCreate;
