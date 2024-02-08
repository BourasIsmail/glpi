"use client";
import { DataTable } from "@/components/table/table";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Modal from "react-modal";

import Dropdown from "@/components/dropdown";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { dataUser } from "@/data/users/users-data";

const Page = () => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
      width: "50vw",
    },
  };
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modelDeleteIsOpen, setModelDeleteIsOpen] = useState(false);
  const [value, setValue] = useState();
  const [selectedValue, setselectedValue] = useState();

  const [comboBoxOpen, setComboBoxOpen] = useState(false);

  const [typeOfSubmit, settypeOfSubmit] = useState("create");

  const usersCol = [
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: () => <div className="">name </div>,
      cell: ({ row }) => {
        const user = row.getValue("name");

        return <div className=" font-medium">{user}</div>;
      },
    },
    {
      accessorKey: "email",
      header: () => <div className="">email </div>,
      cell: ({ row }) => {
        const user = row.getValue("email");

        return <div className=" font-medium">{user}</div>;
      },
    },
    {
      accessorKey: "roles",
      header: () => <div className="">roles </div>,
      cell: ({ row }) => {
        const user = row.getValue("roles");

        return <div className=" font-medium">{user}</div>;
      },
    },
    {
      accessorKey: "divDuService",
      header: () => <div className="">Div Du Service </div>,
      cell: ({ row }) => {
        const user = row.getValue("divDuService");

        return <div className=" font-medium">{user}</div>;
      },
    },

    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => {
        const payment = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>

              <DropdownMenuItem
                onClick={() => {
                  //get selected row data
                  setselectedValue(row.original);
                  setValue(row.original.roles);
                  setIsOpen(true);
                  settypeOfSubmit("update");
                }}
              >
                Update this row
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  setselectedValue(row.original);

                  setModelDeleteIsOpen(true);
                }}
              >
                Delete This row
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="px-6 py-4" id="Tickets">
      <DeleteModal
        closeModal={() => setModelDeleteIsOpen(false)}
        modalIsOpen={modelDeleteIsOpen}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form class="max-w-full mx-auto  py-6 bg-white shadow-md rounded-md">
          <h2 class="text-lg font-semibold mb-4 px-6">
            {typeOfSubmit === "create"
              ? "Create new material"
              : " Update current material"}
          </h2>
          <div class=" px-6  mb-4">
            <label class="block mb-1" for="nomAuteur">
              Nom
            </label>
            <input
              class="w-full border rounded-md px-3 py-2"
              type="text"
              id="type"
              placeholder="Nom"
              value={selectedValue?.name || ""}
              onChange={(e) => {
                setselectedValue({
                  ...selectedValue,
                  name: e.target.value,
                });
              }}
            />
          </div>
          <div class=" px-6  mb-4">
            <label class="block mb-1" for="message">
              email
            </label>
            <input
              class="w-full border rounded-md px-3 py-2"
              type="email"
              id="type"
              placeholder="email"
              value={selectedValue?.email || ""}
              onChange={(e) => {
                setselectedValue({
                  ...selectedValue,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div class=" px-6  mb-4">
            <label class="block mb-1" for="message">
              password
            </label>
            <input
              class="w-full border rounded-md px-3 py-2"
              type="password"
              id="type"
              placeholder="password"
              value={selectedValue?.password || ""}
              onChange={(e) => {
                setselectedValue({
                  ...selectedValue,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <div class=" px-6  mb-4">
            <label class="block mb-1" for="message">
              divDuService
            </label>
            <input
              class="w-full border rounded-md px-3 py-2"
              type="text"
              id="type"
              placeholder="divDuService"
              value={selectedValue?.divDuService || ""}
              onChange={(e) => {
                setselectedValue({
                  ...selectedValue,
                  divDuService: e.target.value,
                });
              }}
            />
          </div>
          <div class=" px-6  mb-4 flex flex-col w-full">
            <label class="block mb-1" for="userInfo">
              Roles
            </label>
            <Dropdown
              comboBoxOpen={comboBoxOpen}
              data={frameworks}
              setComboBoxOpen={setComboBoxOpen}
              value={value}
              setValue={setValue}
            />
          </div>{" "}
          <div class="mt-4 px-6 flex justify-end">
            <button class="bg-blue-500 text-white px-4 py-2 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </Modal>
      <DataTable
        title={"Users"}
        filterCol="email"
        columns={usersCol}
        data={dataUser}
        setOpenModal={openModal}
        settypeOfSubmit={settypeOfSubmit}
        canAdd={true}
      />
    </div>
  );
};

export default Page;
const frameworks = [
  {
    value: "ADMIN_ROLES",
    label: "ADMIN_ROLES",
  },
  {
    value: "USER_ROLES",
    label: "USER_ROLES",
  },
];

const DeleteModal = ({ modalIsOpen, afterOpenModal, closeModal }) => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "0",
      width: "fit-content",
    },
  };
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
        <h2 className="text-lg font-semibold mb-4">Delete Item</h2>
        <div className="mb-4">
          <p>Are you sure you want to delete this item?</p>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={closeModal}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md mr-2"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-red-500 text-white px-4 py-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </form>
    </Modal>
  );
};
