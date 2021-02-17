export class User {
  email: string;
  userId: string;
  subscriptionId: string;
  subscriptionActive: boolean;
  attributes: string[];

  constructor(
    email: string,
    userId: string,
    subscriptionId: string,
    subscriptionActive: boolean,
    photoUrl = "",
    attributes: string[] = []
  ) {
    this.email = email;
    this.userId = userId;
    this.subscriptionId = subscriptionId;
    this.subscriptionActive = subscriptionActive;
    this.attributes = attributes;
  }
}
