var express = require('express');
const router = express.Router();
const roleMiddleware = require('../middleware/role-middleware')
const {  addAuthor , getAllAuthors , getAuthorById , udpateAuthor , deleteAuthor } = require('../controllers/authorController');


/**
 * @swagger
 * components:
 *   schemas:
 *     AddAuthorRequest:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *             required: true
 *           bio:
 *             type: string
 *             required: true
 *           dateOfBirth:
 *             type: string
 *             required: true
 * 
 * 
 *     UpdateAuthorRequest:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *           bio:
 *             type: string
 *           dateOfBirth:
 *             type: string
 */


// Add a new author
/**
 * @swagger
 * /authors:
 *   post:
 *     summary: Add a new author
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddAuthorRequest'
 *     responses:
 *       201:
 *         description: Author added successfully
 *       400:
 *         description: Bad request
 */
router.post('/' , roleMiddleware(['admin', 'librarian']) , addAuthor );


// Get all authors
/**
 * @swagger
 * /authors:
 *   get:
 *     summary: Get all authors
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all authors
 *       500:
 *         description: Internal server error
 */
router.get('/' , roleMiddleware(['admin', 'librarian' , 'borrower']) , getAllAuthors);

//Get an author by ID
/**
 * @swagger
 * /authors/{id}:
 *   get:
 *     summary: Get an author by ID
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID
 *     responses:
 *       200:
 *         description: Author details
 *       404:
 *         description: Author not found
 */
router.get('/:id' , roleMiddleware(['admin', 'librarian' , 'borrower']) , getAuthorById);


// Update an author
/**
 * @swagger
 * /authors/{id}:
 *   put:
 *     summary: Update an author
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *              $ref: '#/components/schemas/UpdateAuthorRequest'
 *     responses:
 *       200:
 *         description: Author updated successfully
 *       404:
 *         description: Author not found
 */
router.put('/:id' , roleMiddleware(['admin', 'librarian']) , udpateAuthor)

// Delete an author
/**
 * @swagger
 * /authors/{id}:
 *   delete:
 *     summary: Delete an author
 *     tags: [Authors]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The author ID
 *     responses:
 *       200:
 *         description: Author deleted successfully
 *       404:
 *         description: Author not found
 */
router.delete('/:id' , roleMiddleware(['admin']) , deleteAuthor)

module.exports = router;



