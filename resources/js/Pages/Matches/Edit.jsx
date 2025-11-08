import AppLayout from "@/Layouts/AppLayout";
import { useForm } from "@inertiajs/react";
import { useState, useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2 } from "lucide-react";

export default function Edit({ match }) {
  const [goals, setGoals] = useState(match.goals || []);

  const { data, setData, put, processing, errors } = useForm({
    title: match.title || "",
    match_date: match.match_date || "",
    team1_name: match.team1_name || "",
    team1_score: match.team1_score || 0,
    team2_name: match.team2_name || "",
    team2_score: match.team2_score || 0,
    team1_players: match.team1_players?.join(", ") || "",
    team2_players: match.team2_players?.join(", ") || "",
    social_title: match.social_title || "",
    social_description: match.social_description || "",
  });

  function addGoal() {
    setGoals((prev) => [
      ...prev,
      {
        team_side: "team1",
        scorer_name: "",
        assistor_name: "",
        time: "",
        score_type: "regular",
      },
    ]);
  }

  function removeGoal(index) {
    setGoals((prev) => prev.filter((_, i) => i !== index));
  }

  function updateGoal(index, key, value) {
    const updated = [...goals];
    updated[index][key] = value;
    setGoals(updated);
  }

  useEffect(() => {
    setData("goals", goals);
  }, [goals]);

  function handleSubmit(e) {
    e.preventDefault();
    put(route("matches.update", match.slug), {
      preserveScroll: true,
    });
  }

  return (
    <AppLayout title="Edit Match">
      <div className="max-w-4xl mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Edit Match</CardTitle>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {/* Title & Date */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Match Title</Label>
                  <Input
                    id="title"
                    value={data.title}
                    onChange={(e) => setData("title", e.target.value)}
                    placeholder="Matchday - Saturday 11/1/25"
                  />
                  {errors.title && (
                    <p className="text-sm text-red-500 mt-1">{errors.title}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="match_date">Match Date</Label>
                  <Input
                    id="match_date"
                    type="date"
                    value={data.match_date}
                    onChange={(e) => setData("match_date", e.target.value)}
                  />
                  {errors.match_date && (
                    <p className="text-sm text-red-500 mt-1">
                      {errors.match_date}
                    </p>
                  )}
                </div>
              </div>

              <Separator />

              {/* Team Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <Label>Team 1 Name</Label>
                  <Input
                    value={data.team1_name}
                    onChange={(e) => setData("team1_name", e.target.value)}
                  />

                  <Label className="mt-2">Team 1 Score</Label>
                  <Input
                    type="number"
                    value={data.team1_score}
                    onChange={(e) => setData("team1_score", e.target.value)}
                  />

                  <Label className="mt-2">Team 1 Players (comma-separated)</Label>
                  <Textarea
                    rows={3}
                    value={data.team1_players}
                    onChange={(e) =>
                      setData("team1_players", e.target.value)
                    }
                    placeholder="Saiful, Shuvo, Rony, Rifat"
                  />
                </div>

                <div>
                  <Label>Team 2 Name</Label>
                  <Input
                    value={data.team2_name}
                    onChange={(e) => setData("team2_name", e.target.value)}
                  />

                  <Label className="mt-2">Team 2 Score</Label>
                  <Input
                    type="number"
                    value={data.team2_score}
                    onChange={(e) => setData("team2_score", e.target.value)}
                  />

                  <Label className="mt-2">Team 2 Players (comma-separated)</Label>
                  <Textarea
                    rows={3}
                    value={data.team2_players}
                    onChange={(e) =>
                      setData("team2_players", e.target.value)
                    }
                    placeholder="Wahid, Sayeem, Abdur, Rafi"
                  />
                </div>
              </div>

              <Separator />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="social_title">Social Media Title</Label>
                  <Input
                    id="social_title"
                    value={data.social_title}
                    onChange={(e) => setData("social_title", e.target.value)}
                    placeholder="e.g. Titans claim 3–1 victory over Vikings!"
                  />
                  {errors.social_title && (
                    <p className="text-sm text-red-500 mt-1">{errors.social_title}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="social_description">Social Media Description</Label>
                  <Textarea
                    id="social_description"
                    rows={1}
                    value={data.social_description}
                    onChange={(e) => setData("social_description", e.target.value)}
                    placeholder="An intense match saw Titans edge out Vikings in a thrilling Saturday showdown."
                  />
                  {errors.social_description && (
                    <p className="text-sm text-red-500 mt-1">{errors.social_description}</p>
                  )}
                </div>
              </div>

              <Separator />

              {/* Goals Section */}
              <div>
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold">Goals</h3>
                  <Button type="button" variant="outline" onClick={addGoal}>
                    <PlusCircle className="w-4 h-4 mr-2" /> Add Goal
                  </Button>
                </div>

                {goals.length === 0 && (
                  <p className="text-sm text-gray-500">
                    No goals added yet. Click “Add Goal” to begin.
                  </p>
                )}

                {goals.map((goal, index) => (
                  <Card key={index} className="p-4 mb-3 border border-gray-200">
                    <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                      <div>
                        <Label>Team</Label>
                        <select
                          className="border rounded-md p-2 w-full"
                          value={goal.team_side}
                          onChange={(e) =>
                            updateGoal(index, "team_side", e.target.value)
                          }
                        >
                          <option value="team1">
                            {data.team1_name || "Team 1"}
                          </option>
                          <option value="team2">
                            {data.team2_name || "Team 2"}
                          </option>
                        </select>
                      </div>

                      <div>
                        <Label>Scorer</Label>
                        <Input
                          value={goal.scorer_name}
                          onChange={(e) =>
                            updateGoal(index, "scorer_name", e.target.value)
                          }
                        />
                      </div>

                      <div>
                        <Label>Assistor</Label>
                        <Input
                          value={goal.assistor_name}
                          onChange={(e) =>
                            updateGoal(index, "assistor_name", e.target.value)
                          }
                          placeholder="(optional)"
                        />
                      </div>

                      <div>
                        <Label>Time</Label>
                        <Input
                          value={goal.time}
                          onChange={(e) =>
                            updateGoal(index, "time", e.target.value)
                          }
                          placeholder="e.g. 23'"
                        />
                      </div>

                      <div>
                        <Label>Type</Label>
                        <select
                          className="border rounded-md p-2 w-full"
                          value={goal.score_type}
                          onChange={(e) =>
                            updateGoal(index, "score_type", e.target.value)
                          }
                        >
                          <option value="regular">Regular</option>
                          <option value="own_goal">Own Goal</option>
                          <option value="penalty">Penalty</option>
                        </select>
                      </div>
                    </div>

                    <div className="flex justify-end mt-3">
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={() => removeGoal(index)}
                      >
                        <Trash2 className="w-4 h-4 mr-1" /> Remove
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
              <div>
                <Label htmlFor="image">Upload Match Image</Label>
                <Input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={(e) => setData("image", e.target.files[0])}
                />
                {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
              </div>
            </CardContent>

            <CardFooter className="flex justify-end">
              <Button type="submit" disabled={processing}>
                Update Match
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </AppLayout>
  );
}
