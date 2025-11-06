import AppLayout from "@/Layouts/AppLayout";
import { Link, usePage, router } from "@inertiajs/react";
import { Shield, ShieldCheck, Pencil, Trash } from "lucide-react";
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
              className="p-4 border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all"
            >
              {/* Clickable area for match details */}
              <Link
                href={route("matches.show", match.slug)}
                className="block hover:scale-[1.01] transition-transform"
              >
                {/* Teams */}
                <div className="flex items-center justify-between">
                  <div className="flex flex-col space-y-3">
                    {/* Team 1 */}
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-red-600" />
                      <span className="font-medium text-gray-800 w-28 truncate">
                        {match.team1_name}
                      </span>
                      <span className="font-bold text-gray-900">
                        {match.team1_score}
                      </span>
                    </div>

                    {/* Team 2 */}
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-blue-600" />
                      <span className="font-medium text-gray-800 w-28 truncate">
                        {match.team2_name}
                      </span>
                      <span className="font-bold text-gray-900">
                        {match.team2_score}
                      </span>
                    </div>
                  </div>

                  {/* Date */}
                  <div className="text-right text-sm text-gray-500 min-w-[60px]">
                    <p className="font-semibold text-gray-700">FT</p>
                    <p>
                      {new Date(match.match_date).toLocaleString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
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