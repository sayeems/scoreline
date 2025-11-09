import AppLayout from "@/Layouts/AppLayout";
import { usePage, router, Head } from "@inertiajs/react";
import { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import DataTable from "@/components/data-table";

export default function Leaderboard() {
  const { players, filters } = usePage().props;
  const [period, setPeriod] = useState(filters?.period || "all");

  const handleFilterChange = (value) => {
    setPeriod(value);
    let params = { period: value };

    if (value === "month") {
      const today = new Date();
      params.value = `${today.getFullYear()}-${String(
        today.getMonth() + 1
      ).padStart(2, "0")}`;
    } else if (value === "year") {
      params.value = new Date().getFullYear();
    }

    router.get(route("leaderboard.index"), params, {
      preserveState: true,
      replace: true,
    });
  };

  // Define columns for DataTable
  const columns = [
    {
      accessorKey: "player_name",
      header: "Player",
      cell: ({ getValue }) => (
        <span className="capitalize font-medium text-gray-900">
          {getValue()}
        </span>
      ),
    },
    {
      accessorKey: "total_goals",
      header: "Goals",
      cell: ({ getValue }) => (
        <span className="text-gray-800 font-medium text-left block">
          {getValue()}
        </span>
      ),
    },
    {
      accessorKey: "total_assists",
      header: "Assists",
      cell: ({ getValue }) => (
        <span className="text-gray-800 font-medium text-left block">
          {getValue()}
        </span>
      ),
    },
    {
      accessorKey: "total_contrib",
      header: "G + A",
      cell: ({ getValue }) => (
        <span className="text-gray-900 font-semibold text-left block">
          {getValue()}
        </span>
      ),
    },
  ];

  const data = players.map((p, i) => ({
    rank: i + 1,
    ...p,
  }));

  return (
    <AppLayout title="Leaderboard">
        <Head>
            <meta name="description" content="Top scorers and assist leaders." />
            <meta property="og:title" content="Scoreline Leaderboard" />
            <meta property="og:description" content="Check out who’s leading with goals and assists this month!" />
            <meta property="og:image" content="/leaderboard-default-og.png"/>
            <meta property="og:type" content="website" />
            <meta property="og:url" content={window.location.href} />
        </Head>
      <div className="max-w-5xl mx-auto py-10 px-4 space-y-6">
        {/* Header */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            Player Leaderboard
          </h1>

          <Select onValueChange={handleFilterChange} defaultValue={period}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="All Time" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Time</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Leaderboard */}
        <Card className="shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-800">
              Top Performers
            </CardTitle>
          </CardHeader>
          <CardContent>
            <DataTable columns={columns} data={data} />
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  );
}
