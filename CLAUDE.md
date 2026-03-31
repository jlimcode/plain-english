# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This project aims to create a simple website that shows Python code translation into plain English in real-time using LLMs.

**Current State:** The repository contains a proof-of-concept Python script (`translate.py`) that demonstrates the core translation functionality using LangChain with OpenAI's API. This script parses Python files and generates natural language explanations of functions.

**Goal:** Build a web interface where users can view and interact with code translations in real-time.

## Setup

Install dependencies:
```bash
pip install -r requirements.txt
```

Set up environment:
```bash
# Create .env file with:
OPENAI_API_KEY={your_openai_api_key}
```

## Running the Proof-of-Concept Script

Execute the main translation script:
```bash
python translate.py
```

This will:
1. Parse `sample_script.py` and extract all functions
2. Send each function to OpenAI for plain English translation
3. Display original code and translated descriptions side-by-side with colored output

**Note:** This is a proof-of-concept. The actual goal is to build a web interface for real-time code translation.

## Current Architecture (Proof-of-Concept)

The proof-of-concept consists of two main files:

**translate.py** - Core translation engine:
- `load_script_file(file_path)`: Uses Python's `ast` module to parse Python files and extract function definitions as text segments
- `translate_function(function_text)`: Uses LangChain's prompt template + LLM + output parser chain to convert function code into natural language descriptions
- Main execution loop that processes all functions from the target file

**sample_script.py** - Example Python file used for demonstration

The translation pipeline follows this flow:
1. AST parsing extracts function source code segments
2. LangChain prompt templates format the code for the LLM
3. OpenAI's ChatGPT generates plain English descriptions
4. Results are displayed with ANSI color codes (green for original, blue for translation)

## Target Architecture (Web Application)

The web application will use a simple, fast stack:

**Backend**: Flask (Python)
- Lightweight Python web framework
- API endpoint(s) to handle code translation requests
- Reuse core translation logic from `translate.py`

**Frontend**: HTML + JavaScript + Tailwind CSS
- Basic HTML served by Flask
- Vanilla JavaScript for interactivity
- Tailwind CSS for styling (no build step needed with CDN)
- Side-by-side display of code and translations
- Real-time updates as translations are generated

## Dependencies

- `langchain` and `langchain-openai`: LLM orchestration and OpenAI integration
- `python-dotenv`: Environment variable management for API keys
- Standard library `ast` module: Python code parsing and analysis
