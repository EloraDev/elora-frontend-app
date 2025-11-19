import React from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  CircleCheckBig,
  Pill,
  Scan,
  Upload,
  UserCheck,
} from "lucide-react";

import { Button } from "../../../components/ui/button";

import heroImage1 from "@/assets/img/home-hero-1.png";
import heroImage2 from "@/assets/img/home-hero-2.png";
import heroImage3 from "@/assets/img/home-hero-3.png";
import backgroundImage from "@/assets/img/section-ai-showcase.jpg";
import AIAnalysisCard from "../components/ai-analysis-card";
import ImageSlide from "../components/image-slide";
import Footer from "../components/footer";
import Header from "../components/header";

const howItWorksSteps = [
  {
    icon: <Upload size={32} />,
    description:
      "Take or upload a clear photo of the affected area using your smartphone or computer.",
  },
  {
    icon: <Scan size={32} />,
    description:
      "Our advanced AI scans the image and provides instant diagnostic suggestions with confidence scores.",
  },
  {
    icon: <UserCheck size={32} />,
    description:
      "A licensed dermatologist reviews the AI analysis and your case to confirm diagnosis.",
  },
  {
    icon: <Pill size={32} />,
    description:
      "Receive a personalized treatment plan with prescriptions delivered to your pharmacy.",
  },
] as const;

