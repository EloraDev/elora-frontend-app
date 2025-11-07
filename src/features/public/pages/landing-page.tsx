import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import NavBar from "../components/nav-bar";
import SkinConditionSlide from "../components/skin-condition-slide";
import waitListHero from "@/assets/img/waitlist-section-hero.jpg";
import FormWaitList from "../components/form-waitlist";

import heroImage1 from "@/assets/img/home-hero-1.png";
import heroImage2 from "@/assets/img/home-hero-2.png";
import heroImage3 from "@/assets/img/home-hero-3.png";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      {/* HERO SECTION */}
      <section className="px-12.5">
        <div className="relative mx-auto min-h-[703px] w-full max-w-335 overflow-hidden rounded-[28px] bg-(--color-peach-light)">
          <div className="relative z-10 ml-18.5 max-w-[485px] pt-48.5 text-(--color-charcoal)">
            <div>
              <span className="font-inter text-sm leading-5 tracking-[-0.15px]">
                Trusted by 10,000+ customers
              </span>
              <h1 className="text-6xl leading-[104%] tracking-[0px]">
                Elora — <br />
                Smarter Skin <br />
                Care Starts Here
              </h1>
              <p className="mt-[13px] text-lg leading-[115.99999999999999%] tracking-[0px]">
                Upload an image, get instant insights, and connect securely with
                licensed dermatologists — all from the comfort of your home.
              </p>
            </div>

            <Button
              onClick={() => navigate({ to: "/auth/login" })}
              className="mt-6 rounded-[41px] border border-(--color-charcoal) bg-(--color-charcoal) text-(--color-white-neutral) transition-all duration-300 hover:bg-transparent hover:text-(--color-charcoal)"
            >
              Get Started
            </Button>
          </div>

          {/* IMAGES */}
          <div className="absolute top-[-50px] left-[608px] h-[902px] w-[601px]">
            <img src={heroImage1} alt="hero image 1" />
          </div>
          <div className="absolute top-[-89px] left-[826px] h-[1095px] w-[730px]">
            <img src={heroImage2} alt="hero image 2" />
          </div>

          {/* DECORATIONS */}
          <div className="absolute top-0 left-0 h-[1062.23px] w-[977.26px]">
            <img
              src="/img/decorations/home-hero-line-w-1.svg"
              alt="decoration line 1"
            />
          </div>
          <div className="absolute top-[169px] left-0 h-[1062.23px] w-[977.26px]">
            <img
              src="/img/decorations/home-hero-line-w-2.svg"
              alt="decoration line 2"
            />
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
