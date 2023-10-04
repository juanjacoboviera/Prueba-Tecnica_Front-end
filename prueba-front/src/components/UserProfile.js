import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({});
  let { name } = useParams();
  const header = (
    <img
      className="card-image"
      alt="Card"
      src={userData.avatar_url}
      width="200px"
    />
  );

  const footer = (
    <div className="flex flex-wrap justify-content-end gap-2">
      <Button
        onClick={() => navigate("/")}
        label="Volver"
        icon="pi pi-arrow-left"
      />
    </div>
  );

  useEffect(() => {
    const getUser = async () => {
      const url = `https://api.github.com/users/${name}`;
      const res = await fetch(url);
      const data = await res.json();
      setUserData(data);
    };
    getUser();
  }, [name]);
  console.log(userData);
  return (
    <main>
      <Card
        className="card-container text-center"
        header={header}
        footer={footer}
        title={userData.name}
        subTitle={userData.bio ? userData.bio : "No user bio avalaible"}
      >
        <div className="cardBody-container">
          <div className="cardInfo-container">
            <i className="pi pi-folder-open" style={{ color: "#6366F1" }}></i>
            <p className="text-center">
              {" "}
              Repositorios <br /> {userData.public_repos}
            </p>
          </div>
          <div className="cardInfo-container">
            <i className="pi pi-users" style={{ color: "#6366F1" }}></i>
            <p className="text-center">
              {" "}
              Seguidores <br /> {userData.followers}
            </p>
            <p></p>
          </div>
          <div className="cardInfo-container">
            <i className="pi pi-user" style={{ color: "#6366F1" }}></i>
            <p className="text-center">
              Siguiendo <br /> {userData.following}
            </p>
          </div>
        </div>
      </Card>
    </main>
  );
};

export default UserProfile;
