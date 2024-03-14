import { Table, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import DataTableBody from "./DataTableBody";

const DataTable = () => {
    return (
        <div className="border rounded-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[50px] "></TableHead>
                        <TableHead className="text-center border-x">
                            Current
                        </TableHead>
                        <TableHead className="text-center">Best</TableHead>
                    </TableRow>
                </TableHeader>
                <DataTableBody />
            </Table>
        </div>
    );
};

export default DataTable;
