import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { Link, useParams } from 'react-router-dom';
import { Star } from 'lucide-react';
import {
  getOrderDetails,
  getOrderItems,
} from '../services/orderService';
import { supabase } from '../lib/supabase';

export default function OrderDetails() {
  const { orderId } = useParams();
  const { user } = useAuth();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [orderItems, setOrderItems] = useState([]);

  const [reviewingProduct, setReviewingProduct] = useState(null);
  const [reviewedProducts, setReviewedProducts] = useState([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [reviewError, setReviewError] = useState('');
  const [reviewSubmitting, setReviewSubmitting] = useState(false);

  useEffect(() => {
    const loadOrder = async () => {
      if (!user || !orderId) return;

      try {
        const data = await getOrderDetails(user.id, orderId);
        const items = await getOrderItems(orderId);

        setOrder(data);
        setOrderItems(items);
      } catch (error) {
        console.error('Load order details error:', error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadOrder();
  }, [user, orderId]);

  useEffect(() => {
    const loadReviewedProducts = async () => {
      if (!user || orderItems.length === 0) return;

      const productIds = orderItems.map((item) => item.product_id);

      const { data, error } = await supabase
        .from('reviews')
        .select('product_id')
        .eq('user_id', user.id)
        .in('product_id', productIds);

      if (error) {
        console.error('Load reviewed products error:', error);
        return;
      }

      setReviewedProducts(
        data.map((review) => review.product_id)
      );
    };

    loadReviewedProducts();
  }, [user, orderItems]);

  const handleSubmitReview = async () => {
    if (!reviewingProduct || !user) return;

    setReviewSubmitting(true);
    setReviewError('');

    const { error } = await supabase
      .from('reviews')
      .insert({
        product_id: reviewingProduct.product_id,
        user_id: user.id,
        rating,
        comment: comment.trim() || null,
      });

    if (error) {
      console.error('Review error:', error);
      setReviewError(error.message);
    } else {
      setReviewedProducts((prev) => [
        ...prev,
        reviewingProduct.product_id,
      ]);

      setReviewingProduct(null);
      setRating(5);
      setComment('');
    }

    setReviewSubmitting(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-slate-500 font-medium">
          Loading order details...
        </p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-xl font-bold text-slate-900">
            Order not found
          </h1>

          <p className="text-sm text-red-500 mt-2">
            {error || 'We could not find this order.'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 px-4 py-8">
      <div className="max-w-4xl mx-auto">

        <h1 className="text-2xl font-bold text-slate-900">
          Order Details
        </h1>

        <Link
          to="/orders"
          className="inline-block mt-2 text-sm text-blue-600 font-medium hover:underline"
        >
          ← Back to My Orders
        </Link>

        <p className="text-sm text-slate-500 mt-1">
          Order #{order.id}
        </p>

        {/* ORDER ITEMS */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mt-6">
          <h2 className="font-bold text-slate-900">
            Items in this order
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            {orderItems.length} item{orderItems.length !== 1 ? 's' : ''}
          </p>

          <div className="mt-4 space-y-4">
            {orderItems.map((item) => (
              <div
                key={item.id}
                className="border-b border-slate-100 pb-4 last:border-b-0 last:pb-0"
              >
                {/* PRODUCT INFO */}
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <h3 className="font-semibold text-slate-900">
                      {item.product_name}
                    </h3>

                    <p className="text-sm text-slate-500 mt-1">
                      ₦{Number(item.unit_price).toLocaleString('en-NG', {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}{' '}
                      × {item.quantity}
                    </p>
                  </div>

                  <span className="font-bold text-slate-900">
                    ₦{Number(item.subtotal).toLocaleString('en-NG', {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>

                {/* REVIEW ACTION */}
                {order.order_status === 'delivered' && (
                  <div className="mt-4">
                    {reviewedProducts.includes(item.product_id) ? (
                      <span className="text-sm font-semibold text-green-600">
                        ✓ Review Added
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          setReviewingProduct(item);
                          setRating(5);
                          setComment('');
                          setReviewError('');
                        }}
                        className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                      >
                        Add Review
                      </button>
                    )}
                  </div>
                )}

                {/* REVIEW FORM */}
                {reviewingProduct?.id === item.id && (
                  <div className="mt-4 rounded-xl bg-slate-50 border border-slate-200 p-4">
                    <h4 className="font-semibold text-slate-900">
                      Review {item.product_name}
                    </h4>

                    {/* STAR RATING */}
                    <div className="mt-4">
                      <p className="text-sm font-medium text-slate-700 mb-2">
                        Your rating
                      </p>

                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="p-1"
                            aria-label={`Rate ${star} stars`}
                          >
                            <Star
                              size={24}
                              className={
                                star <= rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-slate-300'
                              }
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* COMMENT */}
                    <div className="mt-4">
                      <label
                        htmlFor={`review-${item.id}`}
                        className="text-sm font-medium text-slate-700"
                      >
                        Your review
                      </label>

                      <textarea
                        id={`review-${item.id}`}
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Tell us what you think about this product..."
                        rows={4}
                        className="w-full mt-2 px-3 py-2 rounded-lg border border-slate-200 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </div>

                    {/* ERROR */}
                    {reviewError && (
                      <p className="text-sm text-red-500 mt-3">
                        {reviewError}
                      </p>
                    )}

                    {/* ACTIONS */}
                    <div className="flex gap-3 mt-4">
                      <button
                        type="button"
                        onClick={() => {
                          setReviewingProduct(null);
                          setReviewError('');
                        }}
                        className="px-4 py-2 rounded-lg border border-slate-200 text-sm font-medium text-slate-600 hover:bg-white"
                      >
                        Cancel
                      </button>

                      <button
                        type="button"
                        onClick={handleSubmitReview}
                        disabled={reviewSubmitting}
                        className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:bg-blue-700 disabled:opacity-50"
                      >
                        {reviewSubmitting
                          ? 'Submitting...'
                          : 'Submit Review'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* DELIVERY INFORMATION */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mt-6">
          <h2 className="font-bold text-slate-900">
            Delivery Information
          </h2>

          <div className="mt-4 space-y-2 text-sm">
            <p>
              <span className="text-slate-500">Name:</span>{' '}
              <span className="font-medium text-slate-900">
                {order.full_name}
              </span>
            </p>

            <p>
              <span className="text-slate-500">Email:</span>{' '}
              <span className="font-medium text-slate-900">
                {order.email}
              </span>
            </p>

            <p>
              <span className="text-slate-500">Phone:</span>{' '}
              <span className="font-medium text-slate-900">
                {order.phone}
              </span>
            </p>

            <p>
              <span className="text-slate-500">Address:</span>{' '}
              <span className="font-medium text-slate-900">
                {order.address}
              </span>
            </p>

            <p>
              <span className="text-slate-500">Location:</span>{' '}
              <span className="font-medium text-slate-900">
                {order.city}, {order.state}
                {order.zip_code ? `, ${order.zip_code}` : ''}
              </span>
            </p>
          </div>
        </div>

        {/* PAYMENT INFORMATION */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mt-6">
          <h2 className="font-bold text-slate-900">
            Payment Information
          </h2>

          <div className="mt-4 space-y-2 text-sm">
            <p>
              <span className="text-slate-500">Method:</span>{' '}
              <span className="font-medium text-slate-900 capitalize">
                {order.payment_method}
              </span>
            </p>

            <p>
              <span className="text-slate-500">Payment Status:</span>{' '}
              <span className="font-semibold text-amber-600 capitalize">
                {order.payment_status}
              </span>
            </p>
          </div>
        </div>

        {/* ORDER INFORMATION */}
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 mt-6">
          <h2 className="font-bold text-slate-900">
            Order Information
          </h2>

          <p className="text-sm text-slate-500 mt-3">
            Ordered on:{' '}
            {new Date(order.created_at).toLocaleDateString('en-NG', {
              day: 'numeric',
              month: 'long',
              year: 'numeric',
            })}
          </p>

          <p className="text-sm text-slate-500 mt-2">
            Status:{' '}
            <span className="font-semibold text-amber-600 capitalize">
              {order.order_status}
            </span>
          </p>

          <p className="text-sm text-slate-500 mt-2">
            Payment:{' '}
            <span className="font-semibold text-amber-600 capitalize">
              {order.payment_status}
            </span>
          </p>

          <div className="border-t border-slate-100 mt-5 pt-5">

            <div className="flex justify-between">
              <span className="text-sm text-slate-500">
                Subtotal
              </span>

              <span className="font-medium">
                ₦{Number(order.subtotal).toLocaleString('en-NG', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="flex justify-between mt-2">
              <span className="text-sm text-slate-500">
                Shipping
              </span>

              <span className="font-medium">
                ₦{Number(order.shipping).toLocaleString('en-NG', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="flex justify-between mt-2">
              <span className="text-sm text-slate-500">
                Tax
              </span>

              <span className="font-medium">
                ₦{Number(order.tax).toLocaleString('en-NG', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

            <div className="flex justify-between mt-4 pt-4 border-t border-slate-100">
              <span className="font-bold text-slate-900">
                Total
              </span>

              <span className="font-bold text-blue-600">
                ₦{Number(order.total).toLocaleString('en-NG', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </span>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}