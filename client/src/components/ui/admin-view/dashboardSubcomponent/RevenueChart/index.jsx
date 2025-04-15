"use client";

import React, { useState, useEffect } from "react";
import { getRevenueAnalyticsService } from "@/services";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export const RevenueChart = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [revenueData, setRevenueData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        setIsLoading(true);
        const response = await getRevenueAnalyticsService();
        // Format the data to match the expected structure
        const formattedData = response.map((item) => ({
          ...item,
          revenue: Number(item.revenue),
        }));
        setRevenueData(formattedData);
      } catch (error) {
        console.error("Failed to fetch revenue data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRevenueData();
  }, []);

  const filteredData = revenueData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date();
    let daysToSubtract = 90;

    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }

    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-[400px]">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-col sm:flex-row justify-between items-center pb-8">
        <div>
          <CardTitle className="text-base font-medium">
            Revenue Analytics
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Showing total revenue for the last{" "}
            {timeRange === "90d"
              ? "3 months"
              : timeRange === "30d"
              ? "30 days"
              : "7 days"}
          </CardDescription>
        </div>
        <Select value={timeRange} onValueChange={setTimeRange}>
          <SelectTrigger className="h-8 w-[180px]">
            <SelectValue placeholder="Select Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 3 months</SelectItem>
          </SelectContent>
        </Select>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={filteredData}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <defs>
                <linearGradient
                  id="revenueGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="date"
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return `${date.getDate()} ${date.toLocaleString("default", {
                    month: "short",
                  })}`;
                }}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                tickFormatter={(value) => `₨${value / 1000}k`}
                tick={{ fontSize: 12 }}
                tickLine={false}
                axisLine={false}
              />
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white p-2 border rounded-lg shadow-sm">
                        <p className="text-sm font-medium">
                          {new Date(label).toLocaleDateString("default", {
                            day: "numeric",
                            month: "short",
                          })}
                        </p>
                        <p className="text-sm font-bold text-blue-600">
                          ₨{payload[0].value.toLocaleString()}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#8884d8"
                fillOpacity={1}
                fill="url(#revenueGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};
