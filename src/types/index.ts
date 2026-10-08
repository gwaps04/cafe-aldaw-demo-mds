export type MenuCategory = 'Food' | 'Drinks' | 'Pastries';

export interface MenuItem {
  id: string;
  name: string;
  category: MenuCategory;
  price: number;
  description: string;
  tag?: string;
  isPopular?: boolean;
  imageKey: string; // references ASSET_IMAGES in assets.ts
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

export type ThemeMode = 'day' | 'night';
