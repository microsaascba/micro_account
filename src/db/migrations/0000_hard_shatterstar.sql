	CREATE TABLE `companies` (
		`id` text PRIMARY KEY NOT NULL,
		`business_name` text NOT NULL,
		`cuit` text NOT NULL,
		`tax_condition` text NOT NULL,
		`is_active` integer DEFAULT true,
		`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
	);
	--> statement-breakpoint
	CREATE UNIQUE INDEX `companies_cuit_unique` ON `companies` (`cuit`);--> statement-breakpoint
	CREATE TABLE `company_users` (
		`user_id` text NOT NULL,
		`company_id` text NOT NULL,
		`role_id` text NOT NULL,
		`assigned_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL,
		PRIMARY KEY(`user_id`, `company_id`),
		FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
		FOREIGN KEY (`company_id`) REFERENCES `companies`(`id`) ON UPDATE no action ON DELETE no action,
		FOREIGN KEY (`role_id`) REFERENCES `roles`(`id`) ON UPDATE no action ON DELETE no action
	);
	--> statement-breakpoint
	CREATE TABLE `roles` (
		`id` text PRIMARY KEY NOT NULL,
		`name` text NOT NULL,
		`description` text
	);
	--> statement-breakpoint
	CREATE TABLE `users` (
		`id` text PRIMARY KEY NOT NULL,
		`email` text NOT NULL,
		`password_hash` text NOT NULL,
		`name` text NOT NULL,
		`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
	);
	--> statement-breakpoint
	CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);