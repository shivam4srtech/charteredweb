
$('body').on('click','#contact',function(){  
  $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
        $.ajax({
            url: "/sendMail",
            type: 'POST',
            data: $('#contactFormid').serialize(),
            success: function(response) {
                alert(response.success);
                $('#contactForm')[0].reset();
            },
            error: function(response) {
                alert('There was an error sending your message. Please try again.');
            }
        });
   });


$('body').on('click','.successbtn',function(){
    var inv_number=$(this).parents('.b2bdetails').find('.inv_number').val();
    var inv_date=$(this).parents('.b2bdetails').find('.inv_date').val();
    var receiver_number=$(this).parents('.b2bdetails').find('.receiver_number').val();
    var gstin_number=$(this).parents('.b2bdetails').find('.gstin_number').val();
    var place_of_supply=$(this).parents('.b2bdetails').find('.place_of_supply').val();
    var reverse_charge=$(this).parents('.b2bdetails').find('.reverse_charge').val();
    var invoice_type=$(this).parents('.b2bdetails').find('.invoice_type').val();
    var inv_value=$(this).parents('.b2bdetails').find('.inv_value').val();
    var taxable_value=$(this).parents('.b2bdetails').find('.taxable_value').val();
    var rate=$(this).parents('.b2bdetails').find('.rate').val();
    var tax_rate=$(this).parents('.b2bdetails').find('.tax_rate').val();
    var cess_value=$(this).parents('.b2bdetails').find('.cess_value').val();
    var id=$(this).parents('.b2bdetails').find('.id').val();
    var date=$('.date').val();
    var user_id=$('.user_id').val();
    csrftoken();
    
    var thi=$(this);
    thi.html('<i class="fa fa-spinner fa-spin"></i>');
    $.ajax({
        type: 'post',
        url: "/updateb2b",
        data:{'id':id,'date':date,'user_id':user_id,'inv_number':inv_number,'inv_date':inv_date,'receiver_number':receiver_number,'gstin_number':gstin_number,'place_of_supply':place_of_supply,'reverse_charge':reverse_charge,'invoice_type':invoice_type,'inv_value':inv_value,'taxable_value':taxable_value,'rate':rate,'tax_rate':tax_rate,'cess_value':cess_value},
        dataType:'json',
        success: function(response) {
            
          if(response.success==true){
            thi.html('<i class="fa-solid fa-check"></i>');
          }
             
        },
    });
    
})
$('body').on('click','.updateb2cl',function(){
    var invoice_number=$(this).parents('.b2cldetails').find('.invoice_number').val();
    var invoice_date=$(this).parents('.b2cldetails').find('.invoice_date').val();
    var place_of_supply=$(this).parents('.b2cldetails').find('.place_of_supply').val();
    var invoice_value=$(this).parents('.b2cldetails').find('.invoice_value').val();
    var tax_value=$(this).parents('.b2cldetails').find('.tax_value').val();
    var rate=$(this).parents('.b2cldetails').find('.rate').val();
    var gstin=$(this).parents('.b2cldetails').find('.gstin').val();
    var cess_amount=$(this).parents('.b2cldetails').find('.cess_amount').val();
    var id=$(this).parents('.b2cldetails').find('.b2clid').val();
    var date=$('.date').val();
    var user_id=$('.user_id').val();
    csrftoken();
    
    var thi=$(this);
    thi.html('<i class="fa fa-spinner fa-spin"></i>');
    $.ajax({
        type: 'post',
        url: "/updateb2cl",
        data:{'id':id,'date':date,'user_id':user_id,'invoice_number':invoice_number,'invoice_date':invoice_date,'place_of_supply':place_of_supply,'tax_value':tax_value,'invoice_value':invoice_value,'gstin':gstin,'cess_amount':cess_amount,'rate':rate},
        dataType:'json',
        success: function(response) {
            
          if(response.success==true){
            thi.html('<i class="fa-solid fa-check"></i>');
          }
             
        },
    });

})
$('body').on('click','.updatecdnur',function(){
    var note_type=$(this).parents('.cdnurdetails').find('.note_type').val();
    var urtype=$(this).parents('.cdnurdetails').find('.urtype').val();
    var note_number=$(this).parents('.cdnurdetails').find('.note_number').val();
    var note_date=$(this).parents('.cdnurdetails').find('.note_date').val();
    var place_of_supply=$(this).parents('.cdnurdetails').find('.place_of_supply').val();
    var note_value=$(this).parents('.cdnurdetails').find('.note_value').val();
    var tax_value=$(this).parents('.cdnurdetails').find('.tax_value').val();
    var rate=$(this).parents('.cdnurdetails').find('.rate').val();
    var tax_rate=$(this).parents('.cdnurdetails').find('.tax_rate').val();
    var cess_amount=$(this).parents('.cdnurdetails').find('.cess_amount').val();
    var id=$(this).parents('.cdnurdetails').find('.cdnurid').val();
    var date=$('.date').val();
    var user_id=$('.user_id').val();
    csrftoken();
    
    var thi=$(this);
    thi.html('<i class="fa fa-spinner fa-spin"></i>');
    $.ajax({
        type: 'post',
        url: "/updatecdnur",
        data:{'id':id,'date':date,'user_id':user_id,'urtype':urtype,'note_number':note_number,'note_date':note_date,'note_type':note_type,'place_of_supply':place_of_supply,'note_value':note_value,'tax_rate':tax_rate,'rate':rate,'tax_value':tax_value,'cess_amount':cess_amount},
        dataType:'json',
        success: function(response) {
            
          if(response.success==true){
            thi.html('<i class="fa-solid fa-check"></i>');
          }
             
        },
    });

})

$('body').on('click','.updateb2cs',function(){
    var place_of_supply=$(this).parents('.b2csdetails').find('.place_of_supply').val();
    var rate=$(this).parents('.b2csdetails').find('.rate').val();
    var tax_value=$(this).parents('.b2csdetails').find('.tax_value').val();
    var cess_amount=$(this).parents('.b2csdetails').find('.cess_amount').val();
    var id=$(this).parents('.b2csdetails').find('.b2csid').val();
    var date=$('.date').val();
    var user_id=$('.user_id').val();
    csrftoken();
    
    var thi=$(this);
    thi.html('<i class="fa fa-spinner fa-spin"></i>');
    $.ajax({
        type: 'post',
        url: "/updateb2cs",
        data:{'id':id,'date':date,'user_id':user_id,'place_of_supply':place_of_supply,'rate':rate,'tax_value':tax_value,'cess_amount':cess_amount},
        dataType:'json',
        success: function(response) {
            
          if(response.success==true){
            thi.html('<i class="fa-solid fa-check"></i>');
          }
             
        },
    });
})

$('body').on('click','.updateata',function(){
    var financial_year=$(this).parents('.atadetails').find('.financial_year').val();
    var original_month=$(this).parents('.atadetails').find('.original_month').val();
    var original_place_of_supply=$(this).parents('.atadetails').find('.original_place_of_supply').val();
    var rate=$(this).parents('.atadetails').find('.rate').val();
    var gross_adv_rec=$(this).parents('.atadetails').find('.gross_adv_rec').val();
    var tax_rate=$(this).parents('.atadetails').find('.tax_rate').val();
    var cess_amount=$(this).parents('.atadetails').find('.cess_amount').val();
    var id=$(this).parents('.atadetails').find('.ataid').val();
    var date=$('.date').val();
    var user_id=$('.user_id').val();
    csrftoken();
    
    var thi=$(this);
    thi.html('<i class="fa fa-spinner fa-spin"></i>');
    $.ajax({
        type: 'post',
        url: "/updateata",
        data:{'id':id,'date':date,'user_id':user_id,'financial_year':financial_year,'original_month':original_month,'original_place_of_supply':original_place_of_supply,'rate':rate,'gross_adv_rec':gross_adv_rec,'tax_rate':tax_rate,'cess_amount':cess_amount},
        dataType:'json',
        success: function(response) {
            
          if(response.success==true){
            thi.html('<i class="fa-solid fa-check"></i>');
          }
             
        },
    });
})
$('body').on('click','.updatecdnra',function(){
    var note_type=$(this).parents('.cdnradetails').find('.note_type').val();
    var org_note_number=$(this).parents('.cdnradetails').find('.org_note_number').val();
    var org_note_date=$(this).parents('.cdnradetails').find('.org_note_date').val();
    var rev_note_number=$(this).parents('.cdnradetails').find('.rev_note_number').val();
    var rev_note_date=$(this).parents('.cdnradetails').find('.rev_note_date').val();
    var receiver_name=$(this).parents('.cdnradetails').find('.receiver_name').val();
    var gstin=$(this).parents('.cdnradetails').find('.gstin').val();
    var place_of_supply=$(this).parents('.cdnradetails').find('.place_of_supply').val();
    var rev_charge=$(this).parents('.cdnradetails').find('.rev_charge').val();
    var not_supply_type=$(this).parents('.cdnradetails').find('.not_supply_type').val();
    var tax_value=$(this).parents('.cdnradetails').find('.tax_value').val();
    var rate=$(this).parents('.cdnradetails').find('.rate').val();
    var tax_rate=$(this).parents('.cdnradetails').find('.tax_rate').val();
    var cess_amount=$(this).parents('.cdnradetails').find('.cess_amount').val();
    var id=$(this).parents('.cdnradetails').find('.cdnraid').val();

    var date=$('.date').val();
    var user_id=$('.user_id').val();
    csrftoken();
    
    var thi=$(this);
    thi.html('<i class="fa fa-spinner fa-spin"></i>');
    $.ajax({
        type: 'post',
        url: "/updatecdnra",
        data:{'id':id,'date':date,'user_id':user_id,'note_type':note_type,'org_note_number':org_note_number,
            'org_note_date':org_note_date,'rev_note_number':rev_note_number,'rev_note_date':rev_note_date,
            'receiver_name':receiver_name,'gstin':gstin,'place_of_supply':place_of_supply,
            'rev_charge':rev_charge,'not_supply_type':not_supply_type,'tax_value':tax_value,'rate':rate,'tax_rate':tax_rate,'cess_amount':cess_amount},
        dataType:'json',
        success: function(response) {
            
          if(response.success==true){
            thi.html('<i class="fa-solid fa-check"></i>');
          }
             
        },
    });
})

$('body').on('click','.updatecdnura',function(){
    var note_type=$(this).parents('.cdnuradetails').find('.note_type').val();
    var ur_type=$(this).parents('.cdnuradetails').find('.ur_type').val();
    var org_note_number=$(this).parents('.cdnuradetails').find('.org_note_number').val();
    var org_note_date=$(this).parents('.cdnuradetails').find('.org_note_date').val();
    var revised_note_number=$(this).parents('.cdnuradetails').find('.revised_note_number').val();
    var revised_note_date=$(this).parents('.cdnuradetails').find('.revised_note_date').val();
    var place_of_supply=$(this).parents('.cdnuradetails').find('.place_of_supply').val();
    var note_value=$(this).parents('.cdnuradetails').find('.note_value').val();
    var tax_value=$(this).parents('.cdnuradetails').find('.tax_value').val();
    var rate=$(this).parents('.cdnuradetails').find('.rate').val();
    var tax_rate=$(this).parents('.cdnuradetails').find('.tax_rate').val();
    var cess_amount=$(this).parents('.cdnuradetails').find('.cess_amount').val();
    var id=$(this).parents('.cdnuradetails').find('.cdnurid').val();
  
    var date=$('.date').val();
    var user_id=$('.user_id').val();
    csrftoken();
    
    var thi=$(this);
    thi.html('<i class="fa fa-spinner fa-spin"></i>');
    $.ajax({
        type: 'post',
        url: "/updatecdnura",
        data:{'id':id,'date':date,'user_id':user_id,'note_type':note_type,'ur_type':ur_type,
            'org_note_number':org_note_number,'org_note_date':org_note_date,'revised_note_number':revised_note_number
            ,'revised_note_date':revised_note_date,'place_of_supply':place_of_supply,'note_value':note_value,'tax_value':tax_value,
            'rate':rate,'tax_rate':tax_rate,'cess_amount':cess_amount},
        dataType:'json',
        success: function(response) {
            
          if(response.success==true){
            thi.html('<i class="fa-solid fa-check"></i>');
          }
             
        },
    });
   
})
$('body').on('click','.updatehsn',function(){
    var hsn=$(this).parents('.hsndetails').find('.hsn').val();
    var description=$(this).parents('.hsndetails').find('.description').val();
    var uqc=$(this).parents('.hsndetails').find('.uqc').val();
    var total_quantity=$(this).parents('.hsndetails').find('.total_quantity').val();
    var total_value=$(this).parents('.hsndetails').find('.total_value').val();
    var rate=$(this).parents('.hsndetails').find('.rate').val();
    var int_tax_amount=$(this).parents('.hsndetails').find('.int_tax_amount').val();
    var cen_tax_amount=$(this).parents('.hsndetails').find('.cen_tax_amount').val();
    var state_tax_amount=$(this).parents('.hsndetails').find('.state_tax_amount').val();
    var cess_amount=$(this).parents('.hsndetails').find('.cess_amount').val();
    
    var id=$(this).parents('.hsndetails').find('.hsnid').val();
  
    var date=$('.date').val();
    var user_id=$('.user_id').val();
    csrftoken();
    
    var thi=$(this);
    thi.html('<i class="fa fa-spinner fa-spin"></i>');
    $.ajax({
        type: 'post',
        url: "/updatehsn",
        data:{'id':id,'date':date,'user_id':user_id,'hsn':hsn,'description':description,
            'uqc':uqc,'total_quantity':total_quantity,'total_value':total_value
            ,'rate':rate,'int_tax_amount':int_tax_amount,'cen_tax_amount':cen_tax_amount,'state_tax_amount':state_tax_amount,
            'cess_amount':cess_amount},
        dataType:'json',
        success: function(response) {
            
          if(response.success==true){
            thi.html('<i class="fa-solid fa-check"></i>');
          }
             
        },
    });
   
})


