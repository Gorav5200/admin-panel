export const ReferralHeader = [
  { dataKey: "title", label: "Referral name", minWidth: 170, align: "left" },
  {
    dataKey: "description",
    label: "Gift Description  ",
    minWidth: 170,
    align: "left",
    type:"html"
  },
  {
    dataKey: "isPublished",
    label: "Publishing Status",
    align: "left",
    maxWidth: 170,
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
  { dataKey: "earnValue", label: "Earn value  ", minWidth: 170, align: "left" },
  {
    dataKey: "discountValue",
    label: "Discount value  ",
    minWidth: 170,
    align: "left",
  },
  {
    dataKey: "endDate",
    label: "Expiry Date ",
    minWidth: 170,
    align: "left",
    type: "date",
  },
];


export const BundleHeader = [
    { dataKey: "title", label: "Reward name ", minWidth: 170, align: "left" },
    { dataKey: "description", label: "Reward Description ", minWidth: 170, align: "left" },
    { dataKey: "price", label: "Price", minWidth: 170, align: "left" },
    {
      dataKey: "coins",
      label: "Coin Value",
      align: "left",
      maxWidth: 170,
      type:"truncate"
    },
   
    { dataKey: "endDate", label: "Expiry Date ", minWidth: 170, align: "left" ,type:"date"},

  ];


export const RewardsHeader = [
  { dataKey: "title", label: "Reward name", minWidth: 170, align: "left" },
  {
    dataKey: "description",
    label: "Reward Description",
    maxWidth: 170,
    align: "left",
    type: "html",
  },
  {
    dataKey: "coins",
    label: "Coins",
    align: "left",
    minWidth: 170,
    type: "truncate",
  },
  {
    dataKey: "isPublished",
    label: "Publishing Status",
    align: "left",
    maxWidth: 170,
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
    dataKey: "endDate",
    label: "Expiry Date",
    minWidth: 170,
    align: "left",
    type: "date",
  },
];