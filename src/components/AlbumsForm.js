import { useState } from "react";
import { BsFillPlusCircleFill } from "react-icons/bs";
import { Modal, Button, Divider, Input, Message, useToaster } from "rsuite";
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../firebaseInit";

const AlbumsForm = () => {
  const toster = useToaster();
  const duplicateAlbumMsg = (
    <Message showIcon type="warning" closable>
      Album with the same name exists
    </Message>
  );
  const successAlbumMsg = (
    <Message showIcon type="success" closable>
      Album creation successful
    </Message>
  );
  const emptyNameMsg = (
    <Message showIcon type="error" closable>
      Input field cannnot be empty
    </Message>
  );

  const [open, setOpen] = useState(false);
  const [albumName, setAlbumName] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleAlbumName = (value) => {
    setAlbumName(value);
  };

  // onClick of save button to check duplicate values and saving it into the fireStore
  const SaveNewAlbum = async () => {
    let tempAlbumList = [];
    const allDocs = await getDocs(collection(db, "AlbumList"));
    allDocs.forEach((doc) => {
      tempAlbumList.push(doc.id);
    });

    if (albumName === "") {
      toster.push(emptyNameMsg, { placement: "topEnd", duration: 3000 });
      return;
    }

    if (tempAlbumList.includes(albumName)) {
      toster.push(duplicateAlbumMsg, {
        placement: "topEnd",
        duration: 3000,
      });
    } else {
      await setDoc(doc(db, "AlbumList", albumName), {});
      toster.push(successAlbumMsg, { placement: "topEnd", duration: 3000 });
    }
    setAlbumName("");
    handleClose();
    tempAlbumList = [];
  };

  return (
    <>
      <Modal open={open} onClose={handleClose} autoFocus={true}>
        <Modal.Header>
          <div className="text-2xl text-center">Create Album</div>
        </Modal.Header>
        <Divider />
        <Modal.Body>
          <label>Enter Album Name</label>
          <Input type="String" value={albumName} onChange={handleAlbumName} />
        </Modal.Body>
        <Divider />
        <Modal.Footer>
          <Button appearance="primary" onClick={SaveNewAlbum}>
            Save
          </Button>
          <Button appearance="subtle" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <button className="fixed bottom-12 right-[6%]" onClick={handleOpen}>
        <BsFillPlusCircleFill size="4em" />
      </button>
    </>
  );
};

export default AlbumsForm;
