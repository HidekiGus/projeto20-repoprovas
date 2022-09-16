import supertest from 'supertest';
import { createUser } from './factories/userFactory';
import app from '../src/app';

describe('Testing user routes', () => {
  it('Returns 201 when a new user is created', async () => {
    const newUser = await createUser();

    const result = await supertest(app).post('/signup').send(newUser);
    expect(result.status).toEqual(201);
  });
});
