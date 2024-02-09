import MaterialTable from "@/components/material";
import TicketTable from "@/components/tickets";
import Counter from "@/components/counter";
const Page = () => {

  return (
    <div className="p-6">
      <Counter />
      <div>
        <TicketTable />
        <MaterialTable />
      </div>
    </div>
  );
};

export default Page;
