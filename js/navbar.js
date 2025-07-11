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
    // Mobile Nav
    function toggleMobileDropdown(event) {
      document.querySelectorAll('.mobile-dropdown').forEach(dropdown => {
          if (dropdown !== event.currentTarget.parentNode) {
              dropdown.classList.remove('show');
              dropdown.querySelector('.mobile-dropdown-arrow svg').classList.remove('rotate');
          }
      });

      var dropdown = event.currentTarget.parentNode;
      dropdown.classList.toggle('show');
      var arrow = dropdown.querySelector('.mobile-dropdown-arrow svg');
      arrow.classList.toggle('rotate');
  }

  window.onclick = function(event) {
      if (!event.target.matches('.mobile-dropdown-button') && !event.target.closest('.mobile-dropdown')) {
          var dropdowns = document.getElementsByClassName("mobile-dropdown");
          for (var i = 0; i < dropdowns.length; i++) {
              var openDropdown = dropdowns[i];
              if (openDropdown.classList.contains('show')) {
                  openDropdown.classList.remove('show');
                  openDropdown.querySelector('.mobile-dropdown-arrow svg').classList.remove('rotate');
              }
          }
      }
  }

  //share page
  document.addEventListener("DOMContentLoaded", function () {
      const pageUrl = encodeURIComponent(window.location.href);
      const pageTitle = encodeURIComponent(document.title);

      const platforms = ["facebook", "twitter", "whatsapp", "linkedin"];
      const shareLinks = {
          facebook: `https://www.facebook.com/sharer/sharer.php?u=${pageUrl}`,
          twitter: `https://twitter.com/intent/tweet?url=${pageUrl}&text=${pageTitle}`,
          whatsapp: `https://wa.me/?text=${pageTitle}%20${pageUrl}`,
          linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${pageUrl}`
      };

      document.querySelectorAll(".shareLinks a").forEach((anchor, index) => {
          let platform = platforms[index];
          if (platform) {
              anchor.setAttribute("data-platform", platform);
              anchor.setAttribute("href", shareLinks[platform]);
              anchor.setAttribute("target", "_blank");
          }
      });
  });
