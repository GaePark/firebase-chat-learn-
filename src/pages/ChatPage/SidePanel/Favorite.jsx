import {
  child,
  off,
  onChildAdded,
  onChildRemoved,
  ref,
} from "firebase/database";
import { FaRegSmileBeam } from "react-icons/fa";
import { db } from "../../../firebase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentChatRoom,
  setPrivateChatRoom,
} from "../../../store/chatRoomSlice";

const Favorite = () => {
  const usersRef = ref(db, "users");
  const [favoriteChatRooms, setFavoriteChatRooms] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [activeChatRoomId, setActiveChatRoomId] = useState("");

  const dispatch = useDispatch();

  useEffect(() => {
    if (currentUser?.uid) {
      addListener(currentUser.uid);
    }
    return () => {
      removeListener(currentUser.uid);
    };
  }, [currentUser?.uid]);

  const removeListener = (userId) => {
    off(child(usersRef, `${userId}/favorite`));
  };

  const addListener = (userId) => {
    let favoriteArray = [];
    onChildAdded(child(usersRef, `${userId}/favorite`), (DataSnapshot) => {
      favoriteArray.push({ id: DataSnapshot.key, ...DataSnapshot.val() });
      const newFavoriteCahtRooms = [...favoriteArray];

      setFavoriteChatRooms(newFavoriteCahtRooms);
    });

    onChildRemoved(child(usersRef, `${userId}/favorite`), (DataSnapshot) => {
      const filteredChatRooms = favoriteArray.filter((chatRoom) => {
        return chatRoom.id !== DataSnapshot.key;
      });
      favoriteArray = filteredChatRooms;
      setFavoriteChatRooms(filteredChatRooms);
    });
  };

  const changeChatRoom = (room) => {
    dispatch(setCurrentChatRoom(room));
    dispatch(setPrivateChatRoom(false));
    setActiveChatRoomId(room.id);
  };

  const renderFavoriteChatRooms = (favoriteChatRooms) => {
    const favoritechat =
      favoriteChatRooms.length > 0 &&
      favoriteChatRooms.map((cahtRoom) => (
        <li
          key={cahtRoom.id}
          onClick={() => changeChatRoom(cahtRoom)}
          style={{
            backgroundColor:
              cahtRoom.id === activeChatRoomId ? "#ffffff45" : "",
          }}
        >
          # {cahtRoom.name}
        </li>
      ));

    return favoritechat;
  };

  return (
    <div>
      <span style={{ display: "flex", alignItems: "center" }}>
        <FaRegSmileBeam />
        FAVORITE
      </span>
      <ul style={{ listStyleType: "none", padding: 0 }}>
        {renderFavoriteChatRooms(favoriteChatRooms)}
      </ul>
    </div>
  );
};

export default Favorite;
