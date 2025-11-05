import { Link } from "@inertiajs/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Trophy } from "lucide-react";

export default function Index({ matches }) {
  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8 flex items-center gap-2">
        <Trophy className="w-6 h-6 text-yellow-500" /> Recent Matches
      </h1>

      {matches.length === 0 ? (
        <p className="text-gray-500 text-center mt-20">No matches found yet.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {matches.map((match) => (
            <Card
              key={match.id}
              className="hover:shadow-md transition-all duration-200 border border-gray-200"
            >
              <CardHeader className="flex flex-col space-y-1">
                <CardTitle className="text-lg font-semibold">
                  {match.title}
                </CardTitle>
                <CardDescription className="flex items-center text-sm text-gray-500">
                  <Calendar className="w-4 h-4 mr-1" />{" "}
                  {new Date(match.match_date).toLocaleDateString()}
                </CardDescription>
              </CardHeader>

              <CardContent>
                <div className="flex justify-between items-center py-2">
                  <div className="flex-1 text-right pr-4">
                    <p className="font-semibold text-gray-800">
                      {match.team1_name}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-2 text-xl font-bold text-gray-900">
                    <Badge variant="secondary" className="px-2 py-1">
                      {match.team1_score}
                    </Badge>
                    <span>-</span>
                    <Badge variant="secondary" className="px-2 py-1">
                      {match.team2_score}
                    </Badge>
                  </div>

                  <div className="flex-1 pl-4">
                    <p className="font-semibold text-gray-800">
                      {match.team2_name}
                    </p>
                  </div>
                </div>

                <Separator className="my-3" />

                <div className="flex justify-between items-center">
                  <Button asChild variant="outline" size="sm">
                    <Link href={route("matches.show", match.slug)}>
                      View Details
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
