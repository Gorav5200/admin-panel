import * as React from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { CircularProgress } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

function getStyles(title, data, theme) {
  return {
    fontWeight:
      data.indexOf(title) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export function MultipleSelectChipComp({
  value,
  handleChange,
  data,
  loading,
  error,
  ...props
}) {
  const theme = useTheme();

  const handleInternalChange = (event) => {
    const {
      target: { value },
    } = event;

    handleChange(typeof value === "string" ? value.split(",") : value);
  };

  const getChipLabel = (id, data) => {
    const selectedItem = data?.find((item) => item._id === id);
    return selectedItem ? selectedItem.title : "";
  };

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 200,
        width: 250,
      },
    },
  };

  return (
    <div>
      <FormControl sx={{ width: "100%" }}>
        <Select
          id="demo-multiple-chip"
          multiple
          size="small"
          maxRows={2}
          rows={1}
          value={value}
          {...props}
          onChange={handleInternalChange}
          input={
            <OutlinedInput id="select-multiple-chip" placeholder="Select" />
          }
          renderValue={(selected) => (
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={getChipLabel(value, data)} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {loading && (
            <MenuItem
              disabled
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                alignItems: "center",
              }}
            >
              {" "}
              <CircularProgress style={{ color: "inherit" }} size={18} />{" "}
              Loading...
            </MenuItem>
          )}
          {error && (
            <MenuItem
              disabled
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
                alignItems: "center",
              }}
            >
              Error loading data
            </MenuItem>
          )}
          {!loading &&
            !error &&
            data?.map(({ title, _id }) => (
              <MenuItem
                key={_id}
                value={_id}
                style={getStyles(title, data, theme)}
              >
                {title}
              </MenuItem>
            ))}
        </Select>
      </FormControl>
    </div>
  );
}
