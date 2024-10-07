import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
} from "@mui/material";
import React from "react";
import TruncateText from "../../../../../../common/FunctionComponents/truncate";
import {
  CustomButtonStyle,
  ButtonStyle,
  CustomButton,
} from "../../../../../../../styles/muiRoot";
import { useGetGroupDoubtsQuery } from "../../../../../../../services/apis/exam/group";
import { useParams } from "react-router-dom";
import { groupApi } from "../../../../../../../services/Constant";
import { dateFormatting } from "../../../../../../../services/common";
function Doubts() {
  const params = useParams();
  const { data, isLoading, isSuccess } = useGetGroupDoubtsQuery(
    `${groupApi.endPoint}/doubt/${params.groupId}`
  );


  return (
    <div>
      <div className="flex justify-start flex-wrap h-[80vh] overflow-scroll p-2 gap-5 ">
        {data?.data?.doubtList?.map((item, ind) => (
          <Card
            key={ind}
            sx={{
              // minWidth: "26em",
              fontFamily: "var(--font-inter)",
              borderRadius: 2,
              p: 1,
              width: "25em",
              mx: "auto",
            }}
          >
            <CardHeader
              sx={{ m: 0, pb: 0 }}
              avatar={
                <Avatar
                  alt="Remy Sharp"
                  src={item.raisedBy?.profilePic}
                  sx={{ width: 56, height: 56 }}
                />
              }
              title={
                <div style={{ display: "flex", alignItems: "center" }}>
                  {item?.raisedBy?.name}
                  <img src="/icons/WinnerStar.png"></img>
                </div>
              }
              subheader={"Id :" + item?.raisedBy?._id}
            />

            <CardContent className="text-sm  font-inter font-[600] text-primary ">
              <p className="text-sm font-normal my-2 ">
                {" "}
                <TruncateText text={item.description} maxLength={133} />
              </p>

              {item?.image && (
                <CardMedia
                  component="img"
                  sx={{
                    height: 50,
                    width: 75,
                    borderRadius: 2,
                    my: 2,
                  }}
                  image={item?.image}
                  alt="Paella dish"
                />
              )}
              {item.videos && (
                <>
                  <video
                    width="200"
                    height="200"
                    controls
                    style={{ borderRadius: "5px" }}
                  >
                    <source src={item.videos[0]} type="video/mp4" />
                  </video>
                  <br />{" "}
                </>
              )}
              <h4 className="text-secondary">ASSIGNED TO:</h4>
              <p>
                {item?.doubtSolver?.name}{" "}
                <span className="text-red-600 font-normal ml-2 text-xs">
                  • {dateFormatting(item?.createdAt)?.time} mins back
                </span>
              </p>
            </CardContent>

            <CardActions>
              <CustomButton
                style={{
                  ...CustomButtonStyle,
                  borderRadius: 5,
                  height: 40,
                  width: 60,
                  fontSize: 14,
                  width: 108,
                }}
                onClick={() => alert()}
              >
                Re-Assign
              </CustomButton>
              <CustomButton
                style={{
                  ...ButtonStyle,
                  borderRadius: 5,
                  height: 40,
                  width: 60,
                  fontSize: 14,
                  width: 108,
                }}
                onClick={() => alert()}
              >
                Solve
              </CustomButton>
            </CardActions>

            <footer>
              <p className="text-right text-secondary text-xs">25 Jun</p>
            </footer>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Doubts;
