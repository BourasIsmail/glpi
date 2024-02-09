"use client"
import React from 'react'
import { api, getCounter, getUsers } from "@/api";
import { useQuery } from "@tanstack/react-query";
import Card from "@/components/card";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdDevices } from "react-icons/md";
import { TbDevicesCog } from "react-icons/tb";

const Counter = () => {
    const { data, refetch } = useQuery({
        queryKey: ['counter'],
        queryFn: getCounter(),
    });
    return (

        <div className="flex flex-row justify-between">
            <Card
                name="Materiels Affecté"
                count={data?.countNonDispo || 0}
                svg={<MdDevices className="w-8 h-8" />}
            />
            <Card
                name="Materiels disponible"
                count={data?.countDispo || 0}
                svg={<TbDevicesCog className="w-8 h-8" />}
            />
            <Card
                name="Ticket non traité"
                count={data?.countNonTraite || 0}
                svg={<IoPricetagsOutline className="w-8 h-8" />}
            />
        </div>
    )
}

export default Counter