function snakeToCamel(str) {
  return str.replace(/_./g, (s) => s.charAt(1).toUpperCase());
}

module.exports = {
  outputPath: {
    schemas: `./examples/tmp/schemas/sample_schema`,
    actions: `./examples/tmp/action_types/sample`,
    jsSpec: `./examples/tmp/sample_api`,
  },
  modelsDir: './examples/tmp/models',
  attributeConverter: snakeToCamel,
  useFlow: true,
  usePropType: true,
  useTypeScript: true,
};
