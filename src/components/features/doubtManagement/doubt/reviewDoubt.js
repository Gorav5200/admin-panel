import React, { useState } from "react";
import {
  CustomButtonStyle,
  ButtonStyle,
  CustomButton,
} from "../../../../styles/muiRoot";
import {
  Divider,
  Grid,
  Skeleton,
  Pagination,
  PaginationItem,
  CircularProgress,
  Alert,
  AlertTitle,
} from "@mui/material";
import { Button, Empty, Popconfirm, Result, message } from "antd";
import ModalComp from "../../../common/modal";
import { DoubtCard } from "./commonComp.js/cards";
import {
useGetReviewListQuery,
  useUpdateRequestStatusMutation,
  useUpdateRequestStatusMutation as useHandleAcceptMutation,
} from "../../../../services/apis/doubtApi";
import DebouncedInput from "../../../common/searchApiField";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { userDetail } from "../../../../ducks/userSlice";
import { DetailModal } from "./commonComp.js/reviewDetailModal";
import withQueryParams from "../../../common/FunctionComponents/withQueryParams";
import { useDispatch } from "react-redux";
import { reviewDoubtDetail, setReviewDoubt } from "../../../../ducks/doubtSlice";
import { Info } from "lucide-react";

function ReviewDoubt({ queryParams }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector(userDetail);
  const { detail } = useSelector(reviewDoubtDetail);//handle particular doubt detail
  const { page, count, search } = queryParams;
  const { handleClose, handleOpen, ModalComponent, open } = ModalComp();

  const { data, isLoading, isFetching, isError, refetch, isSuccess } = useGetReviewListQuery(`/exams/v1/review/notify/list/${userInfo._id}`, {
      refetchOnMountOrArgChange: true,
    });

  const handleSearch = (term) =>
    navigate(`/main/doubt?page=1&count=${20}&search=${term}`);
  //===========HANDLE  IGNORE======================//
  const [
    updateRequestStatus,
    { isLoading: statusLoading, isError: statusError },
  ] = useUpdateRequestStatusMutation();

  const handleRequestStatus = async (status) => {
    try {
      const response = await updateRequestStatus({
        endpoint: `/exams/v1/review/request/${status}`,
        data: {
          doubtId: detail.doubtId?._id,
          doubtSolutionReviewId:detail._id,
        },
      });

      if (response.data && response.data.success) {
        message.success("Doubt Ignored");
        refetch();
      } else {
        message.error(response.message);
      }
    } catch (error) {
      console.error("Error add Assignment api:", error);
    }
  };

  //======  HANDLE ACCEPT CASE  || MODAL OPEN || SET DETAILS FOR FURTHER PROCESS FOR GETTING THE DETAIL IN MODAL =======   //
  const [
    handleAcceptMutation,
    { isLoading: acceptLoading, isError: acceptError },
  ] = useHandleAcceptMutation();

  const handleAccept = async () => {
    try {
      const response = await handleAcceptMutation({
        endpoint: `/exams/v1/review/accept/${detail?.doubtId.solutionId}/${detail?.doubtSolverId._id}/${detail?._id}/${detail?.doubtId._id}`,
      });

      if (response.data && response.data.success) {
        handleOpen(); //Open the modal
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error("Some error occured",2500);
    }
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

  const ConfirmPopUp = ({ children, ...others }) => (
    <Popconfirm {...others}>{children}</Popconfirm>
  );

  return (
    <div className="relative">
      <header className="px-4 mb-1 flex justify-between items-center">
        <div className="w-1/4 ">
          <DebouncedInput
            placeholder="Search by Title"
            onSearch={handleSearch}
            loading={isLoading || isFetching}
            initialValue={search}
          />
        </div>
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
        ) : isSuccess &&
          isSuccess &&
          (data?.doubtNotifications?.length === 0) === 0 ? (
          <div className="h-full w-full flex justify-center items-center">
            <Empty description="No Data Found" />
          </div>
        ) : (
          data?.doubtNotifications?.map((item, ind) => {
            return (
              <Grid item key={ind} xs={12} sm={6} md={4} lg={3}>
                <DoubtCard
                  style={{ height: "23rem", overflow: "Scroll" }}
                  actions={
                    item.status === "created" ? (
                      <div className="flex gap-2">
                        <ConfirmPopUp
                          data={item}
                          status="info"
                          title="Confirmation"
                          description="Are you sure you want to Accept this review request?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => {
                            dispatch(setReviewDoubt(item));
                            handleAccept();
                          }}
                          okButtonProps={{
                            loading: statusLoading,
                            danger: isError,
                          }}
                        >
                          <CustomButton
                            style={{
                              ...CustomButtonStyle,
                              width: 120,
                              borderRadius: 5,
                              height: 45,
                            }}
                          >
                            {acceptLoading ? (
                              <CircularProgress size={20} color="inherit" />
                            ) : (
                              "Accept"
                            )}
                          </CustomButton>
                        </ConfirmPopUp>

                        <ConfirmPopUp
                          data={item}
                          status="warning"
                          title="Ignore"
                          description="Are you sure you want to ignore this review request?"
                          okText="Yes"
                          cancelText="No"
                          onConfirm={() => {
                            dispatch(setReviewDoubt(item));
                            handleRequestStatus("ignored");
                          }}
                          okButtonProps={{
                            loading: statusLoading,
                          }}
                        >
                          <CustomButton
                            style={{
                              ...ButtonStyle,
                              width: 120,
                              borderRadius: 5,
                              height: 45,
                            }}
                          >
                            Ignore
                          </CustomButton>
                        </ConfirmPopUp>
                      </div>
                    ) : item.status === "accepted" ? (
                      <CustomButton
                        onClick={() => {
                          handleOpen();
                          dispatch(setReviewDoubt(item));
                        }}
                        style={{
                          ...CustomButtonStyle,
                          width: 120,
                          borderRadius: 5,
                          height: 45,
                        }}
                      >
                        Review
                      </CustomButton>
                    ) : item.status?.toLowerCase() === "reviewincorrect" ? (
                      <div className="text-left">
                        <small  className="text-red-400 py-2 flex gap-2">
                        <Info size={15}/>    You have marked Incorrect upload  your solution
                        </small>
                        <CustomButton
                          onClick={() => {
                            handleOpen();
                            dispatch(setReviewDoubt(item));
                          }}
                          style={{
                            ...CustomButtonStyle,
                            width: 120,
                            borderRadius: 5,
                            height: 45,
                          }}
                        >
                          Upload Solution
                        </CustomButton>
                      </div>
                    ) : null
                  }
                  {...item}
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
                search && `&{search=${search}}`
              }`}
              {...item}
            />
          )}
        />
      </div>

      {/* ----------------------------IMPORT VIEW SOLUTION M3ODAL --------------------------------- */}
      <ModalComponent>
        <DetailModal
          handleClose={() => handleClose()}
          handlePassStatus={handleRequestStatus}
          refetchList={refetch}
        />
      </ModalComponent>
    </div>
  );
}

export default withQueryParams(ReviewDoubt);
