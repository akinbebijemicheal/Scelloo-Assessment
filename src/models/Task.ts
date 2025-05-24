import { DataTypes, Model } from "sequelize"
import sequelizeConnection from "../db/connection"

class Task extends Model {
  public id!: string
  public planId!: string
  public userId!: string  // user who owns or created the task
  public title!: string
  public description!: string | null
  public status!: "pending" | "in-progress" | "completed"

  public timerStartedAt!: Date | null // when task work started
  public totalTimeSpent!: number // in seconds, total time spent working on task

  // timestamps!
  public readonly created_at!: Date
  public readonly last_updated!: Date
}

Task.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    planId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("pending", "in-progress", "completed"),
      allowNull: false,
      defaultValue: "pending",
    },
    timerStartedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: null,
    },
    totalTimeSpent: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0, // in seconds
    },
  },
  {
    sequelize: sequelizeConnection,
    tableName: "tasks",
    createdAt: "created_at",
    updatedAt: "last_updated",
  }
)

export default Task
