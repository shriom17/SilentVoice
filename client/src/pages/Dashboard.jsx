import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/Navigation';

const Dashboard = () => {
  const navigate = useNavigate();
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expandedId, setExpandedId] = useState(null);
  const [feedbackDetails, setFeedbackDetails] = useState({});
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback`);
      const data = await response.json();
      if (response.ok) {
        setFeedbacks(data);
        setError('');
      } else {
        setError('Failed to load feedbacks');
      }
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
      setError('An error occurred while fetching feedbacks');
    } finally {
      setLoading(false);
    }
  };

  const fetchFeedbackDetails = async (id) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback/${id}/results`);
      const data = await response.json();
      if (response.ok) {
        setFeedbackDetails(prev => ({ ...prev, [id]: data }));
      }
    } catch (err) {
      console.error('Error fetching feedback details:', err);
    }
  };

  const toggleExpand = (id) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
      if (!feedbackDetails[id]) {
        fetchFeedbackDetails(id);
      }
    }
  };

  const toggleFormStatus = async (id, currentStatus) => {
    if (!confirm(`Are you sure you want to ${currentStatus ? 'close' : 'activate'} this form?`)) {
      return;
    }
    
    try {
      setActionLoading(id);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/feedback/${id}/toggle`,
        {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
        }
      );
      
      if (response.ok) {
        fetchFeedbacks();
      } else {
        alert('Failed to update form status');
      }
    } catch (err) {
      console.error('Error toggling form status:', err);
      alert('An error occurred');
    } finally {
      setActionLoading(null);
    }
  };

  const copyShareLink = (id) => {
    const link = `${window.location.origin}/feedback?id=${id}`;
    navigator.clipboard.writeText(link).then(() => {
      alert('Share link copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy link');
    });
  };

  if (loading) {
    return (
      <>
        <Navigation />
        <div style={styles.container}>
          <div style={styles.loading}>Loading feedbacks...</div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div style={styles.container}>
        <div style={styles.header}>
          <h1>Feedback Dashboard</h1>
          <button style={styles.createButton} onClick={() => navigate('/create')}>
            + Create New Feedback
          </button>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        {feedbacks.length === 0 ? (
          <div style={styles.empty}>
            <p>No feedback forms created yet.</p>
            <button style={styles.createButton} onClick={() => navigate('/create')}>
              Create Your First Feedback
            </button>
          </div>
        ) : (
          <div style={styles.grid}>
            {feedbacks.map((feedback) => (
              <div key={feedback._id} style={styles.card}>
                <div style={styles.cardHeader}>
                  <h3 style={styles.cardTitle}>{feedback.title}</h3>
                  <span
                    style={{
                      ...styles.badge,
                      backgroundColor: feedback.isActive ? '#28a745' : '#6c757d',
                    }}
                  >
                    {feedback.isActive ? 'Active' : 'Closed'}
                  </span>
                </div>

                <div style={styles.cardStats}>
                  <div style={styles.stat}>
                    <span style={styles.statLabel}>Responses:</span>
                    <span style={styles.statValue}>{feedback.responses.length}</span>
                  </div>
                  <div style={styles.stat}>
                    <span style={styles.statLabel}>Created:</span>
                    <span style={styles.statValue}>
                      {new Date(feedback.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div style={styles.cardActions}>
                  <button
                    style={styles.actionButton}
                    onClick={() => toggleExpand(feedback._id)}
                  >
                    {expandedId === feedback._id ? 'Hide Details' : 'View Details'}
                  </button>
                  <button
                    style={styles.actionButton}
                    onClick={() => copyShareLink(feedback._id)}
                  >
                    Copy Link
                  </button>
                  <button
                    style={{
                      ...styles.actionButton,
                      backgroundColor: feedback.isActive ? '#dc3545' : '#28a745',
                    }}
                    onClick={() => toggleFormStatus(feedback._id, feedback.isActive)}
                    disabled={actionLoading === feedback._id}
                  >
                    {actionLoading === feedback._id
                      ? 'Loading...'
                      : feedback.isActive
                      ? 'Close'
                      : 'Activate'}
                  </button>
                </div>

                {expandedId === feedback._id && (
                  <div style={styles.details}>
                    {feedbackDetails[feedback._id] ? (
                      <>
                        <div style={styles.detailRow}>
                          <strong>Average Rating:</strong>
                          <span>
                            {feedbackDetails[feedback._id].avgRating || 'N/A'} / 5
                          </span>
                        </div>
                        <div style={styles.detailRow}>
                          <strong>Total Responses:</strong>
                          <span>{feedbackDetails[feedback._id].totalResponses}</span>
                        </div>
                        
                        <h4 style={styles.responsesTitle}>Recent Responses:</h4>
                        {feedbackDetails[feedback._id].responses.length > 0 ? (
                          <div style={styles.responsesList}>
                            {feedbackDetails[feedback._id].responses
                              .slice(-5)
                              .reverse()
                              .map((response, idx) => (
                                <div key={idx} style={styles.responseItem}>
                                  <div style={styles.responseRating}>
                                    ⭐ {response.rating}/5
                                  </div>
                                  {response.comment && (
                                    <div style={styles.responseComment}>
                                      "{response.comment}"
                                    </div>
                                  )}
                                  <div style={styles.responseDate}>
                                    {new Date(response.createdAt).toLocaleString()}
                                  </div>
                                </div>
                              ))}
                          </div>
                        ) : (
                          <p style={styles.noResponses}>No responses yet</p>
                        )}
                      </>
                    ) : (
                      <div style={styles.loading}>Loading details...</div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

const styles = {
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '30px',
    flexWrap: 'wrap',
    gap: '15px',
  },
  createButton: {
    padding: '10px 20px',
    fontSize: '14px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  loading: {
    textAlign: 'center',
    padding: '40px',
    fontSize: '18px',
    color: '#666',
  },
  error: {
    padding: '15px',
    backgroundColor: '#f8d7da',
    color: '#721c24',
    borderRadius: '5px',
    marginBottom: '20px',
    border: '1px solid #f5c6cb',
  },
  empty: {
    textAlign: 'center',
    padding: '60px 20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    border: '2px dashed #ddd',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: '10px',
    padding: '20px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.3s',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'start',
    marginBottom: '15px',
    gap: '10px',
  },
  cardTitle: {
    margin: 0,
    fontSize: '20px',
    color: '#333',
    flex: 1,
  },
  badge: {
    padding: '4px 12px',
    borderRadius: '20px',
    color: '#fff',
    fontSize: '12px',
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  cardStats: {
    display: 'flex',
    gap: '20px',
    marginBottom: '15px',
    paddingBottom: '15px',
    borderBottom: '1px solid #eee',
  },
  stat: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px',
  },
  statLabel: {
    fontSize: '12px',
    color: '#666',
    textTransform: 'uppercase',
  },
  statValue: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#333',
  },
  cardActions: {
    display: 'flex',
    gap: '8px',
    flexWrap: 'wrap',
  },
  actionButton: {
    flex: 1,
    minWidth: '80px',
    padding: '8px 12px',
    fontSize: '13px',
    fontWeight: '500',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'all 0.3s',
  },
  details: {
    marginTop: '20px',
    paddingTop: '20px',
    borderTop: '2px solid #eee',
  },
  detailRow: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '8px 0',
    fontSize: '14px',
  },
  responsesTitle: {
    marginTop: '15px',
    marginBottom: '10px',
    fontSize: '16px',
    color: '#333',
  },
  responsesList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  responseItem: {
    padding: '12px',
    backgroundColor: '#f8f9fa',
    borderRadius: '5px',
    border: '1px solid #e9ecef',
  },
  responseRating: {
    fontWeight: 'bold',
    color: '#ffc107',
    marginBottom: '5px',
  },
  responseComment: {
    fontSize: '14px',
    color: '#495057',
    fontStyle: 'italic',
    marginBottom: '5px',
    lineHeight: '1.4',
  },
  responseDate: {
    fontSize: '12px',
    color: '#6c757d',
  },
  noResponses: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
    padding: '20px',
  },
};

export default Dashboard;