import * as React from "react";
import Card from "@mui/material/Card";
import {
  Box,
  Button,
  CardHeader,
  Chip,
  Divider,
  IconButton,
  Modal,
  Popper,
  Tooltip,
  Typography,
} from "@mui/material";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import {
  CustomButton,
  ButtonStyle,
  CustomButtonStyle,
} from "../../styles/muiRoot";
import TruncateText from "./FunctionComponents/truncate";
import {
  GroupNaming,
  randomColors,
  truncateTitle,
} from "../../services/common";
import { Check, ChevronRight, X, XIcon } from "lucide-react";
import EditIcon from "@mui/icons-material/Edit";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

export function ProfileCard({
  titleIcon,
  actionIcon,
  subHeader,
  FunctionButtons,
  style,
  truncate,
  mediaContent,
  extraComp,
}) {
  return (
    <Card
      sx={{
        minWidth: "26em",
        fontFamily: "var(--font-inter)",
        borderRadius: 2,
        p: 1,
        ...style,
      }}
    >
      <CardHeader
        sx={{ m: 0, pb: 0 }}
        avatar={
          <Avatar
            alt="Remy Sharp"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCpj7w5FSVRyofzC1reh7jGN87NEmeCb7amwsyc2xEmjwv0cIYrR0MKpvzrCAKWgOOwiY&usqp=CAU"
            sx={{ width: 56, height: 56 }}
          />
        }
        title={
          <div style={{ display: "flex", alignItems: "center" }}>
            Preethi Bajaj
            {titleIcon}
          </div>
        }
        subheader={subHeader}
        action={actionIcon}
      />

      <CardContent className="text-sm  font-inter font-[600] text-primary ">
        <h4 className="text-base text-secondary flex items-center">
          Course - CAT 2021 <ChevronRight size="15" /> Quants
        </h4>
        <p className="text-sm font-normal my-2 ">
          {" "}
          {truncate.status ? (
            <TruncateText
              text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. ..."
              maxLength={truncate.max}
            />
          ) : (
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. ..."
          )}
        </p>

        <CardMedia
          component="img"
          sx={{
            height: mediaContent?.mediaHeight || 50,
            width: mediaContent?.mediaWidth || 75,
            borderRadius: 2,
            my: 2,
          }}
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCpj7w5FSVRyofzC1reh7jGN87NEmeCb7amwsyc2xEmjwv0cIYrR0MKpvzrCAKWgOOwiY&usqp=CAU"
          alt="Paella dish"
        />
        <h4 className="text-secondary">ASSIGNED TO:</h4>
        <p>
          Dev Rana{" "}
          <span className="text-red-600 font-normal ml-2 text-xs">
            No response Since 1 hr
          </span>
        </p>

        {extraComp}
      </CardContent>

      <CardActions>
        {FunctionButtons?.map((item, i) => (
          <CustomButton
            key={i}
            style={item?.style}
            onClick={() => item?.func()}
          >
            {item?.name}
          </CustomButton>
        ))}
      </CardActions>

      <footer>
        <p className="text-right text-secondary text-xs">25 Jun</p>
      </footer>
    </Card>
  );
}

