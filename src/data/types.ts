export interface QuinceItem {
  id: string;
  name: string;
  gender: 'mens' | 'womens' | 'unisex';
  url: string;
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
  { id: 'puffer-mens', name: 'Lightweight Down Packable Puffer Jacket (Mens)', gender: 'mens', url: 'https://www.quince.com/men/men-s-lightweight-down-puffer-jacket?color=black' },
  { id: 'puffer-womens', name: 'Lightweight Down Packable Puffer Jacket (Women)', gender: 'womens', url: 'https://www.quince.com/women/lightweight-down-packable-puffer-jacket?color=loden' },
  { id: 'dress-shirt-mens', name: 'Organic Cotton Stretch Poplin Dress Shirt (Mens)', gender: 'mens', url: 'https://www.quince.com/men/organic-cotton-stretch-poplin-dress-shirt?color=overcast-grey' },
  { id: 'hoodie-mens', name: 'Supersoft Fleece Pullover Hoodie (Mens)', gender: 'mens', url: 'https://www.quince.com/men/men\'s-supersoft-fleece-pullover-hoodie?color=black' },
  { id: 'hoodie-womens', name: 'SuperSoft Fleece Zip Up Hoodie (Womens)', gender: 'womens', url: 'https://www.quince.com/women/sweatshirts/super-soft-fleece-zip-up-hoodie?color=off-white' },
  { id: 'cashmere-qzip-womens', name: 'Mongolian Cashmere Fisherman Quarter Zip Sweater (Womens)', gender: 'womens', url: 'https://www.quince.com/women/mongolian-cashmere-fisherman-quarter-zip-sweater?color=heather-cloud-beige' },
  { id: 'cashmere-crew-mens', name: 'Mongolian Cashmere Crewneck Sweater (Mens)', gender: 'mens', url: 'https://www.quince.com/men/cashmere/cashmere-crewneck-sweater?color=charcoal' },
  { id: 'merino-halfzip-mens', name: 'Australian Merino Wool Half Zip Sweater (Mens)', gender: 'mens', url: 'https://www.quince.com/men/australian-merino-wool-half-zip-sweater?color=malted-toffee' },
  { id: 'polo-mens', name: 'Flowknit Breeze Performance Polo (Mens)', gender: 'mens', url: 'https://www.quince.com/men/recycled-flowknit-performance-polo?color=heather-black' },
  { id: 'beanie-womens', name: 'Mongolian Cashmere Ribbed Beanie (Womens)', gender: 'womens', url: 'https://www.quince.com/unisex/cashmere/beanie?color=ivory' },
  { id: 'longsleeve-womens', name: 'Stretch Cotton Jersey Fitted Long Sleeve T-Shirt (Womens)', gender: 'womens', url: 'https://www.quince.com/women/stretch-cotton-jersey-fitted-long-sleeve-t-shirt?color=cocoa' },
  { id: 'tshirt-womens', name: 'Stretch Cotton Jersey Fitted T-Shirt (Womens)', gender: 'womens', url: 'https://www.quince.com/women/stretch-cotton-jersey-fitted-t-shirt?color=cocoa' },
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
