CREATE TABLE `games` (
	`uuid` text PRIMARY KEY NOT NULL,
	`user` text NOT NULL,
	`gameState` text NOT NULL,
	`stage` integer NOT NULL,
	`finished` integer DEFAULT 0 NOT NULL,
	`timestamp` integer NOT NULL,
	FOREIGN KEY (`user`) REFERENCES `users`(`name`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`name` text PRIMARY KEY NOT NULL,
	`password` text NOT NULL
);
