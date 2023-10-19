import { doc, onSnapshot, updateDoc, deleteField } from "firebase/firestore";
import { db } from "../firebaseInit";
import { useEffect, useState, useRef } from "react";
import { AiOutlineClose, AiOutlineEdit } from "react-icons/ai";
import { BiArrowBack } from "react-icons/bi";
import { BsImageFill } from "react-icons/bs";
import ImageForm from "./ImageForm";
import { Message, useToaster, Drawer, Button, Placeholder } from "rsuite";

const ImageList = ({ id, handleHomePageNavigation }) => {
  const [imageOpen, setImageOpen] = useState(false);
  const [imageDetail, setImageDetail] = useState([]);
  const [allImageList, setAllImageList] = useState([]);
  const [editImageInfo, setEditImageInfo] = useState([]);
  const toaster = useToaster();
  const childRef = useRef();

  // useEffect to set the list of image to a state on mount
  useEffect(() => {
    console.log(id);
    const unsub = onSnapshot(doc(db, "AlbumList", id), (doc) => {
      setAllImageList(Object.entries(doc.data()));
    });
    return () => {
      unsub();
    };
  }, []);

  // onClick function to delete the image from the respective albums
  const handleImageDelete = (img) => {
    const docRef = doc(db, "AlbumList", id);
    let data = {};
    data[img[0]] = deleteField();
    updateDoc(docRef, data)
      .then(() => {
        console.log("Code Field has been deleted successfully");

        // success toast
        toaster.push(
          <Message showIcon type="success" closable>
            {img[0]} deleted successfully
          </Message>,
          {
            placement: "topEnd",
            duration: 3000,
          }
        );
      })
      .catch(() => {
        console.log("error");

        // success toast
        toaster.push(
          <Message showIcon type="error" closable>
            something went wrong did not delete {img[0]}
          </Message>,
          {
            placement: "topEnd",
            duration: 3000,
          }
        );
      })
      .finally(() => {
        console.log("finished");
      });
  };

  // function to handle full screen image open
  const handleImageOpen = (img) => {
    setImageOpen(true);
    setImageDetail(img);
  };

  return (
    <>
      <div className="container relative flex flex-row flex-wrap items-center justify-center w-[80%] px-4 m-auto top-20">
        {allImageList.map((item, index) => (
          <div className="p-5" key={index}>
            <div className="flex flex-col overflow-hidden border rounded-lg shadow-md border-slate-800 bg-slate-800 hover:border-slate-600 hover:box-border hover:shadow-blue-300/50">
              <div>
                {/* Button to delete the image from the album */}
                <button
                  className="z-10 float-right p-3 rounded-lg hover:bg-slate-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleImageDelete(item);
                  }}
                >
                  <AiOutlineClose size="1.3em" />
                </button>

                {/* Button to edit the image name and url */}
                <button
                  className="z-10 float-right p-3 rounded-lg hover:bg-slate-700"
                  onClick={(e) => {
                    e.stopPropagation();
                    childRef.current.click();
                    setEditImageInfo(item);
                  }}
                >
                  <AiOutlineEdit size="1.3em" />
                </button>
              </div>
              <div className="overflow-hidden">
                {item[1] !== "" ? (
                  <img
                    src={item[1]}
                    alt={item[0]}
                    style={{ width: "18rem", height: "12rem" }}
                    className="object-cover duration-200 hover:scale-110"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleImageOpen(item);
                    }}
                  />
                ) : (
                  <BsImageFill style={{ width: "18rem", height: "12rem" }} />
                )}
              </div>
              <div className="p-3 text-xl text-center bottom-3">{item[0]}</div>
            </div>
          </div>
        ))}
      </div>

      {/* full screen image viewer */}
      <Drawer
        size="full"
        placement="bottom"
        open={imageOpen}
        onClose={() => setImageOpen(false)}
      >
        <Drawer.Header>
          <Drawer.Title>{imageDetail[0]}</Drawer.Title>
          <Drawer.Actions>
            <Button onClick={() => setImageOpen(false)}>Close</Button>
          </Drawer.Actions>
        </Drawer.Header>
        <Drawer.Body>
          <div className="h-[100%] ">
            <img
              src={imageDetail[1]}
              alt={imageDetail[0]}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                opacity: "1",
              }}
            />
          </div>
        </Drawer.Body>
      </Drawer>

      {/* Back arrow button */}
      <button
        className="fixed top-[30%] left-[6%] p-1 rounded-full hover:bg-slate-500"
        onClick={handleHomePageNavigation}
      >
        <BiArrowBack size="4em" />
      </button>

      {/* imageForm component */}
      <ImageForm id={id} childRef={childRef} editImageInfo={editImageInfo} />
    </>
  );
};

export default ImageList;
