import React, { useEffect, useState } from "react";
import { List, Divider, Box, Chip } from "@mui/material";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { ListItemAvatar, ListItemIcon } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { CustomButton, ButtonStyle } from "../../styles/muiRoot";
import Icon from "./Icon";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const AssignList = ({ buttonNames }) => {
  const [checked, setChecked] = React.useState([1]);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <List
      dense
      sx={{
        width: "100%",
        bgcolor: "background.paper",
        maxHeight: 300,
        overflow: "scroll",
      }}
    >
      {[...Array(30)].map((value, i) => {
        const labelId = `checkbox-list-secondary-label-${value}`;
        return (
          <div key={value?._id}>
            <ListItem sx={{ py: 2, px: 0, width: "100%" }} disablePadding>
              <ListItemAvatar>
                <Avatar
                  alt="Travis Howard"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCpj7w5FSVRyofzC1reh7jGN87NEmeCb7amwsyc2xEmjwv0cIYrR0MKpvzrCAKWgOOwiY&usqp=CAU"
                  sx={{ width: 40, height: 40 }}
                />
              </ListItemAvatar>
              <ListItemText id={labelId} primary={`Keshav Patel`} />
              <ListItemText id={labelId} primary={`ID: 654590`} />
              <ListItemText
                id={labelId}
                primary={
                  <div className="flex items-center">
                    <Icon name="Dot" color={"green"} size="35" /> Online
                  </div>
                }
              />
              <Box sx={{ flexGrow: 1 }} />
              <CustomButton
                style={{
                  ...ButtonStyle,
                  borderRadius: 5,
                  height: 40,
                  width: 108,
                  marginRight: "12px", // Adjust the margin as needed
                }}
              >
                {buttonNames[0]}
              </CustomButton>
            </ListItem>
            <Divider />
          </div>
        );
      })}
    </List>
  );
};

export default AssignList;







export function ListNormal({ data, style, selectedItems, onCheckboxChange }) {

  const [firstRender, setFirstRender] = useState(true);

  useEffect(() => {
    if (firstRender && data.length > 0) {
      // Select the first ListItem
     // onCheckboxChange(data[0]);
      setFirstRender(false);
    }
  }, [data, firstRender, onCheckboxChange]);
  useEffect(()=>{},[data]);
  //console.log("data", data);
  return (
    <>
      <List component="nav" aria-label="main mailbox folders" sx={{ bgcolor: 'background.paper', height: "100%", ...style }}>
        {data?.map((e, ind) => {
          return (
            <ListItem key={ind} sx={{
              padding: "10px 10px 10px 15px", transition: "all 0.5s ease-in-out",
              borderBottom:"1px solid var(--med-grey)",
              ":hover": {
                bgcolor: "var(--med-grey)"
              }
            }}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedItems?.includes(e._id)}
                      onChange={() => onCheckboxChange(e)}
                    />
                  }
                  label={<div className="p-1 gap-4"><p>{e.qid}</p>  <Chip size="small" label={`${e.mock_tag}`} /></div>}
                />
              </FormGroup>
            </ListItem>
          
          )
        })}
      </List>
    </>
  );
}