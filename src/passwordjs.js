'use strict'
const util = require('./utility')

function passwordjs() {
    if (process.argv.length != 5) return 'false';

    var filename = process.argv[2]
    var email = process.argv[3]
    var password = process.argv[4]

    try {
        const lines = util.readFile(filename);
        for (const line of lines) {
            const [storedEmail, storedHash] = line.split(':');
            if (storedEmail === email) return (util.hash(password) === storedHash).toString();
        }
        return 'false';
    } catch (err) {
        console.error('Error validating password', err);
        return 'false';
    }
}

if (require.main === module) {
    console.log(passwordjs())
}

module.exports = {passwordjs};