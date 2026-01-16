import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { EmployeeOrder } from '@/data/types';
import { QUINCE_ITEMS } from '@/data/types';
import { deleteOrder } from '@/data/store';
import { OrderForm } from './OrderForm';

interface OrderListProps {
  orders: EmployeeOrder[];
  onRefresh: () => void;
  loading?: boolean;
}

export function OrderList({ orders, onRefresh, loading }: OrderListProps) {
  const [editingOrder, setEditingOrder] = useState<EmployeeOrder | null>(null);

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}'s order?`)) {
      await deleteOrder(id);
      onRefresh();
    }
  };

  const exportToCSV = () => {
    const headers = [
      'Work location name',
      'Employee',
      'Full name',
      'Identified gender',
      'T-shirt size',
      ...QUINCE_ITEMS.map((i) => i.name),
    ];

    const rows = orders.map((order) => [
      order.workLocation,
      order.fullName,
      order.fullName,
      order.identifiedGender,
      order.tshirtSize,
      ...QUINCE_ITEMS.map((item) => order.items[item.id] || ''),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map((row) =>
        row.map((cell) => (typeof cell === 'string' && cell.includes(',') ? `"${cell}"` : cell)).join(',')
      ),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `quince-order-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const getItemName = (itemId: string) => {
    return QUINCE_ITEMS.find((i) => i.id === itemId)?.name ?? itemId;
  };

  if (editingOrder) {
    return (
      <div>
        <h2 className="text-xl font-semibold mb-4">Edit Order: {editingOrder.fullName}</h2>
        <OrderForm
          existingOrder={editingOrder}
          onSave={async () => {
            setEditingOrder(null);
            await onRefresh();
          }}
          onCancel={() => setEditingOrder(null)}
        />
      </div>
    );
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Loading orders...
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>All Orders ({orders.length})</CardTitle>
        <Button onClick={exportToCSV} variant="outline">
          Export CSV
        </Button>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Gender</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Items Ordered</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.fullName}</TableCell>
                  <TableCell>{order.workLocation}</TableCell>
                  <TableCell>{order.identifiedGender}</TableCell>
                  <TableCell>{order.tshirtSize}</TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm text-muted-foreground">
                      {Object.entries(order.items).length === 0 ? (
                        <span className="italic">No items</span>
                      ) : (
                        Object.entries(order.items)
                          .map(([itemId, qty]) => `${getItemName(itemId).split('(')[0].trim()} (${qty})`)
                          .join(', ')
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingOrder(order)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(order.id, order.fullName)}
                      >
                        Delete
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
