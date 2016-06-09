var main = function() {
	var wtimeInterval = 0; var btimeInterval = 0;
	var mins = 0; var secs = 0;
	var intervalId = 0;
	var breakTime = 0; var workTime = 0;
	var sound = new Audio("alarm.mp3");
	
	if(mins < 10) {$('.minutes').html("0" + mins);}
	else {$('.minutes').html(mins);}
	if(secs < 10) {$('.seconds').html("0" + secs);}
	else {$('.seconds').html(secs);}

	function PlaySound() {
		sound.play();
	}

	$('.wplus').on('click', function(){
		wtimeInterval += 5;
		$('.wtimeInterval').html(wtimeInterval);
	});
	$('.wminus').on('click', function(){
		wtimeInterval -= 5;
		if (wtimeInterval < 0) {wtimeInterval = 0;}

		$('.wtimeInterval').html(wtimeInterval);
	});
	$('.bplus').on('click', function(){
		btimeInterval += 5;
		$('.btimeInterval').html(btimeInterval);
	});
	$('.bminus').on('click', function(){
		btimeInterval -= 5;
		if (btimeInterval < 0) {btimeInterval = 0;}

		$('.btimeInterval').html(btimeInterval);
	});


	$('.play').on('click', function(){
		if(wtimeInterval != 0 && workTime == 0){
			workTime = 1;

			$('body').addClass('workStyle');
								
			intervalId = setInterval(function(){
				secs += 1;

				if(secs == 60) {mins += 1; secs = 0;}

				if((mins == (wtimeInterval - 1)) && (secs == 50)) {PlaySound();}

				if (mins == wtimeInterval) {
					clearInterval(intervalId); 

					workTime = 0; breakTime = 1;
					mins = 0; secs = 0;

					$('body').removeClass('workStyle');
					$('body').addClass('breakStyle');

					intervalId = setInterval(function(){
						secs += 1;

						if(secs == 60) {mins += 1; secs = 0;}

						if((mins == (btimeInterval - 1)) && (secs == 50)) {PlaySound();}

						if (mins == btimeInterval) {
							clearInterval(intervalId);

							workTime = 0; breakTime = 0;
							mins = 0; seconds = 0;

							$('body').removeClass('breakStyle');
							$('body').addClass('timeoutStyle');
						}

						$('title').html(mins + ":" + secs + " | Break Time");
						if(workTime == 0 && breakTime == 0) {$('title').html("Break Time Over");}

						if(mins < 10) {$('.minutes').html("0" + mins);}
						else {$('.minutes').html(mins);}
						if(secs < 10) {$('.seconds').html("0" + secs);}
						else {$('.seconds').html(secs);}
					}, 1000);
				}

				$('title').html(mins + ":" + secs + " | Work Time");
				if(mins < 10) {$('.minutes').html("0" + mins);}
				else {$('.minutes').html(mins);}
				if(secs < 10) {$('.seconds').html("0" + secs);}
				else {$('.seconds').html(secs);}
			}, 1000);
		}
					
	});

	$('.reset').on('click', function(){
		clearInterval(intervalId);
		mins = 0; secs = 0;
		workTime = 0; breakTime = 0;

		$('body').removeClass('workStyle');
		$('body').removeClass('breakStyle');
		$('body').removeClass('timeoutStyle');
		$('body').addClass('resetStyle');

		$('title').html("Pomodoro Clock");
		if(mins < 10) {$('.minutes').html("0" + mins);}
		else {$('.minutes').html(mins);}
		if(secs < 10) {$('.seconds').html("0" + secs);}
		else {$('.seconds').html(secs);}
	});
	

	$('.wplus').hover(
		function() {
			$('.wtime').css({"color":"white"});
			$('.wplus').animate({'font-size':'60px'}, 'fast');
		},
		function() {
			$('.wtime').css({"color":"rgba(1, 1, 1, 0)"});
			$('.wplus').animate({'font-size':'50px'}, 'fast');
		}
	);
	$('.bplus').hover(
		function() {
			$('.btime').css({"color":"white"});
			$('.bplus').animate({'font-size':'60px'}, 'fast');
		},
		function() {
			$('.btime').css({"color":"rgba(1, 1, 1, 0)"});
			$('.bplus').animate({'font-size':'50px'}, 'fast');
		}
	);
	$('.wminus').hover(
		function() {
			$('.wtime').css({"color":"white"});
			$('.wminus').animate({'font-size':'60px'}, 'fast');
		},
		function() {
			$('.wtime').css({"color":"rgba(1, 1, 1, 0)"});
			$('.wminus').animate({'font-size':'50px'}, 'fast');
		}
	);
	$('.bminus').hover(
		function() {
			$('.btime').css({"color":"white"});
			$('.bminus').animate({'font-size':'60px'}, 'fast');
		},
		function() {
			$('.btime').css({"color":"rgba(1, 1, 1, 0)"});
			$('.bminus').animate({'font-size':'50px'}, 'fast');
		}
	); 

	$('.play').hover(
		function() {
			$('.play').animate({'font-size':'60px'}, 'fast');
		},
		function() {
			$('.play').animate({'font-size':'50px'}, 'fast');
		}
	);
	$('.reset').hover(
		function() {
			$('.reset').animate({'font-size':'60px'}, 'fast');
		},
		function() {
			$('.reset').animate({'font-size':'50px'}, 'fast');
		}
	);
};

$('document').ready(main);