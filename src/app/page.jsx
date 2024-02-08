import Card from "@/components/card";
import MaterialTable from "@/components/material";
import TicketTable from "@/components/tickets";
import { IoPricetagsOutline } from "react-icons/io5";
import { MdDevices } from "react-icons/md";
import { TbDevicesCog } from "react-icons/tb";

const page = () => {
  return (
    <div className="p-6">
      <div className="flex flex-row justify-between">
        <Card
          name="Materiels Affecté"
          count="5000"
          svg={<MdDevices className="w-8 h-8" />}
        />
        <Card
          name="Materiels disponible"
          count="4582"
          svg={<TbDevicesCog className="w-8 h-8" />}
        />
        <Card
          name="Ticket non traité"
          count="456895"
          svg={<IoPricetagsOutline className="w-8 h-8" />}
        />
      </div>
      <div>
        <TicketTable />
        <MaterialTable />
      </div>
    </div>
  );
};

export default page;
