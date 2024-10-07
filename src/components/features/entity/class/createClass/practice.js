import React, { useEffect, useState, useDeferredValue, useMemo } from "react";
import {
  CustomButton,
  ButtonStyle,
  CustomButtonStyle,
} from "../../../../../styles/muiRoot";
import { PlusCircle, X } from "lucide-react";
import {
  Card,
  CardContent,
  CircularProgress,
  Divider,
  IconButton,
  Modal,
  StepContent,
  TextField,
} from "@mui/material";
import InputWithIcon from "../../../../common/searchBox";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Descriptions, Empty, message } from "antd";
import { useGetQuestionListQuery } from "../../../../../services/apis/exam/questionBank";
import { classApi, questionApi } from "../../../../../services/Constant";
import { useCreatePracticeMutation } from "../../../../../services/apis/exam/class";
import FullFeaturedCrudGrid from "./tableGrid";
import MultipleSelectTable from "../../../../common/tableMultipleSelect";
import { questionBankHeader } from "../../../../../services/constHeaders";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { HTMLConverter } from "../../../../../services/common";
import TimePickerComp from "../../../../common/timePicker";
import dayjs from "dayjs";

const CreatePractice = React.memo(({ data: getSeq, updateData }) => {
  const { newClass } = useSelector((state) => state.class);
  const [open, setOpen] = React.useState(false);
  const [activeStep, setActiveStep] = React.useState(0);
  const [values, setValues] = useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [createPractice, { isError: postError, isLoading: postLoading }] = useCreatePracticeMutation();
  const handleNext = () => setActiveStep((prev) => prev + 1);

  const handleData = async () => {
    const practices = await values.map(({ startTime, endTime, id, timer }) => ({
      question: id,
      startTime,
      endTime,
      sequence: getSeq.length++,
      timer,
      visible: true,
      status: true,
    }));

    return { classId: newClass._id, practices };
  };

  const handleCreate = async () => {
    try {
      const response = await createPractice({
        endpoint: `${classApi.endPoint}/practice`,
        newData: await handleData(),
      });
      console.log("🚀 ~ handleSave ~ response:", response);
      if (response && response?.data?.success) {
        const res = await updateData();

        console.log("🚀 ~ handleSave ~ res:", res);
        if (res.success) {
          handleClose();
        } else message.error("Some error Occured");
      } else {
        message.error("Some error  to add Practice!", 2.5);
      }
    } catch (error) {
      console.error("Error add Practices: api:", error);
    }
  };

  useEffect(() => {
    setValues([]);
    setActiveStep(0);
  }, [open]);

  const steps = [
    {
      label: "Select Questions",
      comp: (
        <AddQuestions
          getSeq={getSeq}
          values={values}
          setValues={setValues}
          handleNext={handleNext}
        />
      ),
    },
    {
      label: "Add Timer Details",
      comp: (
        <AddTimerComp
        loading={postLoading}
          values={values}
          setValues={setValues}
          handleCreate={handleCreate}
        />
      ),
    },
  ];

  console.log("🚀 ~ CreatePractice ~ values:", values);

  return (
    <>
      <CustomButton
        startIcon={<PlusCircle />}
        onClick={handleOpen}
        style={{
          ...ButtonStyle,
          height: 35,
          width: 150,
          borderRadius: 1,
        }}
      >
        Create Practice
      </CustomButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modalRoot">
            <div className="w-[80vw] h-[80vh] p-2 overflow-scroll">
              {/* header */}
              <header className="flex justify-between items-start">
                <div className="basis-3/12">
                  <h3 className="text-xl font-bold text-primary">
                    Add Questions
                  </h3>
                  <h6 className="text-sm">{newClass?.subject?.title}</h6>
                </div>

                <div className="basis-7/12">
                  {/* <SearchField searchBy={"search"} data={questionListRes?.data.question_banks.map((e)=>({...e,search:e.subject?.title}))} onFilter={(val)=>setTableData(val)} placeholder={"Search By Question"}/> */}
                </div>

                <IconButton
                  onClick={() => {
                    handleClose();
                  }}
                >
                  <X color="var(--primary)" />
                </IconButton>
              </header>

              {/* Content */}
              <div className="mt-4 ">
                <div className="w-full">
                  <div className="p-2  w-full ">
                    <Stepper alternativeLabel activeStep={activeStep}>
                      {steps.map(({ label, comp }, ind) => (
                        <Step
                          key={label}
                          onClick={() => setActiveStep(ind)}
                          className="cursor-pointer"
                        >
                          <StepLabel>{label}</StepLabel>
                        </Step>
                      ))}
                    </Stepper>

                    <br />

                    <Divider sx={{ width: "80%" }} />

                    <div className="w-full ">{steps[activeStep]?.comp}</div>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </Modal>
    </>
  );
});

