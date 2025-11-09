import AppLayout from "@/Layouts/AppLayout";
import { Link, usePage, router } from "@inertiajs/react";
import { ShieldBan, ShieldHalf, Pencil, Trash } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function Index({ matches }) {
  const { auth } = usePage().props;

  const handleDelete = (slug) => {
    if (confirm("Are you sure you want to delete this match?")) {
      router.delete(route("matches.destroy", slug), {
        preserveScroll: true,
      });
    }
  };

  return (
    <AppLayout title="Match History">
      <div className="max-w-3xl mx-auto py-10 px-4 space-y-4">
        <h1 className="text-2xl font-semibold mb-6">Recent Matches</h1>

        {matches.length === 0 ? (
          <p className="text-gray-500 text-center">No matches available.</p>
        ) : (
          matches.map((match) => (
            <Card
              key={match.id}
              className="text-transform: capitalize p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              {/* Clickable area for match details */}
              <Link
        href={route("matches.show", match.slug)}
        className="block hover:scale-[1.01] transition-transform"
      >
        {/* Scoreline layout */}
        <div className="relative flex flex-col items-center justify-center bg-white">
          {/* Header bar (optional) */}
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
          <div className="flex items-center justify-between w-full px-10 py-6">
            {/* Team 1 */}
            <div className="flex flex-col items-center text-center w-1/3">
              <span className="text-[1rem] font-bold text-gray-800 uppercase tracking-wide">
                {match.team1_name}
              </span>
              <span className="mt-2 text-6xl font-extrabold text-gray-900 leading-none">
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
              <span className="mt-2 text-6xl font-extrabold text-gray-900 leading-none">
                {match.team2_score}
              </span>
            </div>
          </div>

          {/* Footer accent */}
          <div className="w-full h-[4px] bg-gradient-to-r from-red-500 via-gray-200 to-blue-500" />
        </div>
      </Link>
              {/* Admin buttons */}
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
          ))
        )}
      </div>
    </AppLayout>
  );
}