// Navbar scrollUp and down
  document.addEventListener("DOMContentLoaded", function(){

  el_autohide = document.querySelector('.autohide');

  navbar_height = document.querySelector('.customeNav').offsetHeight;
  document.body.style.paddingTop = navbar_height + '-2px';

  if(el_autohide){
  var last_scroll_top = 0;
  window.addEventListener('scroll', function() {
          let scroll_top = window.scrollY;
      if(scroll_top < last_scroll_top) {
              el_autohide.classList.remove('scrolled-down');
              el_autohide.classList.add('scrolled-up');
          }
          else {
              el_autohide.classList.remove('scrolled-up');
              el_autohide.classList.add('scrolled-down');
          }
          last_scroll_top = scroll_top;
  }); 
  }
  }); 
//logo Slider.......
// $(document).ready(function() {
//     $('#logo-slider').slick({
//       slidesToShow: 3,
//       slidesToScroll: 1,
//       autoplay: true,
//       autoplaySpeed: 2000
//     });
//   });
//   *************Number counter*********************
// function visible(partial) {
//     var $t = partial,
//         $w = jQuery(window),
//         viewTop = $w.scrollTop(),
//         viewBottom = viewTop + $w.height(),
//         _top = $t.offset().top,
//         _bottom = _top + $t.height(),
//         compareTop = partial === true ? _bottom : _top,
//         compareBottom = partial === true ? _top : _bottom;

//     return ((compareBottom <= viewBottom) && (compareTop >= viewTop) && $t.is(':visible'));

// }
// $(window).scroll(function(){

//   if(visible($('.count-digit')))
//     {
//       if($('.count-digit').hasClass('counter-loaded')) return;
//       $('.count-digit').addClass('counter-loaded');
      
// $('.count-digit').each(function () {
//   var $this = $(this);
//   jQuery({ Counter: 0 }).animate({ Counter: $this.text() }, {
//     duration: 5000,
//     easing: 'swing',
//     step: function () {
//       $this.text(Math.ceil(this.Counter));
//     }
//   });
// });
//     }
// })
// Navbar toggle visibility on hover
document.addEventListener("DOMContentLoaded", function() {
      const toggleGroups = document.querySelectorAll('.toggle-group');

      toggleGroups.forEach(function(group) {
        const toggleDivs = group.querySelectorAll('.toggle-menuItem');

        toggleDivs.forEach(function(toggleDiv) {
          toggleDiv.addEventListener("mouseover", function() {
            const targetId = toggleDiv.getAttribute('data-target');
            const targetDiv = group.querySelector('#' + targetId);

            group.querySelectorAll('.toggle-content').forEach(function(div) {
              if (div !== targetDiv) {
                div.style.display = 'none';
              }
            });

            targetDiv.style.display = 'block';

            group.querySelectorAll('.toggle-menuItem').forEach(function(anchor) {
              anchor.classList.remove('active');
            });

            toggleDiv.classList.add('active');
          });
        });
      });
    });


		