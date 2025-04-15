import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

const PackagesPage = () => {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    amount: "0",
    tax_amount: "0",
    total_amount: "0",
    transaction_uuid: uuidv4(),
    product_service_charge: "0",
    product_delivery_charge: "0",
    product_code: "EPAYTEST", // Replace with your actual product code
    success_url: `http://localhost:5173/payment-success`,
    failure_url: `http://localhost:5173/payment-failed`,
    signed_field_names: "total_amount,transaction_uuid,product_code",
    signature: "",
    secret: "8gBm/:&EnhH.1/q", // Replace with your actual secret key
  });

  const packages = [
    {
      id: 1,
      name: "Mini Pack",
      silkCoins: 20,
      price: 1600,
    },
    {
      id: 2,
      name: "Starter Pack",
      silkCoins: 50,
      price: 3750,
    },
    {
      id: 3,
      name: "Learner's Bundle",
      silkCoins: 100,
      price: 7000,
    },
    {
      id: 4,
      name: "Pro Boost",
      silkCoins: 200,
      price: 13000,
    },
    {
      id: 5,
      name: "Master Vault",
      silkCoins: 500,
      price: 30000,
    },
  ];

  const generateSignature = (
    total_amount,
    transaction_uuid,
    product_code,
    secret
  ) => {
    const hashString = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(hashString, secret);
    return CryptoJS.enc.Base64.stringify(hash);
  };

  useEffect(() => {
    const { total_amount, transaction_uuid, product_code, secret } = formData;
    const hashedSignature = generateSignature(
      total_amount,
      transaction_uuid,
      product_code,
      secret
    );
    setFormData((prev) => ({ ...prev, signature: hashedSignature }));
  }, [formData.total_amount, formData.transaction_uuid]);

  const handleBuyClick = (pkg) => {
    const newTransactionUUID = uuidv4();
    setSelectedPackage(pkg);
    setFormData((prev) => ({
      ...prev,
      amount: pkg.price.toString(),
      total_amount: pkg.price.toString(),
      transaction_uuid: newTransactionUUID,
      success_url: `http://localhost:5173/payment-success/?transaction_uuid=${newTransactionUUID}&total_amount=${pkg.price}&product_code=${prev.product_code}&skill_coin=${pkg.silkCoins}`,
    }));
    setIsDialogOpen(true);
  };

  return (
    <div className="container mx-auto py-12">
      <h1 className="text-3xl font-bold text-center mb-8">
        Silk Coins Packages
      </h1>
      <p className="text-center mb-12 text-gray-600">
        Choose a package that fits your learning needs
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packages.map((pkg) => (
          <Card key={pkg.id} className="flex flex-col">
            <CardHeader>
              <CardTitle className="text-xl font-bold">{pkg.name}</CardTitle>
              <CardDescription>
                <span className="text-2xl font-bold text-primary">
                  {pkg.silkCoins} SC
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <div className="mb-4">
                <p className="text-lg font-bold text-primary">
                  ₨{pkg.price.toLocaleString()}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={() => handleBuyClick(pkg)}>
                Buy Now
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Purchase</DialogTitle>
            <DialogDescription>
              {selectedPackage && (
                <>
                  You are about to purchase the{" "}
                  <strong>{selectedPackage.name}</strong> for{" "}
                  <strong>₨{selectedPackage.price.toLocaleString()}</strong>.
                  <br />
                  This will add {selectedPackage.silkCoins} Silk Coins to your
                  account.
                </>
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-between sm:justify-end gap-2">
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <form
              action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
              method="POST"
            >
              {Object.entries(formData).map(([key, value]) => (
                <input key={key} type="hidden" name={key} value={value} />
              ))}
              <Button type="submit">Continue to Payment</Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PackagesPage;
