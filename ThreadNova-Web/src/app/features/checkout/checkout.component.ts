import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { AuthService } from '../../core/services/auth.service';
import { Order, Address } from '../../core/models';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    FormsModule
  ],
  template: `
    <div class="checkout-container">
      <h1 class="page-title">Checkout</h1>

      <mat-stepper #stepper>
        <!-- Step 1: Shipping Address -->
        <mat-step>
          <ng-template matStepLabel>Shipping Address</ng-template>
          <div class="step-content">
            <h3>Enter Shipping Address</h3>
            <div class="form-grid">
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Full Name</mat-label>
                <input matInput [(ngModel)]="shippingAddress.fullName" required>
              </mat-form-field>
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Phone Number</mat-label>
                <input matInput [(ngModel)]="shippingAddress.phoneNumber" required>
              </mat-form-field>
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Address Line 1</mat-label>
                <input matInput [(ngModel)]="shippingAddress.addressLine1" required>
              </mat-form-field>
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Address Line 2 (Optional)</mat-label>
                <input matInput [(ngModel)]="shippingAddress.addressLine2">
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>City</mat-label>
                <input matInput [(ngModel)]="shippingAddress.city" required>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>State</mat-label>
                <input matInput [(ngModel)]="shippingAddress.state" required>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Country</mat-label>
                <input matInput [(ngModel)]="shippingAddress.country" required>
              </mat-form-field>
              <mat-form-field appearance="outline">
                <mat-label>Postal Code</mat-label>
                <input matInput [(ngModel)]="shippingAddress.postalCode" required>
              </mat-form-field>
            </div>
            <button mat-raised-button color="primary" matStepperNext>Continue to Payment</button>
          </div>
        </mat-step>

        <!-- Step 2: Payment Method -->
        <mat-step>
          <ng-template matStepLabel>Payment Method</ng-template>
          <div class="step-content">
            <h3>Select Payment Method</h3>
            <div class="payment-options">
              <mat-radio-group [(ngModel)]="selectedPaymentMethod">
                <mat-radio-button value="cod">Cash on Delivery</mat-radio-button>
                <mat-radio-button value="card">Credit/Debit Card</mat-radio-button>
                <mat-radio-button value="upi">UPI</mat-radio-button>
              </mat-radio-group>
            </div>

            <div *ngIf="selectedPaymentMethod === 'card'" class="payment-form">
              <h4>Card Details</h4>
              <mat-form-field appearance="outline" class="full-width">
                <mat-label>Card Number</mat-label>
                <input matInput placeholder="1234 5678 9012 3456" [(ngModel)]="cardDetails.cardNumber">
              </mat-form-field>
              <div class="form-row">
                <mat-form-field appearance="outline">
                  <mat-label>Expiry</mat-label>
                  <input matInput placeholder="MM/YY" [(ngModel)]="cardDetails.expiry">
                </mat-form-field>
                <mat-form-field appearance="outline">
                  <mat-label>CVV</mat-label>
                  <input matInput placeholder="123" [(ngModel)]="cardDetails.cvv">
                </mat-form-field>
              </div>
            </div>

            <div class="button-group">
              <button mat-button matStepperPrevious>Back</button>
              <button mat-raised-button color="primary" matStepperNext>Review Order</button>
            </div>
          </div>
        </mat-step>

        <!-- Step 3: Order Review -->
        <mat-step>
          <ng-template matStepLabel>Review Order</ng-template>
          <div class="step-content">
            <h3>Order Review</h3>

            <div class="review-section">
              <h4>Shipping Address</h4>
              <p>{{ shippingAddress.fullName }}<br>
                {{ shippingAddress.addressLine1 }}
                {{ shippingAddress.addressLine2 ? ', ' + shippingAddress.addressLine2 : '' }}<br>
                {{ shippingAddress.city }}, {{ shippingAddress.state }} {{ shippingAddress.postalCode }}<br>
                {{ shippingAddress.country }}
              </p>
            </div>

            <div class="review-section">
              <h4>Payment Method</h4>
              <p>{{ paymentMethodLabel }}</p>
            </div>

            <div class="review-section">
              <h4>Order Items</h4>
              <div class="order-items-review">
                <div *ngFor="let item of cartService.cartItems$()" class="review-item">
                  <span>{{ item.product.name }} x {{ item.quantity }}</span>
                  <span>₹{{ item.price * item.quantity }}</span>
                </div>
              </div>
            </div>

            <div class="review-summary">
              <div class="summary-row">
                <span>Subtotal:</span>
                <span>₹{{ cartService.getCartTotal() }}</span>
              </div>
              <div class="summary-row">
                <span>Tax (18%):</span>
                <span>₹{{ (cartService.getCartTotal() * 0.18).toFixed(2) }}</span>
              </div>
              <div class="summary-total">
                <span>Total Amount:</span>
                <span>₹{{ (cartService.getCartTotal() * 1.18).toFixed(2) }}</span>
              </div>
            </div>

            <div class="button-group">
              <button mat-button matStepperPrevious>Back</button>
              <button mat-raised-button color="primary" (click)="placeOrder()" [disabled]="!isFormValid()">Place Order</button>
            </div>
          </div>
        </mat-step>
      </mat-stepper>
    </div>
  `,
  styles: [`
    .checkout-container {
      max-width: 900px;
      margin: 0 auto;
      padding: 24px 16px;
    }

    .page-title {
      font-size: 32px;
      font-weight: 700;
      margin-bottom: 32px;
    }

    .step-content {
      padding: 24px 0;
    }

    .step-content h3 {
      margin-bottom: 24px;
      font-size: 20px;
    }

    .step-content h4 {
      margin-bottom: 16px;
      font-size: 16px;
    }

    .form-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
      margin-bottom: 24px;
    }

    .full-width {
      grid-column: 1 / -1;
    }

    mat-form-field {
      width: 100%;
    }

    .payment-options {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;
    }

    .payment-form {
      background: #f5f5f5;
      padding: 16px;
      border-radius: 4px;
      margin: 16px 0;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }

    .button-group {
      display: flex;
      gap: 12px;
      justify-content: flex-end;
      margin-top: 24px;
    }

    .button-group button {
      min-width: 120px;
    }

    .review-section {
      background: #f9f9f9;
      padding: 16px;
      border-radius: 4px;
      margin-bottom: 16px;
    }

    .review-section p {
      margin: 0;
      line-height: 1.6;
      color: #666;
    }

    .order-items-review {
      background: white;
      border-radius: 4px;
      border: 1px solid #eee;
    }

    .review-item {
      display: flex;
      justify-content: space-between;
      padding: 12px 16px;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }
    }

    .review-summary {
      background: #f5f5f5;
      padding: 16px;
      border-radius: 4px;
      margin: 16px 0;
    }

    .summary-row {
      display: flex;
      justify-content: space-between;
      margin-bottom: 8px;
      font-size: 14px;
    }

    .summary-total {
      display: flex;
      justify-content: space-between;
      font-size: 18px;
      font-weight: 700;
      padding-top: 12px;
      border-top: 1px solid #ddd;
    }

    @media (max-width: 768px) {
      .form-grid {
        grid-template-columns: 1fr;
      }

      .button-group {
        flex-direction: column;
      }
    }
  `]
})
export class CheckoutComponent {
  shippingAddress: Address = {
    id: '',
    fullName: '',
    phoneNumber: '',
    addressLine1: '',
    addressLine2: '',
    city: '',
    state: '',
    country: '',
    postalCode: '',
    isDefault: false,
    type: 'home'
  };

