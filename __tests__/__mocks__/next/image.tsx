import React from "react";

type ImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  fill?: boolean;
  priority?: boolean;
  [key: string]: unknown;
};

const Image = ({ src, alt, width, height, fill: _fill, priority: _priority, ...props }: ImageProps) => {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt={alt} width={width} height={height} {...props} />
  );
};

export default Image;
