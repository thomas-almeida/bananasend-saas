'use client';

import { useRef, useEffect, useState } from 'react';
import Button from '@/app/components/ui/Button';
import { useUserStore } from '@/store/userStore';
import Editor, { ElementType } from '@/app/components/ui/Editor/EditorTree';
import EmailPreviewModal from '@/app/components/ui/Editor/EmailPreviewModal';

type EditorHandle = {
    addElement: (type: ElementType) => void;
    generateHtml: () => string;
};

const HomePage = () => {
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
        <div className="p-6 max-w-7xl mx-auto" dir="ltr" style={{ direction: 'ltr' }}>
            <div className='flex justify-between items-center mb-6'>
                <div className='flex gap-2 flex-wrap'>
                    <Button
                        value='H1'
                        className='px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md'
                        onClick={() => handleAddElement('h1')}
                    />
                    <Button
                        value='H2'
                        className='px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md'
                        onClick={() => handleAddElement('h2')}
                    />
                    <Button
                        value='H3'
                        className='px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md'
                        onClick={() => handleAddElement('h3')}
                    />
                    <Button
                        value='Parágrafo'
                        className='px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md'
                        onClick={() => handleAddElement('p')}
                    />
                    <Button
                        value='Linha'
                        className='px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md'
                        onClick={() => handleAddElement('hr')}
                    />
                    <Button
                        value='Link'
                        className='px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md'
                        onClick={() => handleAddElement('link')}
                    />
                    <Button
                        value='Imagem'
                        className='px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md'
                        onClick={() => handleAddElement('image')}
                    />
                </div>
                {user?.onboarding.mail && (
                    <Button
                        value="Enviar"
                        onClick={handleOpenPreview}
                        textColor='#FFFFFF'
                        hoverBgColor='#1E40AF'
                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-md"
                    />
                )}
            </div>
            <div className="border border-slate-200 rounded-lg p-6 bg-white shadow-sm">
                <Editor ref={editorRef} />
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