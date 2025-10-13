'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ElementType, EditorElement } from './EditorTree';
import { GripVertical } from 'lucide-react';
import { useEffect, useRef } from 'react';

interface SortableItemProps {
  element: EditorElement;
  isNew: boolean;
  onFocused: () => void;
  handleContentChange: (e: React.ChangeEvent<HTMLTextAreaElement>, id: string) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>, id: string, content: string) => void;
  deleteElement: (id: string) => void;
  getElementStyle: (type: ElementType) => string;
}

export function SortableItem({ element, isNew, onFocused, handleContentChange, handleKeyDown, deleteElement, getElementStyle }: SortableItemProps) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id: element.id });
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (isNew && textareaRef.current) {
      textareaRef.current.focus();
      onFocused();
    }
  }, [isNew, onFocused]);

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const renderElement = () => {
    switch (element.type) {
      case 'hr':
        return <hr className={getElementStyle(element.type)} />;
      case 'image':
        return (
          <div className="relative group outline-none">
            <img src={element.content} alt="Imagem inserida pelo usuário" className="max-w-full h-auto rounded-md" />
            <button
              onClick={() => deleteElement(element.id)}
              className="absolute top-2 right-2 bg-red-600 text-white w-6 h-6 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity text-sm"
              aria-label="Deletar imagem"
            >
              X
            </button>
          </div>
        );
      default:
        return (
          <textarea
            ref={textareaRef}
            data-editor-element={element.id}
            className={`w-full multiline outline-none bg-transparent resize-none overflow-hidden ${getElementStyle(element.type)}`}
            value={element.content}
            onChange={(e) => handleContentChange(e, element.id)}
            onKeyDown={(e) => handleKeyDown(e, element.id, element.content)}
            placeholder={`Digite aqui seu ${element.type}`}
            rows={1}
          />
        );
    }
  };

  return (
    <div ref={setNodeRef} style={style} className="flex items-center gap-2 group">
      <div {...attributes} {...listeners} className="cursor-grab touch-none opacity-0 group-hover:opacity-100 transition-opacity">
        <GripVertical size={18} className="text-gray-400" />
      </div>
      <div className="flex-grow">
        {renderElement()}
      </div>
    </div>
  );
}
