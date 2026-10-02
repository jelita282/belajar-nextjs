const nextJest = require("next/jest");

const createJestConfig = nextJest({
  // Berikan path ke aplikasi Next.js kamu untuk memuat next.config.js dan file .env
  dir: "./",
});

/** @type {import('jest').Config} */
const customJestConfig = {
  moduleDirectories: ["node_modules", "<rootDir>/"],
  // Konfigurasi agar Jest mengenali alias `@/`
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testEnvironment: "jest-environment-jsdom",
};

module.exports = createJestConfig(customJestConfig);