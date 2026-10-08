/**
 * CAFE ALDAW - IMAGE ASSET PLACEHOLDER CONFIGURATION
 * ----------------------------------------------------
 * You can easily replace the placeholder URLs below with:
 * 1. Your own image URLs (e.g., "https://yourdomain.com/photo.jpg")
 * 2. Local public paths (e.g., "/images/logo.png" placed in your public/ folder)
 * 
 * If a value is left as an empty string (""), the application will automatically
 * render an elegant, branded vector/stylized archway placeholder!
 */

export const ASSET_IMAGES = {
  // Brand Logo (Header and Splash/Footer)
  logo: '/images/logo.png', // Or your custom logo image URL

  // Hero Section - The Sun / Mayon Volcano Archway Artwork
  heroArchway: '', // Leave empty for line-art volcano & sunrise, or provide URL

  // Menu Items - FOOD
  foodKareKare: '', // e.g. "/images/kare-kare.jpg"
  foodChickenDynamite: '', // e.g. "/images/chicken-dynamite.jpg"
  foodSaltPepperPork: '', // e.g. "/images/salt-pepper-pork.jpg"

  // Menu Items - DRINKS
  drinkSpanishLatte: '', // e.g. "/images/spanish-latte.jpg"
  drinkMatchaCloud: '', // e.g. "/images/matcha-cloud.jpg"
  drinkColdBrewCoconut: '', // e.g. "/images/cold-brew.jpg"

  // Menu Items - PASTRIES
  pastryPiliCroissant: '', // e.g. "/images/pili-croissant.jpg"
  pastryCardamomKnot: '', // e.g. "/images/cardamom-knot.jpg"
  pastryBasqueCheesecake: '', // e.g. "/images/cheesecake.jpg"

  // Locations Section
  locationCamalig: '', // e.g. "/images/camalig-branch.jpg"
  locationLegazpi: '', // e.g. "/images/legazpi-branch.jpg"
} as const;

export type AssetKey = keyof typeof ASSET_IMAGES;
