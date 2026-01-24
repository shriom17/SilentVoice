import React from 'react'
import {useNavigate} from 'react-router-dom'
const Home = () => {
  const navigate = useNavigate()
  return (
    <div style={styles.container}>
     <header style ={styles.header}>
        <h1 style = {styles.title}>Welcome To SilentVoice</h1>
        <h2 style = {styles.subtitle}>Speak Freely, Stay Anonymous</h2>
        <p style = {styles.subtitle}>Your Voice, Our Voice</p>
        <p style = {styles.subtitle}>Your Privacy, Our Priority</p>
        <div style = {styles.buttonContainer}>
            <button style = {styles.Primarybutton} onClick={() => navigate('/create')}>Create Feedback</button>
            <button style = {styles.Secondarybutton} onClick={() => navigate('/dashboard')}>View Feedbacks</button>
        </div>
     </header>

     <section style = {styles.featuresSection}>
        <h2 style = {styles.featuresTitle}>Why Choose SilentVoice?</h2>
        <ul style = {styles.featuresList}>
            <li style = {styles.featureItem}>100% Anonymity: Your identity is never revealed.</li>
            <li style = {styles.featureItem}>Secure Feedback: End-to-end encryption ensures your messages are safe.</li>
            <li style = {styles.featureItem}>User-Friendly Interface: Easy to navigate and use.</li>
            <li style = {styles.featureItem}>Instant Notifications: Get notified when feedback is received.</li>
        </ul>
     </section>

     <footer style = {styles.footer}>
        <p style = {styles.footerText}>© 2026 SilentVoice. All rights reserved.</p>
     </footer>
</div>
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
        marginTop: '40px',
    },
    featuresTitle: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px',
    },
    featuresList: {
        listStyleType: 'disc',
        paddingLeft: '20px',
    },
    featureItem: {
        marginBottom: '10px',
    },
    footer: {
        marginTop: '40px',
        borderTop: '1px solid #ccc',
        paddingTop: '20px',
    },
}
export default Home