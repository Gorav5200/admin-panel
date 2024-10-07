import React, { useState } from "react";
import PackageForm from "../../commonFeatures/packageForm";
import { useSelector } from "react-redux";
import { pastPaperApi } from "../../../../services/Constant";

function PackageCreate() {
  const pastPaperKeys = [
    { dataKey: "title", label: "Title", minWidth: 170 },
    {
      dataKey: "isPublished",
      label: "Publishing Status",
      align: "left",
      type: "boolean",
      showValue: {
        true: (
          <span className="flex gap-1 items-center ">
            <section className="flex justify-center items-center">
              <button
                href="/"
                className="group flex justify-center p-2.5 rounded-full drop-shadow-xl  from-gray-800 text-white font-semibold  hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413] bg-green-600"
              >
                <span className="absolute bottom-[0] opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-x-[-4rem]  duration-700">
                  Publish
                </span>
              </button>
            </section>
          </span>
        ),
        false: (
          <span className="flex gap-1 items-center ">
            <section className="flex justify-center items-center">
              <button
                href="/"
                className="group flex justify-center p-2.5 rounded-full drop-shadow-xl  from-gray-800 text-white font-semibold  hover:rounded-[50%] transition-all duration-500 hover:from-[#331029] hover:to-[#310413] bg-red-600"
              >
                <span className="absolute bottom-[0] opacity-0 group-hover:opacity-100 group-hover:text-gray-700 group-hover:text-sm group-hover:-translate-x-[-4rem]  duration-700">
                  Unpublish
                </span>
              </button>
            </section>
          </span>
        ),
      },
    },

    {
      dataKey: "price",
      label: "Price",
      align: "left",
    },
    {
      dataKey: "createdAt",
      label: "No. of Papers",
      align: "left",
      type: "date",
    },
    { dataKey: "reported", label: "Reported Question", align: "left" },
  ];

  const { pastPaperList } = useSelector((state) => state.pastPapers);

  const [values, setValues] = useState({
    title: "",
    description: "",
    list: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  console.log("🚀 ~ PackageCreate ~ values:", values);

  return (
    <PackageForm
      handleChange={handleChange}
      values={values}
      tableData={pastPaperList || []}
      headCells={pastPaperKeys}
      apiUrl={`${pastPaperApi.endPoint}/package`}
      redirectUrl={`/main/exam/pastPapers`}
      title="Learn Package"
    />
  );
}

export default PackageCreate;
