import './galleryItem.css';
import { Link } from 'react-router';
import Image from '../image/image';
import apiRequest from '../../utils/apiRequest';
import { QueryClient } from '@tanstack/react-query';


const GalleryItem = ({ item, userId, currentUser }) => {

    // const optimizedHeight = (372 * item.height) / item.width;
    const maxHeight = 565;
    // const optimizedHeight = Math.min((372 * item.height) / item.width, maxHeight);
    const optimizedHeight = (372 * item.height) / item.width;
    // const optimizedHeight = Math.max(372, (372 * item.height) / item.width);
    
    

    const handleDownload = async () => {
        try {
            const response = await fetch(item.media);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `image_${item._id}.jpg`; // Tên file tải xuống
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Error downloading image:", err);
        }
    };

    const handleDelete = async () => {
        if (window.confirm("Bạn có chắc chắn muốn xóa ảnh này không?")) {
            try {
                await apiRequest.delete(`/pins/${item._id}`);
                alert("Xóa ảnh thành công!");
                onDeleted?.(item._id); // Gọi callback nếu có để xóa khỏi UI
            } catch (err) {
                console.error("Lỗi khi xóa ảnh:", err);
                // alert("Xóa ảnh thất bại.");
            }
        }
    };

    // const isOwnerOrAdmin = item.user._id === userId || userRole === 'admin';
        // const isOwnerOrAdmin = currentUser?._id === item.owner?._id || currentUser?.isAdmin;
        const isOwnerOrAdmin = currentUser?._id === item.owner?._id || currentUser?.isAdmin;


    return (
        <div 
            className="galleryItem" 
            style={{gridRowEnd: `span ${Math.ceil(item.height / 100)}`}}
        >
            {/* <Image path={item.media} alt="" /> */}
            <Image path={item.media} alt="" w={372} h={optimizedHeight}/>
            <Link to={`/pin/${item._id}`} className='overlay'/>
            <button className='saveButton'>Chia sẻ</button>
        <div className='overlayIcons'>
            <button onClick={handleDownload}>
                <Image path="/general/download.png" alt="" />
            </button>
            {isOwnerOrAdmin ? (
                    <button onClick={handleDelete}>
                        <Image path="/general/cancel.svg" alt="Xóa ảnh" />
                    </button>
                ) : (<></>)}
        </div>
        </div>
    );
}

export default GalleryItem;