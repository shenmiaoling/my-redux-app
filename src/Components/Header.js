import React from 'react'
module.exports = React.createClass({
  render() {
    return <div className="pages-404">
<audio src="http://developer.mozilla.org/@api/deki/files/2926/=AudioTest_(1).ogg" autoPlay>
  Your browser does not support the <code>audio</code> element.
</audio>

<audio src="foo.ogg">
  <track kind="captions" src="foo.en.vtt" srcLang="en" label="English"/>
  <track kind="captions" src="foo.sv.vtt" srcLang="sv" label="Svenska"/>
</audio>
<audio controls="controls">
  Your browser does not support the <code>audio</code> element.
  <source src="foo.wav" type="audio/wav"/>
</audio>
<p>haha</p>
<video width="320" height="240" controls>
  <source src="http://www.runoob.com/try/demo_source/movie.mp4" type="video/mp4"/>
  <source src="http://www.runoob.com/try/demo_source/movie.ogg" type="video/ogg"/>
  您的浏览器不支持 HTML5 video 标签。
</video>
    </div>
  }
})
