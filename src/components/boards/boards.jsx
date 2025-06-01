import './boards.css';
import Image from '../image/image';
import { useQuery } from '@tanstack/react-query';
import apiRequest from '../../utils/apiRequest';
import { useParams, Link } from 'react-router';
import { format } from "timeago.js";

const Boards = ({userId}) => {

    const {isPending, error, data} = useQuery({
        queryKey: ["boards", userId],
        queryFn: () => apiRequest.get(`/boards/${userId}`).then((res) => res.data),
    });

    if (isPending) return "Đang tải...";
    if (error) return "Lỗi phát hiện : " + error.message;

    console.log(data);

    return (
        <div className="collections">
            {/* COLLECTION */}
            {data?.map((board) => (
                <Link
                    to={`/search?boardId=${board._id}`} 
                    className="collection" 
                    key={board._id}
                >

                    {board.firstPin ? (<>
                        <Image path={board.firstPin.media} alt=""/>
                        <div className="collectionInfo">
                            <h1>{board.title}</h1>
                            <span>{board.pinCount} Pins • {format(board.createdAt)}</span>
                        </div>
                    </>) : (
                        <>
                        <Image path={"/general/no-image-icon-23480.jpg"} alt=""/>
                        <div className="collectionInfo">
                            <h1>{board.title}</h1>
                            <span>0 Pins • {format(board.createdAt)}</span>
                        </div>
                    </>
                    )}
                    
                </Link>
            ))}
        </div>


    )
}

export default Boards;
                