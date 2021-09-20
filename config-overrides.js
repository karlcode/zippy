module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.$/,
    include: /node_modules/,
    type: "javascript/auto"
  })
  return config
}