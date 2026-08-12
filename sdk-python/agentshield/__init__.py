import requests

class AgentShield:
    def __init__(self, api_key, endpoint="http://localhost:8000"):
        self.api_key = api_key
        self.endpoint = endpoint
        
    def analyze(self, content):
        try:
            response = requests.post(
                f"{self.endpoint}/api/analyze",
                headers={"Authorization": f"Bearer {self.api_key}"},
                json={"content": content}
            )
            return response.json()
        except Exception as e:
            return {"error": str(e), "decision": "ERROR"}
