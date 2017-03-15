(function(){
	// radio
	$.fn.formRadio = function(){
		return this.each(function(){
			var $this = $(this);
			if($(this).is(":hidden")) return;
			var $wrap = $this.addClass("hidden").wrap('<span class="formRadio"></span>').parent();
			if($this.is(":checked")) $this.parent().addClass("formRadioCurr");
			$wrap.on("click",function(){
				$this.prop("checked",true);
				$("input[name=" + $this.attr("name") + "]").parent().removeClass("formRadioCurr");
				$(this).addClass("formRadioCurr");
			});
		});
	}
	//checkbox
	$.fn.formCheckBox = function(){
		return this.each(function(){
			if($(this).is(":hidden")) return;
			var $this = $(this);
			var $wrap = $this.addClass("hidden").wrap('<span class="formCheckBox"></span>').parent();
			if($this.is(":checked")) $this.addClass("hidden").parent().addClass("formCheckBoxCurr");
			$wrap.on("click",function(){
				if($(this).hasClass("formCheckBoxCurr")){
					$this.prop("checked",false);
					$(this).removeClass("formCheckBoxCurr");
				}else {
					$this.prop("checked",true);
					$(this).toggleClass("formCheckBoxCurr");
				}
			});
		});
	}
	//select
	$.fn.formSelect = function(){
		return this.each(function(){
			var $this = $(this);
			if($this.is(":hidden")) return;
			if($this.attr("multiple") == "multiple") return;

			var $wrap = $this.addClass("hidden").wrap('<div class="fromSelect"></div>').parent();
			$wrap.prepend('<em></em><i></i>').width($this.width());
			var html = '<ul>'
			$("option",$this).each(function(){
				html += '<li index="' + $(this).attr("id") + '">' + $(this).text() + '</li>';
			});
			html += '</ul>';
			$this.before(html);
			//$("i",$wrap).after(html);
			var $oUl = $("ul",$wrap);
			$wrap.on("click","em,i",function(event){
				event.stopPropagation();
				if($("li",$oUl).length > 5){
					$oUl.css({
						height : "160",
						overflow : "auto"
					});
				}
				$(".fromSelect ul").stop(true,false).slideUp();
				$oUl.slideDown();
				return false;
			});
			$("li",$oUl).on("click",function(){
				var index = $(this).index();
				$("option",$this).eq(index).prop("selected",true);
				$("em",$wrap).text($(this).text());
				$(this).addClass("curr").siblings().removeClass("curr").parent().slideUp();
			});
			$("li",$oUl).eq(0).trigger("click");

			$(document).on("click",function(){
				$oUl.slideUp();
			});

		});


	}
	
	
	
	
	//jqForm
	$.fn.jqForm = function(){
		$("input:radio").formRadio();
		$("input:checkbox").formCheckBox();
		$("select").formSelect();
	}
})(jQuery);

