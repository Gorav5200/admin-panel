import React, { useState } from "react";
import {
  CardContent,
  Card,
  IconButton,
  Modal,
  Skeleton,
  CardMedia,
  CardActions,
  Typography,
} from "@mui/material";
import { CustomButton, ButtonStyle } from "../../../../styles/muiRoot";
import "../../../../styles/videoCards.css";
import Pagination from "@mui/material/Pagination";
import InputWithIcon from "../../../common/searchBox";
import { Check, X } from "lucide-react";
import { noteBank } from "../../../../services/Constant";
import { UploadOutlined } from "@mui/icons-material";
import { Empty } from "antd";
import {
  useFetchNotesQuery,
  useLazyFetchNotesQuery,
} from "../../../../services/apis/commonApi";
import { Document, Page, pdfjs } from "react-pdf";

// Add this line to avoid warnings about missing worker:
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

export const AddNotes = React.memo(({ topicId, values, setValues }) => {
  console.log("🚀 ~ AddNotes ~ values:", values);
  const [page, setPage] = React.useState(1);
  const [open, setOpen] = useState(false);

  // console.log("findthe value", findValue());
  // ?page=1&size=20
  const [trigger, { data, isLoading, isSuccess }] = useLazyFetchNotesQuery();

  const handleChange = (event, value) => {
    setPage(value);
  };
  const handleAdd = (data) => {
    // Check if the data is already in the values array
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

  console.log("datatata", data);
  console.log("🚀 ~ AddNotes ~ values:", values);

  return (
    <>
      <CustomButton
        onClick={async () => {
          setOpen(true);
          await trigger(`${noteBank.endPoint}/topic/${topicId}`);
        }}
        sx={{ ...ButtonStyle, height: 40, width: 120, borderRadius: 2 }}
        startIcon={<UploadOutlined />}
      >
        Add Notes
      </CustomButton>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modalRoot ">
          {/* header */}
          <header className="flex justify-between items-start mx-4">
            <div className="basis-3/12">
              <h3 className="text-2xl font-bold text-primary p-2 flex  items-center gap-2">
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
                  class="lucide lucide-notebook-tabs"
                >
                  <path d="M2 6h4" />
                  <path d="M2 10h4" />
                  <path d="M2 14h4" />
                  <path d="M2 18h4" />
                  <rect width="16" height="20" x="4" y="2" rx="2" />
                  <path d="M15 2v20" />
                  <path d="M15 7h5" />
                  <path d="M15 12h5" />
                  <path d="M15 17h5" />
                </svg>{" "}
                Attach Notes
              </h3>
            </div>

            <div className="basis-7/12">
              <InputWithIcon
                placeholder="Search for mocktests"
                //   onChange={(e) => setSearchTerm(e.target.value)}
                //   value={searchTerm}
              />
            </div>

            <IconButton onClick={() => setOpen(false)}>
              <X color="var(--primary)" />
            </IconButton>
          </header>

          <div className="flex gap-5 justify-center flex-wrap items-start h-[75vh] w-[80vw] overflow-scroll p-3">
            {isLoading ? (
              Array.from({ length: 20 }).map((_, ind) => (
                <div key={ind} className="skeleton-card">
                  {/* Skeleton loading */}
                </div>
              ))
            ) : isSuccess && data?.data?.noteBank.length === 0 ? (
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
              data?.data.noteBank.map((item, ind) => (
                <Card
                  key={ind}
                  sx={{ width: 300, boxShadow: 5, borderRadius: 3 }}
                >
                  <CardMedia
                    component={() => (
                      <Document file={item.media}>
                        <Page pageNumber={1} width={300} />
                      </Document>
                    )}
                    sx={{ width: "100%", height: 170 }}
                    title="pdf title"
                  />
                  <CardActions
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <h5
                        gutterBottom
                        className="font-inter text-base font-bold"
                      >
                        {item.title}
                      </h5>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </div>
                    <CustomButton
                      size="medium"
                      sx={{
                        borderRadius: 2,
                        transition: "all 0.2s ease-in-out",
                        bgcolor: values?.some((e) => e === item._id)
                          ? "black"
                          : "var(--med-grey)",
                        color: values?.some((e) => e === item._id)
                          ? "white"
                          : "black",
                        "&:hover": {
                          bgcolor: values?.some((e) => e === item._id)
                            ? "black"
                            : "var(--med-grey)",
                          color: values?.some((e) => e === item._id)
                            ? "white"
                            : "black",
                        },
                      }}
                      onClick={() => handleAdd(item._id)}
                      startIcon={
                        values?.some((e) => e === item._id) && (
                          <Check size={18} />
                        )
                      }
                    >
                      {values?.some((e) => e === item._id)
                        ? "Added"
                        : "Add Note"}
                    </CustomButton>
                  </CardActions>
                </Card>
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
