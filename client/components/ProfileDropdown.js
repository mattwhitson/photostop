/* eslint-disable @next/next/no-img-element */
import { Menu, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/outline";
import { LogoutIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

const ProfileDropdown = ({ handleLogout, user }) => {
  const router = useRouter();
  return (
    <Menu as="div" className="inline">
      <Menu.Button className="">
        {user.profilePicture ? (
          <img
            src={user.profilePicture}
            alt=""
            className="h-6 mt-[6px] rounded-full "
          />
        ) : (
          <img
            src="/default-avatar.jpg"
            alt=""
            className="h-6 mt-[6px] rounded-full pr-2"
          />
        )}
      </Menu.Button>
      <Transition
        className="absolute right-0 w-56 top-16 "
        enter="transition duration-200 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-200 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Menu.Items
          as="div"
          className="bg-[#f7f7f7] flex flex-col rounded shadow-lg py-2 px-1 space-y-2 outline-none"
        >
          <Menu.Item disabled={router.asPath.split("/")[2] === user.username}>
            {({ active, disabled }) => (
              <a
                className={`px-2 py-1 hover:cursor-pointer flex items-center ${
                  disabled
                    ? "text-gray-500"
                    : active
                    ? "bg-blue-600 text-white rounded"
                    : ""
                }`}
                href={`/profile/${user.username}`}
              >
                <UserIcon className="h-4 pr-1" />
                <p>Profile</p>
              </a>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <div
                className={`px-2 py-1 flex items-center hover:cursor-pointer ${
                  active && "bg-blue-600 text-white rounded items-start"
                }`}
                onClick={handleLogout}
              >
                <LogoutIcon className="h-4 pr-1" />
                <p>Logout</p>
              </div>
            )}
          </Menu.Item>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;
