class RiskFusionEngine:
    def evaluate(self, waf_score, ai_score):
        return {"decision": "BLOCK" if (waf_score + ai_score) > 100 else "ALLOW"}
