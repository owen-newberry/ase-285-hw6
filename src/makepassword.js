'use strict'
const fs = require('fs');
const { readFile, writeFile, hash } = require('./utility')
const { connectDB, User } = require('./db');

async function makepassword(passwords, encryptedPasswords) {
    try {
        const lines = readFile(passwords);
        const hashedLines = lines.map(line => {
            const [email, password] = line.split(':');
            return `${email}:${hash(password)}`;
        });
        writeFile(hashedLines, encryptedPasswords);
    } catch (err) {
        console.error('Error processing file:', err);
        throw err;
    }

    await connectDB();
    for (const line of hashedLines) {
        const [email, passwordHash] = line.split(':');
        await User.findOneAndUpdate(
            { email },
            { email, passwordHash },
            { upsert: true }
        );
    }
    console.log(`Data written to ${outputFile} and MongoDB`);
    await mongoose.disconnect();
}

if (require.main === module) {
    makepassword('../password.txt', '../password.enc.txt')
}

module.exports = { makepassword };