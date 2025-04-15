import React from "react";
import { StatsCards } from "@/components/ui/admin-view/dashboardSubcomponent/StatsCards";
import { useState, useEffect } from "react";
import { RevenueChart } from "../dashboardSubcomponent/RevenueChart";
import {
  getAllTransactionByUserService,
  getRevenueAnalyticsService,
} from "@/services";

const DashboardPage = () => {
  const stats = [
    {
      title: "Approved Courses",
      value: "$0,215",
      description: "Last month versus this month",
      trend: { value: 20, isPositive: true },
      color: "text-purple-500",
    },
    {
      title: "Pending Courses",
      value: "12,232.1",
      description: "Last month versus this month",
      trend: { value: 22, isPositive: false },
      color: "text-pink-500",
    },
    {
      title: "Total Earnings",
      value: "658",
      description: "Last month versus this month",
      trend: { value: 18, isPositive: true },
      color: "text-green-500",
    },
    {
      title: "Total User",
      value: "25",
      description: "Last month versus this month",
      trend: { value: 12, isPositive: false },
      color: "text-blue-500",
    },
  ];
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await getRevenueAnalyticsService();
        if (response.success) {
          setRevenueData(response.data);
        }
      } catch (error) {
        console.error("Failed to fetch revenue data:", error);
      }
    };

    fetchRevenueData();
  }, []);

  return (
    <div className="max-w-6xl mx-auto space-y-4">
      <StatsCards stats={stats} />
      <RevenueChart data={revenueData} />
    </div>
  );
};

export default DashboardPage;
