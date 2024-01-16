"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { data } from "./constants/data";

const Page = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const selectUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSearchQuery("");
    setSearchResults([]);
  };

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const removeUser = (user) => {
    setSelectedUsers(
      selectedUsers.filter((selectedUser) => selectedUser !== user)
    );
  };

  const availableUsers = data.filter((user) => !selectedUsers.includes(user));

  useEffect(() => {
    const filteredUsers = data.filter(
      (user) =>
        !selectedUsers.includes(user) &&
        (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );
    setSearchResults(filteredUsers);
  }, [searchQuery, selectedUsers]);

  return (
    <div className="w-screen h-[91vh] flex flex-col justify-start items-center gap-5 mt-4">
      <div className="neu_shadow p-2 rounded-full">
        <Image src="/image.gif" alt="logo" width={100} height={100} />
      </div>
      <div
        className={`w-[80%] rounded-md neu_shadow px-2 py-2 flex flex-col md:flex-row items-center justify-around gap-4 ${
          selectedUsers.length > 0 ? "items-start" : "items-center"
        }`}
      >
        <div>
          {selectedUsers.length > 0 ? (
            <div className="flex flex-wrap items-center justify-start gap-2">
              {selectedUsers.map((user, index) => (
                <div
                  key={index}
                  className="w-[200px] bg-[#ffffff] text-[#607274] px-4 py-2 rounded-md neu_shadow flex items-center justify-between gap-2"
                >
                  <p className="font-bold text-[18px]">{`${user.name}`}</p>
                  <span
                    className="neu_shadow_cancel cursor-pointer bg-[#FF6868] text-white rounded-full px-1 w-5 h-5 flex items-center justify-center"
                    onClick={() => removeUser(user)}
                  >
                    <svg
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      width="16"
                      height="16"
                      className="text-white"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="m12 10.93 5.719-5.72c.146-.146.339-.219.531-.219.404 0 .75.324.75.749 0 .193-.073.385-.219.532l-5.72 5.719 5.719 5.719c.147.147.22.339.22.531 0 .427-.349.75-.75.75-.192 0-.385-.073-.531-.219l-5.719-5.719-5.719 5.719c-.146.146-.339.219-.531.219-.401 0-.75-.323-.75-.75 0-.192.073-.384.22-.531l5.719-5.719-5.72-5.719c-.146-.147-.219-.339-.219-.532 0-.425.346-.749.75-.749.192 0 .385.073.531.219z" />
                    </svg>
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p>Select Users</p>
          )}
        </div>
        <div className="relative w-[90%]">
          <input
            type="text"
            className={`px-4 py-2 bg-transparent outline-none text-[22px] ${
              selectedUsers.length > 0
                ? "md:w-[50%] w-full"
                : "w-full md:w-[90%]"
            }`}
            placeholder="Search Here..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={toggleDropdown}
            onBlur={toggleDropdown}
          />
          {/* Dropdown */}
          {isOpen && searchResults.length > 0 && (
            <div className="absolute bg-white rounded-md neu_shadow mt-4 w-full overflow-y-auto h-[200px]">
              {searchResults.map((user, index) => (
                <div
                  key={index}
                  className={`cursor-pointer p-2 flex flex-col md:flex-row md:items-center md:gap-5 border-b-2 ${
                    selectedUsers.includes(user) ? "bg-[#607274]" : ""
                  }`}
                  onClick={() => selectUser(user)}
                >
                  <p className="font-bold text-[18px]">{user.name}</p>
                  <p className="text-[20px]">{user.email}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-5"></div>
    </div>
  );
};
export default Page;
