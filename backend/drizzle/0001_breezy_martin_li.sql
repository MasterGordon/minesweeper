CREATE TABLE `collection` (
	`user` text PRIMARY KEY NOT NULL,
	`collection` blob NOT NULL
);
--> statement-breakpoint
CREATE TABLE `gems` (
	`user` text PRIMARY KEY NOT NULL,
	`count` integer NOT NULL,
	`totalCount` integer NOT NULL
);
