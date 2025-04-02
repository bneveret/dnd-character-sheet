module.exports = {
    setupFilesAfterEnv: ["<rootDir>/tests/setupTestDB.js"],
    automock: false,
    moduleNameMapper: {
        "^../config/database$": "<rootDir>/__mocks__/database.js",
    },
};