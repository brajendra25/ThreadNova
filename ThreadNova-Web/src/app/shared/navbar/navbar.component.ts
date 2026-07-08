import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';
import { CartService } from '../../core/services/cart.service';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatBadgeModule,
    MatMenuModule
  ],
  template: `
    <mat-toolbar color="primary" class="navbar">
      <div class="navbar-container">
        <div class="navbar-brand">
          <a [routerLink]="['/']" class="logo">
            <mat-icon>shopping_bag</mat-icon>
            <span>ThreadNova</span>
          </a>
        </div>

        <div class="navbar-center">
          <a [routerLink]="['/products']" class="nav-link">Products</a>
          <a [routerLink]="['/categories']" class="nav-link">Categories</a>
          <a [routerLink]="['/about']" class="nav-link">About</a>
          <a [routerLink]="['/contact']" class="nav-link">Contact</a>
        </div>

        <div class="navbar-end">
          <button mat-icon-button [routerLink]="['/search']" matTooltip="Search">
            <mat-icon>search</mat-icon>
          </button>

          <button mat-icon-button [routerLink]="['/wishlist']" matTooltip="Wishlist">
            <mat-icon>favorite_border</mat-icon>
          </button>

          <button mat-icon-button [routerLink]="['/cart']" matTooltip="Cart" 
                  [matBadge]="cartItemCount()" matBadgeColor="accent">
            <mat-icon>shopping_cart</mat-icon>
          </button>

          <button mat-icon-button [matMenuTriggerFor]="userMenu" matTooltip="Account">
            <mat-icon>account_circle</mat-icon>
          </button>

          <mat-menu #userMenu="matMenu">
            <ng-container *ngIf="isAuthenticated()">
              <button mat-menu-item [routerLink]="['/profile']">
                <mat-icon>person</mat-icon>
                <span>Profile</span>
              </button>
              <button mat-menu-item [routerLink]="['/orders']">
                <mat-icon>receipt</mat-icon>
                <span>My Orders</span>
              </button>
              <button mat-menu-item [routerLink]="['/admin']" *ngIf="isAdmin()">
                <mat-icon>dashboard</mat-icon>
                <span>Admin Dashboard</span>
              </button>
              <mat-divider></mat-divider>
              <button mat-menu-item (click)="logout()">
                <mat-icon>logout</mat-icon>
                <span>Logout</span>
              </button>
            </ng-container>
            <ng-container *ngIf="!isAuthenticated()">
              <button mat-menu-item [routerLink]="['/login']">
                <mat-icon>login</mat-icon>
                <span>Login</span>
              </button>
              <button mat-menu-item [routerLink]="['/register']">
                <mat-icon>person_add</mat-icon>
                <span>Register</span>
              </button>
            </ng-container>
          </mat-menu>
        </div>
      </div>
    </mat-toolbar>
  `,
  styles: [`
    .navbar {
      position: sticky;
      top: 0;
      z-index: 1000;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .navbar-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      width: 100%;
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 16px;
    }

    .navbar-brand {
      display: flex;
      align-items: center;
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 20px;
      font-weight: 700;
      color: white;
      text-decoration: none;
      cursor: pointer;
    }

    .navbar-center {
      display: flex;
      gap: 24px;
      flex: 1;
      margin-left: 40px;
    }

    .nav-link {
      color: white;
      text-decoration: none;
      font-weight: 500;
      transition: opacity 0.3s ease;

      &:hover {
        opacity: 0.8;
      }
    }

    .navbar-end {
      display: flex;
      gap: 8px;
      align-items: center;
    }

    @media (max-width: 768px) {
      .navbar-center {
        display: none;
      }

      .navbar-container {
        padding: 0 12px;
      }
    }
  `]
})
export class NavbarComponent {
  constructor(
    public cartService: CartService,
    public authService: AuthService
  ) {}

  isAuthenticated = this.authService.isAuthenticated;
  userRole = this.authService.userRole;

  get cartItemCount() {
    return this.cartService.getCartItemCount();
  }

  isAdmin(): boolean {
    return this.userRole() === 'admin' || this.userRole() === 'super_admin';
  }

  logout(): void {
    this.authService.logout();
  }
}
