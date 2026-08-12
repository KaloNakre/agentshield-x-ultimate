class SecurityModelRouter:
    def route(self, request):
        if "prompt" in request:
            return {"target": "injection_detector"}
        return {"target": "default_model"}
