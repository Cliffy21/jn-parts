# Cloudinary Configuration Guide

This project is fully configured to work with Cloudinary for image uploads and optimization.

## Setup Instructions

### 1. Get Your Cloudinary Credentials

1. Sign up for a free account at [cloudinary.com](https://cloudinary.com)
2. Go to your [Dashboard](https://cloudinary.com/console)
3. Copy your credentials:
   - **Cloud Name** (found in the dashboard URL or settings)
   - **API Key** (found in Account Details)
   - **API Secret** (found in Account Details - keep this secret!)

### 2. Configure Environment Variables

Create a `.env.local` file in the root of this project with the following:

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name_here
CLOUDINARY_API_KEY=your_api_key_here
CLOUDINARY_API_SECRET=your_api_secret_here
```

**Important:**
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is safe to expose in client-side code
- `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET` should NEVER be exposed to the client
- Never commit `.env.local` to version control

### 3. Verify Configuration

After setting up your environment variables:

1. Restart your development server: `npm run dev`
2. Test the upload functionality using the `ImageUploader` component
3. Check the browser console and server logs for any errors

## Features

### ✅ Image Upload API

The upload API (`/api/upload`) is configured with:
- **File validation**: Only images (JPEG, PNG, WebP, GIF) are allowed
- **Size limit**: Maximum 10MB per file
- **Auto-optimization**: Images are automatically optimized with Cloudinary transformations
- **Folder organization**: All uploads go to the `jncaraccessories` folder
- **Error handling**: Comprehensive error messages for debugging

### ✅ Image Optimization Utilities

The `lib/cloudinary.ts` file provides utilities for optimizing Cloudinary URLs:

```typescript
import { getOptimizedImageUrl, optimizeCloudinaryUrl, isCloudinaryUrl } from '@/lib/cloudinary';

// Automatically optimize a Cloudinary URL
const optimized = getOptimizedImageUrl(url, width, height);

// Check if a URL is from Cloudinary
if (isCloudinaryUrl(url)) {
  // Handle Cloudinary URL
}

// Advanced optimization with custom options
const custom = optimizeCloudinaryUrl(url, {
  width: 1200,
  height: 800,
  quality: 85,
  format: 'webp',
  crop: 'fill',
  gravity: 'auto'
});
```

### ✅ Next.js Image Integration

All components using Next.js `Image` component are configured to:
- Automatically optimize Cloudinary URLs
- Use responsive image sizes
- Support lazy loading
- Work with Cloudinary's CDN

### ✅ Components Using Cloudinary

The following components are configured to work with Cloudinary:

- **ImageUploader**: Upload component with progress and error handling
- **Products**: Product images are optimized automatically
- **Portfolio**: Portfolio gallery images use Cloudinary optimization
- **Services**: Service images can use Cloudinary URLs
- **About**: About section images support Cloudinary

## Usage Examples

### Uploading an Image

```typescript
import ImageUploader from '@/app/components/ImageUploader';

function MyComponent() {
  const [imageUrl, setImageUrl] = useState('');

  return (
    <ImageUploader
      value={imageUrl}
      onChange={setImageUrl}
      maxSizeMB={10}
      accept="image/*"
    />
  );
}
```

### Using Optimized Images

```typescript
import Image from 'next/image';
import { getOptimizedImageUrl } from '@/lib/cloudinary';

function ProductImage({ cloudinaryUrl, productName }) {
  return (
    <Image
      src={getOptimizedImageUrl(cloudinaryUrl, 800, 600)}
      alt={productName}
      width={800}
      height={600}
      sizes="(max-width: 640px) 100vw, 50vw"
    />
  );
}
```

## Image Optimization Features

Cloudinary automatically applies:
- **Format optimization**: Auto-converts to WebP when supported
- **Quality optimization**: Auto-adjusts quality for best file size/quality balance
- **Responsive images**: Different sizes for different screen sizes
- **Lazy loading**: Images load as they enter the viewport

## Troubleshooting

### Upload Fails

1. Check that all environment variables are set correctly
2. Verify your Cloudinary credentials in the dashboard
3. Check the browser console and server logs for error messages
4. Ensure file size is under 10MB
5. Verify file type is an image (JPEG, PNG, WebP, GIF)

### Images Not Displaying

1. Check that `res.cloudinary.com` is allowed in `next.config.ts` (already configured)
2. Verify the URL format is correct
3. Check browser console for CORS or loading errors
4. Ensure the image URL is accessible (not private/restricted)

### Build Errors

1. Ensure all TypeScript types are correct
2. Run `npm run lint` to check for errors
3. Run `npm run build` to test production build

## Security Notes

- Never expose `CLOUDINARY_API_SECRET` in client-side code
- Use signed URLs for private images if needed
- Set up Cloudinary upload presets for additional security
- Consider rate limiting for upload endpoints in production

## Additional Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Next.js Image Optimization](https://nextjs.org/docs/app/api-reference/components/image)
- [Cloudinary Transformation Reference](https://cloudinary.com/documentation/transformation_reference)

