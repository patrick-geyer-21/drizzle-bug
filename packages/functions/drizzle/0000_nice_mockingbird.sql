DO $$ BEGIN
 CREATE TYPE "public"."type" AS ENUM('BUY', 'LIMITBUY', 'SELL', 'LIMITSELL');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "orders" (
	"id" varchar PRIMARY KEY NOT NULL,
	"type" "type"
);
