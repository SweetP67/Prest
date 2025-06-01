import './profilePage.css';
import Image from '../../components/image/image';
import { useState } from 'react';
import Gallery from '../../components/gallery/gallery';
import apiRequest from '../../utils/apiRequest';
import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Boards from '../../components/boards/boards';
import FollowButton from './FollowButton';

const ProfilePage = () => {

    const [type, setType] = useState("created");

    const {username} = useParams();

    const {isPending, error, data} = useQuery({
        queryKey: ["profile", username],
        queryFn: () => apiRequest.get(`/users/${username}`).then((res) => res.data),
    });

    if (isPending) return "Đang tải...";
    if (error) return "Lỗi: " + error.message;
    if (!data) return "Không tìm thấy người dùng!";

    console.log(data);

    return (
        <div className="profilePage">
            <Image
                className="profileImg"
                w={100}
                h={100}
                path={data.img || "/general/noAvatar.png"}
                alt=""
            />
            <h1 className='profileName'>{data.displayName}</h1>
            <span className='profileUsername'>{data.username}</span>
            <div className='followCounts'>{data.followerCount} theo dõi • {data.followingCount} đang theo dõi</div>
            <div className='profileInteractions'>
                <Image path="/general/share.svg" alt="" />
                <div className="profileButtons">
                    <button>Gửi tin nhắn</button>
                    <FollowButton isFollowing={data.isFollowing} username={data.username}/>
                </div>
                <Image path="/general/more.svg" alt="" />
            </div>
            <div className="profileOptions">
                <span onClick={()=>setType("created")} className={type==="created" ? "active" : ""}>Ảnh</span>
                <span onClick={()=>setType("saved")} className={type==="saved" ? "active" : ""}>Bộ sưu tập</span>
            </div>
            {type==="created" ? <Gallery userId={data._id}/> : <Boards userId={data._id}/>}
        </div>
    )
}

export default ProfilePage