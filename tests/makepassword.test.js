require('dotenv').config({ path: '../src/.env'})
const { describe, test, expect} = require('@jest/globals');
const p = require('../src/makepassword');
const u = require('../src/utility');
const fs = require('fs');
const mongoose = require('mongoose');

jest.mock('../src/db', () => ({
    connectDB: jest.fn().mockResolvedValue(true),
    User: {
      findOneAndUpdate: jest.fn().mockImplementation(({ email }, { passwordHash }) => {
        return Promise.resolve({ email, passwordHash });
      })
    }
  }));

describe("makepassword should create file", () => {
    test('', async () => {
        const fileName = './tests/passwordtest.txt'
        const encFileName = './tests/passwordtest.enc.txt'

        if (fs.existsSync(encFileName)) {
            fs.unlinkSync(encFileName);
        }

        expect(fs.existsSync(encFileName)).toBe(false);

        await p.makepassword(fileName, encFileName);

        expect(fs.existsSync(encFileName)).toBe(true);

        const lines = u.readFile(fileName);
        const encLines = u.readFile(encFileName);

        lines.forEach((line, index) => {
            const [email, password] = line.split(':');
            const [encEmail, encPassword] = encLines[index].split(':');
            expect(encEmail).toBe(email);
            expect(encPassword).toBe(u.hash(password));
        });
    });
});