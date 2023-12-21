//=========================Login=================================
jQuery(function () { Codebase.helpers(['select2']); });
//addRole();
function inputNRP() {
    var Username = $("#login-username").val();
    console.log(Username);

    cekRole(Username);
}

function PostLogin() {
    var obj = new Object();
    obj.Username = $("#login-username").val();
    obj.Password = $("#login-password").val();
    obj.Role = $("#roleId").val();
    $.ajax({
        url: $("#web_link").val() + "/api/Login/Get_Login", //URI
        data: JSON.stringify(obj),
        dataType: "json",
        type : "POST",
        contentType: "application/json; charset=utf-8",
        beforeSend: function () {
            $("#overlay").show();
        },
        success: function (data) {
            if (data.Remarks == true) {
                console.log(data.Data.Nrp)
                //alert(data.Data.Nrp + ", " + data.Data.District + ", " + data.Data.Department + ", " + data.Data.Position + ", " + data.Data.ID_Role);
                MakeSession(data.Data.Nrp, data.Data.ID_Role, data.Data.Name);
            }
            else {
                Swal.fire(
                    'Error!',
                    'Username atau password salah..!! ',
                    'Error'
                );
                $("#overlay").hide();
            }

        },
        error: function (xhr) {
            Swal.fire(
                'Error!',
                'Message : ' + xhr.responseText,
                'Error'
            );
        }
    })
}

function MakeSession(nrp, role_id, name) {
    debugger
    var obj = {
        Nrp: nrp,
        ID_Role: role_id,
        Name: name,
    };

    $.ajax({
        type: "POST",
        url: "/Login/MakeSession", //URI
        dataType: "json",
        data: JSON.stringify(obj),
        contentType: "application/json; charset=utf-8",
        success: function (data) {

            window.location.href = "/Home/index";

        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    });

}

function addRole() {
    $.ajax({
        url: $("#web_link").val() + "/api/Role/Get_Role", //URI,
        type: "GET",
        cache: false,
        success: function (result) {
            $('#roleId').empty();
            text = '<option></option>';
            $.each(result.Data, function (key, val) {
                text += '<option value="' + val.ID + '">' + val.RoleName + '</option>';
            });
            $("#roleId").append(text);
        }
    });
}

function cekRole(nrp) {
    $.ajax({
        url: $("#web_link").val() + "/api/Role/Get_RoleNew?nrp=" + nrp, //URI,
        type: "GET",
        cache: false,
        success: function (result) {
            $('#roleId').empty();
            text = '<option></option>';
            $.each(result.Data, function (key, val) {
                text += '<option value="' + val.ID_Role + '">' + val.RoleName + '</option>';
            });
            $("#roleId").append(text);
        }
    });
}