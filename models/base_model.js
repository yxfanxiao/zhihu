var tools = require('../common/tools');

module.exports = function (schema) {
  schema.methods.create_at_ago = function () {
    return tools.formatDate(this.create_at, true);
  };
  schema.methods.updated_at_ago = function () {
    return tools.formatDate(this.update_at, true);
  };
};