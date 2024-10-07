import React from 'react'
import PackageDetailCommon from '../../commonFeatures/packageDetailCommon';
import { learnApi } from '../../../../services/Constant';
import { useSelector } from 'react-redux';


function PackageDetail() {
  const { learnList } = useSelector((state) => state.learn);

 
  
    const learnDataKeys = [
        { dataKey: "topic", label: "Topic Name", minWidth: 170 ,type: "object",innerKey:"title"},
    //    { dataKey: "subTopic", label: "Sub-Topics", minWidth: 170 ,type: "object",innerKey:"title"},
        {
          dataKey: "status",
          label: "Publishing Status",
          align: "left",
        },
        { dataKey: "reported", label: "Class Time", align: "left", type: "date" },
        { dataKey: "createdAt", label: "Created At", align: "left", type: "date" },
    ];
  return (
    <div>
    <PackageDetailCommon headCells={learnDataKeys}   tableData={learnList || []} apiUrl={`${learnApi.endPoint}/package`}/>
    </div>
  )
}

export default PackageDetail;