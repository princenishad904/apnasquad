import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Phone, User, Gamepad2, Check } from "lucide-react";

export default function TeamDetails({ players }) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {/* Button to trigger the popover */}
        <button className="text-gray-400 underline-offset-2 text-sm">
          See Team
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 dark bg-black/20 backdrop-blur-2xl border border-gray-700 text-white rounded-2xl p-4 shadow-xl">
        <div className="grid gap-4">
          <div className="space-y-2 text-center">
            <h4 className="text-xl leading-none font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              Team Details
            </h4>
          </div>
          <div className="space-y-4">
            {/* Player details ko loop karne ke liye players array ka use */}
            {players.map((player) => (
              <div
                key={player._id}
                className="flex items-center space-x-4 p-3 bg-gray-900/40 rounded-xl transition-transform duration-200 hover:scale-105 hover:bg-gray-800/60"
              >
                {/* Player ka avatar */}
                <Avatar className="h-12 w-12 border-2 border-purple-500">
                  <AvatarImage
                    src={player.user.avatar}
                    alt={`@${player.user.name}`}
                  />
                  <AvatarFallback>{player.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-1">
                  {/* Player ka naam */}
                  <p className="text-lg font-bold flex items-center gap-2">
                    <User size={16} className="text-purple-400" />
                    {player.user.name}
                    {player.isCaptain ? <Check /> : ""}
                  </p>
                  {/* Player ki BGMI ID */}
                  <p className="text-sm text-gray-300 flex items-center gap-2">
                    <Gamepad2 size={16} className="text-pink-400" />
                    {player.user.bgmiId}
                  </p>
                  {/* Player ka phone number, agar available ho */}
                  {player.user.phone && (
                    <p className="text-sm text-gray-300 flex items-center gap-2">
                      <Phone size={16} className="text-green-400" />
                      {player.user.phone}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}
