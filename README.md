# swift-swagger-ui

Swagger UI browser for the Swift Messaging API 2.0, served via nginx.
The OpenAPI spec is baked into the image at build time.

Part of the **zero-footprint** setup — companion to `swift-token-server`.

## Quick start

```bash
docker run -d \
  --name swift-swagger-ui \
  -p 83:8080 \
  everyday-ai/swift-swagger-ui:20250715
```

Then open **http://localhost:83** in your browser.

## Build

```bash
docker build -t everyday-ai/swift-swagger-ui:20250715 .
```

The Dockerfile extends `swaggerapi/swagger-ui` and bakes in:
- `SWIFT-API-Swift-Messaging-2.0.0-swagger.yaml`
- `swagger-initializer.js` (points the UI at the baked-in spec)

> ℹ To upgrade to the v2.1.0 spec, replace the YAML file and rebuild.

## Usage

1. Start `swift-token-server` (see companion repo) and get a token:
   ```bash
   curl -s http://localhost:82/token | python3 -m json.tool
   ```

2. In the Swagger UI at http://localhost:83:
   - Select `https://sandbox.swift.com/alliancecloud/v2` in the **Servers** dropdown
   - Click **Authorize** and paste the `access_token` value

3. **CORS note:** The browser cannot call `sandbox.swift.com` directly due to
   CORS policy. Use the curl command shown by the UI and run it in terminal:
   ```bash
   TOKEN=$(curl -s http://localhost:82/token | \
     python3 -c "import sys,json; print(json.load(sys.stdin)['access_token'])")

   curl -s -X GET \
     'https://sandbox.swift.com/alliancecloud/v2/distributions?limit=50&offset=0' \
     -H 'accept: application/json' \
     -H "Authorization: Bearer $TOKEN" | python3 -m json.tool
   ```

## Stop / start

```bash
docker stop swift-swagger-ui
docker start swift-swagger-ui
```

## Versioning

Tags use `YYYYMMDD` format matching the build date.

## Related

- `../swift-token-server/` — OAuth token provider
- Swift Developer Portal: https://developer.swift.com
- Full runbook: Swift Microgateway Lab → Zero-Footprint Docker Runbook (Notion)
