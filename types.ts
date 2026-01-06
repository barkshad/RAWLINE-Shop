
import { ReactNode } from 'react';

export interface ProductData {
  id?: string;
  name: string;
  price: string;
  description: string;
  imageIds: string[];
  createdAt?: number;
}

export interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

export enum AppRoute {
  Home = '/',
  Shop = '/shop',
  Product = '/product/:id',
  About = '/about',
  Admin = '/admin'
}
