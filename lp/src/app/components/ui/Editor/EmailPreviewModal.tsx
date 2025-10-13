'use client';

import { useState } from 'react';
import Button from '@/app/components/ui/Button';
import { sendMail } from '@/app/services/mail/mailService';
import { useUserStore } from "@/store/userStore";

interface EmailPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  htmlContent: string;
}

const EmailPreviewModal = ({ isOpen, onClose, htmlContent }: EmailPreviewModalProps) => {
  const [subject, setSubject] = useState('');
  const [isSending, setIsSending] = useState(false);

  const userStore = useUserStore();

  if (!isOpen) return null;

  async function handleSend() {
    if (!subject) {
      alert('Por favor, insira um assunto.');
      return;
    }

    setIsSending(true);
    await sendMail(subject, htmlContent, userStore.user?.id!);
    setIsSending(false);

    alert('E-mail enviado com sucesso!');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-800">Pré-visualização do E-mail</h2>
        </div>

        <div className="p-6 space-y-6 overflow-y-auto">
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Assunto</label>
            <input
              type="text"
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              placeholder="Assunto do seu e-mail"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Corpo do E-mail</label>

            <div className="w-full p-4 border border-gray-300 rounded-md min-h-[300px] overflow-auto">
              <div className="max-w-[600px] mx-auto">
                <div
                  className="border border-gray-100 p-4"
                  dangerouslySetInnerHTML={{ __html: htmlContent }}
                />
              </div>
            </div>
          </div>
        </div>


        <div className="p-6 flex justify-end gap-4 items-center">
          <Button
            value="Cancelar"
            onClick={onClose}
            className="border border-gray-300 w-48"
            bgColor="gray-200"
            textColor="gray-800"
            hoverBgColor="gray-300"

          />
          <Button
            value={isSending ? 'Enviando...' : 'Enviar Email'}
            onClick={handleSend}
            className="w-48"
          />

        </div>
      </div>
    </div>
  );
};

export default EmailPreviewModal;
