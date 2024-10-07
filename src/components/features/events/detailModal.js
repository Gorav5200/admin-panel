import React, { useEffect, useState } from "react";
import { ChevronsRight, XIcon } from "lucide-react";
import { BackdropLoader } from "../../common/lineLoader";
import {
  Alert,
  Avatar,
  Backdrop,
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Modal,
  Stack,
} from "@mui/material";
import { Descriptions, message } from "antd";
import Icon from "../../common/Icon";
import {
  useGetEventByIdQuery,
  useLazyGetEventByIdQuery,
} from "../../../services/apis/eventApi";
import { useGetGroupByIdQuery } from "../../../services/apis/exam/group";
import { eventApi } from "../../../services/Constant";
import { CustomButton, CustomButtonStyle } from "../../../styles/muiRoot";
import { dateFormatting, dateFormattingString } from "../../../services/common";
import { setEventData } from "../../../ducks/eventSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RingLoader } from "react-spinners";
import dayjs from "dayjs";

export default function DetailModal({ id }) {
  console.log("🚀 ~ DetailModal ~ id:", id);
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [data, setData] = useState({});

  const [trigger, { getData, isLoading, isError ,isFetching}] = useLazyGetEventByIdQuery({
    refetchOnMountOrArgChange: true,
    selectFromResult: ({ data, isLoading, isError }) => {
      if (!isLoading && !isError && data) {
        return { getData: data.data };
      }
      return {};
    },
  });
  console.log("🚀 ~ DetailModal ~ data:", data);

  useEffect(() => {
    setData(getData);
    return ()=>{
        setData({})
    }
  }, [getData]);



  const handleEdit=()=>{
    try {
            dispatch(setEventData({...data,
            hostId:data?.hostId._id,
            brandId:data?.brandId._id,
            groups: data?.groups?.map((e)=>e._id),
            invite: false,
            repeatEvents: false,
            repeatData: { frequency: "disable", endTime: null, endDate: null }
        }));
        navigate(`/main/events/edit/${id}`)
    } catch (error) {
       message.error("Some Error Occured")
    }
  }
  return (
    <>
      <CustomButton
        sx={{
          ...CustomButtonStyle,
          borderRadius: 2,
          width: "fit-content",
          height: "fit-content",
        }}
        onClick={() => {
          handleOpen();
          trigger(`${eventApi.endPoint}/details/${id}`);
        }}
      >
        View Details <ChevronsRight className="animate-bounce-x" />
      </CustomButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="modalRoot bg-transparent ">
       {isLoading || isFetching ? 
       <div className="flex justify-center items-center h-[20vh] w-[20vw] bg-lightGrey">
     
         <div className="mb-4 ml-5">
                  <RingLoader  color="#030807" size={70} />
                  <p className="tracking-[0.3rem] mt-3 text-gray-700 ml-[-10px]">
                    Loading...
                  </p>
                </div>
  
              
              </div>:
              isError?
              <div className="flex justify-center items-center h-[20vh] w-[20vw] bg-lightGrey ">
           
              <Alert  variant="outlined" severity="error">
  Some error occured to fetch details
</Alert>
              
              </div>:
              <>
              <header className="flex justify-between align-top  p-2 items-center">
            <div className="flex gap-2 items-start">
              <Avatar
                sx={{ width: 40, height: 40, boxShadow: 1 ,p:1}}
                src={data?.hostId?.thumbnail || data?.hostId?.profilePic }
              />
              <div className="text-darkblue italic  text-sm">
                <p className="font-bold">
                  {" "}
                  Host -
                  <span className="font-normal underline underline-offset-1">
                    {data?.hostId?.title}
                  </span>
                </p>
                <small className="font-inder text-secondar  underline-offset-1">
                {data?.hostId?.name}
                  {/* (Last updated on {dateFormatting("jk").date}) */}
                </small>
              </div>
            </div>

            <Stack direction="row" spacing={3}>
              <Button
                sx={{
                  color: "#455564",
                  fontFamily: "var(--inter)",
                  fontSize: "14px",
                }}
                startIcon={<Icon name="FileEdit" color="#336792" size={20} />}
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                sx={{
                  color: "#455564",
                  fontFamily: "var(--inter)",
                  fontSize: "14px",
                }}
                startIcon={<Icon name="Files" color="#336792" size={20} />}
                //   onClick={()=>{
                //     const state={id:params.qid, handleDuplicateClick:true}
                //     navigate(`/main/exam/${params.examId}/qbank/create`,{state})
                //   }}
              >
                Duplicate
              </Button>
              <Button
                sx={{
                  color: "#455564",
                  fontFamily: "var(--inter)",
                  fontSize: "14px",
                }}
                startIcon={<Icon name="Upload" color="#336792" size={20} />}
              >
                Unpublish
              </Button>

              <IconButton
                onClick={() => {
                  handleClose();
                }}
              >
                <XIcon className="text-gray-700" />
              </IconButton>
            </Stack>
          </header>
          <Divider />
          <div className="w-[60vw] overflow-scroll scroll-smooth h-[60vh]   mt-7 p-2 flex flex-col gap-4">
            <div>
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
                items={[
                  {
                    key: "1",
                    label: "Title",
                    children: data?.title,
                    span: 1,
                  },
                  {
                    key: "2",
                    label: "Date",
                    children: dateFormattingString(data?.date),
                    span: 1,
                  },
                  {
                    key: "3",
                    label: "Start Time",
                    children: dayjs.utc(data?.startTime)?.format('LT'),
                    span: 1,
                  },

                  {
                    key: "4",
                    label: "Details",
                    span: 3,
                    children: <>{data?.description}</>,
                  },
                  {
                    key: "5",
                    label: "Mode",
                    children: data?.mode,
                    span: 1,
                  },
                  {
                    key: "6",
                    label: "Mode Type",
                    children: (
                      <>
                        {data?.modeType}
                        {data?.modeType === "external" ? (
                          <a href={data.eventLink} className="ml-2">
                            : <Chip label={data?.eventLink} />
                          </a>
                        ) : (
                          "N/A"
                        )}
                      </>
                    ),
                    span: 1,
                  },

                  {
                    key: "7",
                    label: "Privacy",
                    children: data?.privacy,
                    span: 1,
                  },
                  {
                    key: "8",
                    label: "Brand",
                    children: data?.brandId?.title || "N/A",
                    span: 1,
                  },

                  {
                    key: "9",
                    label: "Status",
                    children: data?.status || "N/A",
                    span: 2,
                  },

                  {
                    key: "10",
                    label: "Repeat Event",
                    span: 3,
                    children: (
                      <ul className="list-disc">
                        <li className=" w-full items-center">
                          <div className="text-black font-inter flex gap-4 items-center  text-base">
                            <div className="w-[130px] basis-[20%]">
                              Frequency
                            </div>
                            :
                            <span className="font-inter">
                              {data?.eventType}
                            </span>
                          </div>
                        </li>
                        <li className=" w-full items-center">
                          <div className="text-black font-inter flex gap-4 items-center  text-base">
                            <div className="w-[130px] basis-[20%]">
                              End Date{" "}
                            </div>
                            :
                            <span className="font-inter">
                              {data?.events?.endDate}
                            </span>
                          </div>
                        </li>
                        <li className=" w-full items-center">
                          <div className="text-black font-inter flex gap-4 items-center  text-base">
                            <div className="w-[130px] basis-[20%]">
                              End Time
                            </div>
                            :
                            <span className="font-inter">
                              {data?.events?.endTime}
                            </span>
                          </div>
                        </li>
                      </ul>
                    ),
                  },
                ]}
              />
            </div>
          </div>
              </> }

        
        </Box>
      </Modal>
    </>
  );
}
