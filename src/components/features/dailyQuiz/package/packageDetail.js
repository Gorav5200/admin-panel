import React from 'react'
import PackageDetailCommon from '../../commonFeatures/packageDetailCommon';
import { dailyQuiz, practiceQaApi } from '../../../../services/Constant';
import { useSelector } from 'react-redux';
import { dailyQuizHeader } from '../../../../services/constHeaders';


function PackageDetail() {
  const { dailyQuizList } = useSelector((state) => state.dailyQuiz);

  return (
    <div>
    <PackageDetailCommon headCells={dailyQuizHeader}   tableData={dailyQuizList || []} apiUrl={`${dailyQuiz.endPoint}/package`}/>
    </div>
  )
}

export default PackageDetail;