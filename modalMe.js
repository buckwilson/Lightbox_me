
/*
 * $Revision$
 * $Date$
 *
 * Copyright (C) 1999-2009 Jive Software. All rights reserved.
 *
 * This software is the proprietary information of Jive Software. Use is subject to license terms.
 */

/*
* $ lightbox_me
* By: Buck Wilson
* Version : 2.0
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*     http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/


(function($) {

    $.fn.modal = function(options) {
	
		return this.each(function() {
		
			var 
				o	 		= $.extend({}, $.fn.modal.defaults, options),
				$overlay 	= $(),
				$outer 		= $(),
				$inner 		= $(),
				$self 		= $(this),
				$parent 	= $self.parent(),
				$ie7 		= ($.browser.msie && parseInt($.browser.version, 10) ===7),
				prefix		= "",
				endEvent	= "animationend";
		
		
		
			/*----------------------------------------------------
				Build DOM
			---------------------------------------------------- */
			
			$overlay = $('<div class="overlay"/>');
			$outer = $('<div class="outer"/>');
			$wrap = $('<div class="wrap"/>');
			$inner = $('<div class="inner"/>');
		
			$('body').css('overflow', 'hidden');
		

			$wrap.append($outer.append($inner));
			$('body').append($overlay).append($wrap);
			
			/* Show modal */
			$inner.append($self.css('display', 'inline-block'));
			
			/* invoke animation */
			setTimeout(function() { $overlay.add($self).addClass(o.appearClass); }, 0); // setTimeout in case the animation is inline and not keyframed
			
			
			/* TODO: 
				For IE7, we have to handle these things:
				- height of overlay = height of window
				- height of modal, ??
			*/

			/* TODO:
				handle case where there already exists a lightbox
			*/

			/*----------------------------------------------------
				Bind Events
			---------------------------------------------------- */

			$self.delegate(o.closeSelector, "click", function(e) {
				closeModal(); e.preventDefault();
			})
			
			
			
			function closeModal() {
				/* invoke CSS3 animation */
				$self.add($overlay).removeClass(o.appearClass).addClass(o.exitClass);
				
				$self.add($overlay).one('webkitAnimationEnd', function() {
					/* remove exit animation class and hide the ele */
					$self.add($overlay).removeClass(o.exitClass).hide();
					
					cleanUp();
				});
				
			
				
			};
			
			function cleanUp() {
				/* put the ele back */
				if ($parent.length > 0) {
					$parent.append($self); // there's probably a better way to do this?
				} else {
					$('body').append($self);
				}
				
				$wrap.remove();

			}
			
		});
	
	
	};
	
	$.fn.modal.defaults = {
		
		// CSS3 animation options
		animateCSS: true,				// TODO
		appearClass: 'appear',
		exitClass: 'exit',
		
		// close 
		closeSelector: '.close',		
		closeOverlay: true,				// TODO
		closeEsc: true,					// TODO
		
		// behavior 
		destroyOnClose: false, 			// TODO
		showOverlay: true, 				// TODO
		
		// callbacks
		onLoad: function() {},			// TODO
		onClose: function() {},			// TODO
		
		// style
		classPrefix: 'm'				// TODO
		
      
    }
	
	
})(jQuery);