const AddTimerComp = ({ values, setValues, handleCreate,loading }) => {
  const { newClass } = useSelector((state) => state.class);
  const handleChange = (name, value, ind) => {
    let updatedData = [...values];
    updatedData[ind] = { ...updatedData[ind], [name]: value };
    setValues(updatedData);
  };

  console.log("🚀 ~ AddTimerComp ~ values:", values);
  return (
    <div className="flex flex-col gap-2 mt-2 mb-11">
      {values?.map(({ question, startTime, endTime, timer }, index) => (
        <React.Fragment key={index}>
          <Card
            sx={{ p: 1, border: "5px solid var(--med-grey)", borderRadius: 3 }}
          >
            <Descriptions
              layout="vertical"
              contentStyle={{
                color: "#636262",
                fontFamily: "var(--font-inter)",
              }}
              labelStyle={{
                fontFamily: "var(--font-inter)",
                color: "var(--dark-blue)",
              }}
              bordered
            >
              <Descriptions.Item key="1" label="Question" span={4}>
                <HTMLConverter>{question}</HTMLConverter>
              </Descriptions.Item>

              <Descriptions.Item key="2" label="Start Time" span={1}>
                <TimePickerComp
                  controlTime={true}
                  startTime={dayjs.utc(newClass?.startTime)}
                  endTime={dayjs.utc(newClass?.endTime)}
                  value={startTime ? dayjs(startTime) : null}
                  setValue={(val) => handleChange("startTime", val, index)}
                />
              </Descriptions.Item>
              <Descriptions.Item key="3" label="End Time" span={1}>
                <TimePickerComp
                  controlTime={true}
                  startTime={dayjs.utc(newClass?.startTime)}
                  endTime={dayjs.utc(newClass?.endTime)}
                  value={endTime ? dayjs(endTime) : null}
                  setValue={(val) => handleChange("endTime", val, index)}
                />
              </Descriptions.Item>
            </Descriptions>
          </Card>
          <Divider sx={{ bgColor: "black", color: "black" }} />
        </React.Fragment>
      ))}
      <div className="text-end pt-5">
        <CustomButton
          onClick={handleCreate}
          disabled={loading}
          style={{
            ...CustomButtonStyle,
            width: 186,
            borderRadius: 5,
            height: 45,
          }}
        >
       {loading?<CircularProgress color="inherit" size={18}/>:   "Create"}
        </CustomButton>
      </div>
    </div>
  );
};

const AddQuestions = ({ handleNext, values, setValues }) => {
  const { newClass } = useSelector((state) => state.class);
  const [tableData, setTableData] = useState([]);
  // const processedData = useMemo(() => {
  //   if (newClass && newClass.practice) {
  //     async function processPractice(practice) {
  //       const data = await Promise.all(practice.flatMap((e) => ({
  //         ...e.question,
  //         timer: e.timer || "",
  //         startTime: e.startTime || "",
  //         endTime: e.endTime || "",
  //       })));
  //       return data;
  //     }

  //     return processPractice(newClass.practice);
  //   }
  // }, [newClass.practice]);

  // useEffect(() => {
  //   if (processedData) {
  //     processedData.then(response => {
  //       console.log(response, "59");
  //       setValues(response);
  //     });
  //   }
  //   return()=>{
  //     setActiveStep(0);
  //   }
  // }, [processedData,newClass.practice]);

  const {
    data: questionListRes,
    isLoading,
    isFetching,
    isError,
  } = useGetQuestionListQuery(
    `${questionApi.endPoint}/topic/${newClass.topic}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

 

  useEffect(() => {
    if (questionListRes) {
      setTableData(questionListRes?.data.question_banks);
    }
  }, [questionListRes]);

  const removeExistingData = useMemo(() => {
    if (
      !questionListRes ||
      !questionListRes.data ||
      !questionListRes.data.question_banks
    ) {
      return [];
    }
    const filteredData = questionListRes?.data.question_banks?.filter(
      (item) => !newClass.practice.some((e) => e?.question?._id === item._id)
    );

    return filteredData;
  }, [questionListRes, newClass.practice]);

  console.log(
    "🚀 ~ removeExistingData ~ removeExistingData:",
    removeExistingData
  );

  console.log("🚀 ~ ImportPracticeModal ~ tableData:", tableData);

  const handleSave = () => {
    handleNext();
  };
  return (
    <>
      <div className="bg-white sticky top-[-10px] z-50">
        <h5 className="bg-[#F4F3FE] p-2 text-sm font-normal rounded-md  ">
          {values?.length} Selected Questions
        </h5>
      </div>

      <MultipleSelectTable
        headCells={questionBankHeader}
        rows={removeExistingData?.map((e) => ({
          ...e,
          id: e._id,
          topic_id: e.topic_id[0].title,
          subject_id: e.subject_id.title || [],
        }))}
        value={values}
        setValue={(val) => setValues(val)}
        loading={isLoading || isFetching}
      />

      <div className="text-end pt-5">
        <CustomButton
          onClick={handleSave}
          style={{
            ...CustomButtonStyle,
            width: 186,
            borderRadius: 5,
            height: 45,
          }}
        >
          Next
        </CustomButton>
      </div>
    </>
  );
};

export default React.memo(CreatePractice);
