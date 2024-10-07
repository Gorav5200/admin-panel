import React, { useEffect, useMemo, useState } from "react";
import { QuestionCircleOutlined } from "@ant-design/icons";
import {
  CustomButtonStyle,
  ButtonStyle,
  CustomButton,
} from "../../../../styles/muiRoot";
import {
  Divider,
  Grid,
  IconButton,
  Skeleton,
  Backdrop,
  LinearProgress,
  Pagination,
  PaginationItem,
} from "@mui/material";
import {
  Alert,
  Button,
  Empty,
  Modal,
  Popconfirm,
  Result,
  Space,
  message,
  notification,
} from "antd";
import { XIcon } from "lucide-react";
import { doubtApi } from "../../../../services/Constant";
import { DoubtCard } from "./commonComp.js/cards";
import {
  useGetDoubtListQuery as useGetNewDoubtsQuery,
  useUpdateRequestStatusMutation,
  useUpdateRequestStatusMutation as useGetSolveInfoMutation,
  useGetSolutionInfoQuery,
  useUploadDoubtSolutionMutation,
} from "../../../../services/apis/doubtApi";
import DebouncedInput from "../../../common/searchApiField";
import {
  Link,
  useBeforeUnload,
  useLocation,
  useNavigate,
} from "react-router-dom";
import DoubtSolverForm from "./commonComp.js/doubtSolverForm";
import SolutionForm from "./commonComp.js/solutionForm";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { setSpecificDoubtData } from "../../../../ducks/doubtSlice";
import useTimer from "../../../../services/utilities/hooks/useTimer";
import DetailModal from "./commonComp.js/modal";

function NewDoubts() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.users);
  const query = new URLSearchParams(location.search);
  const page = parseInt(query.get("page") || "1", 10);
  const count = parseInt(query.get("count") || "12", 10);
  const searchTerm = query.get("search") || "";
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  const [modalType, setModalType] = useState(null);


   useEffect(() => {
     window.onbeforeunload = confirmExit;
     function confirmExit() {
       return "show warning";
     }
   }, []);



  const { data, isLoading, isFetching, isError, isSuccess, refetch } =
    useGetNewDoubtsQuery(`${doubtApi.endPoint}/notify/list/${userInfo._id}`, {
      refetchOnMountOrArgChange: true,
    });

  const handleSearch = (term) => {
    navigate(`/main/doubt?page=1&count=${count}${term && `&search=${term}`}`);
  };

  if (isError) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <Result
          status="404"
          title="404"
          subTitle={"Some error occurred to fetch data"}
          extra={
            <Button type="primary" onClick={() => refetch()}>
              Refech-again
            </Button>
          }
        />
      </div>
    );
  }

  console.log("🚀 ~  Modal type:", modalType);

  return (
    //=====================MAIN COMPONENT============================================== //
    <div className="relative">
      <header className="px-4 mb-1 flex justify-between items-center">
        <div className="w-1/4 ">
          <DebouncedInput
            placeholder="Search by Title"
            onSearch={handleSearch}
            loading={isLoading || isFetching}
            initialValue={searchTerm}
          />
        </div>

        <CustomButton
          onClick={() => {
            setModalType("info");
            handleOpen();
          }}
          style={{
            ...CustomButtonStyle,

            width: 220,
            borderRadius: 5,
            height: 45,
          }}
        >
          + Doubt Solver Info
        </CustomButton>
      </header>

      <Grid
        container
        spacing={2}
        sx={{
          alignItems: "flex-start",
          height: "82vh",
          mt: 1,
          overflow: "scroll",
          position: "relative",
          pb: 10,
          px: 2,
        }}
      >
        <Divider />
        {isLoading || isFetching ? (
          Array.from({ length: 20 }).map((_, ind) => (
            <Grid item key={ind} xs={12} sm={6} md={4} lg={3}>
              <div key={ind} className="skeleton-card p-2 ">
                <div className="flex gap-4 w-full justify-start px-2">
                  <Skeleton height={50} width={60} variant="circular" />
                  <Skeleton variant="rounded" width={"100%"} height={80} />
                </div>

                <div className="flex gap-2 w-full justify-center p-2">
                  <Skeleton height={50} width={"100%"} />
                  <Skeleton height={50} width={"100%"} />
                </div>
                <div className="px-2">
                  <Skeleton height={40} />
                  <Skeleton height={40} />
                </div>
              </div>
            </Grid>
          ))
        ) : isSuccess && data?.doubtNotifications?.length === 0 ? (
          <div className="h-full w-full flex justify-center items-center">
            <Empty description="No Data Found" />
          </div>
        ) : (
          data?.doubtNotifications?.map((item, ind) => {
            const doubtStatus = item.status?.toLowerCase();
            const modalType =
              doubtStatus === "created" ||  doubtStatus === "assigned" 
                ? "accept"
                : doubtStatus === "accepted"
                ? "solve"
                : null;
            return (
              <Grid item key={ind} xs={12} sm={6} md={4} lg={3}>
                <DoubtCard
                  style={{ height: "37ch", overflow: "scroll" }}
                  {...item}
                  isTruncate={true}
                  actions={
                    doubtStatus !== "claimed" &&
                    doubtStatus !== "assignedtoother" &&
                    (
                      <CustomButton
                        onClick={() => {
                          setModalType(modalType);
                          dispatch(setSpecificDoubtData(item));
                          handleOpen();
                        }}
                        style={{
                          ...CustomButtonStyle,
                          width: 150,
                          borderRadius: 5,
                          height: 45,
                        }}
                      >
                        {doubtStatus === "accepted" ? "Solve" : "Accept"}
                      </CustomButton>
                    )
                  }
                />
              </Grid>
            );
          })
        )}
      </Grid>

      <div className="absolute bottom-0 left-0 p-2 text-center w-full bg-lightGrey flex justify-center border-t">
        <Pagination
          page={page}
          count={Math.ceil(data?.data?.totalItems / count) || 1}
          renderItem={(item) => (
            <PaginationItem
              component={Link}
              to={`/main/doubt?page=${item.page}&count=${count}${
                searchTerm && `&{search=${searchTerm}}`
              }`}
              {...item}
            />
          )}
        />
      </div>
      {/* ========MODAL COMP CONDITIONAL RENDERING=============== */}
      <DetailModal open={open}>
        {modalType === "solve" ? (
          <SolutionUpload
            handleClose={handleClose}
            userId={userInfo._id}
            refetchList={refetch}
            doubt
          />
        ) : modalType === "accept" ? (
          <AcceptModal
            handleClose={handleClose}
            setModalType={setModalType}
            userId={userInfo._id}
            refetchList={refetch}
          />
        ) : modalType === "info" ? (
          <InfoModal handleClose={handleClose} userId={userInfo._id} />
        ) : null}
      </DetailModal>
    </div>
  );
}

