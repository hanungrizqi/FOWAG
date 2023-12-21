
    var webLink = $("#web_link").val();
    var role = $("#role").val();
    addDistrict();

    function changeDSTRCT(distrik) {
        //tableSent.columns(1).search(distrik).draw();
    }


    function addDistrict() {
        $.ajax({
            url: webLink + "/api/SampleDueDate/Get_District", //URI,
            type: "GET",
            cache: false,
            success: function (result) {
                $('#txt_DSTRCT').empty();
                text = '<option value="">Select District</option>';
                $.each(result.Data, function (key, val) {
                    text += '<option value="' + val.dstrct_code + '">' + val.dstrct_code + '</option>';
                });
                $("#txt_DSTRCT").append(text);
            }
        });
    }

    var webLink = $("#web_link").val();
    addWorkGroup();
    $("document").ready(function () {
        $("#tblSampelDD_filter.dataTables_filter").append($("#txt_WG"));
    })

    //Table
    var tableSent = $("#tblSampelDD").DataTable({
        ajax: {
            url: webLink + "/api/SampleDueDate/Get_SampleCreate?role=" + role,
            dataSrc: "Data",
        },
        scrollX: true,
        "searching": true,
        "dom": '<f<t>p>',
        order: [[0, 'desc']],
        columns: [
            /*{ data: 'LabNumber' },*/
            { data: 'WORK_GROUP', visible: false },
            { data: 'WO' },
            { data: 'DSTRCT' },
            { data: 'UnitModel' },
            { data: 'UnitNumber' },
            /*{ data: 'ComponentCode - Component' },*/
            {
                data: null,
                targets: 'no-sort', orderable: false,
                render: function (data, type, row) {
                    {
                        var Comp = "";
                        if (row.Component != null) {
                            Comp = row.ComponentCode + "-" + row.Component;
                        } else if (row.Component == null) {
                            Comp = row.ComponentCode;
                        } else {
                            Comp = null;
                        }
                        return Comp;
                    }
                }
            },
            //{ data: 'UnitHM' },
            //{ data: 'OilHM' },
            {
                data: null,
                targets: 'no-sort', orderable: false,
                render: function (data, type, row) {
                    var showStatus = "";
                    if (row.Status == null) {
                        showStatus = `<a href="/SampleDueDate/labelform?wo=${row.WO}&dstrct=${row.DSTRCT}&compcode=${row.ComponentCode}&complbl=${row.Component}">Open</a>`;
                    }
                    //else {
                    //    showStatus = `<a href="/SampleDueDate/labelform?wo=${row.WO}&dstrct=${row.DSTRCT}&compcode=${row.ComponentCode}&complbl=${row.Component}">${row.Status}</a>`;
                    //}
                    //if (row.Status == "Printed") {
                    //    //showStatus = row.Status;
                    //    showStatus = `<a href="/SampleDueDate/LabelFormPrint?labnum=${row.LabNumber}">${row.Status}</a>`;
                    //}
                    //else if (row.Status == "On Lab") {
                    //    //showStatus = row.Status;
                    //    showStatus = `<a href="/SampleDueDate/LabelFormOnLab?labnum=${row.LabNumber}">${row.Status}</a>`;
                    //}
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
                url: $("#web_link").val() + "/api/SampleDueDate/Get_SampleDueDateUN_ByID?wo=" + DataWo + '&dstrct=' + district, //URI
                success: function (result) {
                    if (result.Data == null) {
                        Swal.fire(
                            'Error!',
                            'Work Order not found',
                            'warning'
                        );
                    } else {
                        window.location.href = `/SampleDueDate/LabelForm_Unschedule?wo=${result.Data.WO}&dstrct=${district}`;
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

