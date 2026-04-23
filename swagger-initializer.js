window.onload = function() {
    window.ui = SwaggerUIBundle({
      url: "SWIFT-API-Swift-Messaging-2.0.0-swagger.yaml",
      dom_id: '#swagger-ui',
      deepLinking: true,
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      plugins: [
        SwaggerUIBundle.plugins.DownloadUrl
      ],
      layout: "StandaloneLayout"
    });
  };
  