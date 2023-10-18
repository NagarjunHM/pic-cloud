const Navbar = ({ homePage, handleHomePageNavigation, albumId }) => {
  return (
    <div className="fixed top-0 z-10 flex items-baseline w-full p-5 shadow-xl bg-slate-800">
      <div className="pr-5 text-3xl cursor-default">PhotoFolio</div>

      {homePage ? (
        <nav className="w-full rounded-md">
          <ol className="flex text-xl list-reset">
            <li className="cursor-pointer">Home</li>
          </ol>
        </nav>
      ) : (
        <nav className="w-full rounded-md">
          <ol className="flex text-xl list-reset">
            <li className="cursor-pointer" onClick={handleHomePageNavigation}>
              Home
            </li>
            <li>
              <span className="mx-2 text-neutral-500 dark:text-neutral-400">
                /
              </span>
            </li>
            <li className="cursor-pointer ">{albumId}</li>
          </ol>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