  selectedPaymentMethod = 'cod';
  cardDetails = {
    cardNumber: '',
    expiry: '',
    cvv: ''
  };

  constructor(
    public cartService: CartService,
    private orderService: OrderService,
    private authService: AuthService,
    private router: Router
  ) {}

  get paymentMethodLabel(): string {
    const methods: any = {
      'cod': 'Cash on Delivery',
      'card': 'Credit/Debit Card',
      'upi': 'UPI'
    };
    return methods[this.selectedPaymentMethod];
  }

  isFormValid(): boolean {
    return this.shippingAddress.fullName.trim() !== '' &&
           this.shippingAddress.addressLine1.trim() !== '' &&
           this.shippingAddress.city.trim() !== '' &&
           this.shippingAddress.state.trim() !== '' &&
           this.shippingAddress.country.trim() !== '' &&
           this.shippingAddress.postalCode.trim() !== '' &&
           this.cartService.cartItems$().length > 0;
  }

  placeOrder(): void {
    if (!this.isFormValid()) return;

    const user = this.authService.getCurrentUser();
    if (!user) return;

    const order: Order = {
      id: '',
      orderNumber: '',
      userId: user.id,
      items: this.cartService.cartItems$().map(item => ({
        productId: item.productId,
        productName: item.product.name,
        quantity: item.quantity,
        price: item.price,
        image: item.product.image
      })),
      totalAmount: this.cartService.getCartTotal() * 1.18,
      status: 'pending',
      orderDate: new Date(),
      shippingAddress: this.shippingAddress,
      paymentMethod: this.selectedPaymentMethod,
      paymentStatus: this.selectedPaymentMethod === 'cod' ? 'pending' : 'completed'
    };

    this.orderService.createOrder(order);
    this.cartService.clearCart();
    this.router.navigate(['/order-success', order.orderNumber]);
  }
}
