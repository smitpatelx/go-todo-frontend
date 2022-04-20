import React from 'react';
import Image, { ImageProps } from 'next/image';

type SpxImageProps = ImageProps & {
  src: string,
  fallbackSrc?: string,
};

const defaultProps = {
  fallbackSrc: '',
};

const SpxImage: React.FunctionComponent<SpxImageProps> = ({
  src, fallbackSrc, ...rest
}: SpxImageProps) => {
  const [imgSrc, setImgSrc] = React.useState<string>(src);

  React.useEffect(() => {
    setImgSrc(src);
  }, [src]);

  const mutateImageSrc = () => {
    setImgSrc(fallbackSrc || src);
  };

  return (
    <Image
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...rest}
      onError={() => mutateImageSrc()}
      onLoadingComplete={(result) => {
        if (result.naturalWidth === 0) {
          // Broken image
          mutateImageSrc();
        }
      }}
      src={imgSrc}
    />
  );
};

SpxImage.defaultProps = defaultProps;

export default SpxImage;
