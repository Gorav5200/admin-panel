import { Divider, Stack, Button, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { HeaderWithNavigation } from "../../../common/header";
import { rewardsApi } from "../../../../services/Constant";
import { Descriptions } from "antd";
import Icon from "../../../common/Icon";
import { useDispatch } from "react-redux";
import { useGetBundleListQuery as useGetBundleListQueryById } from "../../../../services/apis/rewardsApi";
import { setBundleDetails } from "../../../../ducks/rewardSlice";
import { dateFormatting } from "../../../../services/common";
import { BackdropLoader } from "../../../common/lineLoader";

const BundleDetails = () => {
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
  } = useGetBundleListQueryById(
    `${rewardsApi.bundleEndPoint}/detail/${params.bundleId}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  useEffect(() => {
    if (getDetails) {
      setData(getDetails.data?.bundleData);
    }
  }, [getDetails, isFetching, isLoading, isSuccess]);

  console.log("🚀 ~ Details ~ data:", data);
  console.log("🚀 ~ BundleDetails ~ getDetails:", getDetails);

  const handleEdit = () => {
    dispatch(
      setBundleDetails({
        ...data,
      })
    );
    navigate(`/main/rewards/bundle/edit/${params.bundleId}`);
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
      key: "5",
      label: "Coin Value",
      children: data?.coinValue,
    },
    {
      key: "6",
      label: "Price",
      children: data?.price,
    },
    {
      key: "6",
      label: "Creation Date",
      children: dateFormatting(data?.createdAt).date,
    },
  ];

  return (
    <>
      <HeaderWithNavigation cont="Bundle Details" />
      {isLoading || isFetching ? (
        
        <BackdropLoader isOpen={true}/>
      ) : (
        <div className=" h-[90vh] bg-white">
          <div className="info  rounded-md overflow-scroll scrollbar-hide">
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

export default BundleDetails;
