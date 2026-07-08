import { Injectable, signal } from '@angular/core';
import { Product, Category } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = signal<Product[]>(this.getMockProducts());
  public products$ = this.products.asReadonly();

  private categories = signal<Category[]>(this.getMockCategories());
  public categories$ = this.categories.asReadonly();

  constructor() {}

  getProducts(category?: string): Product[] {
    const products = this.products();
    if (category) {
      return products.filter(p => p.category.toLowerCase() === category.toLowerCase());
    }
    return products;
  }

  getProductById(id: string): Product | undefined {
    return this.products().find(p => p.id === id);
  }

  searchProducts(query: string): Product[] {
    const q = query.toLowerCase();
    return this.products().filter(p => 
      p.name.toLowerCase().includes(q) || 
      p.description.toLowerCase().includes(q)
    );
  }

  getCategories(): Category[] {
    return this.categories();
  }

  getCategoryById(id: string): Category | undefined {
    return this.categories().find(c => c.id === id);
  }

  private getMockProducts(): Product[] {
    return [
      {
        id: '1',
        name: 'Premium Cotton T-Shirt',
        description: 'Comfortable and durable premium cotton t-shirt perfect for everyday wear',
        price: 2499,
        discountPrice: 1999,
        category: 'T-Shirts',
        brand: 'ThreadNova',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=500&fit=crop'
        ],
        rating: 4.5,
        reviews: 128,
        stock: 50,
        isFeatured: true,
        variants: [
          { id: 'v1', name: 'Small', color: 'Black', size: 'S', price: 1999, stock: 10 },
          { id: 'v2', name: 'Medium', color: 'Black', size: 'M', price: 1999, stock: 20 },
          { id: 'v3', name: 'Large', color: 'Black', size: 'L', price: 1999, stock: 15 },
          { id: 'v4', name: 'White - Small', color: 'White', size: 'S', price: 1999, stock: 5 }
        ]
      },
      {
        id: '2',
        name: 'Classic Blue Denim Jeans',
        description: 'Stylish and comfortable denim jeans with perfect fit',
        price: 3999,
        discountPrice: 2999,
        category: 'Jeans',
        brand: 'ThreadNova',
        image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1541099649105-f69ad21d3407?w=500&h=500&fit=crop'
        ],
        rating: 4.3,
        reviews: 95,
        stock: 30,
        isFeatured: true,
        variants: [
          { id: 'v5', name: '28', color: 'Blue', size: '28', price: 2999, stock: 10 },
          { id: 'v6', name: '30', color: 'Blue', size: '30', price: 2999, stock: 15 },
          { id: 'v7', name: '32', color: 'Blue', size: '32', price: 2999, stock: 5 }
        ]
      },
      {
        id: '3',
        name: 'Casual Hoodie',
        description: 'Warm and cozy hoodie for casual wear',
        price: 2999,
        discountPrice: 2299,
        category: 'Hoodies',
        brand: 'ThreadNova',
        image: 'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=500&h=500&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop'
        ],
        rating: 4.7,
        reviews: 156,
        stock: 40,
        isFeatured: true
      },
      {
        id: '4',
        name: 'Leather Jacket',
        description: 'Premium leather jacket for a bold look',
        price: 8999,
        discountPrice: 7499,
        category: 'Jackets',
        brand: 'ThreadNova',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1520975867468-b20b95a4e512?w=500&h=500&fit=crop'
        ],
        rating: 4.6,
        reviews: 87,
        stock: 15,
        isFeatured: true
      },
      {
        id: '5',
        name: 'Running Shoes',
        description: 'Comfortable running shoes with excellent support',
        price: 5999,
        discountPrice: 4499,
        category: 'Shoes',
        brand: 'SportPro',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=500&fit=crop'
        ],
        rating: 4.8,
        reviews: 203,
        stock: 25,
        isFeatured: true
      },
      {
        id: '6',
        name: 'Elegant Formal Shirt',
        description: 'Formal shirt perfect for office and special occasions',
        price: 2999,
        discountPrice: 1999,
        category: 'Shirts',
        brand: 'ThreadNova',
        image: 'https://images.unsplash.com/photo-1596787620424-bf87c1995f4c?w=500&h=500&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1596787620424-bf87c1995f4c?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1596797038212-76ea9decf3a8?w=500&h=500&fit=crop'
        ],
        rating: 4.4,
        reviews: 67,
        stock: 35,
        isFeatured: false
      },
      {
        id: '7',
        name: 'Smartwatch Pro',
        description: 'Advanced smartwatch with health tracking features',
        price: 12999,
        discountPrice: 9999,
        category: 'Watches',
        brand: 'TechBrand',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1625971741208-1edfb3cb884c?w=500&h=500&fit=crop'
        ],
        rating: 4.6,
        reviews: 142,
        stock: 20,
        isFeatured: false
      },
      {
        id: '8',
        name: 'Premium Backpack',
        description: 'Spacious backpack with multiple compartments',
        price: 3499,
        discountPrice: 2799,
        category: 'Bags',
        brand: 'BagCo',
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop',
          'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&h=500&fit=crop'
        ],
        rating: 4.5,
        reviews: 98,
        stock: 40,
        isFeatured: false
      }
    ];
  }

  private getMockCategories(): Category[] {
    return [
      {
        id: 'cat1',
        name: 'T-Shirts',
        description: 'Comfortable and stylish t-shirts',
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=300&h=300&fit=crop',
        icon: 'shopping_bag',
        productCount: 125
      },
      {
        id: 'cat2',
        name: 'Jeans',
        description: 'Classic and trendy denim collection',
        image: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=300&h=300&fit=crop',
        icon: 'shopping_bag',
        productCount: 87
      },
      {
        id: 'cat3',
        name: 'Hoodies',
        description: 'Cozy hoodies for all seasons',
        image: 'https://images.unsplash.com/photo-1556821552-7f41c5d440db?w=300&h=300&fit=crop',
        icon: 'shopping_bag',
        productCount: 64
      },
      {
        id: 'cat4',
        name: 'Jackets',
        description: 'Stylish jackets for every occasion',
        image: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=300&h=300&fit=crop',
        icon: 'shopping_bag',
        productCount: 52
      },
      {
        id: 'cat5',
        name: 'Shoes',
        description: 'Premium footwear collection',
        image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&h=300&fit=crop',
        icon: 'shopping_bag',
        productCount: 156
      },
      {
        id: 'cat6',
        name: 'Watches',
        description: 'Elegant watches and smartwatches',
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop',
        icon: 'schedule',
        productCount: 43
      }
    ];
  }
}
