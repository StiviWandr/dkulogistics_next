import mongoose from 'mongoose';
import User from './models/User.js';
import * as dotenv from 'dotenv'
import bcrypt from 'bcrypt'
dotenv.config();

import Journal from './models/Journal.js';

mongoose.connect(`${process.env.DB_URL}/dku`, {useNewUrlParser: true});

const db = mongoose.connection;

db.once('open', async () => {
    try {
        await db.dropCollection('journals');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    const [admin, user] = await User.create({
        email: "admin@gmail.com",
        password: await bcrypt.hash("admin@gmail.com", 3),
        isActivated: true,
        birthDay: "01.01.2000",
        name: "Главный",
        fathersName: "Админ",
        role: "admin",
    }, 
    {
        email: "artur03rodnov@gmail.com",
        password: await bcrypt.hash("artur03rodnov@gmail.com", 3),
        isActivated: false,
        birthDay: "04.03.2003",
        name: "Артур",
        lastName: "Роднов",
        fathersName: "Александрович",
        role: "user",
    },
    );

    await Journal.create({
        year: new Date().getFullYear(),
        period: 1,
    })

    await db.close();
})

