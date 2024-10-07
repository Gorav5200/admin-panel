import React from "react";
import { Card, CardContent, CardMedia } from "@mui/material";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../styles/muiRoot";
import Stack from "@mui/material/Stack";
import { PlusCircle } from "lucide-react";
import SingleSelect from "../../common/selectFields";
import { topics } from "../../../services/common";

function Promotion() {
  return (
    <>
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
        px={5}
        py={1}
      >
        <SingleSelect
          style={{ width: "200px" }}
          size="small"
          placeholder="Current Spot"
          data={topics}
          variant="standard"
          setData={(val) => console.log(val)}
        />
        <div className="flex gap-2 items-center">
          <SingleSelect
            style={{ width: "200px" }}
            size="small"
            placeholder="Filter: All"
            data={topics}
            setData={(val) => console.log(val)}
          />
          <CustomButton
            style={{ ...CustomButtonStyle }}
            startIcon={<PlusCircle />}
          >
            Schedule spot
          </CustomButton>
        </div>
      </Stack>
      <div className="rounded-md p-8 flex flex-wrap justify-around gap-5 overflow-scroll max-h-[100vh]  ">
        {[...Array(20)].map((item, ind) => (
          <Card
            sx={{
              width: "24%",
              height: "auto",
              justifyContent: "center",
              alignItems: "center",
              p: 3,
              borderRadius: 2,
              pb: 0,
              border: "1px solid #D8D8D8",
              boxShadow: "none",
            }}
          >
            <CardMedia
              component="img"
              sx={{
                height: "13.625rem",
                width: "20.5rem",
                borderRadius: 2,
                m: "auto",
              }}
              image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCpj7w5FSVRyofzC1reh7jGN87NEmeCb7amwsyc2xEmjwv0cIYrR0MKpvzrCAKWgOOwiY&usqp=CAU"
              alt="Paella dish"
            />
            <CardContent>
              <h5 className="text-secondary font-inter font-medium text-center">
                Module Name: <span className="font-bold">GRE</span> Full Course
                2021
              </h5>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export default Promotion;
