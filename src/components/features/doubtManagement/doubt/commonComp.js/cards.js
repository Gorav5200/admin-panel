import {
  Avatar,
  Tooltip,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Chip,
  Stack,
} from "@mui/material";
import { ChevronRight } from "lucide-react";
import { CustomButton } from "../../../../../styles/muiRoot";
import dayjs from "dayjs";
import { QueryEnum } from "../../../../../styles/muiRoot";
import { Image } from "antd";

export const DoubtCard = ({
  style,
  assignFunc,
  solveFunc,
  mediaContent,
  buttons,
  doubtId,
  status,
  ...others
}) => {
  console.log("🚀 ~ others:", doubtId);
  return (
    <Card
      sx={{
        width: "100%",
        fontFamily: "var(--font-inter)",
        borderRadius: 2,
        p: 1,
        position: "relative",

        ...style,
      }}
    >
      <Chip
        className="absolute top-0 right-0  "
        label="Group Query"
        sx={{
          background:
            doubtId && doubtId?.type === "group"
              ? QueryEnum.GROUP
              : doubtId?.type === "class"
              ? QueryEnum.CLASS
              : QueryEnum.OTHER,
          color: "white",
          font: "600 14px var(--font-inter)",
          borderRadius: "0 5px 0px 5px",
        }}
      />
      <CardHeader
        sx={{ m: 0, pb: 0 }}
        avatar={
          <Avatar
            alt="Remy Sharp"
            src={doubtId?.createdBy?.profilePic}
            sx={{ width: 56, height: 56 }}
          />
        }
        title={
          <div className="flex items-center font-inter ">
            {doubtId?.createdBy?.name || "N/A"}
          </div>
        }
        subheader={
          <div className="text-sm font-inter "> {doubtId?.createdBy?._id}</div>
        }
      />
      <CardContent className="text-sm font-inter font-[600] text-primary overflow-scroll ">
        <h4 className="text-sm text-secondary flex items-center">
          Group - {doubtId?.groupId?.title} <ChevronRight size="15" /> Topic:{" "}
          {doubtId?.topicId?.title}
        </h4>
        <h5 className="text-xs text-primary flex items-center font-light">
          Doubt Id - {doubtId?._id}
        </h5>
        <p className="text-sm font-normal my-2 min-h-[30px] ">
          {others.isTruncate ? (
            <Tooltip placement="top" arrow title={doubtId?.title}>
              {doubtId?.title}
            </Tooltip>
          ) : (
            doubtId?.title
          )}
        </p>

        <Stack
          className="scrollbar-hide"
          direction={"row"}
          spacing={2}
          sx={{ overflow: "scroll", mb: 10, position: "unset" }}
        >
          {doubtId?.media.map((url) => {
            const isImage =
              url?.endsWith("jpg") ||
              url?.endsWith("jpeg") ||
              url?.endsWith("png") ||
              url?.endsWith("gif");

            return isImage ? (
              <Image
                loading="lazy"
                key={url}
                src={url}
                preview={{
                
                  zIndex: 1300,
                  height: "fit-content",
              
                }}
                style={{
                  height: mediaContent?.mediaHeight || 100,
                  width: mediaContent?.mediaWidth || 100,
                  borderRadius: 5,
                }}
              />
            ) : (
              <Image
                key={url}
                width={100}
                preview={{
                  maskClassName: "rounded-md",
                  zIndex: 1300,
                  height: "fit-content",
                  destroyOnClose: true,
                  imageRender: () => (
                    <video
                      muted
                      width="100%"
                      controls
                      src={url}
                      style={{ width: "50vw", height: "50vh" }}
                    />
                  ),
                  toolbarRender: () => null,
                }}
                src={url}
              />
            );
          })}
        </Stack>
      </CardContent>

      <CardActions
        sx={{
          position: "absolute",
          bottom: 3,
          flexDirection: "column",
          gap: 2,
          justifyContent: "flex-start",
          left: 0,
          textAlign: "start",
        }}
      >
        <div className="mr-auto ml-3">
          {/* =========================CONDITIONAL RENDERING BEHALF OF STATUS======================================== */}
          {doubtId?.doubtSolver === null ||
          doubtId?.doubtSolver === undefined ? (
            <h4 className="text-secondary text-sm font-inter text-red-700">
              NOT ASSIGNED
            </h4>
          ) : status?.toLowerCase() === "claimed" ? (
            <>
              <h4 className="text-secondary text-sm font-inter">Claimed By:</h4>
              <p>{doubtId?.doubtSolver?.name}</p>
            </>
          ) : status?.toLowerCase() === "assignedtoother" ? (
            <>
              <h4 className="text-secondary text-sm font-inter">
                Assigned To:
              </h4>
              <p>
                {doubtId?.doubtSolver?.name}
                <span className="text-red-600 font-normal ml-2 text-xs">
                  No response Since 1 hr
                </span>
              </p>
            </>
          ) : status?.toLowerCase() === "assigned" ? (
            <>
              <h4 className="text-secondary text-sm font-inter">
                Assigned to you
              </h4>
            </>
          ) : null}
        </div>

        {buttons?.length > 0 &&
          buttons.map((item, i) => (
            <CustomButton key={i} style={item.style} onClick={item.func}>
              {item.name}
            </CustomButton>
          ))}
        {others?.actions}
      </CardActions>

      <footer className="absolute bottom-1 right-2">
        <p className="text-right text-secondary text-xs">
          {dayjs.utc(doubtId?.createdAt)?.format(`MMMM D, YYYY`)}
        </p>
      </footer>
    </Card>
  );
};

