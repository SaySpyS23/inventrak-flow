import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Search, ShoppingCart, Star, Package, Plus } from 'lucide-react';

interface MarketplaceProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  category: string;
  supplier: string;
  inStock: boolean;
  minOrder: number;
  image: string;
}

// Mock marketplace data
const mockMarketplaceProducts: MarketplaceProduct[] = [
  {
    id: 'mp-1',
    name: 'Premium Basmati Rice 25kg',
    description: 'High quality basmati rice, perfect for retail stores',
    price: 1800,
    originalPrice: 2000,
    rating: 4.5,
    reviews: 128,
    category: 'Groceries',
    supplier: 'Agro Foods Ltd',
    inStock: true,
    minOrder: 2,
    image: '/api/placeholder/200/200'
  },
  {
    id: 'mp-2',
    name: 'Cooking Oil Combo Pack 12x1L',
    description: 'Refined sunflower oil, bulk pack for retailers',
    price: 1440,
    originalPrice: 1600,
    rating: 4.3,
    reviews: 96,
    category: 'Groceries',
    supplier: 'Oil Express Co',
    inStock: true,
    minOrder: 1,
    image: '/api/placeholder/200/200'
  },
  {
    id: 'mp-3',
    name: 'Assorted Biscuits Box 48 packs',
    description: 'Mixed variety biscuits, ideal for kirana stores',
    price: 960,
    rating: 4.7,
    reviews: 203,
    category: 'Snacks',
    supplier: 'Snack World',
    inStock: true,
    minOrder: 1,
    image: '/api/placeholder/200/200'
  },
  {
    id: 'mp-4',
    name: 'Tea Powder Bulk 5kg',
    description: 'Premium tea blend for retail packaging',
    price: 800,
    originalPrice: 900,
    rating: 4.2,
    reviews: 67,
    category: 'Beverages',
    supplier: 'Tea Garden Direct',
    inStock: false,
    minOrder: 3,
    image: '/api/placeholder/200/200'
  },
  {
    id: 'mp-5',
    name: 'Sugar Wholesale 50kg',
    description: 'Crystal white sugar, wholesale pack',
    price: 2200,
    rating: 4.6,
    reviews: 145,
    category: 'Groceries',
    supplier: 'Sweet Supply Co',
    inStock: true,
    minOrder: 1,
    image: '/api/placeholder/200/200'
  },
  {
    id: 'mp-6',
    name: 'Detergent Powder 24x1kg',
    description: 'High-quality washing powder, bulk pack',
    price: 1200,
    originalPrice: 1350,
    rating: 4.4,
    reviews: 89,
    category: 'Household',
    supplier: 'Clean Home Supplies',
    inStock: true,
    minOrder: 2,
    image: '/api/placeholder/200/200'
  }
];

export const MarketplaceSection: React.FC = () => {
  const [products] = useState<MarketplaceProduct[]>(mockMarketplaceProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [cart, setCart] = useState<{[key: string]: number}>({});
  const { toast } = useToast();

  const categories = ['all', ...new Set(products.map(p => p.category))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const addToCart = (productId: string, quantity: number = 1) => {
    setCart(prev => ({
      ...prev,
      [productId]: (prev[productId] || 0) + quantity
    }));
    
    const product = products.find(p => p.id === productId);
    toast({
      title: "Added to Cart",
      description: `${product?.name} has been added to your cart.`,
    });
  };

  const getTotalCartValue = () => {
    return Object.entries(cart).reduce((total, [productId, quantity]) => {
      const product = products.find(p => p.id === productId);
      return total + (product ? product.price * quantity : 0);
    }, 0);
  };

  const getCartItemCount = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  const checkout = () => {
    if (getCartItemCount() === 0) {
      toast({
        title: "Empty Cart",
        description: "Please add items to cart before checkout",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Order Placed!",
      description: `Your order for ₹${getTotalCartValue().toLocaleString()} has been placed successfully.`,
    });
    setCart({});
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold">Marketplace</h3>
          <p className="text-muted-foreground">Discover and purchase products from verified suppliers</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="relative">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Cart ({getCartItemCount()})
            {getCartItemCount() > 0 && (
              <Badge className="absolute -top-2 -right-2 px-1 py-0 text-xs">
                {getCartItemCount()}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {category === 'all' ? 'All Categories' : category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Cart Summary */}
      {getCartItemCount() > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">Cart Total: ₹{getTotalCartValue().toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">{getCartItemCount()} items in cart</p>
              </div>
              <Button onClick={checkout} className="hero-button">
                Checkout
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Products Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <Card key={product.id} className="feature-card">
            <CardContent className="p-4">
              <div className="space-y-4">
                {/* Product Image */}
                <div className="aspect-square bg-surface rounded-lg flex items-center justify-center">
                  <Package className="w-16 h-16 text-muted-foreground" />
                </div>

                {/* Product Info */}
                <div className="space-y-2">
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-sm leading-tight">{product.name}</h4>
                    {!product.inStock && (
                      <Badge variant="destructive" className="text-xs">Out of Stock</Badge>
                    )}
                  </div>
                  
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {product.description}
                  </p>

                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-warning text-warning" />
                      <span className="text-xs font-medium">{product.rating}</span>
                    </div>
                    <span className="text-xs text-muted-foreground">({product.reviews} reviews)</span>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold">₹{product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="text-xs text-muted-foreground line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="text-xs">{product.category}</Badge>
                      <span className="text-xs text-muted-foreground">Min: {product.minOrder}</span>
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Supplier: {product.supplier}
                  </div>
                </div>

                {/* Actions */}
                <div className="space-y-2">
                  {cart[product.id] ? (
                    <div className="flex items-center justify-between p-2 bg-primary/10 rounded">
                      <span className="text-sm font-medium">{cart[product.id]} in cart</span>
                      <Button
                        size="sm"
                        onClick={() => addToCart(product.id)}
                        disabled={!product.inStock}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  ) : (
                    <Button
                      className="w-full"
                      onClick={() => addToCart(product.id, product.minOrder)}
                      disabled={!product.inStock}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Products Found</h3>
            <p className="text-muted-foreground">Try adjusting your search terms or filters.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};