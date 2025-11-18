import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog"
import { ProcessStep } from "../components/process-step"
import { PortraitGallery } from "../components/portrait-gallery"
import { StayConnectedSection } from "../components/stay-connected-section"
import { WaitlistFooter } from "../components/wailist-footer"

export const WaitlistPage = () => {
  return (
    <div className="font-bricolage">
      <div
        style={{
          backgroundImage: `url("/img/waitlist-hero.png")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center"
        }}
        className="h-screen lg:h-[135vh] 2xl:h-screen flex items-center justify-center"
      >
        {/* <div className="absolute bottom-0 left-0 w-full h-20 bg-[#E4B68A] rounded-t-[100000px]"></div> */}
        <div className="absolute bottom-0 lg:-bottom-61 2xl:bottom-0 left-0 w-full overflow-hidden leading-[0]">
          <svg className="relative block w-full h-[40px] lg:h-[250px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
            <path d="M0,120 C300,0 900,0 1200,120 L1200,120 L0,120 Z" fill="#E4B68A"></path>
          </svg>
        </div>
        {/* <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
            <svg className="relative block w-full h-[80px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,120 C300,40 900,40 1200,120 L1200,120 L0,120 Z" fill="#E4B68A"></path>
            </svg>
          </div> */}
        <div
          className="w-full max-w-4xl flex flex-col -mt-20 items-center justify-center px-8 py-16 bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: 'url("/img/hero-overlay.png")',
            minHeight: '480px'
          }}
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center drop-shadow-lg mb-4">
            Your Skin, Smarter Care
          </h1>
          <p className="text-xs sm:text-lg md:text-xl lg:text-2xl w-full max-w-[90%] text-[#F9FAFB] text-center mb-5">
            Join Elora's early access waitlist — the AI-powered teleDermatology platform that helps you identify, understand, and treat skin conditions with accuracy, privacy, and expert care.
          </p>

          <Dialog>
            <DialogTrigger asChild>
              <div className="relative">
                <div
                  className="absolute inset-0 rounded-lg blur-xl opacity-80"
                  style={{
                    background: "#F7CBA1",
                    boxShadow: "0 0 20px 10px #F7CBA1",
                    zIndex: 0,
                  }}
                  aria-hidden="true"
                />
                <Button className="relative bg-[#E4B68A] hover:bg-[#D4A67A] shadow-none text-black font-medium z-10">
                  Join the Waitlist
                </Button>
              </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-2xl bg-white rounded-[23px]">
              <DialogHeader className="text-center">
                <div className="mx-auto mb-4">
                  <span className="bg-[#3A9BA5]/20 text-[#3A9BA5] px-3 py-1 rounded-full text-sm font-medium">
                    Join the Waitlist
                  </span>
                </div>
                <DialogTitle className="text-3xl font-bold text-gray-900 mb-2 w-full text-center">
                  Be the First to Experience the Future of Dermatology
                </DialogTitle>
              </DialogHeader>

              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-gray-700">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Enter your full name"
                      className="border-gray-300"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-700">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      className="border-gray-300"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="skinConcern" className="text-gray-700">
                    Skin Concern / Interest <span className="text-red-400 text-xs">*optional</span>
                  </Label>
                  <Textarea
                    id="skinConcern"
                    placeholder="Tell us about your skin concerns or interests..."
                    className="border-gray-300 min-h-[100px]"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <Button className="w-full bg-[#E4B68A] hover:bg-[#D4A67A] text-black font-medium py-3">
                  Join the Waitlist
                </Button>

                <p className="text-center text-sm text-gray-600">
                  For enquiries and support{" "}
                  <a href="#" className="text-[#5DADE2] hover:underline">
                    Contact Us
                  </a>
                </p>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* About Elora Section */}
      <div className="relative">
        {/* Curved background section */}

        <div
          className="relative pt-20 pb-0 lg:pb-32 bg-[#E4B68A]"
        // style={{
        //   background: 'linear-gradient(135deg, #E4B68A 0%, #D4A67A 50%, #C4966A 100%)',
        // }}
        >
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-[0]">
            <svg className="relative block w-full h-[40px] lg:h-[200px]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M0,120 C300,0 900,0 1200,120 L1200,120 L0,120 Z" fill="#FFFFFF"></path>
            </svg>
          </div>

          <div className="relative z-50 max-w-4xl mx-auto px-4 sm:px-6 pb-16 sm:pb-24 text-center -mt-20 sm:-mt-56">
            <div className="mb-3 sm:mb-4 flex flex-col gap-2 items-center justify-center">
              <span className="px-4 py-1 sm:py-2 rounded-full text-lg sm:text-[22px] font-medium text-white">
                About Elora
              </span>
              <img src="/img/svg/white-swoosh.svg" alt="swoosh" width={129} height={13} />
            </div>

            <h2 className="text-2xl md:text-4xl lg:text-[38px] font-bold text-[#5C321D] mb-4 sm:mb-6 leading-snug sm:leading-tight">
              <span className="block text-[80%]">
                Meet Elora — Your Digital&nbsp;<span className="whitespace-nowrap">Dermatology Companion</span>
              </span>
            </h2>

            <p className="text-xs xs:text-sm md:text-base text-[#5C321D] max-w-md sm:max-w-2xl md:max-w-3xl mx-auto leading-normal sm:leading-relaxed">
              Elora combines AI-driven skin analysis with secure dermatologist consultations designed to make skincare smarter, faster, and more inclusive.<br className="hidden md:block" />
              Upload a photo of your skin, get instant AI insights with confidence scores, and connect with licensed dermatologists for expert confirmation and treatment.
            </p>
          </div>
          {/* <div className="absolute bottom-0 left-0 w-full h-20 bg-white rounded-t-[100000px]"></div> */}
        </div>

        {/* How It Works Section */}
        <div className="relative bg-white py-20 z-10 w-full">
          <div className="mx-auto px-6 w-full -mt-10 lg:-mt-40 flex flex-col items-center justify-center">
            <div className="text-center mb-16">
              <div className="mb-4 flex flex-col gap-2 items-center justify-center">
                <span className="text-[#3A9BA5] px-3 py-1.5 md:px-4 md:py-2 rounded-full text-base xs:text-lg sm:text-xl md:text-[22px] font-medium">
                  How It Works
                </span>
                <img src="/img/svg/swoosh.svg" alt="" className="w-[90px] xs:w-[110px] md:w-[129px] h-auto" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                Simple, Smart, and Secure
              </h2>
            </div>

            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 2xl:flex">
              <ProcessStep
                title="Upload a Photo"
                description="Take or upload a clear image of your skin concern directly through the Elora app for instant insights."
                iconImage="/img/upload.jpg"
              />
              <ProcessStep
                title="Instant AI Analysis"
                description="Elora's AI scans your photo, detects possible conditions, and provides confidence-based results."
                iconImage="/img/ai-analysis.jpg"
              />
              <ProcessStep
                title="Dermatologist Review"
                description="A licensed dermatologist reviews your results, confirms the diagnosis, and recommends treatment."
                iconImage="/img/derm-review.jpg"
              />
              <ProcessStep
                title="Start Healing"
                description="Follow your personalized plan, track progress, and receive continuous care — all on Elora."
                iconImage="/img/healing.jpg"
              />
            </div>
          </div>

        </div>

        {/* Skin Health Without Bias Section */}
        <div
          className="relative pt-20 pb-10 overflow-hidden w-full"
          style={{
            background: "linear-gradient(135deg, #FDFCFB 0%, #FAF9F6 50%, #FFFEF9 100%)"
          }}
        >
          <div className="relative z-10 mx-auto px-6 2xl:w-full 2xl:flex flex-col items-center justify-center">
            <div className="text-center mb-12">
              <div className="mb-6">
                <span className="bg-white border border-gray-300 text-black px-4 py-2 rounded-full text-lg md:text-xl lg:text-2xl font-medium inline-block">
                  For Every Skin
                </span>
              </div>

              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-[#5C321D] mb-6 leading-tight">
                Skin Health Without Bias
              </h2>

              <p className="text-xs sm:text-sm md:text-base text-[#5C321D] max-w-3xl mx-auto mb-4 leading-relaxed">
                Elora's AI is built with inclusivity at its core — analyzing skin tones from light to deep with precision. Your skin deserves technology that understands it.
              </p>
            </div>

            {/* Portrait Gallery */}
            <PortraitGallery
              portraits={[
                { src: "/img/person-one.jpg", alt: "Diverse skin representation" },
                { src: "/img/person-two.jpg", alt: "Diverse skin representation" },
                { src: "/img/person-three.jpg", alt: "Diverse skin representation" },
                { src: "/img/person-four.jpg", alt: "Diverse skin representation" },
                { src: "/img/person-five.jpg", alt: "Diverse skin representation" },
              ]}
            />
          </div>
        </div>

        {/* Stay Connected Section */}
        <StayConnectedSection />
      </div>

      {/* Footer */}
      <WaitlistFooter />
    </div>
  )
}