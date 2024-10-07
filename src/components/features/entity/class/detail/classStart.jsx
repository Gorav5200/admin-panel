import React from "react";
import { ArrowLeft } from "lucide-react";
import { MicOff } from "lucide-react";
import { VideoOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useParams } from 'react-router-dom';

import {
  CustomButton,
  CustomButtonStyle,
} from "../../../../../styles/muiRoot";
const ClassStart = () => {
  const navigate = useNavigate();
    const params = useParams();
    const {examId,classId} = params;
    const history = useNavigate();

  return (
    <React.Fragment>
      <div className="m-8">
        <div className=" flex items-center">
          <ArrowLeft
            style={{
              backgroundColor: "white",
              borderRadius: "50%",
              padding: "5px",
            }}
            size={30}
            onClick={()=> history(`/main/exam/${examId}/class/${classId}/detail`)}
          />
          <h6 className=" ml-2 text-base font-medium">Start Class</h6>
        </div>

        <div className="mt-4 flex  p-3 rounded-md basis-[100%] bg-white">
          <div className="p-1 flex justify-between basis-[100%] m-[5%]">
            <div className=" bg-lightGrey  h-[300px] rounded-md w-[70%]">
              <div className="p-1 flex justify-center rounded-md mt-[45%]">
                <MicOff size={35} className=" bg-white rounded-full p-2 ml-1" />
                <VideoOff size={35} className=" bg-white rounded-full p-2 ml-1" />
              </div>
            </div>

            <div className=" bg-white w-[30%] ml-2  rounded-md p-4">
              <h6 className=" text-xl font-medium">Ready to start class ?</h6>
              <p className=" text-xs mt-1">127 Attendess Waiting</p>
              <div className=" mt-6 ">
                <p className=" text-sm mt-2">
                  Class Name : <b className=" text-primary">Arthmetic</b>
                </p>
                <p className=" text-sm mt-2">
                  Subject Name : <b className=" text-xs">Quantitive Ability</b>
                </p>
                <p className=" text-sm mt-2">Enrolled : <b className=" text-xs">200</b> </p>
                <CustomButton
                  style={{
                    ...CustomButtonStyle,
                    width: 117,
                    height: 39,
                    marginTop: "10%",
                  }}
                  onClick={() =>
                    navigate(
                      `/main/exam/${examId}/class/${classId}/live`
                    )
                  }
                >
                  End Class
                </CustomButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ClassStart;
