import app from '../../src/app.js';
import request from 'supertest';
import 'dotenv/config'

const BASE_URL = app || process.env.BASE_URL;

export function api() {
    return request(app);
}
