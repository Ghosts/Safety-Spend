export class User {
  email: string;
  userId: string;
  subscriptionId: string;
  subscriptionActive: boolean;
  bankAuthId: string;
  attributes: string[];

  constructor(
    email: string,
    userId: string,
    subscriptionId: string,
    subscriptionActive: boolean,
    bankAuthId = "",
    attributes: string[] = []
  ) {
    this.email = email;
    this.userId = userId;
    this.subscriptionId = subscriptionId;
    this.bankAuthId = bankAuthId;
    this.subscriptionActive = subscriptionActive;
    this.attributes = attributes;
  }
}
