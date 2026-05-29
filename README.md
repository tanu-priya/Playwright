# IC Playwright - Inference Cloud E2E Test Suite

Automated end-to-end testing suite for the InferenceCloud Notebook application built with Playwright and Node.js. This project uses the **Page Object Model (POM)** pattern for maintainable and scalable test automation.

## Table of Contents

- [Overview](#overview)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Project Structure](#project-structure)
- [Environment Configuration](#environment-configuration)
- [Running Tests](#running-tests)
- [Playwright Configuration](#playwright-configuration)
- [Test Pages](#test-pages)

---

## Overview

This test automation project provides comprehensive end-to-end testing for the InferenceCloud Notebook application across multiple environments:

- **Development** (dev)
- **Staging** (stage)
- **Production** (prod)

The suite includes tests for:
- User authentication and login
- Dashboard functionality
- Insight Miner features
- Strategy Explorer features
- Notebook creation and management

---

## Prerequisites

- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **Git**: For version control

---

## Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd IC_Playwright
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

   This will install:
   - `@playwright/test` - Playwright test framework
   - `playwright` - Playwright browser automation
   - `@faker-js/faker` - Faker library for generating test data
   - `@types/node` - TypeScript types for Node.js

3. **Verify installation:**
   ```bash
   npx playwright --version
   ```

---

## Project Structure

```
IC_Playwright/
├── config/                          # Environment configuration files
│   ├── dev.env.js                  # Development environment config
│   ├── stage.env.js                # Staging environment config
│   ├── prod.env.js                 # Production environment config
│   └── envLoader.js                # Environment loader utility
├── pages/                           # Page Object Model (POM) classes
│   ├── LoginPage.js                # Login page object
│   ├── DashboardPage.js            # Dashboard page object
│   ├── InsightMinerPage.js         # Insight Miner page object
│   └── StrategyExplorerPage.js     # Strategy Explorer page object
├── tests/                           # Test specifications
│   ├── auth.setup.js               # Authentication setup (global setup)
│   ├── verifyLogin.spec.js         # Login tests
│   ├── createIMNotebook.spec.js    # Insight Miner notebook tests
│   ├── createSENotebook.spec.js    # Strategy Explorer notebook tests
│   ├── browserContextEx.spec.js    # Browser context tests
│   └── example.spec.js             # Example tests
├── utils/                           # Utility functions and test data
│   ├── apiHelper.js                # API helper functions
│   ├── dataUtil.js                 # Data utility functions
│   └── dynamicData.json            # Test data (credentials, etc.)
├── fixtures/                        # Playwright fixtures (if any)
├── playwright/                      # Playwright-generated files
│   ├── dev-auth.json               # Development session storage
│   ├── stage-auth.json             # Staging session storage
│   └── prod-auth.json              # Production session storage
├── playwright-report/               # HTML test reports
├── test-results/                    # Test results logs
├── playwright.config.js            # Playwright configuration
├── package.json                    # Project dependencies and metadata
└── README.md                        # This file
```

---

## Environment Configuration

### Environment Files

The project supports three environments with separate configuration files:

#### Development (`config/dev.env.js`)
```javascript
export default {
  baseURL: 'https://notebook.dev.inferencecloud.ai/',
};
```

#### Staging (`config/stage.env.js`)
```javascript
export default {
  baseURL: 'https://notebook.stage.inferencecloud.ai/',
};
```

#### Production (`config/prod.env.js`)
```javascript
export default {
  baseURL: 'https://notebook.inferencecloud.ai/',
};
```

### Environment Loader (`config/envLoader.js`)

The `envLoader.js` file automatically selects the correct environment configuration based on the `TEST_ENV` environment variable:

```javascript
const env = process.env.TEST_ENV || 'dev';  // Defaults to 'dev' if not specified
```

---

## Running Tests

### Quick Start

The default environment is **development**. To run all tests:

```bash
npx playwright test
```

### Running Tests for Specific Environments

#### Development Environment
```bash
# Option 1: Using default environment
npx playwright test

# Option 2: Explicitly set dev environment
TEST_ENV=dev npx playwright test
```

#### Staging Environment
```bash
TEST_ENV=stage npx playwright test
```

#### Production Environment
```bash
TEST_ENV=prod npx playwright test
```

### Running Specific Test Files

Run a single test file:
```bash
# Run login tests in dev environment
TEST_ENV=dev npx playwright test tests/verifyLogin.spec.js

# Run login tests in staging environment
TEST_ENV=stage npx playwright test tests/verifyLogin.spec.js

# Run login tests in production environment
TEST_ENV=prod npx playwright test tests/verifyLogin.spec.js
```

### Running Tests by Test Name/Pattern

Run tests matching a pattern:
```bash
# Run tests with "Login" in the name
TEST_ENV=dev npx playwright test -g "Login"

# Run tests with "invalid" in the name
TEST_ENV=stage npx playwright test -g "invalid"
```

### Running Tests with Browser Visibility

By default, tests run in headless mode. To see the browser during test execution:

```bash
# Run with visible browser
HEADED=true npx playwright test

# Run with visible browser on staging
TEST_ENV=stage HEADED=true npx playwright test
```

### Debugging Tests

Run tests in debug mode with the Playwright Inspector:

```bash
# Debug mode in development environment
TEST_ENV=dev npx playwright test --debug

# Debug a specific test file
TEST_ENV=stage npx playwright test tests/verifyLogin.spec.js --debug
```

### View Test Reports

After tests complete, view the HTML report:

```bash
npx playwright show-report
```

The report will open showing:
- Test execution timeline
- Screenshots and videos (if configured)
- Detailed pass/fail information
- Error details and stack traces

---

## Playwright Configuration

### Overview

The Playwright configuration is defined in `playwright.config.js` and controls how tests are executed.

### Key Configuration Settings

#### Test Directory
```javascript
testDir: './tests',
```
- Tests are located in the `./tests` directory
- All `.spec.js` files are automatically discovered and executed

#### Parallel Execution
```javascript
fullyParallel: false,
```
- Tests run **sequentially** (not in parallel)
- Use `fullyParallel: true` if you want to run tests in parallel

#### Browser Configuration
```javascript
projects: [
  {
    name: 'setup',
    testMatch: /.*\.setup\.js/,
  },
  {
    name: 'chromium',
    use: {
      ...devices['Desktop Chrome'],
      storageState: `playwright/${env}-auth.json`
    },
    dependencies: ['setup'],
  }
],
```
- **Setup Project**: Runs `auth.setup.js` first to authenticate before tests
- **Chromium Project**: Tests run in Chrome browser after setup completes
- **Storage State**: Authentication session is saved to environment-specific JSON file
  - `playwright/dev-auth.json` - Development session
  - `playwright/stage-auth.json` - Staging session
  - `playwright/prod-auth.json` - Production session

#### Base URL
```javascript
baseURL: envConfig.baseURL,
```
- Dynamically set from the environment configuration file
- Determines the target application URL based on `TEST_ENV`

#### Reporting
```javascript
reporter: 'html',
```
- HTML report is generated after test execution
- Report is saved to `playwright-report/` directory
- View with: `npx playwright show-report`

#### Trace Recording
```javascript
trace: 'on-first-retry',
```
- Traces are recorded when tests are retried
- Helps in debugging intermittent failures

#### Retries
```javascript
retries: process.env.CI ? 2 : 1,
```
- **Local execution**: 1 retry on failure
- **CI environment**: 2 retries on failure

#### Workers
```javascript
workers: process.env.CI ? 1 : undefined,
```
- **Local execution**: Uses system default (typically equal to CPU cores)
- **CI environment**: Uses 1 worker for consistent results

---

## Test Pages (Page Object Model)

The project follows the **Page Object Model (POM)** pattern, where each page is represented as a class with selectors and methods.

### LoginPage (`pages/LoginPage.js`)

Methods:
- `login(email, password)` - Login with valid credentials
- `loginWithInvalidCredentials(email, password)` - Attempt login with invalid credentials

Elements:
- `emailInput` - Email input field
- `passwordInput` - Password input field
- `loginButton` - Login button
- `loginErrorMessage` - Error message display

### DashboardPage (`pages/DashboardPage.js`)

Methods:
- `finishButtonClick()` - Click the finish/next button
- Various dashboard-specific actions

Elements:
- `yourWorkHeader` - "Your Work" section header

### InsightMinerPage (`pages/InsightMinerPage.js`)

Contains page objects and methods for Insight Miner functionality.

### StrategyExplorerPage (`pages/StrategyExplorerPage.js`)

Contains page objects and methods for Strategy Explorer functionality.

---

## Test Data

Test data is managed in `utils/dynamicData.json` for non-sensitive scenarios only:
- Invalid credentials for negative test cases
- Any other non-sensitive test fixtures

Valid login credentials must come from environment variables:
- `TEST_USER`
- `TEST_PASSWORD`
- Optional multi-user input: `TEST_USERS_JSON` (JSON array of `{ "username", "password" }`)

---

## CI/CD Integration

### Required secrets

Auth setup and login tests need these environment variables in CI:

| Variable | Description |
|----------|-------------|
| `TEST_USER` | Valid login email |
| `TEST_PASSWORD` | Valid login password |
| `TEST_ENV` | Optional; defaults to `dev` in pipelines |

### GitHub Actions

1. Open the repo on GitHub → **Settings** → **Secrets and variables** → **Actions**.
2. Add repository secrets:
   - `TEST_USER`
   - `TEST_PASSWORD`
3. The workflow `.github/workflows/playwright.yml` passes them into the test job automatically.

### Azure Pipelines

1. Open your pipeline in Azure DevOps → **Edit** → **Variables**.
2. Add variables (enable **Keep this value secret** for each):
   - `TEST_USER`
   - `TEST_PASSWORD`
3. `azure-pipelines.yml` maps them into the **Run Playwright Tests** step via `env`.

### CI behavior

GitHub Actions and Azure Pipelines set `CI=true` automatically. That will:
- Reduce number of workers to 1
- Increase retries to 2
- Enforce `forbidOnly` (fail if test.only is found)

---

## Troubleshooting

### Tests timing out
- Increase the timeout in `playwright.config.js`
- Check if the application is responding

### Authentication failures
- Verify `TEST_USER` and `TEST_PASSWORD` (or `TEST_USERS_JSON`) are set
- Check if credentials are valid in the target environment
- Delete the corresponding auth JSON file to force re-authentication

### Connection refused errors
- Verify the `baseURL` is correct for the environment
- Check network connectivity to the target environment

### Port already in use
- Close any existing Playwright processes or applications using the port

---

## Additional Resources

- [Playwright Documentation](https://playwright.dev)
- [Playwright Test Framework](https://playwright.dev/docs/intro)
- [Page Object Model Best Practices](https://playwright.dev/docs/pom)
- [Debugging Tests](https://playwright.dev/docs/debug)

---

## Project Maintainers

For issues or questions, contact the QA automation team.
