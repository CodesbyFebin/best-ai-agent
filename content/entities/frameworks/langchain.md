---
title: "LangChain"
description: "Framework for developing applications powered by language models."
framework: "LangChain"
developer: "LangChain AI"
released: "2022"
license: "MIT"
repository: "https://github.com/langchain-ai"
status: "Active"
---

# LangChain

## Overview

LangChain is a framework for developing applications powered by language models. It provides a standard interface for connecting language models to other sources of computing, data, and APIs.

## Key Features

- **Components**: Pre-built tools for chains, agents, and memory
- **Integrations**: 100+ integrations with LLMs, data stores, and APIs
- **Chains**: Composable building blocks for LLM applications
- **Agents**: Agents that can autonomously use tools

## Architecture

```
Models → Prompts → Chains → Agents → Applications
```

## Installation

```bash
pip install langchain
```

## Python Example

```python
from langchain.llms import OpenAI
from langchain.chains import LLMTimesTwo

llm = OpenAI(temperature=0)
chain = LLMTimesTwo(llm=llm)
print(chain.run("hello"))
```

## JavaScript/TypeScript

```bash
npm install @langchain/core @langchain/community
```

## LangSmith

LangChain's observability platform for:
- Tracing chain executions
- Evaluating model outputs
- Managing prompts

## Alternatives

- **LlamaIndex**: Data-focused framework
- **Haystack**: Open-source framework by deepset
- **Llama Agents**: Agent-focused framework

## External Links

- [Official Website](https://www.langchain.com)
- [Documentation](https://python.langchain.com)
- [GitHub](https://github.com/langchain-ai)