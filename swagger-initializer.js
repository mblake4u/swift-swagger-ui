window.onload = function() {
    window.ui = SwaggerUIBundle({
      url: "SWIFT-API-Swift-Messaging-2.1.0-swagger.yaml",
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      plugins: [
        SwaggerUIBundle.plugins.DownloadUrl
      ],
      layout: "StandaloneLayout",
      requestInterceptor: (request) => {
        // Rewrite sandbox.swift.com calls through the local proxy (CORS fix).
        // The proxy injects a Bearer token automatically — no Authorize step needed.
        if (request.url.includes("sandbox.swift.com")) {
          request.url = request.url.replace(
            "https://sandbox.swift.com/alliancecloud/v2",
            "http://localhost:82/proxy"
          );
          delete request.headers["Authorization"];
        }
        return request;
      }
    });
  };
  