<<<<<<< HEAD
import React from 'react'

export default function Passes() {
  return (
    <div>
      Passes
    </div>
  )
=======
import React from 'react';
import './Passes.scss';
import GenCard from './genCard';
import '../Animation/anima.scss';
import Swal from 'sweetalert2';
import { makeStyles } from '@material-ui/core/styles';

import malam from '../../../assets/malam.png';
import binat from '../../../assets/binat.png';

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
    { title: 'sharon', description: '031245', imgUrl: malam },
    { title: 'sharon', description: '031245', imgUrl: binat },
    { title: 'sharon', description: '031245', imgUrl: malam },
    { title: 'sharon', description: '031245', imgUrl: malam },
    { title: 'sharon', description: '031245', imgUrl: malam },
    { title: 'sharon', description: '031245', imgUrl: malam },
    { title: 'sharon', description: '031245', imgUrl: malam },
    { title: 'sharon', description: '031245', imgUrl: malam },
  ]);
  return (
    <div className="Passes DropAnimation">
      <div className="CardHolder">
        {posts.map((post, index) => (
          <div
            className="animationForAddCard"
            onClick={() => {
              Swal.fire({
                title: post.title,
                text: `${post.description}`,
                confirmButtonText: 'סגור',
                showDenyButton: true,
                denyButtonText: 'מחק',
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
        ))}
      </div>
      <div
        class="fab"
        onClick={() =>
          Swal.mixin({
            input: 'text',
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
                text: '(נטקום או בינת) :חברה',
              },
              {
                title: 'הוספת טכנאי',
                text: ':אישור כניסה',
              },
            ])
            .then((result) => {
              if (result.value) {
                let nameOfTech = result.value[0];
                let info = `אישור כניסה:${result.value[7]}`;
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
>>>>>>> 0d92ecc5ba5669332628ce2cf29488b9542ec64a
}
