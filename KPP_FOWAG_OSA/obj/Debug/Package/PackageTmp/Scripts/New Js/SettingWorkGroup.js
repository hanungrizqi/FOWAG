jQuery(function () { Codebase.helpers(['select2']); });
var webLink = $("#web_link").val();
AddDistrict();
//if (document.getElementById('dstrct').value != null) {
//    inputNRP();
//}
EditDistrict();



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
                return `
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
            console.log(result.Data.WorkGroup);
            debugger;
            if (result.Data.Dstrct != null) {
                $("#editDstrct").val(result.Data.Dstrct).trigger("change");
            }
            //if (result.Data.WorkGroup != null) {
            //    $("#editWorkGroup").val(result.Data.WorkGroup).trigger("change");
            //}

            document.getElementById('editWG').value = result.Data.WorkGroup;

            //document.getElementById('editDstrct').value = result.Data.Dstrct;
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

function inputNRP() {
    var distrik = document.getElementById('dstrct').value;
    console.log(distrik);

    cekWG(distrik);
}

function edit_inputNRP() {
    var distrik = document.getElementById('editDstrct').value;
    console.log(distrik);

    Edit_cekWG(distrik);
    $('#editWorkGroup').empty();
}

function AddDistrict() {
    $.ajax({
        url: $("#web_link").val() + "/api/WorkGroup/Get_District", //URI,
        type: "GET",
        cache: false,
        success: function (result) {
            $('#dstrct').empty();
            text = '<option></option>';
            $.each(result.Data, function (key, val) {
                console.log(val.dstrct_code);
                text += '<option value="' + val.dstrct_code + '">' + val.dstrct_code + '</option>';
            });
            $("#dstrct").append(text);
            //inputNRP();
        }
    });
}

function cekWG(distrik) {
    $.ajax({
        url: $("#web_link").val() + "/api/RegisterBacklog/GetWorkGroup?district=" + distrik, //URI,
        type: "GET",
        cache: false,
        success: function (result) {
            $('#WorkGroup').empty();
            text = '<option></option>';
            $.each(result.Data, function (key, val) {
                text += '<option value="' + val.work_group + '">' + val.work_group + '</option>';
            });
            $("#WorkGroup").append(text);
        }
    });
}

function EditDistrict() {
    $.ajax({
        url: $("#web_link").val() + "/api/WorkGroup/Get_District", //URI,
        type: "GET",
        cache: false,
        success: function (result) {
            $('#editDstrct').empty();
            text = '<option></option>';
            $.each(result.Data, function (key, val) {
                console.log(val.dstrct_code);
                text += '<option value="' + val.dstrct_code + '">' + val.dstrct_code + '</option>';
            });
            $("#editDstrct").append(text);
            //inputNRP();
        }
    });
}

function Edit_cekWG(distrik) {
    $.ajax({
        url: $("#web_link").val() + "/api/RegisterBacklog/GetWorkGroup?district=" + distrik, //URI,
        type: "GET",
        cache: false,
        success: function (result) {

            text = '<option></option>';
            $.each(result.Data, function (key, val) {
                text += '<option value="' + val.work_group + '">' + val.work_group + '</option>';
            });
            //console.log($("#editWorkGroup").append(text));
            $("#editWorkGroup").append(text);

        }
    });
}