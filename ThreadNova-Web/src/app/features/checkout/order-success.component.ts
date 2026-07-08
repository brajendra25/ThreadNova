import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { OrderService } from '../../core/services/order.service';
import { Order } from '../../core/models';

@Component({
  selector: 'app-order-success',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatIconModule
  ],
  template: `
    <div class="success-container">
      <div class="success-card">
        <div class="success-icon">
          <mat-icon class="check-icon">check_circle</mat-icon>
        </div>
        <h1 class="success-title">Order Placed Successfully!</h1>
        <p class="success-message">Thank you for your order. We're processing it now.</p>

        <div class="order-details" *ngIf="order">
          <div class="detail-row">
            <span class="label">Order Number:</span>
            <span class="value">{{ order.orderNumber }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Total Amount:</span>
            <span class="value">₹{{ order.totalAmount.toFixed(2) }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Payment Method:</span>
            <span class="value">{{ order.paymentMethod }}</span>
          </div>
          <div class="detail-row">
            <span class="label">Estimated Delivery:</span>
            <span class="value">3-5 Business Days</span>
          </div>
        </div>

        <div class="action-buttons">
          <button mat-raised-button color="primary" [routerLink]="['/orders']">
            Track Order
          </button>
          <button mat-button [routerLink]="['/products']">
            Continue Shopping
          </button>
        </div>

        <p class="confirmation-message">
          A confirmation email has been sent to your email address.
        </p>
      </div>
    </div>
  `,
  styles: [`
    .success-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: calc(100vh - 200px);
      padding: 24px 16px;
    }

    .success-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 16px rgba(0, 0, 0, 0.1);
      padding: 48px 32px;
      max-width: 500px;
      text-align: center;
    }

    .success-icon {
      margin-bottom: 24px;
    }

    .check-icon {
      font-size: 80px;
      width: 80px;
      height: 80px;
      color: #4caf50;
    }

    .success-title {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 12px;
      color: #212121;
    }

    .success-message {
      font-size: 16px;
      color: #666;
      margin-bottom: 32px;
    }

    .order-details {
      background: #f5f5f5;
      padding: 20px;
      border-radius: 4px;
      margin-bottom: 32px;
      text-align: left;
    }

    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }
    }

    .label {
      font-weight: 500;
      color: #666;
    }

    .value {
      font-weight: 600;
      color: #212121;
    }

    .action-buttons {
      display: flex;
      flex-direction: column;
      gap: 12px;
      margin-bottom: 24px;
    }

    .action-buttons button {
      width: 100%;
    }

    .confirmation-message {
      font-size: 12px;
      color: #999;
      margin: 0;
    }

    @media (max-width: 600px) {
      .success-card {
        padding: 32px 16px;
      }

      .success-title {
        font-size: 24px;
      }
    }
  `]
})
export class OrderSuccessComponent implements OnInit {
  order: Order | undefined;

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const orderNumber = params['orderNumber'];
      this.order = this.orderService.getOrderByNumber(orderNumber);
    });
  }
}
