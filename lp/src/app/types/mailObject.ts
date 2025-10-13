export type MailObject = {
  subject: string;
  toAddress: string;
  sentAt: Date;
  status: string;
  messageId: string;
  zohoResponse: any;
  fromAddress: string;
}