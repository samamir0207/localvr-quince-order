import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { EmployeeOrder } from '@/data/types';
import { QUINCE_ITEMS, SIZES, LOCATIONS } from '@/data/types';
import { saveOrder } from '@/data/store';

interface OrderFormProps {
  existingOrder?: EmployeeOrder;
  onSave: () => void;
  onCancel?: () => void;
}

export function OrderForm({ existingOrder, onSave, onCancel }: OrderFormProps) {
  const [fullName, setFullName] = useState(existingOrder?.fullName ?? '');
  const [workLocation, setWorkLocation] = useState(existingOrder?.workLocation ?? '');
  const [identifiedGender, setIdentifiedGender] = useState<'Male' | 'Female' | 'Other'>(
    existingOrder?.identifiedGender ?? 'Male'
  );
  const [tshirtSize, setTshirtSize] = useState(existingOrder?.tshirtSize ?? '');
  const [items, setItems] = useState<Record<string, number>>(existingOrder?.items ?? {});
  const [saving, setSaving] = useState(false);

  const handleQuantityChange = (itemId: string, value: string) => {
    const qty = parseInt(value, 10);
    if (isNaN(qty) || qty <= 0) {
      const newItems = { ...items };
      delete newItems[itemId];
      setItems(newItems);
    } else {
      setItems({ ...items, [itemId]: qty });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    const order: EmployeeOrder = {
      id: existingOrder?.id ?? '',
      fullName,
      workLocation,
      identifiedGender,
      tshirtSize,
      items,
      createdAt: existingOrder?.createdAt ?? new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await saveOrder(order);
    setSaving(false);
    onSave();
  };

  const mensItems = QUINCE_ITEMS.filter((i) => i.gender === 'mens');
  const womensItems = QUINCE_ITEMS.filter((i) => i.gender === 'womens');

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Your Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="workLocation">Work Location *</Label>
            <Select value={workLocation} onValueChange={setWorkLocation} required>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                {LOCATIONS.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender *</Label>
            <Select
              value={identifiedGender}
              onValueChange={(v) => setIdentifiedGender(v as 'Male' | 'Female' | 'Other')}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="size">T-Shirt Size *</Label>
            <Select value={tshirtSize} onValueChange={setTshirtSize} required>
              <SelectTrigger>
                <SelectValue placeholder="Select size" />
              </SelectTrigger>
              <SelectContent>
                {SIZES.map((size) => (
                  <SelectItem key={size} value={size}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Men's Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {mensItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="flex-1">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {item.name}
                </a>
              </div>
              <Input
                id={item.id}
                type="number"
                min="0"
                max="10"
                className="w-20"
                value={items[item.id] || ''}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                placeholder="0"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Women's Items</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {womensItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4">
              <div className="flex-1">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
                >
                  {item.name}
                </a>
              </div>
              <Input
                id={item.id}
                type="number"
                min="0"
                max="10"
                className="w-20"
                value={items[item.id] || ''}
                onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                placeholder="0"
              />
            </div>
          ))}
        </CardContent>
      </Card>

      <div className="flex gap-4">
        <Button type="submit" className="flex-1" disabled={saving}>
          {saving ? 'Saving...' : existingOrder ? 'Update Order' : 'Submit Order'}
        </Button>
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel} disabled={saving}>
            Cancel
          </Button>
        )}
      </div>
    </form>
  );
}
