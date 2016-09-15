var seeder = require('mongoose-seed');

module.exports = function() {
  seeder.connect('mongodb://localhost/whois', function() {

      // Load Mongoose models
      seeder.loadModels([
          '../app/models/user.server.model.js',
          '../app/models/rs.server.model.js'
      ]);

      // Clear specified collections
      seeder.clearModels(['User', 'Rs'], function() {

          // Callback to populate DB once collections have been cleared
          seeder.populateModels(data);

      });
  });
};
