import React, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Button } from '@/components/ui/button';
import { 
  ShoppingCart, 
  Package, 
  BarChart3, 
  AlertTriangle, 
  Store, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { POSSection } from './sections/POSSection';
import { InventorySection } from './sections/InventorySection';
import { ReportsSection } from './sections/ReportsSection';
import { LowStockSection } from './sections/LowStockSection';
import { MarketplaceSection } from './sections/MarketplaceSection';
import { SettingsSection } from './sections/SettingsSection';

type Section = 'pos' | 'inventory' | 'reports' | 'lowstock' | 'marketplace' | 'settings';

export const DashboardLayout: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeSection, setActiveSection] = useState<Section>('pos');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigationItems = [
    { id: 'pos', label: 'POS (Billing)', icon: ShoppingCart, allowedRoles: ['admin', 'cashier'] },
    { id: 'inventory', label: 'Inventory', icon: Package, allowedRoles: ['admin'] },
    { id: 'reports', label: 'Reports', icon: BarChart3, allowedRoles: ['admin'] },
    { id: 'lowstock', label: 'Low Stock', icon: AlertTriangle, allowedRoles: ['admin'] },
    { id: 'marketplace', label: 'Marketplace', icon: Store, allowedRoles: ['admin'] },
    { id: 'settings', label: 'Settings', icon: Settings, allowedRoles: ['admin', 'cashier'] },
  ];

  const filteredNavigation = navigationItems.filter(item => 
    item.allowedRoles.includes(user?.role || 'cashier')
  );

  const renderSection = () => {
    switch (activeSection) {
      case 'pos': return <POSSection />;
      case 'inventory': return <InventorySection />;
      case 'reports': return <ReportsSection />;
      case 'lowstock': return <LowStockSection />;
      case 'marketplace': return <MarketplaceSection />;
      case 'settings': return <SettingsSection />;
      default: return <POSSection />;
    }
  };

  const getSectionTitle = () => {
    const section = navigationItems.find(item => item.id === activeSection);
    return section?.label || 'Dashboard';
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <div className={`fixed lg:relative inset-y-0 left-0 z-50 w-72 bg-card border-r transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
                <div>
                  <h1 className="text-xl font-bold">InvenTrak</h1>
                  <p className="text-sm text-muted-foreground">{user?.companyName}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {filteredNavigation.map((item) => {
              const isActive = activeSection === item.id;
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveSection(item.id as Section);
                    setSidebarOpen(false);
                  }}
                  className={`nav-item w-full ${isActive ? 'active' : ''}`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t">
            <div className="space-y-3">
              <div className="text-sm">
                <p className="font-medium">{user?.name}</p>
                <p className="text-muted-foreground">{user?.role === 'admin' ? 'Owner/Admin' : 'Cashier'}</p>
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start text-destructive hover:text-destructive hover:bg-destructive/10"
                onClick={logout}
              >
                <LogOut className="w-4 h-4 mr-3" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top Bar */}
        <header className="bg-card border-b p-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="w-5 h-5" />
            </Button>
            <h2 className="text-xl font-semibold">{getSectionTitle()}</h2>
          </div>
          <div className="flex items-center space-x-3">
            <div className="text-sm text-muted-foreground hidden sm:block">
              Welcome, {user?.name}
            </div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground text-sm font-medium">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="animate-fade-in">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  );
};