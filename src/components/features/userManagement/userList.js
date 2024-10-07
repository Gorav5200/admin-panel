import React, { useEffect, useState } from "react";
import Header from "../../common/header";
import useCustomRouter from "../../../services/utilities/customRouter";
import { useSelector } from "react-redux";
import Icon from "../../common/Icon";
import { CustomButton, CustomButtonStyle } from "../../../styles/muiRoot";
import FullWidthTabs from "../../common/tabChanger";
import {
  useGetUserListQuery,
  useGetAuthoritiesQuery,
} from "../../../services/apis/users";
import { usersApi } from "../../../services/Constant";
import PaginationTable from "../../common/PaginationTable";
import DebouncedInput from "../../common/searchApiField";
import { useLocation } from "react-router-dom";
import {
  IconButton,
  Popover,
  List,
  ListItemText,
  ListItemIcon,
  ListItemButton,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import ActionTable from "./tableComp";
import { useDispatch } from "react-redux";
import { resetUser } from "../../../ducks/userSlice";
import SingleSelect from "../../common/selectFields";
import { MoreVerticalIcon } from "lucide-react";
import { capitalizeFirstLetter } from "../../../services/common";

function UserList() {
  const { navigate } = useCustomRouter();
  const location = useLocation();
  const dispatch = useDispatch();
  const query = new URLSearchParams(location.search);
  const pageNo = parseInt(query.get("page")) || 1;
  const count = parseInt(query.get("count")) || 20;
  const searchTerm = query.get("search") || "";
  const [activeTab, setActiveTab] = useState(0);
  const [filterType, setFilterType] = useState("all");
   const [selected, setSelected] = useState([]);

  const {
    data: userData,
    isLoading,
    isError,
    isFetching,
  } = useGetUserListQuery(
    `${usersApi.endPoint}/all/list/${filterType}?page=${pageNo}&limit=${count}${
      searchTerm && `&search=${searchTerm}`
    }`,
    {
      refetchOnMountOrArgChange: true,
      skip:activeTab !== 0,
    }
  );

  console.log("is fetch", isFetching);

  const {
    data: authoritiesData,
    isLoading: loadingAuth,
    isError: isErrorAuth,
    isFetching: fetchingAuth,
  } = useGetAuthoritiesQuery(
    `${usersApi.endPoint}/list/authorities?page=${pageNo}&limit=${count}${
      searchTerm && `&search=${searchTerm}`
    }`,
    {
      refetchOnMountOrArgChange: true,
      skip:activeTab !== 1,
    }
  );

  const handleSearch = (term) => {
    navigate(
      `/main/user?page=1&count=${count}${term ? `&search=${term}` : ""}`
    );
  };

  const handlePageChange = async (data) => {
    navigate(
      `/main/user?page=${data.page}&count=${data.rowsPerPage}
     ${searchTerm ? `&search=${searchTerm}` : ""}`
    );
  };
  const columns = [
    { dataKey: "name", label: "User Name", minWidth: 170 },
    { dataKey: "roles", label: "Role", type: "array" },
    { dataKey: "phone", label: "Mobile Number", align: "left" },
    {
      dataKey: "email",
      label: "Email ID",

      align: "left",
    },
    {
      dataKey: "createdAt",
      label: "Joining Date",
      align: "left",
      type: "date",
    },
  ];

  useEffect(() => {
    dispatch(resetUser());
  }, []);
  console.log("list data from userlist", userData);

  return (
    <div>
      <Header content="User Management" />

      <FullWidthTabs
        setHeading={setActiveTab}
        data={[
          {
            item: 1,
            label: "User",
            content: (
              <ActionTable
                data={userData?.data?.users?.map(({ roles, ...others }) => ({
                  roles:roles.map(capitalizeFirstLetter).join(","),
                  ...others,
                }))}
                setValue={setSelected}
                value={selected}
                loading={isLoading || isFetching}
                isError={isError}
                columns={columns}
             
                count={userData?.data.totalItems}
                placeholder="Search for people"
                comp={
                  <div className="flex justify-start gap-3">
                    <SingleSelect
                      style={{ width: "170px" }}
                      size="small"
                      placeholder="Sort By ::"
                      name="type"
                      data={[
                        { title: "All", _id: "all" },
                        { title: "Member", _id: "member" },
                        { title: "Moderator", _id: "moderator" },
                        { title: "Teacher", _id: "teacher" },
                        { title: "Doubt Solver", _id: "doubtSolver" },
                      ]}
                      setData={(val) => setFilterType(val)}
                      value={filterType}
                      id="type"
                    />
                    <CustomButton
                      onClick={() => navigate("/main/user/add")}
                      variant="outlined"
                      startIcon={<Icon name="Plus" />}
                      style={{
                        ...CustomButtonStyle,
                        width: 150,
                      }}
                    >
                      Add User
                    </CustomButton>
                  </div>
                }
              />
            ),
          },
          {
            item: 2,
            label: "Authorities",
            content: (
              <PaginationTable
                data={authoritiesData?.data.data || []}
                loading={loadingAuth || fetchingAuth}
                isError={isErrorAuth}
                pageChange={handlePageChange}
                count={authoritiesData?.data.totalItems}
                searchBar={
                  <DebouncedInput
                    placeholder="Search for People "
                    onSearch={handleSearch}
                    loading={loadingAuth || fetchingAuth}
                    initialValue={searchTerm}
                    disabled={isErrorAuth}
                  />
                }
                comp={
                  <CustomButton
                    onClick={() => navigate("/main/user/add")}
                    variant="outlined"
                    startIcon={<Icon name="Plus" />}
                    style={{
                      ...CustomButtonStyle,
                      width: 150,
                    }}
                  >
                    Add User
                  </CustomButton>
                }
                placeholder="Search for people"
                columns={columns}
                path="/main/user/detail"
              />
         
            )
          },
        ]}
      />
    </div>
  );
}

export default UserList;

