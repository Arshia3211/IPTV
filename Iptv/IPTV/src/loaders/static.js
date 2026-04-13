import express from 'express';
import path from 'path';

export default function staticLoader(app) {
  app.use('/uploads', express.static(path.resolve('uploads')));
  console.log('Static uploads served at http://localhost:3000/uploads');
}