$('body').on('click','.updatedoc',function(){
    var nat_of_doc=$(this).parents('.docdetails').find('.nat_of_doc').val();
    var no_from=$(this).parents('.docdetails').find('.no_from').val();
    var no_to=$(this).parents('.docdetails').find('.no_to').val();
    var total_number=$(this).parents('.docdetails').find('.total_number').val();
    var cancelled=$(this).parents('.docdetails').find('.cancelled').val();
    var net_issue=$(this).parents('.docdetails').find('.net_issue').val();
    
    var id=$(this).parents('.docdetails').find('.docid').val();
  
    var date=$('.date').val();
    var user_id=$('.user_id').val();
    csrftoken();
    
    var thi=$(this);
    thi.html('<i class="fa fa-spinner fa-spin"></i>');
    $.ajax({
        type: 'post',
        url: "/updatedoc",
        data:{'id':id,'date':date,'user_id':user_id,'nat_of_doc':nat_of_doc,'no_from':no_from,
            'no_to':no_to,'total_number':total_number,'cancelled':cancelled
            ,'net_issue':net_issue},
        dataType:'json',
        success: function(response) {
            
          if(response.success==true){
            thi.html('<i class="fa-solid fa-check"></i>');
          }
             
        },
    });
   
})

$('body').on('click','.updateexpa',function(){
    var org_invoice_num=$(this).parents('.expadetails').find('.org_invoice_num').val();
    var org_invoice_date=$(this).parents('.expadetails').find('.org_invoice_date').val();
    var ex_type=$(this).parents('.expadetails').find('.ex_type').val();
    var re_invoice_number=$(this).parents('.expadetails').find('.re_invoice_number').val();
    var re_invoice_date=$(this).parents('.expadetails').find('.re_invoice_date').val();
    var port_code=$(this).parents('.expadetails').find('.port_code').val();
    var ship_bill_number=$(this).parents('.expadetails').find('.ship_bill_number').val();
    var ship_bill_date=$(this).parents('.expadetails').find('.ship_bill_date').val();
    var inv_value=$(this).parents('.expadetails').find('.inv_value').val();
    var tax_value=$(this).parents('.expadetails').find('.tax_value').val();
    var rate=$(this).parents('.expadetails').find('.rate').val();
    var igst=$(this).parents('.expadetails').find('.igst').val();
    var cess_amount=$(this).parents('.expadetails').find('.cess_amount').val();
    var id=$(this).parents('.expadetails').find('.expid').val();

    var date=$('.date').val();
    var user_id=$('.user_id').val();
    csrftoken();
    
    var thi=$(this);
    thi.html('<i class="fa fa-spinner fa-spin"></i>');
    $.ajax({
        type: 'post',
        url: "/updateexpa",
        data:{'id':id,'date':date,'user_id':user_id,'org_invoice_num':org_invoice_num,'org_invoice_date':org_invoice_date,
            'ex_type':ex_type,'re_invoice_number':re_invoice_number,'re_invoice_date':re_invoice_date,'port_code':port_code,'ship_bill_number':ship_bill_number,'ship_bill_date':ship_bill_date,'inv_value':inv_value,'tax_value':tax_value,'rate':rate,'igst':igst,'cess_amount':cess_amount},
        dataType:'json',
        success: function(response) {
            
          if(response.success==true){
            thi.html('<i class="fa-solid fa-check"></i>');
          }
             
        },
    });
})



$('body').on('click','.updateb2cla',function(){
    var org_inv_number=$(this).parents('.b2cladetails').find('.org_inv_number').val();
    var org_invoice_date=$(this).parents('.b2cladetails').find('.org_invoice_date').val();
    var org_place_of_supp=$(this).parents('.b2cladetails').find('.org_place_of_supp').val();
    var re_inv_number=$(this).parents('.b2cladetails').find('.re_inv_number').val();
    var re_inv_date=$(this).parents('.b2cladetails').find('.re_inv_date').val();
    var inv_value=$(this).parents('.b2cladetails').find('.inv_value').val();
    var tax_value=$(this).parents('.b2cladetails').find('.tax_value').val();
    var rate=$(this).parents('.b2cladetails').find('.rate').val();
    var tax_rate=$(this).parents('.b2cladetails').find('.tax_rate').val();
    var cess_amount=$(this).parents('.b2cladetails').find('.cess_amount').val();
    var id=$(this).parents('.b2cladetails').find('.b2claid').val();

    var date=$('.date').val();
    var user_id=$('.user_id').val();
    csrftoken();
    
    var thi=$(this);
    thi.html('<i class="fa fa-spinner fa-spin"></i>');
    $.ajax({
        type: 'post',
        url: "/updateb2cla",
        data:{'id':id,'date':date,'user_id':user_id,'org_inv_number':org_inv_number,'org_invoice_date':org_invoice_date,
            'org_place_of_supp':org_place_of_supp,'re_inv_number':re_inv_number,'re_inv_date':re_inv_date,'inv_value':inv_value,'tax_value':tax_value,'rate':rate,'tax_rate':tax_rate,'cess_amount':cess_amount},
        dataType:'json',
        success: function(response) {
            
          if(response.success==true){
            thi.html('<i class="fa-solid fa-check"></i>');
          }
             
        },
    });
})
$('body').on('click','.updateb2csa',function(){
    var financial_year=$(this).parents('.b2csadetails').find('.financial_year').val();
    var original_month=$(this).parents('.b2csadetails').find('.original_month').val();
    var place_of_supply=$(this).parents('.b2csadetails').find('.place_of_supply').val();
    var rate=$(this).parents('.b2csadetails').find('.rate').val();
    var tax_rate=$(this).parents('.b2csadetails').find('.tax_rate').val();
    var tax_val=$(this).parents('.b2csadetails').find('.tax_value').val();
    var cess_amount=$(this).parents('.b2csadetails').find('.cess_amount').val();
    var id=$(this).parents('.b2csadetails').find('.b2csaid').val();
    var date=$('.date').val();
    var user_id=$('.user_id').val();
    csrftoken();
    
    var thi=$(this);
    thi.html('<i class="fa fa-spinner fa-spin"></i>');
    $.ajax({
        type: 'post',
        url: "/updateb2csa",
        data:{'id':id,'date':date,'user_id':user_id,'financial_year':financial_year,'original_month':original_month,'place_of_supply':place_of_supply,'rate':rate,'tax_rate':tax_rate,'tax_val':tax_val,'cess_amount':cess_amount},
        dataType:'json',
        success: function(response) {
            
          if(response.success==true){
            thi.html('<i class="fa-solid fa-check"></i>');
          }
             
        },
    });
})
$('body').on('click','.updateatadja',function(){
    var financial_year=$(this).parents('.atadjadetails').find('.financial_year').val();
    var original_month=$(this).parents('.atadjadetails').find('.original_month').val();
    var ori_place_of_supply=$(this).parents('.atadjadetails').find('.ori_place_of_supply').val();
    var rate=$(this).parents('.atadjadetails').find('.rate').val();
    var tax_rate=$(this).parents('.atadjadetails').find('.tax_rate').val();
    var tax_val=$(this).parents('.atadjadetails').find('.tax_val').val();
    var cess_amount=$(this).parents('.atadjadetails').find('.cess_amount').val();
    var id=$(this).parents('.atadjadetails').find('.atadjaid').val();
    var date=$('.date').val();
    var user_id=$('.user_id').val();
    csrftoken();
    
    var thi=$(this);
    thi.html('<i class="fa fa-spinner fa-spin"></i>');
    $.ajax({
        type: 'post',
        url: "/updateatadja",
        data:{'id':id,'date':date,'user_id':user_id,'financial_year':financial_year,'original_month':original_month,'ori_place_of_supply':ori_place_of_supply,'rate':rate,'tax_rate':tax_rate,'tax_val':tax_val,'cess_amount':cess_amount},
        dataType:'json',
        success: function(response) {
            
          if(response.success==true){
            thi.html('<i class="fa-solid fa-check"></i>');
          }
             
        },
    });
})

$('body').on('click','.updateatadj',function(){
    var place_of_supply=$(this).parents('.atadjdetails').find('.place_of_supply').val();
    var rate=$(this).parents('.atadjdetails').find('.rate').val();
    var gross_adv_adjusted=$(this).parents('.atadjdetails').find('.gross_adv_adjusted').val();
    var tax_rate=$(this).parents('.atadjdetails').find('.tax_rate').val();
    var cess_amount=$(this).parents('.atadjdetails').find('.cess_amount').val();
    var id=$(this).parents('.atadjdetails').find('.atadjid').val();
    var date=$('.date').val();
    var user_id=$('.user_id').val();
    csrftoken();
    
    var thi=$(this);
    thi.html('<i class="fa fa-spinner fa-spin"></i>');
    $.ajax({
        type: 'post',
        url: "/updateatadj",
        data:{'id':id,'date':date,'user_id':user_id,'place_of_supply':place_of_supply,'rate':rate,'gross_adv_adjusted':gross_adv_adjusted,'tax_rate':tax_rate,'cess_amount':cess_amount},
        dataType:'json',
        success: function(response) {
            
          if(response.success==true){
            thi.html('<i class="fa-solid fa-check"></i>');
          }
             
        },
    });
})

$('body').on('click','.btnadvrec',function(){
    var place_of_supply=$(this).parents('.atdetails').find('.place_of_supply').val();
    var rate=$(this).parents('.atdetails').find('.rate').val();
    var gross_adv_rec=$(this).parents('.atdetails').find('.gross_adv_rec').val();
    var tax_rate=$(this).parents('.atdetails').find('.tax_rate').val();
    var cess_amount=$(this).parents('.atdetails').find('.cess_amount').val();
    var id=$(this).parents('.atdetails').find('.atid').val();
    var date=$('.date').val();
    var user_id=$('.user_id').val();
    csrftoken();
    
    var thi=$(this);
    thi.html('<i class="fa fa-spinner fa-spin"></i>');
    $.ajax({
        type: 'post',
        url: "/updateAt",
        data:{'id':id,'date':date,'user_id':user_id,'place_of_supply':place_of_supply,'rate':rate,'gross_adv_rec':gross_adv_rec,
            'tax_rate':tax_rate,'cess_amount':cess_amount},
        dataType:'json',
        success: function(response) {
          if(response.success==true){
            thi.html('<i class="fa-solid fa-check"></i>');
          }
             
        },
    });

})
$('body').on('click','.updateexport',function(){
    var exp_type=$(this).parents('.expdetails').find('.exp_type').val();
    var inv_number=$(this).parents('.expdetails').find('.inv_number').val();
    var inv_date=$(this).parents('.expdetails').find('.inv_date').val();
    var port_code=$(this).parents('.expdetails').find('.port_code').val();
    var ship_bill_num=$(this).parents('.expdetails').find('.ship_bill_num').val();
    var ship_bill_date=$(this).parents('.expdetails').find('.ship_bill_date').val();
    var inv_value=$(this).parents('.expdetails').find('.inv_value').val();
    var tax_value=$(this).parents('.expdetails').find('.tax_value').val();
    var rate=$(this).parents('.expdetails').find('.rate').val();
   
    var cess_amount=$(this).parents('.expdetails').find('.cess_amount').val();
    
    var id=$(this).parents('.expdetails').find('.expid').val();
    var date=$('.date').val();
    var user_id=$('.user_id').val();
    csrftoken();
    
    var thi=$(this);
    thi.html('<i class="fa fa-spinner fa-spin"></i>');
    $.ajax({
        type: 'post',
        url: "/updateExport",
        data:{'id':id,'date':date,'user_id':user_id,'exp_type':exp_type,'inv_number':inv_number,'inv_date':inv_date,
            'port_code':port_code,'ship_bill_num':ship_bill_num,
            'ship_bill_date':ship_bill_date,'inv_value':inv_value,
            'tax_value':tax_value,'rate':rate,'cess_amount':cess_amount},
        dataType:'json',
        success: function(response) {
            
          if(response.success==true){
            thi.html('<i class="fa-solid fa-check"></i>');
          }
             
        },
    });
})


