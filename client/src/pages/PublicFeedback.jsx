import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navigation from '../components/Navigation';

const PublicFeedback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const feedbackId = searchParams.get('id');

  const [feedbacks, setFeedbacks] = useState([]);
  const [selectedFeedback, setSelectedFeedback] = useState(null);
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });

  useEffect(() => {
    fetchActiveFeedbacks();
  }, []);

  useEffect(() => {
    if (feedbackId && feedbacks.length > 0) {
      const feedback = feedbacks.find(f => f._id === feedbackId);
      if (feedback) {
        setSelectedFeedback(feedback);
      }
    }
  }, [feedbackId, feedbacks]);

  const fetchActiveFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback`);
      const data = await response.json();
      if (response.ok) {
        const activeFeedbacks = data.filter(f => f.isActive);
        setFeedbacks(activeFeedbacks);
      }
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
      setMessage({ text: 'Failed to load feedback forms', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!selectedFeedback) {
      setMessage({ text: 'Please select a feedback form', type: 'error' });
      return;
    }

    if (rating === 0) {
      setMessage({ text: 'Please provide a rating', type: 'error' });
      return;
    }

    setSubmitting(true);
    setMessage({ text: '', type: '' });

    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/feedback/${selectedFeedback._id}/submit`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ rating, comment: comment.trim() || undefined }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage({ text: 'Thank you! Your feedback has been submitted anonymously.', type: 'success' });
        setRating(0);
        setComment('');
        // Auto-clear message after 5 seconds
        setTimeout(() => {
          setMessage({ text: '', type: '' });
          setSelectedFeedback(null);
          navigate('/feedback');
        }, 3000);
      } else {
        setMessage({ text: data.message || 'Failed to submit feedback', type: 'error' });
      }
    } catch (err) {
      console.error('Error submitting feedback:', err);
      setMessage({ text: 'An error occurred while submitting feedback', type: 'error' });
    } finally {
      setSubmitting(false);
    }
  };

  const selectFeedback = (feedback) => {
    setSelectedFeedback(feedback);
    setRating(0);
    setComment('');
    setMessage({ text: '', type: '' });
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div style={styles.container}>
          <div style={styles.loading}>Loading feedback forms...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div style={styles.container}>
        <h1 style={styles.title}>Anonymous Feedback</h1>
        <p style={styles.subtitle}>Your voice matters. Share your thoughts anonymously.</p>

        {feedbacks.length === 0 ? (
          <div style={styles.empty}>
            <h2>No Active Feedback Forms</h2>
            <p>There are currently no feedback forms available. Please check back later.</p>
          </div>
        ) : (
          <div style={styles.content}>
            {/* Feedback Forms List */}
            {!selectedFeedback && (
              <div style={styles.listSection}>
                <h2 style={styles.sectionTitle}>Available Feedback Forms</h2>
                <div style={styles.feedbackList}>
                  {feedbacks.map((feedback) => (
                    <div
                      key={feedback._id}
                      style={styles.feedbackCard}
                      onClick={() => selectFeedback(feedback)}
                    >
                      <h3 style={styles.feedbackTitle}>{feedback.title}</h3>
                      <div style={styles.feedbackMeta}>
                        <span>📝 {feedback.responses.length} responses</span>
                        <span>📅 {new Date(feedback.createdAt).toLocaleDateString()}</span>
                      </div>
                      <button style={styles.selectButton}>
                        Submit Feedback →
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Feedback Form */}
            {selectedFeedback && (
              <div style={styles.formSection}>
                <button
                  style={styles.backButton}
                  onClick={() => setSelectedFeedback(null)}
                >
                  ← Back to List
                </button>

                <div style={styles.formCard}>
                  <h2 style={styles.formTitle}>{selectedFeedback.title}</h2>
                  
                  <form onSubmit={handleSubmit} style={styles.form}>
                    {/* Rating Section */}
                    <div style={styles.ratingSection}>
                      <label style={styles.label}>
                        Your Rating <span style={styles.required}>*</span>
                      </label>
                      <div style={styles.starsContainer}>
                        {[1, 2, 3, 4, 5].map((star) => (
                          <span
                            key={star}
                            style={{
                              ...styles.star,
                              color: (hoveredRating || rating) >= star ? '#ffc107' : '#ddd',
                            }}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoveredRating(star)}
                            onMouseLeave={() => setHoveredRating(0)}
                          >
                            ★
                          </span>
                        ))}
                      </div>
                      {rating > 0 && (
                        <p style={styles.ratingText}>
                          You rated: {rating} out of 5 stars
                        </p>
                      )}
                    </div>

                    {/* Comment Section */}
                    <div style={styles.commentSection}>
                      <label style={styles.label}>
                        Your Comments <span style={styles.optional}>(optional)</span>
                      </label>
                      <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        placeholder="Share your thoughts... (This is completely anonymous)"
                        style={styles.textarea}
                        rows="5"
                      />
                    </div>

                    {/* Message Display */}
                    {message.text && (
                      <div
                        style={{
                          ...styles.message,
                          ...(message.type === 'success' ? styles.successMessage : styles.errorMessage),
                        }}
                      >
                        {message.text}
                      </div>
                    )}

                    {/* Submit Button */}
                    <button
                      type="submit"
                      disabled={submitting || rating === 0}
                      style={{
                        ...styles.submitButton,
                        ...(submitting || rating === 0 ? styles.disabledButton : {}),
                      }}
                    >
                      {submitting ? 'Submitting...' : 'Submit Anonymous Feedback'}
                    </button>

                    <p style={styles.anonymousNote}>
                      🔒 Your feedback is completely anonymous. We don't collect any personal information.
                    </p>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  title: {
    textAlign: 'center',
    fontSize: '32px',
    color: '#333',
    marginBottom: '10px',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: '16px',
    color: '#666',
    marginBottom: '30px',
  },
  loading: {
    textAlign: 'center',
    padding: '60px',
    fontSize: '18px',
    color: '#666',
  },
  empty: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    border: '2px dashed #ddd',
  },
  content: {
    marginTop: '20px',
  },
  listSection: {
    marginBottom: '30px',
  },
  sectionTitle: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '20px',
  },
  feedbackList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '20px',
  },
  feedbackCard: {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    cursor: 'pointer',
    transition: 'all 0.3s',
    border: '2px solid transparent',
  },
  feedbackTitle: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '10px',
    marginTop: 0,
  },
  feedbackMeta: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: '#666',
    marginBottom: '15px',
  },
  selectButton: {
    width: '100%',
    padding: '10px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#007BFF',
    backgroundColor: 'transparent',
    border: '2px solid #007BFF',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  formSection: {
    marginTop: '20px',
  },
  backButton: {
    padding: '8px 16px',
    fontSize: '14px',
    color: '#007BFF',
    backgroundColor: 'transparent',
    border: '1px solid #007BFF',
    borderRadius: '5px',
    cursor: 'pointer',
    marginBottom: '20px',
    transition: 'all 0.3s',
  },
  formCard: {
    backgroundColor: '#fff',
    padding: '30px',
    borderRadius: '10px',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
  },
  formTitle: {
    fontSize: '24px',
    color: '#333',
    marginBottom: '25px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '25px',
  },
  ratingSection: {
    textAlign: 'center',
  },
  label: {
    display: 'block',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '10px',
  },
  required: {
    color: '#dc3545',
  },
  optional: {
    fontSize: '14px',
    color: '#999',
    fontWeight: 'normal',
  },
  starsContainer: {
    display: 'flex',
    justifyContent: 'center',
    gap: '10px',
    margin: '15px 0',
  },
  star: {
    fontSize: '48px',
    cursor: 'pointer',
    transition: 'all 0.2s',
    userSelect: 'none',
  },
  ratingText: {
    fontSize: '14px',
    color: '#666',
    marginTop: '10px',
  },
  commentSection: {
    textAlign: 'left',
  },
  textarea: {
    width: '100%',
    padding: '12px',
    fontSize: '14px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    resize: 'vertical',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.3s',
    boxSizing: 'border-box',
  },
  message: {
    padding: '12px',
    borderRadius: '5px',
    textAlign: 'center',
    fontSize: '14px',
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    border: '1px solid #c3e6cb',
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    border: '1px solid #f5c6cb',
  },
  submitButton: {
    padding: '14px 28px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  disabledButton: {
    backgroundColor: '#6c757d',
    cursor: 'not-allowed',
    opacity: 0.6,
  },
  anonymousNote: {
    textAlign: 'center',
    fontSize: '13px',
    color: '#666',
    fontStyle: 'italic',
    margin: 0,
  },
};

export default PublicFeedback;