import mongoose from 'mongoose';
import { nanoid } from 'nanoid';
import User from './models/User.js';

import { DB_NAME, MONGO_URL } from './config.js';

mongoose.connect(`${MONGO_URL}/${DB_NAME}`, {useNewUrlParser: true});

const db = mongoose.connection;

db.once('open', async () => {
    try {
        await db.dropCollection('galleryposts');
        await db.dropCollection('users');
    } catch (e) {
        console.log('Collections were not present, skipping drop...');
    }

    const [admin] = await User.create({
        username: 'admin',
        password: 'admin',
        token: nanoid()
    });

    await GalleryPost.create({
        title: 'joda',
        author: user1._id,
        image: 'joda.jpg',
    }, {
        title: 'question',
        author: user1._id,
        image: 'question.png',
    },{
        title: 'City',
        author: user1._id,
        image: 'city.png',
    },
    {
        title: 'joda',
        author: user2._id,
        image: 'joda.jpg',
    }, {
        title: 'question',
        author: user2._id,
        image: 'question.png',
    },{
        title: 'City',
        author: user2._id,
        image: 'city.png',
    },
    {
        title: 'joda',
        author: user3._id,
        image: 'joda.jpg',
    }, {
        title: 'question',
        author: user3._id,
        image: 'question.png',
    },{
        title: 'City',
        author: user3._id,
        image: 'city.png',
    },
    {
        title: 'joda',
        author: Artur._id,
        image: 'joda.jpg',
    }, {
        title: 'question',
        author: Artur._id,
        image: 'question.png',
    },{
        title: 'City',
        author: Artur._id,
        image: 'city.png',
    },

    )

    await db.close();
})

