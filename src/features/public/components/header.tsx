import { Button } from "../../../components/ui/button";

const navItems = [
  {
    page: "Home",
    href: "/",
  },
  {
    page: "How it Works",
    href: "/how-it-works",
  },
  {
    page: "Elora Ai",
    href: "/elor-ai",
  },
  {
    page: "Testimonials",
    href: "/testimonials",
  },
] as const;

function Header() {
  return (
    <header className="mt-[31px] mb-[21px] px-12.5">
      <nav className="mx-auto flex w-full max-w-335 items-center justify-between">
        <img
          src="/img/icons/elora-logo.svg"
          alt="Elora Logo"
          width={74}
          height={26}
        />

        <ul className="flex items-center gap-x-12.5 rounded-[122px] bg-(--color-peach-lightest) px-[31px] py-3.5 text-sm leading-[100%] tracking-[0px] text-black">
          {navItems.map((item, i) => (
            <li key={i}> {item.page}</li>
          ))}

          <div className="flex gap-x-2.5">
            <Button
              size="lg"
              className="rounded-[41px] bg-(--color-peach-light) text-lg font-normal tracking-[0px] text-white"
            >
              Log In
            </Button>
            <Button
              size="lg"
              className="rounded-[41px] bg-(--color-charcoal) text-lg font-normal tracking-[0px] text-(--color-white-neutral)"
            >
              Get Started
            </Button>
          </div>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