export const DoubtReAssignCard = ({
  style,
  assignFunc,
  solveFunc,
  mediaContent,
  buttons,
  status,
  ...others
}) => {
  return (
    <Card
      sx={{
        width: "100%",
        fontFamily: "var(--font-inter)",
        borderRadius: 2,
        p: 1,
        position: "relative",

        ...style,
      }}
    >
      <Chip
        className="absolute top-0 right-0  "
        label="Group Query"
        sx={{
          background:
            others && others?.type === "group"
              ? QueryEnum.GROUP
              : others?.type === "class"
              ? QueryEnum.CLASS
              : QueryEnum.OTHER,
          color: "white",
          font: "600 14px var(--font-inter)",
          borderRadius: "0 5px 0px 5px",
        }}
      />
      <CardHeader
        sx={{ m: 0, pb: 0 }}
        avatar={
          <Avatar
            alt="Remy Sharp"
            src={others?.createdBy?.profilePic}
            sx={{ width: 56, height: 56 }}
          />
        }
        title={
          <div className="flex items-center font-inter ">
            {others?.createdBy?.name || "N/A"}
          </div>
        }
        subheader={
          <div className="text-sm font-inter "> {others?.createdBy?._id}</div>
        }
      />
      <CardContent className="text-sm font-inter font-[600] text-primary">
        <h4 className="text-sm text-secondary flex items-center">
          Group - {others?.groupId?.title} <ChevronRight size="15" /> Topic:{" "}
          {others?.topicId?.title}
        </h4>
        <h5 className="text-xs text-primary flex items-center font-light">
          Doubt Id - {others?._id}
        </h5>
        <p className="text-sm font-normal my-2 min-h-[30px]">
          {others.isTruncate ? (
            <Tooltip placement="top" arrow title={others?.title}>
              {others?.title}
            </Tooltip>
          ) : (
            others?.title
          )}
        </p>

        <div className=" flex flex-wrap gap-4 items-center justify-start mb-10">
          {others?.media.map((url) => {
            const isImage =
              url?.endsWith("jpg") ||
              url?.endsWith("jpeg") ||
              url?.endsWith("png") ||
              url?.endsWith("gif");

            return isImage ? (
              <Image
                loading="lazy"
                key={url}
                src={url}
                preview={{
                  maskClassName: "rounded-md",
                  zIndex: 1300,
                  height: "fit-content",
                }}
                style={{
                  height: mediaContent?.mediaHeight || 100,
                  width: mediaContent?.mediaWidth || 100,
                  borderRadius: 5,
                  margin: "8px 0", // Adjusted for spacing
                }}
              />
            ) : (
              <Image
                key={url}
                width={100}
                preview={{
                  maskClassName: "rounded-md",
                  zIndex: 1300,
                  height: "fit-content",
                  destroyOnClose: true,
                  imageRender: () => (
                    <video
                      muted
                      width="100%"
                      controls
                      src={url}
                      style={{ width: "50vw", height: "50vh" }}
                    />
                  ),
                  toolbarRender: () => null,
                }}
                src={url}
              />
            );
          })}
        </div>
      </CardContent>

      <CardActions
        sx={{
          position: "absolute",
          bottom: 0,
          flexDirection: "column",
          gap: 2,
          justifyContent: "flex-start",
          left: 0,
        }}
      >
        <div className="ml-[-15px]">
          {/* =========================CONDITIONAL RENDERING BEHALF OF STATUS======================================== */}
          {others?.doubtSolver === null || others?.doubtSolver === undefined ? (
            <h4 className="text-secondary text-sm font-inter text-red-700">
              NOT ASSIGNED
            </h4>
          ) : status?.toLowerCase() === "claimed" ? (
            <>
              <h4 className="text-secondary text-sm font-inter">Claimed By:</h4>
              <p>{others?.doubtSolver?.name}</p>
            </>
          ) : status?.toLowerCase() === "assignedtoother" ? (
            <>
              <h4 className="text-secondary text-sm font-inter">
                Assigned To:
              </h4>
              <p>
                {others?.doubtSolver?.name}
                <span className="text-red-600 font-normal ml-2 text-xs">
                  No response Since 1 hr
                </span>
              </p>
            </>
          ) : status?.toLowerCase() === "assigned" ? (
            <>
              <h4 className="text-secondary text-sm font-inter">
                Assigned to you
              </h4>
            </>
          ) : null}
        </div>

        {buttons?.length > 0 &&
          buttons.map((item, i) => (
            <CustomButton key={i} style={item.style} onClick={item.func}>
              {item.name}
            </CustomButton>
          ))}
        {others?.actions}
      </CardActions>
      <footer className="absolute bottom-1 right-2">
        <p className="text-right text-secondary text-xs">
          {dayjs.utc(others?.createdAt)?.format(`MMMM D, YYYY`)}
        </p>
      </footer>
    </Card>
  );
};