export function LabelCard({
  titleIcon,
  actionIcon,
  subHeader,
  label,
  data,
  FunctionButtons,
  style,
}) {
  return (
    <>
      <Card
        className="relative"
        sx={{
          minwidth: "27em",
          fontFamily: "var(--font-inter)",
          borderRadius: 2,
          p: 1,
          ...style,
        }}
      >
        {label && (
          <Chip
            className="absolute top-0 left-0  "
            label="Query"
            sx={{
              background: randomColors(["#E56C51", "#FCB461", "#24B6A4"]),
              color: "white",
              font: "600 14px var(--font-inter)",
              borderRadius: "0 5px 5px 0",
            }}
          />
        )}
        <CardHeader
          sx={{ m: 0, mt: label && 3, pb: 0 }}
          avatar={
            <Avatar
              alt="Remy Sharp"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCpj7w5FSVRyofzC1reh7jGN87NEmeCb7amwsyc2xEmjwv0cIYrR0MKpvzrCAKWgOOwiY&usqp=CAU"
              sx={{ width: 56, height: 56 }}
            />
          }
          action={actionIcon}
          title={
            <div style={{ display: "flex", alignItems: "center" }}>
              Preethi Bajaj
              {titleIcon}
            </div>
          }
          subheader={subHeader}
        />

        <CardContent className="text-sm  font-inter font-[600] text-primary ">
          <h4 className="text-base text-secondary ">
            Course - CAT 2021 Quants
          </h4>
          <p className="text-sm font-normal my-2 ">
            {" "}
            Need to inquire about how should I start preparing for my exam, is
            it better to select mocktest or course and will you conduct test ?
          </p>

          <CardMedia
            component="img"
            sx={{ height: 50, width: 75, borderRadius: 2, my: 2 }}
            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCpj7w5FSVRyofzC1reh7jGN87NEmeCb7amwsyc2xEmjwv0cIYrR0MKpvzrCAKWgOOwiY&usqp=CAU"
            alt="Paella dish"
          />
          <h4 className="text-secondary">
            ASSIGNED TO:{" "}
            <span className="text-red-600 font-normal ml-2 text-xs">
              No response Since 1 hr
            </span>
          </h4>
          <p>
            <GroupNaming
              names={[
                "Kanchan Raj G",
                " Deesha Kappor ",
                "name3",
                "name4",
                "name5",
              ]}
              maxNames={2}
            />
          </p>
        </CardContent>
        <CardActions>
          {FunctionButtons?.map((item, i) => (
            <CustomButton
              key={i}
              style={item?.style}
              onClick={() => item?.func()}
            >
              {item?.name}
            </CustomButton>
          ))}
        </CardActions>
        <footer>
          <p className="text-right text-secondary text-xs">25 Jun</p>
        </footer>
      </Card>
    </>
  );
}

