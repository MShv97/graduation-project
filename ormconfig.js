module.exports = {
  "type": "mysql",
  "url": process.env.DB_URL,
  "synchronize": process.env.TYPEORM_SYNCHRONIZE,
  "logging": process.env.TYPEORM_LOGGING,
  "entities": ["src/entities/**/*.ts"],
  "migrations": ["src/migration/**/*.ts"],
  "subscribers": ["src/subscriber/**/*.ts"],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}
