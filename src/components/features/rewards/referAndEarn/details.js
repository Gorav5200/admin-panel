import { Divider, Stack, Button, Chip } from "@mui/material";
import React, { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import { HeaderWithNavigation } from "../../../common/header";
import { rewardsApi } from "../../../../services/Constant";

import { Descriptions } from "antd";
import Icon from "../../../common/Icon";
import { useDispatch } from "react-redux";
import { useGetReferralByIdQuery } from "../../../../services/apis/rewardsApi";
import { setReferralDetails } from "../../../../ducks/rewardSlice";
import { dateFormatting } from "../../../../services/common";

const Details = () => {
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
  } = useGetReferralByIdQuery(
    `${rewardsApi.referralEndPoint}/detail/${params.referralId}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (getDetails) {
      setData(getDetails.data.referralData);
    }
  }, [getDetails, isFetching, isLoading, isSuccess]);

  console.log("🚀 ~ Details ~ data:", data);

  const handleEdit = () => {
    const products = data?.products?.map((e) => e._id);
    dispatch(
      setReferralDetails({
        ...data,
        products
      })
    );
    navigate(`/main/rewards/referral/edit/${params.referralId}`);
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
      label: "Points",
      children: data?.points,
    },
    {
      key: "6",
      label: "Earn Value",
      children: data?.earnValue,
    },
    {
      key: "7",
      label: "Discount Value",
      children: data?.discountValue,
    },
    {
      key: "8",
      label: "Start Date",
      children:dateFormatting(data?.startDate).date ,
    },
    {
      key: "9",
      label: "End date",
      children:dateFormatting(data?.endDate).date ,
    },
  ];

  return (
    <>
      <HeaderWithNavigation cont="Referral Details" />
      {!isLoading && (
        <div className=" h-[90vh]">
          <div className="info bg-white rounded-md overflow-scroll scrollbar-hide">
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

            <div className="p-2">
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
          </div>
          {/* Preview */}
        </div>
      )}
    </>
  );
};

export default Details;
