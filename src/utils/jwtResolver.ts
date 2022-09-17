import jwtDecode from 'jwt-decode';

interface Token {
  userId: number;
  iat: number;
}

export async function resolveJWT(jwtToken: string) {
  try {
    const data = jwtDecode<Token>(jwtToken);
    return data.userId;
  } catch (error) {
    throw {
      type: 'unauthorized',
      message: 'Your token is not valid. Please sign in again!',
    };
  }
}
