import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BarChart3, TrendingUp, DollarSign, Package } from 'lucide-react';

// Mock data
const dailySales = {
  total: 15420,
  transactions: 28,
  averageOrder: 550,
  topProducts: [
    { name: 'Rice 1kg', quantity: 12, revenue: 960 },
    { name: 'Oil 1L', quantity: 8, revenue: 960 },
    { name: 'Wheat Flour 5kg', quantity: 5, revenue: 1000 },
  ]
};

const monthlySales = {
  total: 342000,
  transactions: 645,
  averageOrder: 530,
  growth: 12.5,
  topProducts: [
    { name: 'Rice 1kg', quantity: 280, revenue: 22400 },
    { name: 'Oil 1L', quantity: 190, revenue: 22800 },
    { name: 'Sugar 1kg', quantity: 156, revenue: 7800 },
  ]
};

const bestSellers = [
  { name: 'Rice 1kg', sold: 280, revenue: 22400, growth: 15 },
  { name: 'Oil 1L', sold: 190, revenue: 22800, growth: 8 },
  { name: 'Sugar 1kg', sold: 156, revenue: 7800, growth: -5 },
  { name: 'Tea 250g', sold: 134, revenue: 8040, growth: 22 },
];

export const ReportsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState('daily');

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Business Reports</h3>
        <p className="text-muted-foreground">Track your sales performance and business insights</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="daily">Daily Sales</TabsTrigger>
          <TabsTrigger value="monthly">Monthly Sales</TabsTrigger>
          <TabsTrigger value="bestsellers">Best Sellers</TabsTrigger>
          <TabsTrigger value="profit">Profit Summary</TabsTrigger>
        </TabsList>

        <TabsContent value="daily" className="space-y-6">
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Today's Sales</p>
                    <p className="text-2xl font-bold">₹{dailySales.total.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Transactions</p>
                    <p className="text-2xl font-bold">{dailySales.transactions}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Order</p>
                    <p className="text-2xl font-bold">₹{dailySales.averageOrder}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Items Sold</p>
                    <p className="text-2xl font-bold">{dailySales.topProducts.reduce((sum, p) => sum + p.quantity, 0)}</p>
                  </div>
                  <Package className="w-8 h-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Top Selling Products Today</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {dailySales.topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">#{index + 1}</Badge>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {product.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{product.revenue}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monthly" className="space-y-6">
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Monthly Sales</p>
                    <p className="text-2xl font-bold">₹{monthlySales.total.toLocaleString()}</p>
                    <p className="text-sm text-success">+{monthlySales.growth}% from last month</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Transactions</p>
                    <p className="text-2xl font-bold">{monthlySales.transactions}</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Avg. Order Value</p>
                    <p className="text-2xl font-bold">₹{monthlySales.averageOrder}</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Items Sold</p>
                    <p className="text-2xl font-bold">{monthlySales.topProducts.reduce((sum, p) => sum + p.quantity, 0)}</p>
                  </div>
                  <Package className="w-8 h-8 text-warning" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Top Performers</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {monthlySales.topProducts.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center gap-3">
                      <Badge variant="secondary">#{index + 1}</Badge>
                      <div>
                        <p className="font-medium">{product.name}</p>
                        <p className="text-sm text-muted-foreground">Qty: {product.quantity}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">₹{product.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bestsellers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Best Selling Products</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {bestSellers.map((product, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <Badge variant="secondary" className="text-lg px-3 py-1">#{index + 1}</Badge>
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {product.sold} units sold • ₹{product.revenue.toLocaleString()} revenue
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge 
                        variant={product.growth > 0 ? "default" : "destructive"}
                        className={product.growth > 0 ? "status-success" : "status-error"}
                      >
                        {product.growth > 0 ? '+' : ''}{product.growth}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profit" className="space-y-6">
          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Revenue</p>
                    <p className="text-2xl font-bold">₹{monthlySales.total.toLocaleString()}</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-success" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Profit</p>
                    <p className="text-2xl font-bold">₹{Math.round(monthlySales.total * 0.3).toLocaleString()}</p>
                    <p className="text-sm text-muted-foreground">~30% margin</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-primary" />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Growth Rate</p>
                    <p className="text-2xl font-bold">+{monthlySales.growth}%</p>
                    <p className="text-sm text-success">Month over month</p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-accent" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Profit Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span>Gross Revenue</span>
                  <span className="font-semibold">₹{monthlySales.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <span>Cost of Goods (Est. 70%)</span>
                  <span className="font-semibold text-destructive">-₹{Math.round(monthlySales.total * 0.7).toLocaleString()}</span>
                </div>
                <div className="flex justify-between items-center p-3 border rounded-lg bg-success/10">
                  <span className="font-semibold">Net Profit (Est.)</span>
                  <span className="font-bold text-success">₹{Math.round(monthlySales.total * 0.3).toLocaleString()}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};