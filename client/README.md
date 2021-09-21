# Next.js client

This is the frontend client for our dapp. It is built with Next.js and uses a render-prop pattern (via `lib/Web3Container.js`) so we can easily inject blockchain functionality (i.e. web3, accounts, and the contract instance) into each page.


#Steps to setup locally
1.clone this repository
2.run command

  npm install

inside root directory of this cloned repository.
3.create .env file inside root directory ... and write below code inside .env
		REACT_APP_API=http://localhost:8000/api
		REACT_APP_GOOGLE_CLIENT_ID= 
		REACT_APP_FACEBOOK_APP_ID= 
4. run command

 npm start
5. Listen to port 3000





## Pages

There are three pages:

- `index.js` — This is a barebones Next.js page. It links to other pages which are web3-enabled. In your dapp, this can be a landing page.
- `accounts.js` — This is a page listing the accounts returned from Web3. This file demonstrates the basic use of the `Web3Container` component.
- `dapp.js` — This is a barebones demonstration dapp that utilizes the `Web3Container` component, but also makes calls to the contract. More specifically, it stores a value and gets a value.

## The `lib` folder

### `contracts`

A symlink to the `build/contracts` located in the Truffle project is placed here so that the Next.js app can refer to the build artifacts from the parent Truffle project.

### `Web3Container.js`

This is a component that utilizes the render-prop pattern to inject `web3`, `accounts`, and `contract` instance objects into a given function. When these objects are loading, it will render a loading function that is expected to return a React component.

For an example of how to use it, please see the `accounts` and `dapp` pages.

You may want to modify this for your own purposes. For example, you can require multiple contracts if your dapp requires it.

### `getWeb3.js`

This is a function for actually getting the Web3 object. Unfortunately, this file is not as straight-forward as I would have liked it. Your best bet at understanding this is to read the comments I have written in the file. You probably don't need to change anything in this file.

### `getContract.js`

This function requires `web3` to be passed in. It uses `truffle-contract` to initialize and return a contract instance. This function is used by `Web3Container.js`. You probably don't need to change anything in this file.

### `getAccounts.js`

This simply wraps `web3.eth.getAccounts` into a Promise so we can use it cleanly inside `Web3Container.js`. You probably don't need to change anything in this file.
