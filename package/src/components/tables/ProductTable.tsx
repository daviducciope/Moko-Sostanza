import { Badge, Dropdown, Progress } from "flowbite-react";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { Icon } from "@iconify/react";
import { Table } from "flowbite-react";

import product1 from "/src/assets/images/products/dash-prd-1.jpg";
import product2 from "/src/assets/images/products/dash-prd-2.jpg";
import product3 from "/src/assets/images/products/dash-prd-3.jpg";
import product4 from "/src/assets/images/products/dash-prd-4.jpg";

const ProductTable = () => {
  const ProductTableData = [
    {
      img: product1,
      name: "iPhone 13 pro max-Pacific Blue-128GB storage",
      payment: "$180",
      paymentstatus: "Partially paid",
      process: 45,
      processcolor: "bg-warning",
      statuscolor: "secondary",
      statustext: "Confirmed",
    },
    {
      img: product2,
      name: "Apple MacBook Pro 13 inch-M1-8/256GB-space",
      payment: "$120",
      paymentstatus: "Full paid",
      process: 100,
      processcolor: "bg-success",
      statuscolor: "success",
      statustext: "Confirmed",
    },
    {
      img: product3,
      name: "PlayStation 5 DualSense Wireless Controller",
      payment: "$120",
      paymentstatus: "Cancelled",
      process: 100,
      processcolor: "bg-error",
      statuscolor: "error",
      statustext: "Cancelled",
    },
    {
      img: product4,
      name: "Amazon Basics Mesh, Mid-Back, Swivel Office",
      payment: "$120",
      paymentstatus: "Partially paid",
      process: 45,
      processcolor: "bg-warning",
      statuscolor: "secondary",
      statustext: "Confirmed",
    },
  ];

  /*Table Action*/
  const tableActionData = [
    {
      icon: "solar:add-circle-outline",
      listtitle: "Add",
    },
    {
      icon: "solar:pen-new-square-broken",
      listtitle: "Edit",
    },
    {
      icon: "solar:trash-bin-minimalistic-outline",
      listtitle: "Delete",
    },
  ];

  return (
    <>
      <div className="rounded-xl dark:shadow-dark-md shadow-md bg-white dark:bg-darkgray p-4 sm:p-6 relative w-full break-words">
        <h5 className="card-title mb-4">Table</h5>
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full align-middle">
            <div className="overflow-hidden">
              <Table hoverable>
                <Table.Head>
                  <Table.HeadCell className="p-4">Products</Table.HeadCell>
                  <Table.HeadCell className="hidden sm:table-cell">
                    Payment
                  </Table.HeadCell>
                  <Table.HeadCell className="hidden md:table-cell">
                    Status
                  </Table.HeadCell>
                  <Table.HeadCell className="w-10"></Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y divide-border dark:divide-darkborder">
                  {ProductTableData.map((item, index) => (
                    <Table.Row key={index} className="bg-white dark:bg-darkgray">
                      <Table.Cell className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-medium text-gray-900 dark:text-white">
                              {item.name}
                            </p>
                            <p className="truncate text-sm text-gray-500 sm:hidden">
                              {item.payment} - {item.statustext}
                            </p>
                          </div>
                        </div>
                      </Table.Cell>
                      <Table.Cell className="hidden sm:table-cell">
                        <p className="text-sm">{item.payment}</p>
                      </Table.Cell>
                      <Table.Cell className="hidden md:table-cell">
                        <Badge
                          color={`light${item.statuscolor}`}
                          className={`text-${item.statuscolor}`}
                        >
                          {item.statustext}
                        </Badge>
                      </Table.Cell>
                      <Table.Cell>
                        <Dropdown
                          label=""
                          dismissOnClick={false}
                          renderTrigger={() => (
                            <span className="h-9 w-9 flex justify-center items-center rounded-full hover:bg-lightprimary hover:text-primary cursor-pointer">
                              <HiOutlineDotsVertical size={22} />
                            </span>
                          )}
                        >
                          {tableActionData.map((items, index) => (
                            <Dropdown.Item key={index} className="flex gap-3">
                              {" "}
                              <Icon icon={`${items.icon}`} height={18} />
                              <span>{items.listtitle}</span>
                            </Dropdown.Item>
                          ))}
                        </Dropdown>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export { ProductTable };
