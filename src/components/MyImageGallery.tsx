import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import styled from 'styled-components';
export interface ImageItem {
  alt: string;
  original: string;
  thumbnail: string;
}
type PropsType = {
  images: ImageItem[];
};
const Gallery = styled.div`
  position: relative;
  padding: 24px 24px 24px 20px;
  /* border-right: 2px solid rgb(247, 247, 247); */
  & .image-gallery-image {
    max-height: 450px !important;
    min-height: 450px !important;
  }
  & .image-gallery-thumbnail-image {
    max-height: 82px !important;
    min-height: 82px !important;
    max-width: 82px !important;
    min-width: 82px !important;
    object-fit: cover;
  }
`;
export const MyImageGallery: React.FC<PropsType> = (props: PropsType) => {
  const properties = {
    // thumbnailPosition: 'left',
    showFullscreenButton: true,
    showPlayButton: false,
    showNav: true,
    items: props.images,
  };
  return (
    <Gallery>
      <ImageGallery {...properties} />
    </Gallery>
  );
};
