"use client"

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useUserStore } from "@/store/userStore";
import { getUserById } from "@/app/services/user/userService";

export function useUserSessionSync() {
  const { data: session } = useSession();
  const setUser = useUserStore(state => state.setUser);

  useEffect(() => {
    async function syncUser() {
      const userId = (session?.user as any)?.id;
      if (userId) {
        try {
          const response = await getUserById(userId);
          setUser({
            id: response.user._id,
            username: response.user.username,
            email: response.user.email,
            subscription: response.user.subscriptionId,
            mails: response.user.mails,
            onboarding: response.user.onboarding,
            progress: response.user.progress
          });
        } catch (e) {
          console.error('Failed to fetch user data', e);
        }
      }
    }
    syncUser();
  }, [(session?.user as any)?.id, setUser]);
}
