const navItems = [
  {
    page: "features",
    href: "/features",
  },
  {
    page: "how it works",
    href: "/how-it-works",
  },
  {
    page: "pricing",
    href: "/pricing",
  },
] as const;

function NavBar() {
  return (
    <nav className="flex items-center pr-24 justify-between">
      <img
        src="/img/svg/elora-logo.svg"
        alt="Elora Logo"
        width={84}
        height={35}
      />

      <ul className="flex items-center font-roboto-mono font-medium text-base uppercase text-foreground gap-x-[23px]">
        {navItems.map((item, i) => (
          <li key={i}> {item.page}</li>
        ))}
      </ul>
    </nav>
  );
}

export default NavBar;
