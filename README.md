<div align="center">

# ⚖️ LexAI

### AI Courtroom Simulator

[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![LangChain](https://img.shields.io/badge/LangChain-0.3-1C3C3C?style=for-the-badge&logo=chainlink&logoColor=white)](https://langchain.com)
[![ChromaDB](https://img.shields.io/badge/ChromaDB-0.5-FF6B35?style=for-the-badge)](https://trychroma.com)
[![Anthropic](https://img.shields.io/badge/Anthropic-Claude-D97757?style=for-the-badge)](https://anthropic.com)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--4o-412991?style=for-the-badge&logo=openai&logoColor=white)](https://openai.com)
[![Ollama](https://img.shields.io/badge/Ollama-Llama3.2-black?style=for-the-badge)](https://ollama.com)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

*Multi-LLM courtroom simulation with RAG-powered legal arguments, real-time scoring, and AI judges*

</div>

---

## 🏛️ Overview

LexAI is an interactive Greek courtroom simulator powered by multiple large language models. Each legal role — defense attorney, prosecutor, judge, and witness — is assigned a dedicated LLM with automatic fallback routing. Arguments are grounded in Greek law via a ChromaDB RAG pipeline, scored in real-time, and streamed live to the frontend.

You can play as the defense attorney yourself, or sit back and watch AI vs AI unfold.

---

## 🔧 Tech Stack

| Component | Technology |
|-----------|------------|
| Frontend | React 19, TypeScript, Vite, Tailwind CSS v4 |
| State | Zustand |
| Routing (frontend) | React Router DOM v7 |
| Backend | FastAPI, Python 3.11 |
| LLM Orchestration | LangChain 0.3 |
| LLM Providers | Anthropic Claude, OpenAI GPT-4o-mini, Ollama |
| Vector Store | ChromaDB + sentence-transformers |
| Streaming | Server-Sent Events (SSE) |
| Rate Limiting | SlowAPI |
| Containerization | Docker + Docker Compose |

---

## ✨ Features

- ⚖️ **Multi-role courtroom** — Defense, Prosecution, Judge, Witness each powered by different LLMs
- 🔀 **Automatic fallback chains** — If a provider fails, the chain falls back seamlessly
- 📚 **RAG legal context** — Greek law excerpts retrieved via ChromaDB, injected into every argument
- ⚡ **SSE streaming** — Arguments stream token by token, courtroom-style
- 🧠 **LLM-as-judge scoring** — Each argument scored 0–10 with structured output (no JSON parsing)
- 🎮 **Two modes** — Play as defense or watch AI vs AI
- 🏛️ **Authentic Greek UI** — All interface text in Greek, Cinzel + Source Serif 4 typography

---

## 🏗️ Architecture

```mermaid
graph TD
    FE[React Frontend<br/>Vite + Zustand] -->|SSE Stream| API[FastAPI Backend]
    API -->|Role routing| LLM[LLM Router]
    LLM -->|defense| ANT[Anthropic Claude<br/>claude-sonnet-4-5]
    LLM -->|prosecution| OAI[OpenAI<br/>gpt-4o-mini]
    LLM -->|judge| OLL[Ollama<br/>llama3.2]
    LLM -->|fallback| ANT
    API -->|retrieval| RAG[ChromaDB RAG<br/>sentence-transformers]
    RAG -->|legal context| LLM
    API -->|scoring| SCR[Scoring Engine<br/>structured output]
    SCR -->|ScoreResult| FE
```

---

## 🚀 Quick Start

### Prerequisites

- Python 3.11+
- Node.js 20+
- Anthropic API key and/or OpenAI API key

### With Docker

```bash
git clone https://github.com/GiorgosPanagopoulos/lexai
cd lexai

cp backend/.env.example backend/.env
# Edit backend/.env with your API keys

docker compose up --build
```

- Frontend: http://localhost:5173
- Backend: http://localhost:8000

### Manual Setup

**Backend:**
```bash
cd backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env       # fill in your API keys
uvicorn backend.main:app --reload --host 0.0.0.0 --port 8000
```

**Frontend:**
```bash
cd frontend
npm install
npm run dev
```

---

## 🎮 Usage

### Game Modes

**Υπεράσπιση (Παίξε)** — You play as the defense attorney. Type your arguments in Greek, the Prosecution and Judge respond automatically via AI.

**Παρατήρηση AI vs AI** — Watch Defense, Prosecution, and Judge debate autonomously. Pure AI courtroom drama.

### Requesting a Verdict

After each side has argued at least 3 times, the "Αίτημα Ετυμηγορίας" button activates. The Judge LLM reviews the full transcript and delivers a structured verdict: GUILTY or NOT GUILTY.

---

## 🗺️ Roadmap

- [ ] Multiplayer mode (2 users argue opposing sides)
- [ ] More case scenarios across different legal domains
- [ ] Full Greek law RAG with real Hellenic legal texts
- [ ] Appeal system (second trial with new evidence)
- [ ] Voice input for arguments

---

<div align="center">

*I build things I'd trust with something that matters.*

⚡ Built by — **Georgios Panagopoulos** — Full-Stack Developer

[![GitHub](https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white)](https://github.com/GiorgosPanagopoulos)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/georgios-panagopoulos-9253842ba)

☕ Powered by mass amounts of caffeine & mass amounts of curiosity.

</div>
