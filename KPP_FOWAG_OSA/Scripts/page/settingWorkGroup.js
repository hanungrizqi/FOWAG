var webLink = $("#web_link").val();
AddDistrict();


// Function Setting WorkGroup

var table = $("#tblWorkGroup").DataTable({
    ajax: {
        url: webLink + "/api/WorkGroup/Get_WorkGroup",
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
        { data: 'WorkGroup' },
        { data: 'Dstrct' },
        {
            data: null,
            targets: 'no-sort', orderable: false,
            render: function (data, type, row) {
                return `<div class="btn-group">
                        <button type="button" value="${row.ID}" onclick="geteditWorkGroup(this)" class="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="modal" data-target="#ModalEditWorkGroup">
                        <i class="fa fa-pencil"></i>
                        </button>
                        <button type="button" value="${row.ID}" onclick="deleteWorkGroup(this)" class="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="tooltip" title="Delete">
                        <i class="fa fa-times"></i>
                        </button>
                        </div>`
            }
        }
    ],
});

function addWorkGroup() {
    var obj = new Object();
    obj.WorkGroup = $("#WorkGroup").val();
    obj.Dstrct = $("#dstrct").val();
    $.ajax({
        url: webLink + "/api/WorkGroup/Create_WorkGroup", //URI
        data: JSON.stringify(obj),
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.Remarks == true) {
                Swal.fire(
                    'Added!',
                    'WorkGroup has been Added.',
                    'success'
                );
                table.ajax.reload();
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

function geteditWorkGroup(idWG) {
    var idWorkGroup = idWG.value;
    $.ajax({
        url: webLink + "/api/WorkGroup/Get_WorkGroup_ByID?id=" + idWorkGroup, //URI
        success: function (result) {
            document.getElementById('editWorkGroup').value = result.Data.WorkGroup;
            document.getElementById('editDstrct').value = result.Data.Dstrct;
            document.getElementById('idUpdate_WorkGroup').value = result.Data.ID;
        }
    })
}

function editWorkGroup() {
    var obj = new Object();
    obj.WorkGroup = $("#editWorkGroup").val();
    obj.Dstrct = $("#editDstrct").val();
    obj.ID = $("#idUpdate_WorkGroup").val();
    $.ajax({
        url: webLink + "/api/WorkGroup/Update_WorkGroup", //URI
        data: JSON.stringify(obj),
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.Remarks == true) {
                Swal.fire(
                    'Updated!',
                    'WorkGroup has been Updated.',
                    'success'
                );
                table.ajax.reload();
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

function deleteWorkGroup(idWG) {
    var idWorkGroup = idWG.value;
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
                url: webLink + "/api/WorkGroup/Delete_WorkGroup?id=" + idWorkGroup, //URI
                type: "POST",
                success: function (data) {
                    if (data.Remarks == true) {
                        Swal.fire(
                            'Deleted!',
                            'WorkGroup has been Deleted.',
                            'success'
                        );
                        table.ajax.reload();
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

function AddDistrict() {
    $.ajax({
        url: $("#web_link").val() + "/api/SettingWorkGroup/Get_District", //URI,
        type: "GET",
        cache: false,
        success: function (result) {
            $('#roleId').empty();
            text = '<option></option>';
            $.each(result.Data, function (key, val) {
                text += '<option value="' + val.TABLE_CODE + '">' + val.TABLE_CODE + '</option>';
            });
            $("#txt_type").append(text);
        }
    });
}

