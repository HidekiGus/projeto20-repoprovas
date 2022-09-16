import supertest from 'supertest';
import { createUser } from './factories/userFactory';
import app from '../src/app';
import client from '../src/database/database';

afterAll(() => {
  afterAll(async () => {
    await client.$disconnect();
  });
});

describe('Testing user routes', () => {
  it('Returns 201 when a new user is created', async () => {
    const newUser = await createUser();

    const result = await supertest(app).post('/signup').send(newUser);
    expect(result.status).toEqual(201);
  });

  it('Returns 409 when email is already being used', async () => {
    const newUser = await createUser();

    await supertest(app).post('/signup').send(newUser);
    const result = await supertest(app).post('/signup').send(newUser);
    expect(result.status).toEqual(409);
  });
});
