import sharp from 'sharp';
import path from 'path';

const sizes = {
  sm: 720,
  md: 1280,
  lg: 1920,
};

export default async function (imgPath: string) {
  const { ext, name: imgSlug } = path.parse(imgPath);

  const processed = {
    original: {
      name: imgSlug + ext,
      data: await sharp(imgPath).toBuffer(),
    },
    placeholder: {
      name: `${imgSlug}-placeholder${ext}`,
      data: await sharp(imgPath).resize(sizes.sm).jpeg({ quality: 40 }).blur(15).toBuffer(),
    },
  };

  for (const size of Object.keys(sizes)) {
    processed[size] = {
      name: `${imgSlug}-${size}${ext}`,
      data: await sharp(imgPath).resize(sizes[size]).jpeg({ quality: 60 }).toBuffer(),
    };
  }

  return processed;
}
