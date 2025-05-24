import Task from "../models/Task"
import User from "../models/User"
import { Op } from "sequelize"
import { ApiError } from "../util/ApiError"

interface TaskFilterOptions {
  status?: string
  planId?: string
  senderId?: string
  recieverId?: string
  dateFrom?: string
  dateTo?: string
}

export const getAllTasksService = async (filters: TaskFilterOptions) => {
  const whereClause: any = {}

  if (filters.status) whereClause.status = filters.status
  if (filters.planId) whereClause.planId = filters.planId
  if (filters.senderId) whereClause.senderId = filters.senderId
  if (filters.recieverId) whereClause.recieverId = filters.recieverId

  if (filters.dateFrom || filters.dateTo) {
    whereClause.created_at = {}
    if (filters.dateFrom) whereClause.created_at[Op.gte] = new Date(filters.dateFrom)
    if (filters.dateTo) whereClause.created_at[Op.lte] = new Date(filters.dateTo)
  }

  return Task.findAll({ where: whereClause, order: [["created_at", "DESC"]] })
}

export const updateUserStatusService = async (userId: string, active: boolean) => {
  const user = await User.findByPk(userId)
  if (!user) throw new ApiError(404, "User not found")
  await user.update({ active })
  return user
}

export const markTaskCompleteAdminService = async (taskId: string) => {
  const task = await Task.findByPk(taskId)
  if (!task) throw new ApiError(404, "Task not found")
  await task.update({ status: "completed", timerStartedAt: null })
  return task
}
export const deleteTaskAdminService = async (taskId: string) => {
  const task = await Task.findByPk(taskId)
  if (!task) throw new ApiError(404, "Task not found")
  await task.destroy()
  return { message: "Task deleted successfully" }
}