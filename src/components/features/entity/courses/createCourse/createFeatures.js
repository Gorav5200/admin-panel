import React, { useEffect, useRef, useState } from "react";
import PreviewCommon from "./previewCommon";
import { Avatar, Card, CardContent } from "@mui/material";
import ReactQuill from "react-quill";
import { PackageX } from "lucide-react";
import { HTMLConverter } from "../../../../../services/common";
import { useSelector, useDispatch } from "react-redux";
import SingleImageUpload from "../../../../common/singleImageUpload";
import { CustomButton, CustomButtonStyle } from "../../../../../styles/muiRoot";
import { toast } from "react-toastify";
import { setActiveView ,setTopFeatures} from "../../../../../ducks/exams/courseSlice";
import { courseApi } from "../../../../../services/Constant";

function CreateFeatures() {
  const { topFeatures } = useSelector((state) => state.courses);
  const [values, setValues] = useState(topFeatures);
  const dispatch = useDispatch();
  const [data, setData] = useState();

  const addCard = () => {
    const newCard = { content: "", image: "" };
    setValues([...values, newCard]);
  };



  const removeCard = (ind) => {
    const newValues = [...values];
    newValues.splice(ind, 1); // Remove the card at index ind
    setValues(newValues);
  };

  useEffect(() => {
    setData(values);
   return ()=> {
      dispatch(setTopFeatures(values))
    }
  }, [values]);


  const handleContinue=()=>{
    if(values.length > 0){
      if (
        values.some((item) => item.content === "" || item.content ===  "<p><br></p>") 
      ) {
     
        toast.error("Enter some content in Top Features")
   
      }
      else{
         dispatch(setTopFeatures(values))
         dispatch(setActiveView("stories"))
      }
   
     
    }
    else{
      toast.error("Please at least add  one feature")
    }

  }

  const handleInputChange = (index, content, img) => {
    const newValues = [...values]; // Create a shallow copy of the array
    newValues[index] = { ...newValues[index], content, image: img }; // Update both 'content' and 'image' properties
    setValues(newValues);
  };

  console.log("values", values);
  return (
    <div className="flex gap-5 h-[calc(100vh-9vh)] p-2 relative">
      <div className="bg-white basis-[65%] p-2 flex rounded-md h-[calc(100%-6%)]">
        <div className="w-full h-full overflow-scroll flex flex-col gap-3 py-4 overflow-x-hidden scrollbar-hide">
          {values?.map((card, index) => (
            <>
              <DataCard
                key={index}
                content={card.content}
              
                image={card.image}
                handleContentChange={(content) =>
                  handleInputChange(index, content, card.image)
                }
                handleImageChange={(img) =>
                  handleInputChange(index, card.content, img)
                }
             
              />
              <button
                className="text-[#336792] text-sm font-inter font-[600] underline underline-offset-4 self-end p-3 flex gap-1 items-center "
                onClick={() => removeCard(index)}
              >
                <PackageX size={15} />
                Remove Card
              </button>
            </>
          ))}
          <button
            className="text-[#336792] text-sm font-inter font-[600] underline underline-offset-4 self-start p-3"
            onClick={addCard}
          >
            {values?.length > 0 ? "+ Add another card" : "+ Add Card"}
          </button>{" "}
        </div>
        
      </div>
      <div className="bg-medGrey rounded-md basis-[35%] p-3 h-[calc(100%-6%)]">
        <PreviewCommon>
          <div className="flex flex-col gap-3 pb-8 ">
            {values?.map((item) => (
              <Card
                sx={{
                  border: "1px solid var(--med-grey)",

                  boxShadow: "none",
                  minHeight: 100,
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 3,
                  display: "flex",
                  p: 2,
                }}
               
              >
                <Avatar
                  sx={{
                    borderRadius: 2,
                    width: "50px",
                    height: 50,
                    color: "var(--light-grey)",
                    background: "var(--light-grey)",
                    alignSelf: "flex-start",
                  }}
                  src={item.image}
                />
                <div>
                  <HTMLConverter>{item.content}</HTMLConverter>
                </div>
              </Card>
            ))}
          </div>
        </PreviewCommon>
      </div>

      <CustomButton
        style={{
          ...CustomButtonStyle,
        
          position: "absolute",
          right: 15,
          bottom: 0,
        }}
        onClick={handleContinue}
      >
        Save & continue
      </CustomButton>
    </div>
  );
}

function DataCard({ content,image ,handleImageChange,handleContentChange}) {
  return (
    <Card
      className="min-h-[210px] flex gap-3 border "
      sx={{ boxShadow: "none" }}
    >
      <CardContent
        sx={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          width: "100%",
          height: "auto",
          overflow: "scroll",
        }}
      >
        <div className="basis-[75%]">
          <ReactQuill
            onChange={handleContentChange}
            value={content}
            className="w-full"
          />
        </div>

        <div className="text-center">
          <SingleImageUpload setData={handleImageChange} data={image} circle={true}   endpoint={`${courseApi.endPoint}/basic/upload/image`}/>
        </div>
      </CardContent>
    </Card>
  );
}

export default CreateFeatures;