$('body').on('click','.successcdnr',function(){
    var note_type=$(this).parents('.cdnrdetails').find('.note_type').val();
    var note_number=$(this).parents('.cdnrdetails').find('.note_number').val();
    var note_date=$(this).parents('.cdnrdetails').find('.note_date').val();
    var rec_name=$(this).parents('.cdnrdetails').find('.rec_name').val();
    var gstin=$(this).parents('.cdnrdetails').find('.gstin').val();
    var place_of_supply=$(this).parents('.cdnrdetails').find('.place_of_supply').val();
    var reverse_charge=$(this).parents('.cdnrdetails').find('.reverse_charge').val();
    var note_supply_type=$(this).parents('.cdnrdetails').find('.note_supply_type').val();
    var note_value=$(this).parents('.cdnrdetails').find('.note_value').val();
    var tax_value=$(this).parents('.cdnrdetails').find('.tax_value').val();
    var rate=$(this).parents('.cdnrdetails').find('.rate').val();
    var tax_rate=$(this).parents('.cdnrdetails').find('.tax_rate').val();
    var cess_amount=$(this).parents('.cdnrdetails').find('.cess_amount').val();
    var id=$(this).parents('.cdnrdetails').find('.cdnrid').val();
    var date=$('.date').val();
    var user_id=$('.user_id').val();
    csrftoken();
    
    var thi=$(this);
    thi.html('<i class="fa fa-spinner fa-spin"></i>');
    $.ajax({
        type: 'post',
        url: "/updatecdnr",
        data:{'id':id,'date':date,'user_id':user_id,'note_type':note_type,'note_number':note_number,'note_date':note_date,'rec_name':rec_name,'gstin':gstin,'place_of_supply':place_of_supply,'reverse_charge':reverse_charge,'note_supply_type':note_supply_type,'note_value':note_value,'tax_value':tax_value,'rate':rate,'tax_rate':tax_rate,'cess_amount':cess_amount},
        dataType:'json',
        success: function(response) {
            
          if(response.success==true){
            thi.html('<i class="fa-solid fa-check"></i>');
          }
             
        },
    });

})

// $('body').on('click','.deletebookbtn',function(){
//     var url=$(this).attr('data-url');
//     var id=$(this).attr('data-id');
//     var value=$(this).attr('data-value');
//     csrftoken();
    
//     var thi=$(this);
//     thi.html('<i class="fa fa-spinner fa-spin"></i>');
//     $.ajax({
//         type: 'post',
//         url: url,
//         data:{'id':id,'value':value},
//         dataType:'json',
//         success: function(response) {
            
//           if(response.success==true){
//             thi.html('<i class="fa-solid fa-check"></i>');
//           }
             
//         },
//     });


// })

$('body').on('click','.opencertificate',function(){
    $('#viewSampleCertificate').modal('show')
    var url=$(this).attr('data-img');
    $('.crt_img').attr('src',url);
})
$(document).ready(function() {

    var url = new URL(window.location.href);
    var path = window.location.pathname; // Get the path of the URL
  
    var segments = path.split('/'); // Split the path into segments
    var number = segments[segments.length - 1];
    var numbers = segments[segments.length - 2];

    if(numbers=='section-wise-doc'){
    var id=number;
    csrftoken();
   
    $.ajax({
        type: 'post',
        url: "/loginFrmSection",
        data:{'id':id},
        dataType:'json',
        success: function(response) {
            
            $('#userlogin').modal('show');
            $('.userloginpage').html(response.view);  
             
        },
    });
    }
  
})

$('body').on('change','.section-wise-data',function(){
    var id=$(this).attr('data-id')
    var period=$(this).find(":selected").val();
    var month=$(this).parents('.flex-row').find('.month').find(":selected").val();
    var assignedRoleId = new Array();
    $('.section-wise-data option').each(function(){
        assignedRoleId.push(this.value);
    });
  
    csrftoken();
    
    $.ajax({
        type: 'post',
        url: "/loginFrm",
        data:{'id':id,period:period,month:month,value:'section-wise-data',assignedRoleId:assignedRoleId},
        dataType:'json',
        success: function(response) {
            if(response.type=='section-wise-data'){
            $('#appendinvoice').html(response.view);
            }else{
            $('#userlogin').modal('show');
            $('.userloginpage').html(response.view);   
            }
             
        },
    });
  
})
$('body').on('click','#deleteService',function(){
    var service_id=$(this).attr('data-id');
    
    alertify.confirm("Are you sure you want to delete?", function (asc) {
    if (asc) {
    
    $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      $.ajax({
        type: 'post',
        url:"/deleteService",
        data:{service_id:service_id},
        dataType:'json',
        success:function(response){
           
            alertify.success(response.message);
            window.location.href = response.redirect
        }
    })

        } else {
           // alertify.error("You've clicked cancel");
        }
    }, "Default Value");
   
    
})
$('body').on('click','.createuser',function(){
    var email=$('#email').val();
    var password=$('#password').val();
    var name=$('#name').val();
    $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
  
        $.ajax({
            type: 'post',
            url: "/create-users",
            data:{email:email,password:password,name:name},
            dataType: 'json',
            success: function(data) {
                if (data.success == true) {
             
                    alertify.success(data.message);
                    window.location.href = data.redirect
                } else {
                    alertify.error(data.message);
                }
            },
            error: function(err) {
                console.warn(err.responseJSON.errors);
                // Remove previous error messages
                $('.error-message').remove();
            
                // Display errors on each form field
                $.each(err.responseJSON.errors, function(i, error) {
                    var el = $(document).find('[name="' + i + '"]');
                    el.after($('<span class="error-message" style="color: red;">' + error[0] + '</span>'));
                });
            }
        });
})
$('body').on('click','.serviceName',function(){
    var id=$(this).attr('data-id');
    var name=$(this).attr('data-name');
     var image=$(this).attr('data-image');

    $('.modeltitle').html('<img src="'+image+'" alt="pvt-ltd-company" height="40" width="40"> '+name);
    csrftoken();
    $.ajax({
        type: 'post',
        url:"/serviceModel",
        data:{id:id},
        dataType:'html',
        success:function(response){
           
            $('#exploreService').modal('show')
           $('.appendserviesdata').html(response);
        }
    })
})
$('body').on('click','.editModal',function(){
    var id=$(this).attr('data-id');
    $('#service_id').val(id);
    csrftoken();
    var offcanvasElement = new bootstrap.Offcanvas(document.getElementById('editService'));
    offcanvasElement.show();
    $.ajax({
        type: 'post',
        url: "/get-service-data",
        data:{ id: id},
        dataType:'json',
        success: function(response) {
            if(response.success==true){
            $('.appendeditdata').html(response.view);
          
            }
        },
    });

                          
})
$('body').on('click','#addservice',function(){
   
    $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
       var formData = new FormData($('#serviceid')[0]);
       
    var service_name=$('#service_name').val();   
    var tabs = $('.nav-link.active').attr('data-bs-target');
  
    var imageFile = $('#logo')[0].files[0];

    if (imageFile) {
        formData.append('logo', imageFile);
    }
    
    formData.append('service_name',service_name);
    formData.append('tabs', tabs);

    
        $.ajax({
            type: 'post',
            url: "/add-service",
            data: formData,
            contentType: false,
            processData: false,
            cache: false,
            dataType: 'json',
            success: function(data) {
                if (data.success == true) {
             
                    alertify.success(data.message);
                    window.location.href = "/web-dashboard"
                } else {
                    alertify.error(data.message);
                }
            },
            error: function(err) {
                console.warn(err.responseJSON.errors);
                // display errors on each form field
                $.each(err.responseJSON.errors, function(i, error) {
                        var el = $(document).find('[name="' + i + '"]');
                        el.after($('<span style="color: red;">' + error[0] + '</span>'));
                  
                });
            }
        });

})

$('body').on('click','#editservice',function(){
    
    $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
      var formData = new FormData($('#serviceid')[0]);
    var tabs = $('.nav-link.active').attr('data-bs-target');
        $.ajax({
            type: 'post',
            url: "/edit-service",
            data: formData,
            contentType: false,
            processData: false,
            cache: false,
            dataType: 'json',
            success: function(data) {
                if (data.success == true) {
             
                    alertify.success(data.message);
                    window.location.href = "/web-dashboard"
                } else {
                    alertify.error(data.message);
                }
            },
            error: function(err) {
                console.warn(err.responseJSON.errors);
                // display errors on each form field
                $.each(err.responseJSON.errors, function(i, error) {
                        var el = $(document).find('[name="' + i + '"]');
                        el.after($('<span style="color: red;">' + error[0] + '</span>'));
                  
                });
            }
        });
})
$('body').on('click','.ratewisedata',function(){
    $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
    var userid=$(this).attr('data-id');
    var period=$(this).attr('data-period');
    var amt=$(this).attr('data-amt');
    $.ajax({
        type: 'post',
        url: "/get-gst-return_summery",
        data:{ id: userid,period:period,amt:amt},
        dataType:'html',
        success: function(response) {
            $('.getRateWiseData').html(response)
        },
    });
})

