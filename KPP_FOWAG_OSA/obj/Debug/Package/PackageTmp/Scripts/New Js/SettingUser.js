   jQuery(function () { Codebase.helpers(['select2']); });

    addRole();
    addUser();
    var webLink = $("#web_link").val();

    //Function Setting Assign Role

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

    function addUser() {
        $.ajax({
            url: $("#web_link").val() + "/api/User/Get_User", //URI,
            type: "GET",
            cache: false,
            success: function (result) {
                $('#userID').empty();
                text = '<option></option>';
                $.each(result.Data, function (key, val) {
                    text += '<option value="' + val.EMPLOYEE_ID + '">' + val.EMPLOYEE_ID + ' - ' + val.NAME + '</option>';
                });
                $("#userID").append(text);
            }
        });
    }

    var tableAssign = $("#tblAssign").DataTable({
        ajax: {
            url: webLink + "/api/User/Get_User_Akses",
            dataSrc: "Data",
        },
        scrollX: true,
        columnDefs: [
            { className: "text-center", "targets": [4] }
        ],
        pageLength: 8,
        lengthMenu: [[5, 8, 15, 20], [5, 8, 15, 20]],
        columns: [
            { data: 'RoleName' },
            { data: 'EMPLOYEE_ID' },
            { data: 'NAME' },
            { data: 'SITE' },
            {
                data: null,
                targets: 'no-sort', orderable: false,
                render: function (data, type, row) {
                    return `<div class="btn-group">
                        <button type="button" value="${row.EMPLOYEE_ID}" onclick="deleteAssignRole(this.value, ${row.ID_Role})" class="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="tooltip" title="Delete">
                        <i class="fa fa-times"></i>
                        </button>
                        </div>`
                }
            }
        ],
    });

    function assignRole() {
        var obj = new Object();
        obj.Username = $("#userID").val();
        obj.ID_Role = $("#roleId").val();

        $.ajax({
            url: webLink + "/api/User/Assign_User", //URI
            data: JSON.stringify(obj),
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.Remarks == true) {
                    Swal.fire(
                        'Added!',
                        'Role has been Added.',
                        'success'
                    );
                    tableAssign.ajax.reload();
                } if (data.Remarks == false) {
                    Swal.fire(
                        'Error!',
                        'Message : ' + data.Message,
                        'error'
                    );
                }
            },
            error: function (xhr) {
                alert(xhr.responseText);
            }
        })
        addRole();
        addUser();
    }

    function deleteAssignRole(userAssig, roleId) {
        var obj = new Object();
        obj.ID_Role = roleId;
        obj.Username = userAssig;
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete !'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: webLink + "/api/User/Delete_Assign_User", //URI
                    data: JSON.stringify(obj),
                    dataType: "json",
                    type: "POST",
                    contentType: "application/json; charset=utf-8",
                    success: function (data) {
                        if (data.Remarks == true) {
                            Swal.fire(
                                'Deleted!',
                                'Role has been Deleted from User.',
                                'success'
                            );
                            tableAssign.ajax.reload();
                        } if (data.Remarks == false) {
                            Swal.fire(
                                'Error!',
                                'Message : ' + data.Message,
                                'error'
                            );
                        }
                    },
                    error: function (xhr) {
                        alert(xhr.responseText);
                    }
                })
            }
        })
    }