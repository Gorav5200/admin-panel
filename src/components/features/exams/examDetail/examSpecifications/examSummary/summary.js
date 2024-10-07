import React from 'react'
import TreeGraph from '../../../../../common/FunctionComponents/treeGraph';
import Header from '../../../../../common/header';
import { useGetDataQuery as useGetSummaryDetailMutation} from '../../../../../../services/apis/commonApi';
import { entityApi } from '../../../../../../services/Constant';
import { useParams } from 'react-router-dom';
import { Backdrop, LinearProgress } from '@mui/material';

function  HerarchyGraph() {
 const params= useParams();
const { data, isFetching, isLoading } = useGetSummaryDetailMutation(
  `exams/v1/hierarchy/list/${params.examId}`,{
    refetchOnMountOrArgChange:true
  }
);
  console.log("🚀 ~ HerarchyGraph ~ data:", data);
  return (
    <>
      <LinearProgress
        color="inherit"
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.drawer + 2,
          position: "fixed",
          top: 0,
           opacity: isLoading || isFetching? 1 : 0,
        }}
      />

      <Header content={"Summary"} />
      <div className="h-[85vh] p-3   flex flex-col justify-start bg-white items-center gap-3 m-2 rounded-md">
        <section>
          <h4 className="text-base font-semibold font-inter">FLOW CHART</h4>
          <p className="text-sm text-gray-400 text-left ">
            Syncfusion Team is World Class! - We discovered a problem
            implementing the Syncfusion Charts, Submitted a support ticket -
            immediate response & help. The Engineers confirmed the problem - and
            immediately started creating a new version that fixed the problem,
            they kept in contact with me - in a few days, the new version was
            ready and it works flawlessly. If you are looking for a team that
            will support you and work with your DEV team rapidly and
            responsively - then Syncfusion is for you. Best charting solution
            for mobile (we are using the Flutter plug-ins) - works great on the
            latest IOS & Android Builds - very customizable - great training and
            support - We highly recommend Syncfusion for the products & equally
            the customer & dev support. Very pleasant to work with as well
          </p>
        </section>
        <div className=" object-cover  text-center overflow-scroll bg-medGrey p-2 border w-[60vw]  rounded-md">
          <TreeGraph data={" "} />
        </div>
      </div>
    </>
  );
}

export default HerarchyGraph;