import React, { useEffect, useState, useDeferredValue, useMemo } from "react";
import {
  CustomButton,
  ButtonStyle,
  CustomButtonStyle,
} from "../../../../styles/muiRoot";
import { PlusCircle, Table, X } from "lucide-react";

import {
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Button,
  Avatar,
  Modal,
  Divider,
} from "@mui/material";
import InputWithIcon from "../../../common/searchBox";
import MultipleSelectTable from "../../../common/tableMultipleSelect";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Empty } from "antd";
import { filterData } from "../../../../services/common";
import {
  useGetQuestionListQuery,
  useLazyGetQuestionListQuery,
} from "../../../../services/apis/exam/questionBank";
import { questionApi } from "../../../../services/Constant";
import { questionBankHeader } from "../../../../services/constHeaders";
import SearchField from "../../../common/searchField";
const ImportPracticeModal = React.memo(
  ({ modalTrigger, setModalTrigger, updatePractice, value }) => {
    // Memoize the component
    const { newLearn } = useSelector((state) => state.learn);
    const [trigger, { data: questionListRes, isLoading, isFetching, isError }] =
      useLazyGetQuestionListQuery();

    const [filterQuestions, setFilterQuestions] = React.useState([]);
    const [open, setOpen] = React.useState(false);

    const handleOpen = async () => {
      setOpen(true);
      await trigger(`${questionApi.endPoint}/topic/${newLearn.topic}`);
    };

    const handleClose = () => setOpen(false);
    const [values, setValues] = useState([]);

    useEffect(() => {
      setValues(value);
    }, [value]);

    useEffect(() => {
      if (modalTrigger === true) {
        handleOpen();
      }

      return () => {
        if (setModalTrigger) {
          setModalTrigger(false);
        } else {
          return null;
        }
      };
    }, [modalTrigger]);

    const handleSave = () => {
      updatePractice(values);
      handleClose();
    };

    return (
      <>
        <div
          className="group relative flex justify-center items-center text-zinc-600 text-sm font-bold"
          onClick={handleOpen}
        >
          <div className="absolute opacity-0 group-hover:opacity-100 group-hover:-translate-y-[150%] -translate-y-[300%] duration-500 group-hover:delay-500 skew-y-[20deg] group-hover:skew-y-0 shadow-md">
            <div className="shadow-md bg-grey-200 absolute bottom-0 translate-y-1/2 left-1/2 translate-x-full rotate-45 p-1"></div>
            <div className="rounded-md bg-white group-hover:opacity-0 group-hover:scale-[115%] group-hover:delay-700 duration-500 w-full h-full absolute top-0 left-0">
              <div className="border-b border-r border-white bg-white absolute bottom-0 translate-y-1/2 left-1/2 translate-x-full rotate-45 p-1"></div>
            </div>
          </div>

          <div className="shadow-md flex items-center group-hover:gap-2 bg-gradient-to-br from-gray-800 to-gray-200 p-3 rounded-md cursor-pointer duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="white"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              class="lucide lucide-plus-circle"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="M8 12h8" />
              <path d="M12 8v8" />
            </svg>
            <span className="text-[0px] group-hover:text-sm duration-300 text-white">
              Add Questions
            </span>
          </div>
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div className="modalRoot">
            <div className="w-[80vw] h-[80vh] px-2 overflow-scroll py-0">
              {/* header */}
              <header className="flex justify-between items-start sticky top-0 bg-white z-50  border-b">
                <div className="basis-3/12">
                  <h3 className="text-xl font-bold text-primary">
                    Add Questions
                  </h3>
                  <h6 className="text-sm">{newLearn?.title}</h6>
                </div>

                <div className="basis-7/12">
                  <SearchField
                    data={questionListRes?.data.question_banks}
                    onFilter={(val) => setFilterQuestions(val)}
                    searchBy={"title"}
                    placeholder={"Search By Mocktests"}
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

              {/* Content */}
              <div className="mt-4  ">
                <div className="w-full">
                  <h5 className="bg-[#F4F3FE] p-2 text-sm font-normal">
                    {filterQuestions?.length} Questions
                  </h5>

                  {!isLoading && filterQuestions?.length === 0 ? (
                    <div className="h-full flex justify-center items-center ">
                      <Empty />
                    </div>
                  ) : (
                    <div className="p-2 h-full">
                      <MultipleSelectTable
                        headCells={questionBankHeader}
                        rows={filterQuestions || []}
                        value={values}
                        setValue={setValues}
                        loading={isLoading || isFetching}
                        error={isError}
                      />

                      <div className="float-right">
                        <CustomButton
                          onClick={handleSave}
                          style={{
                            ...CustomButtonStyle,
                            width: 186,
                            borderRadius: 5,
                            height: 45,
                          }}
                        >
                          Save Changes
                        </CustomButton>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </>
    );
  }
);

function CreatePractice({ updatePractice, value }) {
  const [modalTrigger, setModalTrigger] = useState(false);
  return (
    <>
      <ImportPracticeModal
        modalTrigger={modalTrigger}
        setModalTrigger={setModalTrigger}
        updatePractice={updatePractice}
        value={value}
      />
    </>
  );
}

export default React.memo(CreatePractice);
