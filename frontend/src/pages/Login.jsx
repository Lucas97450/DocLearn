import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../services/auth'; // Assure-toi que cette fonction est correctement configurée
import Slideshow from '../components/Slideshow'; // Le composant de slideshow
import styles from './Login.module.css'; // Styles CSS pour la page Login

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await login(email, password);
      alert(response.data.message); // Message de succès
      setError(null); // Réinitialiser les erreurs
      navigate('/dashboard'); // Redirige vers le tableau de bord après connexion
    } catch (err) {
      console.error('Erreur lors de la connexion :', err);
      if (err.response) {
        setError(err.response.data.detail); // Message d'erreur du backend
      } else {
        setError('Une erreur inattendue s\'est produite.');
      }
    }
  };

  const slides = [
    {
      image: '/images/flashcard.svg', // Image 1
      title: 'Boost Your Learning',
      description: 'Create and review personalized flashcards to quickly master new concepts.',
    },
    {
      image: '/images/online-test.svg', // Image 2
      title: 'Learn at Your Own Pace',
      description: ' Use interactive quizzes to test your knowledge and track your progress.',
    },
    {
      image: '/images/study.svg', // Image 3
      title: 'Simplify Your Study Sessions',
      description: 'Organize your study time efficiently with tools designed for modern learners.',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.rightSection}>
        <Slideshow slides={slides} />
      </div>

      <div className={styles.leftSection}>
        <h2>Log In to Your Account</h2>
        <p>Welcome back! Please log in to continue:</p>
        {error && <p className={styles.error}>{error}</p>}
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={handleLogin}
            className={styles.button}
          >
            Log In
          </button>
        </form>
        <div className={styles.links}>
          <p>
            Don't have an account?{' '}
            <a href="/signup" className={styles.link}>
              Create one
            </a>
          </p>
          <p>
            <a href="/forgot-password" className={styles.link}>
              Forgot your password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;


