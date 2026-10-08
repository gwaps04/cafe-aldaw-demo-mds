/**
 * CAFE ALDAW - IMAGE ASSET PLACEHOLDER CONFIGURATION
 * ----------------------------------------------------
 * You can easily replace the placeholder URLs below with:
 * 1. Your own image URLs (e.g., "https://yourdomain.com/photo.jpg")
 * 2. Local public paths (e.g., "/images/cafe aldaw.png" or "/images/hero image.jpg")
 * 
 * If a value is left as an empty string (""), the application will automatically
 * render an elegant, branded vector/stylized archway placeholder!
 */

export const ASSET_IMAGES = {
  // Brand Logo (Header and Splash/Footer)
  logo: '/images/cafe aldaw.png',

  // Hero Section - The Sun / Mayon Volcano Archway Artwork
  heroArchway: '/images/hero image.jpg',

  // Menu Items - Rice Up & Specialties
  foodKareKare: '/images/crispy karekare.jpg',
  foodAdoboSaAsin: '/images/adobo sa asin.jpg',
  foodBicolExpress: '/images/bicol express.jpg',
  foodPinangatCurry: '',
  foodKandingga: '',
  foodPorkBinagoongan: '',
  foodSoyGarlicChicken: '',

  // Menu Items - Rice and Shine (Silogs)
  foodTapsilog: '',
  foodChicksilog: '',
  foodLongsilog: '',
  foodLiemposilog: '',

  // Menu Items - Al Dente Pasta
  pastaPestoPinangat: '/images/peso pinangat.jpg',
  pastaCarbonara: '/images/carbonara.jpg',
  pastaGarlicLongganisa: '/images/garlic pasta.jpg',
  pastaClassicPesto: '',

  // Menu Items - Nucturna (Coffee)
  coffeeBiscoffLatte: '/images/biscoff latte.jpg',
  coffeeSpanishLatte: '/images/spanish latte.jpg',
  coffeeCoconutLatte: '/images/coconut latte.jpg',
  coffeeCaramelMacchiato: '',
  coffeeNutellaLatte: '',

  // Menu Items - Luna Blanca & Milk Tea
  drinkStrawberryChoco: '',
  drinkNutellaMilkTea: '',
  drinkOkinawaMilkTea: '',

  // Locations Section
  locationCamalig: '',
  locationLegazpi: '',

  // The Aldaw Moments Gallery (8 Image Slots)
  galleryMoment1: '/images/1.jpg', // e.g. "/images/moment-1.jpg" - Sunlit Courtyard Archways
  galleryMoment2: '/images/2.jpg', // e.g. "/images/moment-2.jpg" - Golden Hour Coffee Gathering
  galleryMoment3: '/images/3.jpg', // e.g. "/images/moment-3.jpg" - Al Fresco Garden Seating
  galleryMoment4: '/images/4.jpg', // e.g. "/images/moment-4.jpg" - Bicol Culinary Spread
  galleryMoment5: '/images/5.jpg', // e.g. "/images/moment-5.jpg" - Quiet Afternoon Reading Nook
  galleryMoment6: '/images/6.jpg', // e.g. "/images/moment-6.jpg" - Artisan Brew Bar
  galleryMoment7: '/images/7.jpg', // e.g. "/images/moment-7.jpg" - Mount Mayon Horizon View
  galleryMoment8: '/images/8.jpg', // e.g. "/images/moment-8.jpg" - Evening Lanterns & Warm Ambience
} as const;

export type AssetKey = keyof typeof ASSET_IMAGES;
