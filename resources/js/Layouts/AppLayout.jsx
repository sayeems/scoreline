import { Link, Head, usePage } from "@inertiajs/react";
import { Plus, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";

export default function AppLayout({ title, children }) {
  const { auth } = usePage().props;

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Head>
        <title>{title || "Scoreline"}</title>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link href={route("matches.index")} className="flex items-center gap-2">
            <img src="/scoreline-nobg.png" alt="Scoreline" className="h-6 w-auto" />
            <span className="font-semibold text-lg tracking-tight">Scoreline</span>
          </Link>

          {/* Right side actions */}
          {auth?.user && (
            <div className="flex items-center gap-3">
              {/* Admin-only Create button */}
              {auth.isAdmin && (
                <Link href={route("matches.create")}>
                  <Button
                    variant="default"
                    size="sm"
                    className="flex items-center gap-1 bg-yellow-500 hover:bg-yellow-600 text-white font-medium"
                  >
                    <Plus className="w-4 h-4" />
                    Create Match
                  </Button>
                </Link>
              )}

              {/* User dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-800"
                  >
                    {auth.user.name}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuLabel>Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href={route("profile.edit")}>Profile</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    asChild
                    onSelect={(e) => e.preventDefault()}
                  >
                    <Link
                      href={route("logout")}
                      method="post"
                      as="button"
                      className="text-red-500"
                    >
                      Log Out
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </div>
      </header>

      {/* Page Content */}
      <main className="pt-[64px]">{children}</main>
    </div>
  );
}
