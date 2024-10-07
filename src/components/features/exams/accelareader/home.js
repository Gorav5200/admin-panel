import {
  Avatar,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Chip,
  Divider,
  Skeleton,
} from "@mui/material";
import React, { useDeferredValue, useEffect, useMemo, useState } from "react";
import InputWithIcon from "../../../common/searchBox";
import { dateFormatting, filterData } from "../../../../services/common";
import { useNavigate, useParams } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { useGetCoursesQuery } from "../../../../services/apis/exam/courses";
import { Empty, Result } from "antd";
import { resetCoursesState } from "../../../../ducks/exams/courseSlice";
import { useDispatch } from "react-redux";
import Header, { HeaderWithNavigation } from "../../../common/header";
import { resetAddModule } from "../../../../ducks/addModuleSlice";
import { accelareaderApi } from "../../../../services/Constant";

import SearchField from "../../../common/searchField";

import PaginationTable from "../../../common/PaginationTable";
import { useGetAccelareaderQuery } from "../../../../services/apis/accelareader";
import { accelareadereHeader } from "../../../../services/constHeaders";
import { resetAccelareader } from "../../../../ducks/accelareaderSlice";

function Home() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accelareaderList, setAccelareaderList] = useState([]);
  const { data, isLoading, isSuccess, isError, isFetching } =
    useGetAccelareaderQuery(`${accelareaderApi.endPoint}/list`, {
      refetchOnMountOrArgChange: true,
    });

  useEffect(() => {
    dispatch(resetAccelareader());
  }, []);

  console.log("🚀 ~ Home ~ data:", data);

  if (isError) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <Result
          status="404"
          title="404"
          subTitle={"Some error occured to fetch data"}
          extra={<Button type="primary">Back Home</Button>}
        />
      </div>
    );
  }

  if (isSuccess && data?.accelareaderList.length === 0) {
    return (
      <div className="h-[80vh] flex justify-center items-center">
        <Empty description="No data Found" />
      </div>
    );
  }

  return (
    <div>
      <Header content={"Accelareader"} />
      <div className=" overflow-scroll h-[75vh] my-2 bg-white">
        <PaginationTable
          data={accelareaderList || []}
          columns={accelareadereHeader}
          loading={isLoading || isFetching}
          path={`/main/exam/accelareader`}
           searchBar={isLoading || isFetching ? (
            <Skeleton />
          ) : (
            <SearchField
              data={data.accelareaderList|| []}
              onFilter={(val) => setAccelareaderList(val)}
              searchBy={"subject"}
              placeholder={"Search By Topics"}

            />

          )}
          comp={ <Button
            variant="contained"
            startIcon={<PlusCircle size={18} />}
            onClick={() => navigate(`/main/exam/accelareader/create`)}
            sx={{
              backgroundColor: "var(--primary)",
              width: 178,
              height: 46,
              fontFamily: "var(--font-inter)",
              fontSize: 15,
              borderRadius: 2,
              textTransform: "none",
             
              ":hover": {
                backgroundColor: "var(--primary)",
              },
            }}
          >
            Create Topic
          </Button>}
         
        />
      </div>
    </div>
  );
}

export default Home;
