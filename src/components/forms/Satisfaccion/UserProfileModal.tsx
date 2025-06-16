import { useState } from "react";

type UserProfileModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
};

type UsabilityRating = "excelente" | "bueno" | "regular" | "malo";
type Feature = "personalizacion" | "diseño" | "funcionalidad";

export default function UserProfileModal({
  open,
  setOpen,
}: UserProfileModalProps) {
  const [rating, setRating] = useState(5);
  const [comments, setComments] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState<boolean | null>(null);
  const [usabilityRating, setUsabilityRating] = useState<UsabilityRating | "">(
    ""
  );
  const [improvements, setImprovements] = useState("");
  const [valuedFeatures, setValuedFeatures] = useState<Feature[]>([]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={() => setOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-red-500 text-2xl font-bold focus:outline-none"
          aria-label="Cerrar"
        >
          ×
        </button>
        <h2 className="text-xl font-bold mb-6">Formulario de satisfacción</h2>
        <div className="space-y-6">
          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Calificación de la Experiencia (1-10)
            </label>
            <div className="flex items-center gap-4">
              <input
                type="range"
                min="1"
                max="10"
                step="1"
                value={rating}
                onChange={(e) => setRating(parseInt(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
              <span className="text-lg font-semibold min-w-[2ch] text-center">
                {rating}
              </span>
            </div>
          </div>

          {/* Comments */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Comentarios
            </label>
            <textarea
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full p-2 border rounded-md min-h-[100px] text-sm"
              placeholder="Cuéntanos tu experiencia..."
            />
          </div>

          {/* Would Recommend */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Recomendarías esta aplicación?
            </label>
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => setWouldRecommend(true)}
                className={`flex-1 py-2 px-4 rounded-md border transition-all ${
                  wouldRecommend === true
                    ? "bg-green-500 text-white border-green-600"
                    : "border-gray-300 hover:border-green-300 hover:bg-green-50"
                }`}
              >
                Sí
              </button>
              <button
                type="button"
                onClick={() => setWouldRecommend(false)}
                className={`flex-1 py-2 px-4 rounded-md border transition-all ${
                  wouldRecommend === false
                    ? "bg-red-500 text-white border-red-600"
                    : "border-gray-300 hover:border-red-300 hover:bg-red-50"
                }`}
              >
                No
              </button>
            </div>
          </div>

          {/* Usability Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Cómo calificarías la experiencia de manejo de la aplicación?
            </label>
            <div className="grid grid-cols-2 gap-2">
              {(["excelente", "bueno", "regular", "malo"] as const).map(
                (rating) => (
                  <button
                    key={rating}
                    type="button"
                    onClick={() => setUsabilityRating(rating)}
                    className={`py-2 px-4 rounded-md border capitalize transition-all ${
                      usabilityRating === rating
                        ? "bg-blue-500 text-white border-blue-600"
                        : "border-gray-300 hover:border-blue-300 hover:bg-blue-50"
                    }`}
                  >
                    {rating}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Improvements */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Qué mejorarías en el servicio?
            </label>
            <textarea
              value={improvements}
              onChange={(e) => setImprovements(e.target.value)}
              className="w-full p-2 border rounded-md min-h-[100px] text-sm"
              placeholder="Tus sugerencias son importantes..."
            />
          </div>

          {/* Valued Features */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ¿Qué características valoras más?
            </label>
            <div className="flex flex-wrap gap-2">
              {(["personalizacion", "diseño", "funcionalidad"] as const).map(
                (feature) => (
                  <button
                    key={feature}
                    type="button"
                    onClick={() => {
                      setValuedFeatures((prev) =>
                        prev.includes(feature)
                          ? prev.filter((f) => f !== feature)
                          : [...prev, feature]
                      );
                    }}
                    className={`py-2 px-4 rounded-md border capitalize transition-all ${
                      valuedFeatures.includes(feature)
                        ? "bg-purple-500 text-white border-purple-600"
                        : "border-gray-300 hover:border-purple-300 hover:bg-purple-50"
                    }`}
                  >
                    {feature}
                  </button>
                )
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            onClick={() => {
              // Here you would handle the form submission
              console.log({
                rating,
                comments,
                wouldRecommend,
                usabilityRating,
                improvements,
                valuedFeatures,
              });
              setOpen(false);
            }}
            className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors mt-4"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
}
