// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import devcert from "@idleberg/vite-plugin-devcert";

// https://astro.build/config
export default defineConfig({
	integrations: [
		starlight({
			title: "Little Printer",
			favicon: "/favicon.png",
			customCss: ["./src/styles/custom.css"],
			editLink: {
				baseUrl: "https://github.com/little-printer/website/edit/main/",
			},
			social: [
				{
					icon: "comment",
					label: "Forum",
					href: "https://github.com/little-printer/little-printer.github.io/discussions",
				},
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/little-printer",
				},
			],
			sidebar: [
				{
					label: "Reference",
					slug: "reference",
				},
				{
					label: "Structure",
					items: [
						{
							label: "Overview",
							slug: "reference/structure",
						},
						{
							label: "meta.json",
							slug: "reference/structure/meta_json",
						},
						{ label: "edition", slug: "reference/structure/edition" },
						{ label: "sample", slug: "reference/structure/sample" },
						{ label: "icon.png", slug: "reference/structure/icon" },
						{
							label: "validate_config",
							slug: "reference/structure/validate_config",
						},
						{ label: "configure", slug: "reference/structure/configure" },
					],
				},
				{
					label: "Push API",
					items: [
						{
							label: "Overview",
							slug: "reference/push-api",
						},
					],
				},
				{
					label: "Style guide",
					items: [
						{
							label: "Layout",
							slug: "reference/style-guide/layout",
						},
						{
							label: "Images",
							slug: "reference/style-guide/images",
						},
						{
							label: "Icons",
							slug: "reference/style-guide/icons",
						},
						{
							label: "Fonts",
							slug: "reference/style-guide/fonts",
						},
					],
				},
				{
					label: "Examples",
					items: [
						{
							label: "Hello World",
							slug: "examples/hello_world",
						},
						// {
						// 	label: "Miniseries",
						// 	slug: "examples/miniseries",
						// },
						// {
						// 	label: "Push API",
						// 	slug: "examples/push-api",
						// },
					],
				},
			],
		}),
	],
	vite: {
		plugins: [devcert()],
	},
});
