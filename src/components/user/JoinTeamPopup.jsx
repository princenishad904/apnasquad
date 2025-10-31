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
import { useJoinTournamentViaPasswordMutation } from "@/redux/tournament/tournamentApi";
import { useState } from "react";
import { toast } from "sonner";
import Loader from "../Loader";

export default function JoinTeamPopup({ button }) {
  const [isOpen, setIsOpen] = useState(false);
  const [joinTournamentViaPassword, { isLoading }] =
    useJoinTournamentViaPasswordMutation();
  const handleJoinTeam = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const credential = Object.fromEntries(formData.entries());

    const { data, error } = await joinTournamentViaPassword({
      teamId: Number(credential.teamId),
  
    });

    if (error) return toast.error(error?.data?.message);
    if (data?.success) {
      setIsOpen(false);
      return toast.success(data?.message);
    }
  };

  return (
    <Dialog className="dark" open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {button || (
          <Button
            variant="outline"
            onClick={() => setIsOpen(true)}
            className="w-full cursor-pointer"
          >
            Enter Team Password
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] h-auto dark backdrop-blur-md bg-black/40">
        <form onSubmit={handleJoinTeam}>
          <DialogHeader>
            <DialogTitle>Join Team via team id and password</DialogTitle>
            <DialogDescription>
              This Id and password have team captan
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4 mt-6">
            <div className="grid gap-2">
              <Label htmlFor="teamId">Team Id</Label>
              <Input id="teamId" name="teamId" />
            </div>
           
          </div>

          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Cancel
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? <Loader /> : "Join Team"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
