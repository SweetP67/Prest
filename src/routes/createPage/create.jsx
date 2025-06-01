import "./createPage.css";
import IKImage from "../../components/image/image";
import useAuthStore from "../../utils/authStore";
import {useNavigate} from "react-router";
import { useEffect, useState, useRef } from "react";
import Editor from "../../components/editor/editor";
import useEditorStore from "../../utils/editorStore";
import apiRequest from "../../utils/apiRequest";

const CreatePage = () => {

    const { currentUser } = useAuthStore();
    const navigate = useNavigate();
    const formRef = useRef();
    const {textOptions, canvasOptions} = useEditorStore();

    const [file, setFile] = useState(null);
    const [previewImg, setPreviewIng] = useState({
        url: "",
        width: 0,
        height: 0,
    });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        if(!currentUser) {
            navigate("/auth");
        }
    }, [navigate, currentUser]);

    // const previewImgURL = file ? URL.createObjectURL(file) : null;
    useEffect(() => {
        if (file) {
            const img = new Image();
            img.src = URL.createObjectURL(file);
            img.onload = () => {
                setPreviewIng({
                    url:URL.createObjectURL(file),
                    width: img.width,
                    height: img.height,
                });
            };
        }
    }, [file]);

    const handleSubmit = async () => {
        if (isEditing) {
            setIsEditing(false);
        } else {
            const formData = new FormData(formRef.current);
            formData.append("media", file);
            formData.append("textOptions", JSON.stringify(textOptions));
            formData.append("canvasOptions", JSON.stringify(canvasOptions));

            try {
                const res = await apiRequest.post("/pins", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });
                navigate(`/pin/${res.data._id}`);

            } catch(err) {
                console.log(err);
            }
        }
    };

    return (
        <div className="createPage">
            <div className="createTop">
                <h1>{isEditing ? "Chỉnh sửa ảnh" : "Tạo ảnh"}</h1>
                <button onClick={handleSubmit}>{isEditing ? "Xong" : "Đăng"}</button>
            </div>
            {isEditing ? <Editor previewImg={previewImg}/> : (

                <div className="createBottom">
                {previewImg.url ? (
                    <div className="preview">
                        <img src={previewImg.url} alt="" />
                        <div className="editIcon" onClick={() => setIsEditing(true)}>
                            <IKImage path="/general/edit.svg" alt=""/>
                        </div>
                    </div>  
                )   :   (
                        <>
                            <label htmlFor="file" className="upload">
                            <div className="uploadTitle">
                                <IKImage path="/general/upload.svg"/>
                                <span>Chọn file</span>
                            </div>
                            <div className="uploadInfo">
                                Đề xuất file có định dạng .jpg và ít hơn 50 MB.
                            </div>
                            </label>    
                        </>
                    )
                }
                <input 
                    type="file" 
                    id="file" 
                    hidden
                    onChange={(e) => setFile(e.target.files[0])}
                />
                <form className="createForm" ref={formRef}>
                    <div className="createFormItem">
                        <label htmlFor="">Tiêu đề</label>
                        <input 
                            type="text"
                            placeholder='Thêm tiêu đề ảnh' 
                            name='title'
                            id='title'
                        />
                    </div>
                    <div className="createFormItem">
                        <label htmlFor="">Mô tả</label>
                        <textarea
                            rows={6} 
                            type="text"
                            placeholder='Nhập mô tả ảnh' 
                            name='description'
                            id='description'
                        />
                    </div>
                    <div className="createFormItem">
                        <label htmlFor="">Link</label>
                        <input 
                            type="text"
                            placeholder='Thêm link đính kèm' 
                            name='link'
                            id='link'
                        />
                    </div>
                    <div className="createFormItem">
                        <label htmlFor="board">Bộ sưu tập</label>
                        <select name="board" id="board">
                            <option value="">Chọn bộ sưu tập</option>
                            <option value="1">Bộ sưu tập 1</option>
                            <option value="2">Bộ sưu tập 2</option>
                            <option value="3">Bộ sưu tập 3</option>
                        </select>
                    </div>
                    <div className="createFormItem">
                        <label htmlFor="tags">Chủ đề</label>
                        <input 
                            type="text"
                            placeholder='Chọn chủ đề' 
                            name='tags'
                            id='tags'
                        />
                        {/* <small>Đừng lo mọi người sẽ không nhìn thấy chủ đề của bạn</small> */}
                    </div>
                </form>

            </div>
            )}
        </div>
    )
}

export default CreatePage