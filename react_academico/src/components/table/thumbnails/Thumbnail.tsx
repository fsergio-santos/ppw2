import React, { type ReactElement } from 'react';
import './thumbnail.css';


type ThumbnailProps = {
  src?:string;
  alt:string;
  default_image?:string;
}


const Thumbnail = ({
  src,
  alt,
  default_image
}:ThumbnailProps) => {
  return (
    <img
        src={ src || default_image }
        alt={alt}
        className="img-avatar"
        style={{ width: "50px", height: "50px", borderRadius: "50%" }}
      />
  )
}

export default Thumbnail
