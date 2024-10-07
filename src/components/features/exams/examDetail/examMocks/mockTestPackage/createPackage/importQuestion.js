import React, { useEffect, useState, useDeferredValue, useMemo } from "react";
import {
  CustomButton,
  ButtonStyle,
  CustomButtonStyle,
} from "../../../../../../../styles/muiRoot";
import { ChevronRight, PlusCircle, X } from "lucide-react";
import {
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Button,
  Avatar,
  Modal,
} from "@mui/material";
import InputWithIcon from "../../../../../../common/searchBox";
import MultipleSelectTable from "../../../../../../common/tableMultipleSelect";
import { useParams } from "react-router-dom";
import { useGetMockListQuery, useLazyGetMockListQuery } from "../../../../../../../services/apis/exam/mock";
import {
  setMockPackageList,
  setView,
} from "../../../../../../../ducks/mockPackageSlice";
import { useDispatch, useSelector } from "react-redux";

import PaginationTable from "../../../../../../common/PaginationTable";
import { toast } from "react-toastify";
import SearchField from "../../../../../../common/searchField";
import { mockTestHeader } from "../../../../../../../services/constHeaders";
import { Empty } from "antd";

const ImportQuestionModal = React.memo(({ modalTrigger, setModalTrigger }) => {
  // Memoize the component
  const dispatch = useDispatch();
  const params = useParams();

  const[trigger, {
    data: mockData,
    isLoading,
    isFetching,
    isError,
  } ]= useLazyGetMockListQuery();


  const { mockPackageList } = useSelector((state) => state.mockPackage);
  const { examDetails } = useSelector((state) => state.exam);


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true)
  trigger(`exams/v1/mockTest/entity/${params.examId}`)
};
  const handleClose = () => setOpen(false);
  const [values, setValues] = useState(mockPackageList);
  const [tableData, setTableData] = useState(mockData?.data);
  const [activeId, setActiveId] = useState("");

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

  useEffect(() => {
    if (examDetails && examDetails?.subjects?.length > 0)
      handleData(examDetails?.subjects[0]._id);
  }, [examDetails, mockData]); 

  const handleData = (id) => {
    console.log("id", id);
    const getSectionData = mockData?.data.filter((e) =>
      e.sections.some((e) => e.section._id === id)
    );

    setTableData(getSectionData);
    setActiveId(id);
    // return getSectionData;
  };



  const [filterWrapper, setFilterWrapper] = useState([]);

  console.log("values fror table", mockData?.data);

  console.log("jkoomok", tableData);

  return (
    <>
      {!mockPackageList.length && (
        <CustomButton
          startIcon={<PlusCircle />}
          onClick={handleOpen}
          style={{
            ...ButtonStyle,
            width: 186,
            borderRadius: 5,
            height: 45,
          }}
        >
          Import questions
        </CustomButton>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modalRoot">
          <div className="w-[1300px] h-[638px] p-2 overflow-hidden">
            {/* header */}
            <header className="flex justify-between items-start">
              <div className="basis-3/12">
                <h3 className="text-xl font-bold text-primary">
                  Add Mock Tests
                </h3>
                <h6 className="text-sm">CAT 2021</h6>
              </div>

              <div className="basis-7/12">
 
            
                
                <SearchField
              data={tableData }
              onFilter={(val) => setFilterWrapper(val)}
              searchBy={"title"}
              placeholder={"Search By Mocktest "}
              disabled={!tableData}
            />
              </div>

              <IconButton
                onClick={() => {
                  handleClose();
                  setValues(mockPackageList);
                }}
              >
                <X color="var(--primary)" />
              </IconButton>
            </header>

            {/* Content */}
            <div className="flex mt-4 h-full">
              <div className="basis-3/12 border-r">
                <h5 className="bg-[#F4F3FE] p-2 text-sm font-medium">
                  Subjects
                </h5>
                <List
                  disablePadding
                  className="text-secondary overflow-scroll h-[85%] py-2"
                >
                  {examDetails?.subjects?.map((item, ind) => (
                    <ListItemButton
                      selected={item._id === activeId}
                      sx={{
                        flexDirection: "row-reverse",
                        px: 1,
                        pe: 0,
                        color: item._id === activeId && "black",
                      }}
                      onClick={() => handleData(item._id)}
                    >
                      <ChevronRight size={20} />

                      <ListItemText>
                        <h6 className="text-sm font-medium  font-inter">
                          {ind + 1}. {item.title}
                        </h6>
                      </ListItemText>
                    </ListItemButton>
                  ))}
                </List>
              </div>

              <div className="basis-9/12 ">
                <h5 className="bg-[#F4F3FE] p-2 text-sm font-normal">
                  Mock Tests
                </h5>
                <div className="p-2 overflow-scroll h-[85%]">
                  {examDetails.subjects?.length === 0 ? (
                    <div className="flex justify-center items-center h-full w-full">
                      <Empty description="Some error occured" />
                    </div>
                  ) : filterWrapper?.length === 0 ? (
                    <div className="flex justify-center items-center h-full w-full">
                      <Empty description="No Data Found" />
                    </div>
                  ) : (
                    <>
                      <MultipleSelectTable
                        headCells={[
                          {
                            id: "title",

                            disablePadding: true,
                            label: "Mock test",
                            dataKey: "title",
                            type: "string",
                          },
                          {
                            id: "isPublished",
                            type: "boolean",
                            disablePadding: true,
                            label: "Publishing status",
                            dataKey: "isPublished",
                            showValue: {
                              true: (
                                <Avatar
                                  sx={{
                                    backgroundColor: "green",
                                    width: 15,
                                    height: 15,
                                    color: "green",
                                  }}
                                ></Avatar>
                              ),
                              false: (
                                <Avatar
                                  sx={{
                                    backgroundColor: "red",
                                    width: 15,
                                    height: 15,
                                    color: "red",
                                  }}
                                ></Avatar>
                              ),
                            },
                          },
                          {
                            id: "createdAt",
                            type: "date",
                            disablePadding: false,
                            label: "Test Date",
                            dataKey: "createdAt",
                          },
                          {
                            id: "No of Questions",
                            type: "truncateText",
                            disablePadding: false,
                            label: "No of Questions ",
                            dataKey: "questionNo",
                          },
                          {
                            id: "Price",
                            type: "string",
                            disablePadding: false,
                            label: "Price ",
                            dataKey: "price",
                          },
                        ]}
                        rows={filterWrapper || []}
                        value={values}
                        setValue={setValues}
                        loading={isLoading || isFetching}
                        error={isError}
                      />
                      <div className="text-end">
                        <CustomButton
                          onClick={() => {
                            if (values.length === 0) {
                              toast.error("Please Add at least one mock ");
                              return;
                            }
                            dispatch(setMockPackageList(values));
                            handleClose();
                          }}
                          style={{
                            ...CustomButtonStyle,
                            width: 186,
                            borderRadius: 5,
                            height: 45,
                          }}
                        >
                          Save
                        </CustomButton>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
});

function ImportQuestion() {
  const dispatch = useDispatch();
  const { mockPackageList, activeView } = useSelector(
    (state) => state.mockPackage
  );
  const [modalTrigger, setModalTrigger] = useState(false);

  const [filterWrapper, setFilterWrapper] = React.useState(
    mockPackageList || []
  );

  console.log("modal", modalTrigger);
  return (
    <>
      <div className="bg-white h-full w-full">
        {mockPackageList.length > 0 ? (
          <div className="p-2 pt-0">
            <>
              <PaginationTable
                data={filterWrapper}
                searchBar={
                  <SearchField
                    data={mockPackageList}
                    onFilter={(val) => setFilterWrapper(val)}
                    searchBy={"title"}
                    placeholder={"Search By Mock test name"}
                  />
                }
                comp={
                  <CustomButton
                    startIcon={<PlusCircle />}
                    onClick={() => setModalTrigger(true)}
                    style={{
                      ...CustomButtonStyle,
                      width: 186,
                      borderRadius: 5,
                      height: 45,
                      mb: 24,
                    }}
                  >
                    Add More
                  </CustomButton>
                }
                columns={mockTestHeader}
                // path={`/main/exam/${params.examId}/mocks`}
                loading={mockPackageList ? false : true}
              />
            </>

            <ImportQuestionModal
              modalTrigger={modalTrigger}
              setModalTrigger={setModalTrigger}
            />
          </div>
        ) : (
          <div className="text-center absolute top-[50%] left-[50%]  ">
            <h5 className="text-gray-700 font-semibold font-inter text-base">
              To create package of mocktest, bring in mocktests created
            </h5>
            <br />
            <ImportQuestionModal
              modalTrigger={modalTrigger}
              setModalTrigger={setModalTrigger}
            />
          </div>
        )}
      </div>
      <CustomButton
        style={{
          ...CustomButtonStyle,
          float: "right",
          position: "absolute",
          right: 15,
          bottom: 30,
        }}
        onClick={() => {
          if (mockPackageList.length === 0) {
            toast.error("Please select at least one mock");
            return;
          }
          dispatch(setView(activeView + 1));
        }}
      >
        Save & continue
      </CustomButton>
    </>
  );
}

export default React.memo(ImportQuestion);
