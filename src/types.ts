export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: string;
  price: string;
  color: string;
  image: string;
  specs: {
    speed?: string;
    power?: string;
    range?: string;
    acceleration?: string;
    weight?: string;
    efficiency?: string;
  };
  colors: { name: string; hex: string }[];
  description: string;
  longDescription: string;
  features: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  image: string;
  content: string;
  rating: number;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  meta: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  icon: string;
}
