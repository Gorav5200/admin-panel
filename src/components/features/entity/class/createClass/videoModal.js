import React, { useCallback, useDeferredValue, useState } from "react";
import { CardContent, Card, IconButton, Modal, Skeleton } from "@mui/material";
import "../../../../../styles/videoCards.css";
import Pagination from "@mui/material/Pagination";
import InputWithIcon from "../../../../common/searchBox";
import { X } from "lucide-react";
import { useGetVideoQuery } from "../../../../../services/apis/commonApi";
import { videoBank } from "../../../../../services/Constant";
import { useSelector } from "react-redux";
import { Empty } from "antd";
import { MediaCard } from "../../../../common/cards";


export const ImportVideoModal = React.memo((props) => {
  const { topic } = useSelector((state) => state.class.newClass);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [page, setPage] = React.useState(1);

  const { data, isLoading, isSuccess } = useGetVideoQuery(
    `${videoBank.endPoint}/topic/${topic}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  const handleChange = (event, value) => {
    setPage(value);
    console.log("ba", value);
  };

  console.log("dats of vdeo", data);

  return (
    <>
      <button
        style={{
          backgroundImage: "linear-gradient(to bottom right, #4a5568, #f7fafc)",
        }}
        onClick={handleOpen}
        className="rounded-md relative w-40 overflow-hidden h-11 cursor-pointer flex items-center border border-gray-500 bg-gray-500 group hover:bg-gray-500 active:bg-gray-500 active:border-gray-500"
      >
        <span className="text-white font-semibold ml-8 transform group-hover:translate-x-20 transition-all duration-300">
          {props.showVal || "Add Video"}
        </span>
        <span className="absolute right-0 h-full w-10 rounded-md bg-gradient-to-br from-gray-800 to-gray-200 flex items-center justify-center transform group-hover:translate-x-0 group-hover:w-full transition-all duration-300">
          {props.showVal ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="lucide lucide-circle-check-big text-white"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <path d="m9 11 3 3L22 4" />
            </svg>
          ) : (
            <svg
              className="svg w-8 text-white"
              fill="none"
              height="24"
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              viewBox="0 0 24 24"
              width="24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <line x1="12" x2="12" y1="5" y2="19"></line>
              <line x1="5" x2="19" y1="12" y2="12"></line>
            </svg>
          )}
        </span>
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modalRoot ">
          {/* header */}
          <header className="flex justify-between items-start mx-4">
            <div className="basis-3/12">
              <h3 className="text-2xl font-bold text-primary p-2">
                Upload Video
              </h3>
            </div>

            <div className="basis-7/12">
              <InputWithIcon
                placeholder="Search for mocktests"
                //   onChange={(e) => setSearchTerm(e.target.value)}
                //   value={searchTerm}
              />
            </div>

            <IconButton
              onClick={() => {
                handleClose();
              }}
            >
              <X color="var(--primary)" />
            </IconButton>
          </header>

          <div className="flex gap-5  justify-center flex-wrap items-start h-[75vh] w-[80vw] overflow-scroll p-3">
            {isLoading ? (
              Array.from({ length: 20 }).map((_, ind) => (
                <div key={ind} className="skeleton-card">
                  <Skeleton variant="rounded" width={300} height={168} />
                  <Skeleton />
                  <Skeleton width="60%" />
                </div>
              ))
            ) : isSuccess && data?.data?.videoBank.length === 0 ? (
              <div className="m-auto">
                <Empty
                  description={
                    <h5 className="font-inter text-sm font-medium">
                      No data Found
                    </h5>
                  }
                />
              </div>
            ) : (
              data?.data?.videoBank.map((item, ind) => (
                <MediaCard
                  data={item}
                  key={ind}
                  handleClose={handleClose}
                  setValues={props.setData}
                  values={props.data}
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
