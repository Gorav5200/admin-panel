import * as React from "react";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import { DataGrid, GridRowEditStopReasons } from "@mui/x-data-grid";
import { Button, IconButton, TextField } from "@mui/material";
import TimePickerComp from "../../../../common/timePicker";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import { X } from "lucide-react";

export default function FullFeaturedCrudGrid({
  data,
  selectedRows,
  setSelectedRows,
}) {
  const [rowModesModel, setRowModesModel] = React.useState({});
  const[updatedData,setUpdatedData]=React.useState(data)
  const [savedRows, setSavedRows] = React.useState([]);


  const handleRowEditStop = (params, event) => {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    return updatedRow;
  };

  const handleTimeChange = (newValue, id, fieldName) => {
    const data=[...updatedData]
    const updatedRows = data.map((row) =>
      row.id === id ? { ...row, [fieldName]: newValue } : row
    );
    setUpdatedData(updatedRows)
   
  };

  const isSelected = (row) => {
    return selectedRows.some((selectedRow) => selectedRow.id === row.id);
  };

  const handleSelectRow = (row) => (event) => {
    const isChecked = event.target.checked;
    if (isChecked) {
      setSelectedRows((prevSelectedRows) => [...prevSelectedRows, row]);
    } else {
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.filter((selectedRow) => selectedRow.id !== row.id)
      );
    }
  };
  const handleSaveClick = (id) => {
    const rowIndex = updatedData.findIndex((row) => row.id === id);
    if (rowIndex !== -1) {
      console.log(`Save clicked for row with ID ${id}.`);
  
      const updatedRow = updatedData[rowIndex];
      // Update only the selected row
      setSelectedRows((prevSelectedRows) =>
        prevSelectedRows.map((row) =>
          row.id === id ? { ...updatedRow, isNew: false } : row
        )
      );
      setSavedRows((prevSavedRows) => [...prevSavedRows, id]);

    }
  };


  const handleCancelClick = (id) => {
    // Implement your cancel logic here
    console.log(`Cancel clicked for row with ID ${id}.`);
    // Deselect the row and remove it from selectedRows
    setSelectedRows(selectedRows.filter((row) => row.id !== id));
  };

  const columns = [
    {
      field: "select",
      headerName: "",
      width: 50,
      renderCell: (params) => (
        <Checkbox
          checked={isSelected(params.row)}
          onChange={handleSelectRow(params.row)}
        />
      ),
    },
    {
      field: "question",
      headerName: "Questions",
      width: 180,
      align: "left",
      headerAlign: "left",
      editable: false,
    },
    {
      field: "question_type",
      headerName: "Question Type",
      width: 220,
      editable: false,
    },
    {
      field: "difficulty_level_manual",
      headerName: "Level",
      width: 220,
      editable: false,
    },
    {
      field: "timer",
      headerName: "Timer",
      width: 180,
      renderCell: (params) => {
        const isRowSelected = isSelected(params.row);
        return (
          <TextField
            size="small"
            type="number"
            value={params.value}
            variant="outlined"
            onChange={(e) =>
              isRowSelected &&
              handleTimeChange(e.target.value, params.id, "timer")
            }
            disabled={!isRowSelected}
          />
        );
      },
    },
    {
      field: "startTime",
      headerName: "Start Time",
      width: 180,
      renderCell: (params) => {
        const isRowSelected = isSelected(params.row);
        return (
          <TimePickerComp
            disabled={!isRowSelected}
            label="Start Time"
            value={params.value}
            setValue={(newValue) =>
              handleTimeChange(newValue, params.id, "startTime")
            }
          />
        );
      },
    },
    {
      field: "endTime",
      headerName: "End Time",
      width: 180,
      renderCell: (params) => {
        const isRowSelected = isSelected(params.row);
        return (
          <TimePickerComp
            disabled={!isRowSelected}
            label="End Time"
            value={params.value}
            setValue={(newValue) =>
              handleTimeChange(newValue, params.id, "endTime")
            }
          />
        );
      },
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        const isRowSelected = isSelected(params.row);
        const isSaved = savedRows.includes(params.row.id);

        if (isRowSelected && !isSaved) {
          return (
            <>
              <IconButton
                variant="outlined"
                color="primary"
                size="small"
                onClick={() => handleSaveClick(params.id)}
              >
                <SaveIcon />
              </IconButton>
              <IconButton
                color="primary"
                size="small"
                startIcon={<CancelIcon />}
                onClick={() => handleCancelClick(params.id)}
              >
                <X />
              </IconButton>
            </>
          );
        } else {
          return null;
        }
      },
    },
  ];
  console.log("🚀 ~ rowModesModel:", rowModesModel)

  return (
    <Box
      sx={{
        height: 400,
        width: "100%",
        "& .actions": {
          color: "text.secondary",
        },
        "& .textPrimary": {
          color: "text.primary",
        },
      }}
    >
      <DataGrid
        rows={updatedData}
        columns={columns}
        editMode="row"
       
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
      />
    </Box>
  );
}


