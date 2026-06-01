import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../model/authStore';
import InputField from 'src/shared/input/inputLoginPage';
import { CustomCheckbox } from 'src/shared/input/checkbox';
import SubmitButton from 'src/shared/buttons/submitButton';
import sound from '../../../shared/icons/sound.svg';
import line from '../../../shared/icons/line.svg';
import styles from './loginpage.module.css';

enum FieldType {
    LOGIN = 'LOGIN',
    PASSWORD = 'PASSWORD'
}

export const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);

    const navigate = useNavigate();
    const {
        token,
        isAuth,
        hydrated,
        isLoading,
        error,
        login,
        hydrate,
    } = useAuthStore();

    useEffect(() => {
        if (!hydrated) {
            hydrate();
        }
    }, [hydrated, hydrate]);

    useEffect(() => {
        if (hydrated && isAuth) {
            navigate('/products', { replace: true });
        }
    }, [isAuth, hydrated, navigate]);

    const handleCheckboxChange = () => {
        setRememberMe(!rememberMe);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (username.length < 3 || password.length < 3) return;
        await login(username, password, rememberMe);
        if (error) {
            useAuthStore.setState({ error: null });
        }
    };

    if (!hydrated) {
        return <div>Загрузка...</div>;
    }

    return (
        <main className={styles.login_content}>
            <section aria-labelledby="login-title" className={styles.login_frame_2}>
                <div className={styles.login_frame_1}>
                    <div className={styles.login_frame_logo}>
                        <div className={styles.login_logo}>
                            <img src={sound} alt="logo" />
                        </div>
                    </div>
                </div>

                <div className={styles.login_frame2_text}>
                    <div className={styles.login_frame2_text_main}>
                        <span className={styles.login_frame2_text_main_text}>
                            Добро пожаловать!
                        </span>
                    </div>

                    <div className={styles.login_frame2_text_gap}>
                    </div>
                    <div className={styles.login_frame2_text_auth}>
                        <span className={styles.login_frame2_text_auth_text}>Пожалуйста, авторизуйтесь</span>
                    </div>
                </div>

                <form onSubmit={handleSubmit} noValidate className={styles.login_frame2_form}>
                    <div className={styles.login_frame2_form_frame5}>
                        <div className={styles.login_frame2_form_field}>
                            <InputField
                                fieldType={FieldType.LOGIN}
                                label={username.length > 0 && username.length < 3 ? 'Заполните поле, минимум 3 символа' : 'Логин'}
                                labelColor={username.length > 0 && username.length < 3 ? "red" : "#232323"}
                                labelSize={18}
                                labelWeight="medium"
                                labelFamily="Arial"
                                labelSpacing={6}
                                value={username}
                                length={291}
                                height={55}
                                borderWidth={1}
                                borderRadius={12}
                                borderColor="#EDEDED"
                                textColor="#232323"
                                fontSize="18px"
                                fontFamily="'Inter'"
                                placeholder="Введите логин"
                                onChange={(e) => setUsername(e.target.value)}
                                onClick={() => setUsername('')}
                            />
                        </div>

                        <div className={styles.login_frame2_form_gap} />

                        <div className={styles.login_frame2_form_field}>
                            <InputField
                                fieldType={FieldType.PASSWORD}
                                value={password}
                                label={password.length > 0 && password.length < 3 ? 'Заполните поле, минимум 3 символа' : "Пароль"}
                                labelColor={password.length > 0 && password.length < 3 ? "red" : "#232323"}
                                labelSize={18}
                                labelWeight="medium"
                                labelFamily="Arial"
                                labelSpacing={6}
                                length={291}
                                height={55}
                                borderWidth={1}
                                borderRadius={12}
                                borderColor="#EDEDED"
                                textColor="#232323"
                                fontSize="18px"
                                fontFamily="'Inter'"
                                placeholder="Введите пароль"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.login_frame2_form_login_keep}>
                        <div className={styles.login_frame2_form_login_keep_check}>
                            <CustomCheckbox
                                size={18}
                                borderColor='#EDEDED'
                                borderWidth={2}
                                bgColor='gray'
                                checked={rememberMe}
                                onChange={handleCheckboxChange}
                            />
                        </div>
                        <div className={styles.login_frame2_form_login_keep_text}>
                            <span>Запомнить данные</span>
                        </div>
                    </div>

                    <div className={styles.login_frame2_form_frame7}>
                        {error && (
                            <div style={{ color: 'red', marginBottom: 8 }}>{error}</div>
                        )}
                        <div>
                            <SubmitButton
                                label={isLoading ? 'Загрузка...' : 'Войти'}
                                width='399px'
                                height='54px'
                                color='#FFFFFF'
                                radius={12}
                                fontSize='18px'
                                fontWeight='500'
                                backgroundColor='#242EDB'
                                disabled={isLoading}
                            />
                        </div>

                        <div className={styles.login_frame2_form_frame7_or}>
                            <div>
                                <img src={line} />
                            </div>
                            <div className={styles.login_frame2_form_frame7_or_text}>
                                <span>или</span>
                            </div>
                            <div>
                                <img src={line} />
                            </div>
                        </div>
                    </div>
                </form>

                <div className={styles.login_frame2_no_account}>
                    <div>
                        <span className={styles.login_frame2_no_account_text}>Нет аккаунта?&nbsp;</span>
                        <span className={styles.login_frame2_no_account_create}>Создать&nbsp;</span>
                    </div>
                </div>
            </section>
        </main>
    );
};