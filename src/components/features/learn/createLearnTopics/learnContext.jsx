import React, { useEffect, useRef, useState } from "react";
import { Stack, TextField } from "@mui/material";
import { Empty } from "antd";
import {
  CustomButton,
  ButtonStyle,
  CustomButtonStyle,
} from "../../../../styles/muiRoot";
import AddIcon from "@mui/icons-material/Add";
import { PackageX } from "lucide-react";
import CreatePractice from "./importQuestionModal";
import uuid from "react-uuid";
import {
  createConcept,
  createPractice,
  removeConcept,
  removePractice,
} from "../../../../ducks/learnSlice";
import { useDispatch, useSelector } from "react-redux";
import PublishModal from "./publishModal";
import { toast } from "react-toastify";
import { ConceptCard } from "./contextCards";
import { useNavigate, useParams } from "react-router-dom";
import {
  useUpdateLearnTopicMutation,
  useUpdatele,
} from "../../../../services/apis/learnApi";
import { learnApi } from "../../../../services/Constant";

const LearnContext = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();
  const containerRef = useRef();
  const [values, setValues] = useState([]);

  const [show, setShow] = useState([]);
  const [open, setOpen] = React.useState(false);
  const { concepts } = useSelector((state) => state.learn.newLearn);
  const { newLearn } = useSelector((state) => state.learn);

  const [
    updateLearnTopic,
    { isLoading: updateLoading, isFetching: updateFetching },
  ] = useUpdateLearnTopicMutation();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const updateData = (data) => {
    dispatch(createConcept(data));
  };

  const addCard = (type) => {
    const newCard = {
      questions: [],
      content: "",
      cardType: type,
      notes: [],
      sequence: values.length + 1,
      id: uuid(),
      title: "",
      videos: [],
      images: [],
    };
    dispatch(createConcept([...values, newCard]));
    containerRef.current.scrollTop = 0;
  };

  //Set the modal data in particular concepts throgh handle change
  const getPracticeModalData = (data, ind, seq) => {
    handleCardChange(ind, seq, { questions: data });
  };

  const removeCard = (type, id) => {
    const newValues = values.filter((card) => card.id !== id);
    setValues(newValues);
    if (type === "concepts") {
      dispatch(removeConcept(id));
    } else if (type === "practice") {
      dispatch(removePractice(id));
    }
    sequenceUpdate(newValues);
  };

  const handleCardChange = (index, sequence, updatedFields) => {
    console.log("🚀 ~ handleCardChange ~ index, sequence, updatedFields:", index, sequence, updatedFields)
    setValues((prevValues) => {
      const newValues = [...prevValues]; // Make a copy of the state array
      const updatedCard = {
        ...prevValues[index],
        ...updatedFields,
      };
      newValues[index] = updatedCard;
      return newValues; // Return the updated state
    });

    // Check if `show` doesn't have the sequence, then update `show`
    if (!show.hasOwnProperty(index)) {
      setShow((prevShow) => [...new Set([...prevShow, index])]);
    }
  };

  const sequenceUpdate = (data) => {
    const sequence = data
      .reverse()
      .map((e, ind) => ({ ...e, sequence: ind + 1 }));
    updateData(sequence);
  };

  useEffect(() => {
    setValues([...concepts].sort((a, b) => b.sequence - a.sequence));
  }, [concepts]);

  useEffect(() => {
    containerRef.current.scrollTop = 0;
  }, []);



 
  const handleAllData = () => {
    const { concepts: getConcepts, ...others } = newLearn;
    const concepts =  getConcepts.map((e) => ({
      ...e,
      questions: e.questions.map((e) => e._id),
    }));
    const res = {
      concepts,
      ...others,
    };
    return res;
  };

  const handleUpdate = async () => {
    try {
      const response = await updateLearnTopic({
        endpoint: `${learnApi.endPoint}/update/${params.learnId}`,
        updatedData: await handleAllData(),
      });
      // Navigate to the desired path after successful deletion
      console.log("Response:", response);
      if (response && response?.data?.success) {
        // Navigate to the desired path after successful deletion
        toast.success("learn edit successfully!", {
          autoClose: 2000,
          onOpen: () => {
            navigate(`/main/exam/learn`);
          },
          // Auto close the toast after 3 seconds
        });
      } else {
        toast.error("Some error  to edit learn!", {
          autoClose: 2000,
        });
        console.error("Error edit learn:", response);
      }
    } catch (error) {
      console.error("Error edit learn: api:", error);
    }
  };



  console.log("🚀 ~ LearnContext ~ values:", values);

  return (
    <>
      <div className="flex-wrap sm:flex-nowrap p-2 w-[100%]  flex justify-between gap-2 h-[80vh]">
        {/* left div */}
        <div className=" p-2 basis-[20%]  ">
          <h5 className="text-base font-bold p-2 mb-1 bg-medGrey  ">
            Class concepts
          </h5>

          <Stack spacing={2} direction={"row"} my={2}>
            <CustomButton
              size="small"
              startIcon={<AddIcon />}
              onClick={() => addCard("concepts")}
              sx={{
                ...ButtonStyle,
                height: 35,
                width: 150,
                borderRadius: 1,
              }}
            >
              Create concepts
            </CustomButton>
          </Stack>
        </div>
        {/* center div start */}
        <div className="basis-[80%] p-2">
          <div
            className="w-full h-full overflow-scroll flex flex-col gap-3 overflow-x-hidden scrollbar-hide"
            ref={containerRef}
          >
            {values?.length === 0 ? (
              <div className="m-auto">
                <Empty description="Need to create a concepts or practice" />
              </div>
            ) : (
              values.map((card, index) => (
                <>
                  <ConceptCard
                    questions={card.questions}
                    key={index}
                    sequence={card.sequence}
                    content={card.content}
                    notes={card.notes}
                    videos={card?.videos}
                    image={card?.images}
                    addQuestion={
                      <CreatePractice
                        value={card.questions}
                        updatePractice={(val) =>
                          getPracticeModalData(val, index, card?.sequence)
                        }
                      />
                    }
                    show={show}
                    media={card.media}
                    addTitle={
                      <TextField
                        id="filled-basic"
                        value={card.title}
                        onChange={(e) =>
                          handleCardChange(index, card.sequence, {
                            title: e.target.value,
                          })
                        }
                        label={"Add Title"}
                        variant="filled"
                        size="small"
                        sx={{ width: "100%", fontSize: 10 }}
                      />
                    }
                    handleContentChange={(content) =>
                      handleCardChange(index, card.sequence, {
                        content: content,
                      })
                    }
                    handleImageChange={(img) =>{
                     const images=img ??[]
                      

                      handleCardChange(index, card.sequence,{images})
                    }
                    }
                    handleNotes={(notes) =>
                      handleCardChange(index, card.sequence, { notes })
                    }
                    handleVideos={(videos) =>
                      handleCardChange(index, card.sequence, { videos })
                    }
                  />

                  <div className="flex justify-between place-items-end px-2">
                    <div>
                      {show?.length > 0 && show.some((e) => e === index) && (
                         <CustomButton
                           loading={updateLoading || updateFetching}
                           style={{ ...CustomButtonStyle, height: 35, width: 130 }}
                          onClick={() => {
                            updateData(values);
                            setShow((prev) => prev.filter((e) => e !== index));
                          }}
                        >
                          Save Changes
                        </CustomButton>
                      )}
                    </div>
                    <div>
                      <button
                        className="text-[#336792] text-sm font-inter font-[600] underline underline-offset-4 flex gap-1 items-center ml-auto"
                        onClick={() => removeCard(card.cardType, card.id)}
                      >
                        <PackageX size={15} />
                        Remove Card
                      </button>
                    </div>
                  </div>
                </>
              ))
            )}
          </div>
          {/* <TopFeatures /> */}
        </div>
        {/* center div end */}

        {/* Right div start */}
        {/* <div className="basis-[25%] bg-medGrey mt-2">
          <h5 className="text-base font-bold p-2">Preview</h5>
          <div className="bg-white m-2 h-[93%] rounded-md overflow-scroll p-1">
            <p>
              
            </p>
          </div>
        </div> */}
        {/* Right div end */}
      </div>

      <div>
        {
          <CustomButton
            size="small"
            onClick={() => {
              const res = true;
              // checkValidation()
              console.log("res", res);
              if (res === true && params.learnId) {
                handleUpdate();
              } else if (res === true) {
                handleOpen();
              } else {
                toast.error("Some Error Occured");
              }
            }}
            sx={{
              ...CustomButtonStyle,
              width: "150px",
              height: "40px",
              borderRadius: 2,
              float: "right",
              m: 2,
              "&:hover": {
                backgroundColor: "black",
              },
            }}
          >
            {params.learnId ? "Save Changes" : "Save"}
          </CustomButton>
        }
        <PublishModal
          handleClose={handleClose}
          handleOpen={handleOpen}
          open={open}
          s
        />
      </div>
    </>
  );
};

export default LearnContext;