//==============================ADD DOUBT INFO MODAL=====================================//
const InfoModal = ({ handleClose }) => {
  const initialState = {
    title: null,
    description: null,
    solution: null,
  };
  const [values, setValues] = useState(initialState);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setValues({ ...values, [name]: newValue });
  };

  return (
    <div className="modalRoot max-h-[70vh] overflow-scroll ">
      <LinearProgress
        color="inherit"
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.drawer + 2,
          opacity: loading ? 1 : 0,
        }}
      />

      <Backdrop
        sx={{
          color: "white",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#fffdfd6e",
          display: loading ? "flex" : "none",
        }}
        open={loading}
      />

      <div>
        <header className="ps-2 flex justify-between items-center bg-medGrey rounded-t-md sticky top-0 z-50">
          <h4 className="text-xl font-inter font-semibold text-gray-700">
            Add expertise
          </h4>
          <IconButton onClick={handleClose}>
            <XIcon className="text-gray-700" />
          </IconButton>
        </header>
        <Divider />
        <br />

        <div className="w-[50vw] p-2">
          <DoubtSolverForm closeModal={handleClose} />
        </div>
      </div>
    </div>
  );
};

//==========================Accept Modal ================================================ //
const AcceptModal = ({ setModalType, userId, refetchList, handleClose }) => {
  const { doubtData } = useSelector((state) => state.doubt);
  const loading = false;
  const status = doubtData.status?.toLowerCase();
  const title =
    status === "accepted" || status === "assigned" ? "Pass" : "Ignore";
  const { time, start, seconds, reset } = useTimer({
    initialTime: 60,
    countDown: true,
  });
  const [apiCalled, setApiCalled] = useState(false);

  //==================SOLVE BUTTON API THAT GIVES THE TIMER DATA || #PATCH REQUEST======================//
  const [GetSolveInfo, { isLoading: infoLoad, isError: infoError }] =
    useGetSolveInfoMutation();

  const handleGetSolveInfo = async (data) => {
    console.log("🚀 ~ handleGetSolveInfo ~ data:", {
      ...data,
      doubtSolverId: infoLoad,
    });
    try {
      const response = await GetSolveInfo({
        endpoint: `${doubtApi.endPoint}/accept`,
        data: {
          ...data,
          doubtSolverId: userId,
        },
      });
      console.log("🚀 ~ handleGetSolveInfo ~ response:", response);

      if (response.data && response.data.success) {
        reset();
        setModalType("solve");
      } else {
        message.error(response?.error.data.message);
      }
    } catch (error) {
      console.error("Error add Assignment api:", error);
    }
  };

  //==================HANDLE REQUEST STATUS API FOR PASS AND IGNORE SECTIONS======================//
  const [
    updateRequestStatus,
    { isLoading: statusLoading, isError: statusError },
  ] = useUpdateRequestStatusMutation();

  const handleStatus = async (status, body) => {
    try {
      const response = await updateRequestStatus({
        endpoint: `${doubtApi.endPoint}/request/${status}`,
        data: body,
      });

      if (response.data && response.data.success) {
        handleClose();
        message.info("Ohh ! You passed this question");
        refetchList();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Error add Assignment api:", error);
    }
  };

  useEffect(() => {
    if (seconds === 0 && apiCalled) {
      setApiCalled(true); // Prevent further API calls
      handleStatus("passed", {
        doubtNotificationId: doubtData._id,
        doubtId: doubtData.doubtId._id,
        currentStatus: doubtData.status,
      });
    }
  }, [seconds, apiCalled]);

  useEffect(() => {
    if (doubtData.status === "created") {
      start(); // Start the timer
    }
  }, [doubtData.status]);

  console.log("🚀 ~ AcceptModal ~ apiCalled:", apiCalled);
  return (
    <div className="modalRoot max-h-[70vh] overflow-scroll w-[50vw]">
      <div className="w-[70vw]">
        <LinearProgress
          color="inherit"
          sx={{
            position: "sticky",
            top: 0,
            left: 0,
            right: 0,
            zIndex: (theme) => theme.zIndex.drawer + 2,
            opacity: infoLoad || statusLoading ? 1 : 0,
          }}
        />
        <Backdrop
          sx={{
            color: "white",
            zIndex: (theme) => theme.zIndex.drawer + 1,
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "#fffdfd6e",
            display: loading || statusLoading ? "flex" : "none",
          }}
          open={infoLoad}
        />
        <Alert
          showIcon
          type="info"
          message={
            <div className="flex justify-between gap-2">
              Once the timer starts for solving the question, the popup or tab
              cannot be closed. Closing it will result in the question being
              passed.
              <h1 className="text-sm text-red-700">Time Left: {time}</h1>
            </div>
          }
        />

        <br />
        {doubtData && (
          <DoubtCard
            {...doubtData}
            enableButtons={false}
            isTruncate={false}
            actions={
              <div className="flex items-center gap-3">
                <CustomButton
                  style={{
                    ...ButtonStyle,
                    width: 150,
                    borderRadius: 5,
                    height: 45,
                  }}
                  onClick={() =>
                    handleGetSolveInfo({
                      doubtNotificationId: doubtData._id,
                      doubtId: doubtData.doubtId._id,
                      status: "accepted",
                    })
                  }
                >
                  Solve
                </CustomButton>

                {/* ---------------pass button---------------- */}

                <CustomButton
                  onClick={() => {
                    handleStatus("passed", {
                      doubtNotificationId: doubtData._id,
                      doubtId: doubtData.doubtId._id,
                      currentStatus: doubtData.status,
                    });
                  }}
                  style={{
                    ...CustomButtonStyle,
                    width: 150,
                    borderRadius: 5,
                    height: 45,
                  }}
                >
                  Pass
                </CustomButton>
              </div>
            }
          />
        )}
      </div>
    </div>
  );
};

//==============================SOLUTION UPLOAD MODAL=====================================//
const SolutionUpload = ({ handleClose, userId, refetchList }) => {
  const { doubtData } = useSelector((state) => state.doubt);
  const [responseData, setResponseData] = useState({});

  const [startTime, setStartTime] = useState(null);
  const [isExceed, setIsExceed] = useState(false);
  const [apiCalled, setApiCalled] = useState(false);
  const [notificationShown, setNotificationShown] = useState(false);
  const [api, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (type) => {
    const key = `open${Date.now()}`;
    const btn = (
      <div className="flex gap-2">
        <CustomButton
          onClick={() => api.destroy()}
          style={{
            ...CustomButtonStyle,
            width: "100px",
            borderRadius: 5,
            height: "45px",
          }}
        >
          Cancel
        </CustomButton>
        <CustomButton
          onClick={() => handlePassQuestion()}
          style={{
            ...ButtonStyle,
            width: "100px",
            borderRadius: 5,
            height: "40px",
          }}
        >
          Pass
        </CustomButton>
      </div>
    );
    api[type]({
      message: "Time Alert",
      description:
        "You have 1 minute remaining before the time exceeds 10 minutes as well as it automatically pass the question. Do you want to continue or pass?",
      btn,
      key,
      duration: 0,
    });
  };

  const { data, isLoading, isError, isFetching } = useGetSolutionInfoQuery(
    `${doubtApi.endPoint}/list/assign/${doubtData._id}`,
    {
      refetchOnMountOrArgChange: true,
    }
  ); //=================GET SOLUTION DETAIL BY DOUBT ID==================//

  const [
    updateRequestStatus,
    { isLoading: statusLoading, isError: statusError },
  ] = useUpdateRequestStatusMutation();

  const handleStatus = async (status, body) => {
    try {
      const response = await updateRequestStatus({
        endpoint: `${doubtApi.endPoint}/request/${status}`,
        data: body,
      });

      if (response.data && response.data.success) {
        handleClose();
        message.info(
          apiCalled
            ? "Ohh! You passed this question, Time is over"
            : "Ohh! You passed this question"
        );
        refetchList();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Error updating request status:", error);
    }
  };

  const handlePassQuestion = () => {
    handleStatus("passed", {
      doubtNotificationId: responseData.doubtNotificationId?._id,
      doubtId: responseData.doubtId?._id,
      currentStatus: "passed",
    });
  }; //--------------CALL THE PASS STATUS CHANGE API---------------------//

  //===================SET TTHE DATA CREDENNTIAL IN LOCAL STATE===================//
  useEffect(() => {
    if (data) {
      const response = data.doubtNotifications[0];
      setResponseData(response);
      setStartTime(0); // Initial start time ADD FROM API WHEN CORRECT DATA IS COME=======//
    }
  }, [data]);

  const { time, start, reset, isRunning, seconds, stop } = useTimer({
    initialTime: startTime !== null ? startTime : 0,
    countDown: false,
  }); //---------------TIMER HOOK---------------//

  //------------------START THE TIMER--------//
  useEffect(() => {
    if (startTime !== null && !isRunning) {
      reset(startTime);
      start();
    }
  }, [startTime, isRunning, reset, start]);

  //--------------OPEN NOTIFICATION CONDITION AND API HANDLE ON 10 MIN ----------------//
  useEffect(() => {
    if (seconds >= 540 && !notificationShown) {
      openNotificationWithIcon("warning");
      setNotificationShown(true);
    }
    if (seconds >= 600 && !apiCalled) {
      stop();
      setApiCalled(true);
      handlePassQuestion();
    }
  }, [seconds, apiCalled, data, stop, notificationShown]);

  useConfirmBeforeUnload(handlePassQuestion);
  console.log("🚀 ~ SolutionUpload ~ responseData:", responseData);
  return (
    <div className="modalRoot max-h-[70vh] overflow-scroll ">
      {contextHolder}
      <LinearProgress
        color="inherit"
        sx={{
          position: "sticky",
          top: 0,
          left: 0,
          right: 0,
          zIndex: (theme) => theme.zIndex.drawer + 2,
          opacity: isLoading || isFetching || statusLoading ? 1 : 0,
        }}
      />
      <Backdrop
        sx={{
          color: "white",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: "#fffdfd6e",
          display: isLoading || isFetching || statusLoading ? "flex" : "none",
        }}
        open={isLoading || isFetching || statusLoading}
      />
      <main className="w-[50vw]">
        <header className="ps-2 flex justify-between items-center bg-medGrey rounded-t-md sticky top-0 z-50">
          <h4 className="text-xl font-inter font-semibold text-gray-700">
            Add Solution
          </h4>
          <IconButton onClick={handleClose}>
            <XIcon className="text-gray-700" />
          </IconButton>
        </header>

        <Divider />
        <div className="sticky top-0 z-50 mt-2">
          <Alert
            showIcon
            type="info"
            message={
              <div className="flex justify-between gap-2">
                <p className="w-3/4">
                  Once the timer starts for solving the question, the popup or
                  tab cannot be closed. Closing it will result in the question
                  being passed.
                </p>
                <h1 className="text-sm text-red-700">Time: {time}</h1>
              </div>
            }
          />
        </div>

        <br />
        {responseData && (
          <DoubtCard
            {...responseData}
            enableButtons={false}
            isTruncate={false}
          />
        )}

        <SolutionForm
          handlePassQuestion={handlePassQuestion}
          doubtDetail={responseData?.doubtId}
          handleClose={handleClose}
        />
      </main>
    </div>
  );
};

export default NewDoubts;



const useConfirmBeforeUnload = (handlePassQuestion) => {
  useEffect(() => {
    const handleBeforeUnload = (event) => {
      const confirmationMessage =
        "Are you sure you want to leave? You might lose unsaved changes.";

      // This shows the confirmation dialog
      // Most browsers will ignore the custom message and show their own message
      event.returnValue = confirmationMessage;
      return confirmationMessage;
    };

    const handleUnload = async () => {
      // Call the async API here
      try {
        await handlePassQuestion();
      } catch (error) {
        console.error("Error calling handlePassQuestion:", error);
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("unload", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("unload", handleUnload);
    };
  }, [handlePassQuestion]);
};