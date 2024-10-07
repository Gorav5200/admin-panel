import { CircularProgress, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { entityTypeApi, topicApi } from "./Constant";
import { Empty } from "antd";
import { useGetTopicListQuery } from "./apis/dataManagement/topic";

export const GetTopicOrSubtopicByEntity = ({ entityType, ...props }) => {
  const {
    data: topicList,
    isLoading: topicLoading,
    isError: topicError,
    isSuccess: topicSuccess,
  } = useGetTopicListQuery(
    `${entityTypeApi.endPoint}/topic/subtopic/${entityType}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  console.log("🚀 ~ getTopicByEntity ~ topicList:", topicList);

  return (
    <>
      <FormControl fullWidth margin={props.margin || "normal"}>
        {props?.label && (
          <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        )}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={props.label}

          {...props}
        >
          {topicLoading ? (
            <MenuItem value="" disabled>
              <div className="flex flex-col justify-center items-center w-full ">
                <CircularProgress size={20} color="inherit" />
                Loading...
              </div>
            </MenuItem>
          ) : topicError ? (
            <MenuItem value="" disabled>
              Some error occured
            </MenuItem>
          ) : topicSuccess && topicList.data?.[props.getType]?.length === 0 ? (
            <MenuItem value="" disabled>
              <Empty description="No Data found" className="mx-auto" />
            </MenuItem>
          ) : (
            topicList &&
            topicList.data?.[props.getType]?.map(({ _id, title, name, value: val }) => (
              <MenuItem key={_id} value={_id ?? val}>
                {title ?? name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </>
  );
};


export const GetTopicOrSubtopicBySubject = ({ subject, ...props }) => {
  const {
    data: topicList,
    isLoading: topicLoading,
    isError: topicError,
    isSuccess: topicSuccess,
  } = useGetTopicListQuery(
    `${topicApi.endPoint}/subtopic/subject/${subject}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  console.log("🚀 ~ getTopicByEntity ~ topicList:", topicList);

  return (
    <>
      <FormControl fullWidth margin={props.margin || "normal"}>
        {props?.label && (
          <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
        )}
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label={props.label}

          {...props}
        >
          {topicLoading ? (
            <MenuItem value="" disabled>
              <div className="flex flex-col justify-center items-center w-full ">
                <CircularProgress size={20} color="inherit" />
                Loading...
              </div>
            </MenuItem>
          ) : topicError ? (
            <MenuItem value="" disabled>
              Some error occured
            </MenuItem>
          ) : topicSuccess && topicList.data?.[props.getType]?.length === 0 ? (
            <MenuItem value="" disabled>
              <Empty description="No Data found" className="mx-auto" />
            </MenuItem>
          ) : (
            topicList &&
            topicList.data?.[props.getType]?.map(({ _id, title, name, value: val }) => (
              <MenuItem key={_id} value={_id ?? val}>
                {title ?? name}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </>
  );
};