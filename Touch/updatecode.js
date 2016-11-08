import {
  days,
  weeks,
  months
} from './sourceData.js'


var TWEEN = require('tween.js')


localStorage.setItem("days",   days)
localStorage.setItem("weeks",  weeks)
localStorage.setItem("months", months)


var styles = require('../styles/bi.styl')

var canvas = document.getElementById('canvas')
var context = canvas.getContext('2d')

var selectedStation = document.getElementById('selectedStation')
var selectedValue = document.getElementById('selectedValue')
var selectedTime = document.getElementById('selectedTime')

var infoArea = document.getElementById('info')
var drwaingSurfaceImageData

var sourceData
var stationDimension
var valueDimension
var number
var points = []
var trendCoordinate = new Coordinate(7)

function PointCircle(x, y, value, info) {
  this.x = x;
  this.y = y;
  this.value = value;
  this.info = info || '';
  this.angle = 0
}

PointCircle.prototype.draw = function(context) {
  context.save()
  context.beginPath()
  context.translate(this.x, this.y)

  context.arc(0, 0, 2, Math.PI*2, 0, true)
  context.fill()

  context.beginPath()
  var radius = 5 + 5 * Math.abs(Math.cos(this.angle));
  context.arc(0,0,radius,0,Math.PI*2,false)
  context.stroke()
  this.angle += Math.PI / 64;
  console.log('hh')
  context.beginPath()
  context.strokeStyle = '#808080'
  context.moveTo(0, 0)
  context.lineTo(0, -40)
  context.stroke()

  context.fillStyle = "#808080"
  context.fillRect(-20,-60, 40,30)

  context.fillStyle = "#ffffff"
  context.font = "1em Palatino"
  context.fillText(this.value, 0, -40)
  context.restore()
}

PointCircle.prototype.getPosition = function() {
  return {
    x: this.x,
    y: this.y
  }
}

PointCircle.prototype.createPath = function() {
  context.beginPath()
  context.arc(0,0,10,Math.PI*2,0,true)
  context.closePath()
}

PointCircle.prototype.update = function () {

}

PointCircle.prototype.monitor = function() {
}


var position

//functions .............................................

function difineTween(GG, targetX, targetY) {

  var tween = new TWEEN.Tween(GG)
          .to({x: targetX, y: targetY,}, 1000)
          .easing(TWEEN.Easing.Elastic.InOut)
  tween.start()
}




function Animation(time) {
  requestAnimationFrame(Animation)
  updateBackground()
  trendCoordinate.draw()
  drawContent(points, context)
  drwaLines(points)

  TWEEN.update(time)

}

function init() {
  var i = 12
  while(i--) {
    points.push(new PointCircle(canvas.width+100, canvas.height+100, 10, ''))
  }

  sourceData = days
  stationDimension = 'stationA'
  valueDimension = 'avgTemp'
}


function updateBackground() {
  context.clearRect(0,0,canvas.width,canvas.height)
}

function drawContent(points, context) {
  if(!points)
    return
  points.map((item, index) => {
    item.draw(context)
    item.update()
  })
}

function drwaLines(points) {
  if(!points)
    return

  context.beginPath()
  points.map((item, index) => {
    if(index == 0){
      context.moveTo(item.x, item.y)
    }
    else if(item.x < canvas.width && item.y < canvas.height) {
      context.lineTo(item.x, item.y)
    }
  })
  context.stroke()
}

function Coordinate(number) {
  this.number = number
  this.horizontalName = '温度'
  this.horizontalNameMargin = 80
  this.verticalName = '时间/'
  this.verticalNameMargin = 80
  this.MARGIN = 60
  this.SPACING = Math.floor((canvas.width-2*this.MARGIN-40)/this.number)
}
Coordinate.prototype.setNumber = function(num) {
  this.number = num
  this.SPACING = Math.floor((canvas.width-2*this.MARGIN-40)/this.number)
}
Coordinate.prototype.getMargin = function() {
  return this.MARGIN
}
Coordinate.prototype.getHeight = function() {
  return canvas.height - 2 * this.MARGIN
}
Coordinate.prototype.getSpacing = function() {
  return this.SPACING
}
Coordinate.prototype.draw = function() {
    context.beginPath()
    context.moveTo(this.MARGIN, this.MARGIN)
    context.lineTo(this.MARGIN, canvas.height - this.MARGIN)
    context.lineTo(canvas.width - this.MARGIN, canvas.height - this.MARGIN)
    context.stroke()

    context.beginPath()
    context.font = '1em serif'
    context.textBaseline = 'top'
    context.fillText(this.horizontalName, this.horizontalNameMargin , this.MARGIN)

    context.beginPath()
    context.textBaseline = 'bottom'
    context.fillText(this.verticalName, canvas.width - 2*this.MARGIN ,
      canvas.height - this.verticalNameMargin)

    for(var i = 0; i < this.number; ++i){
      context.beginPath()
      context.moveTo(this.SPACING*(i+1)+this.MARGIN, canvas.height - this.MARGIN + 3.5)
      context.lineTo(this.SPACING*(i+1)+this.MARGIN, canvas.height - this.MARGIN - 3.5)
      context.stroke()

      context.beginPath()
      context.save()
      context.textAlign = "center"
      context.fillText(i+1, this.SPACING*(i+1)+this.MARGIN, canvas.height - this.MARGIN/2)
      context.restore()
    }
}

function transformData(value, index) {
  var margin = trendCoordinate.getMargin()
  var spacing = trendCoordinate.getSpacing()
  var height = trendCoordinate.getHeight()
  return {
    x: margin + spacing * (index+1),
    y: canvas.height - height/100*value - margin
  }
}

//Initialtion ...........................................


Animation()

//Event handlers ...........................................

window.onload = function() {
  init()
}

selectedStation.onchange = function(e) {
  var value
  var info
  e.preventDefault()
  stationDimension = e.target.value
  sourceData.map((item, index) => {
    value = item[stationDimension][valueDimension].value
    info = item[stationDimension][valueDimension].info

    difineTween(points[index],
      transformData(value, index).x, transformData(value, index).y)

    points[index].value = value
    points[index].info = info
  })
}

selectedValue.onchange = function(e) {
  var value
  var info
  e.preventDefault()
  valueDimension = e.target.value
  sourceData.map((item, index) => {
    value = item[stationDimension][valueDimension].value
    info = item[stationDimension][valueDimension].info

    difineTween(points[index],
      transformData(value, index).x, transformData(value, index).y)

    points[index].value = value
    points[index].info = info
  })
}

selectedTime.onchange = function(e) {
  var value
  var info
  var indexChange
  e.preventDefault()
  switch(e.target.value) {
    case 'days':
      sourceData = days
      break
    case 'weeks':
      sourceData = weeks
      break
    case 'months':
      sourceData = months
      break
    default:
      console.log('switch err.')
  }
  trendCoordinate.setNumber(sourceData.length)
  sourceData.map((item, index) => {
    value = item[stationDimension][valueDimension].value
    info = item[stationDimension][valueDimension].info

    difineTween(points[index],
      transformData(value, index).x, transformData(value, index).y)
    points[index].value = value
    points[index].info = info
    indexChange = index
  })

  //多余的点移动到视图外
  points.map((item,index) => {
    if(indexChange < index)
      difineTween(points[index],
      1000, 0)
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
  var loc = windowToCanvas(canvas,e.touches[0].pageX, e.touches[0].pageY)
  // updateCircle(loc.x, loc.y)
},false)

canvas.addEventListener('mousedown', function(e){
  e.preventDefault()
  var loc = windowToCanvas(canvas,e.clientX, e.clientY)
  // updateCircle(loc.x, loc.y)
  // updateRect(loc.x, loc.y)
},false)



// function saveDrawingSurface() {
//  drwaingSurfaceImageData = context.getImageData(0, 0,
//        canvas.width, canvas.height)
// }

// function restoreDrawingSurface() {
//  context.putImageData(drwaingSurfaceImageData, 0, 0)
// }

// function updateBackground() {
//  context.clearRect(0, 0, canvas.width, canvas.height)
// }

// function draw() {
//  rectangularCoordinate.drwaCoordinate(canvas, context)
//  rectangularCoordinate.drawVaules(canvas, context)
// }

// function windowTocanvas(x, y) {
//  var bbox = canvas.getBoundingClientRect()
//  return {
//    x: x - bbox.left * (canvas.width  /bbox.width),
//    y: y - bbox.top  * (canvas.height /bbox.height)
//  }
// }

// //Event handlers ...........................................



// stationSelect.onchange = function(e) {
//  stationDimension = stationSelect.value
//  console.log(stationDimension)
//  updateBackground()
//  draw()
// }

// dataSelect.onchange = function(e) {
//  valueDimension = dataSelect.value
//  console.log(valueDimension)
//  updateBackground()
//  draw()
// }

// timeSelect.onchange = function(e) {
//  console.log(timeSelect.value)
//  switch (timeSelect.value)
//  {
//    case 'days':
//      timeDimension = days
//      SPACING = Math.floor( (canvas.width - 3*60)/timeDimension.length)
//      date = '天'
//      updateBackground()
//      draw()
//      break
//    case 'weeks':
//      timeDimension = weeks
//      SPACING = Math.floor( (canvas.width - 3*60)/timeDimension.length)
//      date = '周'
//      updateBackground()
//      draw()
//      break
//    case 'months':
//      timeDimension = months
//      SPACING = Math.floor( (canvas.width - 3*60)/timeDimension.length)
//      date = '月'
//      updateBackground()
//      draw()
//      break
//    default:
//      console.log('default')
//  }


// }
// var mousedown={}

// canvas.onmousedown = function(e) {
//  var incircle = false
//  var loc = windowTocanvas(e.clientX, e.clientY)
//  e.preventDefault()



//  points.map((item, index) => {
//    item.createPath(context)
//    if(context.isPointInPath(loc.x, loc.y)) {
//      mousedown.x = loc.x
//      mousedown.y = loc.y

//      infoArea.value = item.info
//      infoArea.style.visibility = 'visible'
//      infoArea.style.top = e.clientY + 'px'
//      infoArea.style.left = e.clientX + 'px'
//      incircle = true
//    }

//  })

//  if(!incircle) {
//    infoArea.style.visibility = 'hidden'
//  }
//  console.log(points)
// }

// infoArea.onchange = function(e) {
//  console.log('infoAreaOnchange')
//  console.log(mousedown)
//  points.map((item, index) => {
//    item.createPath(context)
//    if(context.isPointInPath(mousedown.x, mousedown.y)) {
//      console.log('get in ?')
//      item.info = e.target.value
//    }
//  })
//  console.log(points)
// }

// canvas.onmouseup = function(e) {
//  loc = windowTocanvas(e.clientX, e.clientY)
//  e.preventDefault()
//  console.log(loc.x, loc.y)

// }

// canvas.addEventListener('touchstart', (event) => {
//  event.preventDefault()
//  var touches = event.changedTouches
//  console.log('start')
//  var loc = windowToCanvas(canvas, touches[0].clientX, touches[0].clientY)
//  console.log(loc.x, loc.y)
// }, false)

// var Touch = []
// var index = [0, -1, -2, -3, -4]
// var right = false

// var itemOne = document.getElementById('itemOne')
// var itemTwo = document.getElementById('itemTwo')
// var itemThree = document.getElementById('itemThree')
// var itemFour = document.getElementById('itemFour')
// var itemFive = document.getElementById('itemFive')

// window.addEventListener('touchmove', (event) => {
//  var touches = event.changedTouches

//  if(Touch.length < 2){
//    Touch.push(touches[0].pageX)
//    if(Touch[0] < Touch[1]) {
//      console.log('right')
//      right = true

//      Touch = []
//    }
//    if(Touch[0] > Touch[1]){
//      console.log('left')

//      Touch = []
//    }
//    if(Touch.length == 2)
//      Touch.shift()
//  }





// }, false)

// =======
// var canvas = document.getElementById('canvasOne')
// var ctx = canvas.getContext('2d')
// var requestAnimationFrame = window.requestAnimationFrame ||
//                             window.mozRequestAnimationFrame ||
//                             window.webkitRequestAnimationFrame ||
//                             window.msRequestAnimationFrame;
// var MARGIN = 60
// var values = [5045, 8314, 7491, 5731, 7476, 7170]
// var subscripts = [0, 1, 2, 3, 4, 5, 6]
// var lines = []
// var display = false
// var angle = 0
// var alpha = 0
// function drwaCoordinate() {

//   //坐标系名称
//   ctx.beginPath()
//   ctx.strokeStyle = "#ffffff"
//   ctx.font = '18px Palatino'
//   ctx.strokeText('新增', MARGIN +20 , 40)

//   //横竖坐标轴
//   ctx.beginPath()
//   ctx.moveTo(MARGIN, 40)
//   ctx.lineTo(MARGIN, canvas.height - MARGIN)
//   ctx.lineTo(canvas.width - MARGIN, canvas.height - MARGIN)
//   ctx.stroke()

//   //横轴下标及标记线
//   subscripts.map((item, index) => {
//     ctx.beginPath()
//     ctx.textAlign = "center"
//     ctx.fillStyle = "#ffffff"
//     ctx.fillText(item, MARGIN+item*60, canvas.height - MARGIN + 30)
//     ctx.fill()

//     ctx.beginPath()
//     ctx.moveTo(MARGIN+item*60, canvas.height - MARGIN)
//     ctx.lineTo(MARGIN+item*60, canvas.height - MARGIN - 10)
//     ctx.stroke()
//   })
// }

// function drawVaules() {
//   //连线
//   var points = []
//   values.map((item, index) => {
//     lines.push(item)
//     if(lines.length > 1 && lines.length < 3) {
//       ctx.beginPath()
//       ctx.moveTo(MARGIN + 60*(index), -((canvas.height/10000) * lines[0] - canvas.height - 60))
//       ctx.lineTo(MARGIN + 60*(index + 1), -((canvas.height/10000) * lines[1] - canvas.height - 60))
//       ctx.stroke()
//       lines.shift()
//       if(index == 5) lines = []
//     }

//     //中间实心小圆点
//     ctx.save()
//     ctx.beginPath()
//     ctx.translate(MARGIN + 60*(index+1), -((canvas.height/10000)*item - canvas.height-60))
//     ctx.arc(0,0,2,Math.PI*2,0,true)
//     ctx.fill()
//     ctx.restore()
//   })
// }

// function drawRect() {
//   if(x && y){

//     // alpha = alpha + 0.01
//     ctx.save()
//     ctx.beginPath()
//     ctx.strokeStyle = '#808080'
//     ctx.moveTo(rectX, rectY)
//     // ctx.globalAlpha = alpha
//     ctx.lineTo(rectX, rectY-40)
//     ctx.stroke()

//     ctx.fillStyle = "#808080"
//     ctx.fillRect(rectX - 20, rectY - 80, 40,30)
//     ctx.fillStyle = "#ffffff"
//     ctx.font = "14px Palatino"
//     ctx.fillText(data, rectX, rectY - 60)

//     ctx.restore()

//     }
// }
// var x,y
// function drawCircle() {
//     ctx.save()
//     ctx.beginPath();
//     var radius = 5 + 5 * Math.abs(Math.cos(angle));
//     ctx.translate(x, y)
//     if (x && y) {
//       ctx.arc(0, 0, radius, 0, Math.PI * 2, false);
//     }
//     ctx.closePath();
//     if (ctx.isPointInPath(x,y)) {
//       ctx.stroke();
//     }

//     angle += Math.PI / 64;
//     ctx.restore()
//     console.log(ctx.isPointInPath(x,y))
// }
// var rectX,rectY
// var data = []
// function updateRect(locX, locY) {
//   values.map((item, index)=>{

//     var locx = MARGIN + 60*(index+1)
//     var locy = canvas.height+60-(canvas.height/10000)*item
//     if ((locx-10 < locX && locX < locx+10) && (locy-10<locY &&locY<locy+10)) {
//       rectX = locx
//       rectY = locy
//       data = item
//       console.log(data)
//     }

//   })
// }
// function updateCircle(locX,locY) {
//   values.map((item, index)=>{
//     var locx = MARGIN + 60*(index+1)
//     var locy = canvas.height+60-(canvas.height/10000)*item
//     if ((locx-10 < locX && locX < locx+10) && (locy-10<locY &&locY<locy+10)) {
//       x = locx
//       y = locy
//     }
//   })

// }
// function windowToCanvas(canvas, x, y) {
//     var bbox = canvas.getBoundingClientRect();
//     return { x: x - bbox.left * (canvas.width  / bbox.width),
//             y: y - bbox.top  * (canvas.height / bbox.height)
//             };
// }

// canvas.addEventListener('touchstart', function(e){
//   e.preventDefault()
//   display = true
//   var loc = windowToCanvas(canvas,e.touches[0].pageX, e.touches[0].pageY)
//   updateCircle(loc.x, loc.y)
// },false)

// canvas.addEventListener('mousedown', function(e){
//   e.preventDefault()
//   display = true
//   var loc = windowToCanvas(canvas,e.clientX, e.clientY)
//   updateCircle(loc.x, loc.y)
//   updateRect(loc.x, loc.y)
// },false)

// // canvas.addEventListener('mouseup', function(e){
// //   e.preventDefault()
// //   display = true
// //   var loc = windowToCanvas(canvas,e.clientX, e.clientY)
// //   updateCircle(loc.x, loc.y)
// // },false)

// function updateBackground() {
//   ctx.clearRect(0,0,canvas.width,canvas.height)
// }

// function animation() {
//   requestAnimationFrame(animation)
//   updateBackground()
//   drwaCoordinate()
//   drawVaules()
//   drawCircle()
//   drawRect()
// }


// animation()
// >>>>>>> af98085e5c9e943611bb6e80115802c8d63d792e
