var webLink = $("#web_link").val();


// Function Setting Role

var tableSent = $("#tblRole").DataTable({
    ajax: {
        url: webLink + "/api/Role/Get_Role",
        dataSrc: "Data",
    },
    scrollX: true,
    columnDefs: [
        { className: "text-center", "targets": [0] },
        { className: "text-center", "targets": [2] }
    ],
    pageLength: 8,
    lengthMenu: [[5, 8, 15, 20], [5, 8, 15, 20]],
    columns: [
        { data: 'ID' },
        { data: 'RoleName' },
        {
            data: null,
            targets: 'no-sort', orderable: false,
            render: function (data, type, row) {
                return `<div class="btn-group">
                        <button type="button" value="${row.ID}" onclick="geteditRole(this)" class="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="modal" data-target="#ModalEditRole">
                        <i class="fa fa-pencil"></i>
                        </button>
                        <button type="button" value="${row.ID}" onclick="deleteRole(this)" class="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="tooltip" title="Delete">
                        <i class="fa fa-times"></i>
                        </button>
                        </div>`
            }
        }
    ],
});

function addRole() {
    var obj = new Object();
    obj.RoleName = $("#roleName").val();
    $.ajax({
        url: webLink + "/api/Role/Create_Role", //URI
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
                tableSent.ajax.reload();
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

function geteditRole(roleId) {
    var idRole = roleId.value;
    $.ajax({
        url: webLink + "/api/Role/Get_Role_ByID?id=" + idRole, //URI
        success: function (result) {
            document.getElementById('editRoleName').value = result.Data.RoleName;
            document.getElementById('idUpdate_Role').value = result.Data.ID;
        }
    })
}

function editRole() {
    var obj = new Object();
    obj.RoleName = $("#editRoleName").val();
    obj.ID = $("#idUpdate_Role").val();
    $.ajax({
        url: webLink + "/api/Role/Update_Role", //URI
        data: JSON.stringify(obj),
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.Remarks == true) {
                Swal.fire(
                    'Updated!',
                    'Role has been Updated.',
                    'success'
                );
                tableSent.ajax.reload();
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

function deleteRole(roleId) {
    var idRole = roleId.value;
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
                url: webLink + "/api/Role/Delete_Role?id=" + idRole, //URI
                type : "POST",
                success: function (data) {
                    if (data.Remarks == true) {
                        Swal.fire(
                            'Deleted!',
                            'Role has been Deleted.',
                            'success'
                        );
                        tableSent.ajax.reload();
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

