const express = require('express');
const userModel = require('../models/user');
const router = express.Router();
const { register , login } = require('../controllers/authController');
const roleMiddleware = require('../middleware/role-middleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       properties:
 *        name:
 *          type: string
 *          required: true
 *        password:
 *          type: string
 *          required: true
  *     RegisterUserRequest:
 *       type: object
 *       properties:
 *        name:
 *          type: string
 *          required: true
 *        password:
 *          type: string
 *          required: true
 *        role:
 *          type: string
 *          required: true 
 *        userCreatedAt:
 *          type: string
 *          required: false
 * 
 * 
 * /auth/login:
 *   post:
 *    summary: Login a user
 *    tags: [User]
 *    requestBody:
 *      required: true
 *      content: 
 *       application/json:
 *        schema:
 *          $ref: '#/components/schemas/LoginRequest'
 *    responses:
 *     200: 
 *        description: User logged in successfully
 *     400:
 *        description: Invalid credentials
 *     500: 
 *        description: Internal server error   
 */
router.post('/login', login);

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RegisterUserRequest'
 *     responses:
 *       201:
 *         description: User registered successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/register' , register);



module.exports = router;