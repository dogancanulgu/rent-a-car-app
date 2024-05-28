import jwt from 'jsonwebtoken';

export const authPath = ['/login', '/register'];

// Get user id by valid token
export async function getUserIdAndRoleByValidToken(request) {
  try {
    //get token from cookies
    const token = request.cookies.get('token')?.value;
    if (!token) {
      throw new Error('No token found');
    }
    // Verify token and get user id
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);

    return decodeToken;
  } catch (error) {
    throw new Error(error.message ?? 'Invalid token');
  }
}
