import { useEffect, useState } from "react";
import { AiFillFolder } from "react-icons/ai";
import { AiOutlineClose } from "react-icons/ai";
import AlbumsForm from "./AlbumsForm";
import { db } from "../firebaseInit";
import { Message, useToaster } from "rsuite";
import { onSnapshot, collection, deleteDoc, doc } from "firebase/firestore";

const AlbumsList = ({ handleImagePageNavigation }) => {
  const toaster = useToaster();

  const [albumList, setAlbumList] = useState([]);

  //useEffect to fetch the data from fireStore and add it to useState varaible onMount
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "AlbumList"), (doc) => {
      let album = doc.docs.map((doc) => {
        return {
          id: doc.id,
        };
      });
      // console.log(album);
      setAlbumList([...album]);
    });
    return () => {
      unsub();
    };
  }, []);

  // Function to delete the Album from the firebase
  const handleAlbumDelete = (id) => {
    // console.log(id);
    deleteDoc(doc(db, "AlbumList", id))
      .then(() => {
        console.log("Success");

        // success toast
        toaster.push(
          <Message showIcon type="success" closable>
            {id} album deleted successfully
          </Message>,
          {
            placement: "topEnd",
            duration: 3000,
          }
        );
      })
      .catch(() => {
        console.log("error");

        // error toast
        toaster.push(
          <Message showIcon type="error" closable>
            something went wrong did not delete {id}
          </Message>,
          {
            placement: "topEnd",
            duration: 3000,
          }
        );
      });
  };

  return (
    <>
      <div className="container  w-[80%] m-auto px-4 flex flex-wrap flex-row justify-center items-center relative top-20">
        {/* Map Functio to render the list of albums on to the screen */}
        {albumList.map((item, index) => (
          <div
            key={index}
            className="p-5 "
            onClick={() => {
              handleImagePageNavigation(item.id);
            }}
          >
            <div className=" relative w-[16em] h-[16em] border border-slate-800 bg-slate-800 shadow-md hover:border-slate-600 hover:box-border hover:shadow-blue-300/50  rounded-lg flex flex-row justify-center items-center">
              <div className="absolute flex items-center right-2 top-2">
                <button
                  className="p-3 rounded-lg hover:bg-slate-500"
                  onClick={(e) => {
                    handleAlbumDelete(item.id);
                    console.log(item.id);
                    e.stopPropagation();
                  }}
                >
                  <AiOutlineClose size="1.3em" />
                </button>
              </div>
              <AiFillFolder size="13em" />
              <div className="absolute m-1 text-xl text-center truncate bottom-3">
                {item["id"]}
              </div>
            </div>
          </div>
        ))}
      </div>
      <AlbumsForm />
    </>
  );
};
export default AlbumsList;
