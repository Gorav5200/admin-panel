import React, { useState } from "react";
import Radio from "@mui/material/Radio";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import {
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Stack,
} from "@mui/material";
import { Globe2, Info, Trash2, X } from "lucide-react";
import {
  ButtonStyle,
  CustomButton,
  CustomButtonStyle,
} from "../../../../../../../styles/muiRoot";
import ModalComp from "../../../../../../common/modal";
import { useSelector } from "react-redux";
import { useUpdateFieldMutation } from "../../../../../../../services/apis/exam/group";
import { useDispatch } from "react-redux";
import { setGroupDetails } from "../../../../../../../ducks/mockGroupsSlice";
import { toast } from "react-toastify";

const Manage = () => {
  const dispatch = useDispatch()
  const { groupDetails } = useSelector((state) => state.mockGroups);
  const [selectedValue, setSelectedValue] = useState(groupDetails.status);
  const { handleOpen, handleClose, ModalComponent } = ModalComp();

  const [updateFields, { isLoading: updateLoading, isError: updateError }] =useUpdateFieldMutation();

const handleUpdate = async (type) => {
  try {
    const response = await updateFields({
      endpoint: `/exams/v1/group/status/${groupDetails._id}/${type}`,
     
    });
 
    if (response && response?.data?.success) {
      // console.log("response about", response);
      // toast.info("Field Updated", {
      //   transition:"fade",
      //   autoClose: 2000,
      //   onOpen:()=>
      // });

      dispatch(setGroupDetails(response.data.data))
      handleClose()
    
    } else {
      toast.error(`Some error occurred while updating Manage`, {
        autoClose: 2000,
      });
      console.error("Error updating field. Response:", response);
    }
    return  response.data;
  } catch (error) {
    console.error("Error updating field:", error);
    throw error; // Rethrow the error so that the calling code can handle it if needed
  }
};

  const handleChange = (e) => {
    handleOpen();
    setSelectedValue(e);
  };

  const handleConfirmButtonClick = async () => {

   
  };

  console.log("selected vakue", selectedValue);

  return (
    <>
      <ModalComponent>
        <header className="ps-2 flex justify-between items-center">
          <h4 className="text-xl font-inter font-semibold">{selectedValue ==="publish" ?"Publish":"UnPublish"} Group</h4>
          <IconButton onClick={handleClose}>
            <X />
          </IconButton>
        </header>
        <div className="w-[627px]  p-2 flex flex-col gap-4">
          <p className="text-sm text-gray-700">
          {/* Fill the content acc  to publish or unPublish */}
            Disabling the group will prevent users to participate in the group,
            by not allowing them to post, ask doubts or host challenges. Are you
            sure about the change?
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
              onClick={() =>handleUpdate( selectedValue)}
            >
              Continue
            </CustomButton>
          </Stack>
        </div>
      </ModalComponent>
      <div className="p-2 flex flex-col">
        <CardActionArea onClick={() => handleChange("publish")}>
          <CardContent
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <div>
              <h2 className="flex gap-3 items-center">
                <Globe2 size={18} />
               Publish
              </h2>
              <p className="text-sm mt-2 ml-7">
                All the members of the group can participate in activities
              </p>
            </div>

            <FormGroup>
              <FormControlLabel
                control={<Radio />}
                value="publish"
                checked={groupDetails.status === "publish"}
                onChange={() => handleChange("publish")}
              />
            </FormGroup>
          </CardContent>
        </CardActionArea>

        <Divider />

        <CardActionArea onClick={() => handleChange("unPublish")}>
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
               Un-Publish
              </h2>
              <p className="text-sm mt-2 ml-7">
                Memebers in the group will no longer be post or participate in
                any other activites.
              </p>
            </div>
            <FormGroup>
              <FormControlLabel
                value="unPublish"
                control={<Radio />}
                checked={groupDetails.status === "unPublish"}
                onChange={(e) => handleChange(e.target.value)}
              />
            </FormGroup>
          </CardContent>
        </CardActionArea>

        {/* <Divider />

        <CardContent
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h2 className="flex gap-3 items-center">
              <Trash2 size={18} />
              Delete Group
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
                    Once you delete group, you will lose all the data and user
                    from this group will be removed.
                  </p>
                </div>
              }
            ></Chip>
          </div>
          <CustomButton
            style={{ ...ButtonStyle, borderRadius: 5, width: 113, height: 33 }}
          >
            Delete Group
          </CustomButton>
        </CardContent> */}
      </div>
    </>
  );
};

export default Manage;
