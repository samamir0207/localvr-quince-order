import type { EmployeeOrder } from './types';
import { INITIAL_ORDERS } from './initialOrders';

const STORAGE_KEY = 'quince-orders';

export function getOrders(): EmployeeOrder[] {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with pre-populated data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ORDERS));
  return INITIAL_ORDERS;
}

export function saveOrder(order: EmployeeOrder): void {
  const orders = getOrders();
  const existingIndex = orders.findIndex((o) => o.id === order.id);

  if (existingIndex >= 0) {
    orders[existingIndex] = { ...order, updatedAt: new Date().toISOString() };
  } else {
    orders.push({ ...order, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
  }

  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function deleteOrder(id: string): void {
  const orders = getOrders().filter((o) => o.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
}

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}
