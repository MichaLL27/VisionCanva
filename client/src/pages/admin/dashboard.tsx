import { Layout } from "@/components/Layout";
import { Link } from "wouter";
import { Eye, Check, Clock, Truck, MoreHorizontal } from "lucide-react";

export default function Dashboard() {
  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-6 py-12 w-full">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-display font-bold">Print Studio Dashboard</h1>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Live Updates
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
            <h3 className="text-muted-foreground font-medium text-sm mb-2">New orders today</h3>
            <p className="text-4xl font-bold font-display">12</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
            <h3 className="text-muted-foreground font-medium text-sm mb-2">Orders in printing</h3>
            <p className="text-4xl font-bold font-display text-primary">8</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-border shadow-sm">
            <h3 className="text-muted-foreground font-medium text-sm mb-2">Shipped this week</h3>
            <p className="text-4xl font-bold font-display text-green-600">45</p>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-2xl border border-border overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-muted/30 border-b border-border">
                <tr>
                  <th className="p-4 font-bold text-muted-foreground">Order ID</th>
                  <th className="p-4 font-bold text-muted-foreground">Customer</th>
                  <th className="p-4 font-bold text-muted-foreground">Date</th>
                  <th className="p-4 font-bold text-muted-foreground">Size</th>
                  <th className="p-4 font-bold text-muted-foreground">Status</th>
                  <th className="p-4 font-bold text-muted-foreground text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {/* Row 1 */}
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="p-4 font-mono font-medium">#12345</td>
                  <td className="p-4 font-medium">Jane Doe</td>
                  <td className="p-4 text-muted-foreground">Dec 10</td>
                  <td className="p-4">A2 Poster</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wide">
                      <Clock className="w-3 h-3" /> Processing
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-gray-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="p-4 font-mono font-medium">#12344</td>
                  <td className="p-4 font-medium">John Smith</td>
                  <td className="p-4 text-muted-foreground">Dec 10</td>
                  <td className="p-4">A3 Poster</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-yellow-100 text-yellow-700 text-xs font-bold uppercase tracking-wide">
                      <Check className="w-3 h-3" /> Printing
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-gray-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-muted/10 transition-colors">
                  <td className="p-4 font-mono font-medium">#12343</td>
                  <td className="p-4 font-medium">Alice Johnson</td>
                  <td className="p-4 text-muted-foreground">Dec 09</td>
                  <td className="p-4">Canvas 40x60</td>
                  <td className="p-4">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold uppercase tracking-wide">
                      <Truck className="w-3 h-3" /> Shipped
                    </span>
                  </td>
                  <td className="p-4 text-right">
                    <button className="text-muted-foreground hover:text-foreground p-2 rounded-lg hover:bg-gray-100">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Layout>
  );
}
