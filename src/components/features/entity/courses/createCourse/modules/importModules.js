import React, { useEffect, useState, useDeferredValue, useMemo } from "react";
import {
  CustomButton,
  ButtonStyle,
  CustomButtonStyle,
} from "../../../../../../styles/muiRoot";
import { ChevronRight, PlusCircle, X } from "lucide-react";
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
import InputWithIcon from "../../../../../common/searchBox";
import MultipleSelectTable from "../../../../../common/tableMultipleSelect";
import { useParams } from "react-router-dom";
import { useGetMockListQuery } from "../../../../../../services/apis/exam/mock";
import {
  setMockPackageList,
  setView,
} from "../../../../../../ducks/mockPackageSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useGetModulesQuery } from "../../../../../../services/apis/modulesApi";
import { moduleApi } from "../../../../../../services/Constant";
import { moduleHeader } from "../../../../../../services/constHeaders";
import { setModules } from "../../../../../../ducks/exams/courseSlice";

const ImportModules = React.memo(() => {
  const dispatch = useDispatch();
  const params = useParams();
  const { data, isLoading, isError, isFetching, refetch } = useGetModulesQuery(
    `${moduleApi.endPoint}/list`,
    {
      refetchOnMountOrArgChange: true,
    }
  );
  console.log("🚀 ~ ImportModules ~ data:", data);
  const { entity } = useSelector((state) => state.entity);
  const { learn } = useSelector((state) => state.courses);
  const [open, setOpen] = React.useState(false);
  const [tableData, setTableData] = useState([]);
  const [values, setValues] = useState(learn?.modules || []);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    setTableData(data?.data.moduleList);
    setValues(learn.modules);
  }, [data, learn]);

  return (
    <>
      <CustomButton
        startIcon={<PlusCircle />}
        onClick={handleOpen}
        style={{
          ...ButtonStyle,
          width: 156,
          borderRadius: 5,
          height: 40,
        }}
      >
        Import Modules
      </CustomButton>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="modalRoot">
          <div className="w-[80vw] h-[60vh] px-2 overflow-scroll">
            {/* header */}
            <header className="flex justify-between items-center my-2 bg-[#F4F3FE] p-2 rounded-md">
              <div className="basis-3/12">
                <h3 className="text-lg font-bold text-primary">Add Modules</h3>
                <h6 className="text-sm">
                  {entity?.find((e) => e._id === params.entityId)?.title}
                </h6>
              </div>

              <div className="basis-7/12">
                {/* <InputWithIcon
                  placeholder="Search for Modules"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  value={searchTerm}
                /> */}
              </div>

              <IconButton
                onClick={() => {
                  handleClose();
                }}
              >
                <X color="var(--primary)" />
              </IconButton>
            </header>
            <Divider />

            {/* Content */}
            <div className=" mt-2 h-full">
              <div className="p-2 overflow-scroll ">
                {!isLoading && (
                  <MultipleSelectTable
                    headCells={moduleHeader}
                    rows={tableData || []}
                    value={values}
                    setValue={(val) => setValues(val)}
                    loading={isLoading || isFetching}
                  />
                )}

                <div className="text-end">
                  <CustomButton
                    onClick={() => {
                      // if (values.length === 0) {
                      //   toast.error("Please Add at least one Module ");
                      //   return;
                      // }
                      dispatch(setModules(values));
                      handleClose();
                    }}
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
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
});

export default React.memo(ImportModules);