function csrftoken(){
    $.ajaxSetup({
        headers: {
          'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        }
      });
}

$('body').on('click','.outward',function(){
   $('.ratewisedata').attr('data-id',$(this).attr('data-userid'));
   $('.ratewisedata').attr('data-period',$(this).attr('data-period'));
   $('.ratewisedata').attr('data-amt',$(this).attr('data-amt'));
  
})

$('body').on('click','.outwardTaxableZeroRated',function(){
    var userid=$(this).attr('data-userid');
    var amt=$(this).attr('data-amt');
    var url = new URL(window.location.href);
    let period = url.searchParams.get('period');
    csrftoken();

    $.ajax({
        type: 'post',
        url: "/get-gst-zero-rated",
        data:{ id: userid,amt:amt,period:period},
        dataType:'html',
        success: function(response) {
            $('#outwardTaxableZeroRated').modal('show');
            $('.appendzerotable').html(response)
        },
    });
})
$('body').on('click','.outwardTaxableNillRated',function(){
    var userid=$(this).attr('data-userid');
    var amt=$(this).attr('data-amt');
    var url = new URL(window.location.href);
    let period = url.searchParams.get('period');
    csrftoken();

    $.ajax({
        type: 'post',
        url: "/get-gst-nill-rated",
        data:{ id: userid,amt:amt,period:period},
        dataType:'html',
        success: function(response) {
            $('#outwardTaxableNillRated').modal('show');
            $('.appendnilltable').html(response)
        },
    });
})

$('body').on('click','.inwardSuppliesReverseCharge',function(){
    var userid=$(this).attr('data-userid');
    var amt=$(this).attr('data-amt');
    var url = new URL(window.location.href);
    let period = url.searchParams.get('period');
    csrftoken();
    $.ajax({
        type: 'post',
        url: "/get-gst-reverse-charge",
        data:{ id: userid,amt:amt,period:period},
        dataType:'html',
        success: function(response) {
            $('#inwardSuppliesReverseCharge').modal('show');
            $('.appendinverseable').html(response)
        },
    });
})

$('body').on('click','.nonGSToutward',function(){
    var userid=$(this).attr('data-userid');
    var amt=$(this).attr('data-amt');
    var url = new URL(window.location.href);
    let period = url.searchParams.get('period');
    csrftoken();
    $.ajax({
        type: 'post',
        url: "/get-gst-non-gst",
        data:{ id: userid,amt:amt,period:period},
        dataType:'html',
        success: function(response) {
            $('#nonGSToutward').modal('show');
            $('.appendnonGSToutward').html(response)
        },
    });
})

$('body').on('blur', '.getvalue', function() {
    csrftoken();
    var url = new URL(window.location.href);
    let period = url.searchParams.get('period');
    var value = $(this).val();
    var name = $(this).attr('data-name');
    var key = $(this).attr('data-key');
    var id = $(this).attr('data-id');
    var type = $(this).attr('data-type');
    var keyname = $(this).attr('data-keyname');
    var values = $(this).attr('data-value');
    
    $.ajax({
        type: 'post',
        url: "/update-gst-outword",
        data: {
            value: value,
            name: name,
            key: key,
            id: id,
            type:type,
            keyname:keyname,
            values:values,
            period:period
        },
        success: function(response) {

        },
    });
})





$('body').on('click', '.refresh3bgst', function() {
    var id = $(this).attr('data-id');
    var period = $(this).attr('data-period');
    var thi=$(this);
    csrftoken();
    // alertify.confirm('Confirm Action', 'Are you sure you want to remove old data and show new data?',
    //     function() {
            thi.prop('disabled', true);
            thi.text('Loading..');
            $.ajax({
                type: 'post',
                url: "/update_userid",
                data: { 
                  userid: id, 
                  type:'1'
                },
                success: function(response) {
              
                loginpopopen(id,period);
                    
                    
                },
            });
            // csrftoken();
            // $.ajax({
            //     type: 'post',
            //     url: "/login-page",
            //     data:{period:period},
            //     datatype:'json',
            //     success: function(response) {
                   
            //         if(response.result==true){
                    thi.prop('disabled', false);
                    thi.text('Portal Auto-Calculated Data');
                    // $('#userlogin').modal('show');
                    // $('.userloginpage').html(response.view);
            //         }
                    
            //     },
            // });
           
            
        // },
        // function() {});


})


$('body').on('click','#loginGst',function(){
    csrftoken();
    $.ajax({
        type: 'post',
        url: "/login-gst",
        data: $( "#gstlogedin" ).serialize(),
        datatype:'json',
        success: function(response) {
            console.log(response);
        },
    });
})


$('body').on('click','.createCompany',function(){
    $(this).prop('disabled', true);
    $(this).text('loading..');
    csrftoken();
    $.ajax({
        type: 'post',
        url: "/login-gst",
        data: $( "#gstlogedin" ).serialize(),
        datatype:'json',
        success: function(response) {
        
            if(response.response==true){
                if(response.type=='section-wise-data'){
                    $('#userlogin').modal('hide');
                    $('#appendinvoice').html(response.view);

                }else{
                $('#userlogin').modal('hide');
                location.reload();
                }

            }else{
                
                $('.alert').text(response.message).show(); // Show the alert

                setTimeout(function() {
                    $('.alert').hide(); // Hide the alert
                    $('#userlogin').modal('hide');
                }, 3000);
            }
            
        },
    });
})
$('body').on('click','.gst_data_get',function(){
 
    $('.loader_first').show();
    myFunction();
})


    function myFunction() {
        csrftoken();
        $.ajax({
            type: 'POST',
            url: "/login-page",
            datatype:'json',
          
            success: function(response) {
                $('.loader_first').hide();
                $('#userlogin').modal('show');
                $('.userloginpage').html(response);
              //  location.reload(true);
            },
        });
        
    }


 

    $(document).ready(function() {
        $("#userlogin").modal({
            show: false,
            backdrop: 'static'
        });             
        
    });


    function delete_confirm(){
        if($('.checkbox:checked').length > 0){
            var result = confirm("Are you sure to delete selected users?");
            if(result){
                return true;
            }else{
                return false;
            }
        }else{
            alert('Select at least 1 record to delete.');
            return false;
        }
    }


    $(document).ready(function(){
        $('.select_all').on('click',function(){
            if(this.checked){
                $('.checkbox').each(function(){
                    this.checked = true;
                });
            }else{
                 $('.checkbox').each(function(){
                    this.checked = false;
                });
            }
        });
        
        $('.checkbox').on('click',function(){
            if($('.checkbox:checked').length == $('.checkbox').length){
                $('.select_all').prop('checked',true);
            }else{
                $('.select_all').prop('checked',false);
            }
        });
    });

    $(document).ready(function(){
        $('.select_all_com').on('click',function(){
            if(this.checked){
                $('.checkbox_com').each(function(){
                    this.checked = true;
                });
            }else{
                 $('.checkbox_com').each(function(){
                    this.checked = false;
                });
            }
        });
        
        $('.checkbox_com').on('click',function(){
            if($('.checkbox_com:checked').length == $('.checkbox').length){
                $('.select_all_com').prop('checked',true);
            }else{
                $('.select_all_com').prop('checked',false);
            }
        });
    });


    $(document).ready(function(){
        $('.select_all_uin').on('click',function(){
            if(this.checked){
                $('.checkbox_uin').each(function(){
                    this.checked = true;
                });
            }else{
                 $('.checkbox_uin').each(function(){
                    this.checked = false;
                });
            }
        });
        
        $('.checkbox_uin').on('click',function(){
            if($('.checkbox_uin:checked').length == $('.checkbox').length){
                $('.select_all_uin').prop('checked',true);
            }else{
                $('.select_all_uin').prop('checked',false);
            }
        });
    });


    $('body').on('click','.remove_state',function(){
        var name=$(this).attr('data-name');
        var key=$(this).attr('data-key');
        var id=$(this).attr('data-id');
        var url = new URL(window.location.href);
        let period = url.searchParams.get('period');
        csrftoken();
        $th=$(this);
        var thi=$(this);
        thi.html('<i class="fa fa-spinner fa-spin"></i>');
        $.ajax({
            type: 'post',
            url: "/remove_inner_state",
            data: {
                name: name,
                key: key,
                id: id,
                period:period
            },
            dataType:'html',
            success: function(response) {
                $th.parents('.table-responsive').html(response);
                $th.parents('tr').remove();
                thi.html('<i class="fa-solid fa-trash"></i>');
            },
        });

    })

    

    $('body').on('click','.success_state',function(){    
    
        var state=$(this).parents('tr').find('.state').val();
        var total_tax=$(this).parents('tr').find('.total_tax').val();
        var integrated_tax= $(this).parents('tr').find('.integrated_taxx').val();
        var type=$(this).parents('tr').find('.type').val();
        if(type=='unreg_details'){
        var key=$(this).parents('tr').find('.checkbox').val();
        }else if(type=='uin_details'){
        var key=$(this).parents('tr').find('.checkbox_uin').val();
        }else if(type=='comp_details'){
        var key=$(this).parents('tr').find('.checkbox_com').val();
        }
        var id=$(this).attr('data-id');
        var thi=$(this);
        thi.html('<i class="fa fa-spinner fa-spin"></i>');
        var url = new URL(window.location.href);
        let period = url.searchParams.get('period');
       
        csrftoken();
        $.ajax({
            type: 'post',
            url: "/add_inner_state",
            data: {
                type: type,
                key: key,
                state:state,
                integrated_taxs: integrated_tax,
                total_taxx:total_tax,
                id: id, 
                period:period
            },
            success: function(response) {
                if(response.success==true){
                    thi.html('<i class="fa-solid  fa-check"></i>');
                    thi.parents('tr').find('.red').removeClass('red')
                }else{
                    thi.html('<i class="fa-solid fas fa-square"></i>'); 
                }
            },
            error :  function(data,data2,data3)
            {
                thi.html('<i class="fa-solid fas fa-square"></i>'); 
                let response=data.responseJSON;
                let all_errors=response.errors;

                console.log('all_errors',all_errors);
                
                $.each(all_errors,function(key,value){
                    
                    thi.parents('tr').find("[name='"+key+"']").addClass('red');
                    
                });


            }
        });
    

    })

   

    $(document).ready(function() {
        $('body').on('click','.create_tr_unreg',function(){
        //when the Add Field button is clicked
          var userid=$(this).attr('data-id')
         
          let count = $('.table_body_tr' + ' tr').length;
          csrftoken();
          $.ajax({
              type: 'post',
              url: "/add_unregisterd_fileds",
              data: {
                count: count,
                userid: userid, 
              },
              dataType:'html',
              success: function(response) {
                //Append a new row of code to the "#items" div
                $(".table_body_tr").append(response);
              },
          });
         
        });
        $("body").on("click", ".delete", function(e) {
          $(this).parents(".next-referral").remove();
        });
      });
      

      $('body').on('keyup keypress blur change', '.form-control', function () {
        if ($(this).val() != "") {
            
            $(this).removeClass('red')
        }
        if ($(this).is(':selected') == true) {
            $(this).removeClass('red')
        }
    })


    $('body').on('click','.all_delete_inner_state',function(){
        var id=$(this).attr('data-id');
        var name=$(this).attr('data-name');
        var url = new URL(window.location.href);
        let period = url.searchParams.get('period');

        csrftoken();
        $.ajax({
            type: 'post',
            url: "/all_delete_unreg_person",
            data: {
              userid: id, 
              name: name, 
              period:period
            },
            dataType:'json',
            success: function(response) {
             
              $(".table_body_tr").html('');
            },
        });
    })

    $('body').on('click','.all_delete_inner_state',function(){
        var id=$(this).attr('data-id');
        var name=$(this).attr('data-name');
        csrftoken();
        $.ajax({
            type: 'post',
            url: "/all_delete_unreg_person",
            data: {
              userid: id, 
              name: name, 
            },
            dataType:'json',
            success: function(response) {
             
              $(".table_body_tr").html('');
            },
        });
    })

    
    $(document).ready(function() {
        $('body').on('click','.create_tr_comp',function(){
        //when the Add Field button is clicked
          var userid=$(this).attr('data-id')
         
          let count = $('#table_bodyTwo' + ' tr').length;
          csrftoken();
          $.ajax({
              type: 'post',
              url: "/add_comp_fileds",
              data: {
                count: count,
                userid: userid, 
              },
              dataType:'html',
              success: function(response) {
                //Append a new row of code to the "#items" div
                $("#table_bodyTwo").append(response);
              },
          });
         
        });
        $("body").on("click", ".delete", function(e) {
          $(this).parents(".next-referral").remove();
        });
      });
    

      $(document).ready(function() {
        $('body').on('click','.create_tr_uin',function(){
        //when the Add Field button is clicked
          var userid=$(this).attr('data-id')
         
          let count = $('#table_bodyThree' + ' tr').length;
          csrftoken();
          $.ajax({
              type: 'post',
              url: "/add_uin_fileds",
              data: {
                count: count,
                userid: userid, 
              },
              dataType:'html',
              success: function(response) {
                //Append a new row of code to the "#items" div
                $("#table_bodyThree").append(response);
              },
          });
         
        });
        $("body").on("click", ".delete", function(e) {
          $(this).parents(".next-referral").remove();
        });
      });


      $(document).ready(function() {
        $("body").on("keypress", ".num", function(event) {
     
            var charCode = (event.which) ? event.which : event.keyCode;
            if (charCode > 31 && (charCode < 48 || charCode > 57)) {
                event.preventDefault();
            }
        });
    });


    $('body').on('click','.pop',function(){
        var userid=$(this).attr('data-userid');
        csrftoken();
          $.ajax({
              type: 'post',
              url: "/update_userid",
              data: { 
                userid: userid, 
                type:'1'
              },
              dataType:'html',
              success: function(response) {
              
              },
          });
    })

$(document).ready(function() {

    let id = url.searchParams.get('id');
    var url = new URL(window.location.href);
    let period = url.searchParams.get('period');
    csrftoken();
    $.ajax({
        type: 'post',
        url: "/update_userid",
        data: { 
          userid: id, 
          type:'2'
        },
        dataType:'json',
        success: function(response) {
            if(response.success==true){
                loginpopopen(id,period);
            }
            
        },
    });
 
    })

    function loginpopopen(id,period){
        alertify.confirm('Confirm Action', 'Are you sure you want to remove old data and show new data?',
        function() {
            csrftoken();
            $.ajax({
                type: 'post',
                url: "/update_userid",
                data: { 
                  userid: id, 
                  type:'3',
                  period:period,
                  value:'gst'
                },
                dataType:'json',
                success: function(response) {
                 
                    if(response.success==true){
                                $('#userlogin').modal('show');
                                $('.userloginpage').html(response.view);   
                    }
                    
                },
            });
           
        },
        function() {
            csrftoken();
            $.ajax({
                type: 'post',
                url: "/update_userid",
                data: { 
                  userid: id, 
                  type:'3'
                },
                dataType:'json',
                success: function(response) {
                    if(response.success==true){
                        csrftoken();
                        $.ajax({
                            type: 'post',
                            url: "/login-page",
                            data:{period:period},
                            datatype:'json',
                            success: function(response) {
                             
                                $('#userlogin').modal('show');
                                $('.userloginpage').html(response.view);
                                
                            },
                        });
                    }
                    
                },
            });

        });
    }


    $(document).ready(function() {

        var url = new URL(window.location.href);
        var someRandomUrl = decodeURI(window.location.href);
      
        var splittedParts = someRandomUrl.split("?");
        var segmentss = url.pathname.split('/'); 
        var segmentIndex = 1; // Change this to the index of the segment you want
        var url = segmentss[segmentIndex];
      
        getArticles(splittedParts[1],url)
    })

    function getArticles(allurl,url) {
       
        if(url=='gst3b-eligible-itc'){
            $('.itc_Comparision,.eligible-itc').html('<i class="fa fa-spinner fa-spin"></i> Loading...')
        $.ajax({
            url : url+'?'+allurl , 
            dataType:'json'
        }).done(function (data) {
            
            $('.itc_Comparision').html(data.itc_Comparision);  
            $('.eligible-itc').html(data.eligible_itc);  
        }).fail(function () {
            //alert('Articles could not be loaded.');
        });
    }else if(url=='gst3b'){
        $('.nill,.uin, .taxperson, .unreg, .ecom ,.gst3boutward').html('<i class="fa fa-spinner fa-spin"></i> Loading...')
        $.ajax({
            url : url+'?'+allurl , 
            dataType:'json'
        }).done(function (data) {
            $('.nill').html(data.nill);
            $('.uin').html(data.uin);
            $('.taxperson').html(data.taxperson);
            $('.unreg').html(data.unreg);
            $('.ecom').html(data.ecom);
            $('.gst3boutward').html(data.igst3boutward);  
           
        }).fail(function () {
            //alert('Articles could not be loaded.');
        });
    }else if(url=='review'){
        $('.prrevious,.uploadsummary').html('<i class="fa fa-spinner fa-spin"></i> Loading...')
        $.ajax({
            url : url+'?'+allurl , 
            dataType:'json'
        }).done(function (data) {
            $('.prrevious').html(data.previous);
            $('.uploadsummary').html(data.upload_summary);
           
        }).fail(function () {
            //alert('Articles could not be loaded.');
        });
    }
    }

    $('body').on('click','.cumulativeItc',function(){
        var id=$(this).attr('data-id');
        var data=$(this).attr('data-data');
        var url = new URL(window.location.href);
        let period = url.searchParams.get('period');
        csrftoken();
        $.ajax({
            type: 'post',
            url: "/itc-computation",
            data:{'id':id,'cumitc':data,'period':period},
            datatype:'json',
            success: function(response) {
              
                $('#cumulativeItc').modal('show');
                $('.itccomputation').html(response.itccomp);
                $('.cumulative').html(response.cumulative);
                $('.max-itc').html(response.max);
                $('.itc-not').html(response.itcnot);
              

                
            },
        });
    })

    // document.addEventListener("DOMContentLoaded", function() {
    //     const toggleButtons = document.querySelectorAll('.toggle-button');
    //     const tables = document.querySelectorAll('.my-table');
    
    //     toggleButtons.forEach(function(button, index) {
    //       button.addEventListener('click', function(e) {
       
    //         e.preventDefault();
    //         tables[index].classList.toggle('hidden');
    //         if (tables[index].classList.contains('hidden')) {
    //           button.textContent = '(Show Data by 2B)';
    //         } else {
    //           button.textContent = '(Hide Data by 2B)';
    //         }
    //       });
    //     });
    //   });

      $(document).ready(function() {
        
    $('body').on('click','.toggle-button',function(e){
     
            e.preventDefault();
            var index = $(this).index('.toggle-button');
            var $table = $('.my-table').eq(index);
            $table.toggleClass('hidden');
            if ($table.hasClass('hidden')) {
                $(this).text('(Show Data by 2B)');
            } else {
                $(this).text('(Hide Data by 2B)');
            }
        });
    });
    

    $('body').on('change','#datepicker',function(){
        var id=$(this).attr('data-id');
        var name=$(this).attr('data-name');
        var date=$(this).val();

        var selectedValue =$('input[name=invoice_type]:checked' ).val();
        csrftoken();
        $.ajax({
            type: 'post',
            url: "/reports",
            data:{'id':id,"name":selectedValue,'date':date},
            datatype:'json',
            success: function(response) {
                if(selectedValue=='cdn'){
                    $('.filterSummary').html('');
                    $('.filterSummaryd').html('');
                    $('.filterSummaryt').html('');
                    var lastTR = $('#cdnapp:last');
                     lastTR.after(response.filtersummary);
                     
                }else{
                    $('.filterSummaryd').html('');
                    $('.filterSummaryt').html('');
                $('.filterSummary').html(response.filtersummary);
                }
                // $('.tramt').text(parseFloat(response.total_transaction_amount).toLocaleString());
                // $('.tamt').text(parseFloat(response.total_txval).toLocaleString());
                // $('.tinv').text(parseFloat(response.total_inv).toLocaleString());
                // $('.igst').text(parseFloat(response.total_iamt).toLocaleString());
                // $('.sgst').text(parseFloat(response.total_samt).toLocaleString());
                // $('.cgst').text(parseFloat(response.total_camt).toLocaleString());
                // $('.cess').text(parseFloat(response.total_csamt).toLocaleString());
                
                $('#report_details').html(response.view);
                 
                $('#datepicker').datepicker({
                    format: "mm/yyyy",
                    startView: "months",
                    minViewMode: "months",
                    autoclose: true
                });
                
            },
        });
    })

    $('#2bmulti').datepicker({
        format: "mm/yyyy",
        startView: "months",
        minViewMode: "months",
        autoclose: true
    });
    
    $('input[name=invoice_type]').change(function(){

        var id=$('#datepicker').attr('data-id');
        var name=$('#datepicker').attr('data-name');
        var date= $('#datepicker').val();
        var selectedValue =$('input[name=invoice_type]:checked' ).val();
        csrftoken();
        $.ajax({
            type: 'post',
            url: "/reports",
            data:{'id':id,"name":selectedValue,'date':date},
            datatype:'json',
            success: function(response) {
                if(selectedValue=='cdn'){
                    $('.filterSummary').html('');
                    $('.filterSummaryd').html('');
                    $('.filterSummaryt').html('');
                    var lastTR = $('#cdnapp:last');
                     lastTR.after(response.filtersummary);
                     
                }else{
                    $('.filterSummaryd').html('');
                    $('.filterSummaryt').html('');
                $('.filterSummary').html(response.filtersummary);
                }
                // $('.tramt').text(parseFloat(response.total_transaction_amount).toLocaleString());
                // $('.tamt').text(parseFloat(response.total_txval).toLocaleString());
                // $('.tinv').text(parseFloat(response.total_inv).toLocaleString());
                // $('.igst').text(parseFloat(response.total_iamt).toLocaleString());
                // $('.sgst').text(parseFloat(response.total_samt).toLocaleString());
                // $('.cgst').text(parseFloat(response.total_camt).toLocaleString());
                // $('.cess').text(parseFloat(response.total_csamt).toLocaleString());
                
                $('#report_details').html(response.view);
                 
                $('#datepicker').datepicker({
                    format: "mm/yyyy",
                    startView: "months",
                    minViewMode: "months",
                    autoclose: true
                });
                
            },
        });
    })

    $('#datepicker').datepicker({
        format: "mm/yyyy",
        startView: "months",
        minViewMode: "months",
        autoclose: true
      });
      $('#date').datepicker({
        format: "yyyy-mm-dd",
    
        autoclose: true
      });
  

    $(document).on('click','.pagination a', function(e){
        e.preventDefault();
        let page = $(this).attr('href').split('page=')[1]
        record(page)
      })

      function record(page){
        var id=$('#id').val();
        var date=$('#date').val();
        var type=$('#type').val();
        var limit=$('#limit').val();
        csrftoken();
        $.ajax({
            type: 'post',
            url:"/reports?page="+page,
            data:{'id':id,'date':date,'name':type,'limit':limit},
            dataType:'json',
            success:function(res){
                $('#report_details').html(res.view);
                 
                $('#datepicker').datepicker({
                    format: "mm/yyyy",
                    startView: "months",
                    minViewMode: "months",
                    autoclose: true
                });
            }
        })
    }


    $('body').on('click','.page',function(){
        $('.page').removeClass('btn-primary').css('background-color','#ffffff');
        $(this).addClass('btn-primary').css('background-color','#0084d3');
        var selectedValue =$('input[name=invoice_type]:checked' ).val();
        var limit=$(this).attr('data-limit');
        var id=$('#id').val();
        var date=$('#date').val();
        var type=$('#type').val();
        csrftoken();
        $.ajax({
            type: 'post',
            url:"/reports",
            data:{'id':id,'date':date,'limit':limit,'name':type},
            dataType:'json',
            success:function(res){
               
                $('#report_details').html(res.view);
                 
                $('#datepicker').datepicker({
                    format: "mm/yyyy",
                    startView: "months",
                    minViewMode: "months",
                    autoclose: true
                });
            }
        })
    })


    

    $('.itc_com').on('click', function() {
        var selectedValue = $("input[type='radio'].itc_com:checked").val();
        var userid=$(this).attr('data-id');
        var period=$(this).attr('data-period');
        csrftoken();
        $.ajax({
            type: 'post',
            url:"/itc_comp",
            data:{'selectedValue':selectedValue,'userid':userid,'period':period},
            dataType:'html',
            success:function(res){
                $('.itc_Comparision').html(res);
                 
               
            }
        })
      });
      
   
    $('#description').on('keyup', function() {
        $('.des').text(''); // Clear the error message
    });
    
    // Assuming your input field has the class 'image'
    $('#image').on('change', function() {
        $('.img').text(''); // Clear the error message
    });

    $('#title, #date').on('keyup', function() {
        $(this).next('span').remove(); // Clear the error message
    });

 

$('body').on('click','.saveportal',function(){
    var id=$(this).attr('data-id');
    csrftoken();
    $.ajax({
        type: 'post',
        url:"/save3bPortal",
        data:{id:id},
        dataType:'json',
        success:function(res){
            console.log(res);
            if(res.response==true){ 
              alertify.success('Successfully updated');
            }else{
                alertify.error('Something went wrong');
            }
        }
    })
})

$('#years').change(function() {
    //Use $option (with the "$") to see that the variable is a jQuery object
    var $option = $(this).find('option:selected');
    //Added with the EDIT
    var value = $option.val();//to get content of "value" attrib
    var id = $option.attr('data-id');
    csrftoken();
    $.ajax({
        type: 'post',
        url:"/gst3-B1-Books-Report-filter",
        data:{id:id,year:value},
        dataType:'json',
        success:function(res){
            
          $('.appengstr3b').html(res.gstr3b);
          $('#sectionlevel').html(res.summary);
            
        }
    })


});

$('body').on('click','.itcnotav',function(){
    
    $(this).css({
        'border-radius': '4px 0px 0px 4px',
        'background-color': '#0084d3',
        'color': 'rgb(255, 255, 255)'
    });
    $('.itctav').css({
        'color': '#000',
        'background-color': 'rgb(255, 255, 255)',
        'border': '1px solid rgb(190, 194, 204)'
    });
    var date=$('#2bmulti').val();
   // $('#itcnotavid').html('<i class="fa fa-spinner fa-spin"></i>');
    var id=$(this).attr('data-id');
    csrftoken();
    $.ajax({
        type: 'post',
        url:"/gst2b-not-ava",
        data:{'id':id,'date':date},
        dataType:'html',
        success:function(res){
            $('#itcnotavid').html(res);
            
        }
    })
})
$('body').on('click','.itctav',function(){
    $('.itctav').css({
        'border-radius': '4px 0px 0px 4px',
        'background-color': '#0084d3',
        'color': 'rgb(255, 255, 255)'
    });
    $('.itcnotav').css({
        'color': '#000',
        'background-color': 'rgb(255, 255, 255)',
        'border': '1px solid rgb(190, 194, 204)'
    });
    var date=$('#2bmulti').val();
    //$('#itcnotavid').html('<i class="fa fa-spinner fa-spin"></i>');
    var id=$(this).attr('data-id');
    csrftoken();
    $.ajax({
        type: 'post',
        url:"/gst2BAvailable",
        data:{'id':id,'date':date},
        dataType:'html',
        success:function(res){
            $('#itcnotavid').html(res);
            
        }
    })
})


$('body').on('change','.multimonth',function(){
    
        var type=$('.type').val();
        if(type=='av'){
            $('.itctav').css({
                'border-radius': '4px 0px 0px 4px',
                'background-color': '#0084d3',
                'color': 'rgb(255, 255, 255)'
            });
            $('.itcnotav').css({
                'color': '#000',
                'background-color': 'rgb(255, 255, 255)',
                'border': '1px solid rgb(190, 194, 204)'
            });
        }else{
            $('.itcnotav').css({
                'border-radius': '4px 0px 0px 4px',
                'background-color': '#0084d3',
                'color': 'rgb(255, 255, 255)'
            });
            $('.itctav').css({
                'color': '#000',
                'background-color': 'rgb(255, 255, 255)',
                'border': '1px solid rgb(190, 194, 204)'
            });
        }
        var id=$(this).attr('data-id');
        var name=$(this).attr('data-name');
        var date=$(this).val();
        var thi=$(this);
      //  $('#itcnotavid').html('<i class="fa fa-spinner fa-spin"></i>');
        csrftoken();
        $.ajax({
            type: 'post',
            url:"/get2bdata",
            data:{id:id,name:name,date:date,type:type},
            dataType:'html',
            success:function(res){
                $('#itcnotavid').html(res);
                
            }
        })

})

$('body').on('change','.multimonth',function(){
    var type=$('.type').val();
    if(type=='av'){
        $('.summary').css({
            'border-radius': '4px 0px 0px 4px',
            'background-color': '#0084d3',
            'color': 'rgb(255, 255, 255)'
        });
        $('.detailview').css({
            'color': '#000',
            'background-color': 'rgb(255, 255, 255)',
            'border': '1px solid rgb(190, 194, 204)'
        });
    }else{
           $('.detailview').css({
        'border-radius': '4px 0px 0px 4px',
        'background-color': '#0084d3',
        'color': 'rgb(255, 255, 255)'
        });
        $('.summary').css({
            'color': '#000',
            'background-color': 'rgb(255, 255, 255)',
            'border': '1px solid rgb(190, 194, 204)'
        });
    }
 
    var id=$(this).attr('data-id');
    var name=$(this).attr('data-name');
    var date=$(this).val();
    var thi=$(this);
    var value = $('#search2bvalue').find(":selected").val();
    csrftoken();
    $.ajax({
        type: 'post',
        url:"/get2bdetailsviewdata",
        data:{id:id,name:name,date:date,type:type,value:value},
        dataType:'html',
        success:function(res){
            $('#detailsview').html(res);
            
        }
    })
})
$('body').on('click','.summary',function(){
    var type=$('.type').val();
    
    $('.summary').css({
        'border-radius': '4px 0px 0px 4px',
        'background-color': '#0084d3',
        'color': 'rgb(255, 255, 255)'
    });
    $('.detailview').css({
        'color': '#000',
        'background-color': 'rgb(255, 255, 255)',
        'border': '1px solid rgb(190, 194, 204)'
    });
    var id=$(this).attr('data-id');
    var name=$(this).attr('data-name');
    var date=$('#2bmulti').val();
    var thi=$(this);
    var value = $('#search2bvalue').find(":selected").val();
    csrftoken();

    $.ajax({
        type: 'post',
        url:"/get2bdetailsviewdata",
        data:{id:id,name:name,date:date,type:type,value:value},
        dataType:'html',
        success:function(res){
            $('#detailsview').html(res);
            
        }
    })
})


$('body').on('click','.detailview',function(){
  
    var type=$('.type').val();
    
        $('.detailview').css({
            'border-radius': '4px 0px 0px 4px',
            'background-color': '#0084d3',
            'color': 'rgb(255, 255, 255)'
        });
        $('.summary').css({
            'color': '#000',
            'background-color': 'rgb(255, 255, 255)',
            'border': '1px solid rgb(190, 194, 204)'
        });

        var id=$(this).attr('data-id');
        var name=$(this).attr('data-name');
        var date=$('#2bmulti').val();
        var thi=$(this);
        var value = $('#search2bvalue').find(":selected").val();
        csrftoken();
        $.ajax({
            type: 'post',
            url:"/get2bdetailsdocviewdata",
            data:{id:id,name:name,date:date,type:type,value:value},
            dataType:'html',
            success:function(res){
                $('#detailsview').html(res);
                
            }
        })
   
  
})

$('body').on('change','#search2bvalue',function(){
    var value = $('#search2bvalue').find(":selected").val();
    var id=$(this).attr('data-id');
    
   
    var date=$('#2bmulti').val();
    var thi=$(this);
    var type=$('.detail_typex').val();

    csrftoken();
    $.ajax({
        type: 'post',
        url:"/get2bsummaydetailsdocdata",
        data:{id:id,date:date,type:type,value:value},
        dataType:'html',
        success:function(res){
            $('#detailsview').html(res);
            
        }
    })
})


$('body').on('click','#hsnwise',function(){
var user_id=$(this).attr('data-user_id');
var period=$(this).attr('data-period');
$('.hsnwise').append('<tr><input class=hsnkey data-key=hsnkey name=hsnkey type=hiiden><td><input class="changeentry form-control"data-key=hsn_sc data-date="'+period+'"data-field=gstr9HsnIN data-id="'+user_id+'"data-index=""><td><input class="changeentry form-control"data-key=desc data-date="'+period+'"data-field=gstr9HsnIN data-id="'+user_id+'"data-index=""><td><input class="changeentry form-control"data-key=uqc data-date="'+period+'"data-field=gstr9HsnIN data-id="'+user_id+'"data-index=""><td><input class="changeentry form-control"data-key=qty data-date="'+period+'"data-field=gstr9HsnIN data-id="'+user_id+'"data-index=""><td><input class="changeentry form-control"data-key=txval data-date="'+period+'"data-field=gstr9HsnIN data-id="'+user_id+'"data-index=""><td><input class="changeentry form-control"data-key=rt data-date="'+period+'"data-field=gstr9HsnIN data-id="'+user_id+'"data-index=""><td><input class="changeentry form-control"data-key=isconcesstional data-date="'+period+'"data-field=gstr9HsnIN data-id="'+user_id+'"data-index=""><td><input class="changeentry form-control"data-key=iamt data-date="'+period+'"data-field=gstr9HsnIN data-id="'+user_id+'"data-index=""><td><input class="changeentry form-control"data-key=camt data-date="'+period+'"data-field=gstr9HsnIN data-id="'+user_id+'"data-index=""><td><input class="changeentry form-control"data-key=samt data-date="'+period+'"data-field=gstr9HsnIN data-id="'+user_id+'"data-index=""><td><input class="changeentry form-control"data-key=csamt data-date="'+period+'"data-field=gstr9HsnIN data-id="'+user_id+'"data-index=""><td><div class=action_container><button class=danger onclick=remove_tr(this)><i class="fa-solid fa-trash"></i></button> <button class="submithsn success"data-date="'+period+'"data-id="'+user_id+'"type=button><i class="fa-solid fa-square fas"></i></button></div></tr>');
})

$('body').on('click','#hsnout',function(){
    var user_id=$(this).attr('data-user_id');
    var period=$(this).attr('data-period');
    $('.hsnout').append('<tr><input class=key data-key=key type=hidden><td><input class="changeentry form-control"data-key=hsn_sc data-date="'+period+'"data-field=gstr9HsnOwt data-id="'+user_id+'"data-index=""><td><input class="changeentry form-control"data-key=desc data-date="'+period+'"data-field=gstr9HsnOwt data-id="'+user_id+'"data-index={{$key}}><td><input class="changeentry form-control"data-key=uqc data-date="'+period+'"data-field=gstr9HsnOwt data-id="'+user_id+'"data-index=""><td><input class="changeentry form-control"data-key=qty data-date="'+period+'"data-field=gstr9HsnOwt data-id="'+user_id+'"data-index=""><td><input class="changeentry form-control"data-key=txval data-date="'+period+'"data-field=gstr9HsnOwt data-id="'+user_id+'"data-index=""><td><input class="changeentry form-control"data-key=rt data-date="'+period+'"data-field=gstr9HsnOwt data-id="'+user_id+'"data-index=""><td><input class="changeentry form-control"data-key=isconcesstional data-date="'+period+'"data-field=gstr9HsnOwt data-id="'+user_id+'"data-index=""><td><input class="changeentry form-control"data-key=iamt data-date="'+period+'"data-field=gstr9HsnOwt data-id="'+user_id+'"data-index=""><td><input class="changeentry form-control"data-key=camt data-date="'+period+'"data-field=gstr9HsnOwt data-id="'+user_id+'"data-index=""><td><input class="changeentry form-control"data-key=samt data-date="'+period+'"data-field=gstr9HsnOwt data-id="'+user_id+'"data-index=""><td><input class="changeentry form-control"data-key=csamt data-date="'+period+'"data-field=gstr9HsnOwt data-id="'+user_id+'"data-index=""><td><div class=action_container><button class=danger onclick=remove_tr(this)><i class="fa-solid fa-trash"></i></button><div></div><button class="submitgstr9 success"data-date="'+period+'"data-field=gstr9HsnOwt data-id="'+user_id+'"type=button><i class="fa-solid fa-square fas"></i></button></div>');
})


$('body').on('change','.changeentry',function(){
    var field=$(this).attr('data-field');
    var key=$(this).attr('data-key');
    var id=$(this).attr('data-id');
    var date=$(this).attr('data-date');
    var index=$(this).attr('data-index');
    var data= $(this).val();
    var dataz = data.replace(/\s+/g, '');
    
    csrftoken();
    $.ajax({
        type: 'post',
        url:"/gstr9ChangeData",
        data:{id:id,key:key,field:field,date:date,index:index,data:dataz},
        dataType:'json',
        success:function(res){
            if(res.success==true){
                thi.html('<i class="fa-solid  fa-check"></i>');

            }else{
                thi.html('<i class="fa-solid fas fa-square"></i>'); 
            }
            
        }
    })
})

$('body').on('click','.submitgstr9',function(){
    var id=$(this).attr('data-id');
    var date=$(this).attr('data-date');
    var field=$(this).attr('data-field');
    var index=$(this).parents('tr').find('.key').val();
    
    var array = {};
    $(this).parents("tr").find("input").each(function() {
        var attributes = $(this).attr('data-key');
        var value = $(this).val();
        var values = value.replace(/\s+/g, '');
        var attributeName = attributes;
        var attributeValue = values;
        array[attributeName] =  attributeValue;
    });
 
    var thi=$(this);
    thi.html('<i class="fa fa-spinner fa-spin"></i>');
    csrftoken();
    $.ajax({
        type: 'post',
        url:"/gstr9ChangeDataWithKey",
        data:{id:id,field:field,date:date,index:index,dataarray:array},
        dataType:'json',
        success:function(res){
            if(res.success==true){
                thi.html('<i class="fa-solid  fa-check"></i>');
            }else{
                thi.html('<i class="fa-solid fas fa-square"></i>'); 
            }
            
        }
    })
})


$('body').on('click','.submithsn',function(){
    var id=$(this).attr('data-id');
    var date=$(this).attr('data-date');
    var index=$(this).parents('tr').find('.hsnkey').val();
    
    var array = {};
    var field;
    $(this).parents("tr").find("input").each(function() {
        var attributes = $(this).attr('data-key');
        field = $(this).attr('data-field');
        var value = $(this).val();
        var values = value.replace(/\s+/g, '');
        var attributeName = attributes;
        var attributeValue = values;
        array[attributeName] =  attributeValue;
    });
    var fields=field;
    var thi=$(this);
    thi.html('<i class="fa fa-spinner fa-spin"></i>');
    csrftoken();
    $.ajax({
        type: 'post',
        url:"/gstr9ChangeDataWithKey",
        data:{id:id,field:fields,date:date,index:index,dataarray:array},
        dataType:'json',
        success:function(res){
            if(res.success==true){
                thi.html('<i class="fa-solid  fa-check"></i>');
            }else{
                thi.html('<i class="fa-solid fas fa-square"></i>'); 
            }
            
        }
    })
})

$('body').on('click','.popup',function(){
    var target=$(this).attr('data-bs-target');
    var id=$(this).attr('data-id');
    var date=$(this).attr('data-date');
    var field=$(this).attr('data-field');
    csrftoken();
    $.ajax({
        type: 'post',
        url:"/salespopup",
        data:{id:id,field:field,date:date,target:target},
        dataType:'html',
        success:function(response){
          
            $('#suppliesUnregisteredB2c').modal('show');
            $('.appendsales').html(response)
            
        }
    })
})

$('body').on('click','.sales-register-pop',function(){

    $('#dummyModal').modal('show');
})

$('body').on('click','#selectsalesmonth',function(){
    var id=$('.id').val();
    var salesmonth=$('.salesmonth').val();
    csrftoken();
    $.ajax({
        type: 'post',
        url:"/selectdm",
        data:{id:id,date:salesmonth},
        dataType:'json',
        success:function(response){
            window.location.href=response.url;
        }
    })
})


/*$(document).ready(function() {
    $("#load-data").click(function() {
        // Show loader
        $("#loader").show();
        var formData = new FormData();
        var file = $("#fileInput")[0].files[0];
        alert(file);
        formData.append("file", file);
        csrftoken();
        $.ajax({
            url: "/import",
            type: "POST",
            data: formData,
            processData: false,
            contentType: false,
            success: function(response) {
                // Hide loader when request is successful
                $("#loader").hide();
                
                // Display data in data container
                //$("#data-container").html(response);
            },
            error: function(xhr, status, error) {
                // Handle error if AJAX request fails
                console.error(error);
            },
            xhr: function() {
                // Create XMLHttpRequest object
                var xhr = new XMLHttpRequest();
                
                // Listen to progress events
                xhr.upload.addEventListener("progress", function(event) {
                    if (event.lengthComputable) {
                        // Calculate progress percentage
                        var percentComplete = (event.loaded / event.total) * 100;
                        
                        // Update progress bar width
                        $("#progress-bar").css("width", percentComplete + "%");
                    }
                }, false);
                
                return xhr;
            }
        });
    });
});*/


function triggerUpload() {
    var fileInput = document.getElementById('fileInput');
    fileInput.click();
  }

//   function handleFileUpload(event) {
//     // Handle file upload logic here
//     console.log("File uploaded:", event.target.files[0]);
//         $("#loader").show();
//         var formData = new FormData();
//         var file = event.target.files[0];
       
//         formData.append("file", file);
//         $('#load-data').prop('disabled', true);
//         $('#load-data').html('<i class="fa fa-spinner fa-spin"></i>');
//         var count_error = 0;
//         csrftoken();
//         $.ajax({
            
//             url: "/import",
//             type: "POST",
//             data: formData,
//             processData: false,
//             contentType: false,
//             beforeSend:function()
//             {
             
//              $('#process').css('display', 'block');
          
//             },
//             success: function(response) {
                
//                 var percentage = 0;

//                 var timer = setInterval(function(){
//                  percentage = percentage + 20;
//                  progress_bar_process(percentage, timer);
//                 }, 1000);
//                 $('#load-data').prop('disabled', false);
//                 $('#load-data').html('<span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96zM14 13v4h-4v-4H7l5-5 5 5h-3z"></path></svg></span>Select file from your computer<span><svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg></span>');
             
//                 //$("#data-container").html(response);
//             },
          
            
//         });
//   }


//   function progress_bar_process(percentage, timer)
//   {
//    $('.progress-bar').css('width', percentage + '%');
//    if(percentage > 100)
//    {
//     clearInterval(timer);
//     $('#sample_form')[0].reset();
//     $('#process').css('display', 'none');
//     $('.progress-bar').css('width', '0%');
//     $('#save').attr('disabled', false);
//     $('#success_message').html("<div class='alert alert-success'>Data Saved</div>");
//     setTimeout(function(){
//      $('#success_message').html('');
//     }, 5000);
//    }
//   }

$("body").on("click", ".uploadbook", function () {
    $(".book_file").focus().trigger("click");
});


function handleFileUpload(event) {

    var formData = new FormData();
    var file = event.target.files[0];
    formData.append("file", file);
    $('#load-data').prop('disabled', true);
    var period=$('#period').val();
    var userid=$('#userid').val();
    formData.append("period", period);
    formData.append("userid", userid);
    csrftoken();
   
    $('#progress-holder').removeClass('d-none')
        var progressBar = $('#progress_bar');
        progressBar.text('0%');
        progressBar.attr('aria-valuenow',0);
        progressBar.css('width',0);
        $('.progress-bar').text('0%');
    $.ajax({
        url: "/import",
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        processData: false,
        beforeSend:function()
        {
        
         $('#process').css('display', 'block');
        },
        
        success: function(response) {
            var percentage = 0;

            var timer = setInterval(function(){
         
            percentage = percentage + 20;
            $('.progress-bar').text(percentage + '%');
            progress_bar_process(percentage, timer);
            }, 1000);
        }
    });
}

function progress_bar_process(percentage, timer)
{
 $('.progress-bar').css('width', percentage + '%');
 $('.progress-bar').text(percentage + '%');
 if(percentage > 100)
 {
  clearInterval(timer);
  $('#process').css('display', 'none');
  $('.progress-bar').css('width', '0%');
//   $('#save').attr('disabled', false);
//   $('#success_message').html("<div class='alert alert-success'>Data Saved</div>");
  setTimeout(function(){
   $('#success_message').html('');
  }, 5000);
 }
}
$('.selectgstr').click(function() {
    var userid=$(this).attr('data-id');
    var type=$(this).attr('data-type');
    var month = [];
    var year = [];
    var monthyear=[];
    $('.selectgstr:checked').each(function() {
       var data= $(this).val();
       var arr = data.split('-');
       month.push(arr[0]);
       year.push(arr[1]);
       monthyear.push(arr[0]+''+arr[1]);
    });
    csrftoken();
    $.ajax({
        type: 'post',
        url:"/sectionfilter",
        data:{id:userid,type:type,month:month,year:year,monthyear:monthyear},
        dataType:'html',
        success:function(response){
         
           $('#appendinvoice').html(response);
        }
    })
});
var hidearray=[];
$('.hidegstr').click(function() {
  
    var value=$(this).attr('data-value');
    var id=$(this).attr('data-id');
    var type=$(this).attr('data-type');
    var data = $(this).val();
    if(type=='matched'){
        $('.mismatched').prop('checked', false);
        csrftoken();
        $.ajax({
            type: 'post',
            url:"/matched_filter",
            data:{id:id,type:value,method:'matched'},
            dataType:'html',
            success:function(response){
               
               $('.appendb2bmatched').html(response);
            }
        })

    }else if(type=='mismatched'){
        $('.matched').prop('checked', false);
        csrftoken();
        $.ajax({
            type: 'post',
            url:"/matched_filter",
            data:{id:id,type:value,method:'mismatched'},
            dataType:'html',
            success:function(response){
               
               $('.appendb2bmatched').html(response);
            }
        })
    }
        
    if ($(this).is(':checked')) {
        // Add value to array if checkbox is checked and not already present
        if (!hidearray.includes(data)) {
            hidearray.push(data);
        }
    } else {
        // Remove value from array if checkbox is unchecked
        var index = hidearray.indexOf(data);
        if (index !== -1) {
            hidearray.splice(index, 1);
        }
        csrftoken();
        $.ajax({
            type: 'post',
            url:"/matched_filter",
            data:{id:id,type:value,method:'unmatched'},
            dataType:'html',
            success:function(response){
               
               $('.appendb2bmatched').html(response);
            }
        })
    }
    
    

    if(jQuery.inArray("inr1only", hidearray) != -1) {
        if(value=='b2b'){
            $('.gb2b').show();
        }
      
        
    } else {
        if(value=='b2b'){
            $('.gb2b').hide();
        }
        
    } 

    if(jQuery.inArray("inbookonly", hidearray) != -1) {
        if(value=='b2b'){
            $('.bb2b').show();
        }
       
    } else {
        if(value=='b2b'){
            $('.bb2b').hide();
        }
        
    } 
    
 
    
});

var hidearray=[];
$('.hidegstrb2cl').click(function() {
  
    var value=$(this).attr('data-value');
    var id=$(this).attr('data-id');
    var type=$(this).attr('data-type');
    var data = $(this).val();
    if(type=='matched'){
       $('.mismatchedb2cl').prop('checked', false);
        csrftoken();
        $.ajax({
            type: 'post',
            url:"/matched_filter",
            data:{id:id,type:value,method:'matched'},
            dataType:'html',
            success:function(response){
               
               $('.appendb2cl').html(response);
            }
        })

    }else if(type=='mismatched'){
        $('.matchedb2cl').prop('checked', false);
        csrftoken();
        $.ajax({
            type: 'post',
            url:"/matched_filter",
            data:{id:id,type:value,method:'mismatched'},
            dataType:'html',
            success:function(response){
               
               $('.appendb2cl').html(response);
            }
        })
    }

    if ($(this).is(':checked')) {
        // Add value to array if checkbox is checked and not already present
        if (!hidearray.includes(data)) {
            hidearray.push(data);
        }
    } else {
        // Remove value from array if checkbox is unchecked
        var index = hidearray.indexOf(data);
        if (index !== -1) {
            hidearray.splice(index, 1);
        }
        csrftoken();
        $.ajax({
            type: 'post',
            url:"/matched_filter",
            data:{id:id,type:value,method:'unmatched'},
            dataType:'html',
            success:function(response){
               
               $('.appendb2cl').html(response);
            }
        })
    }

    if(jQuery.inArray("inr1only", hidearray) != -1) {

        if(value=='b2cl'){
            $('.b2clbooks').show();
        }
    } else { 
        if(value=='b2cl'){
            $('.b2clbooks').hide();
        }
    } 

    if(jQuery.inArray("inbookonly", hidearray) != -1) {
       
        if(value=='b2cl'){
            $('.b2clgstrone').show();
        }
    } else {
        
        if(value=='b2cl'){
            $('.b2clgstrone').hide();
        }
    } 
    
});
var hidearray=[];
$('.hidegstrb2cs').click(function() {
    var id=$(this).attr('data-id');
    var type=$(this).attr('data-type');
    var value=$(this).attr('data-value');
    var data = $(this).val();
    if(type=='matched'){
        $('.mismatchedb2cs').prop('checked', false);
         csrftoken();
         $.ajax({
             type: 'post',
             url:"/matched_filter",
             data:{id:id,type:value,method:'matched'},
             dataType:'html',
             success:function(response){
                
                $('.appendb2cs').html(response);
             }
         })
 
     }else if(type=='mismatched'){
         $('.matchedb2cs').prop('checked', false);
         csrftoken();
         $.ajax({
             type: 'post',
             url:"/matched_filter",
             data:{id:id,type:value,method:'mismatched'},
             dataType:'html',
             success:function(response){
                
                $('.appendb2cs').html(response);
             }
         })
     }
 
     if ($(this).is(':checked')) {
         // Add value to array if checkbox is checked and not already present
         if (!hidearray.includes(data)) {
             hidearray.push(data);
         }
     } else {
         // Remove value from array if checkbox is unchecked
         var index = hidearray.indexOf(data);
         if (index !== -1) {
             hidearray.splice(index, 1);
         }

         csrftoken();
         $.ajax({
             type: 'post',
             url:"/matched_filter",
             data:{id:id,type:value,method:'unmatched'},
             dataType:'html',
             success:function(response){
                
                $('.appendb2cs').html(response);
             }
         })
     }

    if(jQuery.inArray("inr1only", hidearray) != -1) {

        if(value=='b2cs'){
            $('.bookb2s').show();
        }
    } else { 
        if(value=='b2cs'){
            $('.bookb2s').hide();
        }
    } 

    if(jQuery.inArray("inbookonly", hidearray) != -1) {
       
        if(value=='b2cs'){
            $('.gstrb2cs').show();
        }
    } else {
        
        if(value=='b2cs'){
            $('.gstrb2cs').hide();
        }
    } 
    
});


$('.hidegstrexport').click(function() {
    var hidearray=[];
    var value=$(this).attr('data-value');
    var type=$(this).attr('data-type');
    var id=$(this).attr('data-id');
    var data = $(this).val();
    if(type=='matched'){
        $('.mismatchedexport').prop('checked', false);
         csrftoken();
         $.ajax({
             type: 'post',
             url:"/matched_filter",
             data:{id:id,type:value,method:'matched'},
             dataType:'html',
             success:function(response){
                
                $('.appendexport').html(response);
             }
         })
 
     }else if(type=='mismatched'){
      
         $('.matchedexport').prop('checked', false);
         csrftoken();
         $.ajax({
             type: 'post',
             url:"/matched_filter",
             data:{id:id,type:value,method:'mismatched'},
             dataType:'html',
             success:function(response){
               
                $('.appendexport').html(response);
             }
         })
     }
     if ($(this).is(':checked')) {
         // Add value to array if checkbox is checked and not already present
         if (!hidearray.includes(data)) {
             hidearray.push(data);
         }
     } else {
         // Remove value from array if checkbox is unchecked
         var index = hidearray.indexOf(data);
         if (index !== -1) {
             hidearray.splice(index, 1);
         }

         csrftoken();
         $.ajax({
             type: 'post',
             url:"/matched_filter",
             data:{id:id,type:value,method:'unmatched'},
             dataType:'html',
             success:function(response){
                
                $('.appendexport').html(response);
             }
         })
     }

    if(jQuery.inArray("inr1only", hidearray) != -1) {

        if(value=='export'){
            $('.booksexport').show();
        }
    } else { 
        if(value=='export'){
            $('.booksexport').hide();
        }
    } 

    if(jQuery.inArray("inbookonly", hidearray) != -1) {
       
        if(value=='export'){
            $('.gstroneexport').show();
        }
    } else {
        
        if(value=='export'){
            $('.gstroneexport').hide();
        }
    } 
    
});
var hidearray=[];
$('.hidegstrcdnr').click(function() {
    
    var value=$(this).attr('data-value');

    // $('.hidegstrcdnr:checked').each(function() {
    //    var data= $(this).val();
    //    var type=$(this).attr('data-type');
    //    hidearray.push(data);
      
    // });
    var type=$(this).attr('data-type');
    var id=$(this).attr('data-id');
    var data = $(this).val();
    if(type=='matched'){
        $('.mismatchedcdnr').prop('checked', false);
         csrftoken();
         $.ajax({
             type: 'post',
             url:"/matched_filter",
             data:{id:id,type:value,method:'matched'},
             dataType:'html',
             success:function(response){
                
                $('.appendcdnr').html(response);
             }
         })
 
     }else if(type=='mismatched'){
         $('.matchedcdnr').prop('checked', false);
         csrftoken();
         $.ajax({
             type: 'post',
             url:"/matched_filter",
             data:{id:id,type:value,method:'mismatched'},
             dataType:'html',
             success:function(response){
               
                $('.appendcdnr').html(response);
             }
         })
     }
 
     if ($(this).is(':checked')) {
         // Add value to array if checkbox is checked and not already present
         if (!hidearray.includes(data)) {
             hidearray.push(data);
         }
     } else {
         // Remove value from array if checkbox is unchecked
         var index = hidearray.indexOf(data);
         if (index !== -1) {
             hidearray.splice(index, 1);
         }

         csrftoken();
         $.ajax({
             type: 'post',
             url:"/matched_filter",
             data:{id:id,type:value,method:'unmatched'},
             dataType:'html',
             success:function(response){
                
                $('.appendcdnr').html(response);
             }
         })
     }

    if(jQuery.inArray("inr1only", hidearray) != -1) {

        if(value=='cdnr'){
            $('.bookscdnr').show();
        }
    } else { 
        if(value=='cdnr'){
            $('.bookscdnr').hide();
        }
    } 

    if(jQuery.inArray("inbookonly", hidearray) != -1) {
       
        if(value=='cdnr'){
            $('.gstronecdnr').show();
        }
    } else {
        if(value=='cdnr'){
            $('.gstronecdnr').hide();
        }
    } 
    
});

  var hidearray=[];
$('.hidegstrat').click(function() {
  
    var value=$(this).attr('data-value');

    var type=$(this).attr('data-type');
    var id=$(this).attr('data-id');
    var data = $(this).val();
    if(type=='matched'){
        $('.unmatched').prop('checked', false);
         csrftoken();
         $.ajax({
             type: 'post',
             url:"/matched_filter",
             data:{id:id,type:value,method:'matched'},
             dataType:'html',
             success:function(response){
                $('.appendat').html(response);
             }
         })
 
     }else if(type=='mismatched'){
         $('.matchedat').prop('checked', false);
         csrftoken();
         $.ajax({
             type: 'post',
             url:"/matched_filter",
             data:{id:id,type:value,method:'mismatched'},
             dataType:'html',
             success:function(response){
               
                $('.appendat').html(response);
             }
         })
     }
 
     if ($(this).is(':checked')) {
         // Add value to array if checkbox is checked and not already present
         if (!hidearray.includes(data)) {
             hidearray.push(data);
         }
     } else {
         // Remove value from array if checkbox is unchecked
         var index = hidearray.indexOf(data);
         if (index !== -1) {
             hidearray.splice(index, 1);
         }

         csrftoken();
         $.ajax({
             type: 'post',
             url:"/matched_filter",
             data:{id:id,type:value,method:'unmatched'},
             dataType:'html',
             success:function(response){
                
                $('.appendat').html(response);
             }
         })
     }

    if(jQuery.inArray("inr1only", hidearray) != -1) {

        if(value=='At'){
            $('.booksat').show();
        }
    } else { 
        if(value=='At'){
            $('.booksat').hide();
        }
    } 

    if(jQuery.inArray("inbookonly", hidearray) != -1) {
       
        if(value=='At'){
            $('.gstroneat').show();
        }
    } else {
        if(value=='At'){
            $('.gstroneat').hide();
        }
    } 
    
});

$('.hidegstratadj').click(function() {
    var hidearray=[];
    var value=$(this).attr('data-value');

    // $('.hidegstratadj:checked').each(function() {
    //    var data= $(this).val();
    //    var type=$(this).attr('data-type');
    //    hidearray.push(data);
      
    // });
    var type=$(this).attr('data-type');
    var id=$(this).attr('data-id');
    var data = $(this).val();
    if(type=='matched'){
        $('.unmatchedatadj').prop('checked', false);
         csrftoken();
         $.ajax({
             type: 'post',
             url:"/matched_filter",
             data:{id:id,type:value,method:'matched'},
             dataType:'html',
             success:function(response){
                $('.appendatadj').html(response);
             }
         })
 
     }else if(type=='mismatched'){
         $('.matchedatadj').prop('checked', false);
         csrftoken();
         $.ajax({
             type: 'post',
             url:"/matched_filter",
             data:{id:id,type:value,method:'mismatched'},
             dataType:'html',
             success:function(response){
               
                $('.appendatadj').html(response);
             }
         })
     }
 
     if ($(this).is(':checked')) {
         // Add value to array if checkbox is checked and not already present
         if (!hidearray.includes(data)) {
             hidearray.push(data);
         }
     } else {
         // Remove value from array if checkbox is unchecked
         var index = hidearray.indexOf(data);
         if (index !== -1) {
             hidearray.splice(index, 1);
         }
         csrftoken();
         $.ajax({
             type: 'post',
             url:"/matched_filter",
             data:{id:id,type:value,method:'unmatched'},
             dataType:'html',
             success:function(response){
                
                $('.appendatadj').html(response);
             }
         })
     }

    if(jQuery.inArray("inr1only", hidearray) != -1) {

        if(value=='atadj'){
            $('.booksatadj').show();
        }
    } else { 
        if(value=='atadj'){
            $('.booksatadj').hide();
        }
    } 

    if(jQuery.inArray("inbookonly", hidearray) != -1) {
       
        if(value=='atadj'){
            $('.gstroneatadj').show();
        }
    } else {
        if(value=='atadj'){
            $('.gstroneatadj').hide();
        }
    } 
    
});

$('.hidegstrexemp').click(function() {
    var hidearray=[];
    var value=$(this).attr('data-value');

    // $('.hidegstrexemp:checked').each(function() {
    //    var data= $(this).val();
    //    var type=$(this).attr('data-type');
    //    hidearray.push(data);
    // });
    var type=$(this).attr('data-type');
    var id=$(this).attr('data-id');
    var data = $(this).val();
    if(type=='matched'){
        $('.matchedmismatched').prop('checked', false);
         csrftoken();
         $.ajax({
             type: 'post',
             url:"/matched_filter",
             data:{id:id,type:value,method:'matched'},
             dataType:'html',
             success:function(response){
                $('.appendexemp').html(response);
             }
         })
 
     }else if(type=='mismatched'){
         $('.matchedexemp').prop('checked', false);
         csrftoken();
         $.ajax({
             type: 'post',
             url:"/matched_filter",
             data:{id:id,type:value,method:'mismatched'},
             dataType:'html',
             success:function(response){
               
                $('.appendexemp').html(response);
             }
         })
     }
 
     if ($(this).is(':checked')) {
         // Add value to array if checkbox is checked and not already present
         if (!hidearray.includes(data)) {
             hidearray.push(data);
         }
     } else {
         // Remove value from array if checkbox is unchecked
         var index = hidearray.indexOf(data);
         if (index !== -1) {
             hidearray.splice(index, 1);
         }

         csrftoken();
         $.ajax({
             type: 'post',
             url:"/matched_filter",
             data:{id:id,type:value,method:'unmatched'},
             dataType:'html',
             success:function(response){
                
                $('.appendexemp').html(response);
             }
         })
     }


    if(jQuery.inArray("inr1only", hidearray) != -1) {

        if(value=='exemp'){
            $('.booksexemp').show();
        }
    } else { 
        if(value=='exemp'){
            $('.booksexemp').hide();
        }
    } 

    if(jQuery.inArray("inbookonly", hidearray) != -1) {
       
        if(value=='exemp'){
            $('.gstroneexemp').show();
        }
    } else {
        if(value=='exemp'){
            $('.gstroneexemp').hide();
        }
    } 
    
});
$('.hidegstrcdnur').click(function() {
    var hidearray=[];
    var value=$(this).attr('data-value');

    var type=$(this).attr('data-type');
    var id=$(this).attr('data-id');
    var data = $(this).val();
    if(type=='matched'){
        $('.unmatchedcdnur').prop('checked', false);
         csrftoken();
         $.ajax({
             type: 'post',
             url:"/matched_filter",
             data:{id:id,type:value,method:'matched'},
             dataType:'html',
             success:function(response){
                $('.appendcdnur').html(response);
             }
         })
 
     }else if(type=='mismatched'){
         $('.matchedcdnur').prop('checked', false);
         csrftoken();
         $.ajax({
             type: 'post',
             url:"/matched_filter",
             data:{id:id,type:value,method:'mismatched'},
             dataType:'html',
             success:function(response){
               
                $('.appendcdnur').html(response);
             }
         })
     }
     if ($(this).is(':checked')) {
        // Add value to array if checkbox is checked and not already present
        if (!hidearray.includes(data)) {
            hidearray.push(data);
        }
    } else {
        // Remove value from array if checkbox is unchecked
        var index = hidearray.indexOf(data);
        if (index !== -1) {
            hidearray.splice(index, 1);
        }

     csrftoken();
     $.ajax({
         type: 'post',
         url:"/matched_filter",
         data:{id:id,type:value,method:'unmatched'},
         dataType:'html',
         success:function(response){
            
            $('.appendcdnur').html(response);
         }
     })
    }

    if(jQuery.inArray("inr1only", hidearray) != -1) {

        if(value=='cdnur'){
            $('.bookscdnur').show();
        }
    } else { 
        if(value=='cdnur'){
            $('.bookscdnur').hide();
        }
    } 

    if(jQuery.inArray("inbookonly", hidearray) != -1) {
       
        if(value=='cdnur'){
            $('.gstronecdnur').show();
        }
    } else {
        if(value=='cdnur'){
            $('.gstronecdnur').hide();
        }
    } 
    
});
$('body').on('click','.annual',function(){
    var userid=$(this).attr('data-id');
    csrftoken();
    $.ajax({
        type: 'post',
        url:"/sectionfilter",
        data:{id:userid,type:'annual'},
        dataType:'html',
        success:function(response){
         
           $('#appendinvoice').html(response);
        }
    })
})
// $('body').on('click','.sectionFilter',function(){
//     var type=$(this).attr('data-type');
//     var userid=$(this).attr('data-user_id');
   
//     csrftoken();
//     $.ajax({
//         type: 'post',
//         url:"/sectionfilter",
//         data:{id:userid,type:type},
//         dataType:'html',
//         success:function(response){
         
//            $('#appendinvoice').html(response);
//         }
//     })
// })

$('body').on('click','.lgnbtn',function(){
    csrftoken();
    $.ajax({
        type: 'post',
        url:"/sectionfilter",
        data:{id:userid,type:type},
        dataType:'html',
        success:function(response){
         
           $('#appendinvoice').html(response);
        }
    })
})





