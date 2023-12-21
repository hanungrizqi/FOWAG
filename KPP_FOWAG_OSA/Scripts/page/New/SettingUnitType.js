jQuery(function () { Codebase.helpers(['select2']); });
var webLink = $("#web_link").val();
AddCompcode();
AddUnitModel();
EditCompcode();
EditUnitModel();


// Function Setting Role

var tableUnit = $("#tblUnitType").DataTable({
    ajax: {
        url: webLink + "/api/SettingUnitType/Get_UnitType",
        dataSrc: "Data",
    },
    scrollX: true,
    columnDefs: [
        { className: "text-center", "targets": [4] }
    ],
    pageLength: 8,
    lengthMenu: [[5, 8, 15, 20], [5, 8, 15, 20]],
    columns: [
        { data: 'UnitModel' },
        { data: 'Type' },
        { data: 'MaintenanceType' },
        { data: 'Component' },
        {
            data: null,
            targets: 'no-sort', orderable: false,
            render: function (data, type, row) {
                return `<div class="btn-group">
                        <button type="button" value="${row.Id}" onclick="geteditUnitType(${row.Id})" class="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="modal" data-target="#ModalEditUnitType">
                        <i class="fa fa-pencil"></i>
                        </button>
                        <button type="button" value="${row.Id}" onclick="deleteUnitType(${row.Id})" class="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="tooltip" title="Delete">
                        <i class="fa fa-times"></i>
                        </button>
                        </div>`
            }
        }
    ],
});

function addUnitType() {
    var obj = new Object();
    obj.UnitModel = $("#txt_unitModel").val();
    obj.Type = $("#txt_type").val();
    obj.MaintenanceType = $("#txt_MtType").val();
    obj.Component = $("#txt_Component").val();
    $.ajax({
        url: webLink + "/api/SettingUnitType/Create_UnitType", //URI
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
                tableUnit.ajax.reload();
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

function geteditUnitType(Id) {
    $.ajax({
        url: webLink + "/api/SettingUnitType/Get_UnitTypeById?id=" + Id, //URI
        success: function (result) {
            debugger;
            console.log(result.Data.Type);
            var type = result.Data.Type;
            if (result.Data.Type != null) {
                $("#txt_typeedit").val(result.Data.Type).trigger("change");
            }
            if (result.Data.UnitModel != null) {
                $("#txt_unitModeledit").val(result.Data.UnitModel).trigger("change");
            }
            document.getElementById('txt_MtTypeedit').value = result.Data.MaintenanceType;
            document.getElementById('txt_Componentedit').value = result.Data.Component;
        }
    })
}

function editUnitType() {
    var obj = new Object();
    obj.UnitModel = $("#txt_unitModeledit").val();
    obj.Type = $("#txt_typeedit").val();
    obj.MaintenanceType = $("#txt_MtTypeedit").val();
    obj.Component = $("#txt_Componentedit").val();
    obj.Id = $("#idUnitType").val();
    $.ajax({
        url: webLink + "/api/SettingUnitType/Update_UnitType", //URI
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
                tableUnit.ajax.reload();
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

function deleteUnitType(Id) {
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
                url: webLink + "/api/SettingUnitType/Delete_UnitType?id=" + Id, //URI
                type: "POST",
                success: function (data) {
                    if (data.Remarks == true) {
                        Swal.fire(
                            'Deleted!',
                            'Role has been Deleted.',
                            'success'
                        );
                        tableUnit.ajax.reload();
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

function AddCompcode() {
    $.ajax({
        url: $("#web_link").val() + "/api/SettingUnitType/Get_CompCode", //URI,
        type: "GET",
        cache: false,
        success: function (result) {
            $('#txt_type').empty();
            text = '<option></option>';
            $.each(result.Data, function (key, val) {
                text += '<option value="' + val.TABLE_CODE + '">' + val.TABLE_CODE + '</option>';
            });
            $("#txt_type").append(text);
        }
    });
}

function AddUnitModel() {
    $.ajax({
        url: $("#web_link").val() + "/api/SettingUnitType/Get_UnitModel", //URI,
        type: "GET",
        cache: false,
        success: function (result) {
            $('#txt_unitModel').empty();
            text = '<option></option>';
            $.each(result.Data, function (key, val) {
                text += '<option value="' + val.TABLE_CODE + '">' + val.TABLE_CODE + '</option>';
            });
            $("#txt_unitModel").append(text);
        }
    });
}

function EditCompcode() {
    $.ajax({
        url: $("#web_link").val() + "/api/SettingUnitType/Get_CompCode", //URI,
        type: "GET",
        cache: false,
        success: function (result) {
            $('#txt_typeedit').empty();
            text = '<option></option>';
            $.each(result.Data, function (key, val) {
                text += '<option value="' + val.TABLE_CODE + '">' + val.TABLE_CODE + '</option>';
            });
            $("#txt_typeedit").append(text);
        }
    });
}

function EditUnitModel() {
    $.ajax({
        url: $("#web_link").val() + "/api/SettingUnitType/Get_UnitModel", //URI,
        type: "GET",
        cache: false,
        success: function (result) {
            $('#txt_unitModeledit').empty();
            text = '<option></option>';
            $.each(result.Data, function (key, val) {
                text += '<option value="' + val.TABLE_CODE + '">' + val.TABLE_CODE + '</option>';
            });
            $("#txt_unitModeledit").append(text);
        }
    });
}