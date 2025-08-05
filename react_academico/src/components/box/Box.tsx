import { type CSSProperties, type ReactNode } from 'react';

type BoxProps = {
  children?: ReactNode;
  width?: string;
  height?: string;
  maxWidth?: string;
  marginTop?: string;
  padding?: string;
};

const Box = ({
  children,
  width = '100%',
  height = 'auto',
  maxWidth = '1200px',
  marginTop = '50px',
  padding = '50px',
}: BoxProps) => {
  const boxStyle: CSSProperties = {
    position: 'relative',
    display: 'block',
    width: width,
    height: height,
    maxWidth: maxWidth,
    margin: '0 auto',
    marginTop: marginTop,
    padding: padding,
    background: '#fff',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  };

  return <div style={boxStyle}>{children}</div>;
};

export default Box;
