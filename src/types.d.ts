 
import { DataTypeAbstract, ColumnOptions } from "sequelize";

type SequelizeAttribute = string | DataTypeAbstract | ColumnOptions;

declare global {
  type SequelizeAttributes<T extends { [key: string]: any }> = {
    [P in keyof T]: SequelizeAttribute
  };
}