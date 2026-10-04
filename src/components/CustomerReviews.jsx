import React from 'react';
import { Star, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

const REVIEWS_PER_PAGE = 5;

export default function CustomerReviews({ productId }) {
  const [reviews, setReviews] = React.useState([]);
  const [reviewCount, setReviewCount] = React.useState(0);
  const [averageRating, setAverageRating] = React.useState(0);

  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [hasMore, setHasMore] = React.useState(false);

  const [page, setPage] = React.useState(0);

  React.useEffect(() => {
    async function fetchReviews() {
      setLoading(true);
      setPage(0);

      // Get review summary
      const { data: summary, error: summaryError } =
        await supabase.rpc(
          'get_product_review_summary',
          {
            p_product_id: productId,
          }
        );

      if (summaryError) {
        console.error(
          'Error fetching review summary:',
          summaryError
        );
      } else if (summary?.length > 0) {
        setReviewCount(Number(summary[0].review_count));
        setAverageRating(Number(summary[0].average_rating));
      }

      // Get first 5 reviews
      const { data: reviewData, error: reviewError } =
        await supabase
          .from('reviews')
          .select('*')
          .eq('product_id', productId)
          .order('created_at', { ascending: false })
          .range(0, REVIEWS_PER_PAGE - 1);

      if (reviewError) {
        console.error(
          'Error fetching reviews:',
          reviewError
        );
        setLoading(false);
        return;
      }

      // Check if more reviews exist
      setHasMore(
        reviewData.length === REVIEWS_PER_PAGE
      );

      if (!reviewData || reviewData.length === 0) {
        setReviews([]);
        setLoading(false);
        return;
      }

      // Get user IDs
      const userIds = [
        ...new Set(
          reviewData.map((review) => review.user_id)
        ),
      ];

      // Get customer profiles
      const { data: profiles, error: profileError } =
        await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', userIds);

      if (profileError) {
        console.error(
          'Error fetching profiles:',
          profileError
        );
      }

      // Connect reviews with profiles
      const reviewsWithProfiles = reviewData.map(
        (review) => ({
          ...review,
          profile:
            profiles?.find(
              (profile) =>
                profile.id === review.user_id
            ) || null,
        })
      );

      setReviews(reviewsWithProfiles);
      setLoading(false);
    }

    if (productId) {
      fetchReviews();
    }
  }, [productId]);

  const handleShowMore = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    const nextPage = page + 1;

    const from = nextPage * REVIEWS_PER_PAGE;
    const to =
      from + REVIEWS_PER_PAGE - 1;

    const { data: reviewData, error: reviewError } =
      await supabase
        .from('reviews')
        .select('*')
        .eq('product_id', productId)
        .order('created_at', { ascending: false })
        .range(from, to);

    if (reviewError) {
      console.error(
        'Error loading more reviews:',
        reviewError
      );

      setLoadingMore(false);
      return;
    }

    // Get user IDs for new reviews
    const userIds = [
      ...new Set(
        reviewData.map((review) => review.user_id)
      ),
    ];

    let profiles = [];

    if (userIds.length > 0) {
      const { data, error: profileError } =
        await supabase
          .from('profiles')
          .select('id, full_name, avatar_url')
          .in('id', userIds);

      if (profileError) {
        console.error(
          'Error fetching profiles:',
          profileError
        );
      } else {
        profiles = data || [];
      }
    }

    // Connect reviews with profiles
    const reviewsWithProfiles = reviewData.map(
      (review) => ({
        ...review,
        profile:
          profiles.find(
            (profile) =>
              profile.id === review.user_id
          ) || null,
      })
    );

    // Add new reviews to existing reviews
    setReviews((prev) => [
      ...prev,
      ...reviewsWithProfiles,
    ]);

    setPage(nextPage);

    // If fewer than 5 came back, we're finished
    setHasMore(
      reviewData.length === REVIEWS_PER_PAGE
    );

    setLoadingMore(false);
  };

  return (
    <div className="rounded-2xl border bg-gray-50 p-6">

      {/* Heading */}
      <h3 className="font-bold text-gray-900">
        Customer Reviews
      </h3>

      {/* Overall Rating */}
      <div className="mt-2 flex items-baseline space-x-2">
        <span className="text-3xl font-extrabold text-gray-900">
          {averageRating.toFixed(1)}
        </span>

        <div className="flex text-yellow-400">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.round(averageRating)
                  ? 'fill-current'
                  : ''
              }`}
            />
          ))}
        </div>

        <span className="text-xs text-gray-500">
          ({reviewCount}{' '}
          {reviewCount === 1
            ? 'review'
            : 'reviews'})
        </span>
      </div>

      <hr className="my-6 border-gray-200" />

      {/* Reviews */}
      <div className="space-y-6">

        {loading ? (
          <p className="text-sm text-gray-500">
            Loading reviews...
          </p>
        ) : reviews.length === 0 ? (
          <p className="text-sm text-gray-500">
            No reviews yet. Be the first to
            review this product.
          </p>
        ) : (
          reviews.map((review) => {
            const profile = review.profile;

            const customerName =
              profile?.full_name?.trim() ||
              'Customer';

            const avatarUrl =
              profile?.avatar_url;

            const initial =
              customerName
                .charAt(0)
                .toUpperCase();

            return (
              <div
                key={review.id}
                className="space-y-3"
              >

                {/* Customer */}
                <div className="flex items-center space-x-3">

                  {/* Avatar */}
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt={customerName}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300 font-bold text-gray-700 text-xs">
                      {initial}
                    </div>
                  )}

                  <div>
                    <div className="flex items-center space-x-1">

                      <span className="text-xs font-bold text-gray-900">
                        {customerName}
                      </span>

                      <span className="flex items-center text-[10px] font-medium text-blue-600">
                        <CheckCircle className="mr-0.5 h-3 w-3" />
                        Verified Purchase
                      </span>

                    </div>

                    {/* Rating */}
                    <div className="flex text-yellow-400">
                      {[...Array(review.rating)].map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="h-3 w-3 fill-current"
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* Comment */}
                {review.comment && (
                  <p className="text-xs leading-relaxed text-gray-600">
                    {review.comment}
                  </p>
                )}

                {/* Date */}
                <p className="text-[10px] text-gray-400">
                  {new Date(
                    review.created_at
                  ).toLocaleDateString()}
                </p>

              </div>
            );
          })
        )}

      </div>

      {/* Show More */}
      {!loading &&
        reviews.length > 0 &&
        hasMore && (
          <div className="mt-8 text-center">
            <button
              onClick={handleShowMore}
              disabled={loadingMore}
              className="rounded-lg border border-sky-500 px-5 py-2 text-sm font-medium text-sky-600 transition hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loadingMore
                ? 'Loading...'
                : 'Show more reviews'}
            </button>
          </div>
        )}

    </div>
  );
}