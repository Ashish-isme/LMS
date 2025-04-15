import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { XCircle } from "lucide-react";
import { createTransactionService } from "@/services";
import { AuthContext } from "@/context/auth-context";

const PaymentFailurePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { auth } = useContext(AuthContext);

  useEffect(() => {
    const saveFailedTransaction = async () => {
      try {
        setIsLoading(true);

        // Get parameters from URL
        const transaction_uuid = searchParams.get("transaction_uuid");
        const total_amount = searchParams.get("total_amount");
        const skill_coin = searchParams.get("skill_coin");

        if (
          !transaction_uuid ||
          !total_amount ||
          !skill_coin ||
          !auth?.user?._id
        ) {
          throw new Error("Missing required parameters");
        }

        const transactionDetails = {
          user_id: auth.user._id,
          transaction_uuid,
          total_amount: total_amount.toString(),
          status: "FAILED",
          skill_coin: parseInt(skill_coin),
        };

        console.log("Saving failed transaction:", transactionDetails);

        await createTransactionService(transactionDetails);
      } catch (err) {
        console.error("Error logging failed transaction:", err);
        setError(err.message || "Failed to log transaction");
      } finally {
        setIsLoading(false);
      }
    };

    saveFailedTransaction();
  }, [searchParams, auth?.user?._id]);

  if (isLoading) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-3xl font-bold">Processing...</h1>
        <p className="mt-4 text-lg">
          Please wait while we verify your transaction status.
        </p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-12 text-center">
      <XCircle className="mx-auto h-16 w-16 text-red-500 mb-4" />
      <h1 className="text-3xl font-bold text-red-600">Payment Failed</h1>
      <p className="mt-4 text-lg">
        We're sorry, but your payment could not be processed successfully.
      </p>
      <p className="mt-2 text-gray-600">
        No charges have been made to your account.
      </p>

      <div className="mt-8 space-x-4">
        <Button
          onClick={() => navigate("/balance-purchase")}
          className="bg-primary"
        >
          Try Again
        </Button>
        <Button onClick={() => navigate("/")} variant="outline">
          Go to Home
        </Button>
      </div>
    </div>
  );
};

export default PaymentFailurePage;
