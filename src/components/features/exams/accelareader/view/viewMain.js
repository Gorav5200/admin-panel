import React, { useEffect, useState } from "react";
import { HeaderWithNavigation } from "../../../../common/header";
import { useGetAccelareaderByIdQuery } from "../../../../../services/apis/accelareader";
import { accelareaderApi } from "../../../../../services/Constant";
import { useParams } from "react-router-dom";
import Icon from "../../../../common/Icon";
import { Box, Stack, Button, Divider, Skeleton } from "@mui/material";
import { HTMLConverter } from "../../../../../services/common";
import { useDispatch } from "react-redux";
import { setAccelareaderDetail } from "../../../../../ducks/accelareaderSlice";
import { useNavigate } from "react-router-dom";
function ViewMain() {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const {
    data: getDetails,
    isError,
    isLoading,
  } = useGetAccelareaderByIdQuery(
    `${accelareaderApi.endPoint}/detail/${params.accelareaderId}`
  );
  const [data, setData] = useState({});

  const handleEdit = () => {
    dispatch(setAccelareaderDetail(data));
    navigate(`/main/exam/accelareader/edit/${params.accelareaderId}`)
  };
  useEffect(() => {
    setData(getDetails?.accelareader);
  }, [getDetails]);
  console.log("🚀 ~ ViewMain ~ data:", data);

  return (
    <div>
      <HeaderWithNavigation cont={isLoading ? <Skeleton width={"10ch"} /> : data?.subject} />
      <Box
        sx={{
          backgroundColor: "white",
          padding: "10px",
          borderRadius: "5px",
          borderRadius: 2,
        }}
      >
        <Stack
          direction="row"
          spacing={3}
          justifyContent={"space-between"}
          alignItems={"center"}
          my={1}
        >
          <div>
            <h5 className="text-base font-bold mb-2">
              {isLoading ? <Skeleton width={"12ch"} /> : data?.topic}
            </h5>
          </div>
          <div>
            <Button
              sx={{
                color: "#455564",
                fontFamily: "var(--inter)",
                fontSize: "14px",
              }}
              disabled={isLoading}
              startIcon={<Icon name="FileEdit" color="#336792" size={20} />}
              onClick={handleEdit}
            >
              Edit
            </Button>
            <Button
              disabled={isLoading}
              sx={{
                color: "#455564",
                fontFamily: "var(--inter)",
                fontSize: "14px",
              }}
              startIcon={<Icon name="Files" color="#336792" size={20} />}
              // onClick={handleDuplicate}
            >
              Duplicate
            </Button>
            <Button
              disabled={isLoading}
              sx={{
                color: "#455564",
                fontFamily: "var(--inter)",
                fontSize: "14px",
              }}
              startIcon={<Icon name="Upload" color="#336792" size={20} />}
            >
              Unpublish
            </Button>
          </div>
        </Stack>

        <Divider />
        <br />
        <div className=" overflow-scroll h-[80vh] text-justify pr-4 ">
          {isLoading ? (
            <Skeleton variant="rectangular" width="100%">
              <div style={{ paddingTop: "57%" }} />
            </Skeleton>
          ) : (
            <HTMLConverter>{data?.content}</HTMLConverter>
          )}
        </div>
      </Box>
    </div>
  );
}

export default ViewMain;
