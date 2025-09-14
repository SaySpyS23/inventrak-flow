import React, { useState } from 'react';
import { useAuth } from '@/components/auth/AuthProvider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { useToast } from '@/hooks/use-toast';
import { User, Building, Bell, Shield, Save, Eye, EyeOff } from 'lucide-react';

export const SettingsSection: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '',
    companyName: user?.companyName || '',
    businessCategory: user?.businessCategory || '',
    address: '',
    city: '',
    pincode: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    lowStockAlerts: true,
    dailyReports: false,
    salesNotifications: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const [securitySettings, setSecuritySettings] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileUpdate = () => {
    // Validate required fields
    if (!profileData.name || !profileData.email || !profileData.companyName) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }

    // Simulate API call
    toast({
      title: "Profile Updated",
      description: "Your profile information has been updated successfully.",
    });
  };

  const handleNotificationUpdate = () => {
    toast({
      title: "Notifications Updated",
      description: "Your notification preferences have been saved.",
    });
  };

  const handlePasswordChange = () => {
    if (!securitySettings.currentPassword || !securitySettings.newPassword || !securitySettings.confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in all password fields",
        variant: "destructive"
      });
      return;
    }

    if (securitySettings.newPassword !== securitySettings.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirm password do not match",
        variant: "destructive"
      });
      return;
    }

    if (securitySettings.newPassword.length < 6) {
      toast({
        title: "Weak Password",
        description: "Password must be at least 6 characters long",
        variant: "destructive"
      });
      return;
    }

    // Simulate password change
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully.",
    });
    
    // Clear password fields
    setSecuritySettings({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold">Settings</h3>
        <p className="text-muted-foreground">Manage your account and application preferences</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Profile Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5" />
              Profile Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  value={profileData.name}
                  onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                  placeholder="Enter your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email *</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                  placeholder="Enter your email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                value={profileData.phone}
                onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                placeholder="Enter your phone number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={profileData.address}
                onChange={(e) => setProfileData({...profileData, address: e.target.value})}
                placeholder="Enter your address"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="city">City</Label>
                <Input
                  id="city"
                  value={profileData.city}
                  onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                  placeholder="Enter your city"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="pincode">PIN Code</Label>
                <Input
                  id="pincode"
                  value={profileData.pincode}
                  onChange={(e) => setProfileData({...profileData, pincode: e.target.value})}
                  placeholder="Enter PIN code"
                />
              </div>
            </div>

            <Button onClick={handleProfileUpdate} className="w-full hero-button">
              <Save className="w-4 h-4 mr-2" />
              Update Profile
            </Button>
          </CardContent>
        </Card>

        {/* Business Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Company Name *</Label>
              <Input
                id="companyName"
                value={profileData.companyName}
                onChange={(e) => setProfileData({...profileData, companyName: e.target.value})}
                placeholder="Enter your company name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="businessCategory">Business Category</Label>
              <Select 
                value={profileData.businessCategory} 
                onValueChange={(value) => setProfileData({...profileData, businessCategory: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select business category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kirana">Kirana Store</SelectItem>
                  <SelectItem value="boutique">Boutique</SelectItem>
                  <SelectItem value="pharmacy">Pharmacy</SelectItem>
                  <SelectItem value="hardware">Hardware Store</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 pt-4">
              <h4 className="font-medium">Account Information</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Account Type:</span>
                  <span className="font-medium">{user?.role === 'admin' ? 'Owner/Admin' : 'Cashier'}</span>
                </div>
                <div className="flex justify-between">
                  <span>Member Since:</span>
                  <span className="font-medium">January 2024</span>
                </div>
                <div className="flex justify-between">
                  <span>Account Status:</span>
                  <span className="font-medium text-success">Active</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="w-5 h-5" />
              Notification Preferences
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Low Stock Alerts</p>
                  <p className="text-sm text-muted-foreground">Get notified when products are low in stock</p>
                </div>
                <Switch
                  checked={notificationSettings.lowStockAlerts}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, lowStockAlerts: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Daily Reports</p>
                  <p className="text-sm text-muted-foreground">Receive daily sales summaries</p>
                </div>
                <Switch
                  checked={notificationSettings.dailyReports}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, dailyReports: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Sales Notifications</p>
                  <p className="text-sm text-muted-foreground">Get notified about important sales events</p>
                </div>
                <Switch
                  checked={notificationSettings.salesNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, salesNotifications: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Switch
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">SMS Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                </div>
                <Switch
                  checked={notificationSettings.smsNotifications}
                  onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                />
              </div>
            </div>

            <Button onClick={handleNotificationUpdate} className="w-full">
              <Save className="w-4 h-4 mr-2" />
              Save Preferences
            </Button>
          </CardContent>
        </Card>

        {/* Security Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Security Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Current Password</Label>
              <div className="relative">
                <Input
                  id="currentPassword"
                  type={showPassword ? "text" : "password"}
                  value={securitySettings.currentPassword}
                  onChange={(e) => setSecuritySettings({...securitySettings, currentPassword: e.target.value})}
                  placeholder="Enter current password"
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="newPassword">New Password</Label>
              <Input
                id="newPassword"
                type={showPassword ? "text" : "password"}
                value={securitySettings.newPassword}
                onChange={(e) => setSecuritySettings({...securitySettings, newPassword: e.target.value})}
                placeholder="Enter new password"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm New Password</Label>
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                value={securitySettings.confirmPassword}
                onChange={(e) => setSecuritySettings({...securitySettings, confirmPassword: e.target.value})}
                placeholder="Confirm new password"
              />
            </div>

            <Button onClick={handlePasswordChange} className="w-full hero-button">
              <Shield className="w-4 h-4 mr-2" />
              Change Password
            </Button>

            <div className="pt-4 space-y-3">
              <h4 className="font-medium">Security Information</h4>
              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <span>Last Login:</span>
                  <span className="font-medium">Today, 10:30 AM</span>
                </div>
                <div className="flex justify-between">
                  <span>Password Changed:</span>
                  <span className="font-medium">30 days ago</span>
                </div>
                <div className="flex justify-between">
                  <span>Two-Factor Auth:</span>
                  <span className="font-medium text-warning">Not Enabled</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};