import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { CircleCheckBig } from "lucide-react";

import { Button } from "../../../components/ui/button";

import heroImage1 from "@/assets/img/home-hero-1.png";
import heroImage2 from "@/assets/img/home-hero-2.png";
import heroImage3 from "@/assets/img/home-hero-3.png";
import backgroundImage from "@/assets/img/section-ai-showcase.jpg";
import AIAnalysisCard from "../components/ai-analysis-card";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      {/* HERO SECTION */}
      <section className="px-12.5 pb-8">
        <div className="relative mx-auto mb-8 min-h-[703px] w-full max-w-335 overflow-hidden rounded-[28px] bg-(--color-peach-light)">
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

        {/* SUB HERO SECTION */}
        <div className="relative mx-auto flex min-h-[373px] w-full max-w-[1109px] items-center overflow-hidden rounded-[44px] bg-(--color-brown-dark) pl-[63px]">
          <div className="w-full max-w-[527px] space-y-2.5">
            <span className="text-[13px] leading-[100%] font-semibold tracking-[0px] text-(--color-peach-light)">
              empowering, not replacing, dermatologists.
            </span>

            <h2 className="text-[50px] leading-[100%] font-semibold text-white">
              Intelligent Skin Analysis with Elora AI
            </h2>

            <p className="text-base leading-[100%] tracking-[0px] text-white">
              Elora AI detects acne, eczema, psoriasis, fungal infections, and
              100+ skin conditions with real-time confidence scores
            </p>

            <Button
              asChild
              className="h-[51px] w-60 rounded-full border border-(--color-peach-light) bg-transparent bg-[linear-gradient(90deg,#E4B68A_0%,#FFD7B1_100%)] text-sm font-normal text-black hover:bg-transparent hover:bg-[image:none] hover:text-white"
            >
              <Link to="/auth/signup">Try Elora AI Now</Link>
            </Button>
          </div>

          {/* OUTLIER */}
          <div className="absolute top-62 right-[117px] z-20 flex h-[57px] w-[313px] items-center gap-1.5 rounded-[10px] bg-white px-[7px]">
            <div className="size-[41px] rounded-[6px] bg-(--color-beige)" />
            <div className="text-black">
              <h6 className="text-[13px] font-semibold">Skin Diagnostics</h6>
              <p className="text-[10px]">
                You have clear skin, you can maintain by using the...
              </p>
            </div>
          </div>

          {/* image and decoration */}
          <div className="absolute top-[-77px] left-[836px] z-10 h-[561px] w-[393px]">
            <img src={heroImage3} alt="hero image 3" />
          </div>

          <div className="absolute right-[61.73px] bottom-[-60.88px] h-87.5 w-80.5">
            <img
              src="/img/decorations/home-hero-line-w-small.svg"
              alt="decoration line"
            />
          </div>
        </div>
      </section>

      {/* SECTION AI SHOWCASE */}
      <section
        className="flex min-h-[763.19px] w-full items-center justify-center bg-cover bg-[position:100%_100%] px-12.5 bg-blend-multiply"
        style={{
          backgroundImage: `linear-gradient(var(--color-brown-darkest)), url(${backgroundImage})`,
        }}
      >
        <div className="flex h-full w-full max-w-335 items-center justify-center gap-x-12">
          <AIAnalysisCard />

          <div className="min-h-[571.19px] max-w-[616px] space-y-6">
            <h3 className="max-w-[603px] text-[40px] leading-[48px] font-semibold text-(--color-peach-light)">
              Advanced AI Technology You Can Trust
            </h3>

            <p className="font-inter max-w-[559px] text-lg leading-[29.25px] text-(--color-white-neutral)">
              Our AI has been trained on over 2 million dermatological images
              representing diverse skin types and conditions. It provides
              instant analysis with confidence percentages, giving you a head
              start on understanding your skin condition.
            </p>

            {/* LIST OF AI FEATURES */}
            <ul className="space-y-4">
              {/* FEATURE ------1 */}
              <li className="flex gap-x-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-[16.4px] bg-(--color-cream)">
                  <CircleCheckBig className="text-(--color-brown)" size={20} />
                </div>

                <div className="space-y-2">
                  <h4 className="text-[28px] font-semibold text-(--color-peach-light)">
                    Trained on Diverse Data
                  </h4>
                  <p className="font-inter text-base leading-[25.6px] text-(--color-white-neutral)">
                    Our AI recognizes conditions across all skin tones and
                    types, ensuring accurate analysis for everyone.
                  </p>
                </div>
              </li>

              {/* FEATURE ---------2 */}
              <li className="flex gap-x-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-[16.4px] bg-(--color-cream)">
                  <CircleCheckBig className="text-(--color-brown)" size={20} />
                </div>

                <div className="space-y-2">
                  <h4 className="text-[28px] font-semibold text-(--color-peach-light)">
                    Always Improving
                  </h4>
                  <p className="font-inter text-base leading-[25.6px] text-(--color-white-neutral)">
                    Our machine learning models are continuously updated with
                    new data to improve accuracy and expand condition
                    recognition.
                  </p>
                </div>
              </li>

              {/* FEATURE -----3 */}
              <li className="flex gap-x-4">
                <div className="flex size-12 shrink-0 items-center justify-center rounded-[16.4px] bg-(--color-cream)">
                  <CircleCheckBig className="text-(--color-brown)" size={20} />
                </div>

                <div className="space-y-2">
                  <h4 className="text-[28px] font-semibold text-(--color-peach-light)">
                    Expert Validation
                  </h4>
                  <p className="font-inter text-base leading-[25.6px] text-(--color-white-neutral)">
                    Every AI suggestion is reviewed by board-certified
                    dermatologists before any treatment recommendations.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </React.Fragment>
  );
};
