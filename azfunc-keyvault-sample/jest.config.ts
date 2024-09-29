export default {
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  roots: ["<rootDir>/tests"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  verbose: true,
  coveragePathIgnorePatterns: ["/tests/", "/node_modules/"],
  coverageThreshold: {
    "**/*": {
      statements: 70,
    },
  },
};
