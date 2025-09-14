import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Search, Plus, Minus, ShoppingCart, Receipt, Package } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  barcode?: string;
}

interface CartItem extends Product {
  quantity: number;
}

// Mock data
const mockProducts: Product[] = [
  { id: '1', name: 'Rice 1kg', price: 80, stock: 50, category: 'Groceries', barcode: '8901030801234' },
  { id: '2', name: 'Oil 1L', price: 120, stock: 30, category: 'Groceries', barcode: '8901030801235' },
  { id: '3', name: 'Wheat Flour 5kg', price: 200, stock: 25, category: 'Groceries', barcode: '8901030801236' },
  { id: '4', name: 'Sugar 1kg', price: 50, stock: 40, category: 'Groceries', barcode: '8901030801237' },
  { id: '5', name: 'Tea 250g', price: 60, stock: 35, category: 'Beverages', barcode: '8901030801238' },
  { id: '6', name: 'Biscuits Pack', price: 30, stock: 45, category: 'Snacks', barcode: '8901030801239' },
];

export const POSSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.barcode?.includes(searchTerm)
  );

  const addToCart = (product: Product) => {
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      if (existingItem.quantity >= product.stock) {
        toast({
          title: "Insufficient Stock",
          description: `Only ${product.stock} items available`,
          variant: "destructive"
        });
        return;
      }
      setCart(cart.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (productId: string, change: number) => {
    setCart(cart.map(item => {
      if (item.id === productId) {
        const newQuantity = item.quantity + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (productId: string) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const getTotalAmount = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const handleCheckout = () => {
    if (cart.length === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to cart before checkout",
        variant: "destructive"
      });
      return;
    }

    // Simulate checkout process
    toast({
      title: "Checkout Successful!",
      description: `Transaction completed. Total: ₹${getTotalAmount()}`,
    });
    
    // Clear cart after successful checkout
    setCart([]);
  };

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <Card>
        <CardContent className="p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              type="text"
              placeholder="Search products by name or scan barcode..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Products List */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Products ({filteredProducts.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 max-h-[600px] overflow-y-auto">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors"
                  >
                    <div className="flex-1">
                      <h4 className="font-medium">{product.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>₹{product.price}</span>
                        <span>•</span>
                        <Badge variant={product.stock > 10 ? "secondary" : "destructive"}>
                          Stock: {product.stock}
                        </Badge>
                        <span>•</span>
                        <span>{product.category}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => addToCart(product)}
                      disabled={product.stock === 0}
                      className="ml-4"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cart */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Cart ({cart.length} items)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[400px] overflow-y-auto">
                {cart.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">
                    No items in cart
                  </p>
                ) : (
                  cart.map((item) => (
                    <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex-1">
                        <h5 className="font-medium text-sm">{item.name}</h5>
                        <p className="text-xs text-muted-foreground">₹{item.price} each</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateQuantity(item.id, 1)}
                          disabled={item.quantity >= item.stock}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                      <div className="text-right ml-2">
                        <p className="font-medium text-sm">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Checkout */}
          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex justify-between items-center text-lg font-semibold">
                  <span>Total:</span>
                  <span>₹{getTotalAmount()}</span>
                </div>
                <Button
                  className="w-full hero-button"
                  onClick={handleCheckout}
                  disabled={cart.length === 0}
                >
                  <Receipt className="w-4 h-4 mr-2" />
                  Checkout
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};