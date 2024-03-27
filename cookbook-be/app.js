import express from 'express';
import axios from 'axios';
import path from 'path';
import fs from 'fs';
import cors from 'cors';
// import {pool} from './db.js';

const app = express()
const PORT = process.env.PORT || 8000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/', async (req, res) => {
    try {
        console.log('Fetching data from Contentful API...');
        const response = await axios.get(`https://cdn.contentful.com/spaces/${process.env.CONTENTFUL_SPACE_ID}/environments/master/entries?access_token=${process.env.CONTENTFUL_ACCESS_TOKEN}`);
        console.log('Data fetched successfully:', response.data);
        const postData = response.data;
        res.json(postData);

    } catch (err) {
        console.error('Error fetching recipes:', err);
        res.status(500).send('Error retrieving recipes');
    }
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
  });