export const LandingPage = () => {
  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Header />
      {/* HERO SECTION */}
      <section className="px-5 pb-8 xl:px-12.5">
        <div className="relative mx-auto mb-8 flex h-[clamp(500px,50vw,703px)] w-full max-w-335 items-center overflow-hidden rounded-[28px] bg-(--color-peach-light)">
          <div className="relative z-10 mx-[clamp(20px,5vw,74px)] max-w-[485px] text-(--color-charcoal)">
            <div>
              <span className="font-inter text-sm leading-5 tracking-[-0.15px]">
                Trusted by 10,000+ customers
              </span>
              <h1 className="text-[clamp(40px,10vw,60px)] leading-[104%] tracking-[0px]">
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
          {/* h-[902px] w-[601px]  left-[608px] */}
          {/* right-[151px] */}
          <div className="absolute top-[-50px] left-[min(calc(50vw-1rem),608px)] hidden h-[clamp(400px,45vw,902px)] w-[clamp(400px,45vw,601px)] min-[56.5rem]:block">
            <img src={heroImage1} alt="hero image 1" />
          </div>

          {/* h-[1095px] w-[730px] left-[826px] */}
          <div className="absolute top-[-89px] right-[-214px] hidden h-[clamp(400px,55vw,1095px)] w-[clamp(400px,55vw,730px)] sm:block">
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
        <div className="relative mx-auto flex min-h-[373px] w-full max-w-[1109px] items-center overflow-hidden rounded-[44px] bg-(--color-brown-dark) px-[clamp(20px,5vw,63px)]">
          <div className="w-full space-y-2.5 sm:max-w-[min(60vw,527px)]">
            <span className="text-[13px] leading-[100%] font-semibold tracking-[0px] text-(--color-peach-light)">
              empowering, not replacing, dermatologists.
            </span>
            <h2 className="text-[clamp(30px,10vw,50px)] leading-[100%] font-semibold text-white">
              Intelligent Skin Analysis with Elora AI
            </h2>

            <p className="text-base leading-[100%] tracking-[0px] text-white">
              Elora AI detects acne, eczema, psoriasis, fungal infections, and
              100+ skin conditions with real-time confidence scores
            </p>

            <Button
              asChild
              className="h-[51px] w-60 rounded-full border border-(--color-peach-light) bg-[linear-gradient(90deg,#E4B68A_0%,#FFD7B1_50%,#E4B68A_100%)] bg-[size:200%_100%] bg-[position:0%_50%] text-sm font-normal text-black transition-[background-position] duration-300 hover:bg-[position:100%_50%]"
            >
              <Link to="/auth/signup">Try Elora AI Now</Link>
            </Button>
          </div>

          {/* OUTLIER */}
          <div className="absolute top-62 right-[117px] z-20 hidden h-[57px] w-[313px] items-center gap-1.5 rounded-[10px] bg-white px-[7px] min-[55.3rem]:flex">
            <div className="size-[41px] rounded-[6px] bg-(--color-beige)" />
            <div className="text-black">
              <h6 className="text-[13px] font-semibold">Skin Diagnostics</h6>
              <p className="text-[10px]">
                You have clear skin, you can maintain by using the...
              </p>
            </div>
          </div>

          {/* image and decoration */}
          {/* left-[836px] */}
          <div className="absolute top-[-77px] right-[-114px] z-10 hidden h-[561px] w-[393px] sm:block">
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

      {/* SECTION: AI SHOWCASE */}
      <section
        className="flex min-h-[763.19px] w-full items-center justify-center bg-cover bg-[position:100%_100%] px-5 py-10 bg-blend-multiply xl:px-12.5"
        style={{
          backgroundImage: `linear-gradient(var(--color-brown-darkest)), url(${backgroundImage})`,
        }}
      >
        <div className="flex h-full w-full max-w-335 flex-wrap items-center justify-center gap-12 xl:flex-nowrap">
          <AIAnalysisCard />

          <div className="min-h-[571.19px] max-w-[616px] space-y-6 xl:shrink-0">
            <h3 className="max-w-[603px] text-3xl leading-[48px] font-semibold text-(--color-peach-light) sm:text-[40px]">
              Advanced AI Technology You Can Trust
            </h3>

            <p className="font-inter max-w-[559px] text-base leading-[29.25px] text-(--color-white-neutral) sm:text-lg">
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
                  <h4 className="text-2xl font-semibold text-(--color-peach-light) sm:text-[28px]">
                    Trained on Diverse Data
                  </h4>
                  <p className="font-inter text-sm leading-[25.6px] text-(--color-white-neutral) sm:text-base">
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
                  <h4 className="text-2xl font-semibold text-(--color-peach-light) sm:text-[28px]">
                    Always Improving
                  </h4>
                  <p className="font-inter text-sm leading-[25.6px] text-(--color-white-neutral) sm:text-base">
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
                  <h4 className="text-2xl font-semibold text-(--color-peach-light) sm:text-[28px]">
                    Expert Validation
                  </h4>
                  <p className="font-inter text-sm leading-[25.6px] text-(--color-white-neutral) sm:text-base">
                    Every AI suggestion is reviewed by board-certified
                    dermatologists before any treatment recommendations.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION: HOW IT WORKS */}
      <section className="min-h-[653px] bg-(--color-cream-alt) px-5 xl:px-12.5">
        <div className="mx-auto w-full max-w-335">
          <div className="mx-auto mt-18 w-full max-w-320">
            {/* HEADING */}
            <div className="mx-auto mb-16 w-full max-w-[672px] text-center text-black">
              <h2 className="text-3xl font-semibold sm:text-[40px]">
                How Elora Works
              </h2>
              <p className="mt-[15.3px] text-lg leading-7 text-(--color-slate)">
                Get professional dermatology care in four simple steps. From
                analysis to treatment, we've streamlined the entire process.
              </p>
            </div>

            {/*  STEPS ON HOW IT WORKS */}
            <div className="grid gap-8 sm:grid-cols-[repeat(auto-fit,_minmax(296px,1fr))]">
              {howItWorksSteps.map((step, stepIndex) => (
                <div className="relative min-h-[326px] rounded-2xl bg-white px-8 pt-14 pb-3 shadow-[0px_1px_2px_-1px_#0000001A,0px_1px_3px_0px_#0000001A]">
                  <div className="mb-17.5 flex size-16 items-center justify-center rounded-2xl bg-(--color-cream) text-(--color-brown)">
                    {step.icon}
                  </div>

                  <p className="font-inter text-base leading-6.5 text-(--color-slate)">
                    {step.description}
                  </p>

                  <div className="font-inter absolute -top-4 left-8 flex size-12 items-center justify-center rounded-full bg-(--color-brown) text-base text-white shadow-[0px_4px_6px_-4px_#0000001A,0px_10px_15px_-3px_#0000001A]">
                    0{stepIndex + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: BOOKING */}
      <section className="px-5 pt-[25px] pb-[37px] xl:px-12.5">
        <div className="mx-auto w-full max-w-335">
          <div className="mx-auto mb-[49px] flex w-full max-w-172.5 flex-col items-center gap-y-[25px] text-center">
            <span className="rounded-[44px] bg-(--color-beige) px-[21px] py-3 text-sm text-(--color-charcoal)">
              Connect with Dermatologists
            </span>

            <div>
              <h2 className="text-[40px] font-semibold text-black sm:text-[50px]">
                Your Skin. Our Experts.
              </h2>
              <p className="text-lg text-black sm:text-[22px]">
                Schedule a secure video or chat consultation with experienced
                dermatologists who understand your skin’s unique needs.
              </p>
            </div>

            <Button className="h-[51px] w-[265px] rounded-[39px] bg-[linear-gradient(90deg,#E4B68A_0%,#FFD7B1_50%,#E4B68A_100%)] bg-[size:200%_100%] bg-[position:0%_50%] text-sm font-normal text-black transition-[background-position] duration-300 hover:bg-[position:100%_50%]">
              Book a Consultation
            </Button>
          </div>

          {/* STATS */}
          <div className="mx-auto flex w-full max-w-268 flex-wrap justify-center gap-8">
            {/* 1 */}
            <div className="flex h-23 w-45 flex-col items-center justify-center rounded-full bg-(--color-brown-dark) sm:h-29.5 sm:w-61">
              <span className="text-3xl text-white">50K+</span>
              <span className="text-sm text-(--color-peach)">
                Happy Patients
              </span>
            </div>

            {/* 2 */}
            <div className="flex h-23 w-45 flex-col items-center justify-center rounded-full bg-(--color-brown-dark) sm:h-29.5 sm:w-61">
              <span className="text-3xl text-white">4.9/5</span>
              <span className="text-sm text-(--color-peach)">
                Average Rating
              </span>
            </div>

            {/* 3 */}
            <div className="flex h-23 w-45 flex-col items-center justify-center rounded-full bg-(--color-brown-dark) sm:h-29.5 sm:w-61">
              <span className="text-3xl text-white">95%</span>
              <span className="text-sm text-(--color-peach)">AI Accuracy</span>
            </div>

            {/* 4 */}
            <div className="flex h-23 w-45 flex-col items-center justify-center rounded-full bg-(--color-brown-dark) sm:h-29.5 sm:w-61">
              <span className="text-3xl text-white">24h</span>
              <span className="text-sm text-(--color-peach)">
                Avg Response Time
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: ai-capabilities */}
      <section className="min-h-[1023px] bg-(--color-cream-alt) px-5 py-11.5 xl:px-12.5">
        <div className="mx-auto w-full max-w-335 space-y-[55px] text-center">
          {/* HEADING */}
          <div className="mx-auto w-full max-w-165">
            <h2 className="mb-4.5 text-3xl font-semibold text-(--color-gray-darker) sm:text-[40px]">
              AI Trained for All Skin Types
            </h2>
            <p className="text-lg leading-7 text-(--color-slate)">
              Our technology recognizes and accurately analyzes skin conditions
              across all Fitzpatrick skin types, ensuring inclusive and
              equitable care for everyone.
            </p>
          </div>
          <ImageSlide />

          <div className="mx-auto min-h-[193.1px] w-full max-w-[896px] rounded-2xl border-[0.77px] border-white bg-white p-[32.76px]">
            <div>
              <h3 className="mb-4 text-lg font-semibold text-(--color-gray-darkest) sm:text-[28px]">
                Inclusive Dermatology Care
              </h3>
              <p className="text-sm leading-6.5 text-(--color-slate) sm:text-base">
                Traditional dermatology AI often struggles with darker skin
                tones. Elora was built from the ground up with diversity in
                mind, training our models on a balanced dataset representing all
                skin types, ensuring accurate analysis and diagnosis for every
                patient.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: GET STARTED */}
      <section className="px-5 pt-10 xl:px-12.5">
        <div className="relative mx-auto mb-[51px] min-h-120 w-full max-w-335">
          <div className="relative z-20 mx-auto min-h-[449px] w-full rounded-[34px] bg-(--color-brown-dark) px-5 pt-[43px] pb-6 text-center text-white">
            {/* HEADING */}
            <div className="mb-[27px]">
              <h2 className="mb-[27px] text-[clamp(40px,10vw,50px)] font-semibold">
                Ready to Get Started?
                <span className="block text-sm font-normal">
                  No credit card required • HIPAA compliant • Available 24/7
                </span>
              </h2>
              <p className="mx-auto w-full max-w-[721px] text-[22px] font-semibold">
                Join thousands of patients who trust Elora for their dermatology
                care. Get started with a free AI analysis today.
              </p>
            </div>

            {/* FEATURES */}
            <div className="mx-auto flex w-full max-w-168 flex-wrap items-center justify-between gap-x-2 gap-y-[28.79px] text-left">
              {/* PAIR ---1 */}
              <div className="space-y-[28.79px]">
                <div className="flex items-center gap-x-3">
                  <CircleCheckBig size={20} />
                  <span className="text-sm">Instant AI skin analysis</span>
                </div>

                <div className="flex items-center gap-x-3">
                  <CircleCheckBig size={20} />
                  <span className="text-sm">Secure and HIPAA compliant</span>
                </div>
              </div>

              {/* PAIR ----2 */}
              <div className="space-y-[28.79px]">
                <div className="flex items-center gap-x-3">
                  <CircleCheckBig size={20} />
                  <span className="text-sm">
                    Connect with board-certified dermatologists
                  </span>
                </div>
                <div className="flex items-center gap-x-3">
                  <CircleCheckBig size={20} />
                  <span className="text-sm">
                    Prescription delivery to your pharmacy
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8.5 flex flex-wrap items-center justify-center gap-4">
              <Button className="font-inter h-12.5 w-45.5 rounded-[6.8px] bg-white text-sm font-medium text-(--color-brown) transition-colors duration-300 hover:bg-gray-100">
                Start Free Analysis <ArrowRight />
              </Button>
              <Button className="h-[51.07px] w-[218px] border-[1.54px] border-white bg-[#E5E5E54D] text-white transition-colors duration-300 hover:bg-[#E5E5E566]">
                Schedule Consultation
              </Button>
            </div>
          </div>

          {/* DECORATIONS */}
          <div className="absolute top-[363px] left-1/2 z-10 h-[101px] w-full max-w-[1263px] -translate-x-[50%] rounded-[30px] bg-(--color-tan)" />
          <div className="absolute top-[379px] left-1/2 h-[101px] w-full max-w-[1185px] -translate-x-[50%] rounded-[30px] bg-(--color-peach-lighter)" />
        </div>
      </section>
      <Footer />
    </React.Fragment>
  );
};
