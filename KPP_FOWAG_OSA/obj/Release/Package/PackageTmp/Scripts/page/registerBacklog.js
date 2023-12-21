jQuery(function () { Codebase.helpers(['select2']); });

var webLink = $("#web_link").val();
addUserPlan();
addWorkgroup();
addStandarJob();
addDataPAP();

//Get data UserPlan for dropdown NRPGL and OriginatorId
function addUserPlan() {
    $.ajax({
        url: $("#web_link").val() + "/api/User/Get_UserPlant", //URI,
        type: "GET",
        cache: false,
        success: function (result) {
            $('#txt_OriginatorID').empty();
            $('#txt_NRPGL').empty();
            text = '<option></option>';
            $.each(result.Data, function (key, val) {
                var nrpKary = val.EMPLOYEE_ID;
                var nrpRemoveSpace = nrpKary.split(' ').join('');
                text += '<option value="' + nrpRemoveSpace + '">' + nrpRemoveSpace + ' - ' + val.NAME + '</option>';
            });
            $("#txt_OriginatorID").append(text);
            $("#txt_NRPGL").append(text);
        }
    });
}

//Get data Workgroup for dropdown workgroup
function addWorkgroup() {
    $.ajax({
        url: $("#web_link").val() + "/api/RegisterBacklog/GetWorkGroup?district=" + $("#txt_labDistrict").val(), //URI,
        type: "GET",
        cache: false,
        success: function (result) {
            $('#txt_WorkGroup').empty();
            text = '<option></option>';
            $.each(result.Data, function (key, val) {
                text += '<option value="' + val.work_group + '">' + val.work_grp_desc + '</option>';
            });
            $("#txt_WorkGroup").append(text);
        }
    });
}

//Get data Standar Job for dropdown Standar Job
function addStandarJob() {
    $.ajax({
        url: $("#web_link").val() + "/api/RegisterBacklog/GetStandarJob?district=" + $("#txt_labDistrict").val(), //URI,
        type: "GET",
        cache: false,
        success: function (result) {
            $('#txt_StandarJob').empty();
            text = '<option></option>';
            $.each(result.Data, function (key, val) {
                text += '<option value="' + val.STD_JOB_NO + '">' + val.STD_JOB_DESC + '</option>';
            });
            $("#txt_StandarJob").append(text);
        }
    });
}

//Get data PAP for data input backlog
function addDataPAP() {
    $.ajax({
        url: $("#web_link").val() + "/api/RegisterBacklog/GetRegisterBacklog?LabNumber=" + $("#txt_LabNumber").val(), //URI
        success: function (result) {

            if (result.NoBacklog == null) {
                var getMonth = ("0" + (new Date().getMonth())).slice(-2);
                $.ajax({
                    url: $("#web_link").val() + "/api/RegisterBacklog/GetLastNoBacklog?id=" + getMonth + new Date().getFullYear() + result.DSTRCT, //URI
                    success: function (data) {
                        var monthNow = ("0" + (new Date().getMonth())).slice(-2);
                        var newNoBacklog = "";
                        if (data.Data == null) {
                            newNoBacklog = "O001" + monthNow + new Date().getFullYear() + result.DSTRCT
                        } else {
                            var NoBacklog = data.Data.NoBacklog;
                            var last4NoBacklog = NoBacklog.substr(1, 4);
                            var newLastNo = parseInt(last4NoBacklog) + 1;
                            var ctxt = '' + newLastNo;
                            var textNo = last4NoBacklog.substr(0, last4NoBacklog.length - ctxt.length) + ctxt;
                            newNoBacklog = "O" + textNo + monthNow + new Date().getFullYear() + result.DSTRCT;
                        }
                        document.getElementById('txt_NoBacklog').value = newNoBacklog;
                    }
                })
            } else {
                document.getElementById('txt_NoBacklog').value = result.NoBacklog;
            }

            document.getElementById('txt_BacklogDesc').value = result.BacklogDesc;
            if (result.InspectonDate != null) {
                const tanggal = moment(result.InspectonDate).format("YYYY-MM-DD");
                document.getElementById('txt_InspectonDate').value = tanggal;
            }
            if (result.WorkGroup != null) {
                $("#txt_WorkGroup").val(result.WorkGroup).trigger('change');
            }
            if (result.StandarJob != null) {
                $("#txt_StandarJob").val(result.StandarJob).trigger('change');
            }
            if (result.NRPGL == null) {
                var nrpGl = $("#txt_Inspector").val();
                $("#txt_NRPGL").val(nrpGl).trigger('change');
            } else {
                $("#txt_NRPGL").val(result.NRPGL).trigger('change');
            }
            if (result.OriginatorID != null) {
                $("#txt_OriginatorID").val(result.OriginatorID).trigger('change');
            }
            if (result.PlanRepairDate != null) {
                const tanggal = moment(result.PlanRepairDate).format("YYYY-MM-DD");
                document.getElementById('txt_PRDate').value = tanggal;
            }
            document.getElementById('txt_HourE').value = parseFloat(result.HourEstimation);
        }
    })
}

