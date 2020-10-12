import jwt from 'jsonwebtoken';

export default (authToken) => {
  const isAuth = false;
  const token = authToken;
  if (!token || token === "") {
    return { isAuth, userId: null };
  }
  let decodedToken;
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
  } catch (err) {
    return { isAuth, userId: null };
  }
  if (!decodedToken) {
    return { isAuth, userId: null };
  }
  return {
    isAuth: true,
    userId: decodedToken.userId,
  };
};
