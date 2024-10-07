import React from 'react'
import PackageDetailCommon from '../../commonFeatures/packageDetailCommon';
import { assignmentApi, learnApi } from '../../../../services/Constant';
import { useSelector } from 'react-redux';
import { Avatar } from 'antd';


function PackageDetail() {
  const { assignmentList } = useSelector((state) => state.assignment);
   console.log("🚀 ~ PackageDetail ~ assigmentList:", assignmentList)

 
  const assignmentDataKeys = [
    { dataKey: "coin", label: "Assignment Name", minWidth: 170 },
    {
      dataKey: "isPublished",
      label: "Publishing Status",
      align: "left",
      showValue: {
        yes: (
          <Avatar
            sx={{
              backgroundColor: "green",
              width: 15,
              height: 15,
              color: "green",
            }}
          ></Avatar>
        ),
        no: (
          <Avatar
            sx={{ backgroundColor: "red", width: 15, height: 15, color: "red" }}
          ></Avatar>
        ),
      },
    },
    {
      dataKey: "question_type",
      label: "Subject Name",
      align: "left",
    },
    {
      dataKey: "totalQuestions",
      label: "No. of Questions",
      align: "left",
      showValue: { yes: "Publish", no: "Unpublish" },
    },
    {
      dataKey: "price",
      label: "Price",
      align: "left",
    },

    { dataKey: "reported", label: "Reported Questions", align: "left"},
  ];
  return (
    <div>
    <PackageDetailCommon headCells={assignmentDataKeys}   tableData={assignmentList || []} apiUrl={`${assignmentApi.endPoint}/package`}/>
    </div>
  )
}

export default PackageDetail;