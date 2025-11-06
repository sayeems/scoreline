import { Facebook, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

export default function ShareSection({ match }) {
  const { toast } = useToast();
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.href);
    }
  }, []);

  const facebookShare = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    currentUrl
  )}`;

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      toast({
        title: "Link copied!",
        description: "You can now share it anywhere 🚀",
      });
    } catch (error) {
      console.error("Clipboard error:", error);
      toast({
        title: "Copy failed",
        description: "Please copy manually from the address bar.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="mt-8 text-center">
      <h3 className="text-sm text-gray-500 mb-3">Share this match</h3>
      <div className="flex justify-center gap-3 flex-wrap">
        {/* Facebook Share */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => window.open(facebookShare, "_blank", "noopener,noreferrer")}
        >
          <Facebook className="w-4 h-4 mr-1 text-blue-600" />
          Share on Facebook
        </Button>

        {/* Copy Link */}
        <Button variant="outline" size="sm" onClick={copyLink}>
          <Copy className="w-4 h-4 mr-1 text-gray-600" />
          Copy Link
        </Button>
      </div>
    </div>
  );
}
