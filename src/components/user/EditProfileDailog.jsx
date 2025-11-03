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

export default function EditProfileDialog({ button }) {
  const [updateProfile, { isLoading }] = useUpdateProfileMutation();
  const [previewImage, setPreviewImage] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const fileInputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const { data: user } = useGetLoggedInUserQuery();
  const dispatch = useDispatch();
  const handleChangeAvatar = (e) => {
    const file = e.target.files[0];

    // Validate file type and size
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      // 2MB limit
      setError("Image size should be less than 2MB");
      return;
    }

    setError("");
    setImage(file);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImage(reader.result);
    };
  };

  const handleAvatarClick = () => {
    fileInputRef.current.click();
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData(e.target);
      const data = Object.fromEntries(formData.entries());

      // Validate required fields
      if (!data.name?.trim()) {
        setError("Name is required");
        return;
      }

      if (image) {
        formData.append("profileImage", image);
      }

      let { data: res, error } = await updateProfile(formData);
   

      if (res?.success) {
        setIsOpen(false);
        toast.success(res?.message);
      }

      if (error) {
        setError(error?.data?.message || "Failed to update profile");
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
            Edit Profile
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] h-auto dark backdrop-blur-md bg-black/40">
        <form onSubmit={handleUpdateProfile}>
          <DialogHeader>
            <DialogTitle className={"text-start"}>Edit profile</DialogTitle>
            <DialogDescription className={"text-start mb-2"}>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          {error && (
            <div className="text-red-500 text-sm p-2 bg-red-500/10 rounded-md">
              {error}
            </div>
          )}

          <div className="grid gap-4 py-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar
                className="w-16 h-16 cursor-pointer"
                onClick={handleAvatarClick}
              >
                <AvatarImage
                  src={previewImage || user?.data?.avatar}
                  className="object-cover"
                />
                <AvatarFallback>
                  {user?.data?.name?.charAt(0) || "U"}
                </AvatarFallback>
              </Avatar>

              <input
                id="avatarInput"
                type="file"
                ref={fileInputRef}
                onChange={handleChangeAvatar}
                accept="image/*"
                className="hidden"
              />

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAvatarClick}
              >
                Change avatar
              </Button>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" defaultValue={user?.data?.name} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="phone">Phone</Label>
              <Input id="phone" name="phone" defaultValue={user?.data?.phone} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="bgmiId">BGMI UID</Label>
              <Input
                id="bgmiId"
                name="bgmiId"
                defaultValue={user?.data?.bgmiId || ""}
                placeholder="Enter your BGMI UID"
              />
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
