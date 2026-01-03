import { Link } from "@tanstack/react-router";
import { Button } from "../../../components/ui/button";

const navItems = [
  {
    page: "Home",
    href: "/",
  },
  // {
  //   page: "How it Works",
  //   href: "/how-it-works",
  // },
  {
    page: "AI Diagnosis",
    href: "/ai-diagnosis",
  },
  {
    page: "Book Consultation",
    href: "/book-consultations",
  },
  // {
  //   page: "Testimonials",
  //   href: "/testimonials",
  // },
] as const;

function Header() {
  return (
    <header className="mt-[31px] mb-[21px] px-5 xl:px-12.5">
      <nav className="mx-auto flex w-full max-w-335 flex-wrap items-center justify-between">
        <Link to="/">
          <img
            src="/img/icons/elora-logo.svg"
            alt="Elora Logo"
            width={74}
            height={26}
          />
        </Link>

        <ul className="hidden flex-wrap items-center gap-x-12.5 rounded-[122px] bg-(--color-peach-lightest) px-[31px] py-3.5 text-sm leading-[100%] tracking-[0px] text-black sm:flex">
          {navItems.map((item, i) => (
            <li key={i}>
              <Link 
                to={item.href}
                className="hover:text-(--color-brown) transition-colors"
              >
                {item.page}
              </Link>
            </li>
          ))}

          <div className="flex gap-x-2.5">
            <Button
              asChild
              size="lg"
              className="rounded-[41px] bg-(--color-peach-light) text-lg font-normal tracking-[0px] text-white"
            >
              <Link to="/auth/login">Log In</Link>
            </Button>
            <Button
              asChild
              size="lg"
              className="rounded-[41px] bg-(--color-charcoal) text-lg font-normal tracking-[0px] text-(--color-white-neutral)"
            >
              <Link to="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
