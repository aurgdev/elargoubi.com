import NotFoundComponent from "@/components/pages/NotFound";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Post Not Found",
};

export default function PostNotFound() {
  return (
    <NotFoundComponent
      title="Post Not Found"
      description="You've managed to navigate to a post that probably does not exist or has never existed on this site. Kindly go back home or read the featured posts below."
    />
  );
}
