module.exports = function (config) {
  config.set({
    mutator: 'javascript',
    packageManager: 'npm',
    reporters: ['html', 'clear-text', 'progress', 'dashboard'],
    testRunner: 'mocha',
    mochaOptions: {
      files: ['dist/test/**/*.js']
    },
    testFramework: 'mocha',
    coverageAnalysis: 'perTest',
    mutate: ['dist/lib/**/*.js'],
    files: ['dist/**/*']
  })
}
