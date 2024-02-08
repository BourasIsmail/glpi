"use client";
import { DataTable } from "@/components/table/table";
import { dataMaterial } from "@/data/material/material-ticket";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import Modal from "react-modal";
import { api, getMaterials, getUsers } from "@/api";
import { useQuery } from "@tanstack/react-query";
import { setCookie, getCookie } from "cookies-next";
import { useToast } from "@/components/ui/use-toast";

import DatePicker from "@/components/datePicker";
import Dropdown from "@/components/dropdown";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
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
  const [affectationDate, setAffectationDate] = useState(
    selectedValue?.dateAffectation || ""
  );
  const [achatDate, setAchatDate] = useState(selectedValue?.dateAchat || "");
  const [comboBoxOpen, setComboBoxOpen] = useState(false);

  const [typeOfSubmit, settypeOfSubmit] = useState("create");

  const materialColumns = [
    {
      accessorKey: "id",
      header: "Id",
      cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "userInfo",
      header: () => <div className="">User </div>,
      cell: ({ row }) => {
        const user = row.getValue("userInfo");

        return <div className=" font-medium">{user?.name}</div>;
      },
    },
    {
      accessorKey: "marqueEtRef",
      header: "Ref",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("marqueEtRef")}</div>
      ),
    },
    {
      accessorKey: "type",
      header: ({ column }) => {
        return <Button variant="ghost">Type</Button>;
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("type")}</div>
      ),
    },
    {
      accessorKey: "etat",
      header: () => <div className="">Etat</div>,
      cell: ({ row }) => {
        const amount = row.getValue("etat");

        return <div className=" font-medium">{amount}</div>;
      },
    },

    {
      accessorKey: "dateAchat",
      header: () => <div className="">Date achat</div>,
      cell: ({ row }) => {
        const dateAchat = parseFloat(row.getValue("dateAchat"));

        return <div className=" font-medium">{dateAchat}</div>;
      },
    },
    {
      accessorKey: "dateAffectation",
      header: () => <div className="">Date affectation</div>,
      cell: ({ row }) => {
        const dateAffectation = parseFloat(row.getValue("dateAffectation"));

        return <div className=" font-medium">{dateAffectation}</div>;
      },
    },

    {
      accessorKey: "dispo",
      header: () => <div className="">Dispo</div>,
      cell: ({ row }) => {
        const amount = row.getValue("dispo");

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
  const { toast } = useToast()

  //use query to get data from the server
  const { data, refetch } = useQuery({
    queryKey: ['materiels'],
    queryFn: getMaterials(),
  });
  const { data: usersData, } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers(),
  });
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeOfSubmit === "create" && value) {
      try {
        await api.post("/materiel/" + value, {
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
    else if (typeOfSubmit === "update" && value) {
      try {
        console.log(typeOfSubmit, value, selectedValue);
        await api.put("/materiel/" + selectedValue.id + '/user/' + value, {
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
    <div className="px-6 py-4" id="Materiels">
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
        <form className="max-w-full mx-auto  py-6 bg-white shadow-md rounded-md" onSubmit={handleSubmit}>
          <h2 className="text-lg font-semibold mb-4 px-6">
            {typeOfSubmit === "create"
              ? "Create new material"
              : " Update current material"}
          </h2>
          <div className=" px-6  mb-4">
            <label className="block mb-1" for="marqueEtRef">
              Ref
            </label>
            <input
              className="w-full border rounded-md px-3 py-2"
              type="text"
              id="marqueEtRef"
              placeholder="Ref"
              value={selectedValue?.marqueEtRef || ""}
              onChange={(e) => {
                setselectedValue({
                  ...selectedValue,
                  marqueEtRef: e.target.value,
                });
              }}
            />
          </div>
          <div className=" px-6  mb-4">
            <label className="block mb-1" for="type">
              Type
            </label>
            <input
              className="w-full border rounded-md px-3 py-2"
              type="text"
              id="type"
              placeholder="Type"
              value={selectedValue?.type || ""}
              onChange={(e) => {
                setselectedValue({
                  ...selectedValue,
                  type: e.target.value,
                });
              }}
            />
          </div>
          <div className=" px-6  mb-4">
            <label className="block mb-1" for="etat">
              Etat
            </label>
            <input
              className="w-full border rounded-md px-3 py-2"
              type="text"
              id="etat"
              placeholder="Etat"
              value={selectedValue?.etat || ""}
              onChange={(e) => {
                setselectedValue({
                  ...selectedValue,
                  etat: e.target.value,
                });
              }}
            />
          </div>
          <div className=" px-6  mb-4 flex flex-col">
            <label className="block mb-1" for="dateAchat">
              Date Achat
            </label>
            <DatePicker
              className="w-full border rounded-md px-3 py-2"
              date={achatDate}
              setDate={setAchatDate}
            />
          </div>
          <div className=" px-6  mb-4 flex flex-col">
            <label className="block mb-1" for="dateAffectation">
              Date Affectation
            </label>
            <DatePicker
              className="w-full border rounded-md px-3 py-2"
              date={affectationDate}
              setDate={setAffectationDate}
            />
          </div>
          <div className=" px-6  mb-4 flex flex-col w-full">
            <label className="block mb-1" for="userInfo">
              Users
            </label>
            <Dropdown
              comboBoxOpen={comboBoxOpen}
              data={usersData?.map(item => ({
                value: item.id.toString(),
                label: item.name
              })) || []}
              setComboBoxOpen={setComboBoxOpen}
              value={value}
              setValue={setValue}
            />
          </div>{" "}
          <div className=" px-6  mb-4">
            <label className="block mb-1" for="dispo">
              Dispo
            </label>
            <Switch
              id="dispo"
              checked={selectedValue?.dispo}
              onCheckedChange={(e) => {
                setselectedValue({
                  ...selectedValue,
                  dispo: e,
                });
              }}
            />
          </div>
          <div className="mt-4 px-6 flex justify-end">
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md">
              Submit
            </button>
          </div>
        </form>
      </Modal>
      <DataTable
        title={"Materiels"}
        filterCol="marqueEtRef"
        columns={materialColumns}
        data={data || []}
        setOpenModal={openModal}
        settypeOfSubmit={settypeOfSubmit}
        canAdd={true}
      />
    </div>
  );
};

export default Page;

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
      await api.delete("/materiel/" + selectedValue.id)
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


