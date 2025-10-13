import axios from 'axios';
import { useUserStore } from '../../../store/userStore';

export async function sendMail(subject: string, content: string) {
    const userStore = useUserStore.getState();
    const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/mail/send`, {
        accountId: process.env.NEXT_PUBLIC_ZOHO_ACCOUNTID,
        fromAddress: userStore.user?.email,
        toAddress: userStore.user?.recipients,
        subject,
        content
    });
    return response.data;
}
