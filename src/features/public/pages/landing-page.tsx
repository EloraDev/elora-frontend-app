import heroImage from "@/assets/img/landing-page-hero.png";
import { useNavigate } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "../../../components/ui/button";
import NavBar from "../components/nav-bar";
import SkinConditionSlide from "../components/skin-condition-slide";
import waitListHero from "@/assets/img/waitlist-section-hero.jpg";
import FormWaitList from "../components/form-waitlist";

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <>
      {/* HERO SECTION */}
      <section>
        <div
          className="bg-cover w-full bg-no-repeat mx-auto max-w-360 min-h-[810px] pt-[17px] pl-[141px]"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="max-w-[774px] ">
            <NavBar />
            <div className="mt-53">
              <h1 className="font-extrabold leading-[84%] tracking-[-0.04em] text-[92px] font-inter text-sidebar-primary-foreground mb-[48px]">
                THE FUTURE OF DERMATOLOGY IS HERE.
              </h1>

              <Button
                className="w-[205px] font-roboto-mono h-[44px] rounded-[10px] text-base uppercase font-medium text-background bg-secondary duration-300 hover:-translate-y-0.5 active:translate-y-0"
                onClick={() => navigate({ to: "/auth/signup" })}
              >
                Get Started <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="pl-36 pb-8 max-w-360 bg-background pr-[29px] pt-[111px] mx-auto">
        <h2 className="font-inter font-extrabold text-[70px] leading-[84%] tracking-[-0.04em] text-foreground uppercase max-w-[938px] w-full mb-13">
          Empowering Dermatology with Intelligence and Care.
        </h2>
        <SkinConditionSlide />
      </section>

      {/* JOIN WAIT LIST SECTION */}
      <section>
        <div
          className="bg-cover pt-36 px-[30px] max-w-360 min-h-250 mx-auto"
          style={{
            backgroundImage: `url(${waitListHero})`,
          }}
        >
          <div className="flex justify-end mb-[73px]">
            <h2 className="max-w-[803px] w-full text-sidebar-primary-foreground font-inter font-extrabold text-[70px] leading-[84%] tracking-[-0.04em] uppercase">
              See your skin differently, instant AI insights, expert care,
              anywhere.
            </h2>
          </div>
          <FormWaitList />
        </div>
      </section>
    </>
  );
};
