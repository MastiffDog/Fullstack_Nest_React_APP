import React from "react";
import LogoutButton from '../../../shared/buttons/submitButton';
import { useAuthStore } from '../../auth/model/authStore';
import { useNavigate } from "react-router";
import search from '../../../shared/icons/search.svg';
import styles from './navbar.module.css';

interface InputFieldProps {
    value?: string;
    onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onKeyDown?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const Navbar: React.FC<InputFieldProps> = ({ value, onChange, onKeyDown }) => {
    const navigate = useNavigate();
    const logout = useAuthStore((state) => state.logout);

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    return (
        <div className={styles.main}>
            <div className={styles.title}><h3>Товары</h3></div>
            <div className={styles.search}>
                <img
                    src={search}
                    alt=""
                    className={styles.search_icon}
                />

                <input
                    className={styles.search_input}
                    placeholder='Найти'
                    value={value}
                    onChange={(event) => onChange?.(event)}
                    onKeyDown={(event) => onKeyDown?.(event)}
                />
            </div>
            <div className={styles.logout}>
                <LogoutButton
                    label="Выйти"
                    width="100px"
                    height="48px"
                    radius={4}
                    backgroundColor='#242EDB'
                    onClick={handleLogout}
                />
            </div>
        </div>
    )
}