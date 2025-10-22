
import { MailObject } from "./mailObject";


export type UserData = {
  id: string;
  email: string;
  username: string;
  mails: MailObject[] | null;
  recipients: string[] | null;
  subscription: string;
  onboarding: {
    age: number;
    occupation: string;
    linkedinUrl: string;
    workspace: string;
    mail: string;
  };
  progress: {
    level: number;
    currentPoints: number;
    actions: string[]
  },
  publicPage: {
    title: string;
    description: string;
  }
};
