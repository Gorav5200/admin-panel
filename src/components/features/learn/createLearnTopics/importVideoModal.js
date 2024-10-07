import React, {
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import { CardContent, Card, IconButton, Modal, Skeleton } from "@mui/material";
import { CustomButton } from "../../../../styles/muiRoot";
import "../../../../styles/videoCards.css";
import CardActions from "@mui/material/CardActions";
import Pagination from "@mui/material/Pagination";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import InputWithIcon from "../../../common/searchBox";
import { Check, Video, X } from "lucide-react";
import {
  useGetVideoQuery,
  useLazyGetVideoQuery,
} from "../../../../services/apis/commonApi";
import { videoBank } from "../../../../services/Constant";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Empty } from "antd";
import SearchField from "../../../common/searchField";

export const ImportVideoModal = React.memo((props) => {
  const { topic } = useSelector((state) => state.learn.newLearn);
  const [filterWrapper, setFilterWrapper] = React.useState([]);
  const [page, setPage] = useState(10);
  const [trigger, { data, isLoading, isSuccess, isFetching }] =
    useLazyGetVideoQuery();

  useEffect(() => {
    if (props.open) {
      trigger(`${videoBank.endPoint}/topic/${topic}`);
    }
  }, [props.open]);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <Modal
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modalRoot ">
          {/* header */}
          <header className="flex justify-between items-start mx-4">
            <div className="basis-3/12">
              <h3 className="text-2xl font-bold text-primary p-2 flex gap-2 items-center">
                <Video size={28} fill="black" /> Upload Video
              </h3>
            </div>

            <div className="basis-7/12">
              <SearchField
                data={data?.data.videoBank}
                onFilter={(val) => setFilterWrapper(val)}
                searchBy={"title"}
                placeholder={"Search By Mocktests"}
              />
            </div>

            <IconButton
              onClick={() => {
                props.handleClose();
              }}
            >
              <X color="var(--primary)" />
            </IconButton>
          </header>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 h-[75vh] w-[80vw] overflow-scroll p-3">
            {isLoading || isFetching ? (
              Array.from({ length: 20 }).map((_, ind) => (
                <div key={ind} className="skeleton-card">
                  <Skeleton variant="rounded" width={300} height={168} />
                  <Skeleton />
                  <Skeleton width="60%" />
                </div>
              ))
            ) : isSuccess && filterWrapper?.length === 0 ? (
              <div className="h-full w-[80vw] flex justify-center items-center">
                <Empty
                  description={
                    <h5 className="font-inter text-sm font-medium">
                      No data Found
                    </h5>
                  }
                />
              </div>
            ) : (
              filterWrapper?.map((item, ind) => (
                <MediaCard
                  data={item}
                  key={ind}
                  values={props.values}
                  setValues={props.setValues}
                />
              ))
            )}
          </div>

          <Card className="relative bottom-0 w-full">
            <CardContent
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pagination
                count={data?.count && data.count > 10 ? data.count / 10 : 1}
                shape="rounded"
                onChange={handleChange}
              />
            </CardContent>
          </Card>
        </div>
      </Modal>
    </>
  );
});

function MediaCard({ values, setValues, data }) {
  console.log("🚀 ~ MediaCard ~ values:", values);

  const handleAdd = (data) => {
    console.log("🚀 ~ handleAdd ~ data:", data);
    const index = values.indexOf(data);
    if (index !== -1) {
      // If data is found, remove it
      const newArr = [...values];
      newArr.splice(index, 1);
      setValues(newArr);
    } else {
      const newValue = [...values, data];
      // If data is not found, add it
      setValues(newValue);
    }
  };

  return (
    <Card
      sx={{ width: 350, boxShadow: 5, borderRadius: 3, height: "fit-content" }}
    >
      <CardMedia
        component="video"
        controls // Add controls to enable video playback controls
        sx={{ width: "100%", height: 170 }} // Set width to 100%
        title="Video Title"
      >
        <source src={data?.media} type="video/mp4" />
        Your browser does not support the video tag.
      </CardMedia>
      <CardActions sx={{ display: "flex", justifyContent: "space-between" }}>
        <div>
          <h5 gutterBottom className="font-inter text-base  font-bold">
            {data?.title}
          </h5>
          <Typography variant="body2" color="text.secondary">
            {data?.description}
          </Typography>
        </div>

        <div>
          <CustomButton
            size="medium"
            sx={{
              borderRadius: 2,
              transition: "all 0.2s ease-in-out",
              bgcolor: values?.some((e) => e === data._id)
                ? "black"
                : "var(--med-grey)",
              color: values?.some((e) => e === data._id) ? "white" : "black",
              "&:hover": {
                bgcolor: values?.some((e) => e === data._id)
                  ? "black"
                  : "var(--med-grey)",
                color: values?.some((e) => e === data._id) ? "white" : "black",
              },
            }}
            onClick={() => handleAdd(data._id)}
            startIcon={
              values?.some((e) => e === data._id) && <Check size={18} />
            }
          >
            {values?.some((e) => e === data._id) ? "Added" : "Add Video"}
          </CustomButton>
        </div>
      </CardActions>
    </Card>
  );
}
