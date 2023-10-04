import React, { useState, useEffect } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useForm, Controller } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux/es/hooks/useSelector";
import {
  getUserData,
  captureInputData,
  resetState,
} from "../store/slices/usersSlice";
import { getUsersList } from "../store/slices/usersSlice";
import { Toolbar } from "primereact/toolbar";

const SearchUser = () => {
  const userInfo = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const handleRegistration = (data) => {
    dispatch(captureInputData(data.name));
  };
  const handleError = (errors) => {
    console.log(errors);
  };

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    if (userInfo.inputField) {
      dispatch(getUsersList(userInfo.inputField));
    }
  }, [userInfo.inputField]);

  const rules = {
    name: {
      required: "El usuario es requerido.",
      minLength: {
        value: 4,
        message: "El usuario debe tener como minimo 4 caracteres.",
      },
      pattern: {
        value: /^(?!iseijasunow$).*/,
        message: "Esta palabra está restringida.",
      },
    },
  };

  const leftToolbarTemplate = () => {
    return (
      <>
        <form
          className="search-container"
          onSubmit={handleSubmit(handleRegistration, handleError)}
        >
          <div className="input-container">
            <Controller
              name="name"
              control={control}
              defaultValue=""
              rules={rules.name}
              render={({ field }) => (
                <InputText {...field} placeholder="nombre del usuario" />
              )}
            />
            <small className="text-danger">
              {errors?.name && errors.name.message}
            </small>
          </div>
          <Button className="search-btn">Buscar</Button>
        </form>
      </>
    );
  };

  const rightToolbarTemplate = () => {
    return (
      <Button
        type="button"
        icon="pi pi-filter-slash"
        label="Limpiar"
        outlined
        onClick={() => {
          dispatch(resetState(captureInputData));
          reset();
        }}
      />
    );
  };

  return (
    <>
      <Toolbar left={leftToolbarTemplate} right={rightToolbarTemplate} />
    </>
  );
};

export default SearchUser;
