import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const DisplayTable = ({ data, column }) => {
    const table = useReactTable({
      data,
      columns :column ,
      getCoreRowModel: getCoreRowModel(),
    });
  return (
    <div className="p-2">
      <table className="w-full">
        <thead className="bg-primary text-white ">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr className="rounded-t-2xl border" key={headerGroup.id}>
              <th>Sr.No</th>
              {headerGroup.headers.map((header) => (
                <th className="py-2" key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="">
          {table.getRowModel().rows.map((row, index) => (
            <tr key={row.id}>
              <td className="border text-center py-2">{index + 1}</td>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="border text-center py-2">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );};

export default DisplayTable;
