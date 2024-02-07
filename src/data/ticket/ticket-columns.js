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

export const ticketColumns = [
  {
    accessorKey: "id",
    header: "Id",
    cell: ({ row }) => <div className="capitalize">{row.getValue("id")}</div>,
  },
  {
    accessorKey: "ref",
    header: "Ref",
    cell: ({ row }) => <div className="capitalize">{row.getValue("ref")}</div>,
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
    header: () => <div className="text-right">Etat</div>,
    cell: ({ row }) => {
      const amount = row.getValue("etat");

      return <div className="text-right font-medium">{amount}</div>;
    },
  },
  {
    accessorKey: "dispo",
    header: () => <div className="text-right">Dispo</div>,
    cell: ({ row }) => {
      const amount = row.getValue("dispo");

      return <div className="text-right font-medium">{amount}</div>;
    },
  },
  {
    accessorKey: "dateAchat",
    header: () => <div className="text-right">Date achat</div>,
    cell: ({ row }) => {
      const dateAchat = parseFloat(row.getValue("dateAchat"));

      return <div className="text-right font-medium">{dateAchat}</div>;
    },
  },
  {
    accessorKey: "dateAffectation",
    header: () => <div className="text-right">Date affectation</div>,
    cell: ({ row }) => {
      const dateAffectation = parseFloat(row.getValue("dateAffectation"));

      return <div className="text-right font-medium">{dateAffectation}</div>;
    },
  },
  {
    accessorKey: "user",
    header: () => <div className="text-right">User </div>,
    cell: ({ row }) => {
      const user = row.getValue("user");

      return <div className="text-right font-medium">{user}</div>;
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
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Check items this row
            </DropdownMenuItem>
            <DropdownMenuItem>Update this row</DropdownMenuItem>
            <DropdownMenuItem>Delete This row</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
