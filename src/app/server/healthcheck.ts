import { Application } from 'express';

/**
 * Sets up the HMCTS info and health endpoints
 */
export class HealthCheck {
  public enableFor(app: Application): void {
    // TODO Healthcheck for downstream services
    app.get('/health', (req, res) => res.json({'status': 'OK'}));
    app.get('/health/liveness', (req, res) => res.json({'status': 'OK'}))
    app.get('/health/readiness', (req, res) => res.json({'status': 'OK'}))
  }
}
