# AgentShield-X Ultimate

### Universal AI Security Firewall, Web Application Firewall, AI-Agent Guardrail and Security Operations Platform

AgentShield-X is a professional, industry-style defensive cybersecurity platform protecting Websites, REST APIs, AI Chatbots, LLM Applications, RAG Applications, AI Agents, Browser Sessions, and Developer APIs.

## Architecture

- **Rust Firewall Gateway**: High-performance entry point.
- **WAF Engine (Coraza + OWASP CRS)**: Deterministic traditional web protection.
- **AI Security Engine (Python + HF Transformers)**: Machine learning based detection for Prompt Injection, Jailbreaks, PII, and Secrets.
- **Risk Fusion Engine**: Combines WAF and ML signals.
- **Policy Engine**: Enforces Allow/Block decisions.
- **Security Terminal & SOC Dashboard**: Monitoring and management interfaces.

## Structure

- `frontend/`: AI-SOC Dashboard
- `rust-firewall/`: Rust Gateway
- `go-waf/`: Coraza + OWASP CRS WAF
- `python-ai/`: Hugging Face Transformers security engine
- `browser-extension/`: AgentShield-X Browser Guard
- `sdk-python/` & `sdk-js/`: Developer SDKs
- `security-terminal/`: Kali-style terminal interface
- `lab/` & `docker/`: Safe local testing environments
- `scripts/`: DevSecOps automation
- `tests/`: End-to-end and component tests
- `docs/`: Architecture and Threat Models
