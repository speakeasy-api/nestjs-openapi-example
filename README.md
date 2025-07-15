<div align="center">

<a href="[Speakeasy](https://speakeasyapi.dev/)">
  <img src="https://github.com/speakeasy-api/speakeasy/assets/68016351/e959f81a-b250-4003-8c5c-a45b9463fc95" alt="Speakeasy Logo" width="400">
<h2>Speakeasy NestJS OpenAPI Example</h2>
</a>

</div>

This example NestJS app demonstrates Speakeasy-recommended practices for generating clear OpenAPI specifications and SDKs.

This project was bootstrapped with [NestJS-CLI](https://docs.nestjs.com/cli/overview).

## Prerequisites

You need to have Node.js version >= 16 and the Nest CLI installed on your system to run this project. If you don't have these installed, you can download them from [nodejs.org](https://nodejs.org/) and [nestjs/nest-cli](https://github.com/nestjs/nest-cli).

To generate an SDK, you'll also need the Speakeasy CLI installed, or use the Speakeasy dashboard.

## Installation

To install the application on your local machine:

1. Clone the repository:
```bash
git clone https://github.com/speakeasy-api/nestjs-openapi-example.git
```

2. Navigate into the directory:
```bash
cd speakeasy-nestjs-example
```

3. Install all dependencies for the application using NPM:
```bash
npm install
```

4. [Install Speakeasy CLI](https://github.com/speakeasy-api/speakeasy#installation):
```bash
brew install speakeasy-api/homebrew-tap/speakeasy
```

## Running the application for development

You can use the provided script to run the application in development mode. It will watch for any changes in the source code and automatically restart the server. 

> Move the `sdk-typescript` folder to a new location outside this project before starting the dev server.

```bash
npm run start:dev
```

### Creating an OpenAPI specification

An OpenAPI specification `openapi.yaml` file is generated in the root directory, using JS-YAML, when the development server is started.


## Generating an SDK using Speakeasy

To generate a Speakeasy SDK run:

```bash
speakeasy quickstart
```

## License

This project is licensed under the terms of the Apache 2.0 license.
