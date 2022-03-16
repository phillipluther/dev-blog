import sharp from 'sharp';
import path from 'path';

export const imageSizes = {
  sm: 720,
  md: 1280,
  lg: 1920,
};

export function buildSrcset(imgPath) {
  const { dir, ext, name: imgName } = path.parse(imgPath);

  const candidates = Object.keys(imageSizes).reduce((acc, size) => {
    const w = `${imageSizes[size]}w`;
    const candidate = path.join(dir, `${imgName}-${size}${ext} ${w}`);

    acc.push(candidate);
    return acc;
  }, []);

  return candidates.join(', ');
}

export default async function (imgPath) {
  const { ext, name: imgSlug } = path.parse(imgPath);

  const processed = {
    original: {
      name: imgSlug + ext,
      data: await sharp(imgPath).toBuffer(),
    },
    placeholder: {
      name: `${imgSlug}-placeholder${ext}`,
      data: await sharp(imgPath).resize(imageSizes.sm).jpeg({ quality: 40 }).blur(15).toBuffer(),
    },
  };

  for (const size of Object.keys(imageSizes)) {
    processed[size] = {
      name: `${imgSlug}-${size}${ext}`,
      data: await sharp(imgPath).resize(imageSizes[size]).jpeg({ quality: 60 }).toBuffer(),
    };
  }

  return processed;
}
