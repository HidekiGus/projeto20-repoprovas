import supertest from 'supertest';
import { createUser } from './factories/userFactory';
import app from '../src/app';
import client from '../src/database/database';
import { createTest } from './factories/testFactory';

afterAll(async () => {
  await client.$disconnect();
});

describe('Testing POST /signup', () => {
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

describe('Testing POST /signin', () => {
  it('Returns 200 and a token when a user signs in correctly', async () => {
    const user = await createUser();
    await supertest(app).post('/signup').send(user);
    delete user.confirmPassword;
    const result = await supertest(app).post('/signin').send(user);
    expect(result.status).toEqual(200);
    expect(result.body).toBeInstanceOf(Object);
  });

  it('Returns 401 when a user sign in with invalid credentials', async () => {
    const user = await createUser();
    delete user.confirmPassword;
    const result = await supertest(app).post('/signin').send(user);
    expect(result.status).toEqual(401);
  });
});

describe('Testing POST /tests/create', () => {
  it('Returns 201 when a test is created successfully', async () => {
    const newTest = await createTest();
    const tokenFromValidUser =
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjcsImlhdCI6MTY2MzM5NjAzMn0.h-ZsqsHiC2NhASjF-pPAtUnGh0fUg7UIFD5j8M1CQko';
    const result = await supertest(app)
      .post('/tests/create')
      .send(newTest)
      .set({
        Authorization: `Bearer ${tokenFromValidUser}`,
      });
    expect(result.status).toEqual(201);
  });

  it('Returns 401 when the token is not sent', async () => {
    const newTest = await createTest();
    const result = await supertest(app)
      .post('/tests/create')
      .send(newTest)
      .set({
        Authorization: `Bearer `,
      });
    expect(result.status).toEqual(401);
  });
});

describe('Testing GET /tests', () => {
  it('Returns an array of objects when requested', async () => {
    const result = await supertest(app).get('/tests');
    expect(result.body).toBeInstanceOf(Object);
  });
});
