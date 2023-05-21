module.exports = {
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.+(ts|tsx)', '**/?(*.)+(spec|test).+(ts|tsx)'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  globals: {
    'ts-jest': {
      babelConfig: true,
      tsconfig: 'tsconfig.json',
      diagnostics: true,
      isolatedModules: true,
    },
  },
  transformIgnorePattern: [
   '<rootDir>/node_modules/(?!axios)/'
  ],
  moduleNameMapper: {
    '^axios$': require.resolve('axios'),
  },
};
