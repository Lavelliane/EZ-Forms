import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { ChangeEvent, useState } from 'react';
import { Button } from '@/components/ui/button';
import { AiOutlinePlus } from 'react-icons/ai';


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    addEmptyRow: () => void;
}

export function DataTable<TData, TValue>({ columns, data, addEmptyRow}: DataTableProps<TData, TValue>) {

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    const renderTextarea = ({ cellValue, onChange }: { cellValue: unknown; onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void }) => {
        return (
            <Textarea
                className="resize-none h-10"
                placeholder={cellValue as string}
                onChange={onChange}
            />
        );
    };

    const renderCell = ({ cell }: { cell: any }) => {
        if (cell.id.includes('timeSlot') || cell.id.includes('activityName')) {
            return renderTextarea({
            cellValue: cell.getValue(),
            onChange: (event) => {
                },
            });
        } else {
            return flexRender(cell.column.columnDef.cell, cell.getContext())
        }
    };

    return (
        <div className='flex flex-col w-full gap-2 justify-center items-center'>
            <div className='rounded-md border w-full'>
                <Table>
                    <TableHeader className='bg-muted/80 '>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {renderCell({ cell })}
                                        </TableCell>
                                    ))}
                                </TableRow>
                                
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className='h-24 text-center'>
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className='flex'>
                    <Button
                        type='submit'
                        variant='ghost'
                        size='icon'
                        className='text-gray-400 hover:text-gray-400 transition-color  '
                        onClick={addEmptyRow}
                    >
                        <AiOutlinePlus />
                    </Button>
            </div>
        </div>
    );
}
