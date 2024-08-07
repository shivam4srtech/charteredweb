// Firm Tab content 
    document.addEventListener('DOMContentLoaded', function() {
    const tabLinks = document.querySelectorAll('.tab-link');
    const tabContents = document.querySelectorAll('.row');

    tabLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            tabLinks.forEach(link => link.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            this.classList.add('active');
            const tabId = this.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
});


// compare card animation
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= window.innerHeight &&
            rect.bottom >= 0
        );
    }
    function handleScroll() {
        const cards = document.querySelectorAll('.compareCard');
        cards.forEach(card => {
            if (isInViewport(card)) {
                card.classList.add('in-view');
            }
        });
    }
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);


 //toggle detailed price visibility
    document.getElementById('togglePlan').addEventListener('click', function(event) {
        event.preventDefault();
        var planSection = document.querySelector('.choosePlan');
        var linkText = this;

        if (planSection.style.display === 'none' || planSection.style.display === '') {
            planSection.style.display = 'block';
            linkText.textContent = 'Hide Detailed Pricing';
        } else {
            planSection.style.display = 'none';
            linkText.textContent = 'Show Detailed Pricing';
        }
    });


// Procedure Accordian
  $(document).ready(function() {
    $(".accordion-header").click(function() {
      $(this).toggleClass("active");
      var content = $(this).next(".accordion-content");

      if ($(this).hasClass("active")) {
        content.css({
          "height": content.prop('scrollHeight') + "px",
          "padding-top": "15px",
          "padding-bottom": "15px"
        });
      } else {
        content.css({
          "height": 0,
          "padding-top": 0,
          "padding-bottom": 0
        });
      }
    });
  });



//Contact Us 
const inputs = document.querySelectorAll(".input");

function focusFunc() {
let parent = this.parentNode;
parent.classList.add("focus");
}

function blurFunc() {
let parent = this.parentNode;
if (this.value == "") {
    parent.classList.remove("focus");
}
}

inputs.forEach((input) => {
input.addEventListener("focus", focusFunc);
input.addEventListener("blur", blurFunc);
}); 


// FAQ Script 
function toggleRow(rowId) {
    const detailRows = document.querySelectorAll(`tr[data-parent="${rowId}"]`);
    const mainRow = document.querySelector(`tr[onclick="toggleRow(${rowId})"] .expand-icon`);
    let isExpanded = false;
    detailRows.forEach(row => {
        row.classList.toggle('hidden');
        if (!row.classList.contains('hidden')) {
            isExpanded = true;
        }
    });                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
    mainRow.textContent = isExpanded ? '-' : '+';
}
