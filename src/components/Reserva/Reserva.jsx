/** @format */

import React, { useState, useEffect } from "react";
import "./Reserva.css";
import { TiTick } from "react-icons/ti";

import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import Loader from "../Loader/Loader";
import { initMercadoPago, Wallet } from "@mercadopago/sdk-react";
initMercadoPago("APP_USR-e2f3a313-4a9d-4110-bd77-ad6c50675664");
import { FaStar } from "react-icons/fa";

import InfoUser from "../../components/InfoUser/InfoUser";
import {
  updateStep1,
  updateStep2,
  updateStep3,
  resetSteps,
} from "../../redux/reservaSlice";
import StepDataInfo from "./SetDataInfo";
import Swal from "sweetalert2";
import axiosInstance from "../../utils/axiosInstance";
import { readCookieSession } from "../../services";

const Reserva = () => {
  const [isLoading, setIsLoading] = useState(false);
  const steps = ["Date 1", "Date 2", "Finsh"];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [id, setId] = useState(null);
  const [userId, setUserId] = useState("");
  const [removeLoader, setRemoveLoader] = useState(false);

  useEffect(() => {
    const cookie = readCookieSession()
    if (cookie) {
      const {User_id} = cookie
      setUserId(User_id)
    }
  }, [])

  const step1Data = useSelector((state) => state.reserva.step1);
  const step2Data = useSelector((state) => state.reserva.step2);
  const step3Data = useSelector((state) => state.reserva.step3);
  // console.log(step1Data)
  // console.log(step2Data)
  // console.log(step3Data)

  //   const hotelDetail = useSelector((state) => state.reserva.hotelDetail);
  //  console.log(hotelDetail)
  // Dispatch para actualizar datos en el storeil

  const hotelDetail = useSelector((state) => state.hotels.hotelDetail);
  const typeRoomDetail = useSelector((state) => state.hotels.typeRoomDetail);
  console.log("hoteldetail", hotelDetail);

  const dispatch = useDispatch();

  // Funciones para actualizar datos en el store
  const updateStep1Data = (data) => {
    dispatch(updateStep1(data));
  };

  const updateStep2Data = (data) => {
    dispatch(updateStep2(data));
  };

  const updateStep3Data = (data) => {
    dispatch(updateStep3(data));
  };

  if (step3Data.aceptaTerminos) {
    const datos = {
      User_id: step1Data.User_id,
      Hotel_id: step2Data.Hotel_id,
      RoomType_id: step2Data.RoomType_id,
      quantity: step2Data.quantity,
      checkIn: step2Data.checkIn,
      checkOut: step2Data.checkOut,
    };
    console.log("datos", datos);
    id === null &&
      axiosInstance
        .post("/payment/create-order", datos)
        .then(({ data }) => {
          console.log(data.id);
          setId(data.id);
          setRemoveLoader(true);
        })
        .catch((error) => {
          console.error("Error making the request:", error);

          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "An error occurred while making the request",
            footer: '<a href="">Why do I have this issue?</a>',
          });
        });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset,
  } = useForm({
    defaultValues: {
      User_id: "64e8277eef72051c7494bca0",
      Hotel_id: hotelDetail._id,
      RoomType_id: "",
      firstName: "",
      lastName: "",
      correo: "",
      guest: "",
      country: "",
      address: "",
      checkIn: "",
      checkOut: "",
      time: "",
      city: "",
      quantity: 1,
      postalCode: "",
      phone: "",
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
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    reset();
  });

  return (
    <>
      <div className="container">
        {/* Nueva tarjeta de hotel en el lado izquierdo */}
        <h1>Reservation</h1>
        <div className="contenedor">
          <div className="hotel-card">
            <div className="carousel-container">
              <div key={id}>
                {/* className="carousel" */}
                <img
                  // className={styles.cardImage}
                  src={hotelDetail?.image?.[0]?.src}
                  alt="hotel image"
                />

                {/* {hotelData.map((d) => (
              <img
                key={d.id}
                className="hotel-image"
                src={d.img}
                alt={`Imagen de `}
              />
            ))} */}
              </div>
            </div>

            <div className="hotel-details">
              <h1 className="hotel-location">{hotelDetail?.name}</h1>
              <p className="hotel-location">
                {hotelDetail?.state}, {hotelDetail?.country}
              </p>
              <p className="hotel-location">{hotelDetail?.address}</p>

              <div className="star">
                {Array.from({ length: hotelDetail?.category }, (_, index) => (
                  <FaStar key={index} />
                ))}
              </div>

              <div className="hotel-description">
                <h5>Enjoy {hotelDetail?.services}</h5>
                <h5>
                  <strong>Type room:</strong> {typeRoomDetail?.name}
                </h5>
              </div>

              <p className="hotel-price">{typeRoomDetail?.price}</p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex justify-between ">
              {steps?.map((step, i) => (
                <div
                  key={i}
                  className={`step-item ${currentStep === i + 1 && "active"} ${(i + 1 < currentStep || complete) && "complete"
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
                  {i > 0 && <div className="step-divider"></div>}
                </div>
              ))}
            </div>

            {currentStep === 1 && (
              <div className="rese">
                <label>First Name:</label>
                <input
                  type="text"
                  placeholder="Enter your First Name"
                  name="firstName"
                  {...register("firstName", {
                    required: {
                      value: true,
                      message: "First Name Required",
                    },
                    maxLength: 20,
                    minLength: 2,
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message:
                        "First Name should only contain letters and spaces",
                    },
                  })}
                />
                {errors.firstName?.type === "required" && (
                  <span>First Name requerid</span>
                )}
                {errors.firstName?.type === "maxLength" && (
                  <span>Name must not be longer than 20 characters</span>
                )}
                {errors.firstName?.type === "minLength" && (
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
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message:
                        "Last Name should only contain letters and spaces",
                    },
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

                <label>Guest Number:</label>
                <input
                  type="number"
                  placeholder="Enter your Guest Number"
                  {...register("guest", {
                    required: "Guest number is required",
                    min: {
                      value: 1,
                      message: "Guest should be a number between 1 and 6",
                    },
                    max: {
                      value: 6,
                      message: "Guest should be a number between 1 and 6",
                    },
                    pattern: {
                      value: /^[1-6]$/, // Expresión regular para números del 1 al 6
                      message: "Guest should be a number between 1 and 6",
                    },
                  })}
                />
                {errors.guest && <span>{errors.guest.message}</span>}
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
                    required: {
                      value: true,
                      message: "Requires a Country",
                    },
                    pattern: {
                      value: /^[a-zA-Z\s]+$/,
                      message: "Country should only contain letters and spaces",
                    },
                  })}
                />
                {errors.country && <span>{errors.country.message}</span>}

                <label>checkIn:</label>
                <input
                  type="date"
                  {...register("checkIn", {
                    required: {
                      value: true,
                      message: "Date of checkIn is required",
                    },
                    validate: (value) => {
                      const checkIn = new Date(value);
                      const dayNow = new Date();
                      return checkIn > dayNow || "Date must be in the future";
                    },
                  })}
                  min={new Date().toISOString().split("T")[0]} // Establece el atributo min al día actual
                />
                {errors.checkIn && <span>{errors.checkIn.message}</span>}

                <label>checkOut:</label>
                <input
                  type="date"
                  {...register("checkOut", {
                    required: {
                      value: true,
                      message: "Date of checkOut is required",
                    },
                    validate: (value) => {
                      const checkOut = new Date(value);
                      const dayNow = new Date();
                      return checkOut > dayNow || "Date must be in the future";
                    },
                  })}
                  min={new Date().toISOString().split("T")[0]} // Establece el atributo min al día actual
                />
                {errors.checkOut && <span>{errors.checkOut.message}</span>}

                <label>Schedule:</label>
                <input
                  type="time"
                  placeholder="Enter your Guest Number"
                  {...register("time", {
                    required: "Schedule is required",
                    pattern: {
                      value: /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/, // Expresión regular para formato HH:MM
                      message: "Invalid time format (HH:MM)",
                    },
                  })}
                />
                {errors.time && <span>{errors.time.message}</span>}
              </div>
            )}

            {/* ########## INPUT 3 ############ */}

            {currentStep === 3 && (
              <div className="rese">
                <label>City:</label>
                <input
                  type="text"
                  placeholder="Enter your City"
                  {...register("city", {
                    required: "City is required",
                    pattern: {
                      value: /^[a-zA-Z\s]*$/, // Expresión regular para letras y espacios
                      message: "City should only contain letters and spaces",
                    },
                  })}
                />

                {errors.city && <span>{errors.city.message}</span>}
                <label>Postal Code:</label>
                <input
                  type="number"
                  placeholder="Enter your Postal Code"
                  {...register("postalCode", {
                    required: "Postal Code is required",
                    pattern: {
                      value: /^\d{4}(-\d{4})?$/, // Expresión regular para códigos postales en formato XXXXX o XXXXX-XXXX
                      message: "Invalid Postal Code format",
                    },
                  })}
                />
                {errors.postalCode && <span>{errors.postalCode.message}</span>}

                <label>Phone:</label>
                <input
                  type="tel"
                  placeholder="Enter your Phone"
                  {...register("phone", {
                    required: "Phone number is required",
                  })}
                />
                {errors.phone && <span>{errors.phone.message}</span>}

                <div>
                  <input
                    type="checkbox"
                    name="aceptaTerminos"
                    {...register("aceptaTerminos", {
                      required: {
                        value: true,
                        message: "Accept the terms and conditions",
                      },
                    })}
                  />
                  <label>Accept the terms and conditions</label>
                  {errors.aceptaTerminos && (
                    <span>{errors.aceptaTerminos.message}</span>
                  )}
                </div>
              </div>
            )}

            {/*################ Button ########################*/}
            {!complete && (
              <div className="btnRese">
                {currentStep > 1 && (
                  <button
                    className="btn"
                    type="button"
                    onClick={() => {
                      handlePrevious();
                      if (currentStep === 2) {
                        updateStep1Data({
                          firstName: watch("firstName"),
                          lastName: watch("lastName"),
                          correo: watch("correo"),
                          guest: watch("guest"),
                        });
                      } else if (currentStep === 3) {
                        updateStep2Data({
                          address: watch("address"),
                          country: watch("country"),
                          checkIn: watch("checkIn"),
                          checkOut: watch("checkOut"),
                          time: watch("time"),
                        });
                      }
                    }}
                  >
                    Back
                  </button>
                )}

                {currentStep < steps.length ? (
                  <button
                    type="submit"
                    className="btn"
                    onClick={() => {
                      handleNext();
                      if (currentStep === 1) {
                        updateStep1Data({
                          firstName: watch("firstName"),
                          lastName: watch("lastName"),
                          guest: watch("guest"),
                          correo: watch("correo"),
                        });
                      } else if (currentStep === 2) {
                        updateStep2Data({
                          Hotel_id: hotelDetail._id,

                          address: watch("address"),
                          country: watch("country"),
                          checkIn: watch("checkIn"),
                          checkOut: watch("checkOut"),
                          time: watch("time"),
                        });
                      }
                    }}
                    disabled={Object.keys(errors).length > 0}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="btn"
                    onClick={() => {
                      setCurrentStep(currentStep + 1);
                      updateStep3Data({
                        city: watch("city"),
                        postalCode: watch("postalCode"),
                        phone: watch("phone"),
                        aceptaTerminos: watch("aceptaTerminos"),
                      });
                      // Here, set 'complete' to true to indicate the form is complete
                      setComplete(true);
                    }}
                    disabled={Object.keys(errors).length > 0}
                  >
                    Next
                  </button>
                )}
              </div>
            )}

            {complete && (
              <div id="wallet_container">
                <Wallet initialization={{ preferenceId: id }} />

                {isLoading && <Loader />}
              </div>
            )}
          </form>
          <div className="dataInfo">

            <StepDataInfo />
          </div>
        </div>

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
      <div className="info">
        <InfoUser />
      </div>
    </>
  );
};
export default Reserva;
