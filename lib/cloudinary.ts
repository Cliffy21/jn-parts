/**
 * Cloudinary URL optimization utilities
 * These functions help optimize Cloudinary image URLs for better performance
 */

/**
 * Checks if a URL is a Cloudinary URL
 */
export function isCloudinaryUrl(url: string): boolean {
  if (!url) return false;
  return url.includes('res.cloudinary.com') || url.includes('cloudinary.com');
}

/**
 * Optimizes a Cloudinary URL with transformations
 * @param url - The Cloudinary URL
 * @param width - Desired width (default: 1200)
 * @param height - Optional height for aspect ratio
 * @param quality - Image quality (default: auto)
 * @param format - Image format (default: auto)
 * @returns Optimized Cloudinary URL
 */
export function optimizeCloudinaryUrl(
  url: string,
  options: {
    width?: number;
    height?: number;
    quality?: number | 'auto';
    format?: 'auto' | 'webp' | 'jpg' | 'png';
    crop?: string;
    gravity?: string;
  } = {}
): string {
  if (!url || !isCloudinaryUrl(url)) {
    return url;
  }

  const {
    width = 1200,
    height,
    quality = 'auto',
    format = 'auto',
    crop,
    gravity,
  } = options;

  // Build transformation string
  const transformations: string[] = [];

  if (format !== 'auto') {
    transformations.push(`f_${format}`);
  } else {
    transformations.push('f_auto');
  }

  if (quality !== 'auto') {
    transformations.push(`q_${quality}`);
  } else {
    transformations.push('q_auto');
  }

  if (width) {
    transformations.push(`w_${width}`);
  }

  if (height) {
    transformations.push(`h_${height}`);
  }

  if (crop) {
    transformations.push(`c_${crop}`);
  }

  if (gravity) {
    transformations.push(`g_${gravity}`);
  }

  const transformString = transformations.join(',');

  // Replace /upload/ with /upload/transformations/
  if (url.includes('/upload/')) {
    return url.replace('/upload/', `/upload/${transformString}/`);
  }

  return url;
}

/**
 * Legacy function for backward compatibility
 * @deprecated Use optimizeCloudinaryUrl instead
 */
export function cdn(url: string, w = 1200): string {
  return optimizeCloudinaryUrl(url, { width: w });
}

/**
 * Gets optimized URL for Next.js Image component
 * Automatically detects Cloudinary URLs and optimizes them
 */
export function getOptimizedImageUrl(
  url: string,
  width?: number,
  height?: number
): string {
  if (!url) return '';
  
  if (isCloudinaryUrl(url)) {
    return optimizeCloudinaryUrl(url, { width, height });
  }
  
  return url;
}
  