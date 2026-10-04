import React, { useEffect, useState } from 'react';
import {
  Star,
  Trash2,
  Search,
  Filter,
} from 'lucide-react';

import {
  getAllReviews,
  deleteReview,
} from '../services/adminService';

export default function AdminReviews() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  const [search, setSearch] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');

  const loadReviews = async () => {
    try {
      setLoading(true);

      const data = await getAllReviews();

      setReviews(data);
    } catch (error) {
      console.error('Failed to load reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  const handleDelete = async (reviewId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this review?'
    );

    if (!confirmed) return;

    try {
      setDeletingId(reviewId);

      await deleteReview(reviewId);

      setReviews((prev) =>
        prev.filter(
          (review) => review.id !== reviewId
        )
      );
    } catch (error) {
      console.error(
        'Failed to delete review:',
        error
      );

      alert(error.message);
    } finally {
      setDeletingId(null);
    }
  };

  const filteredReviews = reviews.filter((review) => {
    const customerName =
      review.profile?.full_name?.trim() ||
      'Customer';

    const productName =
      review.product?.name ||
      'Unknown Product';

    const searchText = search.toLowerCase();

    const matchesSearch =
      productName
        .toLowerCase()
        .includes(searchText) ||
      customerName
        .toLowerCase()
        .includes(searchText) ||
      (review.comment || '')
        .toLowerCase()
        .includes(searchText);

    const matchesRating =
      ratingFilter === 'all' ||
      review.rating === Number(ratingFilter);

    return matchesSearch && matchesRating;
  });

  if (loading) {
    return (
      <div className="p-6">
        <p className="font-semibold text-sky-600">
          Loading reviews...
        </p>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Reviews
        </h1>

        <p className="mt-1 text-sm text-slate-500">
          Manage customer reviews for your products.
        </p>
      </div>

      {/* Search + Filter */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search product, customer or comment..."
            className="w-full rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100"
          />
        </div>

        {/* Rating Filter */}
        <div className="relative">
          <Filter
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <select
            value={ratingFilter}
            onChange={(e) =>
              setRatingFilter(e.target.value)
            }
            className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2.5 pl-10 pr-8 text-sm outline-none focus:border-sky-400 focus:ring-2 focus:ring-sky-100 sm:w-44"
          >
            <option value="all">
              All ratings
            </option>

            <option value="5">
              5 stars
            </option>

            <option value="4">
              4 stars
            </option>

            <option value="3">
              3 stars
            </option>

            <option value="2">
              2 stars
            </option>

            <option value="1">
              1 star
            </option>
          </select>
        </div>
      </div>

      {/* Reviews */}
      {filteredReviews.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-10 text-center">
          <p className="text-slate-500">
            {reviews.length === 0
              ? 'No reviews yet.'
              : 'No reviews match your search or filter.'}
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredReviews.map((review) => {
            const customerName =
              review.profile?.full_name?.trim() ||
              'Customer';

            return (
              <div
                key={review.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0 flex-1">
                    {/* Product */}
                    <p className="text-sm font-semibold text-sky-600">
                      {review.product?.name ||
                        'Unknown Product'}
                    </p>

                    {/* Customer */}
                    <p className="mt-1 text-xs text-slate-500">
                      By {customerName}
                    </p>

                    {/* Rating */}
                    <div className="mt-2 flex items-center gap-1">
                      {[...Array(5)].map(
                        (_, index) => (
                          <Star
                            key={index}
                            className={`h-4 w-4 ${
                              index < review.rating
                                ? 'fill-current text-amber-400'
                                : 'text-slate-300'
                            }`}
                          />
                        )
                      )}

                      <span className="ml-1 text-xs font-semibold text-slate-600">
                        {review.rating}/5
                      </span>
                    </div>

                    {/* Comment */}
                    {review.comment && (
                      <p className="mt-3 text-sm leading-relaxed text-slate-700">
                        {review.comment}
                      </p>
                    )}

                    {/* Date */}
                    <p className="mt-3 text-xs text-slate-400">
                      {new Date(
                        review.created_at
                      ).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Delete */}
                  <button
                    type="button"
                    onClick={() =>
                      handleDelete(review.id)
                    }
                    disabled={
                      deletingId === review.id
                    }
                    className="flex items-center justify-center gap-2 rounded-lg bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    <Trash2 size={16} />

                    {deletingId === review.id
                      ? 'Deleting...'
                      : 'Delete'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}