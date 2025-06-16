import { useState } from "react";
import UserProfileModal from "./UserProfileModal";

export default function UserButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-4 py-2 text-black rounded-full border hover:shadow transition"
      >
        <span className="text-sm font-semibold">Opina</span>
      </button>
      <UserProfileModal
        open={open}
        setOpen={setOpen}
      />
    </>
  );
}
