<h1 align="center">Welcome to Nova REST API 👋</h1>
<p>
  <img alt="Version" src="https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000" />
  <img src="https://img.shields.io/badge/node-12.x-blue.svg" />
  <a href="https://app.swaggerhub.com/apis/mariasanchezc/nova-rest_api/1.0.0" target="_blank">
    <img alt="Documentation" src="https://img.shields.io/badge/documentation-yes-brightgreen.svg" />
  </a>
  <a href="#" target="_blank">
    <img alt="License: ISC" src="https://img.shields.io/badge/License-ISC-yellow.svg" />
  </a>
</p>

> REST API for NovaTalent candidates nomination management

STACK


### ✨ [Documentation](https://app.swaggerhub.com/apis/mariasanchezc/nova-rest_api/1.0.0)

### ✏️ Prerequisites

For development, you will only need Node.js, a node global package such as npm or yarn installed in your environment and mongoDB. i. e.:

- npm 6.13.4
- node 12.x Download it [here](https://nodejs.org/en/download/)
- mongoDB. Download it [here](https://www.mongodb.com/try)

### 🔧 Install

Install dependencies
```sh
npm install
```
Start mongo with
```sh
mongod 
```

### 📋 Usage

#### Simple build for production

```sh
npm run start
```

For dev porposes you can also try both
- Start transpiling in watch mode the TypeScript code as you code
```sh
npm run watch
```
- While nodemon serves the app
```sh
npm run dev
```
### 🛑 Important

In order to send emails to candidate and referrer you'll need to create a .env file in the root directory as follows:
```console
EMAIL=*from email*
PASSWORD=*from email password*
EMAIL_SERVICE=*from email host p.e. gmail*
NODE_ENV=*development or production*
```
Example:
```console
EMAIL=do-not-reply@novatalent.com
PASSWORD=thisisafakepassword666
EMAIL_SERVICE=novatalent
NODE_ENV=development
```

### Author

👤 **María Sánchez**

* Github: [@mariasanchezc](https://github.com/mariasanchezc)

### 🤝 Contributing

Contributions, issues and feature requests are welcome!<br />Feel free to check [issues page](https://github.com/mariasanchezc/nova-rest-api/issues). 

### Show your support

Give a ⭐️ if this project helped you!
