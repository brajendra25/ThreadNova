import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { CartService } from '../../core/services/cart.service';
import { CartItem } from '../../core/models';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ],
  template: `
    <div class="cart-container">
      <h1 class="page-title">Shopping Cart</h1>

      <div *ngIf="cartService.cartItems$().length > 0" class="cart-wrapper">
        <!-- Cart Items -->
        <div class="cart-items">
          <div *ngFor="let item of cartService.cartItems$()" class="cart-item">
            <div class="item-image">
              <img [src]="item.product.image" [alt]="item.product.name">
            </div>
            <div class="item-details">
              <a [routerLink]="['/products', item.productId]" class="item-name">{{ item.product.name }}</a>
              <p class="item-brand">{{ item.product.brand }}</p>
              <p class="item-price">₹{{ item.price }}</p>
            </div>
            <div class="item-quantity">
              <label>Qty:</label>
              <div class="quantity-selector">
                <button mat-icon-button (click)="decreaseQuantity(item.id)" [disabled]="item.quantity <= 1">
                  <mat-icon>remove</mat-icon>
                </button>
                <input type="number" [(ngModel)]="item.quantity" (ngModelChange)="updateQuantity(item.id, item.quantity)" min="1" class="quantity-input">
                <button mat-icon-button (click)="increaseQuantity(item.id)">
                  <mat-icon>add</mat-icon>
                </button>
              </div>
            </div>
            <div class="item-total">
              <p class="total-price">₹{{ item.price * item.quantity }}</p>
            </div>
            <div class="item-actions">
              <button mat-icon-button (click)="removeFromCart(item.id)" matTooltip="Remove">
                <mat-icon>close</mat-icon>
              </button>
            </div>
          </div>
        </div>

        <!-- Cart Summary -->
        <aside class="cart-summary">
          <h2>Order Summary</h2>
          <div class="summary-row">
            <span>Subtotal:</span>
            <span>₹{{ cartService.getCartTotal() }}</span>
          </div>
          <div class="summary-row">
            <span>Shipping:</span>
            <span class="free">Free</span>
          </div>
          <div class="summary-row">
            <span>Tax:</span>
            <span>₹{{ (cartService.getCartTotal() * 0.18).toFixed(2) }}</span>
          </div>
          <div class="summary-divider"></div>
          <div class="summary-total">
            <span>Total:</span>
            <span>₹{{ (cartService.getCartTotal() * 1.18).toFixed(2) }}</span>
          </div>
          <button mat-raised-button color="primary" class="checkout-btn" [routerLink]="['/checkout']">
            Proceed to Checkout
          </button>
          <button mat-button class="continue-shopping" [routerLink]="['/products']">
            Continue Shopping
          </button>
        </aside>
      </div>

      <!-- Empty Cart -->
      <div *ngIf="cartService.cartItems$().length === 0" class="empty-cart">
        <mat-icon class="empty-icon">shopping_cart</mat-icon>
        <h2>Your Cart is Empty</h2>
        <p>Add some items to get started!</p>
        <button mat-raised-button color="primary" [routerLink]="['/products']">
          Continue Shopping
        </button>
      </div>
    </div>
  `,
  styles: [`
    .cart-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 24px 16px;
    }

    .page-title {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 32px;
    }

    .cart-wrapper {
      display: grid;
      grid-template-columns: 1fr 350px;
      gap: 32px;
    }

    .cart-items {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }

    .cart-item {
      display: grid;
      grid-template-columns: 120px 1fr 120px 100px 80px 40px;
      align-items: center;
      gap: 16px;
      padding: 16px;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }
    }

    .item-image {
      width: 120px;
      height: 120px;
      border-radius: 4px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    }

    .item-details {
      display: flex;
      flex-direction: column;
      gap: 4px;
    }

    .item-name {
      font-weight: 600;
      color: #212121;
      text-decoration: none;
      cursor: pointer;

      &:hover {
        color: #1976d2;
      }
    }

    .item-brand {
      font-size: 12px;
      color: #999;
      text-transform: uppercase;
      margin: 0;
    }

    .item-price {
      font-size: 14px;
      color: #666;
      margin: 0;
    }

    .item-quantity {
      display: flex;
      flex-direction: column;
      gap: 8px;

      label {
        font-size: 12px;
        font-weight: 500;
      }
    }

    .quantity-selector {
      display: flex;
      align-items: center;
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;

      button {
        width: 32px;
        height: 32px;
      }
    }

    .quantity-input {
      width: 40px;
      text-align: center;
      border: none;
      border-right: 1px solid #ddd;
      border-left: 1px solid #ddd;
      padding: 4px;
      font-size: 14px;
    }

    .item-total {
      text-align: right;
    }

    .total-price {
      font-weight: 600;
      font-size: 16px;
      color: #1976d2;
      margin: 0;
    }

    .item-actions {
      text-align: center;
    }

    .cart-summary {
      background: white;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      height: fit-content;
      position: sticky;
      top: 100px;
    }

    .cart-summary h2 {
      font-size: 20px;
      margin-bottom: 20px;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 12px;
      font-size: 14px;
    }

    .free {
      color: #4caf50;
      font-weight: 600;
    }

    .summary-divider {
      height: 1px;
      background: #eee;
      margin: 16px 0;
    }

    .summary-total {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 700;
      margin-bottom: 20px;
    }

    .checkout-btn {
      width: 100%;
      padding: 12px;
      font-size: 16px;
      margin-bottom: 12px;
    }

    .continue-shopping {
      width: 100%;
    }

    .empty-cart {
      text-align: center;
      padding: 80px 20px;
    }

    .empty-icon {
      font-size: 80px;
      width: 80px;
      height: 80px;
      color: #ddd;
      margin: 0 auto 24px;
    }

    .empty-cart h2 {
      font-size: 24px;
      margin-bottom: 8px;
    }

    .empty-cart p {
      font-size: 16px;
      color: #999;
      margin-bottom: 24px;
    }

    @media (max-width: 768px) {
      .cart-wrapper {
        grid-template-columns: 1fr;
      }

      .cart-item {
        grid-template-columns: 100px 1fr 40px;
        gap: 12px;
      }

      .item-quantity,
      .item-total {
        display: none;
      }

      .cart-summary {
        position: static;
      }
    }
  `]
})
export class CartComponent {
  constructor(public cartService: CartService) {}

  removeFromCart(itemId: string): void {
    this.cartService.removeFromCart(itemId);
  }

  increaseQuantity(itemId: string): void {
    const item = this.cartService.cartItems$().find(i => i.id === itemId);
    if (item) {
      this.cartService.updateQuantity(itemId, item.quantity + 1);
    }
  }

  decreaseQuantity(itemId: string): void {
    const item = this.cartService.cartItems$().find(i => i.id === itemId);
    if (item && item.quantity > 1) {
      this.cartService.updateQuantity(itemId, item.quantity - 1);
    }
  }

  updateQuantity(itemId: string, quantity: number): void {
    this.cartService.updateQuantity(itemId, quantity);
  }
}
