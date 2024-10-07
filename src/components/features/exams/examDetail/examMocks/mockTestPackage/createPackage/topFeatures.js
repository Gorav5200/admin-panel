import React, { useEffect, useRef, useState } from "react";
import PreviewCommon from "./previewCommon";
import { Avatar, Card, CardContent, IconButton } from "@mui/material";
import ReactQuill from "react-quill";
import ImageUploader from "../../../../../../common/imageUploader";
import { PackageX } from "lucide-react";
import { HTMLConverter } from "../../../../../../../services/common";
import { useSelector } from "react-redux";
import { setTopFeatures } from "../../../../../../../ducks/mockPackageSlice";
import { useDispatch } from "react-redux";
import SingleImageUpload from "../../../../../../common/singleImageUpload";
import { mocksApi } from "../../../../../../../services/Constant";

function TopFeatures({ setData }) {
  const { topFeatures } = useSelector((state) => state.mockPackage);
  const [values, setValues] = useState(topFeatures);
  const dispatch = useDispatch();
  const addCard = () => {
    const newCard = { content: "", image: "" };
    setValues([...values, newCard]);
  };

  const handleContentChange = (index, content, image) => {
    const newValues = [...values]; // Create a shallow copy of the array
    if (newValues[index]) {
      newValues[index] = {
        ...newValues[index],
        content: content !== undefined ? content : newValues[index].content,
        image: image !== undefined ? image : newValues[index].image,
      }; // Update 'content' and 'image' properties if provided, otherwise keep them unchanged
    } else {
      // If the index doesn't exist, create a new object at that index
      newValues[index] = { content: content, image: image };
    }
    setValues(newValues);
  };

  const removeCard = (ind) => {
    const newValues = [...values];
    newValues.splice(ind, 1); // Remove the card at index ind
    setValues(newValues);
  };

  useEffect(() => {
    setData(values);
  }, [values]);

  console.log("values", values);
  return (
    <div className="flex gap-5 h-full">
      <div className="bg-white basis-[70%] p-2 flex rounded-md">
        <div className="w-full h-full overflow-scroll flex flex-col gap-3 py-4 overflow-x-hidden">
          {values.map((card, index) => (
            <>
              <DataCard
                key={index}
                content={card.content}
                onContentChange={(content) =>
                  handleContentChange(index, content, card.image)
                }
                image={card.image}
                handleImageChange={(image) =>
                  handleContentChange(index, card.content, image)
                }
              />
              <button
                className="text-[#336792] text-sm font-inter font-[600] underline underline-offset-4 self-end p-3 flex gap-1 items-center "
                onClick={() => removeCard(index)}
              >
                <PackageX size={15} /> Remove Card
              </button>
            </>
          ))}
          <button
            className="text-[#336792] text-sm font-inter font-[600] underline underline-offset-4 self-start p-3"
            onClick={addCard}
          >
            {values.length > 0 ? "+ Add another card" : "+ Add Card"}
          </button>{" "}
        </div>
        {<buttonComp />}
      </div>
      <div className="bg-medGrey rounded-md basis-[30%]">
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
                src={item.image}
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
                />
                <div>
                  <HTMLConverter>{item.content}</HTMLConverter>
                </div>
              </Card>
            ))}
          </div>
        </PreviewCommon>
      </div>
    </div>
  );
}

function DataCard({ content, image, handleImageChange, onContentChange }) {
  return (
    <Card
      className="h-[20ch] flex gap-3 border overflow-scroll"
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
            onChange={onContentChange}
            value={content}
            className="w-full"
          />
        </div>

        <div className="text-center">
          <SingleImageUpload setData={handleImageChange} data={image} endpoint={`${mocksApi.endPoint}/image`} />
        </div>
      </CardContent>
    </Card>
  );
}

export default TopFeatures;
