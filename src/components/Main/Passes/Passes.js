import React, { useState , useEffect } from "react";
import "./Passes.scss";
import GenCard from "./genCard";
import "../Animation/anima.scss";
import Swal from "sweetalert2";
import malam from "../../../assets/malam.png";
import binat from "../../../assets/binat.png";
import TechInfo from "../../Modals/TechInfo/TechInfo";
import fetch from "node-fetch";

var inputOptions = new Promise(function (resolve) {
  resolve({
    netcom: "נטקום",
    binat: "בינת",
  });
});


export default function Passes({token , IsEditor}) {
  const [isTechInfoModalOpen, setIsTechInfoModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading , setLoading] = useState(false);
  useEffect(() => {
    (async () => {
      const res = await fetch(`http://localhost:80/luna/getTechs/${token}`,       
      {headers: {
          "Content-type": "application/json; charset=UTF-8", // Indicates the content
          "authorization" : "Bearer " + token
        }});
      const data = await res.json();
      let temp_arry = [];
      data.map((entity) => {
        let tempTech = {
        id: entity._id,
        name: entity.name,
        car:entity.car,
        carNum: entity.carNum,
        phoneNum: entity.phoneNum,
        numID: entity.numID,
        passCode: entity.passCode,
        passExpdays : entity.expired_in,
        imgUrl: entity.company === "netcom" ? malam : binat,
        };
        temp_arry.push(tempTech);
      });
      setPosts(temp_arry);
    })();
  }, []);

  const openTechInfoModal = (post) => {
    setIsTechInfoModalOpen(true);
    setSelectedTech(post);
  };


  const onTechDelete = (id) => {
    fetch(`http://localhost:80/luna/DeleteTech/${id}/${token}`, {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8", // Indicates the content
            "authorization" : "Bearer " + token
          },
        }).then((res) => res.json())
        
    setPosts(posts.filter((post) => post.id !== id));
    setIsTechInfoModalOpen(false);
    
  };

  const onTechUpdate = (techObj) => {
    const updatedPosts = posts.map((post) => {
      if (techObj.id !== post.id) return post;
      post.name = techObj.name;
      post.description = techObj.description;
      post.passCode = techObj.passCode;
      return post;
    });
    
    fetch(`http://localhost:80/luna/UpdateTech/${techObj.id}/${token}`, {
      method: "POST",
      body: JSON.stringify(techObj),
      headers: {
        "Content-type": "application/json; charset=UTF-8", // Indicates the content
        "authorization" : "Bearer " + token}
    })
      .then((res) =>setPosts(updatedPosts))
    
  };

const onTechAdding = () =>{
  if(IsEditor===true){
    Swal.mixin({
      validationMessage: "שדה זה הוא חובה",
      input: "text",
      inputAttributes: {
        required: true,
      },
      confirmButtonText: "הבא",
      customClass: "Swal-wide",
    })
      .queue([
        {
          title: "הוספת טכנאי",
          text: ":שם טכנאי",
        },
        {
          title: "הוספת טכנאי",
          text: ":מספר פלאפון",
        },
        {
          title: "הוספת טכנאי",
          text: ':מספר ת"ז',
        },
        {
          title: "הוספת טכנאי",
          text: ":סוג רכב וצבע",
        },
        {
          title: "הוספת טכנאי",
          text: ":מספר רכב",
        },
        {
          title: "הוספת טכנאי",
          input: "radio",
          inputOptions: inputOptions,
          inputValidator: function (result) {
            if(!result){
              return "נא לבחור באחת מן האפשרויות שצויינו"
            }
          },
        },
        {
          title: "הוספת טכנאי",
          text: ":אישור כניסה",
        },
      ])
      .then((result) => {
        if (result.value) {
          let newTech = {
            id:"",
            name: result.value[0],
            phoneNum: result.value[1],
            numID: result.value[2],
            car:result.value[3],
            carNum: result.value[4],
            imgUrl: result.value[5] ==="netcom" ? "netcom" : "binat",
            passCode: result.value[6],
            passExpdays :30
          };
          console.log("company is" + result.value[5])
          console.log(newTech.imgUrl)
          fetch(`http://localhost:80/luna/AddTech/${token}`, {
            method: "POST",
            body: JSON.stringify(newTech),
            headers: {
              "Content-type": "application/json; charset=UTF-8", // Indicates the content
            }
          })
            .then((res) => res.json())
            .then((json) => {
              newTech.id = json._id;//saving the database id has a parameter
  
            });
  
  
          newTech.imgUrl = result.value[5] ==="netcom" ? malam : binat;
          let tempArr = [...posts];
          tempArr.push(newTech);
          setPosts(tempArr);
          const answers = JSON.stringify(result.value);
          Swal.fire({
            icon: "success",
            title: "!הטכנאי הוסף בהצלחה",
            confirmButtonText: "סיים",
          });
        }
      })
  }
  else{
    Swal.fire({confirmButtonText: "אישור" , title:"למשתמש זה אין הרשאות עריכה" ,icon:"error"});
  }
};

const onTechSubmit = async (techObj) => {
  // update the tech
  await onTechUpdate(techObj);
  // loading started.
  setLoading(true);
  // close modal
  setIsTechInfoModalOpen(false);
  const res = await fetch(`http://localhost:80/luna/getTechs/${token}`,
  {headers: {
    "Content-type": "application/json; charset=UTF-8", // Indicates the content
    "authorization" : "Bearer " + token
  }});
  const data = await res.json();
  let temp_arry = [];
  data.map((entity) => {
    let tempTech = {
    id: entity._id,
    name: entity.name,
    car:entity.car,
    carNum: entity.carNum,
    phoneNum: entity.phoneNum,
    numID: entity.numID,
    passCode: entity.passCode,
    passExpdays : entity.expired_in,
    imgUrl: entity.company === "netcom" ? malam : binat,
    };
    temp_arry.push(tempTech);
  });
  setPosts(temp_arry);
  // stop loading
  setLoading(false);
};

  const badgeStyleFromExpiration = (days_left) => {
    // by the pass experation change the color , the value being fetch from the backend
    if((days_left < 20) && (days_left >=10 ))
      return 'badge-warning';
    else if (days_left<10)
    return 'badge-critical';
    else return 'badge';
  };

  return (
    <div className="Passes DropAnimation">
      <div className="CardHolder">
        {loading ? (
          <div>Loading...</div>
        ) : (
          posts.map((post, index) => (
            <div className="animationForAddCard">
              <div key={post.id} onClick={() => openTechInfoModal(post)}>
                <div style={{ position: 'relative' }}>
                  <div
                    className={[
                      'badge',
                      badgeStyleFromExpiration(post.passExpdays),
                    ].join(' ')}
                  >
                    {post.passExpdays }
                  </div>
                  <GenCard
                    key={index}
                    imgUrl={post.imgUrl}
                    title={post.name}
                    passCode={post.passCode}
                    company = {post.imgUrl === binat ? "בינת" : "נטקום"}//upsidedown couse hebrew
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {IsEditor&&(<div
        className="fab"
        onClick={onTechAdding}
      >
        {" "}
        +{" "}
      </div>)}

      {isTechInfoModalOpen && (
        <TechInfo
          onSave={onTechSubmit}
          onDelete={onTechDelete}
          onClose={() => setIsTechInfoModalOpen(false)}
          selectedTech={selectedTech}
          IsEditor = {IsEditor}
        />
      )}
    </div>
  );
}
