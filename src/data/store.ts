import { supabase } from './supabase';
import type { EmployeeOrder } from './types';
import { INITIAL_ORDERS } from './initialOrders';

interface DbOrder {
  id: string;
  full_name: string;
  work_location: string;
  identified_gender: string;
  tshirt_size: string;
  items: Record<string, number>;
  created_at: string;
  updated_at: string;
}

function dbToOrder(db: DbOrder): EmployeeOrder {
  return {
    id: db.id,
    fullName: db.full_name,
    workLocation: db.work_location,
    identifiedGender: db.identified_gender as 'Male' | 'Female' | 'Other',
    tshirtSize: db.tshirt_size,
    items: db.items,
    createdAt: db.created_at,
    updatedAt: db.updated_at,
  };
}

function orderToDb(order: EmployeeOrder): Omit<DbOrder, 'id' | 'created_at' | 'updated_at'> {
  return {
    full_name: order.fullName,
    work_location: order.workLocation,
    identified_gender: order.identifiedGender,
    tshirt_size: order.tshirtSize,
    items: order.items,
  };
}

export async function getOrders(): Promise<EmployeeOrder[]> {
  const { data, error } = await supabase
    .from('quince_orders')
    .select('*')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching orders:', error);
    return [];
  }

  return (data || []).map(dbToOrder);
}

export async function saveOrder(order: EmployeeOrder): Promise<void> {
  const dbData = orderToDb(order);

  if (order.id && order.id.length > 10) {
    // Update existing order (has UUID)
    const { error } = await supabase
      .from('quince_orders')
      .update({ ...dbData, updated_at: new Date().toISOString() })
      .eq('id', order.id);

    if (error) {
      console.error('Error updating order:', error);
    }
  } else {
    // Insert new order
    const { error } = await supabase
      .from('quince_orders')
      .insert(dbData);

    if (error) {
      console.error('Error inserting order:', error);
    }
  }
}

export async function deleteOrder(id: string): Promise<void> {
  const { error } = await supabase
    .from('quince_orders')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting order:', error);
  }
}

export async function seedInitialOrders(): Promise<void> {
  // Check if we already have data
  const { count } = await supabase
    .from('quince_orders')
    .select('*', { count: 'exact', head: true });

  if (count === 0) {
    console.log('Seeding initial orders...');
    const dbOrders = INITIAL_ORDERS.map(orderToDb);
    const { error } = await supabase
      .from('quince_orders')
      .insert(dbOrders);

    if (error) {
      console.error('Error seeding orders:', error);
    } else {
      console.log('Initial orders seeded successfully');
    }
  }
}