//Table Recommended Part
var tabelRecPart = $("#tblRecPart").DataTable({
    ajax: {
        url: webLink + "/api/RegisterBacklog/GetPart?noBacklog=" + $("#txt_NoBacklog").val(),
        dataSrc: "Data",
    },
    scrollX: true,
    dom: '<t>',
    columnDefs: [
        { className: "text-center", "targets": [0] }
    ],
    columns: [
        {
            "data": null,
            render: function (data, type, row, meta) {
                return meta.row + meta.settings._iDisplayStart + 1;
            }
        },
        { data: 'PartNo' },
        { data: 'StockCode' },
        { data: 'PART_DESC' },
        { data: 'unit_of_issue' },
        { data: 'class' },
        { data: 'FigNo' },
        { data: 'IndexNo' },
        { data: 'Qty' },
        {
            data: null,
            targets: 'no-sort', orderable: false,
            render: function (data, type, row) {
                return `<div class="btn-group">
                        <button type="button" value="${row.ID}" onclick="geteditPart(this.value)" class="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="modal" data-target="#ModalEditPart">
                        <i class="fa fa-pencil"></i>
                        </button>
                        <button type="button" value="${row.ID}" onclick="deletePart(this.value)" class="btn btn-sm btn-secondary">
                        <i class="fa fa-times"></i>
                        </button>
                        </div>`
            }
        }
    ],
});

//Table Add Part
var tableAddPart = $("#tblAddPart").DataTable({
    ajax: {
        url: webLink + "/api/RegisterBacklog/GetAddPart?search=&district=",
        dataSrc: "Data",
    },
    scrollX: true,
    dom: '<t>',
    columnDefs: [
        { className: "text-center", "targets": [0] },
    ],
    columns: [
        {
            data: null,
            targets: 'no-sort', orderable: false,
            render: function (data, type, row) {
                return `<input type="checkbox" name="checkPart" onclick="checkPart(this)">`
            }
        },
        { data: 'part_no' },
        { data: 'stock_code' },
        { data: 'PART_DESC' },
    ],
});

$('#modal_addPart').on('shown.bs.modal', function (e) {
    tableAddPart.ajax.url(webLink + "/api/RegisterBacklog/GetAddPart?search=&district=").load();
    $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
});

//Show button add Part on table Recommend Part
$("#tblRecPart_filter.dataTables_filter").append($("#btnAddPart"));

function checkPart(checkbox) {
    var checkboxes = document.getElementsByName('checkPart')
    checkboxes.forEach((item) => {
        if (item !== checkbox) item.checked = false
    })
}

//Search Recommended Part
function searchPart() {
    tableAddPart.ajax.url(webLink + "/api/RegisterBacklog/GetAddPart?search=" + $("#txt_sPart").val() + "&district=" + $("#txt_labDistrict").val()).load();
}

