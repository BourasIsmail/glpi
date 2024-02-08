"use client";
import { DataTable } from "@/components/table/table";
import { dataTicket } from "@/data/ticket/ticket-data";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Modal from "react-modal";
import { useQuery } from "@tanstack/react-query";
import { api, getTickets, getUsers, getCurrentUser } from "@/api";
import { useToast } from "@/components/ui/use-toast";
import Dropdown from "@/components/dropdown";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getCookie } from "cookies-next";

import { Switch } from "@/components/ui/switch";
const Page = () => {
  const token = getCookie('token');
  const { toast } = useToast()

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
  const [affectationDate, setAffectationDate] = useState(
    selectedValue?.dateAffectation || ""
  );
  const [achatDate, setAchatDate] = useState(selectedValue?.dateAchat || "");
  const [comboBoxOpen, setComboBoxOpen] = useState(false);

  const [typeOfSubmit, settypeOfSubmit] = useState("create");

  const ticketColumns = [

    {
      accessorKey: "userInfo",
      header: () => <div className="">User </div>,
      cell: ({ row }) => {
        const user = row.getValue("userInfo");

        return <div className=" font-medium">{user?.name}</div>;
      },
    },
    {
      accessorKey: "message",
      header: "Message",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("message")}</div>
      ),
    },
    {
      accessorKey: "nomAuteur",
      header: "Nom Auteur",
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("nomAuteur")}</div>
      ),
    },
    {
      accessorKey: "etat",
      header: () => <div className="">Etat</div>,
      cell: ({ row }) => {
        const amount = row.getValue("etat");

        return (
          <div className=" font-medium">
            {" "}
            <Switch id="airplane-mode" checked={amount} />
          </div>
        );
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
                  setAchatDate(row.original.dateAchat);
                  setAffectationDate(row.original.dateAffectation);
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

  const { data, refetch } = useQuery({
    queryKey: ['tickets'],
    queryFn: getTickets(),
  });
  const { data: usersData, } = useQuery({
    queryKey: ['user'],
    queryFn: getCurrentUser(),
  });

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const user = getCurrentUser()
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(typeOfSubmit, "selectedValue");
    if (typeOfSubmit === "create" && usersData) {
      try {
        await api.post("/tickets/" + usersData.id, {
          ...selectedValue,
          dateAchat: achatDate,
          dateAffectation: affectationDate,
        })
        refetch()
        toast({
          description: "Material created successfully",
          className: "bg-green-500 text-white",
          duration: 2000,
          title: "Success",
        })
        setIsOpen(false);
      } catch (e) {
        toast({
          description: "Error creating material",
          className: "bg-red-500 text-white",
          duration: 2000,
          title: "Error",
        })
      }
    }
    else if (typeOfSubmit === "update" && usersData) {
      try {
        await api.put("/tickets/" + selectedValue.id + '/user/' + usersData.id, {
          ...selectedValue,
          dateAchat: achatDate,
          dateAffectation: affectationDate,
        })
        refetch()
        toast({
          description: "Material updated successfully",
          className: "bg-green-500 text-white",
          duration: 2000,
          title: "Success",
        })
        setIsOpen(false);
      } catch (e) {
        toast({
          description: "Error updating material",
          className: "bg-red-500 text-white",
          duration: 2000,
          title: "Error",
        })
      }
    }
  }
  return (
    <div className="px-6 py-4" id="Tickets">
      <DeleteModal
        closeModal={() => setModelDeleteIsOpen(false)}
        modalIsOpen={modelDeleteIsOpen}
        selectedValue={selectedValue}
        refetch={refetch}
        toast={toast}
      />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <form class="max-w-full mx-auto  py-6 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
          <h2 class="text-lg font-semibold mb-4 px-6">
            {typeOfSubmit === "create"
              ? "Create new material"
              : " Update current material"}
          </h2>
          <div class=" px-6  mb-4">
            <label class="block mb-1" for="nomAuteur">
              Nom Auteur
            </label>
            <input
              class="w-full border rounded-md px-3 py-2"
              type="text"
              id="type"
              placeholder="Nom Auteur"
              value={selectedValue?.nomAuteur || ""}
              onChange={(e) => {
                setselectedValue({
                  ...selectedValue,
                  nomAuteur: e.target.value,
                });
              }}
            />
          </div>
          <div class=" px-6  mb-4">
            <label class="block mb-1" for="message">
              message
            </label>
            <input
              class="w-full border rounded-md px-3 py-2"
              type="text"
              id="type"
              placeholder="message"
              value={selectedValue?.message || ""}
              onChange={(e) => {
                setselectedValue({
                  ...selectedValue,
                  message: e.target.value,
                });
              }}
            />
          </div>

          <div class=" px-6  mb-4">
            <label class="block mb-1" for="etat">
              Etat
            </label>
            <Switch
              id="etat"
              checked={selectedValue?.etat}
              onCheckedChange={(e) => {
                setselectedValue({
                  ...selectedValue,
                  etat: e,
                });
              }}
            />
          </div>
          <div class="mt-4 px-6 flex justify-end">
            <button class="bg-blue-500 text-white px-4 py-2 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </Modal>
      <DataTable
        title={"Tickets"}
        filterCol="nomAuteur"
        columns={ticketColumns}
        data={data || []}
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
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];


const DeleteModal = ({ modalIsOpen, afterOpenModal, closeModal, selectedValue, refetch, toast }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.delete("/tickets/" + selectedValue.id)
      toast({
        description: "Material deleted successfully",
        className: "bg-green-500 text-white",
        duration: 2000,
        title: "Success",
      })
      refetch()
      closeModal()
    } catch (e) {
      toast({
        description: "Error deleting material",
        className: "bg-red-500 text-white",
        duration: 2000,
        title: "Error",
      })
      console.log(e);
    }
  }
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={customStyles}
      contentLabel="Example Modal"
    >
      <form className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
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