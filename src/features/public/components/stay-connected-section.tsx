import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Label } from "../../../components/ui/label"
import { Textarea } from "../../../components/ui/textarea"

export const StayConnectedSection = () => {
  return (
    <div className="relative mb-10">
      {/* Top Section with Background - Text and Social Media */}
      <div
        className="relative py-12 md:py-16 lg:py-20 mx-4 md:mx-12 lg:mx-24 mt-12 md:mt-16 lg:mt-20 rounded-3xl lg:rounded-[43px] overflow-hidden"
        style={{
          backgroundImage: `url("/img/stay-connected-bg.png")`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center center"
        }}
      >
        <div className="relative z-10 max-w-6xl mx-auto px-6">
          <div className="text-center pb-8 md:pb-12 lg:pb-16">
            <h3 className="text-[#E4B68A] text-base md:text-lg lg:text-xl mb-4 md:mb-6">
              Stay Connected
            </h3>
            
            <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold text-white mb-8 md:mb-10 leading-tight max-w-4xl mx-auto px-4">
              Follow our journey as we redefine skin health with technology and care.
            </h2>

            {/* Social Media Icons */}
            <div className="relative flex justify-center items-center h-[80px] md:h-[100px] lg:h-[121px]">
              {/* Trailing Container 2 (furthest back) - Hidden on mobile/tablet */}
              <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 justify-center items-center gap-6 bg-[#8B735542] backdrop-blur-sm rounded-[36px] px-6 py-4 h-[121px] w-[600px] opacity-40 mt-10">
                <a href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
                  <img src="/img/svg/facebook.svg" alt="Facebook" className="w-13 h-13" />
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:opacity-80 transition-opacity">
                  <img src="/img/svg/linkedin.svg" alt="LinkedIn" className="w-13 h-13" />
                </a>
                <a href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
                  <img src="/img/svg/instagram.svg" alt="Instagram" className="w-13 h-13" />
                </a>
                <a href="#" aria-label="Medium" className="hover:opacity-80 transition-opacity">
                  <img src="/img/svg/medium.svg" alt="Medium" className="w-13 h-13" />
                </a>
                <a href="#" aria-label="TikTok" className="hover:opacity-80 transition-opacity">
                  <img src="/img/svg/tiktok.svg" alt="TikTok" className="w-13 h-13" />
                </a>
              </div>
              
              {/* Trailing Container 1 (middle) - Hidden on mobile/tablet */}
              <div className="hidden lg:flex absolute left-1/2 -translate-x-1/2 justify-center items-center gap-6 bg-[#E4B68A4D] backdrop-blur-sm rounded-[36px] px-6 py-4 h-[121px] w-[642px] opacity-60 mt-6">
                <a href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
                  <img src="/img/svg/facebook.svg" alt="Facebook" className="w-13 h-13" />
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:opacity-80 transition-opacity">
                  <img src="/img/svg/linkedin.svg" alt="LinkedIn" className="w-13 h-13" />
                </a>
                <a href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
                  <img src="/img/svg/instagram.svg" alt="Instagram" className="w-13 h-13" />
                </a>
                <a href="#" aria-label="Medium" className="hover:opacity-80 transition-opacity">
                  <img src="/img/svg/medium.svg" alt="Medium" className="w-13 h-13" />
                </a>
                <a href="#" aria-label="TikTok" className="hover:opacity-80 transition-opacity">
                  <img src="/img/svg/tiktok.svg" alt="TikTok" className="w-13 h-13" />
                </a>
              </div>
              
              {/* Main Container (front) */}
              <div className="relative z-10 flex justify-center items-center gap-3 md:gap-4 lg:gap-6 bg-[#FFFAF6] backdrop-blur-sm rounded-2xl md:rounded-3xl lg:rounded-[36px] px-4 md:px-6 py-3 md:py-4 h-[80px] md:h-[100px] lg:h-[121px] w-full lg:w-[727px]">
                <a href="#" aria-label="Facebook" className="hover:opacity-80 transition-opacity">
                  <img src="/img/svg/facebook.svg" alt="Facebook" className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-13 xl:h-13" />
                </a>
                <a href="#" aria-label="LinkedIn" className="hover:opacity-80 transition-opacity">
                  <img src="/img/svg/linkedin.svg" alt="LinkedIn" className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-13 xl:h-13" />
                </a>
                <a href="#" aria-label="Instagram" className="hover:opacity-80 transition-opacity">
                  <img src="/img/svg/instagram.svg" alt="Instagram" className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-13 xl:h-13" />
                </a>
                <a href="#" aria-label="Medium" className="hover:opacity-80 transition-opacity">
                  <img src="/img/svg/medium.svg" alt="Medium" className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-13 xl:h-13" />
                </a>
                <a href="#" aria-label="TikTok" className="hover:opacity-80 transition-opacity">
                  <img src="/img/svg/tiktok.svg" alt="TikTok" className="w-10 h-10 md:w-11 md:h-11 lg:w-12 lg:h-12 xl:w-13 xl:h-13" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Waitlist Form Card (overlaps on top) */}
      <div className="relative z-20 max-w-3xl mx-auto -mt-8 md:-mt-12 lg:-mt-16 px-6">
        <div className="bg-white rounded-2xl md:rounded-3xl p-6 md:p-8 lg:p-12 shadow-xl">
          <div className="text-center mb-6">
            <span className="bg-[#3A9BA5]/20 text-[#3A9BA5] px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium inline-block mb-3 md:mb-4">
              Join the Waitlist
            </span>
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-900 mb-4 md:mb-6 px-2">
              Be the First to Experience the Future of Dermatology
            </h3>
          </div>
          
          <div className="grid gap-4 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stay-connected-fullName" className="text-gray-700">
                  Full Name
                </Label>
                <Input
                  id="stay-connected-fullName"
                  placeholder="Enter your full name"
                  className="border-gray-300"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="stay-connected-email" className="text-gray-700">
                  Email Address
                </Label>
                <Input
                  id="stay-connected-email"
                  type="email"
                  placeholder="Enter your email"
                  className="border-gray-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="stay-connected-skinConcern" className="text-gray-700">
                Skin Concern / Interest <span className="text-red-400 text-xs">*optional</span>
              </Label>
              <Textarea
                id="stay-connected-skinConcern"
                placeholder="Tell us about your skin concerns or interests..."
                className="border-gray-300 min-h-[100px]"
              />
            </div>
          </div>

          <div className="space-y-4">
            <Button className="w-full bg-[#E4B68A] hover:bg-[#D4A67A] text-black font-medium py-2.5 md:py-3 text-sm md:text-base">
              Join the Waitlist
            </Button>

            <p className="text-center text-xs md:text-sm text-gray-600">
              For enquiries and support{" "}
              <a href="#" className="text-[#5DADE2] hover:underline">
                Contact Us
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}