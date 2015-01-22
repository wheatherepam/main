function Sun(dayDuration,curTime){
    var dayDuration =dayDuration||60;
    var curTime=1;
    //var width=document.getElementsByTagName('main')[0].style;
    
    var width=500;
    var start=0;
    var finish=width;
    var radius=width/2;
    var step=parseInt(width/dayDuration);

    function Iteration(){
        return (dayDuration/curTime)*step;
    }
    var result= function getPos(){
         var x=Iteration();
         var a=radius-x;
         var degree=radius/90;
         var curdegree=x*degree;
         var y=parseInt(x*Math.sin(curdegree)) ;
         return x+','+y;
     }
    return result();
}
var result=Sun();
console.log(result);