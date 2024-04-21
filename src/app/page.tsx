import Table from "@/components/table.component";
import Image from "next/image";
import Vehicle from "./vehicle/page";
import Upload from "./upload/page";

export default function Home() {

  const dataTab1: any[] = [
    { Name: 'Lindsay Walton', Title: 'Front-end Developper', Email: 'lindsay.walton@example.com', Role: 'Member' },
    { Name: 'Courtney Henry', Title: 'Designer', Email: 'courtney.henry@example.com', Role: 'Admin' },
    { Name: 'Tom Cook', Title: 'Director of product', Email: 'tom.cook@example.com', Role: 'Member' },
    { Name: 'Withney Francis', Title: 'Copywriter', Email: 'withney.francis@example.com', Role: 'Admin' },
  ];

  const dataTab2: any[] = [
    { Ville: 'Levallois-perret', Surface: 2.41, Habitants: '68 009' },
    { Ville: 'Villeurbanne', Surface: 14.52, Habitants: '156 928' },
    { Ville: 'Nancy', Surface: 15.01, Habitants: '104 260' },
    { Ville: 'Nantes', Surface: 65.19, Habitants: '323 204' },
  ];

  return (
    <main className="p-12">
      <div className="grid grid-cols-2 gap-8">
        <div className="col-span-full">
          <Upload />
        </div>
        <div>
          <Table title="Employee Table" data={dataTab1} />
        </div>
        <div>
          <Table title="City Table" data={dataTab2} />
        </div>
        <div className="col-span-full">
          <Vehicle />
        </div>
      </div>
    </main>
  );
}
