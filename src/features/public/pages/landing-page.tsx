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

      <section
        className="bg-cover bg-[position:100%_100%] bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="mx-auto min-h-[810px] w-full max-w-360 px-6 pt-[17px] sm:pl-10 xl:pl-[141px]">
          <div className="max-w-[774px]">
            <NavBar />
            <div className="mt-53">
              <h1 className="font-inter text-sidebar-primary-foreground mb-[48px] text-[clamp(30px,10vw,92px)] leading-[94%] font-extrabold tracking-[-0.04em] md:leading-[84%]">
                THE FUTURE OF DERMATOLOGY IS HERE.
              </h1>

              <Button
                className="font-roboto-mono text-background bg-secondary h-[44px] w-[205px] rounded-[10px] text-base font-medium uppercase duration-300 hover:-translate-y-0.5 active:translate-y-0"
                onClick={() => navigate({ to: "/auth/signup" })}
              >
                Get Started <ArrowRight />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="bg-background">
        <div className="mx-auto max-w-360 px-6 pt-[111px] pb-8 xl:pr-[29px] xl:pl-36">
          <h2 className="font-inter text-foreground mb-13 w-full max-w-[938px] text-[clamp(30px,8vw,70px)] leading-[94%] font-extrabold tracking-[-0.04em] uppercase md:leading-[84%]">
            Empowering Dermatology with Intelligence and Care.
          </h2>
          <SkinConditionSlide />
        </div>
      </section>

      {/* JOIN WAIT LIST SECTION */}
      <section
        className="bg-cover bg-center"
        style={{
          backgroundImage: `url(${waitListHero})`,
        }}
      >
        <div className="mx-auto min-h-250 max-w-360 px-[30px] pt-36">
          <div className="mb-[73px] flex justify-end">
            <h2 className="text-sidebar-primary-foreground font-inter w-full max-w-[803px] text-[clamp(30px,8vw,70px)] leading-[94%] font-extrabold tracking-[-0.04em] uppercase md:leading-[84%]">
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
