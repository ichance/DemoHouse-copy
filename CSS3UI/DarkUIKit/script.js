var EventUtil = {
	addHandler : function(element,type,handler) {
		if (element.addEventListener) {
			element.addEventListener(type,handler,false);
		} else if(element.attachEvent) {                                 /*IE7~8*/
			element.attachEvent("on" + type,handler);
		} else {
			element["on" + type] = handler;
		}
	},
	removeHandler : function(element,type,handler) {
		if (element.removeEventListener) {
			element.removeEventListener(type,handler,false);
		} else if (element.detachEvent) {
			element.detachEvent("on" + type,handler);
		} else {
			element["on" + type] = null;
		}
	},
	getEvent : function(event) {
		return event ? event : window.event;
	},
	getTarget : function(event) {
		return event.target || event.srcElement; /*"srcElement" for IE7~8*/
	},
	preventDefault : function(event) {
		if (event.preventDefault) {
			event.preventDefault();
		} else {
			event.returnValue = false;
		}
	}
};
function $(element,selector) {
	if(arguments.length==1) {
		return document.querySelectorAll(element).length==1 ? document.querySelector(element) : document.querySelectorAll(element);
	} else {
		return element.querySelectorAll(selector).length==1 ? element.querySelector(selector) : element.querySelectorAll(selector);
	}
}
function addClass(element,className) {
		var totalClass = element.className + " " + className;
		element.className = totalClass;
}
function removeClass(element,className) {
	var origClass = element.className;
	var pos = origClass.indexOf(className);
	if (pos>-1) {
		var re = origClass.indexOf(" ") != -1 ? 
					new RegExp(" " + className,"g") : new RegExp(className,"g");
		element.className = origClass.replace(re,"");
	}
}
function getPosition(element){
    var dc = document,
        rec = element.getBoundingClientRect(),
        _x = rec.left, // 获取元素相对浏览器视窗window的左、上坐标
        _y = rec.top;
    
    // 与html或body元素的滚动距离相加就是元素相对于文档区域document的坐标位置
    _x +=  dc.documentElement.scrollLeft || dc.body.scrollLeft;
    _y +=  dc.documentElement.scrollTop || dc.body.scrollTop;

    return {
        left: _x,
        top: _y
    };
}
function getDataAttr(ele,attr) {
	return (!!ele.dataset) ? ele.dataset[attr] : ele.getAttribute("data-" + attr);
}

