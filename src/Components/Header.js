import React from 'react'
require('./styles.css')
module.exports = React.createClass({
componentDidMount(){
    this.draw21(),
    this.picture(),
    this.drawSmile(),
    this.bezier(),
    this.path2d(),
    this.radgrad(),
    this.image()
  },

draw21(id) {
  var canvas = this.refs.canvas
  if (canvas.getContext){
    var context = canvas.getContext('2d');
    context.fillRect(0, 0, 100, 100);
    //实践表明在不设施strokeStyle下的默认strokeStyle=black
    context.strokeRect(120, 0, 100, 100);

    //设置纯色
    context.fillStyle = "red";
    context.strokeStyle = "blue";
    context.fillRect(0, 120, 100, 100);
    context.strokeRect(120, 120, 100, 100);

    //设置透明度实践证明透明度值>0,<1值越低，越透明，值>=1时为纯色，值<=0时为完全透明
    context.fillStyle = "rgba(255,0,0,0.2)";
    context.strokeStyle = "rgba(255,0,0,0.2)";
    context.fillRect(240,0 , 100, 100);
    context.strokeRect(240, 120, 100, 100);

    context.fillStyle = "#3da8f5";
    context.strokeStyle = "rgba(0,0,0,1)";
    context.fillRect(25,25,100,100);
    context.clearRect(45,45,60,60);
    context.strokeRect(50,50,50,50);

    context.fillStyle = "black";
    context.beginPath();
    context.moveTo(100,50);
    context.lineTo(125,75);
    context.lineTo(125,25);
    context.fill();


} else {
   alert("不支持html5");
}

},
picture () {
  var takePicture = this.refs.takePicture,
      showPicture = this.refs.showPicture

  if (takePicture && showPicture) {
      // Set events
      takePicture.onchange = function (event) {
          // Get a reference to the taken picture or chosen file
          var files = event.target.files,
              file;
          if (files && files.length > 0) {
              file = files[0];
              try {
                    var fileReader = new FileReader();
                    fileReader.onload = function (event) {
                        showPicture.src = event.target.result;
                    };
                    fileReader.readAsDataURL(file);
                }
                catch (e) {
                    try {
                        // Fallback if createObjectURL is not supported
                        var fileReader = new FileReader();
                        fileReader.onload = function (event) {
                            showPicture.src = event.target.result;
                        };
                        fileReader.readAsDataURL(file);
                    }
                    catch (e) {
                        //
                        var error = document.querySelector("#error");
                        if (error) {
                            error.innerHTML = "Neither createObjectURL or FileReader are supported";
                        }
                    }
                }
            }
        };
    }
},
drawSmile(){
  var canvas = this.refs.smile
  if(canvas.getContext){
    var context = canvas.getContext('2d')
    // context.fillStyle = "pink";
    // context.beginPath();
    // context.arc(150,75,50,0,Math.PI*2,true); // 绘制
    // context.moveTo(185,75);
    // context.arc(150,75,35,0,Math.PI,false);   // 口(顺时针)
    // // context.fill()
    // context.moveTo(135,65);
    // context.arc(130,65,5,0,Math.PI*2,true);  // 左眼
    // context.moveTo(175,65);
    context.arc(170,65,20,0,Math.PI*0.5,false);  // 右眼
    context.stroke();

    // context.beginPath();
    // context.moveTo(25,25);
    // context.lineTo(105,25);
    // context.lineTo(25,105);
    // context.fill();
    // context.beginPath();
    // context.moveTo(105,105);
    // context.lineTo(105,25);
    // context.moveTo(105,105);
    // context.lineTo(25,105);
    // context.lineTo(125,125);


    for(var i=0;i<4;i++){
      for(var j=0;j<3;j++){
        context.beginPath();
        var x              = 25+j*50;               // x 坐标值
        var y              = 25+i*50;               // y 坐标值
        var radius         = 20;                    // 圆弧半径
        var startAngle     = 0;                     // 开始点
        var endAngle       = Math.PI+(Math.PI*j)/2; // 结束点
        var anticlockwise  = i%2==0 ? false : true; // 顺时针或逆时针

        context.arc(x, y, radius, startAngle, endAngle, anticlockwise);

        if (i>1){
          context.fill();
        } else {
          context.stroke();
        }
      }
    }
  }
},
bezier(){
  var canvas = this.refs.bezier
if(canvas.getContext){
  var context = canvas.getContext('2d')
  context.beginPath();
  context.moveTo(75,40);
  context.bezierCurveTo(75,37,70,25,50,25);
  context.bezierCurveTo(20,25,20,62.5,20,62.5);
  context.bezierCurveTo(20,80,40,102,75,120);
  context.bezierCurveTo(110,102,130,80,130,62.5);
  context.bezierCurveTo(130,62.5,130,25,100,25);
  context.bezierCurveTo(85,25,75,37,75,40);
  context.fill();
  context.stroke();
}else{
  alert("不支持html5");
}
},
path2d(){
  var canvas = this.refs.path2d
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d')
  //   var rectangle = new Path2D();
  //   rectangle.rect(10, 10, 50, 50);

  //   var circle = new Path2D();
  //   circle.moveTo(125, 35);
  //   circle.arc(100, 35, 25, 0, 2 * Math.PI);

  //   ctx.stroke(rectangle);
  //   ctx.fill(circle);
  // ctx.fillStyle = 'rgb(255,221,0)';
  // ctx.fillRect(0,0,150,37.5);
  // ctx.fillStyle = 'rgb(102,204,0)';
  // ctx.fillRect(0,37.5,150,37.5);
  // ctx.fillStyle = 'rgb(0,153,255)';
  // ctx.fillRect(0,75,150,37.5);
  // ctx.fillStyle = 'rgb(255,51,0)';
  // ctx.fillRect(0,112.5,150,37.5);
  // for (var i=0;i<10;i++){
  //   ctx.fillStyle = 'rgba(255,255,255,'+(i+1)/10+')';
  //   for (var j=0;j<4;j++){
  //     ctx.fillRect(5+i*14,5+j*37.5,14,27.5)
  //   }
  // }
var offset = 0;

function draw() {
  ctx.clearRect(0,0, canvas.width, canvas.height);
  ctx.setLineDash([8, 8]);
  ctx.lineDashOffset = -offset;
  ctx.strokeRect(10,10, 100, 100);
}

function march() {
  offset++;
  if (offset > 36) {
    offset = 0;
  }
  draw();
  setTimeout(march, 200);
}
march()
  }else{
    alert("不支持html5");
  }
},
radgrad(){
  var canvas = this.refs.radgrad
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d')
  // // 创建渐变
  // var radgrad = ctx.createRadialGradient(45,45,10,52,50,30);
  // radgrad.addColorStop(0, '#A7D30C');
  // radgrad.addColorStop(0.9, '#019F62');
  // radgrad.addColorStop(1, 'rgba(1,159,98,0)');

  // var radgrad2 = ctx.createRadialGradient(105,105,20,112,120,50);
  // radgrad2.addColorStop(0, '#FF5F98');
  // radgrad2.addColorStop(0.75, '#FF0188');
  // radgrad2.addColorStop(1, 'rgba(255,1,136,0)');

  // var radgrad3 = ctx.createRadialGradient(95,15,15,102,20,40);
  // radgrad3.addColorStop(0, '#00C9FF');
  // radgrad3.addColorStop(0.8, '#00B5E2');
  // radgrad3.addColorStop(1, 'rgba(0,201,255,0)');

  // var radgrad4 = ctx.createRadialGradient(0,150,50,0,140,90);
  // radgrad4.addColorStop(0, '#F4F201');
  // radgrad4.addColorStop(0.8, '#E4C700');
  // radgrad4.addColorStop(1, 'rgba(228,199,0,0)');

  // // 画图形
  // ctx.fillStyle = radgrad4;
  // ctx.fillRect(0,0,150,150);
  // ctx.fillStyle = radgrad3;
  // ctx.fillRect(0,0,150,150);
  // ctx.fillStyle = radgrad2;
  // ctx.fillRect(0,0,150,150);
  // ctx.fillStyle = radgrad;
  // ctx.fillRect(0,0,150,150);
  //创建新 image 对象，用作图案
  var img = new Image();
  img.src = require('../../images/1.png');
  img.onload = function(){

    // 创建图案
    var ptrn = ctx.createPattern(img,'repeat-x');
    ctx.fillStyle = ptrn;
    ctx.fillRect(0,0,50,50);
  ctx.shadowOffsetX = 2;
  ctx.shadowOffsetY = 2;
  ctx.shadowBlur = 2;
  ctx.shadowColor = "rgba(0, 0, 0, 0.5)";
}
ctx.font = "48px serif";
ctx.textAlign = 'left'
ctx.strokeText("Hello world", 0, 100);

  }else{
    alert("不支持html5");
  }
},
image(){
  var canvas = this.refs.image
  if(canvas.getContext){
    var ctx = canvas.getContext('2d')
  ctx.translate(75,75);

  for (var i=1;i<6;i++){ // Loop through rings (from inside to out)
    ctx.save();
    ctx.fillStyle = 'rgb('+(51*i)+','+(255-51*i)+',255)';

    for (var j=0;j<i*6;j++){ // draw individual dots
      ctx.rotate(Math.PI*2/(i*6));
      ctx.beginPath();
      ctx.arc(0,i*12.5,5,0,Math.PI*2,true);
      ctx.fill();
    }

    ctx.restore();}
  }else{
    alert('不支持html5')
  }
},
  render() {
    return <div className="pages-404">
    <canvas ref="canvas" width="400" height="300">我是canvas标签</canvas>
}
<p>haha</p>
<video width="320" height="240" controls>
  <source src="http://www.runoob.com/try/demo_source/movie.mp4" type="video/mp4"/>
  <source src="http://www.runoob.com/try/demo_source/movie.ogg" type="video/ogg"/>
  您的浏览器不支持 HTML5 video 标签。
