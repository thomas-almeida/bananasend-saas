'use client'; // For App Router, ensure client-side rendering

import dynamic from 'next/dynamic';

// Dynamically import Editor component with ssr: false
const Editor = dynamic(() => import('./components/Editor'), { ssr: false, loading: () => <p>Loading Editor...</p> });

const HomePage = () => {
    return (
        <div className="border border-slate-200 rounded py-6">
            <Editor />
        </div>
    );
};

export default HomePage;