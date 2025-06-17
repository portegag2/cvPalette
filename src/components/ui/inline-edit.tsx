import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Edit2, Save, X } from "lucide-react";

interface InlineEditProps {
  value: string;
  onSave: (value: string) => void;
  className?: string;
  textClassName?: string;
  multiline?: boolean;
}

const InlineEdit = ({ 
  value, 
  onSave, 
  className = "", 
  textClassName = "",
  multiline = false 
}: InlineEditProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !multiline) {
      handleSave();
    } else if (e.key === 'Escape') {
      handleCancel();
    }
  };

  return (
    <div className={`group relative ${className}`}>
      {/* Panel de botones vertical */}
      <div className="absolute -left-10 flex flex-col gap-[3px] opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          size="sm"
          variant="ghost"
          onClick={() => setIsEditing(true)}
          disabled={isEditing}
          className="p-0.5 h-auto rounded-full hover:bg-gray-100"
          style={{ marginTop: '-9px' }}
        >
          <Edit2 className="w-3 h-3 text-gray-600" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleSave}
          disabled={!isEditing}
          className="p-0.5 h-auto rounded-full hover:bg-gray-100 disabled:opacity-30"
        >
          <Save className="w-3 h-3 text-gray-600" />
        </Button>
        <Button
          size="sm"
          variant="ghost"
          onClick={handleCancel}
          disabled={!isEditing}
          className="p-0.5 h-auto rounded-full hover:bg-gray-100 disabled:opacity-30"
        >
          <X className="w-3 h-3 text-gray-600" />
        </Button>
      </div>

      {/* Contenido editable */}
      {isEditing ? (
        <div>
          {multiline ? (
            <Textarea
              ref={inputRef as React.RefObject<HTMLTextAreaElement>}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[100px] w-full resize-none"
            />
          ) : (
            <Input
              ref={inputRef as React.RefObject<HTMLInputElement>}
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full"
            />
          )}
        </div>
      ) : (
        <div 
          className={`${textClassName} cursor-text hover:bg-gray-50 rounded px-1 -mx-1 transition-colors`}
          onClick={() => setIsEditing(true)}
        >
          {value}
        </div>
      )}
    </div>
  );
};

export default InlineEdit;
