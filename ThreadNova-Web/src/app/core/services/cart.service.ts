import { Injectable, signal } from '@angular/core';
import { CartItem, Product } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = signal<CartItem[]>(this.loadCartFromStorage());
  public cartItems$ = this.cartItems.asReadonly();

  constructor() {}

  addToCart(product: Product, quantity: number = 1, variantId?: string): void {
    const items = this.cartItems();
    const existingItem = items.find(item => 
      item.productId === product.id && item.variantId === variantId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const newItem: CartItem = {
        id: Math.random().toString(36).substr(2, 9),
        productId: product.id,
        product: product,
        quantity: quantity,
        variantId: variantId,
        price: product.discountPrice || product.price
      };
      items.push(newItem);
    }

    this.cartItems.set([...items]);
    this.saveCartToStorage();
  }

  removeFromCart(cartItemId: string): void {
    const items = this.cartItems().filter(item => item.id !== cartItemId);
    this.cartItems.set(items);
    this.saveCartToStorage();
  }

  updateQuantity(cartItemId: string, quantity: number): void {
    const items = this.cartItems();
    const item = items.find(i => i.id === cartItemId);
    if (item && quantity > 0) {
      item.quantity = quantity;
      this.cartItems.set([...items]);
      this.saveCartToStorage();
    }
  }

  getCartTotal(): number {
    return this.cartItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getCartItemCount(): number {
    return this.cartItems().reduce((count, item) => count + item.quantity, 0);
  }

  clearCart(): void {
    this.cartItems.set([]);
    localStorage.removeItem('cart');
  }

  private saveCartToStorage(): void {
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

  private loadCartFromStorage(): CartItem[] {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
  }
}
