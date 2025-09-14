import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { LoginForm } from '@/components/auth/LoginForm';
import { SignupForm } from '@/components/auth/SignupForm';
import { ShoppingCart, BarChart3, Package, TrendingUp, CheckCircle } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

export const LandingPage: React.FC = () => {
  const [showAuth, setShowAuth] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const features = [
    {
      icon: ShoppingCart,
      title: 'Smart POS System',
      description: 'Fast, intuitive billing with automated stock management'
    },
    {
      icon: Package,
      title: 'Inventory Tracking',
      description: 'Real-time stock levels with low-stock alerts'
    },
    {
      icon: BarChart3,
      title: 'Business Reports',
      description: 'Detailed sales analytics and profit summaries'
    },
    {
      icon: TrendingUp,
      title: 'Growth Insights',
      description: 'Data-driven insights to grow your business'
    }
  ];

  const benefits = [
    'Reduce manual errors by 90%',
    'Save 3+ hours daily on inventory tasks',
    'Increase sales visibility',
    'Streamline checkout process',
    'Access anywhere, anytime'
  ];

  if (showAuth) {
    return (
      <div className="min-h-screen bg-gradient-hero flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {authMode === 'login' ? (
            <LoginForm onSwitchToSignup={() => setAuthMode('signup')} />
          ) : (
            <SignupForm onSwitchToLogin={() => setAuthMode('login')} />
          )}
          <div className="text-center mt-4">
            <button
              onClick={() => setShowAuth(false)}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              ← Back to home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-surface">
      {/* Navigation */}
      <nav className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg"></div>
            <span className="text-xl font-bold">InvenTrak</span>
          </div>
          <div className="space-x-2">
            <Button 
              variant="ghost" 
              onClick={() => {
                setAuthMode('login');
                setShowAuth(true);
              }}
            >
              Login
            </Button>
            <Button 
              className="hero-button"
              onClick={() => {
                setAuthMode('signup');
                setShowAuth(true);
              }}
            >
              Get Started
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Smart POS & Inventory Management for{' '}
                <span className="text-primary">Small Retailers</span>
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Streamline your business operations with our modern, easy-to-use platform. 
                Perfect for kirana stores, boutiques, and small retail businesses.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                className="hero-button text-lg px-8 py-6"
                onClick={() => {
                  setAuthMode('signup');
                  setShowAuth(true);
                }}
              >
                Start Free Trial
              </Button>
              <Button 
                variant="outline" 
                className="hero-button-outline text-lg px-8 py-6"
                onClick={() => {
                  setAuthMode('login');
                  setShowAuth(true);
                }}
              >
                Watch Demo
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-sm">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="animate-slide-up">
            <div className="relative">
              <img 
                src={heroImage} 
                alt="Shopkeeper using InvenTrak POS system" 
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="bg-surface py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Everything you need to manage your store
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Powerful features designed specifically for small retailers to simplify operations and boost efficiency.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="feature-card animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-primary text-primary-foreground py-16 lg:py-24">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Ready to transform your business?
            </h2>
            <p className="text-xl opacity-90">
              Join thousands of retailers who have streamlined their operations with InvenTrak. 
              Start your free trial today and see the difference.
            </p>
            <Button 
              size="lg" 
              variant="secondary"
              className="text-lg px-8 py-6 bg-card text-primary hover:bg-card/90"
              onClick={() => {
                setAuthMode('signup');
                setShowAuth(true);
              }}
            >
              Get Started Free
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-gradient-primary rounded"></div>
              <span className="font-semibold">InvenTrak</span>
            </div>
            <div className="text-sm text-muted-foreground mt-4 md:mt-0">
              © 2024 InvenTrak. Built for small retailers with ❤️
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};