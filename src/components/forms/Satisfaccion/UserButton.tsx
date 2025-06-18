import { useState } from "react";
import UserProfileModal from "./UserProfileModal";
import { Button } from "@/components/ui/button";
import { MessageSquare } from "lucide-react";

export default function UserButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setOpen(true)}
        className="h-[length:var(--btn-size,1.5rem)] min-h-0 px-[length:var(--btn-padding,0.5rem)] flex items-center justify-center gap-2"
        style={{
          ['--btn-size' as string]: window.innerWidth < 400 ? '1.25rem' : '1.5rem',
          ['--btn-padding' as string]: window.innerWidth < 400 ? '0.25rem' : '0.5rem'
        }}
      >
        <MessageSquare className="w-[length:var(--icon-size,0.75rem)] h-[length:var(--icon-size,0.75rem)]" style={{['--icon-size' as string]: window.innerWidth < 370 ? '0.6rem' : '0.75rem'}} />
        <span className="hidden sm:inline">Opina</span>
      </Button>
      <UserProfileModal
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
