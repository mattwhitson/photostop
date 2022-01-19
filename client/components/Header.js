/* eslint-disable @next/next/no-img-element */
import Link from "next/link";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { HomeIcon, PlusCircleIcon, LoginIcon } from "@heroicons/react/outline";
import ProfileDropdown from "./ProfileDropdown";
import Cookies from "js-cookie";
import Modal from "./Modal";

const Header = () => {
  const [user, setUser] = useContext(UserContext);
  const [modalOpen, setModalOpen] = useState(false);

  const logout = () => {
    Cookies.remove("user");
    setUser(null);
  };

  return (
    <>
      <header className="h-16 bg-[#f7f7f7] sm:bg-white relative">
        <Modal isOpen={modalOpen} setIsOpen={setModalOpen} />

        <div className="max-w-6xl mx-auto h-full flex items-center relative">
          <Link href="/" passHref>
            <img
              src="/photostopv2.png"
              className="h-12 mt-2 text-4xl font-semibold mb-[24px] sm:h-14  hover:cursor-pointer"
              alt="logo"
            />
          </Link>
          <nav className="ml-auto flex justify-center">
            <Link href="/" passHref>
              <button>
                <HomeIcon className="h-6 mr-4" />
              </button>
            </Link>
            {!user ? (
              <Link href="/login">
                <a className="text-xl flex">
                  Login
                  <LoginIcon className="h-6 mt-1 ml-1" />
                </a>
              </Link>
            ) : (
              <>
                <button>
                  <PlusCircleIcon
                    onClick={() => setModalOpen(true)}
                    className="h-6 mr-4"
                  />
                </button>
                <ProfileDropdown handleLogout={logout} user={user} />
              </>
            )}
          </nav>
        </div>
      </header>
    </>
  );
};

export default Header;
