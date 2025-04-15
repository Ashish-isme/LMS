import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "@/context/auth-context";
import { CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getAllTransactionByUserService } from "@/services";

const formatDate = (date) => {
  if (!date) return "";
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(date).toLocaleDateString(undefined, options);
};

function PurchaseHistoryPage() {
  const { auth } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchTransactions = async (startDate, endDate) => {
    try {
      const response = await getAllTransactionByUserService(
        auth.user._id,
        startDate,
        endDate
      );
      if (response.success) {
        setTransactions(response.data);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
    }
  };

  useEffect(() => {
    const loadTransactions = async () => {
      if (!auth?.user?._id) return;

      setLoading(true);
      try {
        const formattedFromDate = fromDate ? fromDate.toISOString() : null;
        const formattedToDate = toDate ? toDate.toISOString() : null;

        await fetchTransactions(formattedFromDate, formattedToDate);
      } catch (error) {
        console.error("Failed to load transactions:", error);
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, [auth?.user?._id, fromDate, toDate]);

  const handleClearFilters = () => {
    setFromDate(null);
    setToDate(null);
    setSearchQuery("");
  };

  const filteredTransactions = transactions.filter((transaction) => {
    if (!searchQuery) return true;

    return (
      transaction.transaction_uuid
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      transaction.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  // Rest of your JSX remains the same
  return (
    <div className="container mx-auto py-8 px-4 font=[Poppins]">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">
        Purchase History
      </h1>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="search">Search</Label>
          <Input
            id="search"
            type="text"
            placeholder="Search by transaction ID"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>From Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !fromDate && "text-gray-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {fromDate ? formatDate(fromDate) : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={fromDate}
                onSelect={setFromDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label>To Date</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !toDate && "text-gray-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {toDate ? formatDate(toDate) : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={toDate}
                onSelect={setToDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-end">
          <Button variant="outline" onClick={handleClearFilters}>
            Clear Filters
          </Button>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      ) : filteredTransactions.length === 0 ? (
        <div className="bg-gray-50 rounded-lg text-center py-16 text-gray-500">
          No transactions found
        </div>
      ) : (
        <div className="overflow-hidden bg-white rounded-xl shadow-sm border border-gray-200">
          <Table>
            <TableCaption className="text-base text-gray-600 py-4 bg-gray-50 border-t">
              Your complete purchase history
            </TableCaption>
            <TableHeader>
              <TableRow className="bg-gray-50 hover:bg-gray-50">
                <TableHead className="font-semibold text-gray-700 py-5 px-6">
                  Transaction ID
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-right px-6">
                  Amount
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-right px-6">
                  Skill Coins
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-center px-6">
                  Status
                </TableHead>
                <TableHead className="font-semibold text-gray-700 text-right px-6">
                  Date
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow
                  key={transaction.transaction_uuid}
                  className="hover:bg-gray-50 transition-colors border-t border-gray-100"
                >
                  <TableCell className="py-4 px-6">
                    <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded text-gray-700">
                      {transaction.transaction_uuid}
                    </span>
                  </TableCell>
                  <TableCell className="text-right px-6 font-medium">
                    ₨ {transaction.total_amount.toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right px-6">
                    <div className="flex items-center justify-end gap-1">
                      <span className="h-2 w-2 bg-yellow-400 rounded-full"></span>
                      <span>{transaction.skill_coin}</span>
                    </div>
                  </TableCell>
                  <TableCell className="px-6">
                    <div className="flex justify-center">
                      <span
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-medium",
                          transaction.status === "SUCCESS"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        )}
                      >
                        {transaction.status}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right px-6 text-gray-600">
                    {formatDate(transaction.date_of_purchase)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
}

export default PurchaseHistoryPage;
