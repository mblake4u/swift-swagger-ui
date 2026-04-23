FROM docker.swagger.io/swaggerapi/swagger-ui:latest

# Copy your OpenAPI spec
COPY SWIFT-API-Swift-Messaging-2.1.0-swagger.yaml /usr/share/nginx/html/

# Override the JS that loads the Swagger spec
COPY swagger-initializer.js /usr/share/nginx/html/swagger-initializer.js

EXPOSE 8080
