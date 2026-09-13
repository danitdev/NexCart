import z from "zod";


export const postReviewSchema = z.object({
    rating: z.coerce.number().int().min(1).max(5),
    comment: z.string().trim().min(1).max(1000)
})



export type UpdateReview = z.infer<typeof postReviewSchema>;