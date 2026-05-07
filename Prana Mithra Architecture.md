# 🏗️ Prana Mithra Architecture

## 🌿 System Overview

Prana Mithra follows a modular AI-driven healthcare architecture designed for rural and low-resource communities.

The system combines:

- AI healthcare workflows
- Voice-first interaction
- Multilingual support
- Traditional medicine knowledge
- Community healthcare monitoring
- Modern web technologies

---

# 🧩 High-Level Architecture

```text
                     ┌──────────────────────┐
                     │      End Users       │
                     │----------------------│
                     │ • Villagers          │
                     │ • Pregnant Women     │
                     │ • ASHA Workers       │
                     │ • Healthcare Staff   │
                     └──────────┬───────────┘
                                │
                                ▼
                ┌─────────────────────────────┐
                │      Frontend Layer         │
                │-----------------------------│
                │ Next.js 15 + TypeScript     │
                │ Tailwind CSS                │
                │ Voice UI Components         │
                │ Multilingual Interface      │
                └──────────┬──────────────────┘
                           │
                           ▼
                ┌─────────────────────────────┐
                │     Application Layer       │
                │-----------------------------│
                │ App Router Pages            │
                │ Server Actions              │
                │ React Components            │
                │ Form Validation             │
                └──────────┬──────────────────┘
                           │
                           ▼
                ┌─────────────────────────────┐
                │        AI Engine            │
                │-----------------------------│
                │ Genkit AI Flows             │
                │ Gemini AI Models            │
                │ NLP Processing              │
                │ Image Analysis              │
                │ Risk Prediction             │
                └──────────┬──────────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        │                  │                  │
        ▼                  ▼                  ▼

┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│ Symptom AI     │ │ Visual Scanner │ │ Plant AI       │
│ Analysis       │ │ Image Analysis │ │ Identification │
└────────────────┘ └────────────────┘ └────────────────┘

┌────────────────┐ ┌────────────────┐ ┌────────────────┐
│ Pregnancy Risk │ │ Outbreak       │ │ Knowledge      │
│ Prediction     │ │ Prediction     │ │ Copilot        │
└────────────────┘ └────────────────┘ └────────────────┘

                           │
                           ▼
                ┌─────────────────────────────┐
                │      Support Services       │
                │-----------------------------│
                │ Localization Engine         │
                │ Voice Processing            │
                │ Healthcare Data Utils       │
                │ Facility Locator            │
                └─────────────────────────────┘
```

---

# 🧠 AI Workflow Architecture

```text
User Input
   │
   ▼
Frontend Form / Voice Input
   │
   ▼
Server Actions
   │
   ▼
Genkit AI Flow
   │
   ▼
Gemini AI Model
   │
   ▼
AI Response Processing
   │
   ▼
Frontend Display / Audio Output
```

---

# 📂 Module Architecture

## 1️⃣ Frontend Layer

Handles user interaction and accessibility.

### Technologies
- Next.js 15
- TypeScript
- Tailwind CSS
- Radix UI

### Responsibilities
- UI rendering
- Form handling
- Voice interaction
- Navigation
- Localization support

### Main Folders
```bash
src/app/
src/components/
src/hooks/
```

---

# 2️⃣ AI Processing Layer

Core intelligence system of the platform.

### Technologies
- Genkit
- Google Gemini AI

### Responsibilities
- Symptom analysis
- Image interpretation
- Pregnancy risk prediction
- Outbreak prediction
- Herbal medicine assistance
- Voice generation

### Main Folder
```bash
src/ai/flows/
```

---

# 3️⃣ Application Logic Layer

Acts as the bridge between UI and AI services.

### Responsibilities
- Request handling
- Data transformation
- Validation
- Server actions
- State management

### Main Components
```bash
actions.ts
page.tsx
lib/
```

---

# 4️⃣ Localization Layer

Supports multilingual healthcare access.

### Responsibilities
- Language translations
- Regional accessibility
- Dynamic language switching

### Main Files
```bash
src/locales/
src/lib/i18n/
```

---

# 5️⃣ Voice Interaction Layer

Enables low-literacy accessibility.

### Features
- Speech-to-text
- Text-to-speech
- Voice navigation

### Main Files
```bash
src/components/voice-input.tsx
src/components/text-to-speech.tsx
src/ai/flows/text-to-speech.ts
```

---

# 🧬 AI Flow Architecture

| AI Flow | Purpose |
|---|---|
| `ai-symptom-checker.ts` | Symptom analysis |
| `ai-powered-visual-symptom-scanner.ts` | Disease image detection |
| `herbal-plant-identifier.ts` | Medicinal plant recognition |
| `traditional-knowledge-ai-copilot.ts` | Traditional healthcare guidance |
| `digital-twin-outbreak-prediction.ts` | Outbreak forecasting |
| `ai-powered-early-warning-pregnancies.ts` | Pregnancy risk prediction |
| `text-to-speech.ts` | Voice response generation |

---

# 🔄 Data Flow Architecture

```text
User
 │
 ▼
Frontend UI
 │
 ▼
Server Action
 │
 ▼
AI Flow (Genkit)
 │
 ▼
Gemini AI
 │
 ▼
Processed Result
 │
 ▼
UI Response / Voice Output
```

---

# 🌍 Multilingual Architecture

```text
User Language Selection
          │
          ▼
Language Provider
          │
          ▼
Translation JSON Files
          │
          ▼
Localized UI Rendering
```

---

# 🔐 Security & Reliability

## Planned Security Features
- Environment variable protection
- Secure API handling
- Input validation using Zod
- Server-side processing
- Controlled AI prompts

## Future Improvements
- Authentication
- Role-based access
- Encrypted healthcare records
- Offline sync support

---

# ☁️ Deployment Architecture

```text
                 ┌────────────────┐
                 │   GitHub Repo  │
                 └───────┬────────┘
                         │
                         ▼
                 ┌────────────────┐
                 │  Vercel /      │
                 │ Firebase Host  │
                 └───────┬────────┘
                         │
                         ▼
                 ┌────────────────┐
                 │  Next.js App   │
                 └───────┬────────┘
                         │
                         ▼
                 ┌────────────────┐
                 │  Genkit AI     │
                 │  Services      │
                 └────────────────┘
```

---

# 📦 Folder Structure Architecture

```bash
src/
│
├── ai/                 # AI workflows
│   └── flows/
│
├── app/                # Next.js pages
│
├── components/         # Shared UI components
│
├── hooks/              # React hooks
│
├── lib/                # Utility functions
│
├── locales/            # Translation files
│
└── styles/             # Styling
```

---

# 🚀 Scalability Design

Prana Mithra follows modular architecture for future scalability.

### Easily Extendable Areas
- Add new AI healthcare modules
- Add more regional languages
- Add offline support
- Integrate IoT health devices
- Add real-time monitoring
- Connect hospital databases
- Add wearable integrations

---

# ❤️ Architecture Goal

The architecture is designed to build:

- Accessible healthcare technology
- AI-driven rural assistance
- Low-literacy-friendly systems
- Multilingual healthcare access
- Community-centered digital healthcare
- Scalable social-impact infrastructure