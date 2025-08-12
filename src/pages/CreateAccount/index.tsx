import { useForm } from 'react-hook-form';
import { useAccountStore } from '../../store/useAccountStore';
import styles from './styles.module.scss';
import buttonStyles from '../../theme/_button.module.scss';
import { useUsersStore } from '../../store/useUsersStore';
import { doesUserExist } from '../../util/userStoreUtil';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateAccount = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<User>();
    const { setAccount, user } = useAccountStore();
    const { addUser, users } = useUsersStore();
    const [error, setError] = useState(false);
    const nav = useNavigate();


     useEffect(() => {
            if(user){
                nav('/');
            }
        },[])

    const onSubmit = (data: User) => {
        if (data && !doesUserExist(users, data)) {
            const completeUser = {...data, id:`id${(new Date()).getTime()}`, favorites: []}
            addUser(completeUser);
            setAccount(completeUser);
            setError(false);
            nav('/');
        }
        else
            setError(true);
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit(data => onSubmit(data))}>
            <div className={styles.div}>
                <h1>SignUp</h1>
                <p>Please fill the areas to create your account. </p>
            </div>



            <div className={styles.div}>
                <div className={`${styles.div} ${styles.messageDiv} ${error ? styles.messageDivError : ''}`}>
                    <h2 className={styles.message}>Username or Email already on the database</h2>
                </div>

                <label className={styles.label} htmlFor="user">Your Username:</label>
                <input type='text' {...register('user',
                    { required: true, minLength: 2, maxLength: 120 })}
                    placeholder='user'
                    aria-invalid={errors.user ? "true" : "false"}
                    className={`${styles.input} ${errors.user || error ? styles.inputError : ''}`}
                />
                {errors.user?.type === "required" && (
                    <p className={styles.error} role="alert">Username is required</p>
                )}
                {errors.user?.type === "minLength" && (
                    <p className={styles.error} role="alert">Username is too short</p>
                )}
                {errors.user?.type === "maxLength" && (
                    <p className={styles.error} role="alert">Username is too long</p>
                )}

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
                    aria-invalid={errors.password ? "true" : "false"}
                    className={`${styles.input} ${errors.password ? styles.inputError : ''}`}
                />
                {errors.password?.type === "required" && (
                    <p className={styles.error} role="alert">Password is required</p>
                )}
                {errors.password?.type === "minLength" && (
                    <p className={styles.error} role="alert">Password is too short</p>
                )}
                {errors.password?.type === "maxLength" && (
                    <p className={styles.error} role="alert">Password is too long</p>
                )}

                <input className={styles.submit} type="submit" />
            </div>

            <div className={styles.div}>
                <button className={buttonStyles.button} onClick={() => nav('/login')}>Already Have an Account?</button>
                
            </div>


        </form>
    )
}

export default CreateAccount;