</video>
        <div className="container">
            <h1>Camera API</h1>

            <section className="main-content">
                <p>A demo of the Camera API, currently implemented in Firefox and Google Chrome on Android. Choose to take a picture with your device's camera and a preview will be shown through createObjectURL or a FileReader object (choosing local files supported too).</p>

                <p>
                    <input type="file" ref="takePicture" accept="image/*"/>
                </p>

                <h2>Preview:</h2>
                <p>
                    <img src="about:blank" alt="❌加载失败" ref="showPicture" style={{width:"200px",height:"auto"}}/>
                </p>

                <p id="error"></p>

            </section>

            <p className="footer">All the code is available in the <a href="https://github.com/robnyman/robnyman.github.com/tree/master/camera-api">Camera API repository on GitHub</a>.</p>
        </div>
        <canvas ref='smile' width='200' height='300'style={{border:"1px solid"}}></canvas>
        <div>
          <canvas ref="bezier" width='150' height='150'style={{border:"1px solid"}}></canvas>
        </div>
        <div>
          <canvas ref="path2d" style={{border:"1px solid"}}></canvas>
        </div>
        <div>
          <canvas ref="radgrad" style={{border:"1px solid"}}></canvas>
        </div>
        <div>
          <canvas ref="image" style={{border:"1px solid"}}></canvas>
        </div>
    </div>
  }

})
