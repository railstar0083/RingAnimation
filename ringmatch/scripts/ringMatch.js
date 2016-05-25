function jasonRings (element, options) {


//set defaults
//var [Variable Name] = options.[Local Variable Name] || [Default State];

var ringCount = options.ringCount || 3;
var matchNum = options.matchNum || 2;
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
var usedValues = [];
var randomnumber = null;
var flips = 0;

/************
Build the structure
*************/
var game = $(element);
game.addClass("Rings");

//Create Outer Ring wrapper
$(".Rings").append("<div class='ringWrapper'></div>");

//Create rings
for (i = 0; i <= ringCount-1; i++){
	$(".ringWrapper").append("<div class='containerBox' id='ring_"+i+"'><div class='outerRing outerRingLeft animated'></div><div class='outerRing outerRingRight animated'></div><div class='innerRing animated'><div class='innerRingFront animated'></div></div></div>");
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

/*******************
Assign Winning Rings
*******************/
if (matchNum > ringCount){
	alert("You can not have more matches than rings.  Please check your configuarion.")
}else {
	for (i = 0; i <= matchNum-1; i++ ){
		randomnumber = Math.floor(Math.random() * (ringCount));
		if (usedValues.indexOf(randomnumber) == -1 ){
			usedValues.push(randomnumber);
		} else {
			i = i - 1;
		}
		//alert(randomnumber);
	};
	//alert(usedValues.toString());
	//Win-Lose
	$(".containerBox").each( function() {
		//Get the ID of this card
		var a = $(this).attr("id");
		//Parse out the number in the ID
		var ringID = a.match(/\d+/);
		ringID = parseInt(ringID);
		//alert(cardID);
		if (!(usedValues.indexOf(ringID) == -1) ) {
			$('#'+a+' > .innerRing .innerRingFront').addClass("winCard");
			$('#'+a+' > .innerRing .innerRingFront').attr("style", "background: url(./images/"+cardFrontWin+") center no-repeat; background-size: 100%");
		} else {
			$('#'+a+' > .innerRing .innerRingFront').addClass("loseCard");
			$('#'+a+' > .innerRing .innerRingFront').attr("style", "background: url(./images/"+cardFrontLose+") center no-repeat; background-size: 100%");
		}
	});
}//end assign cards


	
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
		$('.innerRingFront', context).addClass("frontflip");
		flips = flips + 1;
		if (flips == ringCount){
			$("#jasonWin").html(winMSG);
			$("#jasonWin").addClass("bounceIn");
		}
	}, 2001);
});


}//End Function