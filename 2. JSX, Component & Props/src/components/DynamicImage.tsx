import type React from "react";

interface DynamicImageProps {
  imageUrl: string;
  altText: string;
}

// function DynamicImage({ imageUrl, altText }: { imageUrl: string, altText: string }) {
//   return (
//     <img
//       src={imageUrl}
//       alt={altText}
//     />
//   )
// }


// function DynamicImage({ imageUrl, altText }: DynamicImageProps) {
//   return (
//     <img
//       src={imageUrl}
//       alt={altText}
//     />
//   )
// }

const DynamicImage: React.FC<DynamicImageProps> = ({ imageUrl, altText }) => {
  return (
    <img
      src={imageUrl}
      alt={altText}
    />
  )
}

export default DynamicImage