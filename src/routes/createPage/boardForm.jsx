import Image from "../../components/image/image";

const BoardForm = ({ setIsNewBoardOpen, setNewBoard }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const title = e.target[0].value;
    setNewBoard(title);
    setIsNewBoardOpen(false);
  };

  return (
    <div className="boardForm">
      <div className="boardFormContainer">
        <div
          className="boardFormClose"
          onClick={() => setIsNewBoardOpen(false)}
        >
          <Image path="/general/cancel.svg" alt="" w={20} h={20} />
        </div>
        <form onSubmit={handleSubmit}>
          <h1>Tạo bộ sưu tập mới</h1>
          <input type="text" placeholder=" " />
          <button>Tạo</button>
        </form>
      </div>
    </div>
  );
};

export default BoardForm;