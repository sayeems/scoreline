import AppLayout from "@/Layouts/AppLayout";
import { ShieldBan, ShieldHalf, Volleyball, User, Pencil, Trash } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, usePage } from "@inertiajs/react";
import ShareSection from "@/Components/ShareSection";

export default function Show({ match }) {
  const { auth } = usePage().props;
  const matchDate = new Date(match.match_date);
  const formattedDate = matchDate.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const team1Goals = match.goals?.filter((g) => g.team_side === "team1") || [];
  const team2Goals = match.goals?.filter((g) => g.team_side === "team2") || [];

  const handleDelete = (slug) => {
    if (confirm("Are you sure you want to delete this match?")) {
      router.delete(route("matches.destroy", slug), {
        preserveScroll: true,
      });
    }
  };
  

  return (
    <AppLayout title={match.title}>
      <div className="max-w-3xl mx-auto py-10 px-4 space-y-6 text-center">
        {/* Main result */}
        <Card className="p-6 border border-gray-200 rounded-2xl shadow-sm bg-white">
            {/* Header bar */}
            <div className="flex items-center justify-between w-full px-6 py-3 text-xs text-gray-500 border-b border-gray-100">
              <span>
                {new Date(match.match_date).toLocaleString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
              <span className="uppercase text-gray-700">Full Time</span>
            </div>

            {/* Main score section */}
            <div className="flex items-center justify-between w-full px-10 py-8">
              {/* Team 1 */}
              <div className="flex flex-col items-center text-center w-1/3">
                <span className="text-[1rem] font-bold text-gray-800 uppercase tracking-wide">
                  {match.team1_name}
                </span>
                <span className="mt-2 text-7xl font-extrabold text-gray-900 leading-none">
                  {match.team1_score}
                </span>
              </div>

              {/* Divider */}
              <div className="flex flex-col items-center justify-center w-1/3">
                <div className="w-8 h-[2px] bg-gray-300 mb-2" />
                <span className="text-gray-400 font-semibold text-sm">VS</span>
                <div className="w-8 h-[2px] bg-gray-300 mt-2" />
              </div>

              {/* Team 2 */}
              <div className="flex flex-col items-center text-center w-1/3">
                <span className="text-[1rem] font-bold text-gray-800 uppercase tracking-wide">
                  {match.team2_name}
                </span>
                <span className="mt-2 text-7xl font-extrabold text-gray-900 leading-none">
                  {match.team2_score}
                </span>
              </div>
            </div>

            {/* Footer accent bar */}
            <div
              className={`w-full h-[4px] ${
                match.team1_score > match.team2_score
                  ? "bg-gradient-to-r from-red-500 via-gray-200 to-blue-200"
                  : match.team2_score > match.team1_score
                  ? "bg-gradient-to-r from-red-200 via-gray-200 to-blue-500"
                  : "bg-gray-300"
              }`}
            />

          {/* Goals Section */}
          <div className="grid grid-cols-3 text-sm text-gray-700 pt-5">
            {/* Team 1 Goals */}
            <div className="text-left space-y-1">
              {team1Goals.length > 0 ? (
                team1Goals.map((goal, i) => (
                  <p className="text-transform: capitalize" key={i}>
                    {goal.scorer_name}{" "}
                    {goal.assistor_name || goal.score_type !== "regular" ? (
                    <span className="text-gray-500">
                        (
                        {goal.assistor_name
                        ? goal.assistor_name
                        : goal.score_type === "penalty"
                        ? "Pen"
                        : goal.score_type === "own_goal"
                        ? "OG"
                        : ""}
                        )
                    </span>
                    ) : null}
                    {goal.time && (
                    <span className="text-gray-400 text-xs"> {goal.time}'</span>
                    )}
                  </p>
                ))
              ) : (
                <p className="text-gray-400 italic">No goals</p>
              )}
            </div>

            {/* Center icon */}
            <div className="flex items-start justify-center pt-1">
              <span>⚽</span>
            </div>

            {/* Team 2 Goals */}
            <div className="text-transform: capitalize text-right space-y-1">
              {team2Goals.length > 0 ? (
                team2Goals.map((goal, i) => (
                  <p key={i}>
                    {goal.time && (
                      <span className="text-gray-400 text-xs">{goal.time}' </span>
                    )}
                    {goal.scorer_name}{" "}
                    {goal.assistor_name && (
                      <span className="text-gray-500">
                        ({goal.assistor_name})
                      </span>
                    )}
                  </p>
                ))
              ) : (
                <p className="text-gray-400 italic">No goals</p>
              )}
            </div>
          </div>
        </Card>

        {/* ✅ Lineups Section */}
        <Card className="p-6 border border-gray-200 rounded-2xl shadow-sm bg-white">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Lineups</h2>

          <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
            {/* Team 1 Lineup */}
            <div>
              <ul className="space-y-1">
                {match.team1_players?.length > 0 ? (
                  match.team1_players.map((player, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <User className="w-4 h-4 text-gray-400" />
                      <span className="text-transform: capitalize">{player}</span>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-400 italic">No lineup available</p>
                )}
              </ul>
            </div>

            {/* Team 2 Lineup */}
            <div className="text-right">
              <ul className="space-y-1">
                {match.team2_players?.length > 0 ? (
                  match.team2_players.map((player, i) => (
                    <li key={i} className="flex items-center justify-end gap-2">
                      <span className="text-transform: capitalize">{player}</span>
                      <User className="w-4 h-4 text-gray-400" />
                    </li>
                  ))
                ) : (
                  <p className="text-gray-400 italic">No lineup available</p>
                )}
              </ul>
            </div>
          </div>
          {auth?.user && auth?.isAdmin && (
                <div className="flex gap-3 mt-4 pt-3 border-t border-gray-100">
                  <Link href={route("matches.edit", match.slug)} className="flex-1">
                    <Button
                      variant="outline"
                      className="w-full flex items-center justify-center gap-2"
                    >
                      <Pencil className="w-4 h-4" />
                      Edit Match
                    </Button>
                  </Link>

                  <Button
                    variant="destructive"
                    className="flex-1 flex items-center justify-center gap-2"
                    onClick={(e) => {
                      e.preventDefault();
                      handleDelete(match.slug);
                    }}
                  >
                    <Trash className="w-4 h-4" />
                    Delete
                  </Button>
                </div>
              )}
        </Card>
        <ShareSection match={match} />
      </div>
    </AppLayout>
  );
}
