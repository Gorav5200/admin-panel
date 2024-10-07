import { Divider, Stack, Button, Chip } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderWithNavigation } from "../../../common/header";
import { rewardsApi } from "../../../../services/Constant";
import { Descriptions, Image } from "antd";
import Icon from "../../../common/Icon";
import { useDispatch } from "react-redux";
import { useGetRewardListQuery as useGetRewardListQueryByID } from "../../../../services/apis/rewardsApi";
import { setReferralDetails, setRewardsDetails } from "../../../../ducks/rewardSlice";
import { dateFormatting } from "../../../../services/common";
import { BackdropLoader } from "../../../common/lineLoader";
import { Eye } from "lucide-react";

const RewardsDetail = () => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [data, setData] = useState({});
  const {
    data: getDetails,
    isLoading,
    isError,
    isSuccess,
    isFetching,
  } = useGetRewardListQueryByID(
    `${rewardsApi.rewardsEndPoint}/detail/${params.rewardId}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (getDetails) {
      setData(getDetails.data.rewardData);
    }
  }, [getDetails, isFetching, isLoading, isSuccess]);

  console.log("🚀 ~ Details ~ data:", data);

  const handleEdit = () => {
    const products = data?.products?.map((e) => e._id);
    dispatch(
      setRewardsDetails({
        ...data,
        products,
      })
    );
    navigate(`/main/rewards/edit/${params.rewardId}`);
  };

  const items = [
    {
      key: "1",
      label: "Title",
      children: data?.title,
    },
    {
      key: "2",
      label: "Description",
      children: data?.description,
      span: 2,
    },

    {
      key: "3",
      label: "Product Type",
      children: data?.type,
    },
    {
      key: "4",
      label: "Products",
      children: (
        <>
          <Stack direction={"row"} spacing={3}>
            {data?.products?.map(({ title, _id }) => (
              <Chip
                key={_id}
                sx={{ width: "max-content", borderRadius: 2 }}
                label={title}
              />
            ))}
          </Stack>
        </>
      ),
      span: 2,
    },

    {
      key: "5",
      label: "Coins",
      children: data?.coins,
    },

    {
      key: "6",
      label: "Start Date",
      children: dateFormatting(data?.startDate).date,
    },
    {
      key: "7",
      label: "End date",
      children: dateFormatting(data?.endDate).date,
    },
  ];

  //   console.log("🚀 ~ RewardsDetail ~ getDetails:", getDetails.data.rewardData)

  return (
    <>
      <HeaderWithNavigation cont="Rewards Details" />
      {isLoading ? (
        <BackdropLoader isOpen={true} />
      ) : (
        <div className=" h-[90vh] bg-white m-1 rounded-md">
          <header className="p-1 px-2 sticky top-0 bg-white flex items-center justify-between">
            <h5 className="font-inder font-semibold text-md "></h5>

            <Stack
              direction="row"
              spacing={3}
              alignSelf={"flex-end"}
              justifyContent={"flex-end"}
              my={1}
            >
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
                startIcon={<Icon name="Upload" color="#336792" size={20} />}
              >
                Unpublish
              </Button>
            </Stack>
          </header>
          <Divider />
          <div className="info rounded-md overflow-scroll scrollbar-hide  flex gap-4 justify-center pt-3 ">
            <div className="p-2 w-5/6 ">
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
                items={!isLoading && items}
              />
            </div>
            <div className=" p-3">
              <Image
                src={
                  data?.thumbnail ||
                  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbnFoaGZ5eGdvNTRnb3RuOXdocGhoMjV2cHllcnNtYjZqNnRzNTI2aSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/XgTEubbzTkNR9kxX8d/giphy.gif"
                }
                width={220}
                height={200}
                alt="no_image_found"
                className="rounded-md"
                zIndex={1300}
                preview={{
                  mask: (
                    <div className="flex gap-1 items-center font-inter">
                      <span role="img" aria-label="camera">
                        <Eye size={15} />
                      </span>{" "}
                      View
                    </div>
                  ),
                  maskStyle: {
                    border: "1px solid red",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  },
                  zIndex: 1200,
                }}
              />
            </div>
          </div>
          {/* Preview */}
        </div>
      )}
    </>
  );
};

export default RewardsDetail;
