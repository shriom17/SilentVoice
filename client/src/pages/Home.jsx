import React from 'react'
import {useNavigate} from 'react-router-dom'
import Navigation from '../components/Navigation'

const Home = () => {
  const navigate = useNavigate()
  return (
    <>
    <Navigation />
    <div style={styles.container}>
     <header style ={styles.header}>
        <h1 style = {styles.title}>Welcome To SilentVoice</h1>
        <h2 style = {styles.subtitle} className="subtitle-text">Speak Freely, Stay Anonymous</h2>
        <p style = {styles.subtitle} className="subtitle-text">Your Voice, Our Voice</p>
        <p style = {styles.subtitle} className="subtitle-text">Your Privacy, Our Priority</p>
        <div style = {styles.buttonContainer}>
            <button style = {styles.Primarybutton} onClick={() => navigate('/create')}>Create Feedback</button>
            <button style = {styles.Secondarybutton} className="secondary-button" onClick={() => navigate('/dashboard')}>View Feedbacks</button>
        </div>
     </header>

     <section style = {styles.featuresSection}>
        <h2 style = {styles.featuresTitle} className="featuresTitle">Why Choose SilentVoice?</h2>
        <div style = {styles.featuresGrid}>
            <div style = {styles.featureCard} className="feature-card">
                <div style = {styles.featureIcon}>🔒</div>
                <h3 style = {styles.featureCardTitle} className="feature-card-title">100% Anonymity</h3>
                <p style = {styles.featureCardText} className="feature-card-text">Your identity is never revealed. Share your thoughts freely without any concerns.</p>
            </div>
            <div style = {styles.featureCard} className="feature-card">
                <div style = {styles.featureIcon}>🛡️</div>
                <h3 style = {styles.featureCardTitle} className="feature-card-title">Secure Feedback</h3>
                <p style = {styles.featureCardText} className="feature-card-text">Advanced security measures ensure your messages remain private and protected.</p>
            </div>
            <div style = {styles.featureCard} className="feature-card">
                <div style = {styles.featureIcon}>⚡</div>
                <h3 style = {styles.featureCardTitle} className="feature-card-title">User-Friendly</h3>
                <p style = {styles.featureCardText} className="feature-card-text">Intuitive design makes it easy to create and manage feedback forms effortlessly.</p>
            </div>
            <div style = {styles.featureCard} className="feature-card">
                <div style = {styles.featureIcon}>📊</div>
                <h3 style = {styles.featureCardTitle} className="feature-card-title">Real-time Analytics</h3>
                <p style = {styles.featureCardText} className="feature-card-text">Get instant insights and track feedback with powerful dashboard analytics.</p>
            </div>
        </div>
     </section>

     <footer style = {styles.footer}>
        <p style = {styles.footerText}>© 2026 SilentVoice. All rights reserved.</p>
     </footer>
</div>
</>
  );
}

const styles = {
    container: {
        fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif',
        textAlign: 'center',
        padding: '20px',
    },
    header: {
        marginBottom: '40px',
    },
    title: {
        fontSize: '36px',
        fontWeight: 'bold',
        marginBottom: '10px',
    },
    subtitle: {
        fontSize: '20px',
        color: '#555',
        marginBottom: '20px',
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '15px',
    },
    Primarybutton: { 
        padding: '10px 20px',
        fontSize: '16px',
        color: '#fff',   
        backgroundColor: '#007BFF',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
    Secondarybutton: {
        padding: '10px 20px',
        fontSize: '16px',
        color: '#007BFF',
        backgroundColor: '#fff',
        border: '1px solid #007BFF',    
        borderRadius: '5px',                                  
        cursor: 'pointer',
    },
    featuresSection: {
        marginTop: '60px',
        marginBottom: '60px',
    },
    featuresTitle: {
        fontSize: '32px',
        fontWeight: 'bold',
        marginBottom: '40px',
        color: '#333',
    },
    featuresGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px',
    },
    featureCard: {
        backgroundColor: '#f8f9fa',
        borderRadius: '12px',
        padding: '30px 20px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        cursor: 'pointer',
    },
    featureIcon: {
        fontSize: '48px',
        marginBottom: '15px',
    },
    featureCardTitle: {
        fontSize: '20px',
        fontWeight: '600',
        marginBottom: '10px',
        color: '#333',
    },
    featureCardText: {
        fontSize: '14px',
        color: '#666',
        lineHeight: '1.6',
    },
    footer: {
        marginTop: '40px',
        borderTop: '1px solid #ccc',
        paddingTop: '20px',
    },
    footerText: {
        color: '#666',
    },
}
export default Home