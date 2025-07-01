export interface IPatient {
  id: number;
  name: string;
  surname?: string;
  birthDate?: string;
  fiscalCode?: string;
  pathologies?: string[];
  smoker?: boolean;
  drugs?: string[];
  anamnesis?: string;
  // ...altri campi rilevanti
}
