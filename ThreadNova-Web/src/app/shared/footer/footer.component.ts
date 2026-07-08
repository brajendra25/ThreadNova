import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, RouterLink } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    RouterModule
  ],
  template: `
    <footer class="footer">
      <div class="footer-container">
        <div class="footer-section">
          <h3>About ThreadNova</h3>
          <p>Your ultimate destination for premium fashion and lifestyle products.</p>
          <div class="social-links">
            <a href="#" title="Facebook"><mat-icon>facebook</mat-icon></a>
            <a href="#" title="Instagram"><mat-icon>instagram</mat-icon></a>
            <a href="#" title="Twitter"><mat-icon>twitter</mat-icon></a>
            <a href="#" title="LinkedIn"><mat-icon>linkedin</mat-icon></a>
          </div>
        </div>

        <div class="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a [routerLink]="['/products']">Products</a></li>
            <li><a [routerLink]="['/categories']">Categories</a></li>
            <li><a [routerLink]="['/about']">About Us</a></li>
            <li><a [routerLink]="['/blog']">Blog</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Customer Service</h3>
          <ul>
            <li><a [routerLink]="['/contact']">Contact Us</a></li>
            <li><a [routerLink]="['/faq']">FAQ</a></li>
            <li><a [routerLink]="['/returns']">Returns & Refunds</a></li>
            <li><a [routerLink]="['/shipping']">Shipping Info</a></li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>Legal</h3>
          <ul>
            <li><a [routerLink]="['/privacy']">Privacy Policy</a></li>
            <li><a [routerLink]="['/terms']">Terms & Conditions</a></li>
            <li><a [routerLink]="['/cookies']">Cookie Policy</a></li>
          </ul>
        </div>
      </div>

      <div class="footer-bottom">
        <p>&copy; 2024 ThreadNova. All rights reserved.</p>
        <p>Designed with ❤️ for fashion lovers</p>
      </div>
    </footer>
  `,
  styles: [`
    .footer {
      background-color: #212121;
      color: white;
      padding: 48px 16px 24px;
      margin-top: 80px;
    }

    .footer-container {
      max-width: 1200px;
      margin: 0 auto;
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 32px;
      margin-bottom: 32px;
    }

    .footer-section h3 {
      font-size: 16px;
      font-weight: 600;
      margin-bottom: 16px;
      text-transform: uppercase;
    }

    .footer-section p {
      font-size: 14px;
      line-height: 1.6;
      color: #999;
    }

    .footer-section ul {
      list-style: none;
      padding: 0;
    }

    .footer-section li {
      margin-bottom: 8px;
    }

    .footer-section a {
      color: #999;
      text-decoration: none;
      font-size: 14px;
      transition: color 0.3s ease;

      &:hover {
        color: #1976d2;
      }
    }

    .social-links {
      display: flex;
      gap: 16px;
      margin-top: 16px;
    }

    .social-links a {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background-color: rgba(255, 255, 255, 0.1);
      transition: all 0.3s ease;

      mat-icon {
        font-size: 20px;
        width: 20px;
        height: 20px;
      }

      &:hover {
        background-color: #1976d2;
        color: white;
      }
    }

    .footer-bottom {
      border-top: 1px solid #333;
      padding-top: 24px;
      text-align: center;
      color: #999;
      font-size: 14px;
    }

    .footer-bottom p {
      margin: 4px 0;
    }

    @media (max-width: 768px) {
      .footer-container {
        grid-template-columns: repeat(2, 1fr);
        gap: 24px;
      }
    }

    @media (max-width: 480px) {
      .footer-container {
        grid-template-columns: 1fr;
      }

      .footer {
        padding: 24px 16px;
      }
    }
  `]
})
export class FooterComponent {}
