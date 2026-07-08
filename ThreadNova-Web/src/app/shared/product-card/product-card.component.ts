import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatRatingModule } from '@angular/material/rating';
import { RouterModule, RouterLink } from '@angular/router';
import { Product } from '../../core/models';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatRatingModule,
    RouterModule
  ],
  template: `
    <div class="product-card">
      <div class="product-image-container">
        <img [src]="product.image" [alt]="product.name" class="product-image">
        <div class="product-overlay">
          <div class="product-actions">
            <button mat-icon-button matTooltip="Add to Wishlist" (click)="addToWishlist()">
              <mat-icon>favorite_border</mat-icon>
            </button>
            <button mat-icon-button matTooltip="Quick View" (click)="quickView()">
              <mat-icon>visibility</mat-icon>
            </button>
          </div>
        </div>
        <div *ngIf="product.discountPrice" class="discount-badge">
          {{ discountPercentage }}% OFF
        </div>
        <div *ngIf="product.isFeatured" class="featured-badge">
          FEATURED
        </div>
      </div>

      <div class="product-info">
        <h3 class="product-name" [routerLink]="['/products', product.id]">{{ product.name }}</h3>
        <p class="product-brand">{{ product.brand }}</p>

        <div class="product-rating">
          <mat-icon class="star">star</mat-icon>
          <span class="rating-value">{{ product.rating }}</span>
          <span class="review-count">({{ product.reviews }} reviews)</span>
        </div>

        <div class="product-price">
          <span *ngIf="product.discountPrice" class="original-price">₹{{ product.price }}</span>
          <span class="current-price">₹{{ product.discountPrice || product.price }}</span>
        </div>

        <p class="product-description">{{ product.description | slice:0:60 }}...</p>

        <div class="product-stock">
          <span *ngIf="product.stock > 0" class="in-stock">In Stock</span>
          <span *ngIf="product.stock === 0" class="out-of-stock">Out of Stock</span>
        </div>

        <button mat-raised-button color="primary" class="add-to-cart-btn" 
                (click)="addToCart()" [disabled]="product.stock === 0">
          <mat-icon>shopping_cart</mat-icon>
          Add to Cart
        </button>
      </div>
    </div>
  `,
  styles: [`
    .product-card {
      background: white;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      cursor: pointer;

      &:hover {
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        transform: translateY(-4px);
      }
    }

    .product-image-container {
      position: relative;
      width: 100%;
      padding-bottom: 100%;
      overflow: hidden;
      background-color: #f5f5f5;
    }

    .product-image {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    .product-card:hover .product-image {
      transform: scale(1.05);
    }

    .product-overlay {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .product-card:hover .product-overlay {
      opacity: 1;
    }

    .product-actions {
      display: flex;
      gap: 8px;
    }

    .product-actions button {
      background-color: white;
      color: #1976d2;

      &:hover {
        background-color: #1976d2;
        color: white;
      }
    }

    .discount-badge {
      position: absolute;
      top: 12px;
      right: 12px;
      background-color: #f44336;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      z-index: 2;
    }

    .featured-badge {
      position: absolute;
      top: 12px;
      left: 12px;
      background-color: #ff9800;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      z-index: 2;
    }

    .product-info {
      padding: 16px;
    }

    .product-name {
      font-size: 16px;
      font-weight: 600;
      margin: 0 0 4px 0;
      color: #212121;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        color: #1976d2;
      }
    }

    .product-brand {
      font-size: 12px;
      color: #999;
      margin: 0 0 8px 0;
      text-transform: uppercase;
    }

    .product-rating {
      display: flex;
      align-items: center;
      gap: 4px;
      font-size: 12px;
      margin-bottom: 8px;
    }

    .star {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: #ffc107;
    }

    .rating-value {
      font-weight: 600;
      color: #212121;
    }

    .review-count {
      color: #999;
    }

    .product-price {
      margin-bottom: 12px;
    }

    .original-price {
      font-size: 14px;
      color: #999;
      text-decoration: line-through;
      margin-right: 8px;
    }

    .current-price {
      font-size: 18px;
      font-weight: 700;
      color: #1976d2;
    }

    .product-description {
      font-size: 12px;
      color: #666;
      margin: 8px 0;
      line-height: 1.4;
    }

    .product-stock {
      font-size: 12px;
      margin-bottom: 12px;
    }

    .in-stock {
      color: #4caf50;
      font-weight: 600;
    }

    .out-of-stock {
      color: #f44336;
      font-weight: 600;
    }

    .add-to-cart-btn {
      width: 100%;
      border-radius: 4px;
    }
  `]
})
export class ProductCardComponent {
  @Input() product!: Product;

  constructor(private cartService: CartService) {}

  get discountPercentage(): number {
    if (!this.product.discountPrice) return 0;
    return Math.round(((this.product.price - this.product.discountPrice) / this.product.price) * 100);
  }

  addToCart(): void {
    this.cartService.addToCart(this.product);
  }

  addToWishlist(): void {
    console.log('Added to wishlist:', this.product.name);
  }

  quickView(): void {
    console.log('Quick view:', this.product.name);
  }
}
