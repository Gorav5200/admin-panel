import React, { useState } from "react";
import {
  Divider,
  Stack,
  Avatar,
  IconButton,
  Modal,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
} from "@mui/material";
import {
  CustomButton,
  ButtonStyle,
  CustomButtonStyle,
} from "../../../../../../../styles/muiRoot";
import { Dot, IndianRupee, IndianRupeeIcon, SaveIcon, X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useLinkCourseMutation } from "../../../../../../../services/apis/exam/courses";
import { toast } from "react-toastify";
import { setGroupDetails } from "../../../../../../../ducks/mockGroupsSlice";
import { useGetCoursesQuery } from "../../../../../../../services/apis/exam/courses";
import { courseApi } from "../../../../../../../services/Constant";
import { useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { BackdropLoader } from "../../../../../../common/lineLoader";
import { Empty } from "antd";

function LinkCourses() {
  const { groupDetails } = useSelector((state) => state.mockGroups);
const navigate = useNavigate();
const params=useParams();
  return (
    <>
      <div className="w-5/6 p-2 pt-0">
        <h5 className="text-base text-gray-700 font-normal m-2">
          When you link Courses, all the courses of those groups will be able to
          manage the group.
        </h5>
        <div className="cards h-[50vh] overflow-scroll p-3 scroll-smooth pe-4">
          {groupDetails?.courses.length === 0 ? (
            <div>
              <Empty description="No Data Found" />
            </div>
          ) : (
           
            <List>
                            {groupDetails?.courses.map((ele) => {
                              return (
                                <>
                                  <ListItem
                                   secondaryAction={
                                    <CustomButton  sx={{bgcolor:"var(--light-grey)",color:"black"}} onClick={()=>navigate(`/main/entity/${params.examId}/course/${ele._id}/view`)}>
                                      View Details
                                    </CustomButton>
                                   }
                                  >
                                    <ListItemAvatar>
                                      <Avatar
                                        alt="Profile"
                                        src={ele?.image}
                                        sx={{ color: "transparent" }}
                                      />
                                    </ListItemAvatar>
                                    <ListItemText
                                      primary={
                                        <h5 className="font-bold text-sm ">
                                        {ele.title}
                                        </h5>
                                      }
                                      secondary={
                                        <p className="text-xs text-secondary pt-1 ">
                                          Price :{ele.price ?? "N/A"}
                                        </p>
                                      }
                                    />
                                  </ListItem>
                                  <Divider />
                                </>
                              );
                            })}
            </List>
          )}
        </div>
      </div>
    </>
  );
}

export default LinkCourses;
