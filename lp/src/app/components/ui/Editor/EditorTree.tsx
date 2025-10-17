import { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { SortableItem } from './SortableItem';

export type ElementType = 'h1' | 'h2' | 'h3' | 'p' | 'hr' | 'link' | 'image';

export interface EditorElement {
  id: string;
  type: ElementType;
  content: string;
}

interface EditorTreeProps {
  userName?: string;
  userImage?: string;
}

interface EditorTreeRef {
  addElement: (type: ElementType) => void;
  generateHtml: () => string;
}

const EditorTree = forwardRef<EditorTreeRef, EditorTreeProps>(({ userName, userImage }, ref) => {
  const [elements, setElements] = useState<EditorElement[]>(() => {
    // Default elements when the editor is first rendered
    return [
      {
        id: '1',
        type: 'h1',
        content: 'Novo Conteúdo!'
      },
      {
        id: '2',
        type: 'p',
        content: 'Comece aqui!'
      }
    ];
  });
  const [newElementId, setNewElementId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const addElement = (type: ElementType): EditorElement => {
    const newElement: EditorElement = {
      id: Date.now().toString(),
      type,
      content: '',
    };

    if (type === 'image') {
      const url = window.prompt('Insira a URL da imagem:');
      if (url) {
        newElement.content = url;
        setElements(prev => [...prev, newElement]);
      }
    } else {
      newElement.content = type === 'hr' ? 'hr' : '';
      setElements(prev => [...prev, newElement]);
    }
    return newElement;
  };

  useEffect(() => {
    const savedElements = localStorage.getItem('editor-content');
    if (savedElements) {
      setElements(JSON.parse(savedElements));
    }
  }, []);

  useEffect(() => {
    // This effect runs only on the client, after the initial render,
    // so it won't cause a hydration mismatch.
    localStorage.setItem('editor-content', JSON.stringify(elements));
  }, [elements]);

  const getElementInlineStyle = (type: ElementType) => {
    switch (type) {
      case 'h1': return 'font-size: 1.875rem; line-height: 2.25rem; font-weight: 700;';
      case 'h2': return 'font-size: 1.5rem; line-height: 2rem; font-weight: 700;';
      case 'h3': return 'font-size: 1.25rem; line-height: 1.75rem; font-weight: 600;';
      case 'p': return 'font-size: 1rem; line-height: 1.5rem;';
      case 'link': return 'color: #2563EB; text-decoration: underline;';
      default: return '';
    }
  };

  const generateHtml = () => {
    // Generate user header if user info is available
    const userHeader = userName ? `
      <div style="display: flex; align-items: center; margin-top: 1.5rem; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #E5E7EB;">
        ${userImage ? `
          <div style="width: 30px; height: 30px; border-radius: 100%; overflow: hidden; margin-right: 5px; flex-shrink: 0;">
            <img src="${userImage}" alt="${userName}'s profile" style="width: 100%; height: 100%; object-fit: cover;" />
          </div>
        ` : ''}
        <p style="margin: 0; font-weight: 500; color: #111827;">${userName}</p>
      </div>
    ` : '';

    const emailContent = elements.map(el => {
      const style = getElementInlineStyle(el.type);
      switch (el.type) {
        case 'h1': return `<h1 style="${style}">${el.content}</h1>`;
        case 'h2': return `<h2 style="${style}">${el.content}</h2>`;
        case 'h3': return `<h3 style="${style}">${el.content}</h3>`;
        case 'p': return `<p style="${style} margin: 0.5rem 0;">${el.content}</p>`;
        case 'hr': return '<hr style="border-top: 1px solid #D1D5DB; margin-top: 1rem; margin-bottom: 1rem;" />';
        case 'link': return `<a href="${el.content}" style="${style}">${el.content}</a>`;
        case 'image': return `<img src="${el.content}" alt="" style="width: 100%; margin-bottom: 1rem; height: auto; border-radius: 0.375rem;" />`;
        default: return '';
      }
    }).join('');

    // Add Bananasend footer to the email
    const footer = `
      <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid #E5E7EB; text-align: center; color: #6B7280; font-size: 0.875rem;">
        <p style="margin: 0.5rem 0;">Enviado com 🍌 usando</p>
        <div style="display: flex; justify-content: center; align-items: center; text-align: center; margin-top: 0.5rem;">
          <img src="https://lh3.googleusercontent.com/d/1_8anpY-Y9h8iNs92jMQ7y_DpfndD2pep=w640?authuser=0" alt="Bananasend" style="height: 24px; width: auto;" />
        </div>
        <p style="margin: 0.5rem 0 0; font-size: 0.75rem;">Amadarureça seu trampo com <a href="https://bananasend.top" style="color: #3B82F6; text-decoration: none;">bananasend.top</a></p>
      </div>
    `;

    return userHeader + emailContent + footer;
  };

  useImperativeHandle(ref, () => ({
    addElement,
    generateHtml
  }));

  const deleteElement = (id: string, focusPrevious: boolean = true) => {
    setElements(prev => {
      const index = prev.findIndex(el => el.id === id);
      if (index > 0 && focusPrevious) {
        // Focus the previous element after the state updates
        setTimeout(() => {
          const prevElement = document.querySelector(`[data-editor-element="${prev[index - 1].id}"]`) as HTMLTextAreaElement;
          if (prevElement) {
            prevElement.focus();
            // Move cursor to the end of the previous element
            const length = prevElement.value.length;
            prevElement.setSelectionRange(length, length);
          }
        }, 0);
      }
      return prev.filter(el => el.id !== id);
    });
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>, id: string) => {
    const textarea = e.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;

    setElements(elements.map(el =>
      el.id === id ? { ...el, content: textarea.value } : el
    ));
  };

  const getElementStyle = (type: ElementType) => {
    switch (type) {
      case 'h1': return 'text-3xl font-bold';
      case 'h2': return 'text-2xl font-bold';
      case 'h3': return 'text-xl font-semibold';
      case 'p': return 'text-base';
      case 'hr': return 'border-t border-gray-300 w-full';
      case 'link': return 'text-blue-600 hover:underline cursor-pointer';
      default: return '';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>, id: string, content: string) => {
    const modifierKey = e.ctrlKey || e.metaKey;

    if (modifierKey && e.altKey) {
      switch (e.key) {
        case '1':
          e.preventDefault();
          addElement('h1');
          break;
        case '2':
          e.preventDefault();
          addElement('h2');
          break;
        case '3':
          e.preventDefault();
          addElement('h3');
          break;
        default:
          break;
      }
    }

    if (modifierKey && e.key === 'k') {
      e.preventDefault();
      addElement('link');
    }

    if (modifierKey && e.shiftKey && e.key === '_') { // Corresponds to 'Ctrl+Shift+-' on many layouts
      e.preventDefault();
      addElement('hr');
    }

    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      const newElement = addElement('p');
      setNewElementId(newElement.id);
    }

    if (e.key === 'Backspace' && content === '') {
      e.preventDefault();
      // Only focus previous if this is not the first element
      const currentIndex = elements.findIndex(el => el.id === id);
      deleteElement(id, currentIndex > 0);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      setElements((items) => {
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full" style={{ direction: 'ltr' }}>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={elements} strategy={verticalListSortingStrategy}>
          <div className="flex flex-col gap-4 p-4">
            {elements.map(element => (
              <SortableItem
                key={element.id}
                element={element}
                isNew={element.id === newElementId}
                onFocused={() => setNewElementId(null)}
                handleContentChange={handleContentChange}
                onKeyDown={handleKeyDown}
                deleteElement={deleteElement}
                getElementStyle={getElementStyle}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>
      {elements.length === 0 && (
        <div className="p-4">
          <textarea
            className={`w-full outline-none bg-transparent resize-none overflow-hidden ${getElementStyle('p')}`}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                addElement('p');
              }
            }}
            placeholder="Comece a digitar..."
            rows={1}
          />
        </div>
      )}
    </div>
  );
});

EditorTree.displayName = 'EditorTree';

export default EditorTree;