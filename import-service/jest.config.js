module.exports = {
    verbose: true,
    collectCoverage: false,
    coverageReporters: ['json', 'html'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    testURL: 'http://localhost/',
    globals: {
        BASEPATH: process.env.BASEPATH,
        NODE_ENV: process.env.NODE_ENV
    },
    notify: true
}
