"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetLoggedInUserQuery,
  useUpdateProfileMutation,
} from "@/redux/user/userApi";
import { toast } from "sonner";
import { setUser } from "@/redux/auth/authSlice";

export default function EditProfileDialog({ button, user }) {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();

  const [error, setError] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      let { data: res, error } = await updateProfile(formData);

      if (res?.success) {
        setIsOpen(false);
        toast.success(res?.message);
      }

      if (error) {
        setError(error?.data?.message || "Failed to update upi id");
      }
    } catch (err) {
      setError(err.message || "Failed to update profile");
    }
  };

  return (
    <Dialog className="dark" open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {button || (
          <Button
            variant="outline"
            onClick={() => setIsOpen(true)}
            className="dark bg-gradient-to-br from-black/20 to-slate-600 hover:bg-black/20"
          >
            {user?.upiId ? "Change UPI" : " Add UPI"}
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] h-auto dark backdrop-blur-md bg-black/40">
        <form onSubmit={handleUpdateProfile}>
          <DialogHeader>
            <DialogTitle className={"text-start"}>
              Add your UPI details
            </DialogTitle>
            <DialogDescription className={"text-start"}>
              Add your UPI ID to enable seamless withdrawals.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <div className="text-red-500 text-sm p-2 bg-red-500/10 rounded-md">
              {error}
            </div>
          )}

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="upiName" defaultValue={user?.upiName} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="upiId">UPI</Label>
              <Input id="upiId" name="upiId" defaultValue={user?.upiId} />
            </div>
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline" disabled={isLoading}>
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <>Saving...</> : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
