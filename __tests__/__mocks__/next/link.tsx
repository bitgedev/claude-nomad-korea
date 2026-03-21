import React from "react";

type LinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: unknown;
};

const Link = ({ href, children, ...props }: LinkProps) => {
  return (
    <a href={href} {...props}>
      {children}
    </a>
  );
};

export default Link;
