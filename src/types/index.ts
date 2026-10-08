export type MenuCategory =
  | 'Rice Up'
  | 'Rice & Shine'
  | 'Al Dente'
  | 'Nucturna (Coffee)'
  | 'Luna Blanca & Milk Tea';

export type MenuBadge = 'best-seller' | 'uniquely-ours' | 'premium';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  subcategory?: string;
  price: number;
  priceIce?: number;
  price22oz?: number;
  description: string;
  badges?: MenuBadge[];
  tag?: string;
  isPopular?: boolean;
  imageKey: string;
}

export interface LocationDetail {
  id: string;
  name: string;
  subtitle: string;
  address: string;
  hours: string;
  phone: string;
  features: string[];
  imageKey: string;
  mapUrl?: string;
}

export interface GalleryMoment {
  id: string;
  title: string;
  subtitle: string;
  category: 'Courtyard' | 'Coffee' | 'Feasts' | 'Ambience';
  imageKey: string;
  caption: string;
}

export type ThemeMode = 'day' | 'night';
