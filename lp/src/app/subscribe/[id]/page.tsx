"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Button from '@/app/components/ui/Button';
import { UserData } from '@/app/types/userData';
import { redirect } from 'next/navigation';

import { getUserById, addRecipient } from '@/app/services/user/userService';
import Image from 'next/image';
import Link from 'next/link';

export default function SubscribePage() {
    const [email, setEmail] = useState('');
    const [isSubscribed, setIsSubscribed] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [user, setUser] = useState<UserData | null>(null);
    const [error, setError] = useState('');
    const { id } = useParams();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Simple email validation
        if (!/\S+@\S+\.\S+/.test(email)) {
            setError('Por favor, insira um email válido');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            // TODO: Replace with your actual API endpoint
            await addRecipient({
                userId: id as string,
                recipient: email
            });

            setIsLoading(false);
            setIsSubscribed(true);
            setEmail('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro ao processar sua inscrição');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getUserById(id as string);
                setUser(user?.user);
                console.log(user);
            } catch (error) {
                console.error(error);
                redirect('/');
            }
        };
        fetchUser();
    }, [id]);

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <Link href="/">
                        <Image
                            src="/img/bananasend-logo.png"
                            alt="Bananasend Logo"
                            width={100}
                            height={100}
                        />
                    </Link>
                </div>
                <h2 className="mt-6 text-center text-3xl px-4 md:px-0 md:text-3xl font-extrabold text-gray-900">
                    {isSubscribed ? 'Inscrição confirmada!' : `Inscreva-se na Newsletter de ${user?.username}`}
                </h2>
                {!isSubscribed && (
                    <p className="mt-2 text-center text-md md:text-sm text-gray-600 px-4">
                        Junte-se aos outros leitores ativos e receba atualizações sobre o mundo de {user?.onboarding.occupation}:
                    </p>
                )}
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="md:bg-white py-8 px-4 md:shadow sm:rounded-lg sm:px-10">
                    {isSubscribed ? (
                        <div className="text-center">
                            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                                <svg
                                    className="h-6 w-6 text-green-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                            </div>
                            <h3 className="mt-3 text-lg font-medium text-gray-900">Inscrição realizada com sucesso!</h3>
                            <p className="mt-2 text-sm text-gray-500">
                                Agora você receberá nossas atualizações no email informado.
                            </p>
                        </div>
                    ) : (
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div>
                                <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="bg-white appearance-none block w-full px-3 py-2 text-lg md:text-sm border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                                        placeholder="Seu Email Principal"
                                    />
                                </div>
                                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                            </div>

                            <div>
                                <Button
                                    value={isLoading ? 'Carregando...' : 'Inscrever-se (Grátis)'}
                                    className='w-full py-2 px-4 text-lg md:text-sm shadow-lg'
                                    onClick={handleSubmit}
                                />
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
}
