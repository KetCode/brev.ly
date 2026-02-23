CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"shortcode" text,
	"access_count" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "links_shortcode_unique" UNIQUE("shortcode")
);
