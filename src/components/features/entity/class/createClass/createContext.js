import React, { useCallback, useEffect, useRef, useState } from "react";
import { Stack } from "@mui/material";
import { Divider, Empty, Popconfirm, message } from "antd";
import {
  CustomButton,
  ButtonStyle,
  CustomButtonStyle,
} from "../../../../../styles/muiRoot";
import { Edit, PackageX, PlusCircle } from "lucide-react";
import { dateFormatting } from "../../../../../services/common";
import CreatePractice from "./practice";
import uuid from "react-uuid";
import {
  createConcept,
  createPractice,
} from "../../../../../ducks/exams/classSlice";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
import { ConceptCard, PracticeCard } from "./commonCards";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteContextMutation,
  useLazyGetClassDetailQuery,
} from "../../../../../services/apis/exam/class";
import { classApi } from "../../../../../services/Constant";
import CreateConceptModal from "./concept";
import { BackdropLoader } from "../../../../common/lineLoader";
import { QuestionCircleOutlined } from "@ant-design/icons";
import PracticeUpdate from "./pacticeUpdateModal";
import dayjs from "dayjs";

const ClassContext = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const containerRef = useRef();
  const [values, setValues] = useState([]);
  const [duration, setDuration] = useState();
  const [selectedDuration, setSelectedDuration] = useState();
  const [validation, setValidation] = useState({});
  const [createConceptModal, setCreateConceptModal] = React.useState({
    data: {},
    status: false,
    action: null,
  });
  const [editPracticeModal, setEditPracticeModal] = React.useState({
    data: {},
    status: false,
  });
  const {
    _id,
    practice,
    concepts,
    startTime: formStartTime,
    endTime: formEndTime,
  } = useSelector((state) => state.class.newClass);

  const [trigger, { isLoading }] = useLazyGetClassDetailQuery(); // api for create concept or practice --f
  const [deleteContext, { isLoading: delLoad, isError: delError }] =
    useDeleteContextMutation();

  const fetchUpdatedData = async () => {
    try {
      const { data, isError } = await trigger(
        `${classApi.endPoint}/details/${_id}`
      );
      // Check if the response contains the updated data
      if (data.success && data.data && data.data.classDetails) {
        const { concepts, practice } = await data.data.classDetails;
        dispatch(createConcept(concepts));
        dispatch(createPractice(practice));
        if (createConceptModal) {
          setCreateConceptModal((prev) => ({ ...prev, status: false }));
        }
        if (editPracticeModal) {
          setEditPracticeModal((prev) => ({ ...prev, status: false }));
        } else message.error("Some error Occured");
        return { success: true, data: data.data.classDetails };
      } else {
        // Handle unexpected response format
        console.error("Unexpected response format:", data);
        return { success: false };
      }
    } catch (error) {
      // Handle fetch error
      console.error("Error fetching data:", error);
      return { success: false };
    }
  };
  //for del the concept or practice
  const handleDelete = async (id, type) => {
    try {
      // Call the addMockPackage mutation
      const response = await deleteContext({
        endpoint: `${classApi.endPoint}/${type}/${id}`,
      });

      if (response && response?.data?.success) {
        message.success(` ${type} Deleted `);
        fetchUpdatedData();
      } else {
        message.error("Some error occured to delete");
      }
    } catch (error) {
      console.error("Error Delete ${type}", error);
    }
  };
  //for duration calculation
  const calculateDuration = useCallback(() => {
    // This function is for calculating the time duration: how much time we have and how much we consumed
    const classStart = moment.utc(formStartTime);
    const classEnd = moment.utc(formEndTime);
    const classDuration = moment.duration(classEnd.diff(classStart));
    setDuration(
      `${classDuration.hours()} hours ${classDuration.minutes()} minutes`
    );

    const duration = values.reduce((total, item) => {
      const startTime = moment.utc(item.startTime);
      const endTime = moment.utc(item.endTime);
      const duration = moment.duration(endTime.diff(startTime));
      // Add the current duration to the total
      return moment.duration(
        total.asMilliseconds() + duration.asMilliseconds()
      );
    }, moment.duration(0)); // Initial total is 0

    setSelectedDuration(
      `${duration.hours()} hours ${duration.minutes()} minutes`
    );

    setValidation({ duration, classDuration });
    if (values.length > 0) {
      checkTimeValidation();
    }
  }, [values, formStartTime, formEndTime]);

  const checkTimeValidation = () => {
    let isValid = true;
    const totalMilliseconds = validation.duration.asMilliseconds();
    const classMilliseconds = validation.classDuration.asMilliseconds();

    if (totalMilliseconds <= classMilliseconds) {
      console.log("Total duration is valid.");
    } else {
      isValid = false;
      toast.error(
        "Total duration exceeds class duration. Please adjust the schedule."
      );
      // Handle the case where the total duration exceeds the class duration
    }
    return isValid;
  };

  useEffect(() => {
    calculateDuration();
  }, [values]); //for on mount check the time duration

  useEffect(() => {
    setValues([...concepts, ...practice]);
    containerRef.current.scrollTop = 0;
  }, [practice, concepts]); //For merge the concept and pracice from redux state (new class in class)

  console.log("🚀 ~ ClassContext ~ values:", values);

  return (
    <>
      <BackdropLoader isOpen={isLoading} />
      <div className="flex-wrap sm:flex-nowrap p-2 w-[100%]  flex justify-between gap-2 h-[79vh] overflow-scroll">
        {/* left div */}
        <div className=" p-1 basis-[25%]  relative object-contain">
          <h5 className="text-base font-bold p-2 ">Class concepts</h5>
          <section className="timing-details">
            <div className="font-bold p-3 mb-1 bg-white   text-sm  my-2 flex justify-between items-start gap-2 rounded-md">
              <div>
                <h5 className="text-sm font-normal ">Start Time</h5>
                <span className="font-bold text-sm no-underline">
                  {dayjs.utc(formStartTime).format("LT")}
                </span>
              </div>

              <div>
                <h5 className="text-sm font-normal ">End Time</h5>
                <p className="font-bold text-sm no-underline ">
                  {dayjs.utc(formEndTime).format("LT")}
                </p>
              </div>

              <div>
                <h5 className="text-sm font-normal ">Total Duration</h5>
                <p className="text-sm no-underline font-bold ">{duration}</p>
              </div>
            </div>

            <h5 className="font-bold p-2 mb-1 bg-white  rounded-md  text-sm  my-2">
              Selected Time :{" "}
              <span className="font-light text-sm no-underline">
                {selectedDuration}
              </span>
            </h5>
          </section>

          <Stack spacing={2} direction={"row"} my={2}>
            <div className="create-concept">
              <CustomButton
                startIcon={<PlusCircle />}
                onClick={() =>
                  setCreateConceptModal({
                    status: true,
                    action: "new",
                    data: {},
                  })
                }
                style={{
                  ...ButtonStyle,
                  height: 35,
                  width: 150,
                  borderRadius: 1,
                }}
              >
                Create Concept
              </CustomButton>
            </div>
            <CreatePractice data={values} updateData={fetchUpdatedData} />
          </Stack>

          <div className="absolute bottom-0 flex justify-between items-center w-full">
            <CustomButton
              size="small"
              onClick={() => navigate(`/main/entity/${params.entityId}/class`)}
              sx={{
                ...ButtonStyle,
                width: "150px",
                height: "40px",
                borderRadius: 2,
              }}
            >
              Go Home
            </CustomButton>

            <CustomButton
              size="small"
              onClick={() => {
                const res = checkTimeValidation();
                console.log("res", res);
                if (res === true) {
                  navigate(
                    `/main/entity/${params.entityId}/class/${
                      params.classId || _id
                    }/detail`
                  );
                } else {
                  message.error("Some Error Occured");
                }
              }}
              sx={{
                ...CustomButtonStyle,
                width: "150px",
                height: "40px",
                borderRadius: 2,

                position: "absolute",
                bottom: 0,

                right: 2,
                "&:hover": {
                  backgroundColor: "black",
                },
              }}
            >
              Check Overview
            </CustomButton>
          </div>
        </div>
        {/* center div start */}
        <div className="basis-[75%] p-2">
          <h5 className="text-base font-bold p-2 mb-1.5">
            Class Concepts & Practices
          </h5>

          <div
            className="h-[calc(100%-2rem)] overflow-scroll flex flex-col overflow-x-hidden pr-3"
            ref={containerRef}
          >
            {values.length === 0 ? (
              <div className="m-auto">
                <Empty description="Need to create a concept or practice" />
              </div>
            ) : (
              values
                ?.sort((a, b) => b.sequence - a.sequence)
                .map((card, index) => (
                  <>
                    {card.hasOwnProperty("cardType") &&
                    card?.cardType === "concept" ? (
                      <ConceptCard key={index} data={card} ind={index + 1} />
                    ) : (
                      <PracticeCard key={index} data={card} ind={index + 1} />
                    )}

                    <div className="flex justify-between place-items-end  bg-white rounded-b-md p-3 mt-[-4px] border">
                      <div>
                        <button
                          className="text-[#336792] text-sm font-inter font-[600] underline underline-offset-4 flex gap-1 items-center ml-auto"
                          onClick={() => {
                            if (card.cardType.toLowerCase() === "concept") {
                              setCreateConceptModal({
                                data: card,
                                status: true,
                                action: "edit",
                              });
                            } else if (
                              card.cardType.toLowerCase() === "practice"
                            ) {
                              setEditPracticeModal({
                                status: true,
                                data: card,
                              });
                            } else {
                              return null;
                            }
                          }}
                        >
                          <Edit size={15} />
                          Edit
                        </button>
                      </div>
                      <div>
                        <Popconfirm
                          onConfirm={() =>
                            handleDelete(card._id, card.cardType)
                          }
                          onCancel={() => null}
                          placement="topRight"
                          title={`Are you sure to delete this ${card.cardType} ?`}
                          icon={
                            <QuestionCircleOutlined style={{ color: "red" }} />
                          }
                          okText="Yes"
                          cancelText="No"
                        >
                          <button className="text-[#336792] text-sm font-inter font-[600] underline underline-offset-4 flex gap-1 items-center ml-auto">
                            <PackageX size={15} />
                            Remove Card
                          </button>
                        </Popconfirm>
                      </div>
                    </div>
                    <Divider />
                    {/* option for remove or edit end */}
                  </>
                ))
            )}
          </div>
        </div>
        {/* center div end */}
      </div>
      {/* Modals for  update */}
      <PracticeUpdate
        updateData={fetchUpdatedData}
        open={editPracticeModal.status}
        handleClose={() =>
          setEditPracticeModal((prev) => ({ ...prev, status: false }))
        }
        data={editPracticeModal.data}
      />
      <CreateConceptModal
        data={createConceptModal}
        updateData={fetchUpdatedData}
        // updateRes={updateRes}
        handleClose={() =>
          setCreateConceptModal((prev) => ({ ...prev, status: false }))
        }
        handleOpen={() =>
          setCreateConceptModal((prev) => ({ ...prev, status: true }))
        }
        open={createConceptModal.status}
      />
      {/* Modal for practice end */}
    </>
  );
};

export default ClassContext;
