# HarvestRight_Automation
Automating Harvest Right QA using Playwright

## Setup

### Prerequisites
- Node.js (v14 or higher)
- npm

### Installation

1. Clone the repository
```bash
git clone https://github.com/silverdale-muhammadmohsinmushtaq/HarvestRight_Automation.git
cd HarvestRight_Automation
```

2. Install dependencies
```bash
npm install
```

3. Install Playwright browsers
```bash
npx playwright install
```

### Environment Configuration

1. Create a `.env` file in the root directory (or copy from `.env.example`):
```bash
cp .env.example .env
```

2. Edit the `.env` file with your actual credentials:
```
SERVER_LINK=https://your-actual-server-url.com
USERNAME=your_actual_username
PASSWORD=your_actual_password
```

**Note:** Never commit the `.env` file to version control. It's already added to `.gitignore`.

### Running Tests

Run all tests:
```bash
npx playwright test
```

Run a specific test file:
```bash
npx playwright test processes/A16_CSP_HarvestRight_Create Customer.js
```

View test report:
```bash
npx playwright show-report
```

### Using Environment Variables in Tests

Environment variables from `.env` are automatically loaded and can be accessed using `process.env.VARIABLE_NAME`:

```javascript
import { test } from '@playwright/test';

test('example test', async ({ page }) => {
  await page.goto(process.env.SERVER_LINK);
  await page.fill('#username', process.env.USERNAME);
  await page.fill('#password', process.env.PASSWORD);
});
```

See `processes/example-env-usage.js` for a complete example.