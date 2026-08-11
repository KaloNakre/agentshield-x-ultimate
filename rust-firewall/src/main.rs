use actix_web::{web, App, HttpServer, Responder, HttpResponse, middleware};
use std::env;

async fn health_check() -> impl Responder {
    HttpResponse::Ok().json(serde_json::json!({
        "status": "ONLINE",
        "service": "AgentShield-X Rust Gateway"
    }))
}

async fn firewall_proxy(req_body: String) -> impl Responder {
    // Placeholder: Parse request, rate limit, policy lookup, proxying
    // For now, returning a dummy response simulating an AI/WAF check block/allow.
    if req_body.contains("DROP TABLE") {
        HttpResponse::Forbidden().json(serde_json::json!({
            "action": "BLOCK",
            "reason": "SQL Injection detected by Rust Gateway rules"
        }))
    } else {
        HttpResponse::Ok().json(serde_json::json!({
            "action": "ALLOW",
            "reason": "Passed Rust Gateway"
        }))
    }
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    env_logger::init_from_env(env_logger::Env::new().default_filter_or("info"));
    
    let host = env::var("HOST").unwrap_or_else(|_| "0.0.0.0".to_string());
    let port = env::var("PORT").unwrap_or_else(|_| "8080".to_string());
    let bind_addr = format!("{}:{}", host, port);

    log::info!("Starting AgentShield-X Rust Firewall on {}", bind_addr);

    HttpServer::new(|| {
        App::new()
            .wrap(middleware::Logger::default())
            .route("/health", web::get().to(health_check))
            .route("/api/v1/proxy", web::post().to(firewall_proxy))
    })
    .bind(&bind_addr)?
    .run()
    .await
}
