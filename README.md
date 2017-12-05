[![Build Status](https://img.shields.io/travis/suryaprasanna/quora.svg?style=flat-square)](https://travis-ci.org/suryaprasanna/quora) [![codecov.io](http://codecov.io/github/suryaprasanna/quora/coverage.svg?branch=master)](http://codecov.io/github/suryaprasanna/quora?branch=master)
[![npm version](https://badge.fury.io/js/remap-istanbul.svg)](http://badge.fury.io/js/remap-istanbul)
[![dependencies Status](https://david-dm.org/SitePen/remap-istanbul/status.svg)](https://david-dm.org/SitePen/remap-istanbul)
[![devDependencies Status](https://david-dm.org/SitePen/remap-istanbul/dev-status.svg)](https://david-dm.org/SitePen/remap-istanbul?type=dev)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Average time to resolve an issue](http://isitmaintained.com/badge/resolution/suryaprasanna/quora.svg)](http://isitmaintained.com/project/suryaprasanna/quora "Average time to resolve an issue")
[![Percentage of issues still open](http://isitmaintained.com/badge/open/suryaprasanna/quora.svg)](http://isitmaintained.com/project/suryaprasanna/quora "Percentage of issues still open")

# Quora
Academic project to implement Quora website.
 
## 1. Requirements
- node.js version v6.11.3
- express.js
- mocha
- supertest
- mongoDB (Database)

## 2. Installation
#### 2.1 Nodejs v6.11.3 installation
```sh
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs
```
#### 2.2 MongoDB installation
Please go through the following link
https://docs.mongodb.com/v3.0/tutorial/install-mongodb-on-ubuntu/

#### 2.3 Testing frameworks
Run the below commands to install the testing frameworks.
```sh
npm install --save-dev supertest
npm install --save-dev mocha
npm install chai
```
#### 2.4 Expressjs and other frameworks
```sh
npm install express --no-save
npm install mongoose
npm install bcryptjs
npm install elasticsearch
npm install jsonwebtoken
```
## 3. Testing application
Use the below command to run both the unit and integration tests.
```sh
npm test
```

## 4. Running application
Once the the installation is done, please clone the repository and inside the root directory of the application run the following.

```sh
node app.js
```
