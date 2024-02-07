"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";

export const materialColumns = [
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
    cell: ({ row }) => <div className="lowercase">{row.getValue("type")}</div>,
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

            <DropdownMenuItem>Update this row</DropdownMenuItem>
            <DropdownMenuItem>Delete This row</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export const materialCols = (setOpen, open) => {};
