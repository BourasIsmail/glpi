import Link from "next/link";
import { FaUser, FaUsers } from "react-icons/fa";
import { MdDevices } from "react-icons/md";

const Sidebar = () => {
  return (
    <div className="fixed flex flex-col top-0 left-0 w-64 bg-[#007BFF] h-full border-r text-white">
      <div className="flex items-center justify-center h-14 border-b">
        <div>Entraide-GLPI</div>
      </div>
      <div className="overflow-y-auto overflow-x-hidden flex-grow justify-between flex flex-col">
        <ul className="flex flex-col py-4 space-y-1">
          <li>
            <Link
              href="/"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Dashboard
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/materiels"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <MdDevices className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Materiels
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/tickets"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Tickets
              </span>
            </Link>
          </li>
          <li>
            <Link
              href="/utilisateurs"
              className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
            >
              <span className="inline-flex justify-center items-center ml-4">
                <FaUsers className="w-5 h-5" />
              </span>
              <span className="ml-2 text-sm tracking-wide truncate">
                Utilisateurs
              </span>
            </Link>
          </li>
        </ul>
        <div className="py-4 space-y-1">
          <Link
            href="/user"
            className="relative flex flex-row items-center h-11 focus:outline-none hover:bg-gray-50 text-white hover:text-gray-800 border-l-4 border-transparent hover:border-indigo-500 pr-6"
          >
            <span className="inline-flex justify-center items-center ml-4">
              <FaUser className="w-5 h-5" />
            </span>
            <span className="ml-2 text-sm tracking-wide truncate">
              LostArk Player
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
