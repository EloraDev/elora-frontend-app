# Elora PWA

Elora is a Progressive Web App (PWA) for AI-powered skin analysis and diagnosis. Users can upload or capture a photo of their skin, describe their symptoms, and receive an instant AI-driven analysis. Elora is designed for accessibility, privacy, and ease of use, and works seamlessly on both desktop and mobile devices.

## Features

- **AI Skin Analysis:** Upload or take a photo and describe symptoms to get an instant AI-powered diagnosis.
- **Symptom Input:** Add symptoms manually or with quick-add buttons.
- **Step-by-Step Feedback:** See real-time progress as your data is analyzed.
- **Modern UI:** Clean, responsive design with accessibility in mind.
- **Medical Disclaimer:** Results are informational and not a substitute for professional medical advice.

## Getting Started

### 1. Clone the Repository

```sh
git clone <repo-url>
cd elora-pwa
```

### 2. Install Dependencies

```sh
pnpm install
```

### 3. Start the Development Server

```sh
pnpm dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

### 4. Build for Production

```sh
pnpm build
```

The production-ready files will be in the `dist/` directory.

### 5. Preview the Production Build

```sh
pnpm preview
```

## Project Structure

- `src/components/` — UI components, including the scan screen and result display
- `src/features/diagnosis/` — Diagnosis logic, API calls, and types
- `src/stores/` — State management (e.g., for diagnosis results)
- `src/lib/` — API client and configuration

## Configuration

- API endpoint and other settings are managed in `src/lib/config.ts`.
- Authentication tokens are stored in local storage under the key defined in `src/constants.ts`.

## Disclaimer

**Elora is not a substitute for professional medical advice, diagnosis, or treatment. Always consult a qualified healthcare provider with any questions you may have regarding a medical condition.**

---

For questions or contributions, please open an issue or pull request on the repository.
