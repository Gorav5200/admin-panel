import React, { useEffect, useState } from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import { Globe2, Info, X } from "lucide-react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ModalComp from "../../../common/modal";
import {
  CustomButton,
  CustomButtonStyle,
  ButtonStyle,
} from "../../../../styles/muiRoot";

const Privacy = ({ handleUpdate }) => {
  const { groupDetails } = useSelector((state) => state.mockGroups);
  const [selectedValue, setSelectedValue] = useState("");
  const { handleOpen, handleClose, ModalComponent } = ModalComp();

 useEffect(() => {
 setSelectedValue(groupDetails?.groupType)
 }, [groupDetails])

  const handleChange = (e) => {
    handleOpen();
    setSelectedValue(e);
  };

  const handleConfirmButtonClick = async () => {

    console.log("🚀 ~ Privacy ~ selectedValue:", selectedValue)

    const res = await handleUpdate("groupType", selectedValue);
    if (res.success) {
      handleClose();
    }
  };



  console.log("selected vakue", selectedValue);
  return (
    <>
      <ModalComponent>
        <header className="ps-2 flex justify-between items-center">
          <h4 className="text-xl font-inter font-semibold">Change Privacy</h4>
          <IconButton onClick={handleClose}>
            <X />
          </IconButton>
        </header>
        <div className="w-[627px]  p-2 flex flex-col gap-4">
          <p className="text-sm text-gray-700">
            By changing privacy from public to premium, all 782 free users will
            no longer be able to participate in CAT Exam 2021, are sure about
            the change.
          </p>

          <Stack direction="row" justifyContent="flex-end" spacing={2} my={2}>
            <CustomButton
              style={{
                ...ButtonStyle,
                width: 117,
                height: 39,
                borderRadius: 6,
              }}
              onClick={handleClose}
            >
              Cancel
            </CustomButton>
            <CustomButton
              style={{
                ...CustomButtonStyle,
                width: 117,
                height: 39,
                borderRadius: 6,
              }}
              onClick={() => handleConfirmButtonClick(selectedValue)}
            >
              Continue
            </CustomButton>
          </Stack>
        </div>
      </ModalComponent>
      <div className="p-2 flex flex-col">
        <CardActionArea onClick={() =>{if(groupDetails.groupType !== "public") handleChange("public")}}>
          <CardContent
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <h2 className="flex gap-3 items-center">
                <Globe2 size={18} />
                Public
              </h2>
              <p className="text-sm mt-2 ml-7">
                All the users taking CAT exam are part of this group
              </p>

              <Chip
                sx={{ borderRadius: 2, m: 2, ml: 3 }}
                label={
                  <div className="flex gap-2 items-center">
                    <Info size={18} />
                    <p>
                      {" "}
                      Switching from Public to Premium will remove all the free
                      users from this group.
                    </p>
                  </div>
                }
              ></Chip>
            </div>

            <FormGroup>
              <FormControlLabel
                control={<Radio />}
                value="Public"
                checked={groupDetails.groupType === "public"}
                onChange={() => handleChange("public")}
              />
            </FormGroup>
          </CardContent>
        </CardActionArea>

        <Divider />

        <CardActionArea onClick={() =>{if(groupDetails.groupType !== "premium") handleChange("premium")}}>
          <CardContent
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <h2 className="flex gap-3 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-lock-keyhole"
                >
                  <circle cx="12" cy="16" r="1" />
                  <rect x="3" y="10" width="18" height="12" rx="2" />
                  <path d="M7 10V7a5 5 0 0 1 10 0v3" />
                </svg>
                Premium
              </h2>
              <p className="text-sm mt-2 ml-7">
                Only users who have bought a course on the platform can
                participate
              </p>
            </div>
            <FormGroup>
              <FormControlLabel
                value="Premium"
                control={<Radio />}
                checked={groupDetails.groupType === "premium"}
                onChange={() => handleChange("premium")}
              />
            </FormGroup>
          </CardContent>
        </CardActionArea>
      </div>
    </>
  );
};

export default Privacy;
