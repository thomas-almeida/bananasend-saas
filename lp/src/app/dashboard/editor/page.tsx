'use client'; // For App Router, ensure client-side rendering

import Button from '@/app/components/ui/Button';
import Editor from './components/Editor'
import { useRef } from 'react';
import { useUserStore } from '@/store/userStore';

const HomePage = () => {
    const userStore = useUserStore(state => state)
    const editorRef = useRef<any>(null)

    const handleSave = async () => {
        if (editorRef.current && editorRef.current.save) {
            const data = await editorRef.current.save()
            console.log(data)
        } else {
            console.log('Editor not ready')
        }
    }

    return (
        <>
            <div className='flex gap-2 mb-4 justify-end'>
                <Button
                    value="Salvar Rascunho"
                    onClick={handleSave}
                    bgColor='#FFFFFF'
                    textColor='#000000'
                    hoverBgColor='#F3F4F6'
                    className="mb-4 w-[180px] py-2 border"
                />
               {
                    userStore.user?.onboarding.mail !== '' &&
                    <Button
                        value="Enviar"
                        onClick={() => { }}
                        textColor='#FFFFFF'
                        hoverBgColor='#1E40AF'
                        className="mb-4 w-[180px] py-2"
                    />
               }
            </div>
            <div className="border border-slate-200 rounded py-6">
                <Editor ref={editorRef} />
            </div>
        </>
    );
};

export default HomePage;