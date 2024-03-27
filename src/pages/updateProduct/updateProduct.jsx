/** @format */
import { useEffect, useState } from "react";
import "./updateproduct.scss";
import axios from "axios";
import { useParams } from "react-router-dom";
import Icon from "react-icons-kit";
import { minus } from "react-icons-kit/fa/minus";
import { plus } from "react-icons-kit/fa/plus";
import { SketchPicker } from "react-color";
import Swal from "sweetalert2";

function UpdateProduct() {
  const { id } = useParams();
  const [pallet, setPallet] = useState("red");
  const [data, setData] = useState({});
  const [title, setTilte] = useState("");
  const [desc, setDesc] = useState("");
  const [img, setImg] = useState([""]);
  const [features, setFeatures] = useState([""]);
  const [specification, setSpecification] = useState([
    { key: "" },
    { value: "" },
  ]);
  const [instruction, setInstruction] = useState("");
  const [combination, setCombination] = useState([""]);
  const [cat, setCat] = useState("");
  const [color, setColor] = useState([""]);
  const [discount, setDiscount] = useState(false);
  const [discountPercent, setDiscountPercent] = useState();
  const [price, setPrice] = useState();
  const [instock, setInstock] = useState(true);
  useEffect(() => {
    axios
      .get(`http://localhost:3000/api/getProduct/${id}`)
      .then((res) => {
        const { data } = res;
        setData(data);
        setTilte(data.title);
        setDesc(data.desc);
        setImg(data.img);
        setFeatures(data.features);
        setSpecification(data.specification);
        setInstruction(data.instruction);
        setCombination(data.combination);
        setCat(data.cat);
        setColor(data.color);
        setDiscount(data.discount);
        setDiscountPercent(data.discountPercent);
        setPrice(data.price);
        setInstock(data.instock);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      title,
      desc,
      img,
      features,
      specification,
      instruction,
      combination,
      cat,
      color,
      discount,
      discountPercent,
      price,
      instock,
    };
    // console.log(data)
//برادر خانم پسر برادر زن دایی
    axios.put(`http://localhost:3000/api/updateProduct/${id}`, data)
      .then((res) => {
        if (res.data == "successfull") {
          Swal.fire({
            title: "موفق",
            text: "با موفقیت بروزرسانی شد.",
            icon: "success",
            confirmButtonText: "باشه",
            timer: 3000,
          });
        } else {
          Swal.fire({
            title: "خطا",
            text: "مطمعن شوید که فیلد های ستاره دار (عنوان , توضیحات , دسته بندی , طریقه استفاده و قیمت) را پر شده باشد",
            icon: "error",
            confirmButtonText: "باشه",
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          title: "خطا",
          text: "مشکلی در ثبت اطلاعات به وجود آمده",
          icon: "error",
          confirmButtonText: "باشه",
          timer: 3000,
        });
      });
  };

  const handleFeacher = (D) => {
    if (D === "A") {
      setFeatures([...features, ""]);
    } else {
      if (features.length == 1) {
        setFeatures([features[0]]);
      } else {
        setFeatures(features.slice(0, -1));
      }
    }
  };
  const handleSpecification = (D) => {
    if (D === "A") {
      setSpecification([...specification, { key: "", value: "" }]);
    } else {
      if (specification.length == 1) {
        setSpecification([specification[0]]);
      } else {
        setSpecification(specification.slice(0, -1));
      }
    }
  };
  const handleCombination = (D) => {
    if (D === "A") {
      setCombination([...combination, ""]);
    } else {
      if (combination.length == 1) {
        setCombination([combination[0]]);
      } else {
        const removeOne = combination.slice(0, -1);
        setCombination(removeOne);
      }
    }
  };
  const handleColor = (D) => {
    if (D === "A") {
      setColor([...color, ""]);
    } else {
      if (color.length == 1) {
        setColor([color[0]]);
      } else {
        setColor(color.slice(0, -1));
      }
    }
  };
  const handleImg = (D) => {
    if (D === "A") {
      if(img.length >= 3){
        Swal.fire({
          title: "خطا",
          text: "شما مجاز به وارد کردن 3 عکس هستید",
          icon: "error",
          confirmButtonText: "باشه",
          timer : 3000
        })  
      }else{
        setImg([...img , ""])
      }
    } else {
      if (img.length == 1) {
        setImg([img[0]]);
      } else {
        setImg(img.slice(0, -1));
      }
    }
  }
  ////////////////////////
  const handleChangeFeature = (i, v) => {
    features.map((item) => {
      features[i] = v;
    });
  };
  const handleChangeSpecification = (i, v, T) => {
    if (T == "K") {
      specification.map((item) => {
        specification[i].key = v;
      });
    } else {
      specification.map((item) => {
        specification[i].value = v;
      });
    }
  };
  const handleChangeCombination = (i, v) => {
    combination.map((item) => {
      combination[i] = v;
    });
  };
  const handleChangeColor = (i, v) => {
    color.map((item) => {
      color[i] = v;
    });
  };
  const handleChangeDiscount = () => {
    if (discount == true) {
      setDiscount(false);
      setDiscountPercent(0);
    } else {
      setDiscount(true);
    }
  };
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     console.log(features)
  //   }, 1000);

  //   return () => clearInterval(timer)
  // })
  const handleChangeImg = async (e , i) => {
    const file = e.target.files[0]
    const base64 = await covertToBase64(file)
    img.map((item) => {
      img[i] = base64
    })
  }
  return (
    <div className='updateproduct'>
      <div className='container'>
        <form action=''>
          <div>
            <span>عنوان : </span>
            <span className='necessary'>*</span>
            <input
              type='text'
              value={title}
              onChange={(e) => setTilte(e.target.value)}
            />
          </div>
          <div>
            <span>توضیحات : </span>
            <span className='necessary'>*</span>
            <input
              type='text'
              style={{ width: "100%" }}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
          <div>
            <span>عکس ها : </span>
            {img.map((item , i) => {
              return (
                <div key={i}>
                  <input type='file' onChange={e => handleChangeImg(e , i)}/>
                </div>
              );
            })}
            <span className='addinput m' onClick={() => handleImg("M")}>
              <Icon style={{ color: "white" }} icon={minus}></Icon>
            </span>
            <span className='addinput' onClick={() => handleImg("A")}>
              <Icon style={{ color: "white" }} icon={plus}></Icon>
            </span>
          </div>
          <div>
            <span>ویژگی : </span>
            {features.map((item, i) => {
              return (
                <div key={i}>
                  <input
                    type='text'
                    placeholder={item}
                    onChange={(e) => handleChangeFeature(i, e.target.value)}
                  />
                </div>
              );
            })}
            <span className='addinput m' onClick={() => handleFeacher("M")}>
              <Icon style={{ color: "white" }} icon={minus}></Icon>
            </span>
            <span className='addinput' onClick={() => handleFeacher("A")}>
              <Icon style={{ color: "white" }} icon={plus}></Icon>
            </span>
          </div>
          <div>
            <span>خصوصیت : </span>
            {specification.map((item, i) => {
              return (
                <div key={i}>
                  <input
                    type='text'
                    placeholder={item.key}
                    onChange={(e) =>
                      handleChangeSpecification(i, e.target.value, "K")
                    }
                  />
                  <input
                    type='text'
                    placeholder={item.value}
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
              <Icon style={{ color: "white" }} icon={minus}></Icon>
            </span>
            <span className='addinput' onClick={() => handleSpecification("A")}>
              <Icon style={{ color: "white" }} icon={plus}></Icon>
            </span>
          </div>
          <div>
            <span>دستوالعمل : </span>
            <span className='necessary'>*</span>
            <div>
              <input
                type='text'
                style={{ width: "90%" }}
                placeholder={instruction}
                onChange={(e) => setInstruction(e.target.value)}
              />
            </div>
          </div>
          <div>
            <span>ترکیبات : </span>
            {combination.map((item, i) => {
              return (
                <div key={i}>
                  <input
                    type='text'
                    placeholder={item}
                    onChange={(e) => handleChangeCombination(i, e.target.value)}
                  />
                </div>
              );
            })}
            <span className='addinput m' onClick={() => handleCombination("M")}>
              <Icon style={{ color: "white" }} icon={minus}></Icon>
            </span>
            <span className='addinput' onClick={() => handleCombination("A")}>
              <Icon style={{ color: "white" }} icon={plus}></Icon>
            </span>
          </div>
          <div>
            <span>دسته بندی : </span>
            <span className='necessary'>*</span>
            <div>
              <input
                type='text'
                placeholder={cat}
                onChange={(e) => setCat(e.target.value)}
              />
            </div>
          </div>
          <div style={{ display: "flex" }}>
            <div>
              <span>رنگ : </span>
              {color.map((item, i) => {
                return (
                  <div key={i}>
                    <input
                      type='text'
                      placeholder={item}
                      onChange={(e) => handleChangeColor(i, e.target.value)}
                    />
                  </div>
                );
              })}
              <span className='addinput m' onClick={() => handleColor("M")}>
                <Icon style={{ color: "white" }} icon={minus}></Icon>
              </span>
              <span className='addinput' onClick={() => handleColor("A")}>
                <Icon style={{ color: "white" }} icon={plus}></Icon>
              </span>
            </div>
            <SketchPicker
              className='m-zero'
              color={pallet}
              onChange={(e) => setPallet(e.hex)}
            />
          </div>
          <div>
            <span>تخفیف :</span>
            <input
              type='checkbox'
              checked={discount}
              onChange={handleChangeDiscount}
            />
          </div>
          <div>
            {discount && (
              <>
                <span>درصد تخفیف : </span>
                <input
                  style={{ width: "30px" }}
                  type='number'
                  placeholder={discountPercent}
                  onChange={(e) =>
                    discount
                      ? setDiscountPercent(e.target.value)
                      : setDiscountPercent(0)
                  }
                />
              </>
            )}
          </div>
          <div>
            <span>قیمت : </span>
            <span className='necessary'>*</span>
            <input
              type='number'
              placeholder={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div>
            <span>موجود در انبار : </span>
            <input
              type='checkbox'
              checked={instock}
              onChange={() => setInstock(!instock)}
            />
          </div>
          <button className='submitbtn' onClick={handleSubmit}>
            بروزرسانی
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateProduct;


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