/*The sliderbar*/
(function(){
	var sliderbar = document.querySelectorAll(".sliderbar");
	for (var i = 0, len = sliderbar.length; i < len; i++) {
		EventUtil.addHandler(sliderbar[i],"mousedown",startDrag);
	}

	function startDrag(e) {
		var e = EventUtil.getEvent(e);
		EventUtil.preventDefault(e);                           /*可以消除拖动元素时出现的禁止操作手势*/
		var target = EventUtil.getTarget(e),
			parent;

		if (target.nodeName.toLowerCase()!="a") {
			return;
		} else {
			parent = target.parentNode;
		}

		var type = getDataAttr(parent,"type"),
			sliderRange = parent.getElementsByTagName("div")[0],
			origX = e.clientX,
			origLeft = target.offsetLeft,
			origRangeWidth = sliderRange.clientWidth,
			anotherHandle,
			HandleLeft = parent.getElementsByTagName("a")[0],
			HandleRight = parent.getElementsByTagName("a")[1];

		EventUtil.addHandler(document,"mousemove",doDrag);
		EventUtil.addHandler(document,"mouseup",stopDrag);
		function doDrag(e) {
			var e = EventUtil.getEvent(e),
				curX = e.clientX,
				curLeft,
				maxLeft,
				maxRight;

			EventUtil.preventDefault(e);

			if (type=="bothway") {
				var temp;
				if (parent.className.match(/show-value/g)) {
					temp = 20;
				} else {
					temp = 10;
				}
				maxLeft = target===HandleLeft ? - temp : HandleLeft.offsetLeft;
				maxRight = target===HandleLeft ? HandleRight.offsetLeft : parent.clientWidth - temp;
				curLeft = curX - origX + origLeft;

				if (curLeft<maxLeft) {
					curLeft = maxLeft;
				} else if (curLeft>maxRight) {
					curLeft = maxRight;
				}
				if (target===HandleLeft) {
					sliderRange.style.left = target.style.left = curLeft + temp + "px";
				} else {
					target.style.left = curLeft + temp + "px";
				}
				curWidth = HandleRight.offsetLeft - HandleLeft.offsetLeft;
				sliderRange.style.width = curWidth + "px";
			} else {
				curLeft = curX - origX + origLeft + 10;
				(curLeft < 0)&&(curLeft = 0);
				(curLeft > parent.clientWidth)&&(curLeft = parent.clientWidth);
				target.style.left = curLeft + "px";
				sliderRange.style.width = curLeft + "px";
			}
		}
		function stopDrag(e) {
			EventUtil.removeHandler(document,"mousemove",doDrag);
			EventUtil.removeHandler(document,"mouseup",stopDrag);
			if (type=="oneway") {
				return
			} else if(target.style.zIndex < 2) {
				anotherHandle = target===HandleLeft ? HandleRight : HandleLeft;
				exchangeCascadingOrder(target,anotherHandle);
			}
		}
		function exchangeCascadingOrder(activedHandle,anotherHandle) {
			activedHandle.style.zIndex = 2;
			anotherHandle.style.zIndex = 1;
		}
	}
})();
/*The select*/
(function(){
	var selectRes = document.querySelector(".select");
	var optionsWrapper = selectRes.querySelector("ul");
	var selected = selectRes.querySelector(".value");
	var dropped = true;
	EventUtil.addHandler(selectRes,"click",function(){
		if (!dropped) {
			optionsWrapper.style.display = "block";
			dropped = true;
		} else {
			optionsWrapper.style.display = "none";
			dropped = false;
		}
	});
	EventUtil.addHandler(optionsWrapper,"click",function(e){
		var target = EventUtil.getTarget(e);
		var select = selectRes.querySelector("select");
		var seleOptIndex;
		switch(target.className) {
			case "option o1" :
			seleOptIndex = 1;
			break;
			case "option o2" :
			seleOptIndex = 2;
			break;
			case "option o3" :
			seleOptIndex = 3;
			break;
			case "option o4" :
			seleOptIndex = 4;
			break;
		}
		select.selectedIndex = seleOptIndex -1 ;
		selected.innerHTML = select.value;
	});
})();
/*The Carousel*/
(function(){
	var carousel = document.getElementById("myCarousel"),
		carlIndicators = $(carousel,".carousel-indicators"),
		carlItems = $(carousel,".carousel-inner"),
		leftControl = $(carousel,".left"),
		rightControl = $(carousel,".right"),
		isSliding = false;

	var t = carlIndicators.querySelector("li");
	EventUtil.addHandler(leftControl,"click",function(e) {
		if (isSliding) {
			return false;
		} else {
			isSliding = true;
			var curIndicator = $(carlIndicators,".active");
			var prevIndicatorIndex;
			prevIndicatorIndex = curIndicator.previousElementSibling != null ?
									getDataAttr(curIndicator.previousElementSibling,"reference"): 
									getDataAttr(curIndicator.parentNode.lastElementChild,"reference");
			backTo(prevIndicatorIndex);
		}
	});
	EventUtil.addHandler(rightControl,"click",function(e) {
		if (isSliding) {
			return false;
		} else {
			isSliding = true;
			var curIndicator = $(carlIndicators,".active");
			var nextIndicatorIndex;
			nextIndicatorIndex = curIndicator.nextElementSibling != null ?
									getDataAttr(curIndicator.nextElementSibling,"reference") : 
									getDataAttr(curIndicator.parentNode.firstElementChild,"reference");
			forwardTo(nextIndicatorIndex);
		}
		
	});
	EventUtil.addHandler(carlIndicators,"click",function(e) {
		if (isSliding) {
			return false;
		} else {
			var target = EventUtil.getTarget(e);
			if (target.nodeName.toLowerCase()=="li") {
				isSliding = true;
				var curIndex = getDataAttr($(carlIndicators,".active"),"reference");
				var targetIndex = getDataAttr(target,"reference");
				var diff = targetIndex - curIndex;
				switch(true) {
					case diff < 0 :
						backTo(targetIndex);
						break;
					case diff > 0 :
						forwardTo(targetIndex);
						break;
					default :
						isSliding = false;
				}
			}
		}
	});
	function forwardTo(index) {
		var curItem = $(carlItems,".active");
		var curIndicator = $(carlIndicators,".active");
		var targetItem = carlItems.children[index-1];
		var	targetIndicator = carlIndicators.children[index-1];

		addClass(targetItem,"next");
		setTimeout(function(){
			addClass(curItem,"left");
			addClass(targetItem,"left");
			removeClass(curIndicator,"active");
			addClass(targetIndicator,"active");
			setTimeout(function(){
				removeClass(curItem,"active");
				removeClass(curItem,"left");
				addClass(targetItem,"active");
				removeClass(targetItem,"next");
				removeClass(targetItem,"left");
				isSliding = false;
			},600);
		},0);
	}
	function backTo(index) {
		var curItem = $(carlItems,".active");
		var curIndicator = $(carlIndicators,".active");
		var targetItem = carlItems.children[index-1];
		var	targetIndicator = carlIndicators.children[index-1];

		addClass(targetItem,"prev");
		setTimeout(function(){
			addClass(curItem,"right");
			addClass(targetItem,"right");
			removeClass(curIndicator,"active");
			addClass(targetIndicator,"active");
			setTimeout(function(){
				removeClass(curItem,"active");
				removeClass(curItem,"right");
				addClass(targetItem,"active");
				removeClass(targetItem,"prev");
				removeClass(targetItem,"right");
				isSliding = false;
			},600);
		},0);
	}
})();
/*The Video*/
(function(){
	var video = $("#myVideo video"),
		video_controls = $("#myVideo .control"),
		progress_base_bar = $(video_controls,".progress .base-bar"),
		progress_bar = $(progress_base_bar,".progress-bar"),
		volum_base_bar = $(video_controls,".volum .base-bar"),
		volum_bar = $(volum_base_bar,".progress-bar"),
		btn_play = $("#myVideo .btn-play");

	EventUtil.addHandler(btn_play,"click",play);
	EventUtil.addHandler(progress_base_bar,"click",seeking);
	EventUtil.addHandler(video,"timeupdate",function(){
		var duration = this.duration;
		var curTime = this.currentTime;
		var percentage = curTime/duration;
		progress_bar.style.width = (progress_base_bar.offsetWidth-4)*percentage + "px"; 
	});

	EventUtil.addHandler(volum_base_bar,"click",function(e){
		var posX = e.clientX,
			targetLeft = getPosition(this).left,
			posLeft = posX - targetLeft - 2;
			posLeft <= 0 && (posLeft = 0);
		var percentage = posLeft/(this.offsetWidth-4);
		percentage >= 1 && (percentage = 1);
		changeVolumTo(percentage);
	});

	EventUtil.addHandler($(video_controls,".volume-decrease"),"click",function(){
		var volume = video.volume - 0.1;
			volume < 0 && (volume = 0);
			changeVolumTo(volume);
	})
	EventUtil.addHandler($(video_controls,".volume-increase"),"click",function(){
		var volume = video.volume + 0.1;
			volume > 1 && (volume = 1);
			changeVolumTo(volume);
	})
	EventUtil.addHandler(video,"play",function(){
		btn_play.innerHTML = "w";
	});
	EventUtil.addHandler(video,"pause",function(){
		btn_play.innerHTML = "t";
	});
	function seeking(e) {
		var posX = e.clientX,
			targetLeft = getPosition(this).left,
			posLeft = posX - targetLeft - 2;
			posLeft <= 0 && (posLeft = 0);
		var percentage = posLeft/(this.offsetWidth-4);
		percentage >= 1 && (percentage = 1);
		seekTo(percentage);
	}
	function seekTo(percentage) {
		video.currentTime = video.duration * percentage;
		progress_bar.style.width = (progress_base_bar.offsetWidth-4)*percentage + "px";
	}
	function changeVolumTo(percentage) {
		video.volume = percentage;
		volum_bar.style.width = (volum_base_bar.offsetWidth-4)*percentage + "px";
	}
	function play(e) {
		if (video.paused) {
			video.play();
		} else {
			video.pause();
		}
	}
	
})()
