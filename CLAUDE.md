# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This project creates a website that shows code translation into plain English in real-time using LLMs.

**Current State:** A working frontend mockup exists in `frontend/`. A proof-of-concept Python translation script (`translate.py`) also exists but is not yet connected to the frontend. The next step is building a Flask backend to wire them together.

**Goal:** A web interface where users paste or type code, and see a plain English explanation generated in real-time via LLM.

## Repository Structure

```
frontend/
  index.html      # Main UI — VS Code-style two-pane editor layout
  main.js         # CodeMirror setup, language selector, download handlers
  style.css       # CodeMirror overrides and inlined One Dark theme
translate.py      # Proof-of-concept translation engine (LangChain + OpenAI)
sample_script.py  # Example Python file used for demonstration
requirements.txt  # Python dependencies
```

## Frontend

The frontend is a static HTML/JS/CSS app in `frontend/`. Open `frontend/index.html` directly in a browser to run it (no build step).

**Stack:**
- **Tailwind CSS** (CDN) — layout and VS Code-style UI components
- **CodeMirror 5** (CDN) — IDE-style code editors with syntax highlighting
  - Theme: One Dark (inlined in `style.css` to avoid CDN cross-origin issues on `file://`)
  - Modes loaded: `python`, `javascript`, `markdown`
- **Vanilla JavaScript** — no framework

**UI structure:**
- VS Code-style title bar and menu bar (File, Edit, View, Translate, Help)
- Two equal-width editor panes side by side:
  - Left: code input with language selector (Python / JavaScript) and One Dark syntax highlighting
  - Right: plain English output (markdown mode)
- File menu includes "Download Code" (`.py` or `.js`) and "Download Plain English" (`.md`)

**Key files:**
- `frontend/index.html` — all markup and Tailwind config; Tailwind color palette uses a custom `vscode` namespace
- `frontend/main.js` — CodeMirror initialization, resize handling, language selector, download logic, menu bar interactivity
- `frontend/style.css` — CodeMirror height/font overrides + full One Dark token color rules

## Backend (not yet built)

**Planned stack**: Flask (Python)
- Serve `frontend/index.html`
- API endpoint to accept code + language, return plain English translation
- Reuse translation logic from `translate.py`

## Proof-of-Concept Script

```bash
pip install -r requirements.txt
# Create .env with: OPENAI_API_KEY={your_key}
python translate.py
```

Parses `sample_script.py`, sends each function to OpenAI via LangChain, and prints side-by-side colored output.

## Dependencies

- `langchain`, `langchain-openai`: LLM orchestration and OpenAI integration
- `python-dotenv`: Environment variable management
- Standard library `ast`: Python code parsing
