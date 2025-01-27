import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/auth'; // Fonction d'inscription
import Slideshow from '../components/Slideshow'; // Composant slideshow
import styles from './Signup.module.css'; // Import des styles

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }

    try {
      const response = await signup(email, password); // Appel de l'API signup
      setSuccess(response.data.message); // Message de succès
      setError(null);
      setTimeout(() => navigate('/login'), 2000); // Redirection vers la page Login après 2 secondes
    } catch (err) {
      console.error('Erreur lors de l\'inscription :', err);
      if (err.response) {
        setError(err.response.data.detail); // Affiche l'erreur retournée par le backend
      } else {
        setError('Une erreur inattendue s\'est produite.');
      }
    }
  };

  const slides = [
    {
      image: '/images/flashcard.png', // Image 1
      title: 'Learn with Flashcards!',
      description: 'Create and review personalized flashcards to quickly master new concepts.',
    },
    {
      image: '/images/online-test.png', // Image 2
      title: 'Interactive Quizzes!',
      description: 'Use interactive quizzes to test your knowledge and track your progress.',
    },
    {
      image: '/images/study.png', // Image 3
      title: 'Revolutionize Your Study Sessions',
      description: 'Leverage AI-powered tools to enhance your learning experience.',
    },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.rightSection}>
        <Slideshow slides={slides} />
      </div>
      <div className={styles.leftSection}>
        <h2>Create an Account</h2>
        <p>Welcome! Please fill in the form to get started:</p>
        {error && <p className={styles.error}>{error}</p>}
        {success && <p className={styles.success}>{success}</p>}
        <form className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Entrez votre email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="password">Mot de passe</label>
            <input
              type="password"
              id="password"
              placeholder="Entrez votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="confirmPassword">Confirmez le mot de passe</label>
            <input
              type="password"
              id="confirmPassword"
              placeholder="Confirmez votre mot de passe"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            onClick={handleSignup}
            className={styles.button}
          >
            Sign up
          </button>
        </form>
        <p>
          Déjà un compte ?{' '}
          <a href="/login" className={styles.links}>
            Connectez-vous
          </a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
