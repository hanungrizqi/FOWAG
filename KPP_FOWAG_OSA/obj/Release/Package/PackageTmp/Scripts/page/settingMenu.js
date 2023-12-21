jQuery(function () { Codebase.helpers(['select2']); });

addRole();
addRolelagi();
addMenu();

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

function addRolelagi() {
    $.ajax({
        url: $("#web_link").val() + "/api/Role/Get_Role", //URI,
        type: "GET",
        cache: false,
        success: function (result) {
            $('#groupRole').empty();
            text = '<option></option>';
            $.each(result.Data, function (key, val) {
                text += '<option value="' + val.RoleName + '">' + val.RoleName + '</option>';
            });
            $("#groupRole").append(text);
        }
    });
}

$('#groupRole').on('change', function () {
    tableMenu.columns(0).search(this.value).draw();
});

function addMenu() {
    $.ajax({
        url: $("#web_link").val() + "/api/Menu/Get_Menu", //URI,
        type: "GET",
        cache: false,
        success: function (result) {
            $('#menuID').empty();
            text = '<option></option>';
            $.each(result.Data, function (key, val) {
                text += '<option value="' + val.ID_Menu + '">' + val.Name_Menu + '</option>';
            });
            $("#menuID").append(text);
        }
    });
}

var webLink = $("#web_link").val();

var tableMenu = $("#tblMenu").DataTable({
    ajax: {
        url: webLink + "/api/Menu/Get_AksesMenu",
        dataSrc: "Data",
    },
    scrollX: true,
    columnDefs: [
        { className: "text-center", "targets": [2] }
    ],
    pageLength: 8,
    lengthMenu: [[5, 8, 15, 20], [5, 8, 15, 20]],
    columns: [
        { data: 'RoleName' },
        { data: 'Name_Menu' },
        {
            data: null,
            targets: 'no-sort', orderable: false,
            render: function (data, type, row) {
                return `<div class="btn-group">
                        <button type="button" value="${row.ID_Menu}" onclick="deleteAkses(this.value, ${row.ID_Role})" class="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="tooltip" title="Delete">
                        <i class="fa fa-times"></i>
                        </button>
                        </div>`
            }
        }
    ],
});

function addAkses() {
    var obj = new Object();
    obj.ID_Menu = $("#menuID").val();
    obj.ID_Role = $("#roleId").val();

    $.ajax({
        url: webLink + "/api/Menu/Create_AksesMenu", //URI
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
                tableMenu.ajax.reload();
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

function deleteAkses(menuId, roleId) {
    var obj = new Object();
    obj.ID_Role = roleId;
    obj.ID_Menu = menuId;
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
                url: webLink + "/api/Menu/Delete_AksesMenu", //URI
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
                        tableMenu.ajax.reload();
                    } if (data.Remarks == false) {
                        Swal.fire(
                            'Error!',
                            'Message : ' + data.Message,
                            'error'
                        );
                    }                },
                error: function (xhr) {
                    alert(xhr.responseText);
                }
            })
        }
    })
}

