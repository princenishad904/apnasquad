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
import { useUpdateTournamentMutation } from "@/redux/admin/adminApi";
import { useState } from "react";
import { toast } from "sonner";
import Loader from "../Loader";

export default function SetRoomDetails({ button, id }) {
  const [roomId, setRoomId] = useState("");
  const [roomPassword, setRoomPassword] = useState("");

  const [updateTournament, { isLoading: isUpdating }] =
    useUpdateTournamentMutation();
  const handleForm = async () => {
    const updateData = { roomId, roomPassword };
    const { data, error } = await updateTournament({ id, updateData });

    if (error?.data) return toast.error(error?.data?.message);
    if (data?.success) return toast.success(data?.message);
  };

  return (
    <Dialog className="dark:bg-red-400 dark ">
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className={
            "dark w-32 cursor-pointer bg-gradient-to-br from-yellow-500 to-amber-700 hover:bg-black/20 "
          }
        >
          Send Room id
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] h-auto dark  backdrop-blur-md bg-black/40">
        <DialogHeader>
          <DialogTitle className={"text-white"}>
            Set Room ID and Password
          </DialogTitle>
          <DialogDescription className={"text-white"}>
            Make changes to your profile here. Click save when you&apos;re done.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <div className="grid gap-3">
            <Label htmlFor="roomId" className={"text-white"}>
              Room Id
            </Label>
            <Input
              type="text"
              id="roomId"
              onChange={(e) => setRoomId(e.target.value)}
              value={roomId}
              name="roomId"
              className={"text-white"}
            />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="password" className={"text-white"}>
              Password
            </Label>
            <Input
              type="text"
              id="password"
              onChange={(e) => setRoomPassword(e.target.value)}
              value={roomPassword}
              name="password"
              className={"text-white"}
            />
          </div>
        </div>
        <DialogFooter className={"text-white"}>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button disabled={isUpdating} onClick={handleForm} type="submit">
            {isUpdating ? <Loader color="black" /> : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
