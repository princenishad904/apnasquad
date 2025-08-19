"use client";
import React, { useState } from "react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useWithdrawMutation } from "@/redux/transaction/transactionApi";
import Loader from "../Loader";
import { toast } from "sonner";
const WithdrawDrawer = ({ user }) => {
  const [withdraw, { isLoading }] = useWithdrawMutation();
  const [amount, setAmount] = useState(0);

  const handleWithdraw = async () => {
    const { data, error } = await withdraw({
      userId: user?._id,
      amount,
      withdrawalMethod: "upi",
    });

    if (error) return toast.error(error?.data?.message);
    if (data?.success) return toast.success(data?.message);
  };
  return (
    <div className="dark">
      <Drawer>
        <DrawerTrigger
          className={
            "bg-gray-200 text-black px-4 py-1 rounded-md border border-gray-500 cursor-pointer"
          }
        >
          Withdraw
        </DrawerTrigger>
        <DrawerContent className="dark bg-black/10 backdrop-blur-2xl max-w-xl mx-auto">
          <DrawerHeader>
            <DrawerTitle className={"font-sans"}>
              Withdraw my balance
            </DrawerTitle>
          </DrawerHeader>
          <div className="px-8">
            <Label htmlFor="amount" className={"my-2"}>
              Amount
            </Label>
            <Input
              type="number"
              name="amount"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              max="4"
            />
          </div>

          {user?.upiId ? (
            <div className="px-8 my-4">
              <h2 className="text-xl font-sans font-semibold mb-4 ">
                Withdraw money to
              </h2>
              <div className="border border-orange-400 py-4 px-6 rounded-xl bg-orange-600/20">
                <p>princeniahd@ybl</p>
              </div>
            </div>
          ) : (
            <p className="mt-4 px-8 text-gray-400">Please add your upi</p>
          )}

          <DrawerFooter className={"px-8 grid grid-cols-2 gap-4"}>
            <DrawerClose
              className={
                "w-full bg-red-500 text-white hover:bg-red-600 rounded-md"
              }
            >
              Cancel
            </DrawerClose>
            <Button
              onClick={handleWithdraw}
              disabled={isLoading}
              className="bg-green-700 text-white hover:bg-green-600"
            >
              {isLoading ? <Loader /> : "Withdraw"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default WithdrawDrawer;
