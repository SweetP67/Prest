import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
// import { followUser } from "../../../../backend/controllers/user.controller";

const followUser = async (username) => {
    const res = await apiRequest.post(`/users/follow/${username}`);
    return res.data;
};

const FollowButton = ({ isFollowing, username}) => {

        const queryClient = useQueryClient();
    
        const mutation = useMutation({
            mutationFn: followUser,
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ["profile", username] });
                setDesc("");
                setOpen(false);
            },
        });

    return (
        <button 
            onClick={() => mutation.mutate(username)} 
            disabled={mutation.isPending}
        >
            {isFollowing ? "Đã theo dõi" : "Theo dõi"}
        </button>
        
    );
};

export default FollowButton;