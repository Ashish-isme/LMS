import React, { useEffect, useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Download } from "lucide-react";
import { createTransactionService } from "@/services";
import { AuthContext } from "@/context/auth-context";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [transactionData, setTransactionData] = useState(null);
  const { auth, updateSkillCoinBalance } = useContext(AuthContext);

  useEffect(() => {
    const saveTransaction = async () => {
      try {
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
          status: "SUCCESS",
          skill_coin: parseInt(skill_coin),
        };

        const response = await createTransactionService(transactionDetails);
        setTransactionData(response.data.transaction);

        //for updating the user skill coin after purchasse only
        updateSkillCoinBalance(response.data.updatedSkillCoinBalance);

        const currentBalance = auth.user.skillCoinBalance || 0;
        const newBalance = currentBalance + parseInt(skill_coin);
        updateSkillCoinBalance(newBalance);
      } catch (err) {
        setError(err.message || "Failed to save transaction");
      } finally {
        setIsLoading(false);
      }
    };

    saveTransaction();
  }, [searchParams, auth?.user?._id]);

  const handleDownloadReceipt = () => {
    if (!transactionData) return;

    const receiptContent = `
      Silk Coins Purchase Receipt
      --------------------------
      Transaction ID: ${transactionData.transaction_uuid}
      Date: ${new Date().toLocaleString()}
      Amount: ₨${transactionData.total_amount}
      Silk Coins: ${transactionData.skill_coin}
      Status: ${transactionData.status}
      
      Thank you for your purchase!
    `;

    const blob = new Blob([receiptContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `silkcoins-receipt-${transactionData.transaction_uuid}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        <p className="mt-4 text-lg">Processing your payment...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">Payment Error</h1>
        <p className="mb-6">{error}</p>
        <Button onClick={() => navigate("/balance-purchase")}>Try Again</Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <div className="bg-white p-8 rounded-lg shadow-md max-w-md w-full">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Payment Successful!</h1>
        <p className="text-gray-600 mb-6">
          Your Silk Coins have been added to your account.
        </p>

        <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600">Transaction ID:</span>
            <span className="font-medium">
              {transactionData.transaction_uuid}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Amount:</span>
            <span className="font-medium">₨{transactionData.total_amount}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Silk Coins:</span>
            <span className="font-medium">{transactionData.skill_coin}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Status:</span>
            <span className="font-medium text-green-600">
              {transactionData.status}
            </span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            onClick={handleDownloadReceipt}
            variant="outline"
            className="gap-2"
          >
            <Download size={16} />
            Download Receipt
          </Button>
          <Button onClick={() => navigate("/")}>Go to Dashboard</Button>
        </div>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;
