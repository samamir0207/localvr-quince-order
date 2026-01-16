import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { OrderForm } from '@/components/OrderForm';
import { OrderList } from '@/components/OrderList';
import type { EmployeeOrder } from '@/data/types';
import { getOrders } from '@/data/store';
import logo from '@/assets/localvr-logo.png';

type View = 'form' | 'list';

function App() {
  const [view, setView] = useState<View>('form');
  const [orders, setOrders] = useState<EmployeeOrder[]>([]);

  const refreshOrders = () => {
    setOrders(getOrders());
  };

  useEffect(() => {
    refreshOrders();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-white">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="LocalVR" className="h-10" />
            <div>
              <h1 className="text-xl font-semibold text-[#6b6b6b]">Quince Swag Order</h1>
              <p className="text-sm text-muted-foreground">2026 Company Clothing</p>
            </div>
          </div>
          <nav className="flex gap-2">
            <Button
              variant={view === 'form' ? 'default' : 'outline'}
              onClick={() => setView('form')}
            >
              New Order
            </Button>
            <Button
              variant={view === 'list' ? 'default' : 'outline'}
              onClick={() => setView('list')}
            >
              View All Orders
            </Button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {view === 'form' ? (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2">Submit Your Order</h2>
              <p className="text-muted-foreground">
                Enter your information and select the items you'd like to order. All items are optional - only fill in quantities for items you want.
              </p>
            </div>
            <OrderForm
              onSave={() => {
                refreshOrders();
                alert('Order submitted successfully!');
              }}
            />
          </div>
        ) : (
          <OrderList orders={orders} onRefresh={refreshOrders} />
        )}
      </main>

      <footer className="border-t mt-auto py-4 text-center text-sm text-muted-foreground">
        LocalVR &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
