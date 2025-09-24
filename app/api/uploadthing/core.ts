import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

// Optional: Add authentication check
const auth = (req: Request) => ({ id: "fakeId" }); // Replace with your auth logic

export const ourFileRouter = {
  // Blog image uploader
  blogImageUploader: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(async ({ req }) => {
      // Optional: Add authentication
      const user = await auth(req);
      if (!user) throw new UploadThingError("Unauthorized");
      return { userId: user.id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      // Optional: Save file info to database
      // await db.image.create({
      //   data: {
      //     url: file.url,
      //     userId: metadata.userId,
      //   },
      // });

      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
