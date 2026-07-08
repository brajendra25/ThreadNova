import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { RouterModule, ActivatedRoute, RouterLink } from '@angular/router';
import { ProductService } from '../../core/services/product.service';
import { Product } from '../../core/models';
import { ProductCardComponent } from '../../shared/product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatSliderModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    RouterModule,
    ProductCardComponent
  ],
  template: `
    <div class="products-container">
      <div class="breadcrumb">
        <a [routerLink]="['/']" class="breadcrumb-link">Home</a>
        <span class="breadcrumb-separator">\u00a0/\u00a0</span>
        <span class="breadcrumb-current">Products</span>
      </div>

      <div class="products-wrapper">
        <!-- Sidebar Filters -->
        <aside class="filters-sidebar">
          <h3 class="filter-title">Filters</h3>

          <!-- Search -->
          <div class="filter-group">
            <input type="text" placeholder="Search products..." 
                   [(ngModel)]="searchQuery" (ngModelChange)="onSearch()" 
                   class="search-input">
          </div>

          <!-- Categories -->
          <div class="filter-group">
            <h4>Categories</h4>
            <div *ngFor="let category of categories()" class="filter-option">
              <input type="checkbox" [id]="'cat-' + category.id" 
                     [(ngModel)]="selectedCategories[category.id]" 
                     (ngModelChange)="onFilterChange()">
              <label [for]="'cat-' + category.id">{{ category.name }}</label>
            </div>
          </div>

          <!-- Price Range -->
          <div class="filter-group">
            <h4>Price Range</h4>
            <div class="price-inputs">
              <input type="number" placeholder="Min" [(ngModel)]="minPrice" (ngModelChange)="onFilterChange()" class="price-input">
              <input type="number" placeholder="Max" [(ngModel)]="maxPrice" (ngModelChange)="onFilterChange()" class="price-input">
            </div>
          </div>

          <!-- Rating -->
          <div class="filter-group">
            <h4>Rating</h4>
            <div class="rating-options">
              <div *ngFor="let rating of [5, 4, 3, 2, 1]" class="filter-option">
                <input type="checkbox" [id]="'rating-' + rating" 
                       [(ngModel)]="selectedRatings[rating]" 
                       (ngModelChange)="onFilterChange()">
                <label [for]="'rating-' + rating">
                  <mat-icon class="star">star</mat-icon>
                  {{ rating }}+ Stars
                </label>
              </div>
            </div>
          </div>

          <!-- Stock Status -->
          <div class="filter-group">
            <h4>Stock</h4>
            <div class="filter-option">
              <input type="checkbox" id="in-stock" 
                     [(ngModel)]="showInStockOnly" 
                     (ngModelChange)="onFilterChange()">
              <label for="in-stock">In Stock Only</label>
            </div>
          </div>

          <button mat-raised-button color="primary" class="reset-btn" (click)="resetFilters()">
            Reset Filters
          </button>
        </aside>

        <!-- Products Grid -->
        <main class="products-main">
          <div class="products-header">
            <h2 class="products-title">Products</h2>
            <select [(ngModel)]="sortBy" (ngModelChange)="onSort()" class="sort-select">
              <option value="featured">Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="newest">Newest</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>

          <div *ngIf="filteredProducts().length > 0" class="products-grid">
            <app-product-card *ngFor="let product of filteredProducts()" [product]="product"></app-product-card>
          </div>

          <div *ngIf="filteredProducts().length === 0" class="no-products">
            <mat-icon class="no-products-icon">shopping_bag</mat-icon>
            <p>No products found. Try adjusting your filters.</p>
          </div>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .products-container {
      padding: 24px 16px;
      max-width: 1200px;
      margin: 0 auto;
    }

    .breadcrumb {
      margin-bottom: 24px;
      font-size: 14px;
    }

    .breadcrumb-link {
      color: #1976d2;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }

    .breadcrumb-current {
      color: #666;
    }

    .products-wrapper {
      display: grid;
      grid-template-columns: 250px 1fr;
      gap: 32px;
    }

    .filters-sidebar {
      background: white;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      height: fit-content;
      position: sticky;
      top: 100px;
    }

    .filter-title {
      font-size: 20px;
      font-weight: 600;
      margin-bottom: 20px;
    }

    .filter-group {
      margin-bottom: 24px;
      padding-bottom: 24px;
      border-bottom: 1px solid #eee;

      &:last-child {
        border-bottom: none;
      }

      h4 {
        font-size: 14px;
        font-weight: 600;
        margin-bottom: 12px;
      }
    }

    .search-input {
      width: 100%;
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    .filter-option {
      display: flex;
      align-items: center;
      margin-bottom: 8px;

      input {
        margin-right: 8px;
        cursor: pointer;
      }

      label {
        font-size: 14px;
        cursor: pointer;
        flex: 1;
        display: flex;
        align-items: center;
        gap: 4px;
      }
    }

    .star {
      font-size: 16px;
      width: 16px;
      height: 16px;
      color: #ffc107;
    }

    .price-inputs {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 8px;
    }

    .price-input {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    .reset-btn {
      width: 100%;
    }

    .products-main {
      background: white;
      padding: 24px;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .products-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }

    .products-title {
      font-size: 24px;
      font-weight: 600;
    }

    .sort-select {
      padding: 8px 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 14px;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 20px;
    }

    .no-products {
      text-align: center;
      padding: 60px 20px;
      color: #999;
    }

    .no-products-icon {
      font-size: 60px;
      width: 60px;
      height: 60px;
      margin-bottom: 16px;
      opacity: 0.5;
    }

    @media (max-width: 768px) {
      .products-wrapper {
        grid-template-columns: 1fr;
      }

      .filters-sidebar {
        position: static;
        order: 2;
      }

      .products-main {
        order: 1;
      }

      .products-grid {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      }
    }
  `]
})
export class ProductListComponent implements OnInit {
  categories: any;
  filteredProducts = signal<Product[]>([]);
  searchQuery = '';
  sortBy = 'featured';
  minPrice = 0;
  maxPrice = 50000;
  showInStockOnly = false;
  selectedCategories: any = {};
  selectedRatings: any = {};

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute
  ) {
    this.categories = this.productService.categories$;
    this.filteredProducts.set(this.productService.getProducts());
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      if (params['category']) {
        this.selectedCategories[params['category']] = true;
        this.onFilterChange();
      }
    });
  }

  onSearch(): void {
    this.onFilterChange();
  }

  onFilterChange(): void {
    let products = this.productService.getProducts();

    // Search filter
    if (this.searchQuery) {
      products = products.filter(p =>
        p.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }

    // Category filter
    const selectedCats = Object.keys(this.selectedCategories).filter(k => this.selectedCategories[k]);
    if (selectedCats.length > 0) {
      products = products.filter(p => selectedCats.includes(p.category));
    }

    // Price filter
    products = products.filter(p => {
      const price = p.discountPrice || p.price;
      return price >= this.minPrice && price <= this.maxPrice;
    });

    // Rating filter
    const selectedRatings = Object.keys(this.selectedRatings).filter(k => this.selectedRatings[k]);
    if (selectedRatings.length > 0) {
      products = products.filter(p => selectedRatings.some(r => p.rating >= parseInt(r)));
    }

    // Stock filter
    if (this.showInStockOnly) {
      products = products.filter(p => p.stock > 0);
    }

    this.filteredProducts.set(products);
  }

  onSort(): void {
    let sorted = [...this.filteredProducts()];

    switch (this.sortBy) {
      case 'price-low':
        sorted.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-high':
        sorted.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    this.filteredProducts.set(sorted);
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.sortBy = 'featured';
    this.minPrice = 0;
    this.maxPrice = 50000;
    this.showInStockOnly = false;
    this.selectedCategories = {};
    this.selectedRatings = {};
    this.onFilterChange();
  }
}
