"use client";
import "../../styles/Seetingshome.css";

const ImageSkeleton = ({ images }) => {
  if (!images || images.length === 0) return null;

  const displayImages = images.slice(0, 5);
  const countClass =
    ["zero", "one", "two", "three", "four", "five"][displayImages.length] ||
    "five";

  return (
    <div className={`post-image ${countClass}`}>
      {displayImages.map((imgUrl, index) => (
        <img key={index} src={imgUrl} alt={`Post image ${index + 1}`} />
      ))}
    </div>
  );
};
export default ImageSkeleton;
