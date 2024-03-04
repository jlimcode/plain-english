# Plain English

An idea to use LLMs to read and edit code as plain English.

## Features
- View Python code side-by-side with plain English translations
- Future:
  - [ ] Edit code in plain English
  - [ ] Validate the accuracy of translations
  - [ ] Assess the quality/accuracy of existing documentation

## Setup

Install dependencies with pip:

```bash
pip install -r requirements.txt
```

Set up your OpenAI API key. You can obtain it from the OpenAI website. Once you have it, create a .env file in the project root and add the following line:
```
OPENAI_API_KEY={your_openai_api_key}
```
Replace `{your_openai_api_key}` with your actual OpenAI API key.
