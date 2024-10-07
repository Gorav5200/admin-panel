import React from "react";

const userCounts = [250, 500, "10k", "15k", "20k", "25k"];
const totalUsers = userCounts.reduce(
  (acc, count) =>
    acc + (typeof count === "number" ? count : parseInt(count) * 1000),
  0
); // Convert '10k', '15k', etc. to numbers
const progressScale = userCounts.map((count, index) => ({
  value: (count / totalUsers) * 100,
  label: count.toLocaleString(),
  color:
    index === 0
      ? "#E9F2EE"
      : index === 1
      ? "#BEEAD5"
      : index === 2
      ? "#7DD2AA"
      : index === 3
      ? "#3CD38B"
      : index === 4
      ? "#24B670"
      : "#058849",
}));

function Counting() {
  return (
    <div>
      <h2 className="text-lg font-medium mb-4 text-gray-500">Users</h2>
      <div className=" mb-8 overflow-hidden relative">
        <div className="h-full flex items-center">
          {progressScale.map((section, index) => (
            <div
              key={index}
              className="h-full"
              style={{
                height: "25px",
                position: "relative",
                display: "flex",
                width: "100%",
                flexDirection: "column",
              }}
            >
              <div
                style={{
                  backgroundColor: section.color,
                  height: "10px",
                  width: "100%",
                }}
              ></div>
              <div
                className="h-full w-9 flex items-center justify-center"
                style={{ position: "absolute", top: "6px" }}
              >
                <span className="text-xs font-bold text-gray-700">
                  {section.label}
                </span>
              </div>
            </div>
          ))}
        </div>
        {/* Display user counts outside the progress scale */}
        {progressScale.map((section, index) => (
          <div
            key={index}
            className="absolute"
            style={{
              left: `${section.value}%`,
              bottom: "-30px", // Adjust this value for proper alignment
              transform: "translateX(-50%)",
            }}
          >
            <span className="text-xs font-bold text-gray-700">
              {userCounts[index]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Counting;
