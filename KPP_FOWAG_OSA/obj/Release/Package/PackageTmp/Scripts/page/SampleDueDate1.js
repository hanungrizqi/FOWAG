var webLink = $("#web_link").val();
addWorkGroup();
$("document").ready(function () {
    $("#tblSampelDD_filter.dataTables_filter").append($("#txt_WG"));
})

//Table
var tableSent = $("#tblSampelDD").DataTable({
    ajax: {
        url: webLink + "/api/SampleDueDate/Get_SampleDueDate",
        dataSrc: "Data",
    },
    scrollX: true,
    "searching": true,
    "dom": '<f<t>p>',
    order: [[0, 'desc']],
    columns: [
        { data: 'LabNumber' },
        { data: 'WORK_GROUP', visible: false },
        { data: 'WO' },
        { data: 'DSTRCT' },
        { data: 'UnitModel' },
        { data: 'UnitNumber' },
        { data: 'Component' },
        { data: 'UnitHM' },
        { data: 'OilHM' },
        {
            data: null,
            targets: 'no-sort', orderable: false,
            render: function (data, type, row) {
                var showStatus = "";
                if (row.Status == null) {
                    showStatus = `<a href="/SampleDueDate/labelform?wo=${row.WO}&dstrct=${row.DSTRCT}">Open</a>`;
                }
                else {
                    showStatus = `<a href="/SampleDueDate/labelform?wo=${row.WO}&dstrct=${row.DSTRCT}">${row.Status}</a>`;
                }
                if (row.Status == "Printed") {
                    //showStatus = row.Status;
                    showStatus = `<a href="/SampleDueDate/LabelFormPrint?labnum=${row.LabNumber}">${row.Status}</a>`;
                }
                return showStatus;
            }
        }
    ],
});

function newLabel() {
    var DataWo = $("#txt_WO").val();
    var district = $("#txt_DSTRCT").val();
    if (DataWo == "") {
        return;
    } else {
        $.ajax({
            url: $("#web_link").val() + "/api/SampleDueDate/Get_SampleDueDate_ByID?wo=" + DataWo + '&dstrct=' + district, //URI
            success: function (result) {
                if (result.Data == null) {
                    Swal.fire(
                        'Error!',
                        'Work Order not found',
                        'warning'
                    );
                } else {
                    window.location.href = `/SampleDueDate/labelform?wo=${result.Data.WO}&dstrct=${district}`;
                }
            }

        })

    }
}

function addWorkGroup() {
    $.ajax({
        url: webLink + "/api/WorkGroup/Get_WorkGroup", //URI,
        type: "GET",
        cache: false,
        success: function (result) {
            $('#txt_WG').empty();
            text = '<option value="">All Work Group</option>';
            $.each(result.Data, function (key, val) {
                text += '<option value="' + val.WorkGroup + '">' + val.Dstrct + '</option>';
            });
            $("#txt_WG").append(text);
        }
    });
}

function changeWG(wg) {
    tableSent.columns(1).search(wg).draw();
}