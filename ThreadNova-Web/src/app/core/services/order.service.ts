import { Injectable, signal } from '@angular/core';
import { Order } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private orders = signal<Order[]>(this.loadOrdersFromStorage());
  public orders$ = this.orders.asReadonly();

  constructor() {}

  createOrder(order: Order): void {
    order.id = Math.random().toString(36).substr(2, 9);
    order.orderNumber = 'ORD-' + Date.now();
    order.orderDate = new Date();
    
    const orders = this.orders();
    orders.push(order);
    
    this.orders.set([...orders]);
    this.saveOrdersToStorage();
  }

  getOrders(): Order[] {
    return this.orders();
  }

  getOrderById(id: string): Order | undefined {
    return this.orders().find(o => o.id === id);
  }

  getOrderByNumber(orderNumber: string): Order | undefined {
    return this.orders().find(o => o.orderNumber === orderNumber);
  }

  updateOrderStatus(orderId: string, status: string): void {
    const orders = this.orders();
    const order = orders.find(o => o.id === orderId);
    if (order) {
      order.status = status as any;
      this.orders.set([...orders]);
      this.saveOrdersToStorage();
    }
  }

  private saveOrdersToStorage(): void {
    localStorage.setItem('orders', JSON.stringify(this.orders()));
  }

  private loadOrdersFromStorage(): Order[] {
    const orders = localStorage.getItem('orders');
    return orders ? JSON.parse(orders) : [];
  }
}
