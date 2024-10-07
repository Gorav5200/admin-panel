import React, { useState } from "react";
import { LabelCard } from "../../../common/cards";
import FullWidthTabs from "../../../common/tabChanger";
import { CheckCircle2, Mail, Dot } from "lucide-react";
import { IconButton } from "@mui/material";
import {BasicModal} from "../../../common/modal";
import Card from "@mui/material/Card";
import { CardHeader, Chip, Box, Avatar } from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";

import {
  CustomButton,
  ButtonStyle,
  CustomButtonStyle,
} from "../../../../styles/muiRoot";
import { GroupNaming, randomColors } from "../../../../services/common";
import AssignList from "../../../common/list";
import Icon from "../../../common/Icon";


function Help() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <FullWidthTabs
      data={[
        {
          item: 1,
          label: "Help Request Raised(14) ",
          content: (
            <CardRender
              handleClose={handleClose}
              handleOpen={handleOpen}
              open={open}
            />
          ),
        },
        {
          item: 2,
          label: "Request Pending(4)",
          content: (
            <CardRender
              handleClose={handleClose}
              handleOpen={handleOpen}
              open={open}
            />
          ),
        },
      ]}
      value={0}
    />
  );
}

export default Help;

const CardRender = ({ handleClose, handleOpen, open }) => {
  const [dataIndex, setDataIndex] = useState(null);

  const handleDataindex = (value) => {
    setDataIndex(value);
    handleOpen();
    
  };

  return (
    <>
      <ModalHelpRequest
        handleClose={handleClose}
        handleOpen={handleOpen}
        open={open}
      />

      {/* on click on the button or card  send the data as a function acc to index */}
      <div className="px-1 py-3 flex flex-wrap justify-center gap-5 bg-medGrey rounded-md content-center items-center">
        {[...Array(20)].map((item, i) => (
          <>
            <LabelCard
              titleIcon={
                <IconButton aria-label="settings">
                  <Mail color="black" size="20px" />
                </IconButton>
              }
              subHeader={
                <div style={{ display: "flex", alignItems: "center" }}>
                  ID 654590
                  <Dot />
                  9988772778
                </div>
              }
              FunctionButtons={[
                {
                  name: "Mark Done",
                  func: () => handleDataindex(i),
                  style: {
                    ...CustomButtonStyle,
                    borderRadius: 5,
                    height: 40,
                    width: 60,
                    fontSize: 14,
                    width: 108,
                  },
                },
                
              ]}
              label={true}
              style={{ width: "27em" }}
            />
          </>
        ))}
      </div>
    </>
  );
};



const ModalHelpRequest = ({ handleClose, handleOpen, open }) => {
  const [showAssign, setShowAssign] = useState(false);
  return (
    <BasicModal open={open} handleClose={handleClose} handleOpen={handleOpen}>
      <div className="">
        <header className="ps-2 flex justify-between items-center">
          <h4 className="text-xl font-inter font-semibold">Help request</h4>
          <IconButton
            onClick={() => {
              handleClose();
              setShowAssign(false);
            }}
          >
            <Icon name="X" size="25" />
          </IconButton>
        </header>
        <Card
          className="relative"
          sx={{
            width: "100%",
            fontFamily: "var(--font-inter)",
            borderRadius: 2,
            p: 1,
            mt: 2,
            boxShadow: "none",
          }}
        >
          <Chip
            className="absolute top-0 "
            label="Query"
            sx={{
              background: randomColors(["#E56C51", "#FCB461", "#24B6A4"]),
              color: "white",
              font: "600 14px var(--font-inter)",
              borderRadius: "5px  0 5px 0",
            }}
          />

          <CardHeader
            sx={{ m: 0, mt: 3, pb: 0, pl: 0 }}
            avatar={
              <Avatar
                alt="Remy Sharp"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCpj7w5FSVRyofzC1reh7jGN87NEmeCb7amwsyc2xEmjwv0cIYrR0MKpvzrCAKWgOOwiY&usqp=CAU"
                sx={{ width: 56, height: 56 }}
              />
            }
            title={
              <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                Preethi Bajaj
                <Mail color="black" size="20px" />
              </div>
            }
            subheader={
              <div style={{ display: "flex", alignItems: "center" }}>
                ID 654590
                <Dot />
                9988772778
              </div>
            }
          />

          <CardContent
            className="text-sm  font-inter font-[600] text-primary "
            sx={{ pl: 0 }}
          >
            <p className="text-sm font-normal my-2 ">
              {" "}
              Need to inquire about how should I start preparing for my exam, is
              it better to select mocktest or course and will you conduct test ?
            </p>
          </CardContent>
          <CardActions sx={{ pl: 0 }}>
            <CustomButton
              style={{
                ...CustomButtonStyle,
                borderRadius: 5,
                height: 40,
                width: 60,
                fontSize: 14,
                width: 108,
              }}
            >
              Mark Done
            </CustomButton>
            <CustomButton
              onClick={() => setShowAssign(!showAssign)}
              style={{
                ...ButtonStyle,
                borderRadius: 5,
                height: 40,
                fontSize: 14,
                width: 100,
              }}
            >
              Assign
            </CustomButton>
          </CardActions>
          {showAssign && <AssignList buttonNames={["Assign"]} />}
        </Card>
      </div>
    </BasicModal>
  );
};


