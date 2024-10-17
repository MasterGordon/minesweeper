import { Link } from "wouter";

interface NavLinkProps {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}

const NavLink: React.FC<NavLinkProps> = ({ href, children, external }) => {
  const Comp = external ? "a" : Link;
  return (
    <Comp
      href={href}
      target={external ? "_blank" : undefined}
      className="text-white/70 hover:text-white/90 font-bold inline-flex gap-2"
    >
      {children}
    </Comp>
  );
};

export default NavLink;
