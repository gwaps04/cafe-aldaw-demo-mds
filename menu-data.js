const CAFE_CONFIG = {
  name: 'Cafe Aldaw',
  tagline: 'Good coffee. Good vibes.',
  currency: '₱',
  hours: 'Mon – Sun: 9:00 AM – 9:00 PM',
  location: 'Cafe Aldaw, Philippines',
  instagram: 'cafealdaw',
  // Add your WhatsApp business number (country code only, e.g. '639123456789') to enable direct ordering.
  whatsappNumber: ''
};

// Category order shown in the horizontal filter chips.
const MENU_CATEGORIES = [
  'All',
  'Best Sellers',
  'Snacks',
  'Rice Meals',
  'Noodles & Pasta',
  'Coffee',
  'Non-Coffee',
  'Matcha',
  'Desserts / Shaved Ice'
];

// Sample menu. Set `image` to a local path (e.g. 'images/kare-kare.jpg') or URL.
// Leaving `image` empty will show a branded placeholder.
const MENU_ITEMS = [
  {
    id: 'chicken-dynamite',
    name: 'Chicken Dynamite',
    category: 'Snacks',
    price: 185,
    description: 'Crispy chicken bites tossed in a sweet and spicy glaze.',
    bestSeller: true,
    tags: ['spicy', 'crispy'],
    image: ''
  },
  {
    id: 'chicken-karaage',
    name: 'Chicken Karaage',
    category: 'Snacks',
    price: 195,
    description: 'Japanese-style fried chicken served with tangy mayo.',
    bestSeller: false,
    tags: ['crispy'],
    image: ''
  },
  {
    id: 'salt-pepper-pork',
    name: 'Salt & Pepper Pork',
    category: 'Snacks',
    price: 210,
    description: 'Crispy pork belly seasoned with salt, pepper, and aromatics.',
    bestSeller: false,
    tags: ['crispy'],
    image: ''
  },
  {
    id: 'kare-kare',
    name: 'Kare Kare',
    category: 'Rice Meals',
    price: 290,
    description: 'Rich peanut stew with tender beef, vegetables, and bagoong.',
    bestSeller: true,
    tags: ['filipino', 'rice'],
    image: ''
  },
  {
    id: 'inasal-rice',
    name: 'Inasal Rice Bowl',
    category: 'Rice Meals',
    price: 260,
    description: 'Grilled chicken inasal with garlic rice and pickled papaya.',
    bestSeller: false,
    tags: ['filipino', 'rice', 'grilled'],
    image: ''
  },
  {
    id: 'spam-egg-rice',
    name: 'Spam & Egg Rice Meal',
    category: 'Rice Meals',
    price: 240,
    description: 'Crispy Spam slices with fried egg and garlic rice.',
    bestSeller: false,
    tags: ['rice'],
    image: ''
  },
  {
    id: 'four-cheese-pasta',
    name: 'Four Cheese Pasta',
    category: 'Noodles & Pasta',
    price: 240,
    description: 'Creamy fusilli loaded with four kinds of cheese.',
    bestSeller: false,
    tags: ['pasta', 'cheese'],
    image: ''
  },
  {
    id: 'truffle-mushroom-pasta',
    name: 'Truffle Mushroom Pasta',
    category: 'Noodles & Pasta',
    price: 270,
    description: 'Creamy pasta with mushrooms and a touch of truffle oil.',
    bestSeller: false,
    tags: ['pasta', 'mushroom'],
    image: ''
  },
  {
    id: 'pesto-chicken-pasta',
    name: 'Pesto Chicken Pasta',
    category: 'Noodles & Pasta',
    price: 250,
    description: 'Al dente pasta tossed in basil pesto with grilled chicken.',
    bestSeller: false,
    tags: ['pasta', 'chicken'],
    image: ''
  },
  {
    id: 'iced-himalayan-salt',
    name: 'Iced Himalayan Salt',
    category: 'Coffee',
    price: 170,
    description: 'Cold brew topped with a whipped salted cream cap.',
    bestSeller: true,
    tags: ['coffee', 'cold', 'salted'],
    image: ''
  },
  {
    id: 'caramel-macchiato',
    name: 'Caramel Macchiato',
    category: 'Coffee',
    price: 165,
    description: 'Espresso, vanilla, and steamed milk finished with caramel drizzle.',
    bestSeller: false,
    tags: ['coffee', 'hot'],
    image: ''
  },
  {
    id: 'spanish-latte',
    name: 'Spanish Latte',
    category: 'Coffee',
    price: 160,
    description: 'Bold espresso sweetened with condensed milk.',
    bestSeller: false,
    tags: ['coffee', 'hot'],
    image: ''
  },
  {
    id: 'cafe-americano',
    name: 'Cafe Americano',
    category: 'Coffee',
    price: 140,
    description: 'Smooth espresso diluted with hot water.',
    bestSeller: false,
    tags: ['coffee', 'hot'],
    image: ''
  },
  {
    id: 'happy-hour-fruit',
    name: 'Happy Hour Fruit Punch',
    category: 'Non-Coffee',
    price: 150,
    description: 'Seasonal fruit cooler for sunny afternoons.',
    bestSeller: false,
    tags: ['drink', 'cold', 'fruity'],
    image: ''
  },
  {
    id: 'horchata-latte',
    name: 'Horchata Latte',
    category: 'Non-Coffee',
    price: 175,
    description: 'Cinnamon-rice milk latte over ice.',
    bestSeller: false,
    tags: ['drink', 'cold', 'cinnamon'],
    image: ''
  },
  {
    id: 'iced-chocolate',
    name: 'Iced Chocolate',
    category: 'Non-Coffee',
    price: 160,
    description: 'Rich chocolate milk served ice-cold.',
    bestSeller: false,
    tags: ['drink', 'cold', 'chocolate'],
    image: ''
  },
  {
    id: 'matcha-latte',
    name: 'Matcha Latte',
    category: 'Matcha',
    price: 180,
    description: 'Creamy ceremonial-grade matcha with your choice of milk.',
    bestSeller: true,
    tags: ['matcha', 'milk'],
    image: ''
  },
  {
    id: 'dirty-matcha',
    name: 'Dirty Matcha',
    category: 'Matcha',
    price: 190,
    description: 'Matcha with a shot of espresso for an extra kick.',
    bestSeller: false,
    tags: ['matcha', 'coffee'],
    image: ''
  },
  {
    id: 'strawberry-matcha',
    name: 'Strawberry Matcha',
    category: 'Matcha',
    price: 185,
    description: 'Sweet strawberry purée layered with earthy matcha milk.',
    bestSeller: false,
    tags: ['matcha', 'strawberry'],
    image: ''
  },
  {
    id: 'oreo-shaved-ice',
    name: 'Oreo Shaved Ice',
    category: 'Desserts / Shaved Ice',
    price: 220,
    description: 'Milky shaved ice loaded with Oreo crumbles and cream.',
    bestSeller: true,
    tags: ['dessert', 'cold', 'oreo'],
    image: ''
  },
  {
    id: 'ube-shaved-ice',
    name: 'Ube Shaved Ice',
    category: 'Desserts / Shaved Ice',
    price: 210,
    description: 'Fluffy ube shaved ice topped with leche flan and milk.',
    bestSeller: false,
    tags: ['dessert', 'cold', 'filipino'],
    image: ''
  },
  {
    id: 'mango-graham',
    name: 'Mango Graham Shaved Ice',
    category: 'Desserts / Shaved Ice',
    price: 230,
    description: 'Shaved ice with fresh mango, graham crumbs, and cream.',
    bestSeller: false,
    tags: ['dessert', 'cold', 'mango'],
    image: ''
  }
];
