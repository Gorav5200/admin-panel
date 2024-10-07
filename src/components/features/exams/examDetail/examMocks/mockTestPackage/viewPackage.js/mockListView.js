import React, { useEffect } from "react";
import PaginationTable from "../../../../../../common/PaginationTable";
import { Avatar } from "@mui/material";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useGetMockPackagesQuery } from "../../../../../../../services/apis/exam/mock";
import { viewMockPackage } from "../../../../../../../ducks/mockPackageSlice";
import { useDispatch } from "react-redux";

function MockListView({comp}) {
  const params = useParams();
  const dispatch = useDispatch()
  const{data:listData,isLoading,isError}=useGetMockPackagesQuery(`/exams/v1/mockPackage/${params.packageId}`,{
    refetchOnMountOrArgChange:true
  })
  const {viewMockDetails}=useSelector((state)=>state.mockPackage)

 console.log("mock list  view data",listData)
  useEffect(()=>{
    dispatch(viewMockPackage(listData?.data)) 
  },[listData])

  
  const DataKeys = [
    { dataKey: "title", label: "Mocktest Name", minWidth: 170 },

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
      dataKey:"questionNo",
      label: "No. of Questions",
      align: "left",
      showValue: { yes: "Publish", no: "Unpublish" },
    },
    {
      dataKey: "price",
      label: "Price",
      align: "left",
    },

    { dataKey: "createdAt", label:"Test Date", align: "left",type:"date" },
    { dataKey: "reported", label: "Reported Questions", align: "left" },
  ];

  return (
    <>
      <PaginationTable
        data={viewMockDetails?.mocklist || []}
        placeholder="Search by topics, subjects"
        comp={comp}
        columns={DataKeys}
        path={`/main/exam/${params.examId}/mocks`}
        loading={isLoading}
      
      />
    </>
  );
}

export default MockListView;
