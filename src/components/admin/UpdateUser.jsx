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
import { useUpdateUserMutation } from "@/redux/admin/adminApi";
import { Pencil } from "lucide-react";
import Loader from "../Loader";
import { toast } from "sonner";

export default function UpdateUser({ button, user }) {
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget); // Always refers to <form>
    const updateData = Object.fromEntries(formData.entries());

    const { data, error } = await updateUser({ id: user._id, updateData });

    if (error) return toast.error(error?.data?.message);
    if (data?.success) return toast.success(data?.message);
  };

  return (
    <Dialog>
      {/* Open Dialog Button */}
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-8 h-8 rounded-full bg-red-600 hover:bg-red-700 text-white flex items-center justify-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          <Pencil />
        </Button>
      </DialogTrigger>

      {/* Dialog Content */}
      <DialogContent className="sm:max-w-[425px] h-auto dark backdrop-blur-md bg-black/40">
        <form onSubmit={handleUpdate} className="space-y-4">
          <DialogHeader>
            <DialogTitle className="text-white">Update User</DialogTitle>
            <DialogDescription className="text-white">
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>

          {/* Form Fields */}
          <div className="grid gap-3">
            <Label htmlFor="name" className="text-white">
              Name
            </Label>
            <Input
              id="name"
              name="name"
              defaultValue={user?.name}
              className="text-white"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={user?.email}
              className="text-white"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="bonus" className="text-white">
              Bonus
            </Label>
            <Input
              id="bonus"
              name="bonus"
              type="number"
              defaultValue={user?.bonus}
              className="text-white"
            />
          </div>

          <div className="grid gap-3">
            <Label htmlFor="balance" className="text-white">
              Balance
            </Label>
            <Input
              id="balance"
              name="balance"
              type="number"
              defaultValue={user?.balance}
              className="text-white"
            />
          </div>

          {/* Footer Buttons */}
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="text-white">
                Cancel
              </Button>
            </DialogClose>
            <Button disabled={isLoading} type="submit">
              {isLoading ? <Loader /> : "Save Changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
