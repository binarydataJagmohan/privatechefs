       $(document).ready(function(){ 
        $('#body-row .collapse').collapse('hide'); 
 
        $('#collapse-icon').addClass('fa-angle-double-left'); 
 
        $('[data-toggle=sidebar-colapse]').click(function() {
            SidebarCollapse();
        });

        function SidebarCollapse () {
            $('.menu-collapsed').toggleClass('d-none');
            $('.sidebar-submenu').toggleClass('d-none');
            $('.submenu-icon').toggleClass('d-none');
            $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');
            $(".sidebar-collapsed").click(function(){
              $('.right-part').addClass('collapsed_section');
            });
            $(".sidebar-expanded").click(function(){
              $('.right-part').removeClass('collapsed_section');
            }); 
            $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
        }
        });  

 
          $(document).ready(function(){
              $(".icon-arrow").click(function(){
                $("#sidebar-container").hide();
              });
              $(".bars-icon").click(function(){
                $("#sidebar-container").show();
              });
            });
         
 