import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { AlertTriangle, Package, Check, RefreshCw } from 'lucide-react';

interface LowStockItem {
  id: string;
  name: string;
  currentStock: number;
  threshold: number;
  category: string;
  price: number;
  lastRestocked: string;
  notified: boolean;
}

// Mock data
const mockLowStockItems: LowStockItem[] = [
  {
    id: '1',
    name: 'Oil 1L',
    currentStock: 8,
    threshold: 15,
    category: 'Groceries',
    price: 120,
    lastRestocked: '2024-01-10',
    notified: false
  },
  {
    id: '2',
    name: 'Sugar 1kg',
    currentStock: 5,
    threshold: 15,
    category: 'Groceries',
    price: 50,
    lastRestocked: '2024-01-08',
    notified: true
  },
  {
    id: '3',
    name: 'Biscuits Pack',
    currentStock: 12,
    threshold: 20,
    category: 'Snacks',
    price: 30,
    lastRestocked: '2024-01-12',
    notified: false
  },
  {
    id: '4',
    name: 'Detergent 1kg',
    currentStock: 3,
    threshold: 10,
    category: 'Household',
    price: 80,
    lastRestocked: '2024-01-05',
    notified: false
  }
];

export const LowStockSection: React.FC = () => {
  const [lowStockItems, setLowStockItems] = useState<LowStockItem[]>(mockLowStockItems);
  const { toast } = useToast();

  const markAsNotified = (itemId: string) => {
    setLowStockItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, notified: true } : item
      )
    );
    
    const item = lowStockItems.find(item => item.id === itemId);
    toast({
      title: "Marked as Notified",
      description: `${item?.name} has been marked as notified.`,
    });
  };

  const markAllAsNotified = () => {
    setLowStockItems(items =>
      items.map(item => ({ ...item, notified: true }))
    );
    
    toast({
      title: "All Items Notified",
      description: "All low stock items have been marked as notified.",
    });
  };

  const refreshLowStock = () => {
    // Simulate refresh
    toast({
      title: "Stock Levels Refreshed",
      description: "Low stock alerts have been updated.",
    });
  };

  const getUrgencyLevel = (currentStock: number, threshold: number) => {
    const percentage = (currentStock / threshold) * 100;
    if (percentage <= 25) return 'critical';
    if (percentage <= 50) return 'urgent';
    return 'warning';
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'critical': return 'status-error';
      case 'urgent': return 'status-warning';
      default: return 'status-warning';
    }
  };

  const criticalItems = lowStockItems.filter(item => getUrgencyLevel(item.currentStock, item.threshold) === 'critical');
  const urgentItems = lowStockItems.filter(item => getUrgencyLevel(item.currentStock, item.threshold) === 'urgent');
  const warningItems = lowStockItems.filter(item => getUrgencyLevel(item.currentStock, item.threshold) === 'warning');

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h3 className="text-2xl font-bold">Low Stock Alerts</h3>
          <p className="text-muted-foreground">Monitor products that need restocking</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={refreshLowStock}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button onClick={markAllAsNotified} className="hero-button">
            <Check className="w-4 h-4 mr-2" />
            Mark All as Notified
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Low Stock</p>
                <p className="text-2xl font-bold">{lowStockItems.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical (≤25%)</p>
                <p className="text-2xl font-bold text-destructive">{criticalItems.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-destructive" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Urgent (≤50%)</p>
                <p className="text-2xl font-bold text-warning">{urgentItems.length}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-warning" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Notified</p>
                <p className="text-2xl font-bold">{lowStockItems.filter(item => item.notified).length}</p>
              </div>
              <Check className="w-8 h-8 text-success" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Low Stock Items */}
      <div className="space-y-4">
        {lowStockItems.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">All Good!</h3>
              <p className="text-muted-foreground">No items are currently low in stock.</p>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Low Stock Items ({lowStockItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {lowStockItems.map((item) => {
                  const urgency = getUrgencyLevel(item.currentStock, item.threshold);
                  const stockPercentage = Math.round((item.currentStock / item.threshold) * 100);
                  
                  return (
                    <div
                      key={item.id}
                      className={`p-4 border rounded-lg ${
                        urgency === 'critical' ? 'border-destructive/50 bg-destructive/5' :
                        urgency === 'urgent' ? 'border-warning/50 bg-warning/5' :
                        'border-border'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <div>
                              <h4 className="font-semibold">{item.name}</h4>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Badge variant="secondary">{item.category}</Badge>
                                <span>•</span>
                                <span>₹{item.price}</span>
                                <span>•</span>
                                <span>Last restocked: {new Date(item.lastRestocked).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-3 space-y-2">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Current Stock:</span>
                                <Badge variant="outline" className="font-semibold">
                                  {item.currentStock} units
                                </Badge>
                              </div>
                              <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">Threshold:</span>
                                <span className="text-sm">{item.threshold} units</span>
                              </div>
                              <Badge className={getUrgencyColor(urgency)}>
                                {stockPercentage}% of threshold
                              </Badge>
                            </div>
                            
                            {/* Stock Level Bar */}
                            <div className="w-full bg-surface rounded-full h-2">
                              <div
                                className={`h-2 rounded-full ${
                                  urgency === 'critical' ? 'bg-destructive' :
                                  urgency === 'urgent' ? 'bg-warning' :
                                  'bg-primary'
                                }`}
                                style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 ml-4">
                          {item.notified ? (
                            <Badge className="status-success">
                              <Check className="w-3 h-3 mr-1" />
                              Notified
                            </Badge>
                          ) : (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => markAsNotified(item.id)}
                            >
                              Mark as Notified
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Recommendations */}
      {lowStockItems.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Restock Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 bg-primary/5 rounded-lg border border-primary/20">
                <p className="text-sm font-medium text-primary">💡 Tip</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Consider ordering {criticalItems.length + urgentItems.length} items urgently to avoid stockouts.
                </p>
              </div>
              <div className="p-3 bg-warning/5 rounded-lg border border-warning/20">
                <p className="text-sm font-medium text-warning">⚠️ Priority Items</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Focus on restocking: {criticalItems.map(item => item.name).join(', ')} immediately.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};