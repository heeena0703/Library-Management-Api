var express = require('express');
var router = express.Router();
const userModel = require('../models/user');


/**
 * @swagger
 * components:
 *   schemas:
 *     UserResponse:
 *       type: array
 *       items:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *           password:
 *             type: string
 *           role:
 *             type: string
 *           _id:
 *             type: string
 *           userCreatedAt:
 *             type: string
 */
/**
 * @swagger
 * /users:
 *   get:
 *     summary: Get all users
 *     tags: [User]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       500:
 *         description: Internal server error
 */

/* GET users listing. */
router.get('/', async (req ,resp)=>{
  const users = await userModel.find({});
  resp.json(users);
});

module.exports = router;
