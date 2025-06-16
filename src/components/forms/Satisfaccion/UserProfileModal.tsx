type UserProfileModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

export default function UserProfileModal({
  open,
  setOpen,
}: UserProfileModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold focus:outline-none"
          aria-label="Cerrar"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-4">Formulario de satisfacción</h2>
        <div className="space-y-4">
          {/* Aquí irá el contenido del formulario */}
        </div>
      </div>
    </div>
  );
}
