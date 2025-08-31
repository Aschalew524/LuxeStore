export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  images: string[];
  features: string[];
  inStock: boolean;
  onSale: boolean;
}

export const categories = [
  'All Products',
  'Electronics',
  'Fashion',
  'Home & Kitchen',
  'Sports & Outdoors',
  'Beauty & Personal Care',
  'Books & Media',
  'Automotive',
  'Health & Wellness',
  'Toys & Games'
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life and crystal clear sound quality.',
    price: 199.99,
    originalPrice: 249.99,
    category: 'Electronics',
    brand: 'Sony',
    rating: 4.8,
    reviews: 1247,
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Noise Canceling', 'Bluetooth 5.0', '30h Battery', 'Quick Charge', 'Touch Controls'],
    inStock: true,
    onSale: true
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    description: 'Advanced fitness tracker with heart rate monitoring, GPS, and 7-day battery life.',
    price: 299.99,
    category: 'Electronics',
    brand: 'Apple',
    rating: 4.9,
    reviews: 2156,
    images: [
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Heart Rate Monitor', 'GPS', 'Water Resistant', 'Sleep Tracking', 'Notifications'],
    inStock: true,
    onSale: false
  },
  {
    id: '3',
    name: 'Premium Coffee Maker',
    description: 'Programmable coffee maker with built-in grinder and thermal carafe for hot coffee all day.',
    price: 89.99,
    originalPrice: 129.99,
    category: 'Home & Kitchen',
    brand: 'Breville',
    rating: 4.6,
    reviews: 892,
    images: [
      'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Built-in Grinder', 'Programmable', 'Thermal Carafe', '24h Timer', 'Auto Shut-off'],
    inStock: true,
    onSale: true
  },
  {
    id: '4',
    name: 'Designer Running Shoes',
    description: 'Lightweight performance running shoes with superior cushioning and breathable mesh upper.',
    price: 159.99,
    category: 'Fashion',
    brand: 'Nike',
    rating: 4.7,
    reviews: 1567,
    images: [
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Lightweight', 'Breathable Mesh', 'Superior Cushioning', 'Durable Outsole', 'Reflective Details'],
    inStock: true,
    onSale: false
  },
  {
    id: '5',
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat made from eco-friendly materials with alignment lines for perfect poses.',
    price: 49.99,
    originalPrice: 69.99,
    category: 'Sports & Outdoors',
    brand: 'Lululemon',
    rating: 4.5,
    reviews: 634,
    images: [
      'https://images.pexels.com/photos/4056530/pexels-photo-4056530.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4056530/pexels-photo-4056530.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Non-slip Surface', 'Eco-friendly', 'Alignment Lines', '6mm Thick', 'Carrying Strap'],
    inStock: true,
    onSale: true
  },
  {
    id: '6',
    name: 'Organic Face Serum',
    description: 'Anti-aging face serum with natural ingredients including vitamin C and hyaluronic acid.',
    price: 34.99,
    category: 'Beauty & Personal Care',
    brand: 'The Ordinary',
    rating: 4.4,
    reviews: 445,
    images: [
      'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3785147/pexels-photo-3785147.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Vitamin C', 'Hyaluronic Acid', 'Organic', 'Cruelty-free', 'Fragrance-free'],
    inStock: true,
    onSale: false
  },
  {
    id: '7',
    name: 'Wireless Gaming Mouse',
    description: 'High-precision gaming mouse with customizable RGB lighting and 25K DPI sensor.',
    price: 79.99,
    originalPrice: 99.99,
    category: 'Electronics',
    brand: 'Logitech',
    rating: 4.6,
    reviews: 1123,
    images: [
      'https://images.pexels.com/photos/7915257/pexels-photo-7915257.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/7915257/pexels-photo-7915257.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['25K DPI Sensor', 'RGB Lighting', 'Programmable Buttons', 'Wireless', 'Gaming Grade'],
    inStock: true,
    onSale: true
  },
  {
    id: '8',
    name: 'Stainless Steel Cookware Set',
    description: 'Professional-grade 10-piece cookware set with induction-compatible bases and oven-safe handles.',
    price: 199.99,
    category: 'Home & Kitchen',
    brand: 'All-Clad',
    rating: 4.8,
    reviews: 756,
    images: [
      'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2641886/pexels-photo-2641886.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Stainless Steel', 'Induction Compatible', 'Oven Safe', '10 Pieces', 'Lifetime Warranty'],
    inStock: true,
    onSale: false
  },
  {
    id: '9',
    name: 'Mountain Bike Helmet',
    description: 'Lightweight mountain bike helmet with MIPS protection and adjustable fit system.',
    price: 89.99,
    originalPrice: 119.99,
    category: 'Sports & Outdoors',
    brand: 'Bell',
    rating: 4.5,
    reviews: 423,
    images: [
      'https://images.pexels.com/photos/2158963/pexels-photo-2158963.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/2158963/pexels-photo-2158963.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['MIPS Protection', 'Lightweight', 'Adjustable Fit', 'Ventilation', 'Reflective Details'],
    inStock: true,
    onSale: true
  },
  {
    id: '10',
    name: 'Bluetooth Speaker Portable',
    description: 'Waterproof portable speaker with 360-degree sound and 20-hour battery life.',
    price: 129.99,
    category: 'Electronics',
    brand: 'JBL',
    rating: 4.7,
    reviews: 892,
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Waterproof', '360° Sound', '20h Battery', 'Bluetooth 5.0', 'Party Mode'],
    inStock: true,
    onSale: false
  },
  {
    id: '11',
    name: 'Leather Crossbody Bag',
    description: 'Handcrafted genuine leather crossbody bag with adjustable strap and multiple compartments.',
    price: 89.99,
    originalPrice: 129.99,
    category: 'Fashion',
    brand: 'Coach',
    rating: 4.6,
    reviews: 567,
    images: [
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Genuine Leather', 'Adjustable Strap', 'Multiple Compartments', 'Handcrafted', 'Classic Design'],
    inStock: true,
    onSale: true
  },
  {
    id: '12',
    name: 'Smart Home Hub',
    description: 'Central control hub for all your smart home devices with voice control and automation.',
    price: 149.99,
    category: 'Electronics',
    brand: 'Amazon',
    rating: 4.4,
    reviews: 678,
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Voice Control', 'Smart Home Integration', 'WiFi 6', 'Privacy Controls', 'Automation'],
    inStock: true,
    onSale: false
  },
  {
    id: '13',
    name: 'Organic Green Tea Set',
    description: 'Premium organic green tea collection with 50 tea bags and elegant storage tin.',
    price: 24.99,
    originalPrice: 34.99,
    category: 'Home & Kitchen',
    brand: 'TWG',
    rating: 4.3,
    reviews: 234,
    images: [
      'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Organic', '50 Tea Bags', 'Elegant Tin', 'Antioxidants', 'Caffeine Free Option'],
    inStock: true,
    onSale: true
  },
  {
    id: '14',
    name: 'Wireless Earbuds Pro',
    description: 'Active noise cancellation earbuds with spatial audio and sweat resistance.',
    price: 249.99,
    category: 'Electronics',
    brand: 'Apple',
    rating: 4.9,
    reviews: 1892,
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['Active Noise Cancellation', 'Spatial Audio', 'Sweat Resistant', 'Wireless Charging', 'Custom Fit'],
    inStock: true,
    onSale: false
  },
  {
    id: '15',
    name: 'Fitness Resistance Bands',
    description: 'Professional-grade resistance bands set with 5 different resistance levels and carrying case.',
    price: 39.99,
    originalPrice: 59.99,
    category: 'Sports & Outdoors',
    brand: 'TheraBand',
    rating: 4.5,
    reviews: 445,
    images: [
      'https://images.pexels.com/photos/4056530/pexels-photo-4056530.jpeg?auto=compress&cs=tinysrgb&w=800',
      'https://images.pexels.com/photos/4056530/pexels-photo-4056530.jpeg?auto=compress&cs=tinysrgb&w=800'
    ],
    features: ['5 Resistance Levels', 'Professional Grade', 'Carrying Case', 'Latex Free', 'Exercise Guide'],
    inStock: true,
    onSale: true
  }
];