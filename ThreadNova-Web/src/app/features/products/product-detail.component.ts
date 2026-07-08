import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatRatingModule } from '@angular/material/rating';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../core/services/product.service';
import { CartService } from '../../core/services/cart.service';
import { Product } from '../../core/models';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatRatingModule,
    MatFormFieldModule,
    MatSelectModule,
    FormsModule
  ],
  template: `
    <div class="product-detail-container" *ngIf="product">
      <a [routerLink]="['/products']" class="back-link">
        <mat-icon>arrow_back</mat-icon>
        Back to Products
      </a>

      <div class="product-detail-grid">
        <!-- Product Images -->
        <div class="product-images-section">
          <div class="main-image">
            <img [src]="selectedImage" [alt]="product.name" class="main-image-img">
            <div *ngIf="product.discountPrice" class="discount-badge">{{ discountPercentage }}% OFF</div>
          </div>
          <div class="thumbnail-images">
            <img *ngFor="let img of product.images" 
                 [src]="img" 
                 [alt]="product.name"
                 (click)="selectedImage = img"
                 class="thumbnail"
                 [class.active]="selectedImage === img">
          </div>
        </div>

        <!-- Product Details -->
        <div class="product-details-section">
          <h1 class="product-name">{{ product.name }}</h1>
          <p class="product-brand">{{ product.brand }}</p>

          <div class="rating-section">
            <div class="stars">
              <mat-icon class="star">star</mat-icon>
              <span class="rating">{{ product.rating }}</span>
            </div>
            <span class="reviews">({{ product.reviews }} reviews)</span>
          </div>

          <div class="price-section">
            <span *ngIf="product.discountPrice" class="original-price">₹{{ product.price }}</span>
            <span class="current-price">₹{{ product.discountPrice || product.price }}</span>
          </div>

          <p class="product-description">{{ product.description }}</p>

          <!-- Variants Selection -->
          <div *ngIf="product.variants" class="variants-section">
            <h3>Select Variant</h3>
            <mat-form-field appearance="outline" class="variant-select">
              <mat-label>Size/Color</mat-label>
              <mat-select [(ngModel)]="selectedVariant">
                <mat-option *ngFor="let variant of product.variants" [value]="variant">
                  {{ variant.name }} - ₹{{ variant.price }}
                </mat-option>
              </mat-select>
            </mat-form-field>
          </div>

          <!-- Quantity Selection -->
          <div class="quantity-section">
            <label>Quantity:</label>
            <div class="quantity-selector">
              <button mat-icon-button (click)="decreaseQuantity()" [disabled]="quantity <= 1">
                <mat-icon>remove</mat-icon>
              </button>
              <input type="number" [(ngModel)]="quantity" min="1" [max]="product.stock" class="quantity-input">
              <button mat-icon-button (click)="increaseQuantity()" [disabled]="quantity >= product.stock">
                <mat-icon>add</mat-icon>
              </button>
            </div>
          </div>

          <!-- Stock Status -->
          <div class="stock-status">
            <span *ngIf="product.stock > 0" class="in-stock">
              <mat-icon>check_circle</mat-icon>
              In Stock ({{ product.stock }} available)
            </span>
            <span *ngIf="product.stock === 0" class="out-of-stock">
              <mat-icon>cancel</mat-icon>
              Out of Stock
            </span>
          </div>

          <!-- Action Buttons -->
          <div class="action-buttons">
            <button mat-raised-button color="primary" class="add-to-cart-btn" 
                    (click)="addToCart()" [disabled]="product.stock === 0">
              <mat-icon>shopping_cart</mat-icon>
              Add to Cart
            </button>
            <button mat-icon-button class="wishlist-btn">
              <mat-icon>favorite_border</mat-icon>
            </button>
          </div>

          <!-- Product Info -->
          <div class="product-info-grid">
            <div class="info-item">
              <mat-icon>local_shipping</mat-icon>
              <div>
                <h4>Free Shipping</h4>
                <p>On orders above ₹1000</p>
              </div>
            </div>
            <div class="info-item">
              <mat-icon>assignment_return</mat-icon>
              <div>
                <h4>Easy Returns</h4>
                <p>Within 15 days</p>
              </div>
            </div>
            <div class="info-item">
              <mat-icon>verified_user</mat-icon>
              <div>
                <h4>Secure Payment</h4>
                <p>100% safe & secure</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Tabs Section -->
      <mat-tab-group class="product-tabs">
        <mat-tab label="Description">
          <div class="tab-content">
            <h3>Product Details</h3>
            <p>{{ product.description }}</p>
            <ul>
              <li>Premium quality material</li>
              <li>Comfortable fit</li>
              <li>Durable and long-lasting</li>
              <li>Available in multiple colors and sizes</li>
            </ul>
          </div>
        </mat-tab>
        <mat-tab label="Specifications">
          <div class="tab-content">
            <h3>Specifications</h3>
            <table class="specs-table">
              <tr>
                <td>Brand</td>
                <td>{{ product.brand }}</td>
              </tr>
              <tr>
                <td>Category</td>
                <td>{{ product.category }}</td>
              </tr>
              <tr>
                <td>Stock</td>
                <td>{{ product.stock }}</td>
              </tr>
              <tr>
                <td>Rating</td>
                <td>{{ product.rating }}/5</td>
              </tr>
            </table>
          </div>
        </mat-tab>
        <mat-tab label="Reviews">
          <div class="tab-content">
            <h3>Customer Reviews</h3>
            <p>Total Reviews: {{ product.reviews }}</p>
          </div>
        </mat-tab>
      </mat-tab-group>
    </div>
  `,
  styles: [`
    .product-detail-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px 16px;
    }

    .back-link {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      color: #1976d2;
      text-decoration: none;
      margin-bottom: 24px;
      font-weight: 500;

      &:hover {
        text-decoration: underline;
      }
    }

    .product-detail-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 48px;
      margin-bottom: 48px;
    }

    .product-images-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .main-image {
      position: relative;
      background: white;
      border-radius: 8px;
      aspect-ratio: 1;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
    }

    .main-image-img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .discount-badge {
      position: absolute;
      top: 16px;
      right: 16px;
      background: #f44336;
      color: white;
      padding: 8px 12px;
      border-radius: 4px;
      font-weight: 600;
    }

    .thumbnail-images {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 12px;
    }

    .thumbnail {
      aspect-ratio: 1;
      border-radius: 4px;
      cursor: pointer;
      border: 2px solid transparent;
      object-fit: cover;
      transition: all 0.3s ease;

      &:hover {
        border-color: #1976d2;
      }

      &.active {
        border-color: #1976d2;
      }
    }

    .product-details-section {
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    .product-name {
      font-size: 32px;
      font-weight: 700;
      margin: 0;
    }

    .product-brand {
      font-size: 14px;
      color: #999;
      text-transform: uppercase;
      margin: 0;
    }

    .rating-section {
      display: flex;
      align-items: center;
      gap: 12px;
    }

    .stars {
      display: flex;
      align-items: center;
      gap: 4px;
    }

    .star {
      color: #ffc107;
      font-size: 20px;
      width: 20px;
      height: 20px;
    }

    .rating {
      font-weight: 600;
      color: #212121;
    }

    .reviews {
      font-size: 14px;
      color: #999;
    }

    .price-section {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px 0;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
    }

    .original-price {
      font-size: 16px;
      color: #999;
      text-decoration: line-through;
    }

    .current-price {
      font-size: 28px;
      font-weight: 700;
      color: #1976d2;
    }

    .product-description {
      font-size: 16px;
      line-height: 1.6;
      color: #666;
    }

    .variants-section {
      margin: 16px 0;
    }

    .variants-section h3 {
      margin-bottom: 12px;
    }

    .variant-select {
      width: 100%;
    }

    .quantity-section {
      margin: 16px 0;
    }

    .quantity-section label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
    }

    .quantity-selector {
      display: flex;
      align-items: center;
      gap: 8px;
      max-width: 200px;
    }

    .quantity-selector button {
      width: 40px;
      height: 40px;
    }

    .quantity-input {
      width: 60px;
      text-align: center;
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .stock-status {
      padding: 12px 16px;
      border-radius: 4px;
      font-weight: 500;
      display: flex;
      align-items: center;
      gap: 8px;
    }

    .in-stock {
      background: #e8f5e9;
      color: #2e7d32;
    }

    .out-of-stock {
      background: #ffebee;
      color: #c62828;
    }

    .action-buttons {
      display: flex;
      gap: 12px;
      margin: 24px 0;
    }

    .add-to-cart-btn {
      flex: 1;
      padding: 12px 24px;
      font-size: 16px;
    }

    .wishlist-btn {
      width: 48px;
      height: 48px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }

    .product-info-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      margin-top: 24px;
      padding-top: 24px;
      border-top: 1px solid #eee;
    }

    .info-item {
      display: flex;
      align-items: flex-start;
      gap: 12px;

      mat-icon {
        color: #1976d2;
        margin-top: 4px;
      }

      h4 {
        margin: 0 0 4px 0;
        font-size: 14px;
      }

      p {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }

    .product-tabs {
      margin-top: 48px;
    }

    .tab-content {
      padding: 24px;
    }

    .specs-table {
      width: 100%;
      border-collapse: collapse;

      tr {
        border-bottom: 1px solid #eee;
      }

      td {
        padding: 12px 0;

        &:first-child {
          font-weight: 600;
          width: 150px;
        }
      }
    }

    @media (max-width: 768px) {
      .product-detail-grid {
        grid-template-columns: 1fr;
        gap: 24px;
      }

      .product-name {
        font-size: 24px;
      }

      .current-price {
        font-size: 24px;
      }

      .product-info-grid {
        grid-template-columns: 1fr;
      }

      .action-buttons {
        flex-direction: column;
      }

      .wishlist-btn {
        width: 100%;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;
  selectedImage: string = '';
  selectedVariant: any = null;
  quantity = 1;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.product = this.productService.getProductById(id);
      if (this.product) {
        this.selectedImage = this.product.image;
        if (this.product.variants) {
          this.selectedVariant = this.product.variants[0];
        }
      }
    });
  }

  get discountPercentage(): number {
    if (!this.product?.discountPrice) return 0;
    return Math.round(((this.product.price - this.product.discountPrice) / this.product.price) * 100);
  }

  increaseQuantity(): void {
    if (this.product && this.quantity < this.product.stock) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  addToCart(): void {
    if (this.product) {
      this.cartService.addToCart(this.product, this.quantity, this.selectedVariant?.id);
    }
  }
}
