var main = function() {
	var wtimeInterval = 0; var btimeInterval = 0;
	var mins = 0; var secs = 0;
	var intervalId = 0;
	var breakTime = 0; var workTime = 0;
	var sound = new Audio("alarm.mp3");
	
	function PlaySound() {
		sound.play();
	}

	if(mins < 10) {$('.minutes').html("0" + mins);}
	else {$('.minutes').html(mins);}
	if(secs < 10) {$('.seconds').html("0" + secs);}
	else {$('.seconds').html(secs);}

	$('.workPlus').on('click', function(){
		wtimeInterval += 5;
		$('.wtimeInterval').html(wtimeInterval);
	});
	$('.workMinus').on('click', function(){
		wtimeInterval -= 5;
		if (wtimeInterval < 0) {wtimeInterval = 0;}
		$('.wtimeInterval').html(wtimeInterval);
	});
	$('.breakPlus').on('click', function(){
		btimeInterval += 5;
		$('.btimeInterval').html(btimeInterval);
	});
	$('.breakMinus').on('click', function(){
		btimeInterval -= 5;
		if (btimeInterval < 0) {btimeInterval = 0;}

		$('.btimeInterval').html(btimeInterval);
	});


	$('.play').on('click', function(){
		if(wtimeInterval != 0 && workTime == 0){
			workTime = 1;

			$('body').animate({'opacity':'0'}, 'slow');
			$('body').addClass('workStyle');
			$('body').animate({'opacity':'1'}, 'slow');
								
			intervalId = setInterval(function(){
				secs += 1;

				if(secs == 60) {mins += 1; secs = 0;}

				if(mins == (wtimeInterval - 1)) {
					if(secs == 50) {PlaySound();}
					if(secs >= 50) {
						$('.seconds').animate({'opacity':'0'}, 'fast');
						$('.seconds').animate({'opacity':'1'}, 'fast');
						$('.minutes').animate({'opacity':'0'}, 'slow');
						$('.minutes').animate({'opacity':'1'}, 'slow');
					}
				}

				if (mins == wtimeInterval) {
					clearInterval(intervalId); 

					workTime = 0; breakTime = 1;
					mins = 0; secs = 0;

					$('body').removeClass('workStyle');
					$('body').animate({'opacity':'0'}, 'slow');
					$('body').addClass('breakStyle');
					$('body').animate({'opacity':'1'}, 'slow');

					intervalId = setInterval(function(){
						secs += 1;

						if(secs == 60) {mins += 1; secs = 0;}

						if((mins == (btimeInterval - 1)) && (secs == 50)) {PlaySound();}

						if (mins == btimeInterval) {
							clearInterval(intervalId);

							workTime = 0; breakTime = 0;
							mins = 0; seconds = 0;

							$('body').removeClass('breakStyle');
							$('body').animate({'opacity':'0'}, 'slow');
							$('body').addClass('timeoutStyle');
							$('body').animate({'opacity':'1'}, 'slow');
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
		$('body').animate({'opacity':'0'}, 'slow');
		$('body').addClass('resetStyle');
		$('body').animate({'opacity':'1'}, 'slow');

		$('title').html("Pomodoro Clock");
		if(mins < 10) {$('.minutes').html("0" + mins);}
		else {$('.minutes').html(mins);}
		if(secs < 10) {$('.seconds').html("0" + secs);}
		else {$('.seconds').html(secs);}
	});	
};

$('document').ready(main);