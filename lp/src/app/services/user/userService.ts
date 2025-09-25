import axios from 'axios';
import { useUserStore } from '../../../store/userStore';

export async function getUserById(userId: string) {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${userId}`);
  return response.data;
}

export async function signIn({ username, password }: { username: string; password: string }) {
  const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users`, { username, password });
  useUserStore.getState().setUser(response.data.user);
  console.log(useUserStore.getState());
  return response.data;
}

export async function updateOnboarding(
  payload: {
    id: string;
    age: number;
    mail: string;
    workspace: string;
  }
) {
  const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/onboarding`, payload);
  useUserStore.getState().setUser({
    id: response.data.user._id,
    username: response.data.user.username,
    email: response.data.user.email,
    subscription: response.data.user.subscriptionId,
    mails: response.data.user.mails,
    onboarding: response.data.user.onboarding,
  });
  return response.data;
}

export async function addAlias(
  payload: {
    zuid: string;
    aliasEmail: string;
    userId: string;
  }) {
  const response = await axios.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/zoho/add-alias`, payload);
  return response.data;
}