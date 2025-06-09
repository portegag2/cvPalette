
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface SummaryFormProps {
  data: string;
  onUpdate: (data: string) => void;
}

const SummaryForm = ({ data, onUpdate }: SummaryFormProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="summary">Resumen Profesional</Label>
        <Textarea
          id="summary"
          value={data}
          onChange={(e) => onUpdate(e.target.value)}
          placeholder="Escribe un resumen profesional que destaque tu experiencia, habilidades clave y objetivos profesionales. Máximo 3-4 líneas."
          className="min-h-[120px]"
        />
      </div>
      <p className="text-sm text-muted-foreground">
        Tip: Enfócate en tus habilidades más relevantes para el puesto que buscas y menciona años de experiencia.
      </p>
    </div>
  );
};

export default SummaryForm;
