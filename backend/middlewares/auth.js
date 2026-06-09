import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Token requerido' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token requerido' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(403).json({ message: 'Token inválido o expirado' });
  }
}

export function verifyAdmin(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user?.role !== 'admin') {
      return res.status(403).json({ message: 'Acceso denegado: se requiere rol de administrador' });
    }
    next();
  });
}

export function verifyCustomer(req, res, next) {
  verifyToken(req, res, () => {
    if (req.user?.role !== 'customer') {
      return res.status(403).json({ message: 'Acceso denegado: se requiere rol de cliente' });
    }
    next();
  });
}