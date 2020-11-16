// clock canvas
let canvas = document.querySelector('canvas');
let ctx = canvas.getContext('2d');
let pointStart = canvas.height / 2;
  // move the start point of canvas (0;0) to the centre of it
ctx.translate(pointStart,pointStart);
  // rewrite the var radius for draw clock
let radius = pointStart * 0.9;

setInterval(drawClock, 1000);

  // draw clock from the centre of canvas
  function drawClock() {
    // add circle with border
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0 , Math.PI * 2);
      // add border
    ctx.strokeStyle = "#ffff00";
    ctx.lineWidth = radius*0.2;
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // add point in the centre of clock
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.07, 0, 2 * Math.PI);
    ctx.fillStyle = '#666666';
    ctx.fill();

    drawNumbers();
    drawClockHands();
  }

  // draw numbers
  function drawNumbers() {
    let ang;
    let num;
    ctx.font = radius * 0.15 + "px arial";
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    for(num = 1; num < 13; num++){
      ang = num * Math.PI / 6;
      ctx.rotate(ang);
      ctx.translate(0, -radius * 0.85);
      ctx.rotate(-ang);
      ctx.fillText(num.toString(), 0, 0);
      ctx.rotate(ang);
      ctx.translate(0, radius * 0.85);
      ctx.rotate(-ang);
    }
  }

  // draw clock hands
  function drawClockHands() {
    //  get hour, minute, second
    let now = new Date();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let second = now.getSeconds();
    

    // calculate the angle of the hour hand and draw it: length 50% of radius, width 7% of radius
    hour = hour % 12;
    hour = (hour*Math.PI/6)+(minute*Math.PI/(6*60))+(second*Math.PI/(360*60));
    drawHand(ctx, hour, radius*0.5, radius*0.07);

    // calculate the angle of the minute hand and draw it: length 80% of radius, width 7% of radius
    minute = (minute*Math.PI/30)+(second*Math.PI/(30*60));
    drawHand(ctx, minute, radius*0.8, radius*0.07);

    // calculate the angle of the second hand and draw it: length 90% of radius, width 2% of radius
    second = (second*Math.PI/30);
    drawHand(ctx, second, radius*0.9, radius*0.02);

    function drawHand(ctx, pos, length, width) {
      ctx.beginPath();
      ctx.lineWidth = width;
      ctx.lineCap = "round";
      ctx.moveTo(0,0);
      ctx.rotate(pos);
      ctx.lineTo(0, -length);
      ctx.strokeStyle = "#666666";
      ctx.stroke();
      ctx.rotate(-pos);
    }
  }

  // -----------------***---------------------
  // random fox img
  let imgContainer = document.getElementById('img');
  let xhr = new XMLHttpRequest();

  setInterval(addFoxImg, 1000);
  
  function addFoxImg() {
    
    // declare vars
   
    let date = new Date();
    let second = date.getSeconds();
    
    // check the time
    if(second % 10 === 0) {  
      // open request
      xhr.open('GET', 'https://randomfox.ca/floof/', true);

      xhr.onload = function() {
        if (this.status == 200) {
          // insert the link
          let data = JSON.parse(this.response);
          imgContainer.innerHTML = `
          <img height="50%" width="50%" src="${data.image}" alt="fox">
          `;
        } else if (this.status == 404) {
          console.log('Not found');
        }
      };
  
      xhr.send(); 
    };
  };
  

  


    
    


  