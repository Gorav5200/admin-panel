import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import the Swiper styles
import { Navigation, Pagination ,Mousewheel} from "swiper/modules";
import ButtonGroup from "@mui/material/ButtonGroup";
import "react-toastify/dist/ReactToastify.css";
import { IconButton, Stack } from "@mui/material";
import { ChevronLeft, ChevronRight } from "lucide-react";
import PracticeCardView from "../features/learn/learnTopicsdetail/practiceCard";

const SwiperComp = ({ content }) => {
  const swiperRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(content?.length || 0);

  const handlePrev = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current) {
      swiperRef.current.swiper.slideNext();
    }
  };

  return (
    <>
      <Stack direction="row" justifyContent={"space-between"}>
      <h5 className="text-base float-left font-bold  mb-2">
           Questions
           </h5>
        <ButtonGroup
          disableElevation
          variant="text"
          aria-label="Disabled elevation buttons"
        >
          <IconButton onClick={handlePrev} sx={{ color: "black" }}    disabled={currentSlide  === 0}>
            <ChevronLeft />
          </IconButton>
          <p className="font-inter mt-2">
            {currentSlide + 1} / {totalSlides}
          </p>
          <IconButton
            onClick={handleNext}
            sx={{ color: "black" }}
            disabled={currentSlide + 1 === totalSlides}
          >
            <ChevronRight />
          </IconButton>
        </ButtonGroup>
      </Stack>
      <div className="swiper-container">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          mousewheel={{
            forceToAxis:true
          }}
          breakpoints={{
            "@0.00": {
              slidesPerView: 1.5,
              spaceBetween: 10,
            },
            "@0.75": {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            "@1.00": {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            "@1.50": {
              slidesPerView: 1,
              spaceBetween: 10,
            },
          }}
          modules={[Navigation, Pagination,Mousewheel]} // Include Pagination module
          // navigation={true}
    
          ref={swiperRef}
          onSlideChange={(swiper) => {
            setCurrentSlide(swiper.activeIndex);
            setTotalSlides(swiper.slides.length);
          }}
        >
          {content?.map((e, index) => (
            <SwiperSlide key={index}>
              <PracticeCardView data={e} />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
};

export default SwiperComp;
