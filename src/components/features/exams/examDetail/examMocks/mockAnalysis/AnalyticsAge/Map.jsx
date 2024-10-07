import React from "react";
import DatamapsIndia from "react-datamaps-india";

const Map = () => {
  return (
    <div className="absolute w-full scale-150">
      <DatamapsIndia
        regionData={{}}
        hoverComponent={({ value }) => {
          return (
            <div className="w-1/3 h-20 p-2 bg-white">
              <p>{value?.name}</p>
              <p>{value?.value}</p>
            </div>
          );
        }}
        mapLayout={{
          title: "",
          legendTitle: "",
          startColor: "#17cf0a",
          endColor: "#FF6347",
          hoverTitle: "Count",
          noDataColor: "#f5f5f5",
          borderColor: "#8D8D8D",
          hoverBorderColor: "#8D8D8D",
          hoverColor: "green",
        }}
      />
    </div>
  );
};
export default Map;
