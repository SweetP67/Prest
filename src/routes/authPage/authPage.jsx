import './authPage.css';
import Image from '../../components/image/image';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import apiRequest from "../../utils/apiRequest";
import useAuthStore from '../../utils/authStore';

const AuthPage = () => {
    const [isRegister, setIsRegister] = useState(false);
    const [error, setError] = useState("");
    // const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const {setCurrentUser} = useAuthStore();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);

        const data = Object.fromEntries(formData);

        // if (data.password.length < 6) {
        //     setError("Mật khẩu phải có ít nhất 6 ký tự!");
        //     return;
        // }

        try {
            const res = await apiRequest.post(
                `/users/auth/${isRegister ? "register" : "login"}`,
                data
            );

            setCurrentUser(res.data);
            
            alert(isRegister ? "Đăng ký thành công! Đang chuyển qua trang chủ" : "Đăng nhập thành công!");



            setTimeout(() => {
                if (res.data.role === "admin") {
                    navigate("/admin");
                } else {
                    navigate("/");
                }
            }, 1000);

            // console.log(res.data);
        } catch (err) {
            setError(err.response.data.message);
        }
    };

    return (
        <div className="authPage">
            <div className="authContainer">
                <Image path="general/logo.png" alt="" w={36} h={36}/>
                <h1>{isRegister ? "Đăng ký tài khoản" : "Đăng nhập"}</h1>
                {isRegister ? 
                    (
                    <form key="register" onSubmit={handleSubmit}>
                        <div className="formGroup">
                            <label htmlFor="username">Username</label>
                            <input 
                                type="username" 
                                placeholder='VD: anhnn123' 
                                required 
                                name='username' 
                                id='username' 
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="displayName">Tên hiển thị</label>
                            <input 
                                type="displayName" 
                                placeholder='VD: Anh Nguyễn' 
                                required 
                                name='displayName' 
                                id='displayName' 
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                placeholder='' 
                                required 
                                name='email' 
                                id='email' 
                            />
                        </div>
                        <div className="formGroup">
                            <label htmlFor="password">Mật khẩu</label>
                            <input 
                                type="password" 
                                placeholder='' 
                                required 
                                name='password' 
                                id='password' 
                            />
                        </div>

                        <button type='submit'>Đăng ký</button>
                        <p onClick={() => setIsRegister(false)}>
                            Bạn đã có tài khoản? <b>Đăng nhập</b>
                        </p>
                        {error && <p className="error">{error}</p>}
                    </form>

                        
                    ) : (
                        <form key="loginForm" onSubmit={handleSubmit}>
                        <div className="formGroup">
                            <label htmlFor="email">Email</label>
                            <input 
                                type="email" 
                                placeholder='Email' 
                                required 
                                name='email' 
                                id='email' 
                            />
                        </div>

                        <div className="formGroup">
                            <label htmlFor="password">Mật khẩu</label>
                            <input 
                                type="password" 
                                placeholder='Mật khẩu' 
                                required 
                                name='password' 
                                id='password' 
                            />
                        </div>
                    <button type='submit'>Đăng nhập</button>
                    <p onClick={() => setIsRegister(true)}>
                        Bạn chưa có tài khoản? <b>Đăng ký</b>
                    </p>
                    {error && <p className="error">{error}</p>}
                    </form>
                    )
                }
            </div>
        </div>
    )
}

export default AuthPage