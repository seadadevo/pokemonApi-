const SpriteImage = ({ src, alt }) => {
  if (!src) return null;
  return (
    <img
      src={src}
      alt={alt}
      className="w-20 h-20 object-contain mx-auto"
    />
  );
};

export default SpriteImage;