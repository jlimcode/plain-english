from langchain_openai import ChatOpenAI
from langchain_core.prompts import ChatPromptTemplate
from langchain_core.output_parsers import StrOutputParser
from dotenv import load_dotenv
import os

import ast

load_dotenv()  # This line brings all environment variables from .env into os.environ


OPENAI_API_KEY = os.environ["OPENAI_API_KEY"]

def load_script_file(file_path: str) -> list[str]:
    """Load the text of all functions from a Python script file.

    Args:
        file_path (str): The path to the Python script file.

    Returns:
        list[str]: The text of all functions from the Python script file.
    """
    with open(file_path, "r") as file:
        script = file.read()

    # Parse the script into an abstract syntax tree (AST)
    parsed_script = ast.parse(script)

    # Extract the text of all functions from the AST
    functions = []
    for node in ast.walk(parsed_script):
        if isinstance(node, ast.FunctionDef):
            functions.append(ast.get_source_segment(script, node))

    return functions

llm = ChatOpenAI(openai_api_key=OPENAI_API_KEY)

prompt = ChatPromptTemplate.from_messages([
    ("system", "You are world class technical documentation writer."),
    ("user", """Describe in 1-3 sentences what the following Python function does.
    {function}""")
])

output_parser = StrOutputParser()

chain = prompt | llm | output_parser

def translate_function(function_text: str) -> str:
    """Translate the text of a Python function into a description.

    Args:
        function_text (str): The text of the Python function.

    Returns:
        str: A description of what the function does.
    """
    response = chain.invoke({"function": function_text})
    return response

if __name__ == "__main__":
    functions = load_script_file("sample_script.py")
    for function in functions:
        print("\033[32mORIGINAL FUNCTION:\033[0m \n")
        print(function)
        print()
        print("\033[34mTRANSLATED DESCRIPTION:\033[0m \n")
        print(translate_function(function))
        print()
