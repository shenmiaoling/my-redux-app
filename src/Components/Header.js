import React from 'react'
module.exports = React.createClass({
  componentDidMount(){
    this.draw21(),
    this.picture()
  },
draw21(id) {
  var canvas = this.refs.canvas
if (this.refs.canvas.getContext){
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

    // context.fillStyle = "black";
    // context.beginPath();
    // context.moveTo(100,50);
    // context.lineTo(125,75);
    // context.lineTo(125,25);
    // context.fill();

    context.beginPath();
    context.arc(75,75,50,0,Math.PI*2,true); // 绘制
    context.moveTo(110,75);
    context.arc(75,75,35,0,Math.PI,false);   // 口(顺时针)
    context.moveTo(65,65);
    context.arc(60,65,5,0,Math.PI*2,true);  // 左眼
    context.moveTo(95,65);
    context.arc(90,65,5,0,Math.PI*2,true);  // 右眼
    context.fill()
    context.stroke();
} else {
  return false
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
  render() {
    return <div className="pages-404">
    <canvas ref="canvas" width="400" height="300">我是canvas标签</canvas>
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
                    <img src="about:blank" alt="❌加载失败" ref="showPicture" style={{width:"30%",height:"auto"}}/>
                </p>

                <p id="error"></p>

            </section>

            <p className="footer">All the code is available in the <a href="https://github.com/robnyman/robnyman.github.com/tree/master/camera-api">Camera API repository on GitHub</a>.</p>
        </div>
    </div>
  }

})
