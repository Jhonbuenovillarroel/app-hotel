"use client";

import React, { MouseEvent, useState } from "react";
import dataSlides from "./slides";
import { workSans } from "@/fonts/fonts";

type SlideId = "slide1" | "slide2" | "slide3";

const HeroSection = () => {
  const [slides, setSlides] = useState(dataSlides);
  const [currentSlide, setCurrentSlide] = useState(slides["slide1"]);
  const [disabledButtons, setDisabledButtons] = useState(false);

  const changeSlide = async (slideId: SlideId) => {
    if (currentSlide.index !== slides[slideId].index) {
      setDisabledButtons(true);
      const numberSlide = slides[slideId].index;
      slides[slideId].width = `w-full transition-[width] duration-1000 ${
        numberSlide < currentSlide.index ? "left-0" : "right-0"
      }`;

      let currentSlideId: SlideId;
      for (let slide in slides) {
        const s = slide as SlideId;
        if (slides[s].index === currentSlide.index) {
          currentSlideId = s;
          slides[s].width = `w-1/2 transition-[width] duration-1000 ${
            numberSlide < currentSlide.index ? "right-0" : "left-0"
          }`;
          slides[s].isMounted = false;
          const newZIndex = slides[slideId].zIndex;
          slides[slideId].zIndex = slides[s].zIndex;
          slides[s].zIndex = newZIndex;
        }
      }
      setCurrentSlide(slides[slideId]);

      await (async () => {
        return new Promise((resolve) => {
          setTimeout(() => {
            slides[currentSlideId].width = "w-0";
            slides[currentSlideId].buttonBgColor = "bg-zinc-400";
            slides[slideId].buttonBgColor = "bg-white";
            slides[slideId].isMounted = true;
            setSlides(slides);
            setDisabledButtons(false);
            resolve("");
          }, 1000);
        });
      })();
    }
  };

  return (
    <section className="w-full h-screen relative">
      <h1 className="absolute">
        Hotel acogedor en Jauja - Hospedaje El Rinconcito
      </h1>
      {Object.entries(slides).map((slide, i) => (
        <div
          key={i}
          className={`${slide[1].zIndex} ${slide[1].width} h-full overflow-hidden absolute`}
        >
          {slide[1].htmlContent(slide[1].isMounted)}
        </div>
      ))}

      <div
        className={`absolute flex flex-col items-center gap-8 cursor-pointer bottom-12 right-1/2 translate-x-1/2 z-40 ${workSans.className}`}
      >
        <div className={`flex gap-4`}>
          {Object.entries(slides).map((slide, i) => (
            <button
              disabled={disabledButtons}
              key={i}
              id={slide[0]}
              onClick={async (e: MouseEvent<HTMLButtonElement>) => {
                changeSlide(e.currentTarget.id as SlideId);
              }}
              className="h-10 w-10 flex items-center justify-center hover-child-white text-white cursor-pointer"
            >
              <div
                className={`h-[2px] w-full ${slide[1].buttonBgColor} transition-all duration-200`}
              ></div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
