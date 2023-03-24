const fs = require('fs');
fs.writeFile('persona.txt', 'Ciao persona', function (error) {
    if (error) throw error;
    console.log('Ciao persona')
})