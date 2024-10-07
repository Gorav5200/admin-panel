import { Avatar } from "@mui/material";

export const questionBankHeader = [
  { dataKey: "qid", label: "Question ID", minWidth: 170 },
  { dataKey: "question", label: "Question", minWidth: 170, type: "html" },
  //  { dataKey: "subject_id", label: "Subject"},
  // { dataKey: "topic_id", label: "Topic", align: "left" },
  {
    dataKey: "question_type",
    label: "Question Type",
    align: "left",
    type: "checkQuestionType",
  },
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
    dataKey: "difficulty_level_manual",
    label: "Level",
    align: "left",
  },
  { dataKey: "marks", label: "Marks", align: "left" },
  { dataKey: "reported", label: "Reported Qs", align: "left" },
];

export const assignmentHeader = [
  { dataKey: "title", label: "Assignment Name", maxWidth: 170 },
  {
    dataKey: "subject",
    label: "Subject Name",
    align: "left",
    type: "object",
  },
  {
    dataKey: "topic",
    label: "Topic",
    align: "left",
    type: "array",
  },

  {
    dataKey: "totalQuestions",
    label: "No. of Questions",
    align: "left",
    showValue: { yes: "Publish", no: "Unpublish" },
  },
  {
    dataKey: "coin",
    label: "Coins",
    align: "left",
  },

  {
    dataKey: "points",
    label: "Points",
    align: "left",
  },
  {
    dataKey: "charge",
    label: "Price",
    align: "left",
  },
];

export const packageHeader = [
  { dataKey: "title", label: "Package Name", minWidth: 170 },
  // {
  //   dataKey: "isPublished",
  //   label: "Publishing Status",
  //   align: "left",
  //   showValue: {
  //     true: (
  //       <Avatar
  //         sx={{
  //           backgroundColor: "green",
  //           width: 15,
  //           height: 15,
  //           color: "green",
  //         }}
  //       ></Avatar>
  //     ),
  //     false: (
  //       <Avatar
  //         sx={{ backgroundColor: "red", width: 15, height: 15, color: "red" }}
  //       ></Avatar>
  //     ),
  //   },
  // },
  {
    dataKey: "description",
    label: "Description",
    align: "left",
    type: "html",
  },

  {
    dataKey: "totalItems",
    label: "No. of items",
    align: "left",
    showValue: { yes: "Publish", no: "Unpublish" },
  },
];

export const learnHeader = [
  { dataKey: "title", label: "Learn Title" },
  { dataKey: "topic", label: "Topic Name", type: "object" },
  { dataKey: "subTopic", label: "Sub-Topics" },
  {
    dataKey: "status",
    label: "Publishing Status",
    align: "left",
  },

  {
    dataKey: "reported",
    label: "Reported questions",
    align: "left",
  },
];

export const practiceQaHeader = [
  { dataKey: "title", label: "Quiz Name", minWidth: 170 },

  {
    dataKey: "topic",
    label: "Topic",
    align: "left",
    type: "array",
    showValue: {
      yes: (
        <Avatar
          sx={{
            backgroundColor: "green",
            width: 15,
            height: 15,
            color: "green",
          }}
        ></Avatar>
      ),
      no: (
        <Avatar
          sx={{ backgroundColor: "red", width: 15, height: 15, color: "red" }}
        ></Avatar>
      ),
    },
  },
  {
    dataKey: "difficultyLevel",
    label: "Difficulty Level",
    align: "left",
  },
  {
    dataKey: "totalQuestions",
    label: "No. of Questions",
    align: "left",
    showValue: { yes: "Publish", no: "Unpublish" },
  },
  {
    dataKey: "coin",
    label: "Coins",
    align: "left",
  },

  {
    dataKey: "points",
    label: "Points",
    align: "left",
  },
  {
    dataKey: "price",
    label: "Price",
    align: "left",
  },
];

export const dailyQuizHeader = [
  { dataKey: "title", label: "Quiz Name", minWidth: 170 },
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
    dataKey: "entity",
    label: "Entity",
    align: "left",
    type: "object",
  },
  {
    dataKey: "entityType",
    label: "Entity Type",
    align: "left",
    type: "object",
  },
  {
    dataKey: "totalQuestions",
    label: "No. of Questions",
    align: "left",
  },

  { dataKey: "reported", label: "Reported Question", align: "left" },
];

export const pastPaperHeader = [
  { dataKey: "title", label: "Papers Name", minWidth: 170 },
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
    dataKey: "entityType",
    label: "Subject Name",
    align: "left",
  },
  {
    dataKey: "questionsLength",
    label: "No. of Questions",
    align: "left",
  },
  {
    dataKey: "price",
    label: "Price",
    align: "left",
  },
  // {
  //   dataKey: "questionsLength",
  //   label: "No. of Papers",
  //   align: "left",

  // },
  { dataKey: "reported", label: "Reported Question", align: "left" },
];

export const mockTestHeader = [
  { dataKey: "title", label: "Mock Name ", minWidth: 170, align: "left" },
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
    dataKey: "sections",
    label: "Subject Name",
    align: "left",
    type: "array",
  },

  {
    dataKey: "price",
    label: "Price",
    align: "left",
  },

  { dataKey: "startDate", label: "Test Date", align: "left", type: "date" },
  { dataKey: "reported", label: "Reported Questions", align: "left" },
];

export const groupHeader = [
  {
    dataKey: "displayPic",
    label: "Profile ",
    minWidth: 170,
    align: "left",
    type: "avatar",
  },

  { dataKey: "title", label: "Group Name ", minWidth: 170, align: "left" },
  {
    dataKey: "description",
    label: "Description ",
    minWidth: 170,
    align: "left",
    type: "html",
  },
  {
    dataKey: "status",
    label: "Publishing Status",
    align: "left",
  },
  {
    dataKey: "groupType",
    label: "Group Type",
    align: "left",
  },
];
export const moduleHeader = [
  { dataKey: "_id", label: "Id", minWidth: 170, align: "left" },

  { dataKey: "title", label: "Module Name ", minWidth: 170, align: "left" },
  {
    dataKey: "description",
    label: "Description",
    align: "left",
    maxWidth: 140,
    type: "truncate",
  },
  {
    dataKey: "entity",
    label: "Entity",
    align: "left",
  },

  {
    dataKey: "entityType",
    label: "Entity Type",
    align: "left",
  },

  { dataKey: "subject", label: "Subject", align: "left" },
];

export const accelareadereHeader = [
  { dataKey: "subject", label: "Subject Name ", minWidth: 170, align: "left" },
  { dataKey: "topic", label: "Topic ", minWidth: 170, align: "left" },
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
];
