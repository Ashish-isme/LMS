import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MoreVertical, ArrowUp, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const Dashboard = () => {
  // Stats data
  const stats = [
    {
      title: "Profit Total",
      value: "$0,215",
      description: "Last month versus this month",
      trend: { value: 20, isPositive: true },
      color: "text-purple-500",
    },
    {
      title: "Expense Total",
      value: "12,232.1",
      description: "Last month versus this month",
      trend: { value: 22, isPositive: false },
      color: "text-pink-500",
    },
    {
      title: "New Customers",
      value: "658",
      description: "Last month versus this month",
      trend: { value: 18, isPositive: true },
      color: "text-green-500",
    },
    {
      title: "Running Project",
      value: "25",
      description: "Last month versus this month",
      trend: { value: 12, isPositive: false },
      color: "text-blue-500",
    },
  ];

  // Revenue chart data
  const revenueData = [
    { month: "Jan", revenue: 50000 },
    { month: "Feb", revenue: 32000 },
    { month: "Mar", revenue: 75000 },
    { month: "Apr", revenue: 31000 },
    { month: "May", revenue: 62000 },
    { month: "Jun", revenue: 35000 },
    { month: "Jul", revenue: 72000 },
    { month: "Aug", revenue: 42000 },
    { month: "Sep", revenue: 63000 },
    { month: "Oct", revenue: 40000 },
    { month: "Nov", revenue: 52000 },
    { month: "Dec", revenue: 75000 },
  ];

  // Recent sales data
  const recentSales = [
    {
      id: "1",
      customer: { name: "Mr. Alenex Morunis", initials: "AM" },
      amount: "+$98.00",
      time: "2 minutes ago",
      amountColor: "text-green-500",
    },
    {
      id: "2",
      customer: { name: "Steven Summer cano", initials: "SS" },
      amount: "+$87.00",
      time: "53 minutes ago",
      amountColor: "text-green-500",
    },
    {
      id: "3",
      customer: { name: "Maruna Sen Fantise", initials: "MF" },
      amount: "+$49.00",
      time: "2 hours ago",
      amountColor: "text-green-500",
    },
    {
      id: "4",
      customer: { name: "Kuproy Junkies", initials: "KJ" },
      amount: "+$58.00",
      time: "5 hours ago",
      amountColor: "text-green-500",
    },
  ];

  // Orders data
  const orders = [
    {
      id: "1",
      customer: { name: "Kuproy Junkies", initials: "KJ" },
      product: "All Mac 75",
      date: "17-05-2023",
      status: "success",
      store: "Store 1",
    },
    {
      id: "2",
      customer: { name: "Summer Cano", initials: "SC" },
      product: "Max 78",
      date: "12-05-2023",
      status: "failed",
      store: "Store 2",
    },
    {
      id: "3",
      customer: { name: "Junkies Kuproy", initials: "JK" },
      product: "Pro 58",
      date: "04-06-2023",
      status: "success",
      store: "Store 1",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-6xl mx-auto space-y-4">
        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <Card key={index} className="shadow-sm">
              <CardHeader className="p-4 pb-2 flex flex-row justify-between items-start">
                <CardTitle className="text-sm font-semibold text-gray-700">
                  {stat.title}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View details</DropdownMenuItem>
                    <DropdownMenuItem>Export data</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className={`text-2xl font-bold my-1 ${stat.color}`}>
                  {stat.value}
                </p>
                <div className="flex items-center text-xs text-gray-500">
                  <span className="mr-1">{stat.description}</span>
                  <span
                    className={`flex items-center ${
                      stat.trend.isPositive ? "text-green-500" : "text-red-500"
                    }`}
                  >
                    {stat.trend.isPositive ? (
                      <ArrowUp className="h-3 w-3 mr-0.5" />
                    ) : (
                      <ArrowDown className="h-3 w-3 mr-0.5" />
                    )}
                    {Math.abs(stat.trend.value)}%
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Middle Row with Revenue slightly smaller (7:5 ratio instead of 8:4) and reduced height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Revenue Chart - Reduced to 7/12 width */}
          <Card className="shadow-sm lg:col-span-7">
            <CardHeader className="p-4 pb-0 flex flex-row justify-between items-center">
              <CardTitle className="text-base font-semibold text-gray-800">
                Revenue Updates
              </CardTitle>
              <div className="flex items-center gap-2">
                <Select defaultValue="march">
                  <SelectTrigger className="h-8 w-32 text-xs">
                    <SelectValue>March</SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="january">January</SelectItem>
                    <SelectItem value="february">February</SelectItem>
                    <SelectItem value="march">March</SelectItem>
                  </SelectContent>
                </Select>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View detailed report</DropdownMenuItem>
                    <DropdownMenuItem>Download data</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-6">
              {/* Reduced height from h-64 to h-48 */}
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={revenueData}
                    margin={{ top: 5, right: 0, bottom: 5, left: 0 }}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f0f0f0"
                    />
                    <XAxis
                      dataKey="month"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      orientation="left"
                      tickFormatter={(value) => `$${value / 1000}k`}
                    />
                    <Bar
                      dataKey="revenue"
                      fill="#7E69AB"
                      radius={[2, 2, 0, 0]}
                      barSize={20}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Recent Sales - Increased to 5/12 width */}
          <Card className="shadow-sm lg:col-span-5">
            <CardHeader className="p-4 pb-0 flex flex-row justify-between items-center">
              <CardTitle className="text-base font-semibold text-gray-800">
                Recent Sales
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="link"
                  className="text-sm h-8 p-0 text-blue-500"
                >
                  See All
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View all sales</DropdownMenuItem>
                    <DropdownMenuItem>Export data</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="p-4 pt-6">
              {/* Adjusted spacing for the reduced height */}
              <div className="space-y-4">
                {recentSales.map((sale) => (
                  <div
                    key={sale.id}
                    className="flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <Avatar className="h-8 w-8 mr-4 bg-gray-100">
                        <AvatarFallback className="text-gray-600">
                          {sale.customer.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">
                          {sale.customer.name}
                        </p>
                        <p className="text-xs text-gray-500">{sale.time}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-medium ${sale.amountColor}`}>
                      {sale.amount}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Bottom Row with Orders larger than Visits (8:4 ratio) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Orders Table - 8/12 width */}
          <Card className="shadow-sm lg:col-span-8">
            <CardHeader className="p-4 pb-0">
              <CardTitle className="text-base font-semibold text-gray-800">
                Orders
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 pt-6">
              <div className="border-t border-gray-200">
                <div className="grid grid-cols-5 py-2 text-sm text-gray-500">
                  <div className="px-4">Name</div>
                  <div className="px-4">Item</div>
                  <div className="px-4">Date</div>
                  <div className="px-4">Store</div>
                  <div className="px-4">Action</div>
                </div>
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="grid grid-cols-5 py-2 border-t border-gray-100"
                  >
                    <div className="px-4 flex items-center">
                      <Avatar className="h-6 w-6 mr-2 bg-gray-100">
                        <AvatarFallback className="text-xs text-gray-600">
                          {order.customer.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-xs">{order.customer.name}</span>
                    </div>
                    <div className="px-4 text-xs flex items-center">
                      {order.product}
                    </div>
                    <div className="px-4 text-xs flex items-center">
                      {order.date}
                    </div>
                    <div className="px-4 text-xs flex items-center">
                      {order.store}
                    </div>
                    <div className="px-4 flex items-center">
                      <Badge
                        variant={
                          order.status === "success" ? "outline" : "destructive"
                        }
                        className={`text-xs ${
                          order.status === "success"
                            ? "border-green-500 text-green-500"
                            : ""
                        }`}
                      >
                        {order.status === "success" ? "Success" : "Failed"}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Visits - 4/12 width */}
          <Card className="shadow-sm flex flex-col lg:col-span-4">
            <CardHeader className="p-4 pb-0 flex justify-between">
              <CardTitle className="text-base font-semibold text-gray-800">
                Visits
              </CardTitle>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View details</DropdownMenuItem>
                  <DropdownMenuItem>Export data</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </CardHeader>
            <CardContent className="p-4 pt-0 flex-1 flex flex-col items-center justify-center">
              <div className="w-32 h-32 relative rounded-full bg-purple-100 flex items-center justify-center mt-4">
                <div className="absolute inset-0">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="40"
                      fill="none"
                      stroke="#7E69AB"
                      strokeWidth="12"
                      strokeDasharray="251.2"
                      strokeDashoffset="150.72"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Total</p>
                  <p className="text-2xl font-bold">40%</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
