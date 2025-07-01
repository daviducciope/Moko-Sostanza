export interface ISession {
  userId: string;
  email: string;
  role: 'dentist' | 'clinic' | string;
  token?: string;
  // ...altri campi sessione
}
