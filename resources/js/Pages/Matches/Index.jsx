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
                {/* Top header */}
                <div className="flex items-center justify-between text-sm text-gray-500 pb-5">
                  <span>
                    {new Date(match.match_date).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric"
                      })}
                  </span>
                  <span className="text-sm text-gray-700">Full-time</span>
                </div>
                {/* Teams */}
                <div className="flex items-center justify-between">
                  {/* Team 1 */}
                  <div className="flex flex-col items-center space-y-2 w-1/3">
                    <ShieldBan className="w-10 h-10 text-red-600" />
                    <span className="text-transform: capitalize font-semibold text-gray-800 text-lg">
                      {match.team1_name}
                    </span>
                  </div>
                  {/* Score */}
                  <div className="flex flex-col items-center justify-center w-1/3">
                    <div className="flex items-center text-4xl font-bold text-gray-900">
                      <span>{match.team1_score}</span>
                      <span className="mx-2 text-gray-400">-</span>
                      <span>{match.team2_score}</span>
                    </div>
                  </div>
                  {/* Team 2 */}
                  <div className="flex flex-col items-center space-y-2 w-1/3">
                    <ShieldHalf className="w-10 h-10 text-blue-600" />
                    <span className="text-transform: capitalize font-semibold text-gray-800 text-lg">
                      {match.team2_name}
                    </span>
                  </div>
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