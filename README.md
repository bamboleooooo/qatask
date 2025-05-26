# QA Automation Task

Welcome to the QA Automation task!
Here are some guidelines in order to make run and work with it.

## Pre-requisites

- You will need to have `node` and `npm` installed in your system. We tested it with the following versions:

```shell
❯ npm --version
10.5.0
❯ node --version
v20.11.1
```

## Steps

- First Clone the repository to your local machine:

```shell
git clone https://github.com/bamboleooooo/qatask.git
cd qatask
```

- Once you have the repo, you will need to install the dependencies:

```shell
npm install
```

- We are using playwright for our E2E tests, so we need to install the supported browsers. For that we run:

```shell
npx playwright install
```

- You can also run the tests with the following command `npm run test-headless` or `npm run test-headed`
