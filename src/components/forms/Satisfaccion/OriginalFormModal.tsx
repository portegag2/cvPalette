import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const OriginalFormModal = ({ isOpen, onClose }: FormModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto relative">
        <Button 
          variant="ghost" 
          size="icon"
          className="absolute right-2 top-2"
          onClick={onClose}
        >
          <X className="h-4 w-4" />
        </Button>
        <iframe 
          src="/forms/Satisfaccion/Original/index.html"
          className="w-full h-[80vh] border-none"
          title="Original Satisfaction Form"
        />
      </div>
    </div>
  );
};

export default OriginalFormModal;
