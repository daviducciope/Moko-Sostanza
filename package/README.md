# MOKO SOSTANZA Dental CRM - Gestionale per Dentisti

![MOKO SOSTANZA Dental CRM](./src/assets/images/logos/dental-crm-logo-basic.svg)

Un sistema di gestione completo per studi dentistici e cliniche odontoiatriche, sviluppato con React, TypeScript e Tailwind CSS.

## 🚀 Caratteristiche

- **Dashboard interattiva**: Visualizza metriche chiave come appuntamenti, nuovi pazienti e fatturato
- **Gestione pazienti**: Registra, visualizza e modifica informazioni sui pazienti
- **Gestione appuntamenti**: Pianifica e gestisci appuntamenti con calendario integrato
- **Fatturazione**: Crea e gestisci fatture, con reportistica finanziaria
- **Gestione trattamenti**: Catalogo completo dei trattamenti offerti
- **Gestione inventario**: Monitora prodotti e materiali
- **Interfaccia multi-ruolo**: Viste separate per dentisti e personale della clinica
- **Design responsive**: Funziona su desktop, tablet e dispositivi mobili
- **Tema chiaro/scuro**: Supporto per modalità chiara e scura

## 📋 Prerequisiti

Prima di iniziare, assicurati di avere installato:

- Node.js (versione 18.x o superiore)
- npm (versione 9.x o superiore)

## 🔧 Installazione

1. Clona il repository:
   ```bash
   git clone https://github.com/tuousername/moko-sostanza-dental-crm.git
   cd moko-sostanza-dental-crm/package
   ```

2. Installa le dipendenze:
   ```bash
   npm install
   ```

3. Avvia il server di sviluppo:
   ```bash
   npm run dev
   ```

4. Apri il browser e vai a:
   ```
   http://localhost:5173
   ```

## 🏗️ Struttura del progetto

```
package/
├── public/              # File statici
├── src/
│   ├── assets/          # Immagini, font e altri asset
│   ├── components/      # Componenti riutilizzabili
│   ├── constants/       # Costanti e configurazioni
│   ├── css/             # File CSS globali e di layout
│   ├── hooks/           # Custom React hooks
│   ├── layouts/         # Layout dell'applicazione
│   ├── routes/          # Configurazione del routing
│   ├── utils/           # Funzioni di utilità
│   ├── views/           # Componenti pagina
│   ├── App.tsx          # Componente principale
│   └── main.tsx         # Entry point
├── package.json         # Dipendenze e script
└── vite.config.ts       # Configurazione di Vite
```

## 🔄 Flusso di lavoro

### Autenticazione

Il sistema supporta due tipi di utenti:
- **Dentisti**: Accesso alla dashboard personale, pazienti, appuntamenti e fatturazione
- **Clinica**: Accesso alla dashboard della clinica, gestione dei dottori, personale e risorse

### Navigazione

- La barra laterale sinistra contiene il menu principale, organizzato per categorie
- La barra superiore mostra il logo e le informazioni dell'utente
- La barra laterale destra mostra notifiche e appuntamenti imminenti

## 🛠️ Tecnologie utilizzate

- **React**: Libreria UI
- **TypeScript**: Tipizzazione statica
- **Vite**: Build tool
- **React Router**: Routing
- **Tailwind CSS**: Framework CSS
- **Flowbite**: Componenti UI
- **ApexCharts**: Grafici e visualizzazioni
- **Formik**: Gestione form
- **Yup**: Validazione form
- **Zustand**: Gestione stato (opzionale)

## 📱 Modalità responsive

L'applicazione è completamente responsive:
- **Desktop**: Layout completo con sidebar destra e sinistra
- **Tablet**: Layout adattivo con sidebar collassabile
- **Mobile**: Layout ottimizzato per schermi piccoli

## 🔐 Gestione utenti

Per simulare diversi tipi di utenti, puoi utilizzare:

```javascript
// Per simulare un utente dentista
localStorage.setItem('user-session', JSON.stringify({
  user: {
    email: 'dentista@esempio.com',
    role: 'dentist'
  }
}));

// Per simulare un utente clinica
localStorage.setItem('user-session', JSON.stringify({
  user: {
    email: 'clinica@esempio.com',
    role: 'clinic'
  }
}));
```

Ricarica la pagina dopo aver impostato la sessione utente.

## 🔍 Funzionalità principali

### Dashboard

- **Appuntamenti oggi**: Numero di appuntamenti per la giornata corrente
- **Nuovi pazienti**: Statistiche sui nuovi pazienti
- **Incasso mensile**: Grafico dell'andamento degli incassi
- **Prossimi appuntamenti**: Lista degli appuntamenti imminenti
- **Statistiche trattamenti**: Grafici sui trattamenti più frequenti

### Gestione pazienti

- Elenco completo dei pazienti
- Schede dettagliate per ogni paziente
- Funzionalità di ricerca e filtro
- Aggiunta e modifica dei dati dei pazienti

### Gestione appuntamenti

- Calendario interattivo
- Prenotazione rapida
- Vista giornaliera, settimanale e mensile
- Notifiche per appuntamenti imminenti

### Fatturazione

- Creazione fatture
- Elenco fatture emesse
- Ricerca e filtro fatture
- Reportistica finanziaria

## 🧪 Testing

Per eseguire i test:

```bash
npm run test
```

## 🏭 Build per produzione

Per creare una build ottimizzata per la produzione:

```bash
npm run build
```

I file compilati saranno disponibili nella cartella `dist/`.

## 🤝 Contribuire

Le contribuzioni sono benvenute! Per favore, segui questi passaggi:

1. Forka il repository
2. Crea un branch per la tua feature (`git checkout -b feature/amazing-feature`)
3. Committa i tuoi cambiamenti (`git commit -m 'Aggiungi una feature incredibile'`)
4. Pusha al branch (`git push origin feature/amazing-feature`)
5. Apri una Pull Request

## 📄 Licenza

Questo progetto è distribuito con licenza MIT. Vedi il file `LICENSE` per maggiori informazioni.

## 📞 Contatti

Per domande o supporto, contatta:
- Email: info@mokosostanza.com
- Website: [www.mokosostanza.com](https://www.mokosostanza.com)

---

Sviluppato con ❤️ da MOKO SOSTANZA
