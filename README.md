# SAP Fioneer - Test Automation Suite

## 📋 Project Description

End-to-end test automation for SAP Fioneer website using WebdriverIO. This project contains comprehensive tests verifying website functionality across different sections and user flows.

## 🚀 Quick Start

### Installation

npm install

### Run All Tests

npm run wdio:all

### Run Single Test Spec

npm run wdio:spec ./test/specs/homepage/contactForm.e2e.ts

## 🛠️ Technical Notes

### Implementation Challenges

**1. Limited Selectors on Website**

- The website has minimal `id` and `data-testid` attributes
- Primary reliance on XPath selectors based on CSS classes and text content
- HTML structure makes it challenging to create optimal selectors

**2. Extended Loading Times**

- Timeouts increased to **30,000ms** for CI/CD stability
- Implementation includes additional waits for element interactivity

## 🔄 CI/CD Pipeline

The project utilizes GitHub Actions for:

- Automated test execution on every push
- Detailed test result reporting
- Code quality validation

## 📊 Reporting

Test results are comprehensively logged in CI/CD console with information about:

- Test execution time
- Individual specification status
- Detailed errors and screenshots

---

**Note**: Due to the specific nature of the tested website, some implementations may deviate from standard best practices. This is compensated by extended timeouts and robust fallback mechanisms to ensure test reliability across different environments.
