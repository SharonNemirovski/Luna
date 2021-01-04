import React, { useState } from 'react';
import './Passes.scss';
import GenCard from './genCard';
import '../Animation/anima.scss';
import Swal from 'sweetalert2';
import { makeStyles } from '@material-ui/core/styles';

import malam from '../../../assets/malam.png';
import binat from '../../../assets/binat.png';
import TechInfo from '../../Modals/TechInfo/TechInfo';
var inputOptions = new Promise(function (resolve) {
  resolve({
    netcom: 'נטקום',
    binat: 'בינת',
  });
});

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export default function Passes() {
  const classes = useStyles();
  const [isTechInfoModalOpen, setIsTechInfoModalOpen] = useState(false);
  const [selectedTech, setSelectedTech] = useState(null);
  const [loading, setLoading] = useState(false);
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
      post.passCode = techObj.passCode;
      return post;
    });
    setPosts(updatedPosts);
  };

  const onTechSubmit = async (techObj) => {
    // update the tech
    await onTechUpdate(techObj);
    // loading started.
    setLoading(true);
    // close modal
    setIsTechInfoModalOpen(false);
    // fetch the data for all Tech again.
    // stop loading
    setLoading(false);
  };

  React.useEffect(() => {
    // --- call to BE for data.
    setPosts([
      {
        id: 1,
        name: 'sharon',
        car: 'redmazda',
        carNum: '12345678',
        phoneNum: '0525826664',
        numID: '318672201',
        passCode: '20658020',

        imgUrl: malam,
      },
      {
        id: 1,
        name: 'sharon',
        car: 'redmazda',
        carNum: '12345678',
        phoneNum: '0525826664',
        numID: '318672201',
        passCode: '20658020',

        imgUrl: malam,
      },
      {
        id: 1,
        name: 'sharon',
        car: 'redmazda',
        carNum: '12345678',
        phoneNum: '0525826664',
        numID: '318672201',
        passCode: '20658020',

        imgUrl: malam,
      },
      {
        id: 1,
        name: 'sharon',
        car: 'redmazda',
        carNum: '12345678',
        phoneNum: '0525826664',
        numID: '318672201',
        passCode: '20658020',

        imgUrl: malam,
      },
      {
        id: 1,
        name: 'sharon',
        car: 'redmazda',
        carNum: '12345678',
        phoneNum: '0525826664',
        numID: '318672201',
        passCode: '20658020',

        imgUrl: malam,
      },
      {
        id: 1,
        name: 'sharon',
        car: 'redmazda',
        carNum: '12345678',
        phoneNum: '0525826664',
        numID: '318672201',
        passCode: '20658020',

        imgUrl: malam,
      },
      {
        id: 1,
        name: 'sharon',
        car: 'redmazda',
        carNum: '12345678',
        phoneNum: '0525826664',
        numID: '318672201',
        passCode: '20658020',

        imgUrl: malam,
      },
      {
        id: 1,
        name: 'sharon',
        car: 'redmazda',
        carNum: '12345678',
        phoneNum: '0525826664',
        numID: '318672201',
        passCode: '20658020',

        imgUrl: malam,
      },
      {
        id: 1,
        name: 'sharon',
        car: 'redmazda',
        carNum: '12345678',
        phoneNum: '0525826664',
        numID: '318672201',
        passCode: '20658020',

        imgUrl: malam,
      },
      {
        id: 2,
        name: 'sharon',
        car: 'redmazda',
        carNum: '12345678',
        phoneNum: '0525826664',
        numID: '318672201',
        passCode: '20658020',
        

        imgUrl: malam,
      },
    ]);
  }, []);

  const badgeStyleFromExpiration = (expiration) => {
    // logic to figure out how much time left.
    return 'badge-warning';
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
                      badgeStyleFromExpiration(post.expiration),
                    ].join(' ')}
                  >
                    30
                  </div>
                  <GenCard
                    key={index}
                    imgUrl={post.imgUrl}
                    title={post.name}
                    passCode={post.passCode}
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <div
        className="fab"
        onClick={() =>
          Swal.mixin({
            validationMessage: 'שדה זה הוא חובה',
            input: 'text',
            inputAttributes: {
              required: true,
            },
            confirmButtonText: 'הבא',
            progressSteps: ['1', '2', '3', '4', '5', '6', '7'],
            customClass: 'Swal-wide',
          })
            .queue([
              {
                title: 'הוספת טכנאי',
                text: ':שם טכנאי',
              },
              {
                title: 'הוספת טכנאי',
                text: ':מספר פלאפון',
              },
              {
                title: 'הוספת טכנאי',
                text: ':מספר ת"ז',
              },
              {
                title: 'הוספת טכנאי',
                text: ':סוג רכב וצבע',
              },
              {
                title: 'הוספת טכנאי',
                text: ':מספר רכב',
              },
              {
                title: 'הוספת טכנאי',
                input: 'radio',
                inputOptions: inputOptions,
                inputValidator: function (result) {
                  return new Promise(function (resolve, reject) {
                    if (result) {
                      resolve();
                    } else {
                      reject('נא לבחור חברת טכנאי');
                    }
                  });
                },
              },
              {
                title: 'הוספת טכנאי',
                text: ':אישור כניסה',
              },
            ])
            .then((result) => {
              if (result.value) {
                let nameOfTech = result.value[0];
                let info = `${result.value[6]} :אישור כניסה`;
                let newTech = {
                  title: nameOfTech,
                  description: info,
                  imgUrl: result.value[5] === 'נטקום' ? malam : binat,
                };
                let tempArr = [...posts];
                tempArr.push(newTech);
                setPosts(tempArr);
                const answers = JSON.stringify(result.value);
                Swal.fire({
                  icon: 'success',
                  title: '!הטכנאי הוסף בהצלחה',
                  html: `
              :פרטי טכנאי
              <pre><code>${answers}</code></pre>
            `,
                  confirmButtonText: 'סיים',
                });
              }
            })
        }
      >
        {' '}
        +{' '}
      </div>

      {isTechInfoModalOpen && (
        <TechInfo
          onSave={onTechSubmit}
          onDelete={onTechDelete}
          onClose={() => setIsTechInfoModalOpen(false)}
          selectedTech={selectedTech}
        />
      )}
    </div>
  );
}
