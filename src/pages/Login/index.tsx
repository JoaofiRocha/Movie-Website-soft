import { useForm } from 'react-hook-form';
import { useAccountStore } from '../../store/useAccountStore';
import styles from './styles.module.scss';
import buttonStyles from '../../theme/_button.module.scss';
import { useUsersStore } from '../../store/useUsersStore';
import { doesAccountMatch } from '../../util/userStoreUtil';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    const { setAccount } = useAccountStore();
    const { users } = useUsersStore();
    const [error, setError] = useState(false);
    const nav = useNavigate();
    

    const onSubmit = (data: User) => {
        const user = doesAccountMatch(users, data);
        if (user) {
            setAccount(user);
            setError(false);
            nav('/');
        }
        else
            setError(true);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(data => onSubmit(data))}>
            <div className={styles.div}>
                <h1>Login</h1>
                <p>Please fill the areas to log into your account. </p>
            </div>



            <div className={styles.div}>
                <div className={`${styles.div} ${styles.messageDiv} ${error ? styles.messageDivError : ''}`}>
                    <h2 className={styles.message}>Wrong Email or Password</h2>
                </div>

                <label className={styles.label} htmlFor="Email">Email:</label>
                <input {...register('email',
                    { required: true, pattern: /^\S+@\S+$/i, minLength: 6, maxLength: 120 })}
                    placeholder='Email'
                    aria-invalid={errors.email ? "true" : "false"}
                    className={`${styles.input} ${errors.email || error ? styles.inputError : ''}`}
                />
                {errors.email?.type === "required" && (
                    <p className={styles.error} role="alert">Email is required</p>
                )}
                {errors.email?.type === "pattern" || errors.email?.type === "minLength" && (
                    <p className={styles.error} role="alert">Not a valid Email</p>
                )}
                {errors.email?.type === "maxLength" && (
                    <p className={styles.error} role="alert">Email is too long</p>
                )}

                <label className={styles.label} htmlFor="password">Password:</label>
                <input {...register('password',
                    { required: true, minLength: 6, maxLength: 20 })}
                    placeholder='password'
                    type='password'
                    aria-invalid={errors.user ? "true" : "false"}
                    className={`${styles.input} ${errors.password || error ? styles.inputError : ''}`}
                />
                {errors.password?.type === "required" && (
                    <p className={styles.error} role="alert">Password is required</p>
                )}

                <input className={styles.submit} type="submit" />
            </div>

            <div className={styles.div}>
                <button className={buttonStyles.button} onClick={() => nav('/signup')}>Don't Have an Account?</button>
                
            </div>


        </form>
    )
}

export default Login;