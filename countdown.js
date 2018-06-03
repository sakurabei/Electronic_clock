var WINDOW_WIDTH = 1024;
var WINDOW_HEIGHT = 768;

var MARGIN_TOP = 60;
var MARGIN_LEFT= 30;
var RADIUS = 8;
var curShowTimeSeconds = 0;
// var endTime = new Date();
// endTime.setTime(endTime.getTime() + 3600*1000);
var balls = [];
const colors = ["#33B5E5","#0099CC","#AA66CC","#9933CC","#99CC00","#669900","#FFBB33","#FF8800","#FF4444","#CC0000"]

window.onload = function(){
	// 屏幕自适应的方法
	WINDOW_WIDTH =  document.body.clientWidth;
	WINDOW_HEIGHT = document.body.clientHeight;
	MARGIN_LEFT = Math.round(WINDOW_WIDTH/10);
	// *4/5找到字所占的空间
	RADIUS = Math.round(WINDOW_WIDTH *4/5/108)-1;
	MARGIN_TOP = Math.round(WINDOW_HEIGHT/5);
	
	var canvas = document.getElementById('canvas');
	var context = canvas.getContext('2d');

	canvas.width = WINDOW_WIDTH;
	canvas.height = WINDOW_HEIGHT;
	curShowTimeSeconds = getCurrentShowTimeSeconds();
	// js 中绘制图像的方法
	setInterval(
		function(){
			render(context);
			update();
		},
		50
	);


	
}

function getCurrentShowTimeSeconds(){
	var curTime = new Date();
	// var ret = endTime.getTime() - curTime.getTime();
	// ret = Math.round(ret/1000);
	 // return ret >=0?ret:0;
	 //钟表时间
	 var ret = curTime.getHours() * 3600 +curTime.getMinutes() *60 +curTime.getSeconds();
	 return ret;
}
function update(){
	var nextShowTimeSeconds = getCurrentShowTimeSeconds();
	var nextHours = parseInt(nextShowTimeSeconds/3600);
 	var nextMinutes= parseInt((nextShowTimeSeconds-nextHours*3600)/60);
 	var nextSeconds = nextShowTimeSeconds%60;

 	var curHours = parseInt(curShowTimeSeconds/3600);
 	var curMinutes= parseInt((curShowTimeSeconds-curHours*3600)/60);
 	var curSeconds = curShowTimeSeconds%60;

 	if(nextSeconds != curSeconds){
 		if(parseInt(curHours/10)!=parseInt(nextHours/10)){
 			addBalls(MARGIN_LEFT+0,MARGIN_TOP,parseInt(curHours/10));
 		}
 		if(parseInt(curHours%10)!=parseInt(nextHours%10)){
 			addBalls(MARGIN_LEFT+15*(RADIUS+1),MARGIN_TOP,parseInt(curHours/10));
 		}
 		if(parseInt(curMinutes/10)!=parseInt(nextMinutes/10)){
 			addBalls(MARGIN_LEFT+39*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes/10));
 		}
 		if(parseInt(curMinutes%10)!=parseInt(nextMinutes%10)){
 			addBalls(MARGIN_LEFT+54*(RADIUS+1),MARGIN_TOP,parseInt(curMinutes%10));
 		}
 		if(parseInt(curSeconds/10)!=parseInt(nextSeconds/10)){
 			addBalls(MARGIN_LEFT+78*(RADIUS+1),MARGIN_TOP,parseInt(curSeconds/10));
 		}
 		if(parseInt(curSeconds%10)!=parseInt(nextSeconds%10)){
 			addBalls(MARGIN_LEFT+93*(RADIUS+1),MARGIN_TOP,parseInt(nextSeconds%10));
 		}
 		curShowTimeSeconds = nextShowTimeSeconds;

 	}
 	updateBalls();
 	// console.log(balls.length);

}
function updateBalls(){
	for (var i=0;i<balls.length;i++){
		balls[i].x += balls[i].vx;
		balls[i].y += balls[i].vy;
		balls[i].vy += balls[i].g;

		if(balls[i].y >=WINDOW_HEIGHT-RADIUS){
			balls[i].y = WINDOW_HEIGHT -RADIUS;
			balls[i].vy = -balls[i].vy*0.75;
		}
 
	}
// 当小球弹出画面，则考虑将小球从数组中删除。
	var cnt = 0;
	for( var i=0;i<balls.length;i++){
		if(balls[i].x+RADIUS>0&& balls[i].x-RADIUS < WINDOW_WIDTH){
			balls[cnt++] = balls[i];
		}
	}
	while(balls.length > Math.min(300,cnt)){
		// 数组中去除走到边框外的小球
		balls.pop();
	}
}

function addBalls(x,y,num){
	for(var i=0;i<digit[num].length;i++){
		for( var j=0;j<digit[num][i].length;j++){
			if(digit[num][i][j] == 1){
				var aBall ={
					x:x+j*2*(RADIUS+1)+RADIUS+1,
					y:y+i*2*(RADIUS+1)+RADIUS+1,
					g:1.5+Math.random(),
					vx:Math.pow(-1,Math.ceil(Math.random()*1000))*4,
					vy:-5,
					color:colors[Math.floor(Math.random()*colors.length)]
				}
				balls.push(aBall);
			}
		}
	}
}



 function render(cxt){
 	// 对一次矩形范围进行一次刷新操作
 	cxt.clearRect(0,0,WINDOW_WIDTH,WINDOW_HEIGHT);
 	var hours = parseInt(curShowTimeSeconds/3600);
 	var minutes = parseInt((curShowTimeSeconds-hours*3600)/60);
 	var seconds = curShowTimeSeconds%60;

 	renderDigit(MARGIN_TOP,MARGIN_LEFT,parseInt(hours/10),cxt);
 	renderDigit(MARGIN_TOP+15*(RADIUS+1),MARGIN_LEFT,parseInt(hours%10),cxt);
 	renderDigit(MARGIN_TOP+30*(RADIUS+1),MARGIN_LEFT,10,cxt);
 	renderDigit(MARGIN_TOP+39*(RADIUS+1),MARGIN_LEFT,parseInt(minutes/10),cxt);
 	renderDigit(MARGIN_TOP+54*(RADIUS+1),MARGIN_LEFT,parseInt(minutes%10),cxt);
 	renderDigit(MARGIN_TOP+69*(RADIUS+1),MARGIN_LEFT,10,cxt);
 	renderDigit(MARGIN_TOP+78*(RADIUS+1),MARGIN_LEFT,parseInt(seconds/10),cxt);
 	renderDigit(MARGIN_TOP+93*(RADIUS+1),MARGIN_LEFT,parseInt(seconds%10),cxt);
 	for( var i=0;i< balls.length;i++){
 		cxt.fillStyle = balls[i].color;
 		cxt.beginPath();
 		cxt.arc(balls[i].x,balls[i].y,RADIUS,0,2*Math.PI,true);
 		cxt.closePath();

 		cxt.fill();
 	} 
 }
function renderDigit(x,y,num,cxt){
	cxt.fillStyle = "rgb(0,102,153)";
	for( var i = 0;i < digit[num].length;i++){
		for( var j = 0; j < digit[num][i].length;j++){
			if(digit[num][i][j] == 1){
				cxt.beginPath();
				// 行用i表示。列用j表示
				// centerX x+j*2*(R+1)+R+1
				// centerY y+i*2*(R+1)+R+1
				cxt.arc(x+j*2*(RADIUS+1)+RADIUS+1,y+i*2*(RADIUS+1)+RADIUS+1,RADIUS,0,2*Math.PI);
				cxt.closePath();
				cxt.fill();
			}
		}
	}
}