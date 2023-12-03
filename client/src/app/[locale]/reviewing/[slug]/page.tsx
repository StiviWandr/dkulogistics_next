import ArticleReviewForm from "@/Modules/Reviewing/ArticleReviewForm/ArticleReviewForm";

export default function ReviewArticles ({ params }: { params: { slug: string } }) {
    return (
        <>
            <ArticleReviewForm articleId={params.slug}/>
        </>
    );
}