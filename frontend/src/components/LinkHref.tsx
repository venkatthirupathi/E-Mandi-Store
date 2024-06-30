import { Link, LinkProps } from "react-router-dom";

interface LinkHrefProps extends LinkProps {
  href: LinkProps["to"];
}

export default function LinkHref(props: LinkHrefProps) {
  const { href, ...other } = props;
  return <Link {...other} to={href} />;
}
