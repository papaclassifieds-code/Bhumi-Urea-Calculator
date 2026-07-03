export interface Crop {
  id: string;
  name: string;
  nitrogenPerHectare: number; // kg per hectare
}

export const CROPS: Crop[] = [
  { id: 'wheat', name: 'Wheat', nitrogenPerHectare: 120 },
  { id: 'rice', name: 'Rice', nitrogenPerHectare: 120 },
  { id: 'cotton', name: 'Cotton', nitrogenPerHectare: 150 },
  { id: 'soybean', name: 'Soybean', nitrogenPerHectare: 30 },
  { id: 'maize', name: 'Maize', nitrogenPerHectare: 150 },
  { id: 'sugarcane', name: 'Sugarcane', nitrogenPerHectare: 250 },
  { id: 'banana', name: 'Banana', nitrogenPerHectare: 200 },
  { id: 'tomato', name: 'Tomato', nitrogenPerHectare: 150 },
  { id: 'chilli', name: 'Chilli', nitrogenPerHectare: 150 },
  { id: 'onion', name: 'Onion', nitrogenPerHectare: 120 },
  { id: 'potato', name: 'Potato', nitrogenPerHectare: 180 },
];

export interface SavedCalculation {
  id: string;
  name: string;
  date: string;
  cropName: string;
  area: number;
  unit: 'Acre' | 'Hectare';
  nitrogenRequired: number;
  ureaRequired: number;
  bags: number;
  bagSize: number;
  remainingKg: number;
  totalCost: number | null;
}

export const UREA_GUIDE = [
  {
    title: 'What is Urea?',
    content: 'Urea is the most important nitrogenous fertilizer in the market, with the highest nitrogen content (about 46%). It is a white crystalline organic chemical compound.',
    icon: 'Info'
  },
  {
    title: 'Nitrogen Percentage',
    content: 'Urea contains 46% Nitrogen (N), meaning every 100 kg of Urea provides 46 kg of pure Nitrogen to the crops.',
    icon: 'Percent'
  },
  {
    title: 'Benefits',
    content: 'Promotes vigorous vegetative growth, darker green leaves, and increases the protein content in plants. It is highly soluble in water and easily absorbed.',
    icon: 'TrendingUp'
  },
  {
    title: 'General Uses',
    content: 'Used as a basal dressing (at planting) and top dressing (during growth) for almost all crops including cereals, cotton, sugarcane, and orchards.',
    icon: 'Sprout'
  },
  {
    title: 'Application Tips',
    content: 'Apply in split doses rather than all at once. Incorporate into the soil immediately after application to minimize ammonia volatilization losses. Do not apply when leaves are wet.',
    icon: 'Droplets'
  },
  {
    title: 'Storage Guidelines',
    content: 'Store in a cool, dry place away from direct sunlight and moisture. Urea is highly hygroscopic (absorbs moisture) and can cake if exposed to humidity.',
    icon: 'Package'
  },
  {
    title: 'Safety Precautions',
    content: 'Keep away from children and animals. Wash hands after use. Avoid breathing dust and contact with eyes.',
    icon: 'ShieldAlert'
  }
];
