CREATE TABLE `games` (
	`uuid` text PRIMARY KEY NOT NULL,
	`user` text NOT NULL,
	`gameState` blob NOT NULL,
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
--> statement-breakpoint
CREATE TABLE `userSettings` (
	`user` text PRIMARY KEY NOT NULL,
	`settings` text NOT NULL
);
--> statement-breakpoint
CREATE INDEX `user_idx` ON `games` (`user`);--> statement-breakpoint
CREATE INDEX `started_idx` ON `games` (`timestamp`);--> statement-breakpoint
CREATE INDEX `user_started_idx` ON `games` (`user`,`timestamp`);--> statement-breakpoint
CREATE INDEX `full_idx` ON `games` (`user`,`timestamp`,`uuid`);