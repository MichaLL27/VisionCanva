import { Layout } from "@/components/Layout";
import { Link, useLocation } from "wouter";
import { useState } from "react";
import { Download, Eye, Package, Calendar, LogOut } from "lucide-react";
import modernImage from "@assets/generated_images/modern_clean_vision_board_collage.png";
import colorfulImage from "@assets/generated_images/colorful_energetic_vision_board_collage.png";

export default function Account() {
  const [activeTab, setActiveTab] = useState<'boards' | 'orders'>('boards');
  const [_, setLocation] = useLocation();

  const handleLogout = () => {
    setLocation("/");
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-12 w-full">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold">My Account</h1>
            <p className="text-muted-foreground">Welcome back, Jane</p>
          </div>
          <button onClick={handleLogout} className="flex items-center gap-2 text-sm font-medium text-destructive hover:text-destructive/80 transition-colors">
            <LogOut className="w-4 h-4" /> Log out
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 border-b border-border">
          <button 
            onClick={() => setActiveTab('boards')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'boards' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            My Vision Boards
          </button>
          <button 
            onClick={() => setActiveTab('orders')}
            className={`px-6 py-3 font-medium text-sm border-b-2 transition-colors ${
              activeTab === 'orders' 
                ? 'border-primary text-primary' 
                : 'border-transparent text-muted-foreground hover:text-foreground'
            }`}
          >
            My Orders
          </button>
        </div>

        {/* Content */}
        {activeTab === 'boards' ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Board Card 1 */}
            <div className="group bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={modernImage} alt="2025 Vision" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-display font-bold text-lg">2025 Vision</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" /> Created Dec 10, 2024
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href="/result?style=modern">
                    <button className="flex-1 bg-primary/5 hover:bg-primary/10 text-primary text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" /> View
                    </button>
                  </Link>
                  <button className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Board Card 2 */}
            <div className="group bg-white rounded-2xl border border-border overflow-hidden shadow-sm hover:shadow-md transition-all">
              <div className="aspect-[4/3] overflow-hidden relative">
                <img src={colorfulImage} alt="Summer Goals" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-display font-bold text-lg">Summer Goals</h3>
                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                      <Calendar className="w-3 h-3" /> Created Jun 15, 2024
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Link href="/result?style=colorful">
                    <button className="flex-1 bg-primary/5 hover:bg-primary/10 text-primary text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                      <Eye className="w-4 h-4" /> View
                    </button>
                  </Link>
                  <button className="flex-1 bg-secondary hover:bg-secondary/80 text-foreground text-sm font-medium py-2 rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> PDF
                  </button>
                </div>
              </div>
            </div>
            
            {/* Create New Card */}
            <Link href="/create">
              <div className="h-full min-h-[300px] border-2 border-dashed border-border rounded-2xl flex flex-col items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer p-6 text-center">
                <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                  <span className="text-2xl">+</span>
                </div>
                <h3 className="font-bold">Create New Board</h3>
              </div>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Order Item */}
            <div className="bg-white rounded-xl border border-border p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="bg-secondary p-3 rounded-lg">
                  <Package className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Order #12345</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                    <span>A2 Poster</span>
                    <span>•</span>
                    <span>Dec 10, 2024</span>
                    <span>•</span>
                    <span>$39.00</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">
                  Processing
                </span>
                <Link href="/account/orders/12345">
                  <button className="flex-1 md:flex-none px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                </Link>
              </div>
            </div>

            {/* Past Order */}
            <div className="bg-white rounded-xl border border-border p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 opacity-75">
              <div className="flex items-start gap-4">
                <div className="bg-muted p-3 rounded-lg">
                  <Package className="w-6 h-6 text-muted-foreground" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Order #98765</h3>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                    <span>A3 Poster</span>
                    <span>•</span>
                    <span>Nov 01, 2024</span>
                    <span>•</span>
                    <span>$29.00</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide">
                  Delivered
                </span>
                <Link href="/account/orders/98765">
                  <button className="flex-1 md:flex-none px-4 py-2 border border-border rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
