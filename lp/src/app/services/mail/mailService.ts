import axios from 'axios';
import { useUserStore } from '../../../store/userStore';

export async function sendMail(subject: string, content: string, userId: string) {
    const userStore = useUserStore.getState();

    const inlineRecipients = userStore.user?.recipients?.map(recipient => recipient).join(", ");

    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/zoho/send-mail`, {
        accountId: process.env.NEXT_PUBLIC_ZOHO_ACCOUNTID,
        fromAddress: `${userStore.user?.username} <${userStore.user?.onboarding.mail}>`,
        toAddress: inlineRecipients,
        subject,
        content,
        userId
    });
    return response.data;
}
