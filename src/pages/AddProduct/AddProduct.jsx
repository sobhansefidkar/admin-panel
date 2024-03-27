/** @format */

import { useEffect, useState } from "react";
import "./addproduct.scss";
import Icon from "react-icons-kit";
import { plus } from "react-icons-kit/fa/plus";
import { minus } from "react-icons-kit/fa/minus";
import { ColorPicker, useColor } from "react-color-palette";
import { SketchPicker } from "react-color";
import axios from "axios";
import Swal from "sweetalert2";

function AddProduct() {
  const [color, setColor] = useColor("red");
  const [addFeacher, setAddFeacher] = useState([""]);
  const [addImg, setAddImg] = useState([""]);
  const [addSpecification, setAddSpecification] = useState([
    { key: "", value: "" },
  ]);
  const [addCombination, setAddCombination] = useState([""]);
  const [addColor, setAddColor] = useState(["blue"]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [instruction, setInstruction] = useState("");
  const [cat, setCat] = useState("");
  const [price, setPrice] = useState("");
  const [discount, setDiscount] = useState(false);
  const [discountPercent, setDiscountPercent] = useState();

  // INCREASE INPUTS
  const handleFeatures = (D) => {
    if (D === "A") {
      setAddFeacher([...addFeacher, ""]);
    } else {
      if (addFeacher.length == 1) {
        setAddFeacher([addFeacher[0]]);
      } else {
        setAddFeacher(addFeacher.slice(0, -1));
      }
    }
  };
  const handleSpecification = (D) => {
    if (D === "A") {
      setAddSpecification([...addSpecification, { key: "", value: "" }]);
    } else {
      if (addSpecification.length == 1) {
        setAddSpecification([addSpecification[0]]);
      } else {
        setAddSpecification(addSpecification.slice(0, -1));
      }
    }
  };
  const handleColor = (D) => {
    if (D === "A") {
      setAddColor([...addColor, ""]);
    } else {
      if (addColor.length == 1) {
        setAddColor([addColor[0]]);
      } else {
        setAddColor(addColor.slice(0, -1));
      }
    }
  };
  const handleCombination = (D) => {
    if (D === "A") {
      setAddCombination([...addCombination, ""]);
    } else {
      if (addCombination.length == 1) {
        setAddCombination([addCombination[0]]);
      } else {
        const removeOne = addCombination.slice(0, -1);
        setAddCombination(removeOne);
      }
    }
  };
  const handleImg = (D) => {
    if (D === "A") {
      if(addImg.length >= 3){
        Swal.fire({
          title: "خطا",
          text: "شما مجاز به وارد کردن 3 عکس هستید",
          icon: "error",
          confirmButtonText: "باشه",
          timer : 3000
        })
      }else{
        setAddImg([...addImg, ""]);
      }
    } else {
      if (addImg.length == 1) {
        setAddImg([addImg[0]]);
      } else {
        setAddImg(addImg.slice(0, -1));
      }
    }
    console.log(D , addImg)
  }
  //////////////////////////////////////

  // CHANGE FEACHERS INPUTS
  const handleChangeFeacher = (i, v) => {
    addFeacher.map((item) => {
      addFeacher[i] = v;
    });
  };
  ///////////////////////////////////////

  // CHANGE SPECIFICATIONS VALUES
  const handleChangeSpecification = (i, v, T) => {
    if (T == "K") {
      addSpecification.map((item) => {
        addSpecification[i].key = v;
      });
    } else {
      addSpecification.map((item) => {
        addSpecification[i].value = v;
      });
    }
  };
  ///////////////////////////////////////

  // CHANGE COLORS INPUTS
  const handleChangeColor = (i, v) => {
    addColor.map((item) => {
      addColor[i] = v;
    });
  };
  //////////////////////////////////////

  //CHANGE COMBINATION INPUTS
  const handleChangeCombination = (i, v) => {
    addCombination.map((item) => {
      addCombination[i] = v;
    });
  };
  //////////////////////////////////////
  // SUBMIT
  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      title == "" ||
      desc == "" ||
      instruction == "" ||
      cat == "" ||
      price == ""
    ) {
      return Swal.fire({
        title: "خطا",
        text: "مطمعن شوید که فیلد های ستاره دار (عنوان , توضیحات , دسته بندی , طریقه استفاده و قیمت) را پر کرده اید",
        icon: "error",
        confirmButtonText: "باشه",
      });
    }
    let PD = {
      title,
      desc,
      img : addImg,
      features: addFeacher,
      specification: addSpecification,
      instruction,
      combination: addCombination,
      cat,
      color: addColor,
      discount,
      discountPercent,
      price,
    };
    axios
      .post("http://localhost:3000/api/addProduct", PD)
      .then((res) => {
        if (res.data.code == 11000) {
          Swal.fire({
            title: "خطا",
            text: "قبلا محصولی با این عنوان ثبت شده است. عنوانی دیگر انتخاب کنید",
            icon: "error",
            confirmButtonText: "باشه",
          });
        } else {
          Swal.fire({
            title: res.data == "success" ? "موفق" : "خطا",
            text:
              res.data == "success"
                ? "با موفقیت ثبت گردید"
                : "مشکل در ثبت اطلاعات",
            icon: res.data == "success" ? "success" : "error",
            confirmButtonText: "باشه",
          });
        }
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  };
  const handleChangeImg = async (e , i) => {
    const file = e.target.files[0]
    const base64 = await covertToBase64(file)
    addImg.map((item) => {
      addImg[i] = base64
    })
  }
  //////////////////////////////////////
  return (
    <div className='addproduct'>
      <h1>افزودن محصول</h1>
      <div className='container'>
        <form action=''>
          <div className='item'>
            <span>عنوان : </span>
            <span style={{ color: "red" }}>*</span>
            <input
              type='text'
              placeholder='رژلب L549 سیاه'
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className='item'>
            <span>توضیحات : </span>
            <span style={{ color: "red" }}>*</span>
            <input
              style={{ width: "95%" }}
              type='text'
              placeholder='رژلب'
              onChange={(e) => setDesc(e.target.value)}
              required
            />
          </div>
          <div className='item'>
            <span>عکس ها</span>
            {addImg.map((item ,i) => {
              return(
              <div key={i} className='images'>
                <input type='file' onChange={e => handleChangeImg(e , i)}/>
              </div>
              )})}
            <span className='addinput m' onClick={() => handleImg("M")}>
              <Icon icon={minus}></Icon>
            </span>
            <span className='addinput' onClick={() => handleImg("A")}>
              <Icon icon={plus}></Icon>
            </span>
          </div>
          <div className='item'>
            <span>ویژگی ها : </span>
            {addFeacher.map((item, i) => {
              return (
                <div key={i}>
                  <input
                    type='text'
                    placeholder='رژلب'
                    onChange={(e) => handleChangeFeacher(i, e.target.value)}
                  />
                </div>
              );
            })}
            <span className='addinput m' onClick={() => handleFeatures("M")}>
              <Icon icon={minus}></Icon>
            </span>
            <span className='addinput' onClick={() => handleFeatures("A")}>
              <Icon icon={plus}></Icon>
            </span>
          </div>
          <div className='item'>
            <span>خصوصیات : </span>
            {addSpecification.map((item, i) => {
              return (
                <div key={i}>
                  <input
                    type='text'
                    placeholder='وزن'
                    onChange={(e) =>
                      handleChangeSpecification(i, e.target.value, "K")
                    }
                  />
                  <input
                    type='text'
                    placeholder='250گرم'
                    onChange={(e) =>
                      handleChangeSpecification(i, e.target.value, "V")
                    }
                  />
                </div>
              );
            })}
            <span
              className='addinput m'
              onClick={() => handleSpecification("M")}>
              <Icon icon={minus}></Icon>
            </span>
            <span className='addinput' onClick={() => handleSpecification("A")}>
              <Icon icon={plus}></Icon>
            </span>
          </div>
          <div className='item'>
            <span>طریقه استفاده : </span>
            <span style={{ color: "red" }}>*</span>
            <input
              type='text'
              placeholder='روزی 1 بار'
              onChange={(e) => setInstruction(e.target.value)}
              required
            />
          </div>
          <div className='item'>
            <span>ترکیبات : </span>
            {addCombination.map((item, i) => {
              return (
                <div key={i}>
                  <input
                    type='text'
                    placeholder='اسید ستریک'
                    onChange={(e) => handleChangeCombination(i, e.target.value)}
                  />
                </div>
              );
            })}
            <span className='addinput m' onClick={() => handleCombination("M")}>
              <Icon icon={minus}></Icon>
            </span>
            <span className='addinput' onClick={() => handleCombination("A")}>
              <Icon icon={plus}></Icon>
            </span>
          </div>
          <div className='item'>
            <span>دسته بندی : </span>
            <span style={{ color: "red" }}>*</span>
            <input
              type='text'
              placeholder='رژلب'
              onChange={(e) => setCat(e.target.value)}
              required
            />
          </div>
          <div className='item' style={{ display: "flex" }}>
            <div>
              <span>رنگ : </span>
              {addColor.map((item, i) => {
                return (
                  <div key={i}>
                    <input
                      type='text'
                      placeholder='قرمز'
                      onChange={(e) => handleChangeColor(i, e.target.value)}
                    />
                  </div>
                );
              })}
              <span className='addinput m' onClick={() => handleColor("M")}>
                <Icon icon={minus}></Icon>
              </span>
              <span className='addinput' onClick={() => handleColor("A")}>
                <Icon icon={plus}></Icon>
              </span>
            </div>
            <SketchPicker color={color} onChange={(e) => setColor(e.hex)} />
          </div>
          <div className='item'>
            <span>تخفیف : </span>
            <input
              type='checkbox'
              placeholder='رژلب'
              onChange={() => setDiscount(!discount)}
            />
          </div>
          {discount && (
            <div className='item'>
              <span>درصد تخفیف : </span>
              <input
                style={{ width: "30px" }}
                type='number'
                placeholder='20'
                onChange={(e) =>
                  setDiscountPercent(discount ? e.target.value : 0)
                }
              />
            </div>
          )}
          <div className='item'>
            <span>قیمت : </span>
            <span style={{ color: "red" }}>*</span>
            <input
              type='number'
              placeholder='200000'
              onChange={(e) => setPrice(e.target.value)}
              required
            />
          </div>
          <button onClick={handleSubmit}>افزودن</button>
        </form>
      </div>
    </div>
  );
}

export default AddProduct;


function covertToBase64 (file) {
  return new Promise((resolve , reject) => {
    const fileReader = new FileReader()
    fileReader.readAsDataURL(file)
    fileReader.onload = () => {
      resolve(fileReader.result)
    }
    fileReader.onerror = (error) => {
      reject(error)
    }
  })
}