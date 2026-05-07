
# 🌿 Prana Mithra
### Bridging Tradition and Technology for Community Health

Prana Mithra is an AI-powered rural healthcare platform designed to support communities, ASHA workers, and healthcare volunteers through multilingual, voice-first, culturally inclusive digital health services.

The platform combines modern AI healthcare assistance with traditional community knowledge to improve healthcare accessibility in underserved and tribal regions.

---

# 🚀 Live Demo

**Application:** https://pranamithra.vercel.app

---

# 📌 Problem Statement

Rural and tribal communities often face:

- Limited healthcare access
- Language and literacy barriers
- Lack of nearby medical facilities
- Delayed maternal care
- Poor awareness of government schemes
- Loss of traditional medicinal knowledge
- Difficulty identifying emergency situations early

Prana Mithra addresses these challenges through an AI-assisted, multilingual healthcare ecosystem optimized for low-resource environments.

---

# ✨ Key Features

## 🤖 AI Symptom Checker

Users can describe symptoms using text or voice input.

### Features
- AI-generated preliminary guidance
- Voice-based interaction
- Local language support
- Basic triage recommendations
- Home care vs referral suggestions

### Main Files
```bash
src/ai/flows/ai-symptom-checker.ts
src/app/symptom-checker/page.tsx
src/app/symptom-checker/actions.ts
```

---

## 📸 AI Visual Symptom Scanner

Users can upload images of wounds, rashes, swelling, or infections.

### Features
- AI image analysis
- Preliminary severity detection
- Urgent referral identification
- Rural first-level screening support

### Main Files
```bash
src/ai/flows/ai-powered-visual-symptom-scanner.ts
src/app/visual-scanner/page.tsx
src/app/visual-scanner/actions.ts
src/components/image-upload-form.tsx
```

---

## 🌿 Herbal Plant Identifier

Identifies medicinal plants and explains traditional uses.

### Features
- Plant image recognition
- Traditional medicine references
- Biodiversity knowledge preservation
- Community learning support

### Main Files
```bash
src/ai/flows/herbal-plant-identifier.ts
src/app/plant-identifier/page.tsx
src/app/plant-identifier/actions.ts
```

---

## 🤰 Maternal & Child Health Module

Tracks pregnancy stages and child healthcare milestones.

### Features
- Pregnancy monitoring
- Vaccination reminders
- Maternal healthcare awareness
- Child growth guidance

### Main Files
```bash
src/app/maternal-health/page.tsx
```

---

## 🚨 Pregnancy Risk Early Warning System

AI-based prediction support for high-risk pregnancies.

### Features
- Early risk detection
- Symptom trend analysis
- Community healthcare alerts
- ASHA worker assistance

### Main Files
```bash
src/ai/flows/ai-powered-early-warning-pregnancies.ts
src/app/pregnancy-warning/page.tsx
src/app/pregnancy-warning/actions.ts
```

---

## 🦠 Community Outbreak Prediction

Predicts possible disease outbreaks using local health data.

## Screenshot
<img width="1891" height="856" alt="image" src="https://github.com/user-attachments/assets/ff9727da-ec3f-47f6-b587-641bfc520d58" />
<img width="1858" height="865" alt="image" src="https://github.com/user-attachments/assets/545512dd-dce4-4446-b387-398c4a4cad2e" />

### Features
- Disease trend analysis
- Community heatmap concepts
- Preventive healthcare planning
- Early outbreak alerts

### Main Files
```bash
src/ai/flows/digital-twin-outbreak-prediction.ts
src/app/outbreak-prediction/page.tsx
src/app/outbreak-prediction/actions.ts
```

---

## 🧠 Traditional Knowledge AI Copilot

Combines modern medical guidance with traditional remedies.

### Features
- AI-assisted healthcare suggestions
- Traditional remedy references
- Cultural knowledge preservation
- Context-aware recommendations

### Main Files
```bash
src/ai/flows/traditional-knowledge-ai-copilot.ts
src/app/knowledge-copilot/page.tsx
src/app/knowledge-copilot/actions.ts
```

---

## 🗣️ Voice Consultation & Text-to-Speech

Voice-first healthcare interaction system.

### Features
- Speech-to-text interaction
- Audio guidance responses
- Accessibility for low-literacy users
- Voice-based navigation support

### Main Files
```bash
src/ai/flows/text-to-speech.ts
src/components/text-to-speech.tsx
src/components/voice-input.tsx
src/app/video-consult/page.tsx
```

---

## 🏥 Healthcare Facility Locator

Find nearby hospitals and healthcare facilities.

### Features
- Nearby facility listing
- Bed availability support
- Emergency accessibility
- Healthcare navigation

### Main Files
```bash
src/app/facility-locator/page.tsx
src/lib/facilities.ts
```

---

## 💊 Pharmacy Availability Tracker

Tracks medicine availability in nearby pharmacies.

### Features
- Medicine stock awareness
- Rural pharmacy assistance
- Essential medicine tracking

### Main Files
```bash
src/app/pharmacy-tracker/page.tsx
```

---

## 👩‍⚕️ ASHA Worker Dashboard

Dedicated dashboard for frontline healthcare workers.

### Features
- Patient monitoring
- Task management
- Community case tracking
- Healthcare workflow assistance

### Main Files
```bash
src/app/asha-dashboard/page.tsx
```

---

## 📖 Health Katha Storytelling

Interactive storytelling for health awareness.

### Features
- Folk-style health education
- Cultural engagement
- Audio-based awareness
- Vaccination and hygiene education

### Main Files
```bash
src/app/health-katha/page.tsx
```

---

## 📑 Government Health Schemes

Provides information about healthcare schemes and eligibility.

### Features
- Scheme awareness
- Eligibility guidance
- Rural welfare accessibility

### Main Files
```bash
src/app/schemes/page.tsx
```

---

# 🌍 Multilingual Support

The platform includes multilingual accessibility for better rural adoption.

### Supported Languages
- English
- Hindi
- Telugu
- Odia

### Localization Files
```bash
src/locales/en.json
src/locales/hi.json
src/locales/te.json
src/locales/or.json
```

---

# 🏗️ Tech Stack

| Category | Technology |
|---|---|
| Frontend | Next.js 15 |
| Language | TypeScript |
| Styling | Tailwind CSS |
| AI Framework | Genkit |
| AI Models | Google Gemini |
| UI Components | Radix UI |
| Charts | Recharts |
| Forms | React Hook Form |
| Validation | Zod |
| Deployment | Vercel / Firebase App Hosting |

---

# 📂 Project Structure

```bash
Prana_Mithra-main/
│
├── docs/                       # Documentation
├── src/
│   ├── ai/                     # AI workflows
│   ├── app/                    # Next.js pages
│   ├── components/             # Shared components
│   ├── hooks/                  # Custom hooks
│   ├── lib/                    # Utilities
│   └── locales/                # Translation files
│
├── package.json
├── tailwind.config.ts
├── next.config.ts
└── tsconfig.json
```

---

# 🧠 AI Architecture

The project uses Genkit-based AI workflows.

| Flow | Purpose |
|---|---|
| `ai-symptom-checker.ts` | Symptom analysis |
| `ai-powered-visual-symptom-scanner.ts` | Image symptom detection |
| `herbal-plant-identifier.ts` | Plant recognition |
| `traditional-knowledge-ai-copilot.ts` | Traditional healthcare assistant |
| `digital-twin-outbreak-prediction.ts` | Outbreak prediction |
| `ai-powered-early-warning-pregnancies.ts` | Pregnancy risk analysis |
| `text-to-speech.ts` | Voice response generation |

---

# ⚙️ Installation & Setup

## 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/prana-mithra.git
cd prana-mithra
```

---

## 2️⃣ Install Dependencies

```bash
npm install
```

---

## 3️⃣ Configure Environment Variables

Create a `.env` file:

```env
GOOGLE_API_KEY=your_google_gemini_api_key
```

---

## 4️⃣ Start Development Server

```bash
npm run dev
```

Application runs on:

```bash
http://localhost:9002
```

---

## 5️⃣ Run Genkit AI Server

```bash
npm run genkit:dev
```

---

# 📜 Available Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Create production build |
| `npm run start` | Start production server |
| `npm run lint` | Run lint checks |
| `npm run typecheck` | TypeScript validation |
| `npm run genkit:dev` | Start Genkit AI server |
| `npm run genkit:watch` | Start Genkit watch mode |

---

# 🎨 UI & Design Principles

### Theme Colors

| Type | Color |
|---|---|
| Primary | `#FF7043` |
| Background | `#FFE7D9` |
| Accent | `#64B5F6` |

### Design Goals
- Voice-first interaction
- Large touch-friendly UI
- Accessible navigation
- Rural-friendly design
- Cultural storytelling integration

---

# 🔐 Future Improvements

- Offline-first architecture
- Real-time emergency alerts
- SMS/USSD fallback support
- Wearable integration
- Community health heatmaps
- AI-powered voice journaling
- Secure medical data storage
- Doctor consultation integration

---

# 🌱 Social Impact

Prana Mithra aims to:

- Improve healthcare access in underserved regions
- Support frontline ASHA workers
- Reduce maternal and child healthcare risks
- Preserve traditional medicinal knowledge
- Encourage preventive healthcare practices
- Break language and literacy barriers
- Enable culturally inclusive healthcare technology

---

# 📸 Main Routes

| Route | Purpose |
|---|---|
| `/` | Landing page |
| `/symptom-checker` | AI symptom checker |
| `/visual-scanner` | Visual symptom scanner |
| `/plant-identifier` | Herbal plant detection |
| `/maternal-health` | Maternal care tracking |
| `/pregnancy-warning` | Pregnancy risk alerts |
| `/outbreak-prediction` | Outbreak analytics |
| `/facility-locator` | Healthcare locator |
| `/pharmacy-tracker` | Medicine availability |
| `/knowledge-copilot` | Traditional knowledge assistant |
| `/asha-dashboard` | ASHA worker dashboard |
| `/health-katha` | Story-based health education |
| `/schemes` | Government schemes |
| `/video-consult` | Voice/video consultation |

---

# 🤝 Contribution

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Open a pull request

---

# 📄 License

This project is intended for educational, research, and social impact purposes.

---

# ❤️ Vision

Prana Mithra is not just a healthcare application.

It is a community-centered digital health ecosystem built to make healthcare accessible, understandable, and culturally respectful for every village, tribal region, and underserved community.
## jaya sri mattaparthi
