import React from 'react';
import './Passes.scss';
import GenCard from './genCard';
import '../Animation/anima.scss';
import Swal from 'sweetalert2';
import { makeStyles } from '@material-ui/core/styles';

import malam from '../../../assets/malam.png';
import binat from '../../../assets/binat.png';
import { FlareSharp } from '@material-ui/icons';
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

  const [posts, setPosts] = React.useState([
    { title: 'sharon', description: '031223', imgUrl: malam },
    { title: 'sharon', description: '031245', imgUrl: binat },
  ]);
  return (
    <div className="Passes DropAnimation">
      <div className="CardHolder">
        {posts.map((post, index) => (
          <div className="animationForAddCard">
            <div
              onClick={() => {
                Swal.fire({
                  allowOutsideClick: false,
                  title: post.title,
                  text: `${post.description}`,
                  confirmButtonText: 'סגור',
                  showDenyButton: true,
                  denyButtonText: 'מחק',
                  showCancelButton: 'true',
                  cancelButtonText: 'עריכה',
                  imageUrl: post.imgUrl,
                  imageWidth: 100,
                  imageHeight: 100,
                  imageAlt: 'Custom image',
                }).then((res) => {
                  if (res.isDenied) {
                    let tempArrDel = [...posts];
                    tempArrDel.splice(index, 1);
                    setPosts(tempArrDel);
                  }
                  //when u click to EDIT
                  if (res.isDismissed) {
                    console.log('lalala');
                    Swal.fire({
                      allowOutsideClick: false,
                      title: post.title,
                      text: `${post.description}`,
                      confirmButtonText: 'סגור',
                      showDenyButton: true,
                      denyButtonText: 'מחק',
                      showCancelButton: 'true',
                      cancelButtonText: 'עריכה',
                      imageUrl: post.imgUrl,
                      imageWidth: 100,
                      imageHeight: 100,
                      imageAlt: 'Custom image',
                    })
                    
                  }
                });
              }}
            >
              <GenCard
                key={index}
                imgUrl={post.imgUrl}
                title={post.title}
                description={post.description}
              />
            </div>
          </div>
        ))}
      </div>
      <div
        class="fab"
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
    </div>
  );
}
