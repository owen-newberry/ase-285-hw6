'use strict'
const fs = require('fs');
const mongoose = require('mongoose');
const { readFile, writeFile, hash } = require('./utility')
const { connectDB, User } = require('./db');

async function makepassword(passwords, encryptedPasswords) {
    let hashedLines; //declared here to avoid scope issues outside of the try-catch block
    try {
        const lines = readFile(passwords);
        hashedLines = lines.map(line => {
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
    console.log(`Data written to ${encryptedPasswords} and MongoDB`);
    await mongoose.disconnect();
}

if (require.main === module) {
    makepassword('../password.txt', '../password.enc.txt')
}

module.exports = { makepassword };