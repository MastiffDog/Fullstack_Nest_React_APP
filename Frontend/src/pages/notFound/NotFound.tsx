import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './notFound.module.css';

export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/', { replace: true });
    }, 5000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <main className={styles.main}>
      <section className={styles.content}>
        <h1 className={styles.text}>404</h1>
        <p className={styles.text}>Страница не найдена.</p>
        <p className={styles.redirectInfo}>
          Вы будете перенаправлены на главную страницу через <strong>5 секунд</strong>...
        </p>
      </section>
    </main>
  );
};