import "server-only";
import {
    createClient,
    type ClientConfig,
    type QueryParams,
} from "@sanity/client";
import { projectId, dataset, apiVersion, mode } from "@/sanity/env";

const config: ClientConfig = {
    projectId,
    dataset,
    apiVersion,
    useCdn: mode === "development" ? true : false,
    ignoreBrowserTokenWarning: true,
    //   token,
    perspective: "published",
};

const client = createClient(config);

export async function sanityFetch<QueryResponse>({
    query,
    qParams,
    tags,
}: {
    query: string;
    qParams?: QueryParams;
    tags: string[];
}): Promise<QueryResponse> {
    return client.fetch<QueryResponse>(query, qParams, {
        cache: mode === "development" ? "no-cache" : "force-cache",
        next: { tags },
    });
}
