import { User } from "lucide-react";
import { defineField, defineType } from "sanity";

export default defineType({
    name: "author",
    title: "Author",
    type: "document",
    icon: User,
    fields: [
        defineField({
            name: "name",
            title: "Author Name",
            type: "string",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "photo",
            title: "Profile Photo",
            type: "image",
            description: "Upload a profile photo. Recommended size 320 x 320",
            fields: [
                {
                    name: "alt",
                    title: "Alt",
                    type: "string",
                    description: "Describe this photo.",
                },
            ],
            options: {
                hotspot: true,
                metadata: ["lqip"],
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "twitterUrl",
            title: "Twitter URL",
            type: "url",
            validation: (rule) => rule.required(),
        }),
    ],
});
