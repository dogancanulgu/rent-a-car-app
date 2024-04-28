import jwt from 'jsonwebtoken';

export const authPath = ['/login', '/register'];

export async function getUserIdByValidToken(request) {
  try {
    //get token from cookies
    const token = request.cookies.get('token')?.value;
    if (!token) {
      throw new Error('No token found');
    }
    // Verify token and get user id
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);    
    const userId = decodeToken._id;

    return userId;
  } catch (error) {
    throw new Error(error.message ?? 'Invalid token');
  }
}
