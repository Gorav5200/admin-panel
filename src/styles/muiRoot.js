import { createTheme, Button, styled } from "@mui/material";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

export const theme = createTheme({
  typography: {
    h3: {
      fontFamily: "var(--font-inter)",
      fontWeight: 700,
      fontSize: "32px",
      color: "var(--primary)",
    },
    subheading: {
      fontFamily: "var(--font-inter)",
      fontWeight: 700,
      fontSize: "16px",
      color: "var(--primary)",
    },

    paragraph: {
      fontFamily: "var(--font-inter)",
      fontSize: "15px",
    },

    text: {
      fontWeight: 500,
      fontFamily: "var(--font-inter)",
      fontSize: "15px",
    },
  },

  palette: {
    primary: {
      main: "#191932",
    },
    secondary: {
      main: "#f1f2f6", // Set your primary color here
    },
    // ... other palette options ...
  },

  root: {
    "& label.Mui-focused": {
      color: "white",
    },
    "& .MuiInput-underline:after": {
      borderBottomColor: "yellow",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "yellow",
      },
      "&.MuiDialog-root": {
        zIndex: 10000,
      },
    },
  },
});

export const ButtonStyle = {
  color: "var(--primary)",
  border: "1px solid #8D96A5",
  borderRadius: 3,
  textTransform: "none",
  height: 52,
  width: 163,
  fontFamily: "var(--font-inter)",
  fontWeight: 500,
  fontSize: 14,
  ":hover": {
    backgroundColor: "none",
    boxShadow: 1,
  },
};

export const CustomButtonStyle = {
  backgroundColor: "var(--primary)",
  width: 178,
  height: 46,
  fontFamily: "var(--font-inter)",
  fontSize: 13,
  borderRadius: 7,
  textTransform: "none",
  ml: 1,
  color: "white",
  ":hover": {
    backgroundColor: "var(--primary)",
  },
};

export const CustomButton = styled(Button)(({ style }) => ({
  textTransform: "none",
  fontSize: `${style?.fontSize}` || 15,
  fontWeight: 600,
  width: "fit-content" || `${style?.width}px`,
  height: `${style?.height}px`,
  borderRadius: ` ${style?.borderRadius}` || 3,
  backgroundColor: ` ${style?.backgroundColor}`,
  fontFamily: "var(--font-inter)",
  borderColor: `${style?.outlineColor || "black"}`,
  ...style,
  "&:hover": {
    backgroundColor: ` ${style?.backgroundColor}`,
    borderColor: `${style?.outlineColor || "black"}`,
  },

}));

export const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  border: "none",

  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

export const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.7rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: "row",
  "& .MuiAccordionSummary-expandIconWrapper": {
    transition: "transform 0.2s ease-in-out", // Add transition here
  },
  "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
    transform: "rotate(90deg)",
  },
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(0.5),
  },
}));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingTop: 0,
  borderTop: "none",
}));

export const GrayShadowButton=({children})=>{
  return (
    <button class="flex justify-center items-center gap-2 w-28 h-12 cursor-pointer rounded-md shadow-2xl text-white font-semibold bg-gradient-to-r from-[#C5C5C5] via-[#808080] to-[#808080] hover:shadow-xl hover:shadow-gray-500 hover:scale-105 duration-300 hover:from-[#808080] hover:to-[#808080]">
      <svg viewBox="0 0 15 15" class="w-5 fill-white">
        <svg
          class="w-6 h-6"
          stroke="currentColor"
          stroke-width="1.5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            stroke-linejoin="round"
            stroke-linecap="round"
          ></path>
        </svg>
        Button
      </svg>
      {children || "Delete"}
    </button>
  );
};


export const QueryEnum = Object.freeze({
  CLASS: "#E56C51",
  GROUP: "#FCB461",
  OTHER: "#ffff",
});

