import React, { useEffect, useMemo, useState,useRef ,useDeferredValue } from 'react'
import ListDrawer from '../../../../../common/listDrawer'
import { ListNormal } from '../../../../../common/list';
import IconlessRadio from '../../../../../common/radioGroup';
import InputWithIcon from '../../../../../common/searchBox';
import { Box, Button, Card, FormControlLabel, FormGroup,Checkbox, Chip, Divider, Skeleton, Stack, Typography, Popover,Paper,Collapse } from '@mui/material';
import { HTMLConverter } from '../../../../../../services/common';
import { HeaderWithNavigation } from '../../../../../common/header';
import Icon from '../../../../../common/Icon';
import { CustomButton, CustomButtonStyle } from '../../../../../../styles/muiRoot';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { setMockDetail,resetState } from "../../../../../../ducks/mockSlice";
import ConfirmationModal from '../../../../../common/confirmationModal';
import ModalComp from '../../../../../common/modal';
import { Filter } from "lucide-react";
import { toast } from "react-toastify";
import { useGetQuestionListQuery } from '../../../../../../services/apis/exam/questionBank';
import { questionApi,mocksApi } from '../../../../../../services/Constant';
import { useUpdateMockMutation } from '../../../../../../services/apis/exam/mock';


const EditQuestionList = () => {
    const params = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const examId = params.examId;
    const inputRef = useRef(null);
    const { mockDetail, selectedQuestionsList } = useSelector(state => state.mock);
    const { sections } = mockDetail;
    const [isConfirmationModalOpen, setIsConfirmationModalOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedSectionId, setSelectedSectionId] = useState(sections[0]?.section._id);
    const [selectedSectionTitle, setSelectedSectionTitle] = useState();
    const [selectedItems, setSelectedItems] = React.useState([])
    const [active, setActive] = useState(0);
    const [loading, setLoading] = useState(false);
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchValue, setSearchValue] = useState("");
    const [selectedChips, setSelectedChips] = useState([]);
    const [selectAll, setSelectAll] = useState(false);
    const [queryParameters,setQueryParameters]=useState('');
    const [refetchData,setRefetchData]=React.useState(true);
    const [filteredList,setFilteredList] = useState([]);
    const [saveChanges,setSaveChanges]=useState(false);
    const [values, setValues] = useState({
        section: sections[0]?.section?._id
    });
    const [updateMock, { isLoading: isLoadingUpdate, isError: isErrorUpdate }] = useUpdateMockMutation();
   
    //function to filter already selected questions in a section
    //linked with tab change
    const filterSelectedQuestions=(sectionId)=>{
        let data = selectedQuestionsList?.filter(item=>item.section==sectionId)[0];
        if(data)
        {
        let selectedIds = data.questions.map(it=>{return it._id});
        return selectedIds;}
        else return [];
     }
    const {
        handleOpen,
        handleClose,
        ModalComponent, } = ModalComp();

        const {
            data: questionList,
            isLoading,
        } = useGetQuestionListQuery(`${questionApi.endPoint}/subject/${selectedSectionId}`, { refetchOnMountOrArgChange: refetchData })
   
    //called when tab switched  
    useEffect(() => {
        
        setValues((prevValues) => ({
            ...prevValues,
            section: sections[active]?.section._id
        }));
        setSelectedSectionId(sections[active]?.section._id);
        setSelectedSectionTitle(sections[active]?.section.title);
        setSelectedItems(filterSelectedQuestions(sections[active]?.section._id));
        setRefetchData(true)
    }, [active]);


    useEffect(() => {
        
        getHandleData(sections[0]?.section.title, sections[0].section._id)
        
    }, [])
   
    useEffect(()=>{},[selectedQuestionsList]);
    

   
    //Function's for getting thr data from components
    const getHandleData = (_id, val) => {
        setSelectedSectionId(val);
        let sindex = sections.findIndex(itm => itm.section._id == val);
        setSelectedSectionTitle(sections[sindex].section.title);
        setValues({ ...values, [_id]: val });
        
        
    };

   
    // Define a function to update the selected items
    const handleCheckboxChange = (data) => {
        if (selectedItems.includes(data._id)) {
          setSelectedItems((prevItems) => prevItems.filter((item) => item !== data._id));
          if (selectAll) {
            setSelectAll(false); // Uncheck the "Select All" if an individual checkbox is unchecked.
          }
        } else {
          console.log("97:",selectedItems);
          setSelectedItems((prevItems) => [...prevItems, data._id]);
          const allItemIds = questionList?.data?.question_banks.map(item => item._id) || [];
          if (selectedItems.length + 1 === allItemIds.length) {
            setSelectAll(true); // Check the "Select All" if all individual checkboxes are checked.
          }
        }
      };

    const handleSelectAll = () => {
        if (selectAll) {
            setSelectedItems([]);
        } else {
            const allItemIds = questionList?.data.question_banks.map(item => item._id) || [];
            setSelectedItems(allItemIds);
        }
        setSelectAll(!selectAll);
    };


    const handleMockNext = () => {
       handleOpen();
    }

  
 //g 
  const handleInputClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsPopoverOpen(true);
    
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };
  
  //g
  const handleClosePopover = () => {
    setIsPopoverOpen(false);
  };
  
  //g
  useEffect(() => {
    if (isPopoverOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isPopoverOpen]);
  
//g
  const handleChipClick = (value) => {
    // Toggle chip selection
    if (selectedChips.includes(value)) {
      setSelectedChips(selectedChips.filter((chip) => chip !== value));
    } else {
      setSelectedChips([value]);
    }
  };


 const handleSectionTab = async() => {
        if (active <= sections?.length - 1) {
            // console.log("selected filtered data:",filteredData.length);
            let obj = { section: selectedSectionId, title: selectedSectionTitle, questions: filteredData };
            dispatch(setMockDetail({ data: obj,section:selectedSectionId }));
            
            setTimeout(() => {
                setLoading(false);
                if(active<sections?.length - 1)
                { 
                setActive((prev) => prev + 1);
                setSelectedItems([]);
                setLoading(true);
                handleClose();
                }
               
               
            }, 1000);
        } if(active==sections.length-1) {
            handleClose();
            setSaveChanges(true);
            
           
        }
    };

 //g
useEffect(() => {
getHandleData(sections[0]?.section.title, sections[0]?.section._id);
 }, []);



const makeFilterRequest = () => {
   
    let x = questionList?.data.question_banks.filter(item=>{
    return item[selectedChips[0]]==searchValue});
    setFilteredList(x);
 };

 const handleFormatMockData = () => {
    let data = { ...mockDetail }
    
   
    const updatedData = data.sections.map((item, sindex) => {
        let index = selectedQuestionsList.findIndex(it => it.section == item.section._id);
        
        if (index > -1)
       { 

        if(data.commonTimer==null||!data.commonTimer)
           { 
            return { 
                section:item.section._id,positiveMarks:item.positiveMarks,negativeMarks:item.negativeMarks,timer: item.timer, questions: selectedQuestionsList[index].questions.map(q => q._id) 
            }
           }
         else{
            return { 
                section:item.section._id,positiveMarks:item.positiveMarks,negativeMarks:item.negativeMarks ,questions: selectedQuestionsList[index].questions.map(q => q._id) 
            }  
        }
      }
        }
    );
    data.sections = updatedData;
   
    return data;

}
 const handleMockUpdate=async()=>{
    try {
        // Call the addMock mutation
        
        let x = await handleFormatMockData();
        console.log("XXXXX",x);
        const response = await updateMock({
            endpoint: `${mocksApi.endPoint}/${mockDetail._id}`,
            updateMock: x
        });
        console.log("response:",response.data);
        //Navigate to the desired path after successful deletion
        
        if (response && response?.data?.success==true) {
            // Navigate to the desired path after successful deletion
            
            
            toast.success("Mock Updated Successfully!", {
                autoClose: 2000,
                onOpen: () => {
                    navigate(`/main/exam/${params.examId}/mocks/${mockDetail._id}`);
                    //handleCloseModal();
                }

                // Auto close the toast after 3 seconds
            });
            //
        } else {
            toast.error("Mock Update Failed", {
                autoClose: 2000
            });
          
        }
    } catch (error) {
        console.error("Error add question api:", error);
    }
 }
      
    
const filteredData = useMemo(() => {
        return questionList?.data.question_banks.filter((item) =>
          selectedItems.includes(item._id)
        );
 }, [questionList, selectedItems ]);
    
    

    return (
      <div className="h-screen ">
        <HeaderWithNavigation cont={mockDetail?.title||"Mock Detail"} />
        <div className="w-2/6 p-4">
        <Box sx={{ "& > :not(style)": { m: 1 } }}>
          <div className="flex gap-1 items-start">
            <InputWithIcon
              placeholder="Search by Topics, MockTag, Subtopic, or Question Type"
              handleChange={(e) => setSearchValue(e.target.value)}
              value={searchValue}
              onClick={handleInputClick} // Open popover on input click
              ref={inputRef} 
            />
            <CustomButton
              variant="contained"
              size="small"
              sx={{
                ...CustomButtonStyle,
                mt: 1,
                borderRadius: 2,
                width: 100,
                height: 40,
              }}
               onClick={makeFilterRequest}
            >
              Search
            </CustomButton>
          </div>
          <Collapse in={isPopoverOpen}>
            <Popover
              open={isPopoverOpen}
              anchorEl={anchorEl}
              onClose={handleClosePopover}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
         
            >
              <Paper sx={{ p: 2 }}>
                <h5 className="font-inter font-medium text-gray-800 flex items-center">
                  Search By : <Filter size={18} />
                </h5>
                <div className="flex gap-3 mt-2">
                  {[
                   // { name: "Topics", value: "topics" },
                    { name: "MockTag", value: "mock_tag" },
                   // { name: "Subtopic", value: "subtopic" },
                    { name: "Question Type", value: "question_type" },
                  ].map((item) => (
                    <Chip
                      label={item.name}
                      onClick={() => handleChipClick(item.value)}
                      color={
                        selectedChips.includes(item.value)
                          ? "primary"
                          : "default"
                      }
                    />
                  ))}
                </div>
              </Paper>
            </Popover>
          </Collapse>
        </Box>
        </div>
            <div className="flex px-5 pb-5" >
                <IconlessRadio
                    data={sections?.map((da, index) => ({
                        title: da.section.title,
                        value: da.section._id,

                    }))}
                    style={{
                        width: 170,
                        height: 100,
                        borderRadius: 2,
                        rowGap: 2,
                        fontSize: 14,
                    }}
                    row={true}
                    setData={(val) => getHandleData("section", val)}
                    value={values.section}
                    id="section"
                    disabled={true}
                />
                <h4>Selected Question :  <Chip size='small' color="success" label={filteredData?.length}/></h4>
            </div>

            <div className='flex h-[85%] bg-white'>

                <div className='basis-3/12 h-full overflow-scroll'>
                    <header className="header sticky top-0 z-50 bg-[#F4F3FE] flex justify-between items-center">
                        <h5 className="text-primary text-base font-bold font-inder p-2">
                            Questions
                        </h5>

                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={selectAll}
                                        onChange={handleSelectAll}
                                    />
                                }
                                label={<p>Select All</p>}
                            />
                        </FormGroup>
                        <Divider />
                    </header>
                    {isLoading==true ? (
                        <Box
                            sx={{
                                bgcolor: "white",
                                p: 2,
                                width: "100%",
                                display: "flex",
                                justifyContent: "center",
                                flexDirection: "column",
                                gap: 2,
                            }}
                        >
                            {[...Array(20)].map(() => (
                                <Skeleton
                                    sx={{ bgcolor: "grey.200" }}
                                    variant="rounded"
                                    width={210}
                                    height={48}
                                />
                            ))}
                        </Box>
                    ) : (
                        <ListNormal selectedItems={selectedItems}
                            onCheckboxChange={handleCheckboxChange}
                            style={{ borderRight: "1px solid var(--med-grey)" }}
                            data = {filteredList.length>0?filteredList:questionList?.data.question_banks||[]}
                            />)}
                </div>
                <div className='basis-10/12'>
                    <header className="header sticky top-0 z-50 bg-medGrey  bg-[#F4F3FE] ">
                        <h5 className="text-primary text-base font-bold font-inder p-2">
                            Preview
                        </h5>
                        <Divider />
                    </header>
                    {isLoading==true ? <Box
                        sx={{
                            bgcolor: "white",
                            p: 2,
                            width: "100%",
                            display: "flex",
                            justifyContent: "center",
                            flexDirection: "column",
                            gap: 2,
                        }}
                    >
                        <Skeleton variant="rounded" width={600} height={20} />
                        <Skeleton variant="rectangular" width={600} height={60} />
                        <Skeleton variant="rectangular" width={600} height={300} />

                        {[...Array(4)].map(() => (
                            <div className='flex gap-4'>
                                <Skeleton variant="circular" width={30} height={30} />
                                <Skeleton variant="rectangular" width={400} height={30} />
                            </div>
                        ))}

                    </Box> :
                        filteredData?.length === 0 || filteredData?.length === null ?
                            <div className='flex items-center justify-center h-[70%]'>
                                <h1>No Selected Data</h1>
                            </div> :
                            <div className='h-[80%] overflow-scroll'>
                                {filteredData?.map((item, index) => {
                                    return (
                                        <>
                                            <Card sx={{
                                                margin: "30px",
                                                borderRadius: "10px ",
                                                boxShadow: "md"
                                            }}>
                                                <div key={index} className="h-auto bg-white mx-3 rounded-md p-2 overflow-scroll pt-10">
                                                    <div className="flex justify-between align-top border-b-2 p-2 ">
                                                        <div>
                                                            <span className="text-base font-inter font-bold">
                                                                {/* {question?.difficulty_level_manual} */}
                                                                QID - {item?.qid}  {item?.difficulty_level_manual}
                                                            </span>


                                                            <Stack
                                                                justifyContent={"space-between"}
                                                                direction="row"
                                                                alignItems="baseline"
                                                                spacing={3}
                                                                pt={2}
                                                            >
                                                                <p className="text-sm font-inter text-darkblue ">
                                                                    {/* {question?.question_type},{" "} */}
                                                                    Multiple choice,
                                                                    <HTMLConverter>
                                                                        {!item.question?.context && "No context"}
                                                                    </HTMLConverter>
                                                                </p>
                                                                <p className="font-inter text-sm text-darkblue">
                                                                    Marks allocated: {item.marks}
                                                                </p>
                                                                <p className="font-inter text-sm text-darkblue">
                                                                    Topic: <Chip size='small' color="success" label={item?.topic_id[0]?.title} />
                                                                </p>
                                                                <p className="font-inter text-sm text-darkblue">
                                                                    Subtopic: <Chip size='small' color="success" label={item?.subtopic_id[0]?.title} />
                                                                </p>
                                                            </Stack>
                                                        </div>
                                                    </div>
                                                    <div className="text-sm font-inter text-darkblue flex flex-col gap-3 mt-3 p-2">
                                                        <p>
                                                            <HTMLConverter>
                                                                {item.question}
                                                            </HTMLConverter>
                                                        </p>
                                                        <div className="answer-section mt-2">
                                                            <h5 className="font-bold text-base">Answer</h5>
                                                            {item?.options?.map((i, index) => (
                                                                <div className="flex gap-2 w-5/6 mt-2" key={index}>
                                                                    {console.log("==>", i, "===>", item?.answer)}
                                                                    <Card
                                                                        sx={{
                                                                            width: "max-content",
                                                                            border: "1px solid #D6D7D9",
                                                                            p: 1.5,
                                                                            boxShadow: "none",
                                                                        }}
                                                                    >
                                                                        <text variant="text">
                                                                            {
                                                                                <span className="text-primary font-medium px-1">
                                                                                    {String.fromCharCode(65 + index)}
                                                                                </span>
                                                                            }
                                                                        </text>
                                                                    </Card>
                                                                    <Card
                                                                        sx={{
                                                                            border:
                                                                                "1px solid #D6D7D9",
                                                                            minWidth: "60%",
                                                                            alignItems: "center",
                                                                            p: 1.5,
                                                                            boxShadow: "none",
                                                                        }}
                                                                    >
                                                                        <p variant="text">
                                                                            {i}
                                                                        </p>
                                                                    </Card>
                                                                    <Card
                                                                        sx={{
                                                                            width: "max-content",
                                                                            border: "1px solid #D6D7D9",
                                                                            p: 1.5,
                                                                            background:
                                                                                i === item?.answer && "#24B670",
                                                                            boxShadow: "none",
                                                                        }}
                                                                    >
                                                                        <Icon name="Check" color="white" />
                                                                    </Card>
                                                                </div>
                                                            ))}
                                                        </div>

                                                    </div>
                                                </div>
                                            </Card>
                                      
                                        </>
                                    )
                                })}
                              {saveChanges==false&&<div className='text-end pr-10 pt-10'>
                                    <CustomButton
                                        style={{ ...CustomButtonStyle, fontSize: 12, height: 40 }}
                                        onClick={handleMockNext}
                                    >
                                        Next
                                    </CustomButton>
                                </div>}
                                {saveChanges==true&&<div className='text-end pr-10 pt-10'>
                                    <CustomButton
                                        style={{ ...CustomButtonStyle, fontSize: 12, height: 40 }}
                                        onClick={handleMockUpdate}
                                    >
                                        Save Changes
                                    </CustomButton>
                                </div>}
                            </div>}
                    <ConfirmationModal handleClose={handleClose} handleSectionTab={handleSectionTab} ModalComponent={ModalComponent} setActive={setActive} loading={loading} active={active} />
                </div>

    </div>
    </div>
  );
};

export default EditQuestionList;
