const seedClassAndDepartment = require('./ClassAndDeparment');

const seedAll = async () => {
  try {
    console.log('Starting seeding process...');
    
    // Execute all seed functions
    await seedClassAndDepartment();
    
    console.log('All seed data inserted successfully!');
  } catch (error) {
    console.error('Error during seeding:', error);
  }
};

seedAll();