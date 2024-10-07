import React, { useState } from "react";
import { HeaderWithNavigation } from "../../common/header";
import {
  Typography,
  IconButton,
  FormControl,
  Select,
  InputLabel,
  MenuItem,
  Checkbox,
  TextField,
  Button,
  Divider,
  Card,
  CardContent,
  Chip,
  Box,
} from "@mui/material";
import OutlinedInput from "@mui/material/OutlinedInput";
import DatePickerComp from "../../common/datePicker";
import { Height } from "@mui/icons-material";

const topics = [
  {
    _id: "64feef6274d1bdc726bdc5c8",

    title: "Arithmatic",
  },
  {
    _id: "64feef6274d1bdc726bdc5c8",

    title: "Arithmatic",
  },
];

const subTopics = [
  { _id: "64fef00db3d7035a12c35390", title: " Percentages" },
  {
    _id: "64fef00db3d7035a12c35390",
    title: "Percentages",
  },
];

const initialState = {
  qid: "1234",
  uid: "",
  entity_type_id: "650445c6fc904d452998918c",
  subject_id: "",
  topic_id: "",
  subtopic_id: "",
  difficulty_level: "",
  question: null,
  answer: null,
  options: [],
  explanations: null,
  video_link: "",
  video_data: "",
  allowed_for: [],
  marks: "",
  question_type: "",
  check: false,
  context: null,
};

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

function Schedule() {
  const [values, setValues] = useState(initialState);

  const handleChange = (event) => {
    //this function for  getting the data by name from event
    const name = event.target.name;
    const value =
      event.target.name === "check" ? event.target.checked : event.target.value;
    setValues({ ...values, [name]: value });
  };

  return (
    <div className="h-full bg-white">
      <HeaderWithNavigation cont="Schedule Spot" />
      <div className="flex h-[93vh] ">
        <div className="basis-9/12 5 mt-3 ml-8">
          <div className="w-5/6 flex flex-col gap-8">
            <div>
              <label
                htmlFor="Exam name"
                className="text-base font-semibold ms-1"
              >
                Exam Name
              </label>

              <FormControl sx={{ mt: 2, width: "100%" }}>
                <InputLabel id="demo-multiple-name-label">Option</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={values.topic_id}
                  name="topic_id"
                  required
                  onChange={handleChange}
                  input={<OutlinedInput label="Option" />}
                  MenuProps={MenuProps}
                >
                  {topics?.map((item) => (
                    <MenuItem key={item.name} value={item._id}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            
            <div>
              <label
                htmlFor="Sub Module"
                className="text-base font-semibold ms-1"
              >
                Sub Module
              </label>

              <FormControl sx={{ mt: 2, width: "100%" }}>
                <InputLabel id="demo-multiple-name-label">Option</InputLabel>
                <Select
                  labelId="demo-multiple-name-label"
                  id="demo-multiple-name"
                  value={values.topic_id}
                  name="topic_id"
                  required
                  onChange={handleChange}
                  input={<OutlinedInput label="Option" />}
                  MenuProps={MenuProps}
                >
                  {topics?.map((item) => (
                    <MenuItem key={item.name} value={item._id}>
                      {item.title}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>

            <div className="flex justify-start gap-x-5 ">
            <div className="start-date">
            <label
                htmlFor="start Date"
                className="text-base font-semibold ms-1"
              >
             Start Date
              </label>
             <DatePickerComp style={{height:"1.4375em", mt:1}}/>
            </div>
            <div className="end-date">
            <label
                htmlFor="end Date"
                className="text-base font-semibold ms-1 "
              >
               End Date
              </label>
              {/* send this props --- data, setData, DynamicName, handleChange */}
             <DatePickerComp style={{height:"1.4375em", mt:1}} />
            </div>
            </div>
            {/* Course and select gt */}
          
            <div className="mt-10">
              <label
                htmlFor="redirect to "
                className="text-base font-semibold ms-1"
              >
                Redirect to
              </label>

              <div className="flex gap-5">
                <FormControl sx={{ mt: 2, width: "100%"}}>
                  <InputLabel id="demo-multiple-name-label">Course </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    value={values.topic_id}
                    name="Course "
                    required
                    onChange={handleChange}
                    input={<OutlinedInput label="Course " />}
                    MenuProps={MenuProps}
                  >
                    {topics?.map((item) => (
                      <MenuItem key={item.name} value={item._id}>
                        {item.title}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <FormControl sx={{ mt: 2, width: "100%" }}>
                  <InputLabel id="demo-multiple-name-label">
                    -select Course -
                  </InputLabel>
                  <Select
                    labelId="demo-multiple-name-label"
                    id="demo-multiple-name"
                    name="selectCourse"
                    value={values.subject_id}
                    required
                    onChange={handleChange}
                    input={<OutlinedInput label="-select Course -" />}
                    MenuProps={MenuProps}
                  >
                    {subTopics?.map((item) => (
                      <MenuItem key={item.name} value={item.sectionId}>
                        {item.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>
          </div>
        </div>
        <div className=" px-3 py-1 w-full basis-3/12">
          <div className="bg-medGrey h-full rounded-md px-2">
            <h5 className="text-primary text-xl font-bold font-inder p-2">
              Preview
            </h5>
            <div className="bg-white h-[84vh] m-1 rounded-md"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
