import React from "react";
import { LabelCard } from "../../../common/cards";
import FullWidthTabs from "../../../common/tabChanger";
import { CheckCircle2, Mail, Dot } from "lucide-react";
import { IconButton } from "@mui/material";
import {
  CustomButton,
  ButtonStyle,
  CustomButtonStyle,
} from "../../../../styles/muiRoot";

function Report() {
  return (
    <FullWidthTabs
      data={[
        {
          item: 1,
          label: "Report Raised(14)  ",
          content: <CardRender />,
        },
        {
          item: 2,
          label: "Report pending (4)",
          content: <CardRender />,
        },
      ]}
    />
  );
}

export default Report;

const CardRender = () => {
  return (
    <div className="px-1 py-3 flex flex-wrap justify-center gap-5 bg-medGrey rounded-md content-center items-center">
      {[...Array(20)].map((i) => (
        <LabelCard
          subHeader={
            <div style={{ display: "flex", alignItems: "center" }}>
              ID 654590
              <Dot />
              9988772778
            </div>
          }
          actionIcon={
            <IconButton aria-label="settings">
              <CheckCircle2 color="black" size="24px" />
            </IconButton>
          }
          FunctionButtons={[
            {
              name: "Assign",

              style: {
                ...CustomButtonStyle,
                borderRadius: 5,
                height: 40,
                width: 60,
                fontSize: 14,
                width: 108,
              },
              func: () => null,
            },
            {
              name: "Solve",
              style: {
                ...ButtonStyle,
                borderRadius: 5,
                height: 40,
                width: 60,
                fontSize: 14,
                width: 108,
              },
              func: () => null,
            },
          ]}
          label={false}
          style={{ width: "27em" }}
        />
      ))}
    </div>
  );
};
