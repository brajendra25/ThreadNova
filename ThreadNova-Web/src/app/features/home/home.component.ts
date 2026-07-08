import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCarouselModule } from '@angular/material/carousel';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatCarouselModule,
    ProductCardComponent
  ],
  template: `
    <!-- Hero Banner -->
    <section class="hero">
      <div class="hero-content">
        <h1 class="hero-title">Welcome to ThreadNova</h1>
        <p class="hero-subtitle">Discover Premium Fashion & Lifestyle Products</p>
        <button mat-raised-button color="accent" [routerLink]="['/products']" class="cta-button">
          Shop Now
        </button>
      </div>
    </section>

    <!-- Categories Section -->
    <section class="categories-section">
      <div class="container">
        <h2 class="section-title">Shop by Category</h2>
        <div class="categories-grid">
          <div *ngFor="let category of categories()" class="category-card" [routerLink]="['/products']" [queryParams]="{category: category.name}">
            <img [src]="category.image" [alt]="category.name" class="category-image">
            <div class="category-overlay">
              <h3>{{ category.name }}</h3>
              <p>{{ category.productCount }} Products</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Products Section -->
    <section class="featured-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Featured Products</h2>
          <a [routerLink]="['/products']" class="view-all">View All →</a>
        </div>
        <div class="products-grid">
          <app-product-card *ngFor="let product of featuredProducts()" [product]="product"></app-product-card>
        </div>
      </div>
    </section>

    <!-- Best Sellers Section -->
    <section class="bestsellers-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Best Sellers</h2>
          <a [routerLink]="['/products']" class="view-all">View All →</a>
        </div>
        <div class="products-grid">
          <app-product-card *ngFor="let product of bestSellers()" [product]="product"></app-product-card>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section">
      <div class="container">
        <h2 class="section-title">What Our Customers Say</h2>
        <div class="testimonials-grid">
          <div class="testimonial-card" *ngFor="let testimonial of testimonials">
            <div class="stars">
              <mat-icon *ngFor="let i of [1,2,3,4,5]" class="star">star</mat-icon>
            </div>
            <p class="testimonial-text">{{ testimonial.text }}</p>
            <p class="testimonial-author">- {{ testimonial.author }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter-section">
      <div class="container">
        <h2>Subscribe to Our Newsletter</h2>
        <p>Get exclusive offers and updates delivered to your inbox</p>
        <div class="newsletter-form">
          <input type="email" placeholder="Enter your email" class="newsletter-input">
          <button mat-raised-button color="accent">Subscribe</button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .hero {
      background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
      color: white;
      padding: 120px 20px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }

    .hero::before {
      content: '';
      position: absolute;
      width: 200%;
      height: 200%;
      background: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
      background-size: 50px 50px;
      animation: drift 20s linear infinite;
    }

    @keyframes drift {
      0% { transform: translate(0, 0); }
      100% { transform: translate(50px, 50px); }
    }

    .hero-content {
      position: relative;
      z-index: 1;
      max-width: 600px;
      margin: 0 auto;
    }

    .hero-title {
      font-size: 48px;
      font-weight: 700;
      margin-bottom: 16px;
    }

    .hero-subtitle {
      font-size: 20px;
      margin-bottom: 32px;
      opacity: 0.9;
    }

    .cta-button {
      padding: 12px 48px;
      font-size: 16px;
      border-radius: 4px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 16px;
    }

    .categories-section,
    .featured-section,
    .bestsellers-section,
    .testimonials-section {
      padding: 80px 20px;
    }

    .featured-section {
      background-color: #f5f5f5;
    }

    .section-title {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 40px;
      text-align: center;
    }

    .section-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 40px;
    }

    .view-all {
      color: #1976d2;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;

      &:hover {
        color: #1565c0;
      }
    }

    .categories-grid,
    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 24px;
    }

    .category-card {
      position: relative;
      height: 300px;
      border-radius: 8px;
      overflow: hidden;
      cursor: pointer;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .category-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    }

    .category-image {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .category-card:hover .category-image {
      transform: scale(1.05);
    }

    .category-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: white;
      text-align: center;
    }

    .category-overlay h3 {
      font-size: 24px;
      font-weight: 600;
      margin-bottom: 8px;
    }

    .category-overlay p {
      font-size: 14px;
      opacity: 0.9;
    }

    .testimonials-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 24px;
    }

    .testimonial-card {
      background: white;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .stars {
      display: flex;
      gap: 4px;
      margin-bottom: 16px;
    }

    .star {
      color: #ffc107;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .testimonial-text {
      font-size: 16px;
      color: #666;
      margin-bottom: 16px;
      line-height: 1.6;
    }

    .testimonial-author {
      font-weight: 600;
      color: #212121;
    }

    .newsletter-section {
      background: linear-gradient(135deg, #1976d2 0%, #1565c0 100%);
      color: white;
      padding: 80px 20px;
      text-align: center;
    }

    .newsletter-section h2 {
      font-size: 32px;
      margin-bottom: 16px;
    }

    .newsletter-section p {
      font-size: 16px;
      margin-bottom: 32px;
      opacity: 0.9;
    }

    .newsletter-form {
      display: flex;
      max-width: 500px;
      margin: 0 auto;
      gap: 12px;
    }

    .newsletter-input {
      flex: 1;
      padding: 12px 16px;
      border: none;
      border-radius: 4px;
      font-size: 14px;
    }

    @media (max-width: 768px) {
      .hero-title {
        font-size: 32px;
      }

      .hero-subtitle {
        font-size: 16px;
      }

      .section-title {
        font-size: 24px;
      }

      .section-header {
        flex-direction: column;
        align-items: flex-start;
      }

      .categories-grid,
      .products-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      }

      .newsletter-form {
        flex-direction: column;
      }
    }
  `]
})
export class HomeComponent implements OnInit {
  categories: any;
  featuredProducts: any;
  bestSellers: any;
  testimonials = [
    {
      text: 'ThreadNova has the best collection of fashion items. The quality is amazing and delivery is super fast!',
      author: 'Sarah Johnson'
    },
    {
      text: 'I love shopping on ThreadNova. Great prices, excellent customer service, and authentic products.',
      author: 'Michael Chen'
    },
    {
      text: 'Best online shopping experience ever! The website is user-friendly and the products are exactly as described.',
      author: 'Emma Wilson'
    }
  ];

  constructor(private productService: ProductService) {
    this.categories = this.productService.categories$;
    this.featuredProducts = () => this.productService.getProducts().filter(p => p.isFeatured).slice(0, 4);
    this.bestSellers = () => this.productService.getProducts().slice(4, 8);
  }

  ngOnInit(): void {}
}
