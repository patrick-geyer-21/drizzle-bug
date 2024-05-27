import { pgEnum, pgSchema, pgTable } from "drizzle-orm/pg-core";
import { varchar } from "drizzle-orm/pg-core";

export enum OrderType {
    BUY = "BUY",
    LIMITBUY = "LIMITBUY",
    SELL = "SELL",
    LIMITSELL = "LIMITSELL",
  }

export const typeEnum = pgEnum("type", Object.values(OrderType) as any as [string, ...string[]]);

export const orders = pgTable("orders", {
  id: varchar("id").primaryKey(),
  type: typeEnum("type"),
});

export type Order = typeof orders.$inferSelect;