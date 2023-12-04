import React, { useState } from "react";
import Table from "../Table";
import { TableCategory } from "@/interfaces/category";
import { columnsCategories } from "@/utils/categories";
import EditCategoryPopUp from "./EditCategoryPopUp";
import { useSession } from "next-auth/react";
import AddCategoryPopUp from "./AddCategoryPopUp";

type Props = {
  categories: TableCategory[];
};

function AdminCategories({ categories: initialCategories }: Props) {
  const [categories, setCategories] =
    useState<TableCategory[]>(initialCategories);
  const { data: session } = useSession();

  const fetchUpdatedCategories = async () => {
    try {
      const response = await fetch(`/api/categories/admin`, {
        headers: {
          Authorization: `Bearer ${session?.user.token}`,
        },
      });
      if (response.ok) {
        const updatedCategories = await response.json();
        setCategories(updatedCategories);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <div className="mb-2">
        <AddCategoryPopUp onSave={fetchUpdatedCategories} />
      </div>
      <Table
        columns={columnsCategories}
        data={categories}
        renderActions={(rowData: TableCategory) => (
          <>
            <EditCategoryPopUp data={rowData} onSave={fetchUpdatedCategories} />
          </>
        )}
      />
    </>
  );
}

export default AdminCategories;
