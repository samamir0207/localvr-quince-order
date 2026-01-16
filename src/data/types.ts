export interface QuinceItem {
  id: string;
  name: string;
  gender: 'mens' | 'womens' | 'unisex';
}

export interface EmployeeOrder {
  id: string;
  fullName: string;
  workLocation: string;
  identifiedGender: 'Male' | 'Female' | 'Other';
  tshirtSize: string;
  items: Record<string, number>; // itemId -> quantity
  createdAt: string;
  updatedAt: string;
}

export const QUINCE_ITEMS: QuinceItem[] = [
  { id: 'puffer-mens', name: 'Lightweight Down Packable Puffer Jacket (Mens)', gender: 'mens' },
  { id: 'puffer-womens', name: 'Lightweight Down Packable Puffer Jacket (Women)', gender: 'womens' },
  { id: 'dress-shirt-mens', name: 'Organic Cotton Stretch Poplin Dress Shirt (Mens)', gender: 'mens' },
  { id: 'hoodie-mens', name: 'Supersoft Fleece Pullover Hoodie (Mens)', gender: 'mens' },
  { id: 'hoodie-womens', name: 'SuperSoft Fleece Zip Up Hoodie (Womens)', gender: 'womens' },
  { id: 'cashmere-qzip-womens', name: 'Mongolian Cashmere Fisherman Quarter Zip Sweater (Womens)', gender: 'womens' },
  { id: 'cashmere-crew-mens', name: 'Mongolian Cashmere Crewneck Sweater (Mens)', gender: 'mens' },
  { id: 'merino-halfzip-mens', name: 'Australian Merino Wool Half Zip Sweater (Mens)', gender: 'mens' },
  { id: 'polo-mens', name: 'Flowknit Breeze Performance Polo (Mens)', gender: 'mens' },
  { id: 'beanie-womens', name: 'Mongolian Cashmere Ribbed Beanie (Womens)', gender: 'womens' },
  { id: 'longsleeve-womens', name: 'Stretch Cotton Jersey Fitted Long Sleeve T-Shirt (Womens)', gender: 'womens' },
  { id: 'tshirt-womens', name: 'Stretch Cotton Jersey Fitted T-Shirt (Womens)', gender: 'womens' },
];

export const SIZES = ['XS', 'S', 'M', 'L', 'XL', '2XL', '3XL'];

export const LOCATIONS = [
  '30a',
  'Breckenridge Office',
  'Lake Tahoe Office',
  'Park City Office',
  'Remote',
  'Telluride',
  'Vail',
  'HQ',
];
