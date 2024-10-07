import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { useTheme } from "@mui/material/styles";
import OutlinedInput from "@mui/material/OutlinedInput";
import { Empty, Typography } from "antd";
import { CircularProgress } from "@mui/material";

export default function SingleSelect({
  style,
  size,
  data,
  setData,
  placeholder,
  variant,
  value,
  readOnly,
  ...props
}) {
  console.log("props", props);

  React.useEffect(() => {
    if (data?.length > 0) setData(data[0]?._id);
  }, []);

  const handleChange = (event) => {
    setData(event.target.value);
  };

  return (
    <FormControl
      variant={variant}
      sx={{ minWidth: 120, width: style?.width, ...style }}
    >
      <Select value={value} onChange={handleChange} size={size} {...props}>
        <MenuItem value="" disabled>
          <em>{placeholder}</em>
        </MenuItem>
        {data?.map((item) => (
          <MenuItem key={item._id} value={item._id}>
            {item.title}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export function MultipleSelect({
  setValue,
  size,
  loading,
  error,
  isSuccess,
  data,
  getStyles,
  MenuProps,
  ...props
}) {
  console.log("🚀 ~ MultipleSelect ~ props:", props);

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setValue(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
    if (!Array.isArray(value) || value.length === 0) {
      setValue([]);
    }
  };

  return (
    <div>
      <FormControl sx={{ width: props.style?.width || 300, ...props.style }}>
        {props?.label && (
          <InputLabel
            shrink
            htmlFor="sectionsSelect"
            sx={{
              fontSize: 20,
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              color: "#455564",
            }}
          >
            {props?.label}
          </InputLabel>
        )}
        <Select
          multiple
          displayEmpty
          value={props.value}
          disabled={props?.disabled}
          onChange={handleChange}
          input={<OutlinedInput />}
          size={size}
          renderValue={(selected) => {
            console.log("🚀 ~ MultipleSelect ~ selected:", selected, data);

            const selectedTitles = selected?.map((selectedId) => {
              const selectedItem = data?.find(
                (item) => item._id === selectedId
              );
              return selectedItem ? selectedItem.title : ""; // Return title or empty string if not found
            });
            console.log(selectedTitles, "selectedTitles");

            return selectedTitles?.join(", ");
          }}
          MenuProps={MenuProps}
          inputProps={{ "aria-label": "Without label" }}
        >
          {loading ? (
            <MenuItem value="" disabled>
              <div className="flex flex-col justify-center items-center w-full ">
                <CircularProgress size={20} color="inherit" />
                Loading...
              </div>
            </MenuItem>
          ) : error ? (
            <MenuItem value="" disabled>
              Some error occurred
            </MenuItem>
          ) : isSuccess && data?.length === 0 ? (
            <MenuItem value="" disabled>
              <Empty description="No Data found" className="mx-auto" />
            </MenuItem>
          ) : (
            data &&
            data?.map((item) => (
              <MenuItem
                key={item._id}
                value={item._id}
                // style={getStyles(item._id, props.value, theme)}
              >
                {item.title}
              </MenuItem>
            ))
          )}
        </Select>
      </FormControl>
    </div>
  );
}

export const MultiSelectOutlined = ({
  loading,
  error,
  isSuccess,
  data,
  handleChange,
  ...props
}) => {
  return (
    <FormControl fullWidth margin={props.margin || "normal"}>
      {props?.label && (
        <InputLabel id="demo-simple-select-label">{props.label}</InputLabel>
      )}
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label={props.label}
        {...props}
      >
        {loading ? (
          <MenuItem value="" disabled>
            <div className="flex flex-col justify-center items-center w-full ">
              <CircularProgress size={20} color="inherit" />
              Loading...
            </div>
          </MenuItem>
        ) : error ? (
          <MenuItem value="" disabled>
            Some error occured
          </MenuItem>
        ) : isSuccess && data?.length === 0 ? (
          <MenuItem value="" disabled>
            <Empty description="No Data found" className="mx-auto" />
          </MenuItem>
        ) : (
          data &&
          data?.map(({ _id, title, name, value: val }) => (
            <MenuItem key={_id} value={_id ?? val}>
              {title ?? name}
            </MenuItem>
          ))
        )}
      </Select>
    </FormControl>
  );
};
