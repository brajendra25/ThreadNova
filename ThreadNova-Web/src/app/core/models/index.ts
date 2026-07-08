export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  brand: string;
  image: string;
  images: string[];
  rating: number;
  reviews: number;
  stock: number;
  isFeatured: boolean;
  variants?: ProductVariant[];
}

export interface ProductVariant {
  id: string;
  name: string;
  color?: string;
  size?: string;
  price: number;
  stock: number;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  icon: string;
  productCount: number;
}

export interface CartItem {
  id: string;
  productId: string;
  product: Product;
  quantity: number;
  variantId?: string;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  items: OrderItem[];
  totalAmount: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  orderDate: Date;
  deliveryDate?: Date;
  shippingAddress: Address;
  paymentMethod: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  image: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  profileImage?: string;
  addresses: Address[];
  createdAt: Date;
}

export interface Address {
  id: string;
  fullName: string;
  phoneNumber: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
  isDefault: boolean;
  type: 'home' | 'work' | 'other';
}

export interface Review {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  rating: number;
  title: string;
  content: string;
  date: Date;
  helpfulCount: number;
}

export interface Coupon {
  id: string;
  code: string;
  discountPercentage?: number;
  discountAmount?: number;
  maxDiscount?: number;
  minOrderAmount: number;
  validFrom: Date;
  validTo: Date;
  usageLimit: number;
  isActive: boolean;
}

export interface Wishlist {
  id: string;
  productId: string;
  product: Product;
  addedDate: Date;
}
