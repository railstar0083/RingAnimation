function jasonRings (element, options) {


//set defaults
//var [Variable Name] = options.[Local Variable Name] || [Default State];

var ringCount = options.ringCount || 1;
var ringDimensions = options.ringDimensions || 220;
var outerRingWidth = options.outerRingWidth || 20;
var winMSG = options.winMessage || "You're a Winner!!";
var loseMSG = options.loseMessage || "You Lose!!";
var cardBack = options.cardBack || "cardback.png";
var cardFrontWin = options.cardFrontWin || "cardfrontwin.png";
var cardFrontLose = options.cardFrontLose || "cardfrontlose.png";

//global variables
var radius = 0;
var containerDim = 0;

/************
Build the structure
*************/
var game = $(element);
game.addClass("Rings");

//Create Outer Ring wrapper
$(".Rings").append("<div class='ringWrapper'></div>");

//Create rings
for (i = 0; i <= ringCount-1; i++){
	$(".ringWrapper").append("<div class='containerBox'><div class='outerRing outerRingLeft animated'></div><div class='outerRing outerRingRight animated'></div><div class='innerRing animated'><div class='innerRingFront animated'></div></div></div>");
}
//create Win/Lose message
$(".Rings").append('<br/><div class="jasonWL animated" id="jasonWin"></div><div class="jasonWL animated" id="jasonLose"></div>');


//set height and width of the rings
$(".containerBox").each( function() {
		$(this).css("height", ""+(ringDimensions + outerRingWidth)+"");
		$(this).css("width", ""+(ringDimensions + outerRingWidth)+"");
		containerDim = (ringDimensions + outerRingWidth);
	});

$(".outerRing").each( function() {
		$(this).css("height", ""+(ringDimensions - outerRingWidth)+"");
		$(this).css("width", ""+((ringDimensions - outerRingWidth) / 2)+"");
		$(this).css("border-top", ""+outerRingWidth+"px solid blue");
		$(this).css("border-bottom", ""+outerRingWidth+"px solid blue");
	});

$(".outerRingLeft").each( function() {
		$(this).css("border-left", ""+outerRingWidth+"px solid yellow");
		$(this).css("border-radius", ""+ringDimensions+"px 0 0 "+ringDimensions+"px");
	});

$(".outerRingRight").each( function() {
		$(this).css("border-right", ""+outerRingWidth+"px solid orange");
		$(this).css("border-radius", "0 "+ringDimensions+"px "+ringDimensions+"px 0");
	});

	
$(".innerRing").each( function() {
		$(this).css("height", ""+(ringDimensions - outerRingWidth)+"");
		$(this).css("width", ""+(ringDimensions - outerRingWidth)+"");
		$(this).css("top", ""+(outerRingWidth)+"px");
		$(this).css("left", ""+(outerRingWidth)+"px");
		
	});


//set inner ring back image
$(".innerRing").css("background", "url(./images/"+cardBack+") center no-repeat");
$(".innerRing").css("background-size", "100%");
	
/****************
Click Behavior
****************/
$(".containerBox").on('click', function(){
	//Flip dat ring!
	$(".outerRingLeft", this).addClass("outerflipL");
	$(".outerRingRight", this).addClass("outerflipR");
	var context = $(this);
	//Outer ring animation
	setTimeout( function(){
		$(".outerRingLeft", context).removeClass("outerflipL").addClass("unlockL");
		$(".outerRingRight", context).removeClass("outerflipR").addClass("unlockR");
	}, 1001);
	//Inner disk animation
	setTimeout( function(){
		$(".innerRing", context).addClass("innerflip");
		$('.innerRingFront', context).attr("style", "background: url(./images/"+cardFrontWin+") center no-repeat; background-size: 100%;");
		$('.innerRingFront', context).addClass("frontflip");
		$("#jasonWin").html(winMSG);
		$("#jasonWin").addClass("bounceIn");
	}, 2001);
	$(".containerBox").css("pointer-events", "none");
});


}//End Function