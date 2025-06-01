import { useState } from 'react';
import './userButton.css';
import Image from '../image/image';
import apiRequest from '../../utils/apiRequest';
import { Link, useNavigate } from 'react-router';
import useAuthStore from '../../utils/authStore';

const UserButton = () => {

    const [open, setOpen] = useState(false);

    const navigate = useNavigate();

    // TEMP
    // const currentUser = true;

    const {currentUser, removeCurrentUser} = useAuthStore();

    console.log(currentUser);

    const handleLogout =async () => {
        try{
            await apiRequest.post("/users/auth/logout",{});
            removeCurrentUser();
            navigate("/auth");
        } catch(err){
            console.log(err);
        }

    }


    return currentUser ? (
        <div className="userButton">
            <Image path={currentUser.img || "/general/noAvatar.png"} alt="" />
            <div onClick={() => setOpen((prev) => !prev)}>
            <Image 
                path="/general/arrow.svg"
                alt="" 
                className="arrow"
            />
            </div>
            {open && (
            <div className="userOptions">
                {/* <Link className="userOption" to={`/profile/${currentUser.username}`}>Hồ sơ</Link> */}
                <Link className="userOption" to={`/${currentUser.username}`}>Hồ sơ</Link>
                {/* <div className="userOption">Cài đặt</div> */}
                <div className="userOption" onClick={handleLogout}>Đăng xuất</div>
            </div>
            )}
        </div>
    ) : (
        <Link to="/auth" className='loginLink'> Đăng nhập </Link>
    )
}

export default UserButton