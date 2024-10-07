import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../../common/header";
import Button from "@mui/material/Button";
import { PlusCircle } from "lucide-react";
import { useParams } from "react-router-dom";
import FullWidthTabs from "../../../common/tabChanger";
import ClassList from "./classList";
import { useSelector } from "react-redux";
import { useUpdateClassMutation } from "../../../../services/apis/exam/class";
import { toast } from "react-toastify";
import { setClassDetails } from "../../../../ducks/exams/classSlice";
import { useDispatch } from "react-redux";
import ClassDoubts from "./doubts/classDoubts";
import ClassAnalytics from "./analytics/classAnalytics";

import ClassCalendar from "./classCalendar/classCalendar";

export default function ClassHome() {
  const dispatch = useDispatch();
  const [updateClass, { isLoading: updateLoading, isError: updateError }] =
    useUpdateClassMutation();
  const { entity } = useSelector((state) => state.entity);
  const handleUpdate = async (field, updatedData) => {
    try {
      const response = await updateClass({
        endpoint: `/exams/v1/class/field/${params.classId}`,
        updatedData: {
          fieldName: field,
          updatedData: updatedData,
        },
      });

      if (response && response?.data?.success) {
        // console.log("response about", response);
        toast.info("Class Updated", {
          autoClose: 2000,
          onOpen: () => dispatch(setClassDetails(response.data.data)),
        });
      } else {
        toast.error(`Some error occurred while updating ${field}`, {
          autoClose: 2000,
        });
        console.error("Error updating field. Response:", response);
      }
      return response.data;
    } catch (error) {
      console.error("Error updating field:", error);
      throw error; // Rethrow the error so that the calling code can handle it if needed
    }
  };

  const params = useParams();
  const examId = params.entityId;


  return (
    <div className="h-screen">
      <Header
        content={`${
          entity?.find((item) => item._id === examId)?.title
        } Classes`}
      />
      <div className="bg-white  rounded-md ">
        <FullWidthTabs
          data={[
            {
              item: 1,
              label: "Class Analytics",
              content: <ClassAnalytics />,
              // path:`/main/exam/${examId}/class/analytics`
            },
            {
              item: 2,
              label: "Class",
              content: <ClassList handleUpdate={handleUpdate} />,
              // path:`/main/exam/${examId}/class`
            },
            {
              item: 3,
              label: (
                <p>
                  Doubts <sapn className="text-orange-500"> (08) </sapn>
                </p>
              ),
              content: <ClassDoubts />,
              // path:`/main/exam/${examId}/class/doubt`
            },
            {
              item: 4,
              label: <p>Class Calendar</p>,
              content: <ClassCalendar />,
              // path:`/main/exam/${examId}/class/calender`
            },
          ]}
        />
      </div>
    </div>
  );
}
