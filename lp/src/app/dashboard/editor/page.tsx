'use client'; // For App Router, ensure client-side rendering

import Button from '@/app/components/ui/Button';
//import Editor from './components/Editor'
import { useUserStore } from '@/store/userStore';

const HomePage = () => {
    const userStore = useUserStore(state => state)
    return (
        <>
            <div className='flex gap-2 mb-4 justify-end'>
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
              {/* <Editor /> */}
            </div>
        </>
    );
};

export default HomePage;