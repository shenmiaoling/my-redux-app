var canvas = document.getElementById('canvasOne')
var ctx = canvas.getContext('2d')
var requestAnimationFrame = window.requestAnimationFrame ||
                            window.mozRequestAnimationFrame ||
                            window.webkitRequestAnimationFrame ||
                            window.msRequestAnimationFrame;
var MARGIN = 60
var values = [5045, 8314, 7491, 5731, 7476, 7170]
var subscripts = [0, 1, 2, 3, 4, 5, 6]
var lines = []
var display = false
var angle = 0
var alpha = 0
function drwaCoordinate() {

  //坐标系名称
  ctx.beginPath()
  ctx.strokeStyle = "#ffffff"
  ctx.font = '18px Palatino'
  ctx.strokeText('新增', MARGIN +20 , 40)

  //横竖坐标轴
  ctx.beginPath()
  ctx.moveTo(MARGIN, 40)
  ctx.lineTo(MARGIN, canvas.height - MARGIN)
  ctx.lineTo(canvas.width - MARGIN, canvas.height - MARGIN)
  ctx.stroke()

  //横轴下标及标记线
  subscripts.map((item, index) => {
    ctx.beginPath()
    ctx.textAlign = "center"
    ctx.fillStyle = "#ffffff"
    ctx.fillText(item, MARGIN+item*60, canvas.height - MARGIN + 30)
    ctx.fill()

    ctx.beginPath()
    ctx.moveTo(MARGIN+item*60, canvas.height - MARGIN)
    ctx.lineTo(MARGIN+item*60, canvas.height - MARGIN - 10)
    ctx.stroke()
  })
}

function drawVaules() {
  //连线
  var points = []
  values.map((item, index) => {
    lines.push(item)
    if(lines.length > 1 && lines.length < 3) {
      ctx.beginPath()
      ctx.moveTo(MARGIN + 60*(index), -((canvas.height/10000) * lines[0] - canvas.height - 60))
      ctx.lineTo(MARGIN + 60*(index + 1), -((canvas.height/10000) * lines[1] - canvas.height - 60))
      ctx.stroke()
      lines.shift()
      if(index == 5) lines = []
    }

    //中间实心小圆点
    ctx.save()
    ctx.beginPath()
    ctx.translate(MARGIN + 60*(index+1), -((canvas.height/10000)*item - canvas.height-60))
    ctx.arc(0,0,2,Math.PI*2,0,true)
    ctx.fill()
    ctx.restore()
  })
}

function drawRect() {
  if(x && y){

    // alpha = alpha + 0.01
    ctx.save()
    ctx.beginPath()
    ctx.strokeStyle = '#808080'
    ctx.moveTo(rectX, rectY)
    // ctx.globalAlpha = alpha
    ctx.lineTo(rectX, rectY-40)
    ctx.stroke()

    ctx.fillStyle = "#808080"
    ctx.fillRect(rectX - 20, rectY - 80, 40,30)
    ctx.fillStyle = "#ffffff"
    ctx.font = "14px Palatino"
    ctx.fillText(data, rectX, rectY - 60)

    ctx.restore()

    }
}
var x,y
function drawCircle() {
    ctx.save()
    ctx.beginPath();
    var radius = 5 + 5 * Math.abs(Math.cos(angle));
    ctx.translate(x, y)
    if (x && y) {
      ctx.arc(0, 0, radius, 0, Math.PI * 2, false);
    }
    ctx.closePath();
    ctx.stroke();
    angle += Math.PI / 64;
    ctx.restore()
}
var rectX,rectY
var data = []
function updateRect(locX, locY) {
  values.map((item, index)=>{

    var locx = MARGIN + 60*(index+1)
    var locy = canvas.height+60-(canvas.height/10000)*item
    if ((locx-10 < locX && locX < locx+10) && (locy-10<locY &&locY<locy+10)) {
      rectX = locx
      rectY = locy
      data = item
      console.log(data)
    }

  })
}
function updateCircle(locX,locY) {
  values.map((item, index)=>{
    var locx = MARGIN + 60*(index+1)
    var locy = canvas.height+60-(canvas.height/10000)*item
    if ((locx-10 < locX && locX < locx+10) && (locy-10<locY &&locY<locy+10)) {
      x = locx
      y = locy
    }
  })

}
function windowToCanvas(canvas, x, y) {
    var bbox = canvas.getBoundingClientRect();
    return { x: x - bbox.left * (canvas.width  / bbox.width),
            y: y - bbox.top  * (canvas.height / bbox.height)
            };
}

canvas.addEventListener('touchstart', function(e){
  e.preventDefault()
  display = true
  var loc = windowToCanvas(canvas,e.touches[0].pageX, e.touches[0].pageY)
  updateCircle(loc.x, loc.y)
},false)

canvas.addEventListener('mousedown', function(e){
  e.preventDefault()
  display = true
  var loc = windowToCanvas(canvas,e.clientX, e.clientY)
  updateCircle(loc.x, loc.y)
  updateRect(loc.x, loc.y)
},false)

// canvas.addEventListener('mouseup', function(e){
//   e.preventDefault()
//   display = true
//   var loc = windowToCanvas(canvas,e.clientX, e.clientY)
//   updateCircle(loc.x, loc.y)
// },false)

function updateBackground() {
  ctx.clearRect(0,0,canvas.width,canvas.height)
}

function animation() {
  requestAnimationFrame(animation)
  updateBackground()
  drwaCoordinate()
  drawVaules()
  drawCircle()
  drawRect()
}


animation()
