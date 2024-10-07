import React from 'react'
import PackageDetailCommon from '../../commonFeatures/packageDetailCommon';
import { learnApi, pastPaperApi } from '../../../../services/Constant';
import { useSelector } from 'react-redux';


function PackageDetail() {
  const { pastPaperList } = useSelector((state) => state.pastPapers);

 const pastPaperKeys = [
        { dataKey: "title", label: "Title", minWidth: 170},
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
  return (
    <div>
    <PackageDetailCommon headCells={pastPaperKeys}   tableData={pastPaperList || []} apiUrl={`${pastPaperApi.endPoint}/package`}/>
    </div>
  )
}

export default PackageDetail;