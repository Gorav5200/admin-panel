import React, { useState } from "react";

const useTruncateText = (text, maxLength) => {
 
  const [isTruncated, setIsTruncated] = useState(true);

  const toggleTruncate = () => {
    setIsTruncated(!isTruncated);
  };

  const truncatedText = isTruncated ? text?.slice(0, maxLength) : text;
  const hasMore = text?.length > maxLength;

  return {
    truncatedText,
    isTruncated,
    toggleTruncate,
    hasMore,
  };
};

const TruncateText = ({ text, maxLength }) => {
  
  const { truncatedText, isTruncated, toggleTruncate, hasMore } =
    useTruncateText(text, maxLength);

  return (
    <div>
      {truncatedText}
      {hasMore && (
        <span
          onClick={toggleTruncate}
          style={{ cursor: "pointer", color:"#000000" }}
        >
          {isTruncated ? "... (See more)" : " (See less)"}
        </span>
      )}
    </div>
  );
};

export default TruncateText;
