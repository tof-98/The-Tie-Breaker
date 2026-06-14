# The Tie Breaker

An interactive decision-making assistant powered by AI to help you resolve complex dilemmas and make confident choices.

## Overview

**The Tie Breaker** uses Google's Gemini AI to provide comprehensive decision analysis. Whether you're facing a difficult choice, evaluating options, or need a professional perspective on a dilemma, this tool breaks down complex decisions into:

- **Pros & Cons Analysis**: Detailed advantages and disadvantages with importance weights and categories
- **Comparison Tables**: Evaluate options against multiple decision criteria
- **SWOT Analysis**: Identify Strengths, Weaknesses, Opportunities, and Threats
- **Final Verdict**: A clear, actionable recommendation with concrete next steps

## Features

✨ AI-powered decision analysis using Google Gemini  
📊 Multi-perspective evaluation framework  
⚡ Real-time analysis with streaming responses  
🎨 Clean, intuitive user interface  
🔒 Secure API key management (server-side)  
📱 Responsive design with Tailwind CSS  

## Tech Stack

- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS
- **Backend**: Express.js, Node.js
- **AI**: Google Gemini API
- **Styling**: Tailwind CSS with Lucide React icons
- **Animations**: Motion.js
- **Build Tools**: Vite, ESBuild

## Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/tof-98/The-Tie-Breaker.git
   cd The-Tie-Breaker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure your API key**
   - Copy `.env.example` to `.env.local`
   - Add your Gemini API key:
     ```
     GEMINI_API_KEY=your_gemini_api_key_here
     ```

### Running Locally

```bash
npm run dev
```

The application will start on `http://localhost:3000`

### Building for Production

```bash
npm run build
npm start
```

## Usage

1. Enter a decision title (e.g., "Should I change careers?")
2. Provide context or additional details about your dilemma
3. Optionally add specific options to compare
4. The AI analyzes your dilemma and provides comprehensive insights
5. Review the analysis and make your decision with confidence

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Run production server
- `npm run lint` - Type-check with TypeScript
- `npm run clean` - Remove build artifacts

## API Endpoint

### POST `/api/analyze`

Analyzes a decision dilemma and returns structured insights.

**Request Body:**
```json
{
  "title": "Decision title",
  "description": "Detailed context (optional)",
  "options": ["Option 1", "Option 2"] (optional)
}
```

**Response:**
```json
{
  "options": ["Option 1", "Option 2"],
  "prosCons": { "pros": [...], "cons": [...], "summary": "..." },
  "comparisonTable": { "options": [...], "rows": [...], "winner": "...", "reasoning": "..." },
  "swot": { "strengths": [...], "weaknesses": [...], "opportunities": [...], "threats": [...], "summary": "..." },
  "verdict": "Final recommendation..."
}
```

## Security

- API keys are stored securely on the server side
- The frontend never exposes your Gemini API key
- All analysis requests are processed server-side

## Project Structure

```
.
├── server.ts           # Express server with Gemini API integration
├── index.html          # HTML entry point
├── src/                # React frontend components
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.ts  # Tailwind CSS configuration
├── package.json        # Dependencies and scripts
└── metadata.json       # AI Studio metadata
```

## License

This project is provided as-is for decision-making assistance.

## Support

For issues, questions, or feedback, please open an issue on GitHub.

---

**Make better decisions with AI-powered analysis. The Tie Breaker helps you see all angles before you decide.**
