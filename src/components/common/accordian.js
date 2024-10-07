import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import {Typography,Box,Grow} from "@mui/material";
import Collapse from '@mui/material/Collapse';
import { useGetSubjectListQuery } from "../../services/apis/dataManagement/subject";
import { subjectApi } from "../../services/Constant";
import { useDispatch } from "react-redux";
import { setExamDetail } from "../../ducks/exams/examSlice";
import { resetQuestionBank } from "../../ducks/questionBankSlice";
import { setExpanded } from "../../ducks/drawerSlice";
import { useSelector } from "react-redux";
export default function CustomizedAccordions({heading,content}) {

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.7rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper': {
    transition: 'rotate 0.5s ease-in-out',  // Update transition property here
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(0.5),
  },
}));


const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <div>
      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
          <Typography>{heading}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          {content}
          </Typography>
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}


const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(() => ({
  border: 'none',
 
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.7rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  flexDirection: 'row',
  '& .MuiAccordionSummary-expandIconWrapper': {
    transition: 'transform 0.2s ease-in-out',  // Add transition here
  },
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(0.5),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  paddingTop: 0,
  borderTop: 'none',
}));


export const BorderLessAccordion = ({ header, content, id}) => {
  const dispatch = useDispatch();


  const {expanded} = useSelector(state => state.drawer)


  const handleChange = (panel) => (event, newExpanded) => {
    dispatch(setExpanded(newExpanded ? panel : false))
  
  };




  return (
    <Box sx={{ width: '100%' }} >
      <Accordion expanded={expanded === id} onChange={handleChange(id)}>
        <AccordionSummary aria-controls="content" id="header" sx={{ padding: 0, minHeight: 37 }}>
          {header}
        </AccordionSummary>
      
       <AccordionDetails>{content}</AccordionDetails>
      
       
      </Accordion>
    </Box>
  );
};








