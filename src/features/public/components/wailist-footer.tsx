export const WaitlistFooter = () => {
    return (
      <footer className="bg-[#2D2A26] text-white py-6 md:py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 lg:gap-8">
            {/* Left Section - Tagline */}
            <div className="text-center md:text-left w-full md:w-auto order-1 md:order-1">
              <p className="text-xs sm:text-sm md:text-base">
                AI-Powered TeleDermatology for Everyone
              </p>
            </div>
  
            {/* Center Section - Navigation Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm md:text-base order-2 md:order-2">
              <a href="#" className="hover:opacity-80 transition-opacity whitespace-nowrap">
                About
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity whitespace-nowrap">
                Privacy Policy
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity whitespace-nowrap">
                Terms of Use
              </a>
              <a href="#" className="hover:opacity-80 transition-opacity whitespace-nowrap">
                Contact
              </a>
            </div>
  
            {/* Right Section - Copyright */}
            <div className="text-center md:text-right w-full md:w-auto order-3 md:order-3">
              <p className="text-xs sm:text-sm md:text-sm">
                © 2025 Elora Health Technologies. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    )
  }