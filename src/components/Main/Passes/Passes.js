import React, { useState } from "react";
import "./Passes.scss";
import GenCard from "./genCard";
import "../Animation/anima.scss";
import Swal from "sweetalert2";
import { makeStyles } from "@material-ui/core/styles";

import malam from "../../../assets/malam.png";
import binat from "../../../assets/binat.png";
import TechInfo from "../../Modals/TechInfo/TechInfo";
var inputOptions = new Promise(function (resolve) {
  resolve({
    netcom: "נטקום",
    binat: "בינת",
  });
});

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
}));

export default function Passes() {
  const classes = useStyles();
  const [isTechInfoModalOpen, setIsTechInfoModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);
  const [posts, setPosts] = React.useState([]);

  const openTechInfoModal = (post) => {
    setIsTechInfoModalOpen(true);
    setSelectedTech(post);
  };

  // --- temp until DB is implemented.
  const onTechDelete = (id) => {
    setPosts(posts.filter((post) => post.id !== id));
    setIsTechInfoModalOpen(false);
  };

  const onTechUpdate = (techObj) => {
    const updatedPosts = posts.map((post) => {
      if (techObj.id !== post.id) return post;
      post.name = techObj.name;
      post.description = techObj.description;
      return post;
    });
    setPosts(updatedPosts);
  };

  React.useEffect(() => {
    // --- call to BE for data.
    setPosts([
      { id: 1, name: "sharon", description: "031246", imgUrl: malam },
      { id: 2, name: "sharon", description: "031245", imgUrl: binat },
    ]);
  }, []);

  return (
    <div className="Passes DropAnimation">
      <div className="CardHolder">
        {posts.map((post, index) => (
          <div
            key={post.id}
            onClick={() => openTechInfoModal(post)}
            className="animationForAddCard"
          >
            <div>
              <GenCard
                key={index}
                imgUrl={post.imgUrl}
                title={post.name}
                description={post.description}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        className="fab"
        onClick={() =>
          Swal.mixin({
            validationMessage: "שדה זה הוא חובה",
            input: "text",
            inputAttributes: {
              required: true,
            },
            confirmButtonText: "הבא",
            progressSteps: ["1", "2", "3", "4", "5", "6", "7"],
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
                  return new Promise(function (resolve, reject) {
                    if (result) {
                      resolve();
                    } else {
                      reject("נא לבחור חברת טכנאי");
                    }
                  });
                },
              },
              {
                title: "הוספת טכנאי",
                text: ":אישור כניסה",
              },
            ])
            .then((result) => {
              if (result.value) {
                let nameOfTech = result.value[0];
                let info = `${result.value[6]} :אישור כניסה`;
                let newTech = {
                  title: nameOfTech,
                  description: info,
                  imgUrl: result.value[5] === "נטקום" ? malam : binat,
                };
                let tempArr = [...posts];
                tempArr.push(newTech);
                setPosts(tempArr);
                const answers = JSON.stringify(result.value);
                Swal.fire({
                  icon: "success",
                  title: "!הטכנאי הוסף בהצלחה",
                  html: `
              :פרטי טכנאי
              <pre><code>${answers}</code></pre>
            `,
                  confirmButtonText: "סיים",
                });
              }
            })
        }
      >
        {" "}
        +{" "}
      </div>

      {isTechInfoModalOpen && (
        <TechInfo
          onSave={onTechUpdate}
          onDelete={onTechDelete}
          onClose={() => setIsTechInfoModalOpen(false)}
          selectedTech={selectedTech}
        />
      )}
    </div>
  );
}
