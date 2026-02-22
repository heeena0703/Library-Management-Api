var express = require('express');
const router = express.Router();
const roleMiddleware = require('../middleware/role-middleware')
const {  addBorrower , getAllBorrowers , getBorrowerById , udpateBorrower , deleteBorrower ,returnBook , borrowBook } = require('../controllers/borrowerController');




/**
 * @swagger
 * components:
 *   schemas:
 *     AddBorrowerRequest:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *             required: true
 *           email:
 *             type: string
 *             required: true
 *           phone:
 *             type: string
 *             required: true
 * 
 * 
 *     UpdateBorrowerRequest:
 *         type: object
 *         properties:
 *           name:
 *             type: string
 *           email:
 *             type: string
 *           phone:
 *             type: string
 */


// Add a new borrower
/**
 * @swagger
 * /borrowers:
 *   post:
 *     summary: Add a new borrower
 *     tags: [Borrowers]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AddBorrowerRequest'
 *     responses:
 *       201:
 *         description: Borrower added successfully
 *       400:
 *         description: Bad request
 */
router.post('/' , roleMiddleware(['admin']) , addBorrower );

// Get all borrowers
/**
 * @swagger
 * /borrowers:
 *   get:
 *     summary: Get all borrowers
 *     tags: [Borrowers]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of all borrowers
 *       500:
 *         description: Internal server error
 */
router.get('/' , roleMiddleware(['admin', 'librarian']) , getAllBorrowers);

//Get a borrower by ID
/**
 * @swagger
 * /borrowers/{id}:
 *   get:
 *     summary: Get a borrower by ID
 *     tags: [Borrowers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The borrower ID
 *     responses:
 *       200:
 *         description: Borrower details
 *       404:
 *         description: Borrower not found
 */
router.get('/:id' , roleMiddleware(['admin', 'librarian']) , getBorrowerById);


// Update a borrower
/**
 * @swagger
 * /borrowers/{id}:
 *   put:
 *     summary: Update a borrower
 *     tags: [Borrowers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The borrower ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateBorrowerRequest'
 *     responses:
 *       200:
 *         description: Borrower updated successfully
 *       404:
 *         description: Borrower not found
 */
router.put('/:id' , roleMiddleware(['admin']) , udpateBorrower)

// Delete a borrower
/**
 * @swagger
 * /borrowers/{id}:
 *   delete:
 *     summary: Delete a borrower
 *     tags: [Borrowers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The borrower ID
 *     responses:
 *       200:
 *         description: Borrower deleted successfully
 *       404:
 *         description: Borrower not found
 */
router.delete('/:id' , roleMiddleware(['admin']) , deleteBorrower)


//Borrow a book
/**
 * @swagger
 * /borrowers/{id}/borrow:
 *   post:
 *     summary: Borrow a book
 *     tags: [Borrowers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The borrower ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book borrowed successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Borrower or book not found
 */
router.post('/:id/borrow' , roleMiddleware(['borrower']) , borrowBook)

//Return a borrowed book
/**
 * @swagger
 * /borrowers/{id}/return:
 *   post:
 *     summary: Return a borrowed book
 *     tags: [Borrowers]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The borrower ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bookId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Borrower or book not found
 */
router.post('/:id/return' , roleMiddleware(['borrower']) , returnBook)

module.exports = router;



