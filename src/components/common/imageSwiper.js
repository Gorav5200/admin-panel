import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-flip";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { EffectFlip, Pagination, Navigation } from "swiper/modules";
import { Image } from "antd";

export default function SmallSwiper({data,style}) {

    
  return (
    <>
      <Swiper
      allowTouchMove={true}

      style={{
                      "--swiper-navigation-color": "#000",
                      "--swiper-navigation-size": "25px",
                      
                    }}
        effect={"fade"}
        grabCursor={true}
        pagination={true}
        navigation={true}
        modules={[EffectFlip, Pagination, Navigation]}
        className="mySwiper relative justify-center"
         
      >
     {data?.map((e)=>(
        <SwiperSlide >
        <div className="flex justify-center items-center"> {/* Added container */}
            <Image  
              style={{
                borderRadius: "10px",
                border: "1px solid #D9DBDD",
              }} 
              width={style?.width || 220} 
              height={style?.height || 220} 
              src={e} 
            />
          </div>
        </SwiperSlide>
     ))  }
     
       
      </Swiper>
    </>
  );
}
