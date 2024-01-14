import imageUrlBuilder from "@sanity/image-url";
import { dataset, projectId } from "./env";

const imageBuilder = imageUrlBuilder({
    projectId: projectId || "",
    dataset: dataset || "production",
});

export function urlFor(source: any) {
    return imageBuilder.image(source).auto("format").fit("max");
}


