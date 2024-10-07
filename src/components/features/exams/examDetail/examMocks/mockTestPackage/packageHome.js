import * as React from "react";
import Card from "@mui/material/Card";
import { CardActions, CardActionArea, Avatar, Skeleton } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Divider } from "@mui/material";
import Chip from "@mui/material/Chip";
import InputWithIcon from "../../../../../common/searchBox";
import { useNavigate, useParams } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { useGetMockPackagesQuery } from "../../../../../../services/apis/exam/mock";
import { dateFormatting } from "../../../../../../services/common";
import { resetState } from "../../../../../../ducks/mockPackageSlice";
import { useDispatch } from "react-redux";
import { mockPackageApi } from "../../../../../../services/Constant";
import SearchField from "../../../../../common/searchField";

function PackageHome() {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const [filterWrapper, setFilterWrapper] = React.useState([]);
  const {
    data: getPackageData,
    isLoading,
    isError,
  } = useGetMockPackagesQuery(
    `${mockPackageApi.endPoint}/entity/${params.examId}`,
    {
      refetchOnMountOrArgChange: true,
    }
  );

  React.useEffect(() => {
    dispatch(resetState());
  }, []);




  return (
    <div>
      <div className="p-1 flex justify-between items-center  sticky top-0">
        <div className="basis-1/3">
            <SearchField
            data={ getPackageData?.data}
            onFilter={(val) =>setFilterWrapper(val)}
            searchBy={"title"}
            placeholder={"Search By Package name"}
          />
        </div>
        <div className="basis-auto float-right">
          <Button
            variant="contained"
            startIcon={<PlusCircle size={18} />}
            onClick={() =>
              navigate(`/main/exam/${params.examId}/mocks/package/create`)
            }
            sx={{
              backgroundColor: "var(--primary)",
              width: 178,
              height: 46,
              fontFamily: "var(--font-inter)",
              fontSize: 15,
              borderRadius: 2,
              textTransform: "none",
              ml: 1,
              ":hover": {
                backgroundColor: "var(--primary)",
              },
            }}
          >
            Create Package
          </Button>
        </div>
      </div>
  
      <div className="flex flex-wrap justify-between gap-3 gap-y-8 overflow-scroll h-[75vh] pb-10 p-2">
     {isLoading ? (
    // Render loading skeleton here
      Array.from({ length: 20 }).map((_, ind) => (
       <div key={ind} className="skeleton-card">
      <Skeleton variant="rounded" width={300} height={168} />
      <Skeleton />
      <Skeleton width="60%" />
      </div>
    ))
  ) : (
    filterWrapper?.map((item, ind) => (
      <Card sx={{ maxWidth: 360, minWidth: 345, borderRadius: 2, height:"max-content" }}>
            <CardActionArea
              sx={{ display: "block" }}
              onClick={() =>
                navigate(
                  `/main/exam/${params.examId}/mocks/package/view/${item._id}`
                )
              }
            >
              <CardContent
                component="div"
                alt="green iguana"
                sx={{
                  height: "13em",
                  p: 0,
                  position: "relative",
                  backgroundImage: `url(${"/backgroundImages/bg.png"})`,
                  objectFit: "cover",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
              >
                <Chip
                  label={`₹ ${item.price}`}
                  color="primary"
                  sx={{ borderRadius: "0 0 5px 0" }}
                />
                <h5 className="text-white text-xl font-semibold  m-2 absolute bottom-2">
                  {" "}
                  {item.title}
                </h5>
              </CardContent>

              <Divider />
              <CardActions sx={{ justifyContent: "space-between" }}>
                <h5 className="text-secondary  text-sm ">
                  Start:
                  <span className="text-primary font-bold">
                    {item.startDate
                      ? dateFormatting(item.startDate).date
                      : "N/A"}
                  </span>
                </h5>
                <h5 className="text-secondary  text-sm ">
                  Total Users:
                  <span className="text-primary font-bold">
                    {item.totalUsers}
                  </span>
                </h5>
              </CardActions>
             <div className="flex justify-start">
             <h5 className="text-secondary text-sm mx-2 my-1 basis-[70%]">
                Created on {dateFormatting(item.createdAt).date}
              </h5>
              <h5 className="text-secondary  text-sm  my-1 flex items-center basis-[30%] gap-3 pl-1">
                Status :  
                <Avatar
                  sx={{
                    backgroundColor: item.isPublished ? "green" : "red",
                    width: 15,
                    height: 15,
                    color: item.isPublished ? "green" : "red",
                  }}
                ></Avatar>
              </h5>
             </div>
            </CardActionArea>
      </Card>
    ))
  )}
</div>


     
    </div>
  );
}

export default PackageHome;
