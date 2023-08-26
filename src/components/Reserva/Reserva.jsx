/** @format */

import React, { useState } from "react";
import "./Reserva.css";
import { TiTick } from "react-icons/ti";
import NavBar from "../NavBar/NavBar";
import { useForm } from "react-hook-form";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
initMercadoPago("APP_USR-e2f3a313-4a9d-4110-bd77-ad6c50675664");
import axios from "axios";

const datos = {
  title: "HotelMalaVista - Habitación 202",
  quantity: 1,
  unit_price: 100,
};

const Reserva = () => {
  const steps = ["Date 1", "Date 2", "Finsh"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [id, setId] = useState(null);



  currentStep === steps.length && id === null && axios.post("http://localhost:3001/payment/create-order", datos)
        .then(({ data }) => {
           console.log(data.id)
            setId(data.id)
        })
        .catch((error) => alert(error))

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      nombre: "",
      correo: "",

      country: "",
      archivo: "",
      aceptaTerminos: false,
    },
  });

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    } else {
      setComplete(true);
    }
  };
  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = handleSubmit((data) => {
    console.log(data);

    reset();
  });
  return (
    <>
      <NavBar />
      <div className="container">
        <h1>Reservation</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between">
            {steps?.map((step, i) => (
              <div
                key={i}
                className={`step-item ${currentStep === i + 1 && "active"} ${
                  (i + 1 < currentStep || complete) && "complete"
                } `}
              >
                <div className="step">
                  {i + 1 < currentStep || complete ? (
                    <TiTick size={24} />
                  ) : (
                    i + 1
                  )}
                </div>
                <p className="text-gray-500">{step}</p>
              </div>
            ))}
          </div>

          {currentStep === 1 && (
            <div className="rese">
              <label>First Name:</label>
              <input
                type="text"
                placeholder="Enter your First Name"
                name="nombre"
                {...register("nombre", {
                  required: {
                    value: true,
                    message: "First Name Required",
                  },
                  maxLength: 20,
                  minLength: 2,
                })}
              />
              {errors.nombre?.type === "required" && (
                <span>First Name requerid</span>
              )}
              {errors.nombre?.type === "maxLength" && (
                <span>Name must not be longer than 20 characters</span>
              )}
              {errors.nombre?.type === "minLength" && (
                <span>Name must be greater than 2 characters</span>
              )}

              <label>Last Name:</label>
              <input
                type="text"
                placeholder="Enter your Last Name"
                name="lastName"
                {...register("lastName", {
                  required: {
                    value: true,
                    message: "Last Name Required",
                  },
                  maxLength: 20,
                  minLength: 2,
                })}
              />
              {errors.lastName?.type === "required" && (
                <span>Last Name requerid</span>
              )}
              {errors.lastName?.type === "maxLength" && (
                <span>Name must not be longer than 20 characters</span>
              )}
              {errors.lastName?.type === "minLength" && (
                <span>Name must be greater than 2 characters</span>
              )}
              <label>Guest Number:</label>
              <input
                type="number"
                name="guest"
                placeholder="Enter your Guest Number"
                {...register("guest", {
                  required: {
                    value: true,
                    message: "Number Guest Required",
                  },
                  maxLength: 6,
                  minLength: 1,
                })}
              />
              {errors.guest?.type === "required" && (
                <span>Guest number required</span>
              )}
              {errors.guest?.type === "maxLength" && (
                <span>Guest number cannot exceed 6 characters</span>
              )}
              {errors.guest?.type === "minLength" && (
                <span>Guest number should have at least 1 character</span>
              )}
              <label>Email:</label>
              <input
                type="text"
                name="correo"
                placeholder="Enter your Email"
                {...register("correo", {
                  required: {
                    value: true,
                    message: "Mail is Required",
                  },
                  pattern: {
                    value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                    message: "Invalid Email",
                  },
                })}
              />
              {errors.correo && <span>{errors.correo.message}</span>}
            </div>
          )}

          {/* ########## INPUT 2 ############# */}

          {currentStep === 2 && (
            <div className="rese">
              <label>Address:</label>
              <input
                type="text"
                name="address"
                placeholder="Enter your address"
                {...register("address", {
                  required: {
                    value: true,
                    message: "Address Required",
                  },
                  maxLength: 20,
                  minLength: 2,
                })}
              />
              {errors.address?.type === "required" && (
                <span>Address requerid</span>
              )}
              {errors.address?.type === "maxLength" && (
                <span>Address must not be longer than 20 characters</span>
              )}
              {errors.address?.type === "minLength" && (
                <span>Address must be greater than 2 characters</span>
              )}
              <label>Country:</label>
              <input
                type="text"
                placeholder="Enter your address"
                {...register("country", {
                  required: true,
                  message: "Invalid Country",
                })}
              />
              {errors.country && <span>{errors.country.message}</span>}

              <label>Day of Arrival:</label>
              <input
                type="date"
                placeholder="Enter your Guest Number"
                {...register("dayArrival")}
              />
              <label>Schedule:</label>
              <input
                type="time"
                placeholder="Enter your Guest Number"
                {...register("time")}
              />
            </div>
          )}

          {/* ########## INPUT 3 ############ */}

          {currentStep === 3 && (
            <div className="rese">
              <label>City:</label>
              <input
                type="text"
                placeholder="Enter your City"
                {...register("city")}
              />
              <label>Postal Code:</label>
              <input
                type="number"
                placeholder="Enter your Postal Code"
                {...register("postalCode")}
              />
              <label>Phone:</label>
              <input
                type="tel"
                placeholder="Enter your Phone"
                {...register("phone")}
              />

              <div>
                <input
                  type="checkbox"
                  name="aceptaTerminos"
                  {...register("aceptaTerminos", {
                    required: {
                      value: true,
                      message: "Acepta los términos y condiciones",
                    },
                  })}
                />
                <label>Acepto los términos y condiciones</label>
                {errors.aceptaTerminos && (
                  <span>{errors.aceptaTerminos.message}</span>
                )}
              </div>
            </div>
          )}

          {/*################ Button ########################*/}
          {!complete && (
            <div className="rese">
              <button className="btn" type="button" onClick={handlePrevious}>
                Previous
              </button>

              <button type="submit">Enviar</button>
              {currentStep !== steps.length ? (
                <button
                  type="submit"
                  className="btn"
                  onClick={handleNext}
                  disabled={Object.keys(errors).length > 0}
                >
                  next
                </button>
              ) : (
                
               
                <div id="wallet_container"> 
                  <Wallet initialization={{ preferenceId: id }} /> 
                </div> 
              )}
            </div>
          )}
        </form>

        {/* #############################################################*/}
        <div className="content-card ">
          <h4>Review accommodation rules</h4>
          <p>
            The person who will receive you requests that you indicate that you
            accept the following accommodation rules:
          </p>
          <ul>
            <li>Parties and events are not allowed</li>
            <li>Rest hours are between 00:00 and 08:00</li>
          </ul>
          <h5>
            <strong>
              By continuing to the next step, you are accepting the rules of the
              accommodation.
            </strong>
          </h5>
        </div>
      </div>
    </>
  );
};
export default Reserva;
