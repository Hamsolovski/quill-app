module.exports = {
  extends: ['@commitlint/config-conventional'],
  prompt: {
    scopes: ['tables', 'entries', 'roll', 'import', 'export', 'db', 'ui', 'deps'],
  },
}
