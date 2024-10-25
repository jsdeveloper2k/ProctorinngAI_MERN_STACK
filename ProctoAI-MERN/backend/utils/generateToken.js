import jwt from 'jsonwebtoken';

const generateToken = (res, userId) => {
  // Generate a token with HS256 algorithm
  const token = jwt.sign({ userId }, '492efef4a17f81c68579427b59ef2b249a0ea4ebcdf2684a68aaa63c2f296e546dd44a0ab538ea7dc3806a4d5996e24bcb0f2593522c4569335fb477a823fe6f', {
    algorithm: 'HS256',  
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", 
    sameSite: "strict",  
    maxAge: 365 * 24 * 60 * 60 * 1000, 
  });
};

export default generateToken;