/**
 * @desc JSONP 使用简单且兼容性不错，但是只限于 get 请求
 * @use  1. <_script src="http://domain/api?param1=a&param2=b&callback=jsonp"><script_> 
 *       2. <_script>
 *          function jsonp(data) {
 *            console.log(data)
 *          } 
 *       <script_>
 */
function jsonp(url, jsonpCallback, success) {
    let script = document.createElement("script"); 
    script.src = url;
    script.async = true;
    script.type = "text/javascript";
    window[jsonpCallback] = function (data) {
        success && success(data);
    };
    document.body.appendChild(script);
}
jsonp("http://xxx", "callback", function (value) {
    console.log(value);
}
);
