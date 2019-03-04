[![Build Status](https://travis-ci.com/frncscdf/Soldino-PoC.svg?branch=master)](https://travis-ci.com/frncscdf/Soldino-PoC)
# Soldino-PoC
Proof of Concept project Soldino

## Getting Started

In few steps you will be able to test our product:

### Prerequisites

You will need to install:

```
Git
```
```
npm
```

And to clone the repository hosted at:
```
https://github.com/frncscdf/Soldino-PoC
```

If you're using Windows you also have to digit from a shell
```
npm install --global --production windows-build-tools
```
to install Python and other utilities that are necessary to make the demo works.

Then the `Metamask` plugin for Firefox or Chrome is required.

### Installing

Use `npm` to install other required programs typing the following commands:

Installing the local blockchain generator:
```
https://truffleframework.com/ganache
```

Installing the Truffle package:
```
npm install -g truffle
```


### Deployment
Start ganache to simulate an ethereum network.
Set the Metamask RPC to the local one that will be offered by Ganache:
```
http://localhost:7545
```
Go inside the repository folder (in case you aren't already there) and run the following commands
```
npm install
```
To install the dependencies of the project
```
truffle console
```
To enter the console provided by truffle
```
migrate --reset --network development
```
To load the contracts in the ganache test network
```
.exit
```
To quit the truffle console
```
npm run start
```
To start the local webserver hosting the application which will be running on
```
localhost:3000
```

## Authors

**The Walking Bug**
