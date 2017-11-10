$(document).ready(function(){

    $.validator.addMethod("allchar", function (value, element) {
        return /^[a-zA-Z ]*$/.test(value);
    },'Name should be in characters.');

    $.validator.addMethod("numeric", function (value, element) {
        return /^[7-9]{1}[0-9]{9}$/.test(value);
    });

    $.validator.addMethod('phone', function (value, element) {
        if (value != element.defaultValue) {
            return this.optional(element) || /^[7-9]{1}[0-9]{9}$/.test(value);
        }
        return true;
    }, 'This is not a valid number');

    $("#myForm").validate({
        rules:{
            firstName: {
                required : true,
                allchar : true,
                minlength : 2,
                maxlength : 10
            },
            lastName: {
                required : true,
                allchar : true,
                minlength : 2,
                maxlength : 10
            },
            phone: {
                required : true,
                numeric : true
            },

            email: {
                required : true,
                email : true
            },
            password: {
                required : true,
                minlength : 8,
                maxlength : 12
            },

            confirmpassword: {
                equalTo: "#password"
            },

            gender:{
                required : true
            },

            year: {
                required : true,
            },

            list: {
                required : true,
            },

            aboutyou: {
                required : true,
            }
        },

        messages: {

            phone : {
                numeric : "Please enter valid phone number."
            },

            password: " Enter Password",

            confirmpassword:{
            equalTo : " Enter Confirm Password Same as Password"
            },

            gender:{
                required : "Select one"
            }
        }
});


    $("#year").hover(function() {
        yearDropdownList();
    });

    function yearDropdownList(){
        var start = 1900;
        var end = new Date().getFullYear();
        var options = "";
        for(var year = start ; year <=end; year++){
            options += "<option>"+ year +"</option>";
        }
        $("#year").html(options);


    }

    $("#year").click(function() {
        calculate_age();
    });

    function calculate_age() {
        var birth_year = $("#year").val();
        var birth_month = $("#month").val();
        var birth_day = $("#day").val();

        var today = new Date();
        var birthday = new Date(birth_year, birth_month-1, birth_day);
        var differenceInMilisecond = today.valueOf() - birthday.valueOf();

        var year_age = Math.floor(differenceInMilisecond / 31536000000); //365*24*60*60*1000
        var day_age = Math.floor((differenceInMilisecond % 31536000000) / 86400000);//365*24*60*60*1000 / 60*60*24*1000

        if ((today.getMonth() == birthday.getMonth()) && (today.getDate() == birthday.getDate())) {
            alert("Happy B'day!!!");
        }

        var month_age = Math.floor(day_age/30);

        day_age = day_age % 30;

        var tMnt= (month_age + (year_age*12));
        var tDays =(tMnt*30) + day_age;

        $("#age").val(year_age + "." + month_age);

    }


});