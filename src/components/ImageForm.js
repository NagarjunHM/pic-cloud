import { BsFillPlusCircleFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { Modal, Button, Divider, Input, Message, useToaster } from "rsuite";
import { db } from "../firebaseInit";
import { doc, setDoc } from "firebase/firestore";

const ImageForm = ({ id, childRef, editImageInfo }) => {
  const toaster = useToaster();
  const [open, setOpen] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const [imageName, setImageName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const handleOpen = () => {
    setOpen(true);
  };

  //to handle and clear the values in ImageName ImageUrl
  const handleClose = () => {
    setImageName("");
    setImageUrl("");
    setOpen(false);
    setIsDisabled(false);
  };

  // to handle image name
  const handleImageName = (value) => {
    setImageName(value);
  };

  // to handle image url
  const handleImageUrl = (value) => {
    setImageUrl(value);
  };

  useEffect(() => {
    setImageName(editImageInfo[0]);
    setImageUrl(editImageInfo[1]);
  }, [editImageInfo]);

  useEffect(() => {
    setImageName("");
    setImageUrl("");
  }, []);

  //  function to save new image into firestore
  const saveNewImage = async () => {
    if (imageName === "") {
      // error toast
      toaster.push(
        <Message showIcon type="error" closable>
          Image name cannot be empty
        </Message>,
        {
          placement: "topEnd",
          duration: 3000,
        }
      );
      handleClose();
      return;
    }
    let Data = {};

    Data[imageName] = imageUrl;
    const merge = { merge: true };
    setDoc(doc(db, "AlbumList", id), Data, merge)
      .then(() => {
        console.log("image uploaded successfully");
        // success toast
        toaster.push(
          <Message showIcon type="success" closable>
            {imageName} uploaded successfully
          </Message>,
          {
            placement: "topEnd",
            duration: 3000,
          }
        );
      })
      .catch(() => {
        console.log("image insertion unsuccessful");
        // error toast
        toaster.push(
          <Message showIcon type="error" closable>
            something went wrong image. Image is not uploaded
          </Message>,
          {
            placement: "topEnd",
            duration: 3000,
          }
        );
      });

    handleClose();
  };

  return (
    <>
      <Modal open={open} onClose={handleClose} autoFocus={true}>
        <Modal.Header>
          <div className="text-2xl text-center">Add new Image</div>
        </Modal.Header>
        <Divider />
        <Modal.Body>
          <label>Enter Image Name</label>
          <Input
            type="String"
            value={imageName || ""}
            onChange={handleImageName}
            disabled={isDisabled}
          />
          <div className="py-4"></div>
          <label>Enter Image Url</label>
          <Input
            type="String"
            value={imageUrl || ""}
            onChange={handleImageUrl}
          />
        </Modal.Body>
        <Divider />
        <Modal.Footer>
          <Button appearance="primary" onClick={saveNewImage}>
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

      <button
        ref={childRef}
        style={{ display: "none" }}
        onClick={() => {
          setOpen(true);
          setIsDisabled(true);
          setImageName(editImageInfo[0]);
          setImageUrl(editImageInfo[1]);
        }}
      ></button>
    </>
  );
};

export default ImageForm;
