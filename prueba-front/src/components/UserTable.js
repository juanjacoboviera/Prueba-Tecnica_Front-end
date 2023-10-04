import React from "react";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Link } from "react-router-dom";

const UserTable = ({ usersList }) => {
  const actionBodyTemplate = (rowData) => {
    return (
      <Link to={`/user/${rowData.login}`}>
        <Button
          onClick={() => captureData(rowData)}
          type="button"
          icon="pi pi-eye"
          rounded
        ></Button>
      </Link>
    );
  };
  const captureData = (rowData) => {
    // 'event.originalEvent' contains the original browser event
    // 'event.data' contains the data of the clicked row
    console.log("Row Clicked!", rowData);
  };

  return (
    <section className="userTable-container">
      <DataTable value={usersList} tableStyle={{ minWidth: "50rem" }}>
        <Column field="login" header="User"></Column>
        <Column field="id" header="ID"></Column>
        <Column
          header="Ver perfil"
          headerStyle={{ width: "5rem", textAlign: "center" }}
          //   bodyStyle={{ textAlign: "center", overflow: "visible" }}
          body={actionBodyTemplate}
        />
      </DataTable>
    </section>
  );
};

export default UserTable;
