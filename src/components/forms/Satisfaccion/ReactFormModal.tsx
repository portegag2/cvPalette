import { Dialog, DialogContent } from "@/components/ui/dialog";
import SatisfactionSurvey from "./SatisfactionSurvey";

interface ReactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ReactFormModal = ({ isOpen, onClose }: ReactFormModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
        <SatisfactionSurvey />
      </DialogContent>
    </Dialog>
  );
};

export default ReactFormModal;
