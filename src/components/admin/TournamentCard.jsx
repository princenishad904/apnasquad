import {
  useDeleteTournamentMutation,
  useUpdateTournamentMutation,
} from "@/redux/admin/adminApi";
import { motion } from "framer-motion";
import {
  Users,
  DollarSign,
  Trophy,
  Map,
  Clock,
  CheckCircle,
  Eye,
  Trash2,
  Copy,
  Lock,
} from "lucide-react";
import moment from "moment";
import { toast } from "sonner";
import Loader from "../Loader";
import SetRoomDetails from "./SetRoomDetails";
import Link from "next/link";
const tourn = {
  _id: "689a8b1f6ec96ba9abbdbc0e",
  title: "SQUAD MUKABLA ONLY 50 LEVEL ALLOWED",
  mode: "squad",
  entryFee: 100,
  prizePool: 2400,
  totalSpots: 25,
  joinedSpots: 0,
  matchTime: "2025-08-14T11:30:00.000Z",
  map: "erangel",
  createdBy: "6891eed9e174448fb6283c4f",
  isActive: true,
  isCompleted: false,
  status: "live",
};

const TournamentCard = ({ tournament }) => {
  const {
    _id,
    title,
    mode,
    entryFee,
    prizePool,
    totalSpots,
    joinedSpots,
    matchTime,
    map,
    status,
    isCompleted,
  } = tournament;

  const [updateTournament, { isLoading: isUpdating }] =
    useUpdateTournamentMutation();
  const [deleteTournament, { isLoading: isDeleting }] =
    useDeleteTournamentMutation();

  const getStatusColor = (status, isCompleted) => {
    if (isCompleted) return "bg-green-500/20 text-green-400";
    if (status === "live") return "bg-red-500/20 text-red-400";
    return "bg-blue-500/20 text-blue-400"; // Assuming 'Upcoming' for other cases
  };

  const getStatusText = (status, isCompleted) => {
    if (isCompleted) return "Completed";
    if (status === "live") return "Live";
    return "Upcoming";
  };

  const handleUpdate = async (id) => {
    const updateData = { isCompleted: true };
    const { data, error } = await updateTournament({ id, updateData });

    if (error) return toast.error(error?.data?.message);
    if (data?.success) return toast.success(data?.message);
  };
  const handleDelete = async (id) => {
    const confirmation = confirm(`are your sure ?`);

    if (confirmation) {
      const { data, error } = await deleteTournament({ id });

      if (error) return toast.error(error?.data?.message);
      if (data?.success) return toast.success(data?.message);
    } else {
      toast.warning("Cancelled");
    }
  };

  return (
    <motion.div
      className="relative p-6 m-4 bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl shadow-lg"
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      {/* Status Badge */}
      <span
        className={`absolute top-4 right-4 px-3 py-1 text-xs font-semibold rounded-full ${getStatusColor(
          status,
          isCompleted
        )}`}
      >
        {getStatusText(status, isCompleted)}
      </span>

      {/* Tournament Title */}
      <h3 className="text-2xl font-bold text-white mb-2">{title}</h3>

      {/* Main Details Grid */}
      <div className="grid grid-cols-2 gap-4 text-slate-300">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-purple-400" />
          <span>{mode?.charAt(0).toUpperCase() + mode?.slice(1)} Mode</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign size={16} className="text-green-400" />
          <span>Entry Fee: ${entryFee}</span>
        </div>
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-yellow-400" />
          <span>Prize Pool: ${prizePool}</span>
        </div>
        <div className="flex items-center gap-2">
          <Map size={16} className="text-teal-400" />
          <span>Map: {map?.charAt(0).toUpperCase() + map?.slice(1)}</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={16} className="text-blue-400" />
          <span>
            Spots: {joinedSpots}/{totalSpots}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Clock size={16} className="text-orange-400" />
          <span>Time: {moment(matchTime).format("MMMM Do, h:mm a")}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mt-6 border-t border-slate-700 pt-4">
        <button
          onClick={() => handleUpdate(_id)}
          disabled={isUpdating}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-green-500 hover:bg-green-600 text-white transition-colors duration-200"
        >
          <CheckCircle size={16} />

          {isUpdating ? <Loader /> : "  Mark as Complete"}
        </button>

        <Link href={`/admin/tournament-details/${_id}`}>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors duration-200">
            <Eye size={16} />
            View
          </button>
        </Link>

        <button
          onClick={() => handleDelete(_id)}
          disabled={isDeleting}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors duration-200"
        >
          <Trash2 size={16} />
          {isDeleting ? <Loader /> : "Delete"}
        </button>
        <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full bg-gray-500 hover:bg-gray-600 text-white transition-colors duration-200">
          <Copy size={16} />
          Clone
        </button>

        <SetRoomDetails id={_id} />
      </div>
    </motion.div>
  );
};

export default TournamentCard;
