var daumenkino;

$(document).ready(function() {
	(function getGifFromUrl() {
		if (location.hash.length > 0) {
			var gifUrl = location.hash.replace("#", "");
			$("x-gif").attr("src", gifUrl);
		}
	}());

	function xgif($frames) {
		if($frames.length <= 0) {
			return;
		} 

		var nrOfFrames = $frames.find("img").length,
			currentFrame = 0;
		return {
			getNrOfFrames: function() {
				return nrOfFrames;
			},
			setFrame: function(frame) {
				if (frame < 0 || frame >= nrOfFrames) {
					return false;
				}
				$frames.attr("data-frame", frame);
				currentFrame = frame;
			},
			reset: function() {
				$frames.attr("data-frame", 0);
				currentFrame = 0;
			}
		}
	}

	(function initDaumenkino() {
		daumenkino = xgif($("x-gif::shadow #frames"));
		if (!daumenkino || !daumenkino.getNrOfFrames || daumenkino.getNrOfFrames() == 0) {
			setTimeout(function() {
				initDaumenkino();
			}, 1000);
		} else {
			console.log("daumenkino ready!");
			daumenkino.setFrame(0);
		}
	}());

	var element = document.getElementById('daumenkinoFront');
    var hammertime = Hammer(element).on("hammer.input", function(event) {
        if (event.isFinal) {
        	daumenkino.reset();
        } else {
        	var newFrame = parseInt(event.deltaX / 5);
        	daumenkino.setFrame(newFrame);
        }
    });

});