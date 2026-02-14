"use client";
import Link from "next/link.js";
import type { CardInfo } from "../../utility/Type";
import Image from "next/image";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  IconButton,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { usePathname, useRouter } from "next/navigation";
import ShareIcon from "@mui/icons-material/Share";
import EditSquareIcon from "@mui/icons-material/EditSquare";

export default function BlogCard({ id, title, body, imgUrl }: CardInfo) {
  const router = useRouter();
  const pathname = usePathname();

  const deletePost = async (postId: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_API}/posts/${postId}`,
      {
        method: "DELETE",
      },
    );
    if (response.ok) {
      router.refresh();
    }
  };

  const handleDelete = (postId: string) => {
    deletePost(postId);
  };

  return (
    <div id={id} className="">
      <div className="">
        <Card className="">
          <CardActionArea>
            <Link
              href={`/blog/${id}`}
              className="hover:opacity-90 backdrop-opacity-50"
            >
              <div className="relative h-60 w-full">
                <Image
                  src={imgUrl}
                  alt="Description of image"
                  fill
                  className="object-cover rounded-md"
                  loading="eager"
                />
              </div>

              <CardContent>
                <div className="overflow-hidden">
                  <h3 className="text-2xl h-10">{title.slice(0, 30)}...</h3>
                </div>
                <div className="wrap-break-word">
                  <p className="h-15 sm:h-20 text-balance">
                    {body.slice(0, 100)}
                  </p>
                </div>
              </CardContent>
            </Link>
          </CardActionArea>
          <CardActions>
            {pathname === "/dashboard" && (
              <div className="flex items-center">
                <Button
                  size="small"
                  color="primary"
                  onClick={() => handleDelete(id)}
                >
                  <DeleteIcon sx={{ color: "red" }} />
                </Button>
                <Link href={`update-blog/${id}`}>
                  <Button size="small" color="primary">
                    <EditSquareIcon />
                  </Button>
                </Link>
              </div>
            )}

            <div className="flex items-center justify-between w-full">
              <div>
                <Link href={`/blog/${id}`}>
                  <Button size="small">Read More</Button>
                </Link>
              </div>

              <div>
                <IconButton aria-label="share">
                  <ShareIcon />
                </IconButton>
              </div>
            </div>
          </CardActions>
        </Card>
      </div>
    </div>
  );
}