export function MediaCard({ data, setValues, values, handleClose, ...props }) {
  console.log("🚀 ~ MediaCard ~ data:", data);

  const [isHovered, setIsHovered] = React.useState(false);
  const handleAdd = (media) => {
    console.log("🚀 ~ handleAdd ~ media:", media);

    const newValue = values === media ? "" : media;
    setValues(newValue);
  };

  return (
    <Card
      sx={{
        width: 300,
        boxShadow: 5,
        borderRadius: 3,
        ...props.style,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <CardMedia
        component="video"
        controls
        sx={{ width: "100%", height: 170 }}
        title="Video Title"
        muted
        loop
        preload="metadata"
      >
        <source src={data?.media} type="video/mp4" />
        Your browser does not support the video tag.
      </CardMedia>
      <CardHeader
        sx={{ p: 1, height: 60 }}
        title={
          <h5 gutterBottom className="font-inter text-base  font-bold">
            {data?.title}
          </h5>
        }
        subheader={
          <span className="text-xs">{data.topicId?.title || "N/A"}</span>
        }
        action={
          // <IconButton onClick={() => props.handleOpenModal()}>
          //   <EditIcon />
          // </IconButton>

          <CustomButton
            size="medium"
            sx={{
              borderRadius: 2,
              m:1,
              transition: "all 0.2s ease-in-out",
              bgcolor: values === data?.media ? "black" : null,
              color: values === data?.media ? "white" : "black",
              "&:hover": {
                bgcolor: values === data?.media ? "black" : "var(--med-grey)",
                color: values === data?.media ? "white" : "black",
              },
            }}
            onClick={() => handleAdd(data?.media)}
            startIcon={values === data?.media && <Check size={18} />}
          >
            {values === data?.media ? "Added" : "Add Video"}
          </CustomButton>
        }
      ></CardHeader>
      <Divider />
      <CardContent
        sx={{
          p: 1,
          height: 50,
          overflow: "scroll",
          bgcolor: "var(--light-grey)",
        }}
      >
        <p className="text-xs text-gray-900">
          <Tooltip placement="top" title={data?.description} arrow>
            {truncateTitle(data?.description, 10)}
          </Tooltip>
        </p>

       

      </CardContent>
    </Card>
  );
}

export function MediaModalCard({
  data,
  setValues,
  values,
  handleClose,
  ...props
}) {
  console.log("🚀 ~ MediaCard ~ data:", data);
  const videoRef = React.useRef(null);

  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const handleAdd = (media) => {
    console.log("🚀 ~ handleAdd ~ media:", media);

    const newValue = values === media ? "" : media;
    setValues(newValue);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  React.useEffect(() => {
    if (isModalOpen && videoRef.current) {
      videoRef.current.play();
    }
  }, [isModalOpen]);

  return (
    <Card
      sx={{
        width: 300,
        boxShadow: 5,
        borderRadius: 3,
        ...props.style,
      }}
    >
      <div style={{ position: "relative" }}>
        <CardMedia
          component="img" // Displaying thumbnail as an image
          sx={{ width: "100%", height: 170 }}
          image={
            data?.thumbnail ||
            "https://www.oyorooms.com/officialoyoblog/wp-content/themes/inframe/assets/images/no-thumbnail-medium.png"
          } // Assuming data.thumbnail holds the URL of the thumbnail
          title="Video Thumbnail"
        />
        <IconButton
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            bgcolor:"var(--med-grey)"

          }}
          onClick={handleOpenModal}
        >
          <PlayCircleIcon color="secondary" fontSize="large" />
        </IconButton>
      </div>

      <CardHeader
        sx={{ p: 1, height: 60 }}
        title={
          <h5 gutterBottom className="font-inter text-base  font-bold">
            {data?.title}
          </h5>
        }
        subheader={
          <span className="text-xs">{data.topicId?.title || "N/A"}</span>
        }
        action={
          <IconButton onClick={props.handleOpenModal}>
            <EditIcon />
          </IconButton>
        }
      ></CardHeader>
      <Divider />
      <CardContent
        sx={{
          p: 1,
          height: 50,
          overflow: "scroll",
          bgcolor: "var(--light-grey)",
        }}
      >
        <p className="text-xs text-gray-900">
          <Tooltip placement="top" title={data?.description} arrow>
            {truncateTitle(data?.description, 10)}
          </Tooltip>
        </p>

        {props.navigate && (
          <CustomButton
            size="medium"
            sx={{
              borderRadius: 2,
              transition: "all 0.2s ease-in-out",
              bgcolor: values === data?.media ? "black" : "var(--med-grey)",
              color: values === data?.media ? "white" : "black",
              "&:hover": {
                bgcolor: values === data?.media ? "black" : "var(--med-grey)",
                color: values === data?.media ? "white" : "black",
              },
            }}
            onClick={() => handleAdd(data?.media)}
            startIcon={values === data?.media && <Check size={18} />}
          >
            {values === data?.media ? "Added" : "Add Video"}
          </CustomButton>
        )}
      </CardContent>

      {/* Modal for playing video */}
      <Modal
        open={isModalOpen}
        onClose={handleCloseModal}
        aria-labelledby="video-modal-title"
        aria-describedby="video-modal-description"
      >
        <div className="modalRoot">
          {/* Video player */}
          <div className=" w-[50vw] max-h-[60vh] overflow-scroll">
            <section className="mb-1 flex justify-between items-center bg-medGrey rounded-t-md p-1">
              <h5 gutterBottom className="font-inter text-base  font-bold">
                {data?.title}
              </h5>
              <IconButton onClick={handleCloseModal}>
                <X />
              </IconButton>
            </section>

            <video
              ref={videoRef}
              muted
              controls
              autoFocus
              autoPlay
              about={data?.description}
              style={{
                borderRadius: "0 0 10px 10px",
                width: "100%",
                height: "50vh",
              }}
            >
              <source
                src={data?.media}
                className="object-contain"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </Modal>
    </Card>
  );
}
