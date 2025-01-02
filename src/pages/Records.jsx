import React, { useState, useEffect } from "react";
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
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Pagination,
  DatePicker
} from "@nextui-org/react";
import { get } from "../services/http";
import { handleDownload } from "../utils/file-download";
import { time } from "framer-motion";

const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "Category", uid: "category", sortable: true },
  { name: "Type", uid: "type", sortable: true },
  { name: "Date Time", uid: "timestamp", sortable: true },
  { name: "Image", uid: "imageUri" },
];

export default function Records() {
  const [filterValue, setFilterValue] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [factoryData, setFactoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState();
  const [pages, setPages] = useState();
  const [total, setTotal] = useState();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  // const [searchTimeout, setSearchTimeout] = useState(null);
  const [date, setDate] = useState();
  


  const rowsPerPageOptions = [
    { key: "5", value: 5 },
    { key: "10", value: 10 },
    { key: "15", value: 15 },
    { key: "20", value: 20 },
    { key: "25", value: 25 },
  ];

  const [sortDescriptor, setSortDescriptor] = useState({
    column: "id",
    direction: "ascending",
  });

  useEffect(() => {
    const fetchRecords = async () => {
      try {
        setLoading(true);
        const response = await get("/api/defects/page",{
          page: page,
          limit: rowsPerPage,
          // type : 
          search: filterValue,
          timestamp : date,
          

        });
        setFactoryData(response.defects);
        setPages(response.totalPages);
        setPage(response.currentPage);
        setTotal(response.total);
        
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch records:", error);
        setFactoryData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecords();
  }, [page ,filterValue,date,]);

  // Filter items based on search and category filter
  // const filteredItems = factoryData.filter((item) => {
  //   const matchesSearch =
  //     !filterValue ||
  //     Object.values(item).some((value) =>
  //       String(value).toLowerCase().includes(filterValue.toLowerCase())
  //     );

  //   const matchesCategory =
  //     statusFilter.size === 0 || statusFilter.has(item.category);

  //   return matchesSearch && matchesCategory;
  // });



  

  const renderCell = (item, columnKey) => {
    switch (columnKey) {
      case "category":
        return (
          <span
            className={`px-2 py-1 rounded-full text-sm font-medium
            ${
              item[columnKey] === "Warning"
                ? "bg-yellow-100 text-yellow-800"
                : ""
            }
            ${item[columnKey] === "Defect" ? "bg-red-100 text-red-800" : ""}`}
          >
            {item[columnKey]}
          </span>
        );
      case "imageUri":
        return (
          <div className="flex justify-center">
            <img
              src={import.meta.env.VITE_BACKEND_URL+"/"+item[columnKey]}
              alt="Preview"
              className="w-12 h-12 rounded object-cover shadow-sm hover:shadow-md transition-shadow duration-200 cursor-pointer"
              onClick={() => handleImageClick(item[columnKey])}
            />
          </div>
        );
      case "timestamp":
        return (
          <span className="font-mono text-sm">
            {new Date(item[columnKey]).toLocaleString()}
          </span>
        );
      default:
        return <span className="text-sm">{item[columnKey]}</span>;
    }
  };

  const handleImageClick = (imageUrl) => {
    setSelectedImage(imageUrl);
    onOpen();
  };


  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <div className="flex flex-col md:flex-row justify-between gap-4 items-center mb-6">
        <div className="w-full md:w-2/3 flex">
          <Input
            placeholder="Search records..."
            size="sm"
            value={filterValue}
            onValueChange={(value) => {
              setFilterValue(value);
              setPage(1);
            }}
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
          {/* <Dropdown>
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
          </Dropdown> */}
          <Dropdown>
            <DropdownTrigger>
              <Button
                size="lg"
                variant="flat"
                className="bg-blue-50  hover:bg-blue-100 transition-colors duration-200"
              >
                Export
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection={false}
              aria-label="Export"
            >
              <DropdownItem onPress={() => handleDownload("csv")} key="CSV" className="">
                CSV
              </DropdownItem>
              <DropdownItem onPress={() => handleDownload("pdf")} key="PDF" className="">
                PDF
              </DropdownItem>
            </DropdownMenu>
          </Dropdown>
          <DatePicker onChange={setDate} label="Date" size="sm" radius="md" />
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table
          aria-label="Data Table with Search and Filter"
          sortDescriptor={sortDescriptor}
          onSortChange={setSortDescriptor}
          className="min-w-full"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.uid}
                allowsSorting={column.sortable}
                align={column.uid === "imageUri" ? "center" : "start"}
                className="bg-gray-50 text-sm font-semibold text-gray-700 p-4"
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            items={factoryData}
            emptyContent={loading ? "Loading..." : "No records found"}
            loadingContent="Loading..."
            loadingState={loading ? "loading" : "idle"}
          >
            {(item) => (
              <TableRow
                key={item.id}
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
          {Math.min(page * rowsPerPage -1)} of{" "}
          {total} entries
        </p>
        <Pagination
          page={page}
          total={pages}
          onChange={setPage}
          className="flex gap-2 "
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
                    src={import.meta.env.VITE_BACKEND_URL+"/"+selectedImage}
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
