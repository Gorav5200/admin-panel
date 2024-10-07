import {
  Card,
  CardActionArea,
  CardActions,
  Divider,
  Skeleton,
  CardContent,
  AppBar,
  Container,
  Toolbar,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import {
  truncateTitle,
} from "../../../../../../services/common";

import { useNavigate } from "react-router-dom";
import ImportModules from "./importModules";
import { Package } from "lucide-react";
import { Empty } from "antd";

function ModulesMain() {
  const { learn } = useSelector((state) => state.courses);
  const navigate = useNavigate();

  return (
    <div className=" overflow-scroll p-2">
      <AppBar
        position="static"
        color="secondary"
        sx={{ boxShadow: "none", borderRadius: 1, mb: 1 }}
      >
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            justifyContent={"space-between"}
            display={"flex"}
          >
            <Package size={18} />{" "}
            <h5 className="font-inter text-xl font-semibold">Modules</h5>
            <div
              className={
                learn?.modules.length > 0 ? " ml-auto visible" : "invisible"
              }
            >
              <ImportModules />
            </div>
          </Toolbar>
        </Container>
      </AppBar>
      <div className="flex flex-col ">
        {learn?.modules.length > 0 ? (
          <>
            <div className="flex flex-wrap justify-start gap-5 gap-y-8 my-2 p-3">
              {learn?.modules.map((item) => (
                <Card
                  key={item._id}
                  sx={{
                    maxWidth: 345,
                    minWidth: 345,
                    borderRadius: 2,
                    height: "max-content",

                    position: "relative", // Added position relative to position the absolute container
                  }}
                  className="text-white relative group"
                >
                  <CardActionArea
                    sx={{ display: "block", fontStyle: "italic" }}
                    onClick={() => navigate(`/main/exam/module/${item._id}`)}
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
                      <h5 className="text-white text-xl font-semibold m-2 absolute bottom-2 z-50 ">
                        {item?.title || "N/A"}
                      </h5>
                    </CardContent>

                    <Divider />
                    <CardContent
                      sx={{
                        justifyContent: "space-between",
                        display: "flex",
                        p: 1,
                      }}
                      disableGutters
                      className="z-50"
                    >
                      <h5 className="text-secondary text-sm basis-[65%]">
                        Entity:
                        <span className="text-primary font-bold">
                          {item?.entity || item?.entity?.title || "N/A"}
                        </span>
                      </h5>
                      <h5 className="text-secondary text-sm basis-[35%]">
                        Entity Type:
                        <span className="text-primary font-bold">
                          {item?.entityType || item?.entityType?.title || "N/A"}
                        </span>
                      </h5>
                    </CardContent>
                    <div className="flex justify-between z-50">
                      <h5 className="text-secondary text-sm ml-2 my-1 basis-[65%]">
                        {truncateTitle(item.description, 3)}
                      </h5>
                      <h5 className="text-secondary text-sm ml-0 mx-2 my-1 flex items-center basis-[35%] gap-3">
                        Subject :
                        {item?.subject || item?.subject?.title || "N/A"}
                      </h5>
                    </div>
                  </CardActionArea>
                </Card>
              ))}
            </div>
          </>
        ) : (
          <div className="flex justify-center items-center  w-full h-[70vh]">
            <Empty
              image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
              imageStyle={{
                height: 80,
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
              description={null}
            >
              <ImportModules />
            </Empty>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModulesMain;
