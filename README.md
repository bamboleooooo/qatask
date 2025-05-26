# QA Automation Task – SauceDemo E2E Tests

This repository contains an end-to-end (E2E) test suite for [saucedemo.com](https://www.saucedemo.com/) using **Playwright**.  
The tests cover login flow, product purchase flow, and UI validations such as header and footer checks.

This project was created as part of a QA Automation recruitment task.

---

## ✅ Prerequisites

Make sure you have the following installed:

- `node` and `npm` (tested versions):

````sh
node --version     # v20.11.1
npm --version      # 10.5.0

---

## ⚙️ Installation & Running Tests

- First Clone the repository to your local machine:

```shell
git clone https://github.com/bamboleooooo/qatask.git
cd qatask
````

- Once you have the repo, you will need to install the dependencies:

```shell
npm install
```

- We are using playwright for our E2E tests, so we need to install the supported browsers. For that we run:

```shell
npx playwright install
```

- You can run the tests with the following command
  - Headed mode (with browser UI): `npm run test-headed`
  - Headless mode (no UI, recommended for CI): `npm run test-headless`
