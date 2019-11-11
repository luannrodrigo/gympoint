import { Router } from 'express';

// importando controllers
import SessionController from './app/controllers/SessionController';
import UserController from './app/controllers/UserController';
import StudentsController from './app/controllers/StudentsController';

// improtando middlewares
import authMiddleware from './app/middleware/auth';

const routes = new Router();

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/students', StudentsController.store);
routes.put('/users', UserController.update);

export default routes;
