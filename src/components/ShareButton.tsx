import { Button } from "./Button";
import { useState } from "react";

interface ShareButtonProps {
  gameId: string;
  className?: string;
}

export const ShareButton: React.FC<ShareButtonProps> = ({ gameId, className }) => {
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/play/${gameId}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback for browsers that don't support clipboard API
      const textArea = document.createElement("textarea");
      textArea.value = shareUrl;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand("copy");
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      variant="outline"
      onClick={handleShare}
      className={className}
      title="Share game for spectating"
    >
      {copied ? "Copied!" : "Share"}
    </Button>
  );
};