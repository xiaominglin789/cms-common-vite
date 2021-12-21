module.exports = {
  extends: ['@commitlint/config-conventional'],
  roles: {
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "pref",
        "test",
        "chore",
        "revert",
        "build"
      ],
    ],
    // 大小写不做检验
    'subject-case': [0]
  }
}