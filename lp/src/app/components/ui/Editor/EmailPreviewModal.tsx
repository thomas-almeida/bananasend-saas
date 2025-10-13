'use client';

import { useState } from 'react';
import Button from '@/app/components/ui/Button';

interface Recipient {
  id: string;
  email: string;
}

interface EmailPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  htmlContent: string;
  recipientsList: Recipient[];
}

const EmailPreviewModal = ({ isOpen, onClose, htmlContent, recipientsList }: EmailPreviewModalProps) => {
  const [subject, setSubject] = useState('');
  const [selectedRecipients, setSelectedRecipients] = useState<string[]>([]);

  if (!isOpen) return null;

  const handleSelectRecipient = (email: string) => {
    setSelectedRecipients(prev =>
      prev.includes(email) ? prev.filter(r => r !== email) : [...prev, email]
    );
  };

  const handleSend = () => {
    if (!subject) {
      alert('Por favor, insira um assunto.');
      return;
    }
    if (selectedRecipients.length === 0) {
      alert('Por favor, selecione ao menos um destinatário.');
      return;
    }

    console.log('Enviando email:', {
      subject,
      recipients: selectedRecipients,
      body: htmlContent
    });
    alert('E-mail enviado com sucesso! (Simulação)');
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

            <div className="w-full p-4 px-32 border border-gray-300 rounded-md min-h-[300px]">
              <div
                className='border border-gray-100 p-4'
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />
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
            value="Enviar Email"
            onClick={handleSend}
            className="w-48"
          />

        </div>
      </div>
    </div>
  );
};

export default EmailPreviewModal;
