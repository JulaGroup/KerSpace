/**
 * Cloudinary Image Optimization Utilities
 * Generates optimized Cloudinary URLs with transformations
 */

export interface CloudinaryOptions {
  width?: number;
  height?: number;
  quality?: 'auto' | number;
  format?: 'auto' | 'webp' | 'jpg' | 'png';
  crop?: 'fill' | 'scale' | 'fit' | 'limit' | 'pad';
  gravity?: 'auto' | 'face' | 'center';
  blur?: number;
}

/**
 * Optimizes a Cloudinary image URL with transformations
 * @param url - Original Cloudinary URL
 * @param options - Optimization options
 * @returns Optimized Cloudinary URL
 */
export function optimizeCloudinaryImage(
  url: string,
  options: CloudinaryOptions = {}
): string {
  if (!url || !url.includes('cloudinary.com')) {
    return url;
  }

  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
    blur,
  } = options;

  const transformations: string[] = [];

  // Add width/height
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);

  // Add crop mode
  if (width || height) transformations.push(`c_${crop}`);

  // Add gravity for smart cropping
  if ((width || height) && gravity) transformations.push(`g_${gravity}`);

  // Add quality
  transformations.push(`q_${quality}`);

  // Add format
  transformations.push(`f_${format}`);

  // Add blur if needed (for thumbnails)
  if (blur) transformations.push(`e_blur:${blur}`);

  // Add DPR for retina displays
  transformations.push('dpr_auto');

  const transformString = transformations.join(',');

  // Insert transformations into the URL
  return url.replace('/upload/', `/upload/${transformString}/`);
}

/**
 * Preset configurations for common use cases
 */
export const CloudinaryPresets = {
  thumbnail: (url: string) =>
    optimizeCloudinaryImage(url, {
      width: 400,
      height: 300,
      quality: 80,
      crop: 'fill',
      gravity: 'auto',
    }),

  card: (url: string) =>
    optimizeCloudinaryImage(url, {
      width: 800,
      height: 600,
      quality: 'auto',
      crop: 'fill',
      gravity: 'auto',
    }),

  hero: (url: string) =>
    optimizeCloudinaryImage(url, {
      width: 1920,
      height: 1080,
      quality: 'auto',
      crop: 'fill',
      gravity: 'auto',
    }),

  gallery: (url: string) =>
    optimizeCloudinaryImage(url, {
      width: 1200,
      height: 900,
      quality: 'auto',
      crop: 'fill',
      gravity: 'auto',
    }),

  blur: (url: string) =>
    optimizeCloudinaryImage(url, {
      width: 100,
      quality: 30,
      blur: 1000,
    }),
};
