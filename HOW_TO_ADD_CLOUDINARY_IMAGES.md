# How to Add Cloudinary Images to Your Portfolio

## Step-by-Step Guide

### 1. Get Your Cloudinary Image URL

1. Go to your [Cloudinary Dashboard](https://cloudinary.com/console)
2. Navigate to **Media Library** → **jncaraccessories** folder
3. Click on the image you want to use
4. Copy the **Secure URL** (it will look like: `https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/jncaraccessories/image-name.jpg`)

### 2. Open the Portfolio Component File

Open: `/app/components/Portfolio.tsx`

### 3. Find the Mock Data Section

Look for the section that starts around **line 20-23**:

```typescript
// ============================================
// MOCK DATA - Replace with your Cloudinary URLs
// ============================================
const mockPortfolioItems: PortfolioItem[] = [
```

### 4. Replace the Image URLs

Each portfolio item has an `images` array. Replace the placeholder URLs with your Cloudinary URLs.

**Example - Before (with placeholder URLs):**
```typescript
{
  _id: "1",
  title: "Matte Black BMW M4",
  color: "black",
  images: [
    "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",  // ← Replace this
    "https://images.unsplash.com/photo-1556189250-72ba954cfc2b?w=800&q=80",  // ← Replace this
    "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80", // ← Replace this
  ],
  description: "Full matte black wrap with gloss black accents",
  createdAt: "2024-01-15",
},
```

**Example - After (with your Cloudinary URLs):**
```typescript
{
  _id: "1",
  title: "Matte Black BMW M4",
  color: "black",
  images: [
    "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/jncaraccessories/bmw-m4-front.jpg",
    "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/jncaraccessories/bmw-m4-side.jpg",
    "https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/jncaraccessories/bmw-m4-back.jpg",
  ],
  description: "Full matte black wrap with gloss black accents",
  createdAt: "2024-01-15",
},
```

### 5. Complete Example

Here's a complete example of how your portfolio data should look:

```typescript
const mockPortfolioItems: PortfolioItem[] = [
  {
    _id: "1",
    title: "Matte Black BMW M4",
    color: "black",
    images: [
      "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/jncaraccessories/bmw-m4-1.jpg",
      "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/jncaraccessories/bmw-m4-2.jpg",
      "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/jncaraccessories/bmw-m4-3.jpg",
    ],
    description: "Full matte black wrap with gloss black accents",
    createdAt: "2024-01-15",
  },
  {
    _id: "2",
    title: "Racing Red Porsche 911",
    color: "red",
    images: [
      "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/jncaraccessories/porsche-911-1.jpg",
      "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/jncaraccessories/porsche-911-2.jpg",
    ],
    description: "Gloss racing red with carbon fiber details",
    createdAt: "2024-02-20",
  },
  // ... add more items as needed
];
```

## Important Notes

### ✅ What to Keep
- Keep the structure exactly as shown
- Keep the `_id`, `title`, `color`, `description`, and `createdAt` fields
- Keep the array format `[ ]` for multiple images

### ✅ Multiple Images
- You can have **one or more images** per portfolio item
- The first image in the array is the **thumbnail** shown in the grid
- All images are shown in the modal gallery

### ✅ Image URLs Format
- Use the **full Cloudinary URL** (starts with `https://res.cloudinary.com/`)
- The component will automatically optimize these URLs for performance
- You don't need to add any transformations - the code handles that

### ✅ Color Field
Make sure the `color` field matches one of these values:
- `"black"`, `"red"`, `"blue"`, `"purple"`, `"green"`, `"gray"`, `"white"`, `"orange"`, `"yellow"`, `"pink"`, `"silver"`

## Adding New Portfolio Items

To add a new portfolio item, copy this template:

```typescript
{
  _id: "9", // Use a unique number
  title: "Your Project Title",
  color: "red", // Choose from the colors above
  images: [
    "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/jncaraccessories/image1.jpg",
    "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/jncaraccessories/image2.jpg",
  ],
  description: "Description of your project",
  createdAt: "2024-06-01", // Use YYYY-MM-DD format
},
```

## Also Update Products Component

If you want to add Cloudinary images to products, open `/app/components/Products.tsx` and find the `mockProducts` array (around line 27). Replace the `image_url` field:

**Before:**
```typescript
{
  id: "1",
  name: "High Performance Air Filter",
  category: "engine",
  description: "K&N style high-flow air filter...",
  price: 4500,
  image_url: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=800&q=80", // ← Replace this
},
```

**After:**
```typescript
{
  id: "1",
  name: "High Performance Air Filter",
  category: "engine",
  description: "K&N style high-flow air filter...",
  price: 4500,
  image_url: "https://res.cloudinary.com/YOUR_CLOUD_NAME/image/upload/v1234567890/jncaraccessories/air-filter.jpg",
},
```

## Testing

After adding your URLs:

1. Save the file
2. The development server should auto-reload
3. Navigate to the Portfolio section on your website
4. Your Cloudinary images should now appear!

## Troubleshooting

**Images not showing?**
- Check that the URL is correct (copy the full Secure URL from Cloudinary)
- Make sure the URL starts with `https://res.cloudinary.com/`
- Check the browser console for any errors

**Images look blurry?**
- The component automatically optimizes images, but you can adjust sizes in the code if needed
- Cloudinary automatically serves the best format (WebP when supported)

**Want to remove an item?**
- Simply delete the entire object `{ ... }` from the array

