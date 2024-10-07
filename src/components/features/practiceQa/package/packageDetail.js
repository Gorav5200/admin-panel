import React from 'react'
import PackageDetailCommon from '../../commonFeatures/packageDetailCommon';
import { practiceQaApi } from '../../../../services/Constant';
import { useSelector } from 'react-redux';
import { practiceQaHeader } from '../../../../services/constHeaders';


function PackageDetail() {
  const { practiceQaList } = useSelector((state) => state.practiceQa);
   console.log("🚀 ~ PackageDetail ~ practiceQaList:", practiceQaList)



  return (
    <div>
    <PackageDetailCommon headCells={practiceQaHeader}   tableData={practiceQaList || []} apiUrl={`${practiceQaApi.endPoint}/package`}/>
    </div>
  )
}

export default PackageDetail;