import skinConditionRash from "@/assets/img/about-section-skin-condtion-1.jpg";
import skinConditionScales from "@/assets/img/about-section-skin-condtion-2.jpg";
import { ArrowLeft, ArrowRight, CircleCheck, ImageOff } from "lucide-react";
import { useState } from "react";
import { Button } from "../../../components/ui/button";

const skinConditions = [
  {
    image: skinConditionRash,
    condtion: "rash",
  },
  {
    image: skinConditionScales,
    condtion: "scales",
  },
  {
    image: null,
    condtion: "rabbies",
  },
  {
    image: null,
    condtion: "yori-yori",
  },
] as const;

function SkinConditionSlide() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % skinConditions.length);
  };
  const handlePreviousSlide = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + skinConditions.length) % skinConditions.length,
    );
  };
  return (
    <div className="flex flex-col gap-x-10 gap-y-4 lg:flex-row min-[90rem]:gap-x-[174px]">
      <div className="flex items-baseline-last gap-x-0.5">
        <Button
          onClick={handlePreviousSlide}
          className="hover:border-primary hover:bg-sidebar-primary-foreground bg-sidebar-primary-foreground h-[77px] w-[73px] border"
        >
          <ArrowLeft className="text-foreground size-[31px]" />
        </Button>
        <Button
          onClick={handleNextSlide}
          className="hover:border-primary hover:bg-sidebar-primary-foreground bg-sidebar-primary-foreground h-[77px] w-[73px] border"
        >
          <ArrowRight className="text-foreground size-[31px]" />
        </Button>
      </div>

      <div className="w-full max-w-[946px] overflow-x-hidden">
        <div
          className="flex gap-x-[42px] transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * (452 + 42)}px)`,
          }}
        >
          {skinConditions.map((skin, i) => (
            <div className="flex size-[452px] shrink-0 flex-col" key={i}>
              {skin.image ? (
                <img
                  src={`${skin.image}`}
                  alt={`${skin.condtion}`}
                  loading="lazy"
                  className="h-[80%] w-full object-cover object-[25%_75%]"
                />
              ) : (
                <div className="flex h-[80%] w-full items-center justify-center bg-gray-200">
                  <ImageOff className="size-[31px]" />
                </div>
              )}

              {/* SKIN CONDITION DESCRIPTION */}
              <div className="font-roboto-mono flex grow items-center justify-between font-medium uppercase">
                <span className="text-2xl text-black">{skin.condtion}</span>
                <span className="text-primary flex items-center justify-center gap-1 text-base">
                  <CircleCheck /> Ai diagnosis{" "}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SkinConditionSlide;
