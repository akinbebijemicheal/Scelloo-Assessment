import { Router } from "express"
import { requireUser, requireRole} from "../../middleware";

import * as adminController from "../../controllers/admin"

const router = Router()

// Get all tasks with filtering - admin only
router.get("/tasks", requireUser, requireRole("admin"), adminController.getAllTasks)

// Activate/deactivate user - admin only
router.post("/user/status", requireUser, requireRole("admin"), adminController.updateUserStatus)

// Manually mark task complete - admin only
router.post("/task/complete", requireUser, requireRole("admin"), adminController.markTaskCompleteAdmin)

router.delete("/task/:taskId", requireUser, requireRole("admin"), adminController.deleteTaskAdmin)

export default router

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin-level operations
 */

/**
 * @swagger
 * /v1/admin/tasks:
 *   get:
 *     summary: Get all tasks with optional filters (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         description: Filter tasks by status
 *       - in: query
 *         name: planId
 *         schema:
 *           type: string
 *         description: Filter tasks by planId
 *       - in: query
 *         name: senderId
 *         schema:
 *           type: string
 *         description: Filter tasks by senderId
 *       - in: query
 *         name: recieverId
 *         schema:
 *           type: string
 *         description: Filter tasks by recieverId
 *       - in: query
 *         name: dateFrom
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter tasks created after this date
 *       - in: query
 *         name: dateTo
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter tasks created before this date
 *     responses:
 *       200:
 *         description: List of filtered tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       401:
 *         description: Unauthorized
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /v1/admin/user/status:
 *   post:
 *     summary: Activate or deactivate a user (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - isActive
 *             properties:
 *               userId:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *             example:
 *               userId: "abc123"
 *               isActive: false
 *     responses:
 *       200:
 *         description: User status updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Invalid input
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /v1/admin/task/complete:
 *   post:
 *     summary: Manually mark a task as complete (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - taskId
 *             properties:
 *               taskId:
 *                 type: string
 *             example:
 *               taskId: "task-id-here"
 *     responses:
 *       200:
 *         description: Task marked as complete
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 task:
 *                   $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *       403:
 *         description: Forbidden
 */

/**
 * @swagger
 * /v1/admin/task/{taskId}:
 *   delete:
 *     summary: Delete a task (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: taskId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the task to delete
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Task not found
 *       403:
 *         description: Forbidden
 */
