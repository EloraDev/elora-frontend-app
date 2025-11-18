import { Facebook, Instagram, Linkedin, Mail, Twitter } from "lucide-react";

function Footer() {
  return (
    <footer className="min-h-[388.3px] bg-(--color-gray-dark) px-5 pt-16 pb-8 text-white lg:px-12.5">
      <div className="mx-auto w-full max-w-335 sm:px-5 lg:px-12.5">
        <div className="mb-12 flex flex-wrap gap-8">
          {/* COLUMN ----1 */}
          <div className="w-96 space-y-4">
            <h3 className="text-[28px] font-semibold">Elora</h3>
            <p className="font-inter text-base leading-6.5 text-(--color-gray-blue)">
              AI-powered teledermatology platform connecting patients with
              licensed dermatologists for expert skin care.
            </p>

            <div className="flex gap-x-4">
              <span className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white">
                <Facebook size={20} />
              </span>

              <span className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white">
                <Twitter size={20} />
              </span>

              <span className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white">
                <Instagram size={20} />
              </span>

              <span className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white">
                <Linkedin size={20} />
              </span>

              <span className="flex size-10 items-center justify-center rounded-full bg-white/10 text-white">
                <Mail size={20} />
              </span>
            </div>
          </div>

          {/* COLUMN ----2 */}
          <div className="w-44">
            <h4 className="mb-4 text-[20px] font-semibold">Product</h4>
            <ul className="font-inter flex flex-col gap-y-3 text-base text-(--color-gray-blue)">
              <li>Features</li>
              <li>How It Works</li>
              <li>Pricing</li>
              <li>FAQ</li>
            </ul>
          </div>

          {/* COLUMN ----3 */}
          <div className="w-44">
            <h4 className="mb-4 text-[20px] font-semibold">Company</h4>
            <ul className="font-inter flex flex-col gap-y-3 text-base text-(--color-gray-blue)">
              <li>About Us</li>
              <li>Careers</li>
              <li>Blog</li>
              <li>Press</li>
            </ul>
          </div>

          {/* COLUMN ----4 */}
          <div className="w-44">
            <h4 className="mb-4 text-[20px] font-semibold">Legal</h4>
            <ul className="font-inter flex flex-col gap-y-3 text-base text-(--color-gray-blue)">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>HIPAA Compilance</li>
              <li>Cookie Policy</li>
            </ul>
          </div>

          {/* COLUMN ----5 */}
          <div className="w-44">
            <h4 className="mb-4 text-[20px] font-semibold">Support</h4>
            <ul className="font-inter flex flex-col gap-y-3 text-base text-(--color-gray-blue)">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>For Physicians</li>
              <li>Partnership</li>
            </ul>
          </div>
        </div>

        <div className="font-inter flex min-h-[52.76px] items-end justify-between border-t-[0.77px] border-white text-sm leading-5 text-(--color-gray-blue)">
          <p>&copy; {new Date().getFullYear()} Elora. All rights reserved.</p>
          <p>
            Medical advice is provided by licensed dermatologists only. This
            platform is not intended for emergencies.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
