$(document).ready(function() {
    $('.scroll-to-section2').click(function() {
        var id=$(this).attr('data-id');
        
      $('html, body').animate({
        scrollTop: eval($('#' + id).offset().top - 150)
      }, 800); // Adjust the speed (800ms in this case)
    });
  });
  
          // Compare Topic
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
  
  $(document).ready(function() {
      function updateButtonState(mItems, lp, rp) {
          const newScrollLeft = mItems.scrollLeft(),
              width = mItems.width(),
              scrollWidth = mItems.get(0).scrollWidth;
          const offset = 8;
  
          if (scrollWidth - newScrollLeft - width < offset) {
              rp.addClass("dis");
          } else {
              rp.removeClass("dis");
          }
  
          if (newScrollLeft === 0) {
              lp.addClass("dis");
          } else {
              lp.removeClass("dis");
          }
      }
  
      $(".menu-wrapper").each(function() {
          var $this = $(this);
          var lp = $this.find(".left-pointer");
          var rp = $this.find(".right-pointer");
          var mItems = $this.find(".menu-item");
  
          // Initial button state
          updateButtonState(mItems, lp, rp);
  
          lp.click(function() {
              var sc = mItems.width() - 60;
              var pos = mItems.scrollLeft() - sc;
              mItems.animate({
                  'scrollLeft': pos
              }, 'slow', function() {
                  updateButtonState(mItems, lp, rp);
              });
          });
  
          rp.click(function() {
              var sc = mItems.width() - 60;
              var pos = mItems.scrollLeft() + sc;
              mItems.animate({
                  'scrollLeft': pos
              }, 'slow', function() {
                  updateButtonState(mItems, lp, rp);
              });
          });
  
          mItems.scroll(function() {
              updateButtonState(mItems, lp, rp);
          });
  
          const slider = mItems[0];
          let isDown = false;
          let startX;
          let scrollLeft;
  
          $(slider).on('mousedown', (e) => {
              isDown = true;
              $(slider).addClass('active');
              startX = e.pageX - slider.offsetLeft;
              scrollLeft = slider.scrollLeft;
          });
  
          $(slider).on('mouseleave mouseup', () => {
              isDown = false;
              $(slider).removeClass('active');
          });
  
          $(slider).on('mousemove', (e) => {
              if (!isDown) return;
              e.preventDefault();
              const x = e.pageX - slider.offsetLeft;
              const walk = (x - startX) * 3; // scroll-fast
              slider.scrollLeft = scrollLeft - walk;
          });
  
          function addMenuItem(content) {
              const newItem = $('<li>' + content + '</li>');
              mItems.append(newItem);
              updateButtonState(mItems, lp, rp);
          }
      });
  });
  
  
  
   // Menu slider
          $(document).ready(function() {
              function updateButtonState(mItems, lp, rp) {
                  const newScrollLeft = mItems.scrollLeft(),
                      width = mItems.width(),
                      scrollWidth = mItems.get(0).scrollWidth;
                  const offset = 8;
      
                  if (scrollWidth - newScrollLeft - width < offset) {
                      rp.addClass("dis");
                  } else {
                      rp.removeClass("dis");
                  }
      
                  if (newScrollLeft === 0) {
                      lp.addClass("dis");
                  } else {
                      lp.removeClass("dis");
                  }
              }
      
              $(".menu-wrapper").each(function() {
                  var $this = $(this);
                  var lp = $this.find(".left-pointer");
                  var rp = $this.find(".right-pointer");
                  var mItems = $this.find(".menu-item");
      
                  updateButtonState(mItems, lp, rp);
      
                  lp.click(function() {
                      var sc = mItems.width() - 60;
                      var pos = mItems.scrollLeft() - sc;
                      mItems.animate({
                          'scrollLeft': pos
                      }, 'slow', function() {
                          updateButtonState(mItems, lp, rp);
                      });
                  });
      
                  rp.click(function() {
                      var sc = mItems.width() - 60;
                      var pos = mItems.scrollLeft() + sc;
                      mItems.animate({
                          'scrollLeft': pos
                      }, 'slow', function() {
                          updateButtonState(mItems, lp, rp);
                      });
                  });
      
                  mItems.scroll(function() {
                      updateButtonState(mItems, lp, rp);
                  });
      
                  const slider = mItems[0];
                  let isDown = false;
                  let startX;
                  let scrollLeft;
      
                  $(slider).on('mousedown', (e) => {
                      isDown = true;
                      $(slider).addClass('active');
                      startX = e.pageX - slider.offsetLeft;
                      scrollLeft = slider.scrollLeft;
                  });
      
                  $(slider).on('mouseleave mouseup', () => {
                      isDown = false;
                      $(slider).removeClass('active');
                  });
      
                  $(slider).on('mousemove', (e) => {
                      if (!isDown) return;
                      e.preventDefault();
                      const x = e.pageX - slider.offsetLeft;
                      const walk = (x - startX) * 3; // scroll-fast
                      slider.scrollLeft = scrollLeft - walk;
                  });
      
                  function addMenuItem(content) {
                      const newItem = $('<li>' + content + '</li>');
                      mItems.append(newItem);
                      updateButtonState(mItems, lp, rp);
                  }
              });
          });
  
  $('body').on('keyup','.frm',function(){
      if($(this).val()!==''){
          $(this).attr('style','');
         $(this).css('color','1px solid #e2e2e2 !important');
      }
      if ($(this).val() !== '') {
          $(this).attr('style', 'color: 1px solid #e2e2e2 !important;');  // Apply style inline with !important
      }
      if ($(this).val() !== '') {
          $(this).css('border-color', ''); // Reset border
          $(this).css('color', '1px solid #e2e2e2');    // Change text color
      } else {
          $(this).css('border-color', 'red'); // Set border color to red if empty
      }
  })
  $('body').on('change', 'input[type="date"]', function() {
      if ($(this).val() !== '') {
          // Change the border color when a date is selected
          $(this).css('border-color', '1px solid #e2e2e2'); // Change to your desired color
      } else {
          // Reset the border color if no date is selected
          $(this).css('border-color', 'red'); // Or your default border color
      }
  });
  $('body').on('change', 'input[type="time"]', function() {
      if ($(this).val() !== '') {
          // Change the border color when a date is selected
          $(this).css('border-color', '1px solid #e2e2e2'); // Change to your desired color
      } else {
          // Reset the border color if no date is selected
          $(this).css('border-color', 'red'); // Or your default border color
      }
  });
  
       $("body").on("click", "#appbtn", (function() {
              csrftoken();
              var formData = {
                  name: $('#name').val(),
                  email: $('#email').val(),
                  phone: $('#phone').val(),
                  date: $('#date').val(),
                  time: $('#time').val(),
                  message: $('#message').val(),
                   // Include CSRF token
              };
  
              $.ajax({
                  url: "/add-schedule-appointment", // Your Laravel route to handle form submission
                  type: 'POST',
                  data: formData,
                  success: function(response) {
                      if(response.success==true){
                       // Check if the form exists before resetting
                       console.log($('#appointmentForms').length);
                      if ($('#appointmentForms').length > 0) {
                          $('#appointmentForms')[0].reset(); // Reset the form if it exists
                      }
                       $('.form-success').after('<div class="alert alert-success" role="alert">Message sent successfully</div>');
                          setTimeout(function() {
                          $('.alert').fadeOut('slow', function() {
                              $(this).remove();
                          });
                      }, 5000);
                      }else{
                          $('.form-success').after('<div class="alert alert-danger" role="alert">Something Went wrong</div>');
                          setTimeout(function() {
                          $('.alert').fadeOut('slow', function() {
                              $(this).remove();
                          });
                      }, 5000);
                      }
                   
                      // Reset the form after submission
                  },
                  error: function(a) {
                  $.each(a.responseJSON.errors, function(i, error) {
                      if (i == 'name') {
                          $('#name').css("border-color", "red");
                      }else if(i == 'email'){
                          $('#email').attr('style', 'border-color: red !important;');
                          $('#email').css("border-color", "red !important");
                      }else if(i == 'phone'){
                          $('#phone').css("border-color", "red");
                      }else if(i == 'time'){
                          $('#time').css("border-color", "red");
                      }else if(i == 'message'){
                          $('#message').css("border-color", "red");
                      }else if(i == 'date'){
                          $('#date').css("border-color", "red");
                      }
                     });
                      
                  }
                 
              });
          }));
  
  $("body").on("click", ".sendcontact", (function() {
      
      csrftoken();
               $.ajax({
                  url: "/sendContactfrm", // Route to submit the form
                  type: "POST",
                  data: {
                      _token: $('input[name="_token"]').val(),
                      name: $('#name').val(),
                      email: $('#email').val(),
                      phone: $('#phone').val(),
                      message: $('#message').val()
                  },
                  success: function(response) {
                       $("#contactForm")[0].reset();
                       $('#form-success').after('<div class="alert alert-success" role="alert">Message sent successfully</div>');
                          setTimeout(function() {
                          $('.alert').fadeOut('slow', function() {
                              $(this).remove();
                          });
                      }, 5000);
                   
                      // Reset the form after submission
                  },
                  error: function(a) {
                        $.each(a.responseJSON.errors, function(i, error) {
                      if (i == 'name') {
                          $('#name').css("border-color", "red");
                      }else if(i == 'email'){
                          $('#email').css("border-color", "red");
                      }else if(i == 'phone'){
                          $('#phone').css("border-color", "red");
                      }else if(i == 'message'){
                          $('#message').css("border-color", "red");
                      }
                     });
                      
                  }
              });
     
  }));
   
  function csrftoken() {
      $.ajaxSetup({
          headers: {
              "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
          }
      })
  }
  
  $("body").on("click", "#contact_footer", (function() {
      $(this).prop('disabled', true);
      $(this).text('Loading...');  
      var thi=$(this);
      $.ajaxSetup({
          headers: {
              "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
          }
      }), $.ajax({
          url: "/sendMailFooter",
          type: "POST",
          data: $("#contactFormid_footer").serialize(),
          success: function(a) {
               $("#contactFormid_footer")[0].reset();
       
              if(a.response==true){
                
                  $('.contacttitle').after('<div class="alert alert-success" role="alert">'+a.success+'</div>');
                  setTimeout(function() {
                  $('.alert').fadeOut('slow', function() {
                      $(this).remove();
                  });
              }, 5000);
              thi.prop('disabled', false);
                  
              }else{
                    thi.prop('disabled', false);
                    $('.contacttitle').after('<div class="alert alert-danger" role="alert">'+a.success+'</div>');
                        setTimeout(function() {
                      $('.alert').fadeOut('slow', function() {
                          $(this).remove();
                      });
                  }, 5000);
                 
                  
              }
               thi.prop('disabled', false);
             thi.text('Send Message');    
              $("#contactFormid_footer")[0].reset()
          },
          error: function(a) {
              // $('.contacttitle').after('<div class="alert alert-danger" role="alert">There was an error sending your message. Please try again.</div>');
              // setTimeout(function() {
              //     $('.alert').fadeOut('slow', function() {
              //         $(this).remove();
              //     });
              // }, 5000);
               console.warn(a.responseJSON.errors);
                // display errors on each form field
                $.each(a.responseJSON.errors, function(i, error) {
                      if (i == 'name_footer') {
                          $('.name_footer_error').text('The name field is required');
                      }else if(i == 'email_footer'){
                          $('.email_footer_error').text('The email field is required');
                      }else if(i == 'phone_footer'){
                          $('.phone_footer_error').text('The phone field is required');
                      }else if(i == 'message_footer'){
                          $('.message_footer_error').text('The message field is required');
                      }else if(i == 'state_footer'){
                          $('.state_footer_error').text('The state field is required');
                      }
                });
                  thi.text('Send Message');    
                  thi.prop('disabled', false);
          
          }
      })
  }));
  
  $('.mobileNumber').on('change', function() {
      var mobileNumber = $(this).val();
      
      // Regular expression for validating a 10-digit mobile number
      var mobilePattern = /^[0-9]{10}$/;
      
      if (mobilePattern.test(mobileNumber)) {
          // Valid number, hide error message if visible
          
      } else {
          // Invalid number, show error message
          $(this).val('');
      }
  });
  
  $('.emailAddress').on('change', function() {
      var email = $(this).val();
      
      // Regular expression for validating an email address
      var emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      
      if (emailPattern.test(email)) {
          // Valid email, hide error message if visible
          
      } else {
          // Invalid email, show error message
           $(this).val('');
      }
  });
  
  
  function myFunction() {
      csrftoken(), $.ajax({
          type: "POST",
          url: "/login-page",
          datatype: "json",
          success: function(a) {
              $(".loader_first").hide(), $("#userlogin").modal("show"), $(".userloginpage").html(a)
          }
      })
  }
  
  function delete_confirm() {
      return $(".checkbox:checked").length > 0 ? !!confirm("Are you sure to delete selected users?") : (alert("Select at least 1 record to delete."), !1)
  }
  
  function loginpopopen(a, t) {
      alertify.confirm("Confirm Action", "Are you sure you want to remove old data and show new data?", (function() {
          csrftoken(), $.ajax({
              type: "post",
              url: "/update_userid",
              data: {
                  userid: a,
                  type: "3",
                  period: t,
                  value: "gst"
              },
              dataType: "json",
              success: function(a) {
                  1 == a.success && ($("#userlogin").modal("show"), $(".userloginpage").html(a.view))
              }
          })
      }), (function() {
          csrftoken(), $.ajax({
              type: "post",
              url: "/update_userid",
              data: {
                  userid: a,
                  type: "3"
              },
              dataType: "json",
              success: function(a) {
                  1 == a.success && (csrftoken(), $.ajax({
                      type: "post",
                      url: "/login-page",
                      data: {
                          period: t
                      },
                      datatype: "json",
                      success: function(a) {
                          $("#userlogin").modal("show"), $(".userloginpage").html(a.view)
                      }
                  }))
              }
          })
      }))
  }
  
  function getArticles(a, t) {
      "gst3b-eligible-itc" == t ? ($(".itc_Comparision,.eligible-itc").html('<i class="fa fa-spinner fa-spin"></i> Loading...'), $.ajax({
          url: t + "?" + a,
          dataType: "json"
      }).done((function(a) {
          $(".itc_Comparision").html(a.itc_Comparision), $(".eligible-itc").html(a.eligible_itc)
      })).fail((function() {}))) : "gst3b" == t ? ($(".nill,.uin, .taxperson, .unreg, .ecom ,.gst3boutward").html('<i class="fa fa-spinner fa-spin"></i> Loading...'), $.ajax({
          url: t + "?" + a,
          dataType: "json"
      }).done((function(a) {
          $(".nill").html(a.nill), $(".uin").html(a.uin), $(".taxperson").html(a.taxperson), $(".unreg").html(a.unreg), $(".ecom").html(a.ecom), $(".gst3boutward").html(a.igst3boutward)
      })).fail((function() {}))) : "review" == t && ($(".prrevious,.uploadsummary").html('<i class="fa fa-spinner fa-spin"></i> Loading...'), $.ajax({
          url: t + "?" + a,
          dataType: "json"
      }).done((function(a) {
          $(".prrevious").html(a.previous), $(".uploadsummary").html(a.upload_summary)
      })).fail((function() {})))
  }
  
  function record(a) {
      var t = $("#id").val(),
          e = $("#date").val(),
          s = $("#type").val(),
          i = $("#limit").val();
      csrftoken(), $.ajax({
          type: "post",
          url: "/reports?page=" + a,
          data: {
              id: t,
              date: e,
              name: s,
              limit: i
          },
          dataType: "json",
          success: function(a) {
              $("#report_details").html(a.view), $("#datepicker").datepicker({
                  format: "mm/yyyy",
                  startView: "months",
                  minViewMode: "months",
                  autoclose: !0
              })
          }
      })
  }
  
  function triggerUpload() {
      document.getElementById("fileInput").click()
  }
  
  function handleFileUpload(a) {
      var t = new FormData,
          e = a.target.files[0];
      t.append("file", e), $("#load-data").prop("disabled", !0);
      var s = $("#period").val(),
          i = $("#userid").val();
      t.append("period", s), t.append("userid", i), csrftoken(), $("#progress-holder").removeClass("d-none");
      var n = $("#progress_bar");
      n.text("0%"), n.attr("aria-valuenow", 0), n.css("width", 0), $(".progress-bar").text("0%"), $.ajax({
          url: "/import",
          type: "POST",
          data: t,
          processData: !1,
          contentType: !1,
          processData: !1,
          beforeSend: function() {
              $("#process").css("display", "block")
          },
          success: function(a) {
              var t = 0,
                  e = setInterval((function() {
                      t += 20, $(".progress-bar").text(t + "%"), progress_bar_process(t, e)
                  }), 1e3)
          }
      })
  }
  
  function progress_bar_process(a, t) {
      $(".progress-bar").css("width", a + "%"), $(".progress-bar").text(a + "%"), a > 100 && (clearInterval(t), $("#process").css("display", "none"), $(".progress-bar").css("width", "0%"), setTimeout((function() {
          $("#success_message").html("")
      }), 5e3))
  }
  $('body').on('keypress', '.input, .form-control', function() {
      var $this = $(this);
      var value = $this.val();
      var attrName = $this.attr('name');
      
      if (value !== '') {
          $('.' + attrName + '_error').text('');
      }
  });
  $("body").on("click", "#contact", (function() {
      $.ajaxSetup({
          headers: {
              "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
          }
      }), $.ajax({
          url: "/sendMail",
          type: "POST",
          data: $("#contactFormid").serialize(),
          success: function(a) {
              if(a.response==true){
                  $('.contacttitle').after('<div class="alert alert-success" role="alert">'+a.success+'</div>');
                  setTimeout(function() {
                  $('.alert').fadeOut('slow', function() {
                      $(this).remove();
                  });
              }, 5000);
                  
              }else{
                    $('.contacttitle').after('<div class="alert alert-danger" role="alert">'+a.success+'</div>');
                        setTimeout(function() {
                      $('.alert').fadeOut('slow', function() {
                          $(this).remove();
                      });
                  }, 5000);
              }
              
              $("#contactFormid")[0].reset()
          },
          error: function(a) {
             // $('.contacttitle').after('<div class="alert alert-danger" role="alert">There was an error sending your message. Please try again.</div>');
              console.warn(a.responseJSON.errors);
                // display errors on each form field
                $.each(a.responseJSON.errors, function(i, error) {
                      if (i == 'name') {
                          $('.name_error').text('The name field is required');
                      }else if(i == 'phone'){
                          $('.phone_error').text('The phone field is required');
                      }else if(i == 'email'){
                          $('.email_error').text('The email field is required');
                      }else if(i == 'message'){
                          $('.message_error').text('The message field is required');
                      }
                       
                  
                });
              // setTimeout(function() {
              //     $('.alert').fadeOut('slow', function() {
              //         $(this).remove();
              //     });
              // }, 5000);
          
          }
      })
  })), $("body").on("click", ".successbtn", (function() {
      var a = $(this).parents(".b2bdetails").find(".inv_number").val(),
          t = $(this).parents(".b2bdetails").find(".inv_date").val(),
          e = $(this).parents(".b2bdetails").find(".receiver_number").val(),
          s = $(this).parents(".b2bdetails").find(".gstin_number").val(),
          i = $(this).parents(".b2bdetails").find(".place_of_supply").val(),
          n = $(this).parents(".b2bdetails").find(".reverse_charge").val(),
          d = $(this).parents(".b2bdetails").find(".invoice_type").val(),
          r = $(this).parents(".b2bdetails").find(".inv_value").val(),
          c = $(this).parents(".b2bdetails").find(".taxable_value").val(),
          o = $(this).parents(".b2bdetails").find(".rate").val(),
          l = $(this).parents(".b2bdetails").find(".tax_rate").val(),
          p = $(this).parents(".b2bdetails").find(".cess_value").val(),
          u = $(this).parents(".b2bdetails").find(".id").val(),
          h = $(".date").val(),
          f = $(".user_id").val();
      csrftoken();
      var m = $(this);
      m.html('<i class="fa fa-spinner fa-spin"></i>'), $.ajax({
          type: "post",
          url: "/updateb2b",
          data: {
              id: u,
              date: h,
              user_id: f,
              inv_number: a,
              inv_date: t,
              receiver_number: e,
              gstin_number: s,
              place_of_supply: i,
              reverse_charge: n,
              invoice_type: d,
              inv_value: r,
              taxable_value: c,
              rate: o,
              tax_rate: l,
              cess_value: p
          },
          dataType: "json",
          success: function(a) {
              1 == a.success && m.html('<i class="fa-solid fa-check"></i>')
          }
      })
  })), $("body").on("click", ".updateb2cl", (function() {
      var a = $(this).parents(".b2cldetails").find(".invoice_number").val(),
          t = $(this).parents(".b2cldetails").find(".invoice_date").val(),
          e = $(this).parents(".b2cldetails").find(".place_of_supply").val(),
          s = $(this).parents(".b2cldetails").find(".invoice_value").val(),
          i = $(this).parents(".b2cldetails").find(".tax_value").val(),
          n = $(this).parents(".b2cldetails").find(".rate").val(),
          d = $(this).parents(".b2cldetails").find(".gstin").val(),
          r = $(this).parents(".b2cldetails").find(".cess_amount").val(),
          c = $(this).parents(".b2cldetails").find(".b2clid").val(),
          o = $(".date").val(),
          l = $(".user_id").val();
      csrftoken();
      var p = $(this);
      p.html('<i class="fa fa-spinner fa-spin"></i>'), $.ajax({
          type: "post",
          url: "/updateb2cl",
          data: {
              id: c,
              date: o,
              user_id: l,
              invoice_number: a,
              invoice_date: t,
              place_of_supply: e,
              tax_value: i,
              invoice_value: s,
              gstin: d,
              cess_amount: r,
              rate: n
          },
          dataType: "json",
          success: function(a) {
              1 == a.success && p.html('<i class="fa-solid fa-check"></i>')
          }
      })
  })), $("body").on("click", ".updatecdnur", (function() {
      var a = $(this).parents(".cdnurdetails").find(".note_type").val(),
          t = $(this).parents(".cdnurdetails").find(".urtype").val(),
          e = $(this).parents(".cdnurdetails").find(".note_number").val(),
          s = $(this).parents(".cdnurdetails").find(".note_date").val(),
          i = $(this).parents(".cdnurdetails").find(".place_of_supply").val(),
          n = $(this).parents(".cdnurdetails").find(".note_value").val(),
          d = $(this).parents(".cdnurdetails").find(".tax_value").val(),
          r = $(this).parents(".cdnurdetails").find(".rate").val(),
          c = $(this).parents(".cdnurdetails").find(".tax_rate").val(),
          o = $(this).parents(".cdnurdetails").find(".cess_amount").val(),
          l = $(this).parents(".cdnurdetails").find(".cdnurid").val(),
          p = $(".date").val(),
          u = $(".user_id").val();
      csrftoken();
      var h = $(this);
      h.html('<i class="fa fa-spinner fa-spin"></i>'), $.ajax({
          type: "post",
          url: "/updatecdnur",
          data: {
              id: l,
              date: p,
              user_id: u,
              urtype: t,
              note_number: e,
              note_date: s,
              note_type: a,
              place_of_supply: i,
              note_value: n,
              tax_rate: c,
              rate: r,
              tax_value: d,
              cess_amount: o
          },
          dataType: "json",
          success: function(a) {
              1 == a.success && h.html('<i class="fa-solid fa-check"></i>')
          }
      })
  })), $("body").on("click", ".updateb2cs", (function() {
      var a = $(this).parents(".b2csdetails").find(".place_of_supply").val(),
          t = $(this).parents(".b2csdetails").find(".rate").val(),
          e = $(this).parents(".b2csdetails").find(".tax_value").val(),
          s = $(this).parents(".b2csdetails").find(".cess_amount").val(),
          i = $(this).parents(".b2csdetails").find(".b2csid").val(),
          n = $(".date").val(),
          d = $(".user_id").val();
      csrftoken();
      var r = $(this);
      r.html('<i class="fa fa-spinner fa-spin"></i>'), $.ajax({
          type: "post",
          url: "/updateb2cs",
          data: {
              id: i,
              date: n,
              user_id: d,
              place_of_supply: a,
              rate: t,
              tax_value: e,
              cess_amount: s
          },
          dataType: "json",
          success: function(a) {
              1 == a.success && r.html('<i class="fa-solid fa-check"></i>')
          }
      })
  })), $("body").on("click", ".updateata", (function() {
      var a = $(this).parents(".atadetails").find(".financial_year").val(),
          t = $(this).parents(".atadetails").find(".original_month").val(),
          e = $(this).parents(".atadetails").find(".original_place_of_supply").val(),
          s = $(this).parents(".atadetails").find(".rate").val(),
          i = $(this).parents(".atadetails").find(".gross_adv_rec").val(),
          n = $(this).parents(".atadetails").find(".tax_rate").val(),
          d = $(this).parents(".atadetails").find(".cess_amount").val(),
          r = $(this).parents(".atadetails").find(".ataid").val(),
          c = $(".date").val(),
          o = $(".user_id").val();
      csrftoken();
      var l = $(this);
      l.html('<i class="fa fa-spinner fa-spin"></i>'), $.ajax({
          type: "post",
          url: "/updateata",
          data: {
              id: r,
              date: c,
              user_id: o,
              financial_year: a,
              original_month: t,
              original_place_of_supply: e,
              rate: s,
              gross_adv_rec: i,
              tax_rate: n,
              cess_amount: d
          },
          dataType: "json",
          success: function(a) {
              1 == a.success && l.html('<i class="fa-solid fa-check"></i>')
          }
      })
  })), $("body").on("click", ".updatecdnra", (function() {
      var a = $(this).parents(".cdnradetails").find(".note_type").val(),
          t = $(this).parents(".cdnradetails").find(".org_note_number").val(),
          e = $(this).parents(".cdnradetails").find(".org_note_date").val(),
          s = $(this).parents(".cdnradetails").find(".rev_note_number").val(),
          i = $(this).parents(".cdnradetails").find(".rev_note_date").val(),
          n = $(this).parents(".cdnradetails").find(".receiver_name").val(),
          d = $(this).parents(".cdnradetails").find(".gstin").val(),
          r = $(this).parents(".cdnradetails").find(".place_of_supply").val(),
          c = $(this).parents(".cdnradetails").find(".rev_charge").val(),
          o = $(this).parents(".cdnradetails").find(".not_supply_type").val(),
          l = $(this).parents(".cdnradetails").find(".tax_value").val(),
          p = $(this).parents(".cdnradetails").find(".rate").val(),
          u = $(this).parents(".cdnradetails").find(".tax_rate").val(),
          h = $(this).parents(".cdnradetails").find(".cess_amount").val(),
          f = $(this).parents(".cdnradetails").find(".cdnraid").val(),
          m = $(".date").val(),
          y = $(".user_id").val();
      csrftoken();
      var v = $(this);
      v.html('<i class="fa fa-spinner fa-spin"></i>'), $.ajax({
          type: "post",
          url: "/updatecdnra",
          data: {
              id: f,
              date: m,
              user_id: y,
              note_type: a,
              org_note_number: t,
              org_note_date: e,
              rev_note_number: s,
              rev_note_date: i,
              receiver_name: n,
              gstin: d,
              place_of_supply: r,
              rev_charge: c,
              not_supply_type: o,
              tax_value: l,
              rate: p,
              tax_rate: u,
              cess_amount: h
          },
          dataType: "json",
          success: function(a) {
              1 == a.success && v.html('<i class="fa-solid fa-check"></i>')
          }
      })
  })), $("body").on("click", ".updatecdnura", (function() {
      var a = $(this).parents(".cdnuradetails").find(".note_type").val(),
          t = $(this).parents(".cdnuradetails").find(".ur_type").val(),
          e = $(this).parents(".cdnuradetails").find(".org_note_number").val(),
          s = $(this).parents(".cdnuradetails").find(".org_note_date").val(),
          i = $(this).parents(".cdnuradetails").find(".revised_note_number").val(),
          n = $(this).parents(".cdnuradetails").find(".revised_note_date").val(),
          d = $(this).parents(".cdnuradetails").find(".place_of_supply").val(),
          r = $(this).parents(".cdnuradetails").find(".note_value").val(),
          c = $(this).parents(".cdnuradetails").find(".tax_value").val(),
          o = $(this).parents(".cdnuradetails").find(".rate").val(),
          l = $(this).parents(".cdnuradetails").find(".tax_rate").val(),
          p = $(this).parents(".cdnuradetails").find(".cess_amount").val(),
          u = $(this).parents(".cdnuradetails").find(".cdnurid").val(),
          h = $(".date").val(),
          f = $(".user_id").val();
      csrftoken();
      var m = $(this);
      m.html('<i class="fa fa-spinner fa-spin"></i>'), $.ajax({
          type: "post",
          url: "/updatecdnura",
          data: {
              id: u,
              date: h,
              user_id: f,
              note_type: a,
              ur_type: t,
              org_note_number: e,
              org_note_date: s,
              revised_note_number: i,
              revised_note_date: n,
              place_of_supply: d,
              note_value: r,
              tax_value: c,
              rate: o,
              tax_rate: l,
              cess_amount: p
          },
          dataType: "json",
          success: function(a) {
              1 == a.success && m.html('<i class="fa-solid fa-check"></i>')
          }
      })
  })), $("body").on("click", ".updatehsn", (function() {
      var a = $(this).parents(".hsndetails").find(".hsn").val(),
          t = $(this).parents(".hsndetails").find(".description").val(),
          e = $(this).parents(".hsndetails").find(".uqc").val(),
          s = $(this).parents(".hsndetails").find(".total_quantity").val(),
          i = $(this).parents(".hsndetails").find(".total_value").val(),
          n = $(this).parents(".hsndetails").find(".rate").val(),
          d = $(this).parents(".hsndetails").find(".int_tax_amount").val(),
          r = $(this).parents(".hsndetails").find(".cen_tax_amount").val(),
          c = $(this).parents(".hsndetails").find(".state_tax_amount").val(),
          o = $(this).parents(".hsndetails").find(".cess_amount").val(),
          l = $(this).parents(".hsndetails").find(".hsnid").val(),
          p = $(".date").val(),
          u = $(".user_id").val();
      csrftoken();
      var h = $(this);
      h.html('<i class="fa fa-spinner fa-spin"></i>'), $.ajax({
          type: "post",
          url: "/updatehsn",
          data: {
              id: l,
              date: p,
              user_id: u,
              hsn: a,
              description: t,
              uqc: e,
              total_quantity: s,
              total_value: i,
              rate: n,
              int_tax_amount: d,
              cen_tax_amount: r,
              state_tax_amount: c,
              cess_amount: o
          },
          dataType: "json",
          success: function(a) {
              1 == a.success && h.html('<i class="fa-solid fa-check"></i>')
          }
      })
  })), $("body").on("click", ".updatedoc", (function() {
      var a = $(this).parents(".docdetails").find(".nat_of_doc").val(),
          t = $(this).parents(".docdetails").find(".no_from").val(),
          e = $(this).parents(".docdetails").find(".no_to").val(),
          s = $(this).parents(".docdetails").find(".total_number").val(),
          i = $(this).parents(".docdetails").find(".cancelled").val(),
          n = $(this).parents(".docdetails").find(".net_issue").val(),
          d = $(this).parents(".docdetails").find(".docid").val(),
          r = $(".date").val(),
          c = $(".user_id").val();
      csrftoken();
      var o = $(this);
      o.html('<i class="fa fa-spinner fa-spin"></i>'), $.ajax({
          type: "post",
          url: "/updatedoc",
          data: {
              id: d,
              date: r,
              user_id: c,
              nat_of_doc: a,
              no_from: t,
              no_to: e,
              total_number: s,
              cancelled: i,
              net_issue: n
          },
          dataType: "json",
          success: function(a) {
              1 == a.success && o.html('<i class="fa-solid fa-check"></i>')
          }
      })
  })), $("body").on("click", ".updateexpa", (function() {
      var a = $(this).parents(".expadetails").find(".org_invoice_num").val(),
          t = $(this).parents(".expadetails").find(".org_invoice_date").val(),
          e = $(this).parents(".expadetails").find(".ex_type").val(),
          s = $(this).parents(".expadetails").find(".re_invoice_number").val(),
          i = $(this).parents(".expadetails").find(".re_invoice_date").val(),
          n = $(this).parents(".expadetails").find(".port_code").val(),
          d = $(this).parents(".expadetails").find(".ship_bill_number").val(),
          r = $(this).parents(".expadetails").find(".ship_bill_date").val(),
          c = $(this).parents(".expadetails").find(".inv_value").val(),
          o = $(this).parents(".expadetails").find(".tax_value").val(),
          l = $(this).parents(".expadetails").find(".rate").val(),
          p = $(this).parents(".expadetails").find(".igst").val(),
          u = $(this).parents(".expadetails").find(".cess_amount").val(),
          h = $(this).parents(".expadetails").find(".expid").val(),
          f = $(".date").val(),
          m = $(".user_id").val();
      csrftoken();
      var y = $(this);
      y.html('<i class="fa fa-spinner fa-spin"></i>'), $.ajax({
          type: "post",
          url: "/updateexpa",
          data: {
              id: h,
              date: f,
              user_id: m,
              org_invoice_num: a,
              org_invoice_date: t,
              ex_type: e,
              re_invoice_number: s,
              re_invoice_date: i,
              port_code: n,
              ship_bill_number: d,
              ship_bill_date: r,
              inv_value: c,
              tax_value: o,
              rate: l,
              igst: p,
              cess_amount: u
          },
          dataType: "json",
          success: function(a) {
              1 == a.success && y.html('<i class="fa-solid fa-check"></i>')
          }
      })
  })), $("body").on("click", ".updateb2cla", (function() {
      var a = $(this).parents(".b2cladetails").find(".org_inv_number").val(),
          t = $(this).parents(".b2cladetails").find(".org_invoice_date").val(),
          e = $(this).parents(".b2cladetails").find(".org_place_of_supp").val(),
          s = $(this).parents(".b2cladetails").find(".re_inv_number").val(),
          i = $(this).parents(".b2cladetails").find(".re_inv_date").val(),
          n = $(this).parents(".b2cladetails").find(".inv_value").val(),
          d = $(this).parents(".b2cladetails").find(".tax_value").val(),
          r = $(this).parents(".b2cladetails").find(".rate").val(),
          c = $(this).parents(".b2cladetails").find(".tax_rate").val(),
          o = $(this).parents(".b2cladetails").find(".cess_amount").val(),
          l = $(this).parents(".b2cladetails").find(".b2claid").val(),
          p = $(".date").val(),
          u = $(".user_id").val();
      csrftoken();
      var h = $(this);
      h.html('<i class="fa fa-spinner fa-spin"></i>'), $.ajax({
          type: "post",
          url: "/updateb2cla",
          data: {
              id: l,
              date: p,
              user_id: u,
              org_inv_number: a,
              org_invoice_date: t,
              org_place_of_supp: e,
              re_inv_number: s,
              re_inv_date: i,
              inv_value: n,
              tax_value: d,
              rate: r,
              tax_rate: c,
              cess_amount: o
          },
          dataType: "json",
          success: function(a) {
              1 == a.success && h.html('<i class="fa-solid fa-check"></i>')
          }
      })
  })), $("body").on("click", ".updateb2csa", (function() {
      var a = $(this).parents(".b2csadetails").find(".financial_year").val(),
          t = $(this).parents(".b2csadetails").find(".original_month").val(),
          e = $(this).parents(".b2csadetails").find(".place_of_supply").val(),
          s = $(this).parents(".b2csadetails").find(".rate").val(),
          i = $(this).parents(".b2csadetails").find(".tax_rate").val(),
          n = $(this).parents(".b2csadetails").find(".tax_value").val(),
          d = $(this).parents(".b2csadetails").find(".cess_amount").val(),
          r = $(this).parents(".b2csadetails").find(".b2csaid").val(),
          c = $(".date").val(),
          o = $(".user_id").val();
      csrftoken();
      var l = $(this);
      l.html('<i class="fa fa-spinner fa-spin"></i>'), $.ajax({
          type: "post",
          url: "/updateb2csa",
          data: {
              id: r,
              date: c,
              user_id: o,
              financial_year: a,
              original_month: t,
              place_of_supply: e,
              rate: s,
              tax_rate: i,
              tax_val: n,
              cess_amount: d
          },
          dataType: "json",
          success: function(a) {
              1 == a.success && l.html('<i class="fa-solid fa-check"></i>')
          }
      })
  })), $("body").on("click", ".updateatadja", (function() {
      var a = $(this).parents(".atadjadetails").find(".financial_year").val(),
          t = $(this).parents(".atadjadetails").find(".original_month").val(),
          e = $(this).parents(".atadjadetails").find(".ori_place_of_supply").val(),
          s = $(this).parents(".atadjadetails").find(".rate").val(),
          i = $(this).parents(".atadjadetails").find(".tax_rate").val(),
          n = $(this).parents(".atadjadetails").find(".tax_val").val(),
          d = $(this).parents(".atadjadetails").find(".cess_amount").val(),
          r = $(this).parents(".atadjadetails").find(".atadjaid").val(),
          c = $(".date").val(),
          o = $(".user_id").val();
      csrftoken();
      var l = $(this);
      l.html('<i class="fa fa-spinner fa-spin"></i>'), $.ajax({
          type: "post",
          url: "/updateatadja",
          data: {
              id: r,
              date: c,
              user_id: o,
              financial_year: a,
              original_month: t,
              ori_place_of_supply: e,
              rate: s,
              tax_rate: i,
              tax_val: n,
              cess_amount: d
          },
          dataType: "json",
          success: function(a) {
              1 == a.success && l.html('<i class="fa-solid fa-check"></i>')
          }
      })
  })), $("body").on("click", ".updateatadj", (function() {
      var a = $(this).parents(".atadjdetails").find(".place_of_supply").val(),
          t = $(this).parents(".atadjdetails").find(".rate").val(),
          e = $(this).parents(".atadjdetails").find(".gross_adv_adjusted").val(),
          s = $(this).parents(".atadjdetails").find(".tax_rate").val(),
          i = $(this).parents(".atadjdetails").find(".cess_amount").val(),
          n = $(this).parents(".atadjdetails").find(".atadjid").val(),
          d = $(".date").val(),
          r = $(".user_id").val();
      csrftoken();
      var c = $(this);
      c.html('<i class="fa fa-spinner fa-spin"></i>'), $.ajax({
          type: "post",
          url: "/updateatadj",
          data: {
              id: n,
              date: d,
              user_id: r,
              place_of_supply: a,
              rate: t,
              gross_adv_adjusted: e,
              tax_rate: s,
              cess_amount: i
          },
          dataType: "json",
          success: function(a) {
              1 == a.success && c.html('<i class="fa-solid fa-check"></i>')
          }
      })
  })), $("body").on("click", ".btnadvrec", (function() {
      var a = $(this).parents(".atdetails").find(".place_of_supply").val(),
          t = $(this).parents(".atdetails").find(".rate").val(),
          e = $(this).parents(".atdetails").find(".gross_adv_rec").val(),
          s = $(this).parents(".atdetails").find(".tax_rate").val(),
          i = $(this).parents(".atdetails").find(".cess_amount").val(),
          n = $(this).parents(".atdetails").find(".atid").val(),
          d = $(".date").val(),
          r = $(".user_id").val();
      csrftoken();
      var c = $(this);
      c.html('<i class="fa fa-spinner fa-spin"></i>'), $.ajax({
          type: "post",
          url: "/updateAt",
          data: {
              id: n,
              date: d,
              user_id: r,
              place_of_supply: a,
              rate: t,
              gross_adv_rec: e,
              tax_rate: s,
              cess_amount: i
          },
          dataType: "json",
          success: function(a) {
              1 == a.success && c.html('<i class="fa-solid fa-check"></i>')
          }
      })
  })), $("body").on("click", ".updateexport", (function() {
      var a = $(this).parents(".expdetails").find(".exp_type").val(),
          t = $(this).parents(".expdetails").find(".inv_number").val(),
          e = $(this).parents(".expdetails").find(".inv_date").val(),
          s = $(this).parents(".expdetails").find(".port_code").val(),
          i = $(this).parents(".expdetails").find(".ship_bill_num").val(),
          n = $(this).parents(".expdetails").find(".ship_bill_date").val(),
          d = $(this).parents(".expdetails").find(".inv_value").val(),
          r = $(this).parents(".expdetails").find(".tax_value").val(),
          c = $(this).parents(".expdetails").find(".rate").val(),
          o = $(this).parents(".expdetails").find(".cess_amount").val(),
          l = $(this).parents(".expdetails").find(".expid").val(),
          p = $(".date").val(),
          u = $(".user_id").val();
      csrftoken();
      var h = $(this);
      h.html('<i class="fa fa-spinner fa-spin"></i>'), $.ajax({
          type: "post",
          url: "/updateExport",
          data: {
              id: l,
              date: p,
              user_id: u,
              exp_type: a,
              inv_number: t,
              inv_date: e,
              port_code: s,
              ship_bill_num: i,
              ship_bill_date: n,
              inv_value: d,
              tax_value: r,
              rate: c,
              cess_amount: o
          },
          dataType: "json",
          success: function(a) {
              1 == a.success && h.html('<i class="fa-solid fa-check"></i>')
          }
      })
  })), $("body").on("click", ".successcdnr", (function() {
      var a = $(this).parents(".cdnrdetails").find(".note_type").val(),
          t = $(this).parents(".cdnrdetails").find(".note_number").val(),
          e = $(this).parents(".cdnrdetails").find(".note_date").val(),
          s = $(this).parents(".cdnrdetails").find(".rec_name").val(),
          i = $(this).parents(".cdnrdetails").find(".gstin").val(),
          n = $(this).parents(".cdnrdetails").find(".place_of_supply").val(),
          d = $(this).parents(".cdnrdetails").find(".reverse_charge").val(),
          r = $(this).parents(".cdnrdetails").find(".note_supply_type").val(),
          c = $(this).parents(".cdnrdetails").find(".note_value").val(),
          o = $(this).parents(".cdnrdetails").find(".tax_value").val(),
          l = $(this).parents(".cdnrdetails").find(".rate").val(),
          p = $(this).parents(".cdnrdetails").find(".tax_rate").val(),
          u = $(this).parents(".cdnrdetails").find(".cess_amount").val(),
          h = $(this).parents(".cdnrdetails").find(".cdnrid").val(),
          f = $(".date").val(),
          m = $(".user_id").val();
      csrftoken();
      var y = $(this);
      y.html('<i class="fa fa-spinner fa-spin"></i>'), $.ajax({
          type: "post",
          url: "/updatecdnr",
          data: {
              id: h,
              date: f,
              user_id: m,
              note_type: a,
              note_number: t,
              note_date: e,
              rec_name: s,
              gstin: i,
              place_of_supply: n,
              reverse_charge: d,
              note_supply_type: r,
              note_value: c,
              tax_value: o,
              rate: l,
              tax_rate: p,
              cess_amount: u
          },
          dataType: "json",
          success: function(a) {
              1 == a.success && y.html('<i class="fa-solid fa-check"></i>')
          }
      })
  })), $("body").on("click", ".opencertificate", (function() {
      $("#viewSampleCertificate").modal("show");
      var a = $(this).attr("data-img");
      $(".crt_img").attr("src", a)
  })), $(document).ready((function() {
      new URL(window.location.href);
      var a = window.location.pathname.split("/"),
          t = a[a.length - 1];
      if ("section-wise-doc" == a[a.length - 2]) {
          var e = t;
          csrftoken(), $.ajax({
              type: "post",
              url: "/loginFrmSection",
              data: {
                  id: e
              },
              dataType: "json",
              success: function(a) {
                  $("#userlogin").modal("show"), $(".userloginpage").html(a.view)
              }
          })
      }
  })), $("body").on("change", ".section-wise-data", (function() {
      var a = $(this).attr("data-id"),
          t = $(this).find(":selected").val(),
          e = $(this).parents(".flex-row").find(".month").find(":selected").val(),
          s = new Array;
      $(".section-wise-data option").each((function() {
          s.push(this.value)
      })), csrftoken(), $.ajax({
          type: "post",
          url: "/loginFrm",
          data: {
              id: a,
              period: t,
              month: e,
              value: "section-wise-data",
              assignedRoleId: s
          },
          dataType: "json",
          success: function(a) {
              "section-wise-data" == a.type ? $("#appendinvoice").html(a.view) : ($("#userlogin").modal("show"), $(".userloginpage").html(a.view))
          }
      })
  })), $("body").on("click", "#deleteService", (function() {
      var a = $(this).attr("data-id");
      alertify.confirm("Are you sure you want to delete?", (function(t) {
          t && ($.ajaxSetup({
              headers: {
                  "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
              }
          }), $.ajax({
              type: "post",
              url: "/deleteService",
              data: {
                  service_id: a
              },
              dataType: "json",
              success: function(a) {
                  alertify.success(a.message), window.location.href = a.redirect
              }
          }))
      }), "Default Value")
  })), $("body").on("click", ".createuser", (function() {
      var a = $("#email").val(),
          t = $("#password").val(),
          e = $("#name").val();
      $.ajaxSetup({
          headers: {
              "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
          }
      }), $.ajax({
          type: "post",
          url: "/create-users",
          data: {
              email: a,
              password: t,
              name: e
          },
          dataType: "json",
          success: function(a) {
              1 == a.success ? (alertify.success(a.message), window.location.href = a.redirect) : alertify.error(a.message)
          },
          error: function(a) {
              console.warn(a.responseJSON.errors), $(".error-message").remove(), $.each(a.responseJSON.errors, (function(a, t) {
                  $(document).find('[name="' + a + '"]').after($('<span class="error-message" style="color: red;">' + t[0] + "</span>"))
              }))
          }
      })
  })), $("body").on("click", ".serviceName", (function() {
      var a = $(this).attr("data-id"),
          t = $(this).attr("data-name"),
          e = $(this).attr("data-image");
      $(".modeltitle").html('<img src="' + e + '" alt="pvt-ltd-company" height="40" width="40"> ' + t), csrftoken(), $.ajax({
          type: "post",
          url: "/serviceModel",
          data: {
              id: a
          },
          dataType: "html",
          success: function(a) {
              $("#exploreService").modal("show"), $(".appendserviesdata").html(a)
          }
      })
  })), $("body").on("click", ".editModal", (function() {
      var a = $(this).attr("data-id");
      $("#service_id").val(a), csrftoken(), new bootstrap.Offcanvas(document.getElementById("editService")).show(), $.ajax({
          type: "post",
          url: "/get-service-data",
          data: {
              id: a
          },
          dataType: "json",
          success: function(a) {
              1 == a.success && $(".appendeditdata").html(a.view)
          }
      })
  })), $("body").on("click", "#addservice", (function() {
      $.ajaxSetup({
          headers: {
              "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
          }
      });
      var a = new FormData($("#serviceid")[0]),
          t = $("#service_name").val(),
          e = $(".nav-link.active").attr("data-bs-target"),
          s = $("#logo")[0].files[0];
      s && a.append("logo", s), a.append("service_name", t), a.append("tabs", e), $.ajax({
          type: "post",
          url: "/add-service",
          data: a,
          contentType: !1,
          processData: !1,
          cache: !1,
          dataType: "json",
          success: function(a) {
              1 == a.success ? (alertify.success(a.message), window.location.href = "/web-dashboard") : alertify.error(a.message)
          },
          error: function(a) {
              console.warn(a.responseJSON.errors), $.each(a.responseJSON.errors, (function(a, t) {
                  $(document).find('[name="' + a + '"]').after($('<span style="color: red;">' + t[0] + "</span>"))
              }))
          }
      })
  })), $("body").on("click", "#editservice", (function() {
      $.ajaxSetup({
          headers: {
              "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
          }
      });
      var a = new FormData($("#serviceid")[0]);
      $(".nav-link.active").attr("data-bs-target");
      $.ajax({
          type: "post",
          url: "/edit-service",
          data: a,
          contentType: !1,
          processData: !1,
          cache: !1,
          dataType: "json",
          success: function(a) {
              1 == a.success ? (alertify.success(a.message), window.location.href = "/web-dashboard") : alertify.error(a.message)
          },
          error: function(a) {
              console.warn(a.responseJSON.errors), $.each(a.responseJSON.errors, (function(a, t) {
                  $(document).find('[name="' + a + '"]').after($('<span style="color: red;">' + t[0] + "</span>"))
              }))
          }
      })
  })), $("body").on("click", ".ratewisedata", (function() {
      $.ajaxSetup({
          headers: {
              "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
          }
      });
      var a = $(this).attr("data-id"),
          t = $(this).attr("data-period"),
          e = $(this).attr("data-amt");
      $.ajax({
          type: "post",
          url: "/get-gst-return_summery",
          data: {
              id: a,
              period: t,
              amt: e
          },
          dataType: "html",
          success: function(a) {
              $(".getRateWiseData").html(a)
          }
      })
  })), $("body").on("click", ".outward", (function() {
      $(".ratewisedata").attr("data-id", $(this).attr("data-userid")), $(".ratewisedata").attr("data-period", $(this).attr("data-period")), $(".ratewisedata").attr("data-amt", $(this).attr("data-amt"))
  })), $("body").on("click", ".outwardTaxableZeroRated", (function() {
      var a = $(this).attr("data-userid"),
          t = $(this).attr("data-amt");
      let e = new URL(window.location.href).searchParams.get("period");
      csrftoken(), $.ajax({
          type: "post",
          url: "/get-gst-zero-rated",
          data: {
              id: a,
              amt: t,
              period: e
          },
          dataType: "html",
          success: function(a) {
              $("#outwardTaxableZeroRated").modal("show"), $(".appendzerotable").html(a)
          }
      })
  })), $("body").on("click", ".outwardTaxableNillRated", (function() {
      var a = $(this).attr("data-userid"),
          t = $(this).attr("data-amt");
      let e = new URL(window.location.href).searchParams.get("period");
      csrftoken(), $.ajax({
          type: "post",
          url: "/get-gst-nill-rated",
          data: {
              id: a,
              amt: t,
              period: e
          },
          dataType: "html",
          success: function(a) {
              $("#outwardTaxableNillRated").modal("show"), $(".appendnilltable").html(a)
          }
      })
  })), $("body").on("click", ".inwardSuppliesReverseCharge", (function() {
      var a = $(this).attr("data-userid"),
          t = $(this).attr("data-amt");
      let e = new URL(window.location.href).searchParams.get("period");
      csrftoken(), $.ajax({
          type: "post",
          url: "/get-gst-reverse-charge",
          data: {
              id: a,
              amt: t,
              period: e
          },
          dataType: "html",
          success: function(a) {
              $("#inwardSuppliesReverseCharge").modal("show"), $(".appendinverseable").html(a)
          }
      })
  })), $("body").on("click", ".nonGSToutward", (function() {
      var a = $(this).attr("data-userid"),
          t = $(this).attr("data-amt");
      let e = new URL(window.location.href).searchParams.get("period");
      csrftoken(), $.ajax({
          type: "post",
          url: "/get-gst-non-gst",
          data: {
              id: a,
              amt: t,
              period: e
          },
          dataType: "html",
          success: function(a) {
              $("#nonGSToutward").modal("show"), $(".appendnonGSToutward").html(a)
          }
      })
  })), $("body").on("blur", ".getvalue", (function() {
      csrftoken();
      let a = new URL(window.location.href).searchParams.get("period");
      var t = $(this).val(),
          e = $(this).attr("data-name"),
          s = $(this).attr("data-key"),
          i = $(this).attr("data-id"),
          n = $(this).attr("data-type"),
          d = $(this).attr("data-keyname"),
          r = $(this).attr("data-value");
      $.ajax({
          type: "post",
          url: "/update-gst-outword",
          data: {
              value: t,
              name: e,
              key: s,
              id: i,
              type: n,
              keyname: d,
              values: r,
              period: a
          },
          success: function(a) {}
      })
  })), $("body").on("click", ".refresh3bgst", (function() {
      var a = $(this).attr("data-id"),
          t = $(this).attr("data-period"),
          e = $(this);
      csrftoken(), e.prop("disabled", !0), e.text("Loading.."), $.ajax({
          type: "post",
          url: "/update_userid",
          data: {
              userid: a,
              type: "1"
          },
          success: function(e) {
              loginpopopen(a, t)
          }
      }), e.prop("disabled", !1), e.text("Portal Auto-Calculated Data")
  })), $("body").on("click", "#loginGst", (function() {
      csrftoken(), $.ajax({
          type: "post",
          url: "/login-gst",
          data: $("#gstlogedin").serialize(),
          datatype: "json",
          success: function(a) {
              console.log(a)
          }
      })
  })), $("body").on("click", ".createCompany", (function() {
      $(this).prop("disabled", !0), $(this).text("loading.."), csrftoken(), $.ajax({
          type: "post",
          url: "/login-gst",
          data: $("#gstlogedin").serialize(),
          datatype: "json",
          success: function(a) {
              1 == a.response ? "section-wise-data" == a.type ? ($("#userlogin").modal("hide"), $("#appendinvoice").html(a.view)) : ($("#userlogin").modal("hide"), location.reload()) : ($(".alert").text(a.message).show(), setTimeout((function() {
                  $(".alert").hide(), $("#userlogin").modal("hide")
              }), 3e3))
          }
      })
  })), $("body").on("click", ".gst_data_get", (function() {
      $(".loader_first").show(), myFunction()
  })), $(document).ready((function() {
      $("#userlogin").modal({
          show: !1,
          backdrop: "static"
      })
  })), $(document).ready((function() {
      $(".select_all").on("click", (function() {
          this.checked ? $(".checkbox").each((function() {
              this.checked = !0
          })) : $(".checkbox").each((function() {
              this.checked = !1
          }))
      })), $(".checkbox").on("click", (function() {
          $(".checkbox:checked").length == $(".checkbox").length ? $(".select_all").prop("checked", !0) : $(".select_all").prop("checked", !1)
      }))
  })), $(document).ready((function() {
      $(".select_all_com").on("click", (function() {
          this.checked ? $(".checkbox_com").each((function() {
              this.checked = !0
          })) : $(".checkbox_com").each((function() {
              this.checked = !1
          }))
      })), $(".checkbox_com").on("click", (function() {
          $(".checkbox_com:checked").length == $(".checkbox").length ? $(".select_all_com").prop("checked", !0) : $(".select_all_com").prop("checked", !1)
      }))
  })), $(document).ready((function() {
      $(".select_all_uin").on("click", (function() {
          this.checked ? $(".checkbox_uin").each((function() {
              this.checked = !0
          })) : $(".checkbox_uin").each((function() {
              this.checked = !1
          }))
      })), $(".checkbox_uin").on("click", (function() {
          $(".checkbox_uin:checked").length == $(".checkbox").length ? $(".select_all_uin").prop("checked", !0) : $(".select_all_uin").prop("checked", !1)
      }))
  })), $("body").on("click", ".remove_state", (function() {
      var a = $(this).attr("data-name"),
          t = $(this).attr("data-key"),
          e = $(this).attr("data-id");
      let s = new URL(window.location.href).searchParams.get("period");
      csrftoken(), $th = $(this);
      var i = $(this);
      i.html('<i class="fa fa-spinner fa-spin"></i>'), $.ajax({
          type: "post",
          url: "/remove_inner_state",
          data: {
              name: a,
              key: t,
              id: e,
              period: s
          },
          dataType: "html",
          success: function(a) {
              $th.parents(".table-responsive").html(a), $th.parents("tr").remove(), i.html('<i class="fa-solid fa-trash"></i>')
          }
      })
  })), $("body").on("click", ".success_state", (function() {
      var a = $(this).parents("tr").find(".state").val(),
          t = $(this).parents("tr").find(".total_tax").val(),
          e = $(this).parents("tr").find(".integrated_taxx").val(),
          s = $(this).parents("tr").find(".type").val();
      if ("unreg_details" == s) var i = $(this).parents("tr").find(".checkbox").val();
      else if ("uin_details" == s) i = $(this).parents("tr").find(".checkbox_uin").val();
      else if ("comp_details" == s) i = $(this).parents("tr").find(".checkbox_com").val();
      var n = $(this).attr("data-id"),
          d = $(this);
      d.html('<i class="fa fa-spinner fa-spin"></i>');
      let r = new URL(window.location.href).searchParams.get("period");
      csrftoken(), $.ajax({
          type: "post",
          url: "/add_inner_state",
          data: {
              type: s,
              key: i,
              state: a,
              integrated_taxs: e,
              total_taxx: t,
              id: n,
              period: r
          },
          success: function(a) {
              1 == a.success ? (d.html('<i class="fa-solid  fa-check"></i>'), d.parents("tr").find(".red").removeClass("red")) : d.html('<i class="fa-solid fas fa-square"></i>')
          },
          error: function(a, t, e) {
              d.html('<i class="fa-solid fas fa-square"></i>');
              let s = a.responseJSON.errors;
              console.log("all_errors", s), $.each(s, (function(a, t) {
                  d.parents("tr").find("[name='" + a + "']").addClass("red")
              }))
          }
      })
  })), $(document).ready((function() {
      $("body").on("click", ".create_tr_unreg", (function() {
          var a = $(this).attr("data-id");
          let t = $(".table_body_tr tr").length;
          csrftoken(), $.ajax({
              type: "post",
              url: "/add_unregisterd_fileds",
              data: {
                  count: t,
                  userid: a
              },
              dataType: "html",
              success: function(a) {
                  $(".table_body_tr").append(a)
              }
          })
      })), $("body").on("click", ".delete", (function(a) {
          $(this).parents(".next-referral").remove()
      }))
  })), $("body").on("keyup keypress blur change", ".form-control", (function() {
      "" != $(this).val() && $(this).removeClass("red"), 1 == $(this).is(":selected") && $(this).removeClass("red")
  })), $("body").on("click", ".all_delete_inner_state", (function() {
      var a = $(this).attr("data-id"),
          t = $(this).attr("data-name");
      let e = new URL(window.location.href).searchParams.get("period");
      csrftoken(), $.ajax({
          type: "post",
          url: "/all_delete_unreg_person",
          data: {
              userid: a,
              name: t,
              period: e
          },
          dataType: "json",
          success: function(a) {
              $(".table_body_tr").html("")
          }
      })
  })), $("body").on("click", ".all_delete_inner_state", (function() {
      var a = $(this).attr("data-id"),
          t = $(this).attr("data-name");
      csrftoken(), $.ajax({
          type: "post",
          url: "/all_delete_unreg_person",
          data: {
              userid: a,
              name: t
          },
          dataType: "json",
          success: function(a) {
              $(".table_body_tr").html("")
          }
      })
  })), $(document).ready((function() {
      $("body").on("click", ".create_tr_comp", (function() {
          var a = $(this).attr("data-id");
          let t = $("#table_bodyTwo tr").length;
          csrftoken(), $.ajax({
              type: "post",
              url: "/add_comp_fileds",
              data: {
                  count: t,
                  userid: a
              },
              dataType: "html",
              success: function(a) {
                  $("#table_bodyTwo").append(a)
              }
          })
      })), $("body").on("click", ".delete", (function(a) {
          $(this).parents(".next-referral").remove()
      }))
  })), $(document).ready((function() {
      $("body").on("click", ".create_tr_uin", (function() {
          var a = $(this).attr("data-id");
          let t = $("#table_bodyThree tr").length;
          csrftoken(), $.ajax({
              type: "post",
              url: "/add_uin_fileds",
              data: {
                  count: t,
                  userid: a
              },
              dataType: "html",
              success: function(a) {
                  $("#table_bodyThree").append(a)
              }
          })
      })), $("body").on("click", ".delete", (function(a) {
          $(this).parents(".next-referral").remove()
      }))
  })), $(document).ready((function() {
      $("body").on("keypress", ".num", (function(a) {
          var t = a.which ? a.which : a.keyCode;
          t > 31 && (t < 48 || t > 57) && a.preventDefault()
      }))
  })), $("body").on("click", ".pop", (function() {
      var a = $(this).attr("data-userid");
      csrftoken(), $.ajax({
          type: "post",
          url: "/update_userid",
          data: {
              userid: a,
              type: "1"
          },
          dataType: "html",
          success: function(a) {}
      })
  })), $(document).ready((function() {
    
      var t = new URL(window.location.href);
        let a = t.searchParams.get("id");
      let e = t.searchParams.get("period");
      csrftoken(), $.ajax({
          type: "post",
          url: "/update_userid",
          data: {
              userid: a,
              type: "2"
          },
          dataType: "json",
          success: function(t) {
              1 == t.success && loginpopopen(a, e)
          }
      })
  })), $(document).ready((function() {
      var a = new URL(window.location.href),
          t = decodeURI(window.location.href).split("?");
      a = a.pathname.split("/")[1];
      getArticles(t[1], a)
  })), $("body").on("click", ".cumulativeItc", (function() {
      var a = $(this).attr("data-id"),
          t = $(this).attr("data-data");
      let e = new URL(window.location.href).searchParams.get("period");
      csrftoken(), $.ajax({
          type: "post",
          url: "/itc-computation",
          data: {
              id: a,
              cumitc: t,
              period: e
          },
          datatype: "json",
          success: function(a) {
              $("#cumulativeItc").modal("show"), $(".itccomputation").html(a.itccomp), $(".cumulative").html(a.cumulative), $(".max-itc").html(a.max), $(".itc-not").html(a.itcnot)
          }
      })
  })), $(document).ready((function() {
      $("body").on("click", ".toggle-button", (function(a) {
          a.preventDefault();
          var t = $(this).index(".toggle-button"),
              e = $(".my-table").eq(t);
          e.toggleClass("hidden"), e.hasClass("hidden") ? $(this).text("(Show Data by 2B)") : $(this).text("(Hide Data by 2B)")
      }))
  })), $("body").on("change", "#datepicker", (function() {
      var a = $(this).attr("data-id"),
          t = ($(this).attr("data-name"), $(this).val()),
          e = $("input[name=invoice_type]:checked").val();
      csrftoken(), $.ajax({
          type: "post",
          url: "/reports",
          data: {
              id: a,
              name: e,
              date: t
          },
          datatype: "json",
          success: function(a) {
              "cdn" == e ? ($(".filterSummary").html(""), $(".filterSummaryd").html(""), $(".filterSummaryt").html(""), $("#cdnapp:last").after(a.filtersummary)) : ($(".filterSummaryd").html(""), $(".filterSummaryt").html(""), $(".filterSummary").html(a.filtersummary));
              $("#report_details").html(a.view), $("#datepicker").datepicker({
                  format: "mm/yyyy",
                  startView: "months",
                  minViewMode: "months",
                  autoclose: !0
              })
          }
      })
  })), $("#2bmulti").datepicker()({
      format: "mm/yyyy",
      startView: "months",
      minViewMode: "months",
      autoclose: !0
  }), $("input[name=invoice_type]").change((function() {
      var a = $("#datepicker").attr("data-id"),
          t = ($("#datepicker").attr("data-name"), $("#datepicker").val()),
          e = $("input[name=invoice_type]:checked").val();
      csrftoken(), $.ajax({
          type: "post",
          url: "/reports",
          data: {
              id: a,
              name: e,
              date: t
          },
          datatype: "json",
          success: function(a) {
              "cdn" == e ? ($(".filterSummary").html(""), $(".filterSummaryd").html(""), $(".filterSummaryt").html(""), $("#cdnapp:last").after(a.filtersummary)) : ($(".filterSummaryd").html(""), $(".filterSummaryt").html(""), $(".filterSummary").html(a.filtersummary));
              $("#report_details").html(a.view), $("#datepicker").datepicker({
                  format: "mm/yyyy",
                  startView: "months",
                  minViewMode: "months",
                  autoclose: !0
              })
          }
      })
  })), $("#datepicker").datepicker({
      format: "mm/yyyy",
      startView: "months",
      minViewMode: "months",
      autoclose: !0
  }), $("#date").datepicker({
      format: "yyyy-mm-dd",
      autoclose: !0
  }), $(document).on("click", ".pagination a", (function(a) {
      a.preventDefault(), record($(this).attr("href").split("page=")[1])
  })), $("body").on("click", ".page", (function() {
      $(".page").removeClass("btn-primary").css("background-color", "#ffffff"), $(this).addClass("btn-primary").css("background-color", "#0084d3");
      $("input[name=invoice_type]:checked").val();
      var a = $(this).attr("data-limit"),
          t = $("#id").val(),
          e = $("#date").val(),
          s = $("#type").val();
      csrftoken(), $.ajax({
          type: "post",
          url: "/reports",
          data: {
              id: t,
              date: e,
              limit: a,
              name: s
          },
          dataType: "json",
          success: function(a) {
              $("#report_details").html(a.view), $("#datepicker").datepicker({
                  format: "mm/yyyy",
                  startView: "months",
                  minViewMode: "months",
                  autoclose: !0
              })
          }
      })
  })), $(".itc_com").on("click", (function() {
      var a = $("input[type='radio'].itc_com:checked").val(),
          t = $(this).attr("data-id"),
          e = $(this).attr("data-period");
      csrftoken(), $.ajax({
          type: "post",
          url: "/itc_comp",
          data: {
              selectedValue: a,
              userid: t,
              period: e
          },
          dataType: "html",
          success: function(a) {
              $(".itc_Comparision").html(a)
          }
      })
  })), $("#description").on("keyup", (function() {
      $(".des").text("")
  })), $("#image").on("change", (function() {
      $(".img").text("")
  })), $("#title, #date").on("keyup", (function() {
      $(this).next("span").remove()
  })), $("body").on("click", ".saveportal", (function() {
      var a = $(this).attr("data-id");
      csrftoken(), $.ajax({
          type: "post",
          url: "/save3bPortal",
          data: {
              id: a
          },
          dataType: "json",
          success: function(a) {
              console.log(a), 1 == a.response ? alertify.success("Successfully updated") : alertify.error("Something went wrong")
          }
      })
  })), $("#years").change((function() {
      var a = $(this).find("option:selected"),
          t = a.val(),
          e = a.attr("data-id");
      csrftoken(), $.ajax({
          type: "post",
          url: "/gst3-B1-Books-Report-filter",
          data: {
              id: e,
              year: t
          },
          dataType: "json",
          success: function(a) {
              $(".appengstr3b").html(a.gstr3b), $("#sectionlevel").html(a.summary)
          }
      })
  })), $("body").on("click", ".itcnotav", (function() {
      $(this).css({
          "border-radius": "4px 0px 0px 4px",
          "background-color": "#0084d3",
          color: "rgb(255, 255, 255)"
      }), $(".itctav").css({
          color: "#000",
          "background-color": "rgb(255, 255, 255)",
          border: "1px solid rgb(190, 194, 204)"
      });
      var a = $("#2bmulti").val(),
          t = $(this).attr("data-id");
      csrftoken(), $.ajax({
          type: "post",
          url: "/gst2b-not-ava",
          data: {
              id: t,
              date: a
          },
          dataType: "html",
          success: function(a) {
              $("#itcnotavid").html(a)
          }
      })
  })), $("body").on("click", ".itctav", (function() {
      $(".itctav").css({
          "border-radius": "4px 0px 0px 4px",
          "background-color": "#0084d3",
          color: "rgb(255, 255, 255)"
      }), $(".itcnotav").css({
          color: "#000",
          "background-color": "rgb(255, 255, 255)",
          border: "1px solid rgb(190, 194, 204)"
      });
      var a = $("#2bmulti").val(),
          t = $(this).attr("data-id");
      csrftoken(), $.ajax({
          type: "post",
          url: "/gst2BAvailable",
          data: {
              id: t,
              date: a
          },
          dataType: "html",
          success: function(a) {
              $("#itcnotavid").html(a)
          }
      })
  })), $("body").on("change", ".multimonth", (function() {
      var a = $(".type").val();
      "av" == a ? ($(".itctav").css({
          "border-radius": "4px 0px 0px 4px",
          "background-color": "#0084d3",
          color: "rgb(255, 255, 255)"
      }), $(".itcnotav").css({
          color: "#000",
          "background-color": "rgb(255, 255, 255)",
          border: "1px solid rgb(190, 194, 204)"
      })) : ($(".itcnotav").css({
          "border-radius": "4px 0px 0px 4px",
          "background-color": "#0084d3",
          color: "rgb(255, 255, 255)"
      }), $(".itctav").css({
          color: "#000",
          "background-color": "rgb(255, 255, 255)",
          border: "1px solid rgb(190, 194, 204)"
      }));
      var t = $(this).attr("data-id"),
          e = $(this).attr("data-name"),
          s = $(this).val();
      $(this);
      csrftoken(), $.ajax({
          type: "post",
          url: "/get2bdata",
          data: {
              id: t,
              name: e,
              date: s,
              type: a
          },
          dataType: "html",
          success: function(a) {
              $("#itcnotavid").html(a)
          }
      })
  })), $("body").on("change", ".multimonth", (function() {
      var a = $(".type").val();
      "av" == a ? ($(".summary").css({
          "border-radius": "4px 0px 0px 4px",
          "background-color": "#0084d3",
          color: "rgb(255, 255, 255)"
      }), $(".detailview").css({
          color: "#000",
          "background-color": "rgb(255, 255, 255)",
          border: "1px solid rgb(190, 194, 204)"
      })) : ($(".detailview").css({
          "border-radius": "4px 0px 0px 4px",
          "background-color": "#0084d3",
          color: "rgb(255, 255, 255)"
      }), $(".summary").css({
          color: "#000",
          "background-color": "rgb(255, 255, 255)",
          border: "1px solid rgb(190, 194, 204)"
      }));
      var t = $(this).attr("data-id"),
          e = $(this).attr("data-name"),
          s = $(this).val(),
          i = ($(this), $("#search2bvalue").find(":selected").val());
      csrftoken(), $.ajax({
          type: "post",
          url: "/get2bdetailsviewdata",
          data: {
              id: t,
              name: e,
              date: s,
              type: a,
              value: i
          },
          dataType: "html",
          success: function(a) {
              $("#detailsview").html(a)
          }
      })
  })), $("body").on("click", ".summary", (function() {
      var a = $(".type").val();
      $(".summary").css({
          "border-radius": "4px 0px 0px 4px",
          "background-color": "#0084d3",
          color: "rgb(255, 255, 255)"
      }), $(".detailview").css({
          color: "#000",
          "background-color": "rgb(255, 255, 255)",
          border: "1px solid rgb(190, 194, 204)"
      });
      var t = $(this).attr("data-id"),
          e = $(this).attr("data-name"),
          s = $("#2bmulti").val(),
          i = ($(this), $("#search2bvalue").find(":selected").val());
      csrftoken(), $.ajax({
          type: "post",
          url: "/get2bdetailsviewdata",
          data: {
              id: t,
              name: e,
              date: s,
              type: a,
              value: i
          },
          dataType: "html",
          success: function(a) {
              $("#detailsview").html(a)
          }
      })
  })), $("body").on("click", ".detailview", (function() {
      var a = $(".type").val();
      $(".detailview").css({
          "border-radius": "4px 0px 0px 4px",
          "background-color": "#0084d3",
          color: "rgb(255, 255, 255)"
      }), $(".summary").css({
          color: "#000",
          "background-color": "rgb(255, 255, 255)",
          border: "1px solid rgb(190, 194, 204)"
      });
      var t = $(this).attr("data-id"),
          e = $(this).attr("data-name"),
          s = $("#2bmulti").val(),
          i = ($(this), $("#search2bvalue").find(":selected").val());
      csrftoken(), $.ajax({
          type: "post",
          url: "/get2bdetailsdocviewdata",
          data: {
              id: t,
              name: e,
              date: s,
              type: a,
              value: i
          },
          dataType: "html",
          success: function(a) {
              $("#detailsview").html(a)
          }
      })
  })), $("body").on("change", "#search2bvalue", (function() {
      var a = $("#search2bvalue").find(":selected").val(),
          t = $(this).attr("data-id"),
          e = $("#2bmulti").val(),
          s = ($(this), $(".detail_typex").val());
      csrftoken(), $.ajax({
          type: "post",
          url: "/get2bsummaydetailsdocdata",
          data: {
              id: t,
              date: e,
              type: s,
              value: a
          },
          dataType: "html",
          success: function(a) {
              $("#detailsview").html(a)
          }
      })
  })), $("body").on("click", "#hsnwise", (function() {
      var a = $(this).attr("data-user_id"),
          t = $(this).attr("data-period");
      $(".hsnwise").append('<tr><input class=hsnkey data-key=hsnkey name=hsnkey type=hiiden><td><input class="changeentry form-control"data-key=hsn_sc data-date="' + t + '"data-field=gstr9HsnIN data-id="' + a + '"data-index=""><td><input class="changeentry form-control"data-key=desc data-date="' + t + '"data-field=gstr9HsnIN data-id="' + a + '"data-index=""><td><input class="changeentry form-control"data-key=uqc data-date="' + t + '"data-field=gstr9HsnIN data-id="' + a + '"data-index=""><td><input class="changeentry form-control"data-key=qty data-date="' + t + '"data-field=gstr9HsnIN data-id="' + a + '"data-index=""><td><input class="changeentry form-control"data-key=txval data-date="' + t + '"data-field=gstr9HsnIN data-id="' + a + '"data-index=""><td><input class="changeentry form-control"data-key=rt data-date="' + t + '"data-field=gstr9HsnIN data-id="' + a + '"data-index=""><td><input class="changeentry form-control"data-key=isconcesstional data-date="' + t + '"data-field=gstr9HsnIN data-id="' + a + '"data-index=""><td><input class="changeentry form-control"data-key=iamt data-date="' + t + '"data-field=gstr9HsnIN data-id="' + a + '"data-index=""><td><input class="changeentry form-control"data-key=camt data-date="' + t + '"data-field=gstr9HsnIN data-id="' + a + '"data-index=""><td><input class="changeentry form-control"data-key=samt data-date="' + t + '"data-field=gstr9HsnIN data-id="' + a + '"data-index=""><td><input class="changeentry form-control"data-key=csamt data-date="' + t + '"data-field=gstr9HsnIN data-id="' + a + '"data-index=""><td><div class=action_container><button class=danger onclick=remove_tr(this)><i class="fa-solid fa-trash"></i></button> <button class="submithsn success"data-date="' + t + '"data-id="' + a + '"type=button><i class="fa-solid fa-square fas"></i></button></div></tr>')
  })), $("body").on("click", "#hsnout", (function() {
      var a = $(this).attr("data-user_id"),
          t = $(this).attr("data-period");
      $(".hsnout").append('<tr><input class=key data-key=key type=hidden><td><input class="changeentry form-control"data-key=hsn_sc data-date="' + t + '"data-field=gstr9HsnOwt data-id="' + a + '"data-index=""><td><input class="changeentry form-control"data-key=desc data-date="' + t + '"data-field=gstr9HsnOwt data-id="' + a + '"data-index={{$key}}><td><input class="changeentry form-control"data-key=uqc data-date="' + t + '"data-field=gstr9HsnOwt data-id="' + a + '"data-index=""><td><input class="changeentry form-control"data-key=qty data-date="' + t + '"data-field=gstr9HsnOwt data-id="' + a + '"data-index=""><td><input class="changeentry form-control"data-key=txval data-date="' + t + '"data-field=gstr9HsnOwt data-id="' + a + '"data-index=""><td><input class="changeentry form-control"data-key=rt data-date="' + t + '"data-field=gstr9HsnOwt data-id="' + a + '"data-index=""><td><input class="changeentry form-control"data-key=isconcesstional data-date="' + t + '"data-field=gstr9HsnOwt data-id="' + a + '"data-index=""><td><input class="changeentry form-control"data-key=iamt data-date="' + t + '"data-field=gstr9HsnOwt data-id="' + a + '"data-index=""><td><input class="changeentry form-control"data-key=camt data-date="' + t + '"data-field=gstr9HsnOwt data-id="' + a + '"data-index=""><td><input class="changeentry form-control"data-key=samt data-date="' + t + '"data-field=gstr9HsnOwt data-id="' + a + '"data-index=""><td><input class="changeentry form-control"data-key=csamt data-date="' + t + '"data-field=gstr9HsnOwt data-id="' + a + '"data-index=""><td><div class=action_container><button class=danger onclick=remove_tr(this)><i class="fa-solid fa-trash"></i></button><div></div><button class="submitgstr9 success"data-date="' + t + '"data-field=gstr9HsnOwt data-id="' + a + '"type=button><i class="fa-solid fa-square fas"></i></button></div>')
  })), $("body").on("change", ".changeentry", (function() {
      var a = $(this).attr("data-field"),
          t = $(this).attr("data-key"),
          e = $(this).attr("data-id"),
          s = $(this).attr("data-date"),
          i = $(this).attr("data-index"),
          n = $(this).val().replace(/\s+/g, "");
      csrftoken(), $.ajax({
          type: "post",
          url: "/gstr9ChangeData",
          data: {
              id: e,
              key: t,
              field: a,
              date: s,
              index: i,
              data: n
          },
          dataType: "json",
          success: function(a) {
              1 == a.success ? thi.html('<i class="fa-solid  fa-check"></i>') : thi.html('<i class="fa-solid fas fa-square"></i>')
          }
      })
  })), $("body").on("click", ".submitgstr9", (function() {
      var a = $(this).attr("data-id"),
          t = $(this).attr("data-date"),
          e = $(this).attr("data-field"),
          s = $(this).parents("tr").find(".key").val(),
          i = {};
      $(this).parents("tr").find("input").each((function() {
          var a = $(this).attr("data-key"),
              t = $(this).val().replace(/\s+/g, "");
          i[a] = t
      }));
      var n = $(this);
      n.html('<i class="fa fa-spinner fa-spin"></i>'), csrftoken(), $.ajax({
          type: "post",
          url: "/gstr9ChangeDataWithKey",
          data: {
              id: a,
              field: e,
              date: t,
              index: s,
              dataarray: i
          },
          dataType: "json",
          success: function(a) {
              1 == a.success ? n.html('<i class="fa-solid  fa-check"></i>') : n.html('<i class="fa-solid fas fa-square"></i>')
          }
      })
  })), $("body").on("click", ".submithsn", (function() {
      var a, t = $(this).attr("data-id"),
          e = $(this).attr("data-date"),
          s = $(this).parents("tr").find(".hsnkey").val(),
          i = {};
      $(this).parents("tr").find("input").each((function() {
          var t = $(this).attr("data-key");
          a = $(this).attr("data-field");
          var e = $(this).val().replace(/\s+/g, "");
          i[t] = e
      }));
      var n = a,
          d = $(this);
      d.html('<i class="fa fa-spinner fa-spin"></i>'), csrftoken(), $.ajax({
          type: "post",
          url: "/gstr9ChangeDataWithKey",
          data: {
              id: t,
              field: n,
              date: e,
              index: s,
              dataarray: i
          },
          dataType: "json",
          success: function(a) {
              1 == a.success ? d.html('<i class="fa-solid  fa-check"></i>') : d.html('<i class="fa-solid fas fa-square"></i>')
          }
      })
  })), $("body").on("click", ".popup", (function() {
      var a = $(this).attr("data-bs-target"),
          t = $(this).attr("data-id"),
          e = $(this).attr("data-date"),
          s = $(this).attr("data-field");
      csrftoken(), $.ajax({
          type: "post",
          url: "/salespopup",
          data: {
              id: t,
              field: s,
              date: e,
              target: a
          },
          dataType: "html",
          success: function(a) {
              $("#suppliesUnregisteredB2c").modal("show"), $(".appendsales").html(a)
          }
      })
  })), $("body").on("click", ".sales-register-pop", (function() {
      $("#dummyModal").modal("show")
  })), $("body").on("click", "#selectsalesmonth", (function() {
      var a = $(".id").val(),
          t = $(".salesmonth").val();
      csrftoken(), $.ajax({
          type: "post",
          url: "/selectdm",
          data: {
              id: a,
              date: t
          },
          dataType: "json",
          success: function(a) {
              window.location.href = a.url
          }
      })
  })), $("body").on("click", ".uploadbook", (function() {
      $(".book_file").focus().trigger("click")
  })), $(".selectgstr").click((function() {
      var a = $(this).attr("data-id"),
          t = $(this).attr("data-type"),
          e = [],
          s = [],
          i = [];
      $(".selectgstr:checked").each((function() {
          var a = $(this).val().split("-");
          e.push(a[0]), s.push(a[1]), i.push(a[0] + "" + a[1])
      })), csrftoken(), $.ajax({
          type: "post",
          url: "/sectionfilter",
          data: {
              id: a,
              type: t,
              month: e,
              year: s,
              monthyear: i
          },
          dataType: "html",
          success: function(a) {
              $("#appendinvoice").html(a)
          }
      })
  }));
  var hidearray = [];
  $(".hidegstr").click((function() {
      var a = $(this).attr("data-value"),
          t = $(this).attr("data-id"),
          e = $(this).attr("data-type"),
          s = $(this).val();
      if ("matched" == e ? ($(".mismatched").prop("checked", !1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: t,
                  type: a,
                  method: "matched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendb2bmatched").html(a)
              }
          })) : "mismatched" == e && ($(".matched").prop("checked", !1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: t,
                  type: a,
                  method: "mismatched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendb2bmatched").html(a)
              }
          })), $(this).is(":checked")) hidearray.includes(s) || hidearray.push(s);
      else {
          var i = hidearray.indexOf(s); - 1 !== i && hidearray.splice(i, 1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: t,
                  type: a,
                  method: "unmatched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendb2bmatched").html(a)
              }
          })
      } - 1 != jQuery.inArray("inr1only", hidearray) ? "b2b" == a && $(".gb2b").show() : "b2b" == a && $(".gb2b").hide(), -1 != jQuery.inArray("inbookonly", hidearray) ? "b2b" == a && $(".bb2b").show() : "b2b" == a && $(".bb2b").hide()
  }));
  hidearray = [];
  $(".hidegstrb2cl").click((function() {
      var a = $(this).attr("data-value"),
          t = $(this).attr("data-id"),
          e = $(this).attr("data-type"),
          s = $(this).val();
      if ("matched" == e ? ($(".mismatchedb2cl").prop("checked", !1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: t,
                  type: a,
                  method: "matched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendb2cl").html(a)
              }
          })) : "mismatched" == e && ($(".matchedb2cl").prop("checked", !1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: t,
                  type: a,
                  method: "mismatched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendb2cl").html(a)
              }
          })), $(this).is(":checked")) hidearray.includes(s) || hidearray.push(s);
      else {
          var i = hidearray.indexOf(s); - 1 !== i && hidearray.splice(i, 1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: t,
                  type: a,
                  method: "unmatched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendb2cl").html(a)
              }
          })
      } - 1 != jQuery.inArray("inr1only", hidearray) ? "b2cl" == a && $(".b2clbooks").show() : "b2cl" == a && $(".b2clbooks").hide(), -1 != jQuery.inArray("inbookonly", hidearray) ? "b2cl" == a && $(".b2clgstrone").show() : "b2cl" == a && $(".b2clgstrone").hide()
  }));
  hidearray = [];
  $(".hidegstrb2cs").click((function() {
      var a = $(this).attr("data-id"),
          t = $(this).attr("data-type"),
          e = $(this).attr("data-value"),
          s = $(this).val();
      if ("matched" == t ? ($(".mismatchedb2cs").prop("checked", !1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: a,
                  type: e,
                  method: "matched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendb2cs").html(a)
              }
          })) : "mismatched" == t && ($(".matchedb2cs").prop("checked", !1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: a,
                  type: e,
                  method: "mismatched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendb2cs").html(a)
              }
          })), $(this).is(":checked")) hidearray.includes(s) || hidearray.push(s);
      else {
          var i = hidearray.indexOf(s); - 1 !== i && hidearray.splice(i, 1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: a,
                  type: e,
                  method: "unmatched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendb2cs").html(a)
              }
          })
      } - 1 != jQuery.inArray("inr1only", hidearray) ? "b2cs" == e && $(".bookb2s").show() : "b2cs" == e && $(".bookb2s").hide(), -1 != jQuery.inArray("inbookonly", hidearray) ? "b2cs" == e && $(".gstrb2cs").show() : "b2cs" == e && $(".gstrb2cs").hide()
  })), $(".hidegstrexport").click((function() {
      var a = [],
          t = $(this).attr("data-value"),
          e = $(this).attr("data-type"),
          s = $(this).attr("data-id"),
          i = $(this).val();
      if ("matched" == e ? ($(".mismatchedexport").prop("checked", !1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: s,
                  type: t,
                  method: "matched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendexport").html(a)
              }
          })) : "mismatched" == e && ($(".matchedexport").prop("checked", !1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: s,
                  type: t,
                  method: "mismatched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendexport").html(a)
              }
          })), $(this).is(":checked")) a.includes(i) || a.push(i);
      else {
          var n = a.indexOf(i); - 1 !== n && a.splice(n, 1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: s,
                  type: t,
                  method: "unmatched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendexport").html(a)
              }
          })
      } - 1 != jQuery.inArray("inr1only", a) ? "export" == t && $(".booksexport").show() : "export" == t && $(".booksexport").hide(), -1 != jQuery.inArray("inbookonly", a) ? "export" == t && $(".gstroneexport").show() : "export" == t && $(".gstroneexport").hide()
  }));
  hidearray = [];
  $(".hidegstrcdnr").click((function() {
      var a = $(this).attr("data-value"),
          t = $(this).attr("data-type"),
          e = $(this).attr("data-id"),
          s = $(this).val();
      if ("matched" == t ? ($(".mismatchedcdnr").prop("checked", !1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: e,
                  type: a,
                  method: "matched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendcdnr").html(a)
              }
          })) : "mismatched" == t && ($(".matchedcdnr").prop("checked", !1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: e,
                  type: a,
                  method: "mismatched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendcdnr").html(a)
              }
          })), $(this).is(":checked")) hidearray.includes(s) || hidearray.push(s);
      else {
          var i = hidearray.indexOf(s); - 1 !== i && hidearray.splice(i, 1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: e,
                  type: a,
                  method: "unmatched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendcdnr").html(a)
              }
          })
      } - 1 != jQuery.inArray("inr1only", hidearray) ? "cdnr" == a && $(".bookscdnr").show() : "cdnr" == a && $(".bookscdnr").hide(), -1 != jQuery.inArray("inbookonly", hidearray) ? "cdnr" == a && $(".gstronecdnr").show() : "cdnr" == a && $(".gstronecdnr").hide()
  }));
  hidearray = [];
  $(".hidegstrat").click((function() {
      var a = $(this).attr("data-value"),
          t = $(this).attr("data-type"),
          e = $(this).attr("data-id"),
          s = $(this).val();
      if ("matched" == t ? ($(".unmatched").prop("checked", !1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: e,
                  type: a,
                  method: "matched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendat").html(a)
              }
          })) : "mismatched" == t && ($(".matchedat").prop("checked", !1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: e,
                  type: a,
                  method: "mismatched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendat").html(a)
              }
          })), $(this).is(":checked")) hidearray.includes(s) || hidearray.push(s);
      else {
          var i = hidearray.indexOf(s); - 1 !== i && hidearray.splice(i, 1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: e,
                  type: a,
                  method: "unmatched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendat").html(a)
              }
          })
      } - 1 != jQuery.inArray("inr1only", hidearray) ? "At" == a && $(".booksat").show() : "At" == a && $(".booksat").hide(), -1 != jQuery.inArray("inbookonly", hidearray) ? "At" == a && $(".gstroneat").show() : "At" == a && $(".gstroneat").hide()
  })), $(".hidegstratadj").click((function() {
      var a = [],
          t = $(this).attr("data-value"),
          e = $(this).attr("data-type"),
          s = $(this).attr("data-id"),
          i = $(this).val();
      if ("matched" == e ? ($(".unmatchedatadj").prop("checked", !1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: s,
                  type: t,
                  method: "matched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendatadj").html(a)
              }
          })) : "mismatched" == e && ($(".matchedatadj").prop("checked", !1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: s,
                  type: t,
                  method: "mismatched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendatadj").html(a)
              }
          })), $(this).is(":checked")) a.includes(i) || a.push(i);
      else {
          var n = a.indexOf(i); - 1 !== n && a.splice(n, 1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: s,
                  type: t,
                  method: "unmatched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendatadj").html(a)
              }
          })
      } - 1 != jQuery.inArray("inr1only", a) ? "atadj" == t && $(".booksatadj").show() : "atadj" == t && $(".booksatadj").hide(), -1 != jQuery.inArray("inbookonly", a) ? "atadj" == t && $(".gstroneatadj").show() : "atadj" == t && $(".gstroneatadj").hide()
  })), $(".hidegstrexemp").click((function() {
      var a = [],
          t = $(this).attr("data-value"),
          e = $(this).attr("data-type"),
          s = $(this).attr("data-id"),
          i = $(this).val();
      if ("matched" == e ? ($(".matchedmismatched").prop("checked", !1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: s,
                  type: t,
                  method: "matched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendexemp").html(a)
              }
          })) : "mismatched" == e && ($(".matchedexemp").prop("checked", !1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: s,
                  type: t,
                  method: "mismatched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendexemp").html(a)
              }
          })), $(this).is(":checked")) a.includes(i) || a.push(i);
      else {
          var n = a.indexOf(i); - 1 !== n && a.splice(n, 1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: s,
                  type: t,
                  method: "unmatched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendexemp").html(a)
              }
          })
      } - 1 != jQuery.inArray("inr1only", a) ? "exemp" == t && $(".booksexemp").show() : "exemp" == t && $(".booksexemp").hide(), -1 != jQuery.inArray("inbookonly", a) ? "exemp" == t && $(".gstroneexemp").show() : "exemp" == t && $(".gstroneexemp").hide()
  })), $(".hidegstrcdnur").click((function() {
      var a = [],
          t = $(this).attr("data-value"),
          e = $(this).attr("data-type"),
          s = $(this).attr("data-id"),
          i = $(this).val();
      if ("matched" == e ? ($(".unmatchedcdnur").prop("checked", !1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: s,
                  type: t,
                  method: "matched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendcdnur").html(a)
              }
          })) : "mismatched" == e && ($(".matchedcdnur").prop("checked", !1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: s,
                  type: t,
                  method: "mismatched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendcdnur").html(a)
              }
          })), $(this).is(":checked")) a.includes(i) || a.push(i);
      else {
          var n = a.indexOf(i); - 1 !== n && a.splice(n, 1), csrftoken(), $.ajax({
              type: "post",
              url: "/matched_filter",
              data: {
                  id: s,
                  type: t,
                  method: "unmatched"
              },
              dataType: "html",
              success: function(a) {
                  $(".appendcdnur").html(a)
              }
          })
      } - 1 != jQuery.inArray("inr1only", a) ? "cdnur" == t && $(".bookscdnur").show() : "cdnur" == t && $(".bookscdnur").hide(), -1 != jQuery.inArray("inbookonly", a) ? "cdnur" == t && $(".gstronecdnur").show() : "cdnur" == t && $(".gstronecdnur").hide()
  })), $("body").on("click", ".annual", (function() {
      var a = $(this).attr("data-id");
      csrftoken(), $.ajax({
          type: "post",
          url: "/sectionfilter",
          data: {
              id: a,
              type: "annual"
          },
          dataType: "html",
          success: function(a) {
              $("#appendinvoice").html(a)
          }
      })
  })), $("body").on("click", ".lgnbtn", (function() {
      csrftoken(), $.ajax({
          type: "post",
          url: "/sectionfilter",
          data: {
              id: userid,
              type: type
          },
          dataType: "html",
          success: function(a) {
              $("#appendinvoice").html(a)
          }
      })
  }));
  
  
  
      
  