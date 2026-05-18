# swift-swagger-ui

Swagger UI browser for the **Swift Messaging API v2.1.0**, served via nginx. The OpenAPI spec is baked into the image at build time.

Part of the **[SwiftOps](https://github.com/mblake4u/swiftops)** stack — companion to [`swift-token-server`](https://github.com/mblake4u/swift-token-server).

> **Status note (2026-05):** SwiftOps closed out as an open-source portfolio piece. This Swagger UI continues to work. See the [SwiftOps devlog](https://github.com/mblake4u/swiftops/blob/main/docs/DEVLOG.md) for the full project arc.

## Quick start

```bash
docker run -d \
  --name swift-swagger-ui \
  -p 83:8080 \
  everyday-ai/swift-swagger-ui:v1.1.0-dev
```

Or as part of the full stack via [`swiftops`](https://github.com/mblake4u/swiftops):

```bash
cd ~/dev/github/mblake4u/swiftops && docker compose up -d
```

Then open **http://localhost:83** in your browser.

## Build

```bash
docker build -t everyday-ai/swift-swagger-ui:v1.1.0-dev .
```

The Dockerfile extends `swaggerapi/swagger-ui` and bakes in:

- `SWIFT-API-Swift-Messaging-2.1.0-swagger.yaml`
- `swagger-initializer.js` (points the UI at the baked-in spec)

## Usage

1. Start `swift-token-server` (see companion repo) and get a token:
   ```bash
   curl -s http://localhost:82/token | python3 -m json.tool
   ```

2. In the Swagger UI at http://localhost:83:
   - Select `https://sandbox.swift.com/alliancecloud/v2` in the **Servers** dropdown
   - Click **Authorize** and paste the `access_token` value

3. **CORS note:** The browser cannot call `sandbox.swift.com` directly due to CORS policy. Use the curl command shown by the UI and run it in terminal, or use the token server's `/proxy/<path>` route (which handles CORS + token injection + `X-SWIFT-Signature` on mutating requests):
   ```bash
   curl -s http://localhost:82/proxy/distributions | python3 -m json.tool
   ```

## Stop / start

```bash
docker stop swift-swagger-ui
docker start swift-swagger-ui
```

## Versioning

| Tag | Environment |
|---|---|
| `vX.Y.Z-dev` | gentoo-x13 (development) |
| `vX.Y.Z-staging` | Windows home lab |
| `vX.Y.Z` (date) | Production / hosting provider |

## Related

- [`swiftops`](https://github.com/mblake4u/swiftops) — orchestration repo + project hub + devlog
- [`swift-token-server`](https://github.com/mblake4u/swift-token-server) — OAuth token provider + CORS proxy
- [`swift-ui-client`](https://github.com/mblake4u/swift-ui-client) — FastAPI + HTMX dashboard
- [`swift-mcp-gateway`](https://github.com/mblake4u/swift-mcp-gateway) — MCP server exposing Swift API as Claude tools
- [Swift Developer Portal](https://developer.swift.com)
- Project Notion: [Swift Lab](https://www.notion.so/32caa5f988dd81279a53e570b2e74655)
