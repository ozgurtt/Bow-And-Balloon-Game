var winH,winW;
var balPos=-100,balSpeed=1;
var arrPos=100,arrSpeed=10;
var arrRun=0;
var bOffset,aOffset;
var arrStep;
var score=0;
var temp=1;

$(function() {
	
	var i;
	setPlayArea();
	$(window).resize(setPlayArea);
	setInterval(moveBaloon,1);
	$("#bow").click(function() {
		
		$("#arrow").show();
		setArrowPos();
   		moveArrow();
    });
    
    $("body").keydown(moveUpDown);
	$("#balS").change(function(){
		$("#balSpeed").text($(this).val());
		balSpeed=Number($(this).val());
	});
	$("#arrS").change(function(){
		$("#arrSpeed").text($(this).val());
		arrSpeed=Number($(this).val()*10);
	});
	var uname=prompt("Enter your name");
	$("#uname").text(uname);
	
	
});
function moveUpDown(e)
{
	var bowTop=parseInt($("#bow").css("top"));
    	if(e.keyCode==40 && (bowTop+145)<winH)
    	{
    		$("#bow").css("top",bowTop+5);
    	}
    	if(e.keyCode==38 && bowTop > 0)
    	{
    		$("#bow").css("top",bowTop-5);
    	}
}
function restartArrowPos()
{
	$("#arrow").css("left",arrPos);
	$("#arrow").hide();
}
function setArrowPos()
{
	$("#arrow").css("top",$("#bow").offset().top-5);
}

function moveArrow()
{
	while(1)
	{
		if((arrPos)<=winW) {
			arrPos+=arrSpeed;
			$("#arrow").animate({"left":arrPos},1);
		}
		else {
			arrPos=100;
			$("#arrow").animate({"left":arrPos}	,1);
			//restartArrowPos();
			exit();
		}
	}
}
function moveBaloon() {
	
	balPos+=balSpeed;
	if(balPos<winH) {
		$("#baloon").css("top",balPos);
		var aT=parseInt($("#arrow").css("top"));
		var bT=parseInt($("#baloon").css("top"));
		var aL=parseInt($("#arrow").css("left"));
		var bL=parseInt($("#baloon").css("left"));
		if((aT+29)>=bT && (bT+100) > aT)
		{
			if((aL+100)>bL && temp==1)
			{
					var rndNo=Math.round(Math.random()*1);
					$("#baloon img").fadeOut(200,function(){
					$(this).attr("src","images/"+rndNo+".jpg");
					$("#baloon img").fadeIn(200);
				});
				arrPos=100;
				restartArrowPos();
				$("#point").text(++score);
				temp=0;
			}		
		}
	}
	else
	{
		if(parseInt($("#arrow").css("left"))==100)
			$("#arrow").hide();
		balPos=-100;
		temp=1;
		$("#baloon img").attr("src","images/baloon.jpg");
	}
}
function setPlayArea() {
	winH = $(window).height()-68;
	winW = $(window).width()-10;
	$("#playArea").css("height", winH);
	$("#playArea").css("width", winW);	
	$("#baloon").css("left",winW - 100);
	$("#baloon").css("top",balPos);
	setArrowPos();
	//$("#arrow").hide();
}