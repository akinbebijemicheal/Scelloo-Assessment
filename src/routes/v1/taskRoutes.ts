import { Router } from "express"
import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  startTaskTimer,
  stopTaskTimer,
  getTaskById,
  reportTimeSpent,
  markTaskCompleteController
} from "../../controllers/task"
import { requireUser } from "../../middleware"

const taskRouter = Router()

taskRouter.post("/", requireUser, createTask)
taskRouter.post("/all", requireUser, getTasks)
taskRouter.get("/get/:id", requireUser, getTaskById)
taskRouter.patch("/update/:id", requireUser, updateTask)
taskRouter.patch("/complete/:id", requireUser, markTaskCompleteController)
taskRouter.post("/start/:id", requireUser, startTaskTimer)
taskRouter.post("/stop/:id", requireUser, stopTaskTimer)
taskRouter.delete("/", requireUser, deleteTask)
taskRouter.get("/reportTimeSpent", requireUser, reportTimeSpent)

export default taskRouter

/**
 * @swagger
 * tags:
 *   name: Task
 *   description: Task management operations
 */

/**
 * @swagger
 * /v1/task/:
 *   post:
 *     summary: Create a new task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TaskInput'
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Invalid input
 */

/**
 * @swagger
 * /v1/task/all:
 *   post:
 *     summary: Get all tasks for the authenticated user with optional filters
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *               planId:
 *                 type: string
 *               recieverId:
 *                 type: string
 *               dateFrom:
 *                 type: string
 *                 format: date
 *               dateTo:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: List of tasks
 */

/**
 * @swagger
 * /v1/task/get/{id}:
 *   get:
 *     summary: Get a task by ID
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Task ID
 *     responses:
 *       200:
 *         description: Task found
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /v1/task/update/{id}:
 *   patch:
 *     summary: Update a task by ID
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Fields to update
 *     responses:
 *       200:
 *         description: Task updated
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /v1/task/complete/{id}:
 *   patch:
 *     summary: Mark task as complete
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task marked as complete
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /v1/task/start/{id}:
 *   post:
 *     summary: Start task timer
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task timer started
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /v1/task/stop/{id}:
 *   post:
 *     summary: Stop task timer and calculate time spent
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Task timer stopped and time recorded
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /v1/task/:
 *   delete:
 *     summary: Delete a task
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               taskId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Task deleted
 *       404:
 *         description: Task not found
 */

/**
 * @swagger
 * /v1/task/reportTimeSpent:
 *   get:
 *     summary: Get total time spent by the user on tasks
 *     tags: [Task]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Total time report
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalSeconds:
 *                   type: number
 */