function savePart() {
    var totalCheckboxes = $('#tblAddPart input[type="checkbox"]:checked').length
    if (totalCheckboxes == 0) {
        Swal.fire({
            icon: 'info',
            text: 'Belum ada data yang dipilih!'
        });
        return;
    }

    $('#tblAddPart input[type="checkbox"]:checked').each(function () {
        var data = tableAddPart.row(this.closest('tr')).data()
        var obj = new Object();

        obj.LabNumber = $('#txt_LabNumber').val();
        obj.NoBacklog = $('#txt_NoBacklog').val();
        obj.BacklogDesc = $('#txt_BacklogDesc').val();
        obj.InspectonDate = $('#txt_InspectonDate').val();
        obj.Inspector = $('#txt_Inspector').val();
        obj.WorkGroup = $('#txt_WorkGroup').val();
        obj.StandarJob = $('#txt_StandarJob').val();
        obj.NRPGL = $('#txt_NRPGL').val();
        obj.OriginatorID = $('#txt_OriginatorID').val();
        obj.PlanRepairDate = $('#txt_PRDate').val();
        obj.Manpower = $('#txt_Manpower').val();
        obj.HourEstimation = $('#txt_HourE').val();
        obj.CreatedBy = $('#hd_nrp').val();
        obj.Status = "Saved";
        obj.partNo = data.part_no;
        obj.StockCode = data.stock_code;
        obj.PartDesc = data.PART_DESC;
        obj.FigNo = $('#txt_FigNo').val();
        obj.IndexNo = $('#txt_IndexNo').val();
        obj.Qty = $('#txt_Qty').val();

        console.log(obj);

        $.ajax({
            url: webLink + "/api/RegisterBacklog/Create_Backlog", //URI
            data: JSON.stringify(obj),
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.Remarks == true) {
                    Swal.fire(
                        'Added!',
                        'Part has been Added.',
                        'success'
                    );
                    tabelRecPart.ajax.reload();
                }
                if (data.Remarks == false) {
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
    })
}

function deletePart(id) {
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
                url: webLink + "/api/RegisterBacklog/Delete_Part?id=" + id, //URI
                type: "POST",
                success: function (data) {
                    if (data.Remarks == true) {
                        Swal.fire(
                            'Deleted!',
                            'Part has been Deleted.',
                            'success'
                        );
                        tabelRecPart.ajax.reload();
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

function RegisterBacklog() {
    var obj = new Object();

    obj.NoBacklog = $('#txt_NoBacklog').val();
    obj.Eqp_Number = $('#txt_EqpNumber').val();
    obj.BacklogDesc = $('#txt_BacklogDesc').val();
    obj.Component_Id = $('#txt_CompCode').val();
    obj.HM_NUMBER = $('#txt_HM').val();
    obj.PlanRepairDate = $('#txt_PRDate').val();
    obj.HourEstimation = $('#txt_HourE').val();
    obj.NRPGL = $('#txt_NRPGL').val();
    obj.InspectonDate = $('#txt_InspectonDate').val();
    obj.Inspector = $('#txt_Inspector').val();
    obj.WorkGroup = $('#txt_WorkGroup').val();
    obj.StandarJob = $('#txt_StandarJob').val();
    obj.OriginatorID = $('#txt_OriginatorID').val();
    obj.Manpower = $('#txt_Manpower').val();
    obj.CreatedBy = $('#hd_nrp').val();
    obj.DSTRCT = $('#txt_labDistrict').val();
    obj.Status = "Register";

    $.ajax({
        url: webLink + "/api/RegisterBacklog/Register_BCS", //URI
        data: JSON.stringify(obj),
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.Remarks == true) {
                Swal.fire(
                    'Added!',
                    'Register Backlog Success',
                    'success'
                );
                tabelRecPart.ajax.reload();
            }
            if (data.Remarks == false) {
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