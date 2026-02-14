import React from 'react'
import {useNavigate} from 'react-router-dom';
import Navigation from '../components/Navigation';

const CreateFeedback = () => {
  const navigate = useNavigate();
  const [title, setTitle] = React.useState('');
  const [enableRating, setEnableRating] = React.useState(true);
  const [enableComment, setEnableComment] = React.useState(true);
  const [successMessage, setSuccessMessage] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(title.trim() === '') {
      alert('Title is required');
      return;
    }
    setLoading(true);
    setSuccessMessage('');
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/feedback`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({title, isActive: true}),
        });
      const data = await response.json();
      if(response.ok) {
        setSuccessMessage('Feedback form created successfully!');
        setTitle('');
        setEnableRating(true);
        setEnableComment(true);
      } else {
        setSuccessMessage(`Failed to create feedback form: ${data.message || 'Unknown error'}`);
        console.error('Server response:', data);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
      setSuccessMessage(`Error: ${error.message || 'Network error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navigation />
    <div style={styles.container} className="form-container">
      <h1>Create a New Feedback</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label>
            Feedback Title:
            <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                style={styles.input} 
                placeholder='Enter feedback title' />                                                                               
        </label>
        <div style={styles.options} className="options-container">
            <label>
                <input 
                    type="checkbox" 
                    checked={enableRating} 
                    onChange={() => setEnableRating(!enableRating)} 
                    style={styles.checkbox} />
                Enable Rating
            </label>
            <label>
                <input 
                    type="checkbox" 
                    checked={enableComment} 
                    onChange={() => setEnableComment(!enableComment)} 
                    style={styles.checkbox} />
                Enable Comment
            </label>
            <p>Submit your anonymous feedback here</p>
        </div>
        <button type="submit" disabled={loading} style={styles.button}>
      {loading ? 'Submitting...' : 'Submit Feedback'}
    </button>
  </form>
  {successMessage && <p style={styles.successMessage} className="success-message">{successMessage}</p>}
  </div>
  </>
  )
}

const styles = {
  container: {
    maxWidth: '600px',
    margin: '50px auto',
    padding: '30px',
    fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
    marginTop: '20px',
  },
  input: {
    width: '100%',
    padding: '12px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '5px',
    marginTop: '8px',
    outline: 'none',
    transition: 'border-color 0.3s',
  },
  options: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    padding: '15px',
    backgroundColor: '#fff',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  checkbox: {
    marginRight: '8px',
    cursor: 'pointer',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  successMessage: {
    marginTop: '20px',
    padding: '12px',
    backgroundColor: '#d4edda',
    color: '#155724',
    borderRadius: '5px',
    border: '1px solid #c3e6cb',
    textAlign: 'center',
  },
}

export default CreateFeedback