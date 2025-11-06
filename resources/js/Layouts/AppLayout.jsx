import { Link, Head } from "@inertiajs/react";

export default function AppLayout({ title, children }) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Head> 
        <title>{title || "Scoreline"}</title>
        {/* ✅ Favicon setup */}
            <link rel="icon" type="image/x-icon" href="/favicon.ico" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </Head>

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href={route("matches.index")} className="flex items-center gap-2">
            {/* Replace Football with your real logo */}
            <img src="/scoreline-nobg.png" alt="Scoreline" className="h-6 w-auto" />
            <span className="font-semibold text-lg tracking-tight">Scoreline</span>
          </Link>
        </div>
      </header>

      {/* Page Content */}
      <main className="pt-[64px]">{children}</main>
    </div>
  );
}
