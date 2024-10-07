import React, { useEffect, useState } from "react";
import { CustomButton, CustomButtonStyle } from "../../../../../styles/muiRoot";
import { X } from "lucide-react";
import {
  Card,
  CardActions,
  CardContent,
  CircularProgress,
  Divider,
  IconButton,
  Modal,
  TextField,
} from "@mui/material";
import ReactQuill from "react-quill";
import SingleImageUpload from "../../../../common/singleImageUpload";
import { ImportVideoModal } from "./videoModal";
import TimePickerComp from "../../../../common/timePicker";
import dayjs from "dayjs";
import {
  useCreateConceptMutation,
  useUpdateContextMutation,
} from "../../../../../services/apis/exam/class";
import { classApi } from "../../../../../services/Constant";
import { message } from "antd";
import { useSelector } from "react-redux";

import { BackdropLoader } from "../../../../common/lineLoader";
import { ColorPicker } from "antd";

const CreateConceptModal = ({ data, updateData, handleClose, open }) => {
  const { newClass } = useSelector((state) => state.class);

  const initialValues = {
    _id: newClass._id || null,
    description: "",
    cardType: "concepts",
    bgColor:"#ffffff",
    startTime: null,
    endTime: null,
    classId: newClass._id,
    media: [
      {
        type: "video",
        media: undefined,
      },
      {
        type: "photo",
        media: undefined,
      },
    ],
  };

  const [values, setValues] = useState(initialValues);

  const [createConcept, { isError, isLoading, isLoading: createLoad }] =
    useCreateConceptMutation();
  const [updateContext, { isError: updateError, isLoading: updateLoad }] =
    useUpdateContextMutation();
    const handleChange = (e) => {
      const { name, value } = e.target;
      if (name === "photo" || name === "video") {
          // Check if the corresponding media object exists
          const mediaIndex = values.media.findIndex(item => item.type === name);
          if (mediaIndex !== -1) {
              // If the media object exists, update its media value
              const updatedMedia = values.media.map((item, index) => {
                  if (index === mediaIndex) {
                      return { ...item, media: value };
                  }
                  return item;
              });
              setValues({ ...values, [name]: value, media: updatedMedia });
          } else {
              // If the media object doesn't exist, create a new one and add it to the media array
              const newMediaObject = { type: name, media: value };
              const updatedMedia = [...values.media, newMediaObject];
              setValues({ ...values, [name]: value, media: updatedMedia });
          }
      } else {
          setValues({ ...values, [name]: value });
      }
  };
  

  useEffect(() => {
    if (open && data.action === "edit") {
      setValues(data.data);
    } else {
      setValues(initialValues); // Reset to initial values
    }

    return () => setValues(initialValues); // Cleanup function
  }, [open]);

  const handleCreate = async () => {
    try {
      const response = await createConcept({
        endpoint: `${classApi.endPoint}/concept`,
        newData: handleData(),
      });

      console.log("🚀 ~ handleSave ~ response:", response);

      if (response && response?.data?.success) {
        message.success("Concept add successfully!", 2.5);
        const res = await updateData();
        console.log("🚀 ~ handleSave ~ res:", res);

        if (res.success) {
          handleClose();
        } else message.error("Some error Occured");
      } else {
        message.error("Some error  to edit class!", 2.5);
      }
    } catch (error) {
      console.error("Error edit class: api:", error);
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await updateContext({
        endpoint: `${classApi.endPoint}/concept/${id}`,
        updatedData: handleData(),
      });

      if (response && response?.data?.success) {
        const res = await updateData(); //this is the get detail api placed in create context.js
        console.log("🚀 ~ handleSave ~ res:", res);

        if (res.success && res.data) {
          message.success("Concept Updated");
        } else message.error("Some error Occured");
      } else {
        message.error("Some error  to Update !", 2.5);
      }
    } catch (error) {
      console.error("Error update class: api:", error);
    }
  };

  const handleSave = () => {
    if (open && data.action === "edit") {
      handleUpdate(values._id);
    } else {
      handleCreate();
    }
  };

  const handleData = () => {
    if (values.media) {
        const filteredMedia = values.media.filter(
            (item) =>
            item.media !== "" &&
         item.media !== null &&
                item.media !== undefined 
             
        );
        console.log("inside filrer daata handle",filteredMedia)
        return { ...values, media: filteredMedia };
    } else {
        return values;
    }
};


console.log("🚀 ~ CreateConceptModal ~ values:", values)
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{zIndex:900,left:"20%"}}
      >
        <div className="modalRoot  " >
          <div className="w-[50vw] h-[fit-content] max-h-[70vh] p-2 overflow-scroll">
            {/* header */}
            <header className="flex justify-between items-start">
              <div className="basis-3/12">
                <h3 className="text-xl font-bold text-primary">
                  Create Concept
                </h3>
                <h6 className="text-sm italic">Fill the Details:</h6>
              </div>

              <IconButton
                onClick={() => {
                  setValues(initialValues);
                  handleClose();
                }}
              >
                <X color="var(--primary)" />
              </IconButton>
            </header>

            {/* Content */}
            <div className="mt-4 h-full ">
              <div className="object-cover">
                <Card
                  className="min-h-[full]"
                  sx={{
                    boxShadow: "none",
                    border: "none",
                  }}
                >
                  <CardContent
                    sx={{
                      display: "flex",
                      flexDirection: "column-reverse",
                      gap: 3,
                      width: "100%",
                      height: "auto",
                      overflow: "scroll",
                    }}
                  >
                    <div>
                      <ReactQuill
                        onChange={(val) =>
                          handleChange({
                            target: {
                              name: "description",
                              value: val,
                            },
                          })
                        }
                        value={values.description}
                        className="w-full"
                      />
                    </div>

                    <div className="flex  items-start gap-5 ">
                      <div>
                        <SingleImageUpload
                          setData={(val) =>
                            handleChange({
                              target: {
                                name: "photo",
                                value: val,
                              },
                            })
                          }
                          data={values.media?.find((e)=>e.type === "photo")?.media}
                          circle={false}
                          endpoint={`${classApi.endPoint}/concept/upload/image`}
                        />



                          <ColorSelect  value={values?.color} handleChange={(val)=> handleChange({
                                  target: {
                                    name: "bgColor",
                                    value: val?.toHexString(),
                                  },
                                })}/>
       
                      </div>

                      <div className="w-full">
                        <div className="flex  justify-start my-4 items-start  gap-3">
                          <div>
                            <h5 className="text-sm font-bold ">Start Time :</h5>
                            <TimePickerComp
                              setValue={(val) =>
                                handleChange({
                                  target: {
                                    name: "startTime",
                                    value: val,
                                  },
                                })
                              }
                              controlTime={true}
                              startTime={dayjs.utc(newClass?.startTime)}
                              endTime={dayjs.utc(newClass?.endTime  )}
                              value={
                                values.startTime
                                  ? dayjs.utc(values.startTime)
                                  : null
                              }
                              style={{ height: "0.5em", width: "100%" }}
                            />
                          </div>

                          <div>
                            <h5 className="text-sm  font-bold ">End Time :</h5>
                            <TimePickerComp
                              setValue={(val) =>
                                handleChange({
                                  target: {
                                    name: "endTime",
                                    value: val,
                                  },
                                })
                              }
                              controlTime={true}
                             startTime={dayjs.utc(newClass?.startTime)}
                              endTime={dayjs.utc(newClass?.endTime  )}
                              value={
                                values.endTime ? dayjs(values.endTime) : null
                              }
                              style={{ height: "0.5em", width: "100%" }}
                            />
                          </div>
                         <div>
                        
                      
                     
                         </div>

                          <div className="mt-2 pt-2 ml-auto">
                            <ImportVideoModal
                              showVal={values.media?.[0].media ? "Added" : null}
                              setData={(val) =>
                                handleChange({
                                  target: {
                                    name: "video",
                                    value: val,
                                  },
                                })
                              }
                              data={values.media?.[0].media}
                            />
                          </div>
                        </div>

                        <Divider />

                        <div className="mt-2 w-full">
                          <TextField
                            id="filled-basic"
                            value={values.title}
                            label={"Add Title"}
                            onChange={handleChange}
                            variant="filled"
                            size="small"
                            name="title"
                            sx={{ width: "100%", fontSize: 10 }}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardActions>
                    <CustomButton
                    disabled={createLoad || updateLoad}
                      sx={{
                        ...CustomButtonStyle,
                        height: 40,
                        width: 130,
                        borderRadius: 2,
                        float: "right",
                        ml: "auto",
                      }}
                      onClick={handleSave}
                    >
                      {createLoad || updateLoad?<CircularProgress color="inherit" size={18}/> :  data.action === "edit" ? "Save Changes" : "Add Concept"}
                    </CustomButton>
                  </CardActions>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};
const ColorSelect = ({ handleChange, value }) => {
    const handleColorChange = (color) => {
      // Call the handleChange function with the selected color
      handleChange(color);
    };

  return (
    <div className="mt-5 w-fit">
      <ColorPicker
        className="z-50"
        defaultValue="#1677ff"
        showText
        size="large"
        value={value} // Set the value of the ColorPicker
        zIndex={9999}
        onChange={handleColorChange}
      />
    </div>
  );
};
export default CreateConceptModal;
