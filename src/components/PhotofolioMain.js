import AlbumsList from "./AlbumsList";
import ImageList from "./ImageList";
import Navbar from "./Navbar";
import { useState } from "react";

export default function PhotofolioMain() {
  const [homePage, setHomePage] = useState(true);
  const [albumId, setAlbumId] = useState("");

  // Function to Image handle page Navigation
  const handleImagePageNavigation = (id) => {
    setHomePage(false);
    setAlbumId(id);
  };

  // Function to handle home page Navigation
  const handleHomePageNavigation = () => {
    setHomePage(true);
  };
  return (
    <div className="text-white">
      <Navbar
        homePage={homePage}
        handleHomePageNavigation={handleHomePageNavigation}
        albumId={albumId}
      />
      {homePage ? (
        <AlbumsList handleImagePageNavigation={handleImagePageNavigation} />
      ) : (
        <ImageList
          id={albumId}
          handleHomePageNavigation={handleHomePageNavigation}
        />
      )}
    </div>
  );
}
