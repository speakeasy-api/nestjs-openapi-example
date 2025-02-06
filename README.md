<div align="center">

<a href="[Speakeasy](https://speakeasyapi.dev/)">
  <img src="https://github.com/speakeasy-api/speakeasy/assets/68016351/e959f81a-b250-4003-8c5c-a45b9463fc95" alt="Speakeasy Logo" width="400">
<h2>Speakeasy NestJS OpenAPI example</h2>
</a>

</div>

This example NestJS app demonstrates the Speakeasy-recommended practices for generating clear OpenAPI documents and SDKs.

This project was bootstrapped with the [NestJS-CLI](https://docs.nestjs.com/cli/overview).

## Prerequisites

You need to have [Node.js version 16+](https://nodejs.org/) and the [Nest CLI](https://github.com/nestjs/nest-cli) installed on your system to run this project.

To generate an SDK, you'll also need to [install the Speakeasy CLI](https://github.com/speakeasy-api/speakeasy#installation) or use the Speakeasy dashboard.

## Installation

Install the application on your local machine.

- Clone the repository:

  ```bash
  git clone https://github.com/speakeasy-api/nestjs-openapi-example.git
  ```

- Navigate into the directory:

  ```bash
  cd speakeasy-nestjs-example
  ```

 - Install all the dependencies for the application using npm:

  ```bash
  npm install
  ```

- Install the Speakeasy CLI:

  ```bash
  brew install speakeasy-api/homebrew-tap/speakeasy
  ```

## Running the application for development

You can use the provided script to run the application in development mode. It will watch for any changes in the source code and automatically restart the server. 

**Note:** You need to move the `sdk-typescript` folder to a new location outside this project before starting the dev server.

```bash
npm run start:dev
```

### Generating an OpenAPI document

When the development server is started, an OpenAPI document, `openapi.yaml`, is generated in the root directory using JS-YAML.

## Generating an SDK using Speakeasy

Generate a Speakeasy SDK run using the following command:

```bash
speakeasy quickstart
```

## License

This project is licensed under the terms of the Apache 2.0 license.
