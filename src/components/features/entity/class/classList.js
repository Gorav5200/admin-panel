import * as React from "react";
import {
  Avatar,
  Skeleton,
  Table,
  TableContainer,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  TablePagination,
  Button,
} from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { useGetClassListQuery } from "../../../../services/apis/exam/class";
import { classApi } from "../../../../services/Constant";
import { dateFormatting } from "../../../../services/common";
import { resetClassState } from "../../../../ducks/exams/classSlice";
import { useDispatch } from "react-redux";
import DebouncedInput from "../../../common/searchApiField";
import dayjs from "dayjs";
import { Empty } from "antd";

function ClassList() {
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const dispatch = useDispatch();
  const query = new URLSearchParams(location.search);
  const [searchTerm, setSearchTerm] = React.useState(query.get("search") || "");
  const [page, setPage] = React.useState(
    parseInt(query.get("page") || "1", 10) - 1
  );
  const [rowsPerPage, setRowsPerPage] = React.useState(
    parseInt(query.get("count") || "10", 10)
  );

  React.useEffect(() => {
    dispatch(resetClassState());
  }, [dispatch]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    updateQueryParams(newPage + 1, rowsPerPage, searchTerm);
  };

  const handleChangeRowsPerPage = (event) => {
    const newRowsPerPage = parseInt(event.target.value, 10);
    setRowsPerPage(newRowsPerPage);
    setPage(0);
    updateQueryParams(1, newRowsPerPage, searchTerm);
  };

  const handleSearch = (val) => {
    setSearchTerm(val);
    setPage(0);
    updateQueryParams(1, rowsPerPage, val);
  };

  const updateQueryParams = (page, rowsPerPage, searchTerm) => {
    navigate({
      pathname: location.pathname,
      search: `?page=${page}&count=${rowsPerPage}${
        searchTerm ? `&search=${searchTerm}` : ""
      }`,
    });
  };

  const {
    data: classList,
    isLoading,
    isFetching,
    isSuccess
  } = useGetClassListQuery(
    `${classApi.endPoint}/?page=${page + 1}&count=${rowsPerPage}${
      searchTerm ? `&search=${searchTerm}` : ""
    }`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  return (
    <>
      <div className="p-3 flex justify-between items-center gap-4 sticky top-0">
        <div className="flex justify-between items-center w-full">
          <DebouncedInput
            placeholder="Search by Title"
            onSearch={handleSearch}
            loading={isLoading || isFetching}
            initialValue={searchTerm}
          />
          <Button
            variant="contained"
            startIcon={<PlusCircle size={18} />}
            onClick={() =>
              navigate(`/main/entity/${params.entityId}/class/create`)
            }
            sx={{
              backgroundColor: "var(--primary)",
              width: 178,
              height: 46,
              fontFamily: "var(--font-inter)",
              fontSize: 15,
              borderRadius: 2,
              textTransform: "none",
              float: "right",
              ":hover": {
                backgroundColor: "var(--primary)",
              },
            }}
          >
            Create Class
          </Button>
        </div>
      </div>

      <div className="flex flex-wrap justify-start gap-8 overflow-scroll h-[75vh] my-2 items-start">
        {isLoading || isFetching ? (
          <TableContainer sx={{ height: "75vh" }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {[...Array(5)].map((_, index) => (
                    <TableCell key={index} align="left">
                      <Skeleton />
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {Array.from({ length: 10 }).map((_, index) => (
                  <TableRow key={index}>
                    {[...Array(5)].map((_, ind) => (
                      <TableCell key={ind} align="left">
                        <Skeleton />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : isSuccess && classList?.data.classes.length === 0 ? (
          <div className="m-auto">
            <Empty Description="No Data Found" />
          </div>
        ) : (
          <div className="flex flex-wrap justify-start gap-8 overflow-scroll h-[75vh] pb-10 p-3 items-start w-full">
            <TableContainer component={Paper}>
              <Table>
                <TableHead sx={{ backgroundColor: "#f4f3fe" }}>
                  <TableRow>
                    <TableCell>Class Name</TableCell>
                    <TableCell>Publishing Status</TableCell>
                    <TableCell>Subject Name</TableCell>
                    <TableCell>Teacher</TableCell>
                    <TableCell>Class Date</TableCell>
                    <TableCell>Class Timing</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {classList?.data?.classes?.map((row) => (
                    <TableRow
                      key={row._id}
                      sx={{ cursor: "pointer" }}
                      onClick={() =>
                        navigate(
                          `/main/entity/${params.entityId}/class/${row._id}/detail`
                        )
                      }
                    >
                      <TableCell>{row.title}</TableCell>

                      <TableCell>
                        <Avatar
                          sx={{
                            width: 20,
                            height: 20,
                            bgcolor: row.isPublished ? "green" : "red",
                            color: "transparent",
                          }}
                        />
                      </TableCell>
                      <TableCell>{row.subject}</TableCell>
                      <TableCell>{row.teacher}</TableCell>
                      <TableCell>
                        {dateFormatting(row.startDate).date}
                      </TableCell>
                      <TableCell>
                        {dayjs.utc(row.startTime).format("HH:mm")}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={classList?.data?.total || 0}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </TableContainer>
          </div>
        )}
      </div>
    </>
  );
}

export default ClassList;
