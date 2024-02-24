import { ProjectType } from "@/types";
import { Github, LinkIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "../ui/card";

type ProjectProps = {
  project: ProjectType;
};

export default function ProjectCard({ project }: ProjectProps) {
  return (
    <Card className="group relative flex flex-col rounded-2xl justify-between p-5 transition duration-200 hover:bg-secondary">
      <Link href={`/projects/${project.slug}`}>
        <div>
          <div className="relative h-40 sm:h-56 w-full overflow-hidden rounded-2xl">
            <Image
              src={project.logo}
              alt={project.name}
              className="w-full rounded-2xl bg-zinc-300 object-contain  dark:bg-zinc-600"
              //   width="300"
              //   height="300"
              fill
            />
          </div>
          <h2 className="mt-6 text-lg font-semibold opacity-90">
            {project.name}
          </h2>
          <p className="relative z-10 mt-2 text-sm opacity-60 ">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-x-3 mt-3">
            {project.stack?.map((tag, index) => (
              <p
                key={index}
                className="relative z-10 mt-3 inline rounded-full bg-secondary px-2 text-xs font-medium"
              >
                {tag}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-center p-auto justify-between">
          <div className="relative z-10 mt-6 flex text-sm font-medium text-blue-700 transition hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500 ">
            {project.projectUrl && (
              <>
                <LinkIcon className="h-6 w-6 flex-none" />
                <Link
                  href={project.projectUrl}
                  className="ml-2"
                  target="_blank"
                  aria-label={project.projectUrl}
                >
                  Live link
                </Link>
              </>
            )}
          </div>
          <div className="relative z-10 mt-6 flex text-sm font-medium text-blue-700 transition hover:text-blue-800 dark:text-blue-300 dark:hover:text-blue-500 ">
            {project.githubUrl && (
              <>
                <Github className="h-6 w-6 flex-none" />
                <Link
                  href={project.githubUrl}
                  className="ml-2"
                  target="_blank"
                  aria-label={project.githubUrl}
                >
                  Live link
                </Link>
              </>
            )}
          </div>
        </div>
      </Link>
    </Card>
  );
}
