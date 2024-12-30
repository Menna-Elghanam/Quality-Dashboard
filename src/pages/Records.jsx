import React, { useState, useMemo, useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Pagination,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

const columns = [
  { name: "ID", uid: "ID", sortable: true },
  { name: "Category", uid: "Category", sortable: true },
  { name: "Type", uid: "Type", sortable: true },
  { name: "Date Time", uid: "DateTimestamp", sortable: true },
  { name: "Image", uid: "Image" },
];

const rowsPerPageOptions = [
  { key: "5", value: 5 },
  { key: "10", value: 10 },
  { key: "15", value: 15 },
  { key: "20", value: 20 },
  { key: "25", value: 25 },
];

export default function Records() {
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState(new Set());
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [factoryData, setFactoryData] = useState([]);

  const [sortDescriptor, setSortDescriptor] = useState({
    column: "ID",
    direction: "ascending",
  });

  useEffect(() => {

    const fetchRecords = async () => {

    };
    // const eventSource = new EventSource(import.meta.env.VITE_BACKEND_URL + "/api/stream");
    
    // eventSource.onmessage = (event) => {
    //   const newData = JSON.parse(event.data);
    //   setFactoryData(prevData => [...prevData, newData]);
    // };

    // eventSource.onerror = (error) => {
    //   console.error("EventSource failed:", error);
    //   eventSource.close();
    // };

    // return () => eventSource.close();
  }, []);

  const pages = Math.ceil(factoryData.length / rowsPerPage);
  const normalizeDate = (dateTime) => dateTime.split(" ")[0];

  const filteredItems = useMemo(() => {
    let filteredData = [...factoryData];

    if (filterValue) {
      const lowercasedValue = filterValue.toLowerCase();
      filteredData = filteredData.filter(
        (item) =>
          item.ID.toString().includes(lowercasedValue) ||
          item.Category.toLowerCase().includes(lowercasedValue) ||
          item.Type.toLowerCase().includes(lowercasedValue) ||
          item.DateTimestamp.toLowerCase().includes(lowercasedValue) ||
          normalizeDate(item.DateTimestamp).includes(lowercasedValue)
      );
    }

    if (statusFilter.size > 0) {
      filteredData = filteredData.filter((item) =>
        Array.from(statusFilter).includes(item.Category)
      );
    }

    return filteredData;
  }, [filterValue, statusFilter, factoryData]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, filteredItems]);

  const paginatedItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return sortedItems.slice(start, end);
  }, [page, rowsPerPage, sortedItems]);

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(Number(value));
    setPage(1);
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    onOpen();
  };

  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case "Category":
        return (
          <span
            className={`px-2 py-1 rounded-full text-sm font-medium
            ${item[columnKey] === "Warning" ? "bg-yellow-100 text-yellow-800" : ""}
            ${item[columnKey] === "Defect" ? "bg-red-100 text-red-800" : ""}`}
          >
            {item[columnKey]}
          </span>
        );
      case "Image":
        return (
          <div className="flex justify-center">
            <img
              src={item[columnKey]}
              alt="Preview"
              className="w-12 h-12 rounded object-cover shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => handleImageClick(item[columnKey])}
            />
          </div>
        );
      case "DateTimestamp":
        return <span className="font-mono text-sm">{item[columnKey]}</span>;
      default:
        return <span className="text-sm">{item[columnKey]}</span>;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center mb-6">
        <div className="w-full md:w-2/3">
          <Input
            placeholder="Search by ID, Category, Type, or Date..."
            size="sm"
            value={filterValue}
            onValueChange={setFilterValue}
            isClearable
            onClear={() => setFilterValue("")}
            className="w-full"
            startContent={
              <svg
                className="w-4 h-4 text-gray-400"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
            }
          />
        </div>

        <div className="flex gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button
                size="sm"
                variant="flat"
                className="bg-gray-50 text-gray-600 hover:bg-gray-100 transition-colors duration-200"
              >
                Rows Per Page : {rowsPerPage}
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              aria-label="Rows per page"
              onAction={(key) => handleRowsPerPageChange(key)}
            >
              {rowsPerPageOptions.map((option) => (
                <DropdownItem key={option.key}>
                  {option.value} rows
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>

          <Dropdown>
            <DropdownTrigger>
              <Button
                size="sm"
                variant="flat"
                className="bg-blue-50 text-blue-600 hover:bg-blue-100 transition-colors duration-200"
              >
                Filter by Category
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection={false}
              aria-label="Filter by Category"
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={(keys) => setStatusFilter(new Set(keys))}
            >
              <DropdownItem key="Warning" className="text-yellow-600">
                Warning
              </DropdownItem>
              <DropdownItem key="Defect" className="text-red-600">
                Defect
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table
          aria-label="Data Table with Search, Filter, and Pagination"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          className="min-w-full"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                allowsSorting={column.sortable}
                align={column.uid === "Image" ? "center" : "start"}
                className="bg-gray-50 text-sm font-semibold text-gray-700 p-4"
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={paginatedItems}>
            {(item) => (
              <TableRow
                key={item.ID}
                className="hover:bg-gray-50 transition-colors duration-150"
              >
                {(columnKey) => (
                  <TableCell className="p-4">
                    {renderCell(item, columnKey)}
                  </TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <p className="text-sm text-gray-600">
          Showing {(page - 1) * rowsPerPage + 1} to{" "}
          {Math.min(page * rowsPerPage, filteredItems.length)} of{" "}
          {filteredItems.length} entries
        </p>
        <Pagination
          page={page}
          total={pages}
          onChange={setPage}
          className="flex gap-2"
        />
      </div>
      
      <Modal isOpen={isOpen} onClose={onClose} size="2xl">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Defect Preview
              </ModalHeader>
              <ModalBody>
                <div className="flex justify-center">
                  <img
                    src={selectedImage}
                    alt="Full size preview"
                    className="max-w-full h-auto rounded-lg"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
