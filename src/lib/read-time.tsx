import { PortableTextBlock } from "sanity";

export function readTime({ blocks }: { blocks: PortableTextBlock[] }) {
  const avgReadTime: number = 185;

  const totalWords = blocks.reduce((count, block) => {
    return (
      count + block._type.split(/\s+/).filter((word) => word.length > 0).length
    );
  }, 0);

  return `${Math.ceil(totalWords / avgReadTime)} min`;
}
