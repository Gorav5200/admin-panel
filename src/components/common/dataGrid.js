import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import { Search } from '@mui/icons-material';
import { CustomButton, ButtonStyle } from "../../styles/muiRoot";
import BasicModal from "./modal";
import DynamicTable from "./dynamicTable";
import Icon, { GreenUp, RedDown } from "./Icon";

const columns = [
  { field: "productName", headerName: "Product Name", width: 170 },
  { field: "userGrowth", headerName: "User Growth", width: 120 },
  { field: "premiumUsers", headerName: "Premium Users", width: 120 },
  { field: "totalRevenue", headerName: "Total Revenue", width: 120 },
  { field: "totalSales", headerName: "Total Sales", width: 120 },
  { field: "examDate", headerName: "Exam Date", width: 150 },
];

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 39, <ModalOpen />),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3, <ModalOpen />),
  createData("Eclair", 262, 16.0, 24, 6.0, <ModalOpen />),
  createData("Cupcake", 305, 3.7, 67, 4.3, <ModalOpen />),
  createData("Gingerbread", 356, 16.0, 49, 3.9, <ModalOpen />),
  createData("Gingerbread", 356, 16.0, 49, 3.9, <ModalOpen />),
  createData("Gingerbread", 356, 16.0, 49, 3.9, <ModalOpen />),
  createData("Gingerbread", 356, 16.0, 49, 3.9, <ModalOpen />),
  createData("Gingerbread", 356, 16.0, 49, 3.9, <ModalOpen />),
  createData("Gingerbread", 356, 16.0, 49, 3.9, <ModalOpen />),
  createData("Gingerbread", 356, 16.0, 49, 3.9, <ModalOpen />),
];

function ModalOpen() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const columns = [
    { dataKey: "Product Name", label: "Product Name", minWidth: 170 },
    { dataKey: "User Growth", label: "User Growth", align: "left" },
    {
      dataKey: "Premium Users",
      label: "Premium Users",
      align: "left",
    },
    {
      dataKey: "Total Revenue",
      label: "Total Revenue",
      align: "left",
    },
  ];

  return (
    <>
      {" "}
      <BasicModal open={open} handleClose={handleClose} handleOpen={handleOpen}>
        <header className="ps-2 flex justify-between items-center">
          <h4 className="text-xl font-inter font-semibold">CAT Exam</h4>
          <IconButton
            onClick={() => {
              handleClose();
            }}
          >
            <Icon name="X" size="25" />
          </IconButton>
        </header>
        <div>
          <DynamicTable
            columns={columns}
            style={{
              height: "20vh",
              width: 773,
              height: 443,
              overflow: "scroll",
            }}
            loading={false}
          />
        </div>
      </BasicModal>
      <CustomButton
        style={{
          ...ButtonStyle,
          fontSize: "14px",
          height: 34,
          width: 107,
          borderRadius: 5,
        }}
        onClick={handleOpen}
      >
        View Details
      </CustomButton>
    </>
  );
}

function createData(
  productName,
  userGrowth,
  premiumUsers,
  totalRevenue,
  totalSales,
  examDate
) {
  return {
    id: productName,
    productName,
    userGrowth,
    premiumUsers,
    totalRevenue,
    totalSales,
    examDate,

    history: [
      {
        date: "2020-01-05",
        customerId: "11091700",
        amount: 3,
      },
      {
        date: "2020-01-02",
        customerId: "Anonymous",
        amount: 1,
      },
    ],
  };
}

export default function CollapsibleDataGrid() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [filterModel, setFilterModel] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleFilterChange = (params) => {
    setFilterModel(params.filterModel);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <TableContainer component={Paper}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={rowsPerPage}
          page={page}
          rowCount={rows?.length}
          pagination
          autoHeight
          onFilterModelChange={handleFilterChange}
          filterModel={filterModel}
          components={{
            Toolbar: () => (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  padding: "5px 10px",
                }}
              >
                <IconButton color="primary" aria-label="search">
                  <Search />
                </IconButton>
                <input
                  type="text"
                  placeholder="Search"
                  style={{
                    flexGrow: 1,
                    border: "1px solid #ccc",
                    padding: "5px",
                  }}
                />
              </div>
            ),
          }}
        />
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows?.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}
