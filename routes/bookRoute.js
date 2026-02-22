var express = require('express');
const router = express.Router();
const roleMiddleware = require('../middleware/role-middleware')
const {  addBook , getAllBooks , getBookById , updateBook , deleteBook } = require('../controllers/bookController')


/**
 * @swagger
 * components:
 *   schemas:
 *     AddBookRequest:
 *       type: object
 *       properties:
 *             title:
 *                  type: string
 *                  required: true
 *             author:
 *                  type: string
 *                  required: true
 *             genre:
 *                  type: string
 *                  required: true
 *             publishedYear:
 *                  type: string
 *                  required: true
 *             avaliableCopies:
 *                  type: string
 *                  required: true
 *             _id:
 *                  type: string    
 * 
  *     UpdateBookRequest:
 *       type: object
 *       properties:
 *             title:
 *                  type: string
 *             author:
 *                  type: string
 *             genre:
 *                  type: string
 *             publishedYear:
 *                  type: string
 *             avaliableCopies:
 *                  type: string  
 */



/**
 * @swagger
 * /books:
 *   post:
 *     summary: Add a new book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *      required: true
 *      content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddBookRequest'
 *              
 *     responses:
 *      200:
 *          description: Book added successfully
 *      400:
 *          description: Bad request
 */
// Add new Book to DB
router.post('/' , roleMiddleware(['admin', 'librarian']) , addBook );



/**
 * @swagger
 * /books:
 *   get:
 *     summary: Get all books
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all books
 *       500:
 *         description: Internal server error
 *       400:
 *         description: Bad request
 */
// Get All books list
router.get('/' , roleMiddleware(['admin', 'librarian' , 'borrower']) , getAllBooks);

/**
 * @swagger
 * /books/{id}:
 *   get:
 *     summary: Get a book by ID
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book details
 *       404:
 *         description: Book not found
 */
//Get Book By Id
router.get('/:id' , roleMiddleware(['admin', 'librarian' , 'borrower']) , getBookById);


/**
 * @swagger
 * /books/{id}:
 *   put:
 *     summary: Update a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBookRequest'
 *     responses:
 *       200:
 *         description: Book updated successfully
 *       404:
 *         description: Book not found
 */
// Update the book 
router.put('/:id' , roleMiddleware(['admin', 'librarian']) , updateBook)

/**
 * @swagger
 * /books/{id}:
 *   delete:
 *     summary: Delete a book
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The book ID
 *     responses:
 *       200:
 *         description: Book deleted successfully
 *       404:
 *         description: Book not found
 */
// Delete the book
router.delete('/:id' , roleMiddleware(['admin']) , deleteBook)

module.exports = router;



