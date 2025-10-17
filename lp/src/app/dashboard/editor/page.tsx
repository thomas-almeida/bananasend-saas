'use client';

import { useRef, useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import Button from '@/app/components/ui/Button';
import { useUserStore } from '@/store/userStore';
import Editor, { ElementType } from '@/app/components/ui/Editor/EditorTree';
import EmailPreviewModal from '@/app/components/ui/Editor/EmailPreviewModal';
import { Heading1, Heading2, Heading3, Link2, Minus, Type, Image, Bold, Italic, Strikethrough, List } from 'lucide-react';
import ElementButtons from '@/app/components/ui/Editor/ElementButtons';

type EditorHandle = {
    addElement: (type: ElementType) => void;
    generateHtml: () => string;
};

const HomePage = () => {
    const { data: session } = useSession();
    const user = useUserStore((state) => state.user);
    const editorRef = useRef<EditorHandle>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [htmlContent, setHtmlContent] = useState('');

    const handleAddElement = (type: ElementType) => {
        if (editorRef.current) {
            editorRef.current.addElement(type);
        }
    };

    const handleOpenPreview = () => {
        if (editorRef.current) {
            const html = editorRef.current.generateHtml();
            console.log(html);
            // Wrap content in a padded container
            const wrappedHtml = `
                <div style="max-width: 600px; margin: 0 auto; padding: 0 20px;">
                    ${html}
                </div>
            `;
            setHtmlContent(wrappedHtml);
            setIsModalOpen(true);
        }
    };

    // Force LTR direction for the entire editor page
    useEffect(() => {
        document.documentElement.dir = 'ltr';
        return () => {
            document.documentElement.dir = ''; // Reset on unmount if needed
        };
    }, []);

    return (
        <div className="p-6 max-w-7xl mx-auto relative" dir="ltr" style={{ direction: 'ltr' }}>

            <div className='flex justify-between items-center bg-white p-2 rounded absolute w-full top-[-10px] left-0 z-10'>
                <div className='flex justify-start gap-2'>
                    <ElementButtons icon={<Heading1 color='gray' size={18} />} text="Título 1" onClick={() => handleAddElement('h1')} />
                    <ElementButtons icon={<Heading2 color='gray' size={18} />} text="Título 2" onClick={() => handleAddElement('h2')} />
                    <ElementButtons icon={<Heading3 color='gray' size={18} />} text="Título 3" onClick={() => handleAddElement('h3')} />
                    <ElementButtons icon={<Type color='gray' size={18} />} text="Texto" onClick={() => handleAddElement('p')} />
                    <ElementButtons icon={<Minus color='gray' size={18} />} text="Linha" onClick={() => handleAddElement('hr')} />
                    <ElementButtons icon={<Link2 color='gray' size={18} />} text="Link" onClick={() => handleAddElement('link')} />
                    <ElementButtons icon={<Image color='gray' size={18} />} text="Imagem" onClick={() => handleAddElement('image')} />
                </div>
                <div className='flex justify-between items-center'>
                    {user?.onboarding.mail && (
                        <Button
                            value="Preview"
                            onClick={handleOpenPreview}
                            textColor='#FFFFFF'
                            hoverBgColor='#1E40AF'
                            className="px-6 bg-blue-600 hover:bg-blue-700 rounded-md "
                        />
                    )}
                </div>
            </div>

            <div className="rounded-lg p-6 mt-6 bg-white" >
                <Editor
                    ref={editorRef}
                    userName={user?.username || user?.email?.split('@')[0]}
                    userImage={session?.user?.image || undefined}
                />
            </div>
            <EmailPreviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                htmlContent={htmlContent}
            />
        </div>
    );
};

export default HomePage;