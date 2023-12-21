
    jQuery(function () { Codebase.helpers(['select2']); });
    debugger;
    if (document.getElementById('txt_backlogBCS').value != "") {
        addStandarJob();
        $.ajax({
            url: $("#web_link").val() + "/api/RegisterBacklog/GetNoBacklogBCS?nobacklog=" + $("#txt_backlogBCS").val(), //URI
            success: function (backlog) {

                //console.log(backlog.bcs.NO_BACKLOG)
                if (backlog.bcs != null) {
                    if (backlog.bcs.NO_BACKLOG != null) {

                        document.getElementById('txt_backlogBCS').value = "true"
                    }
                } else {
                    document.getElementById('txt_backlogBCS').value = "false"
                }

            }
        })

        //document.getElementById('orig-edit').style.display = "block";
        //document.getElementById('orig-ori').style.display = "none";
        //document.getElementById('orig-edit1').style.display = "block";
        //document.getElementById('orig-ori1').style.display = "none";
    } else {
        //document.getElementById('orig-edit').style.display = "none";
        //document.getElementById('orig-ori').style.display = "block";
        //document.getElementById('orig-edit1').style.display = "block";
        //document.getElementById('orig-ori1').style.display = "none";
    }
    var webLink = $("#web_link").val();

    addUserPlan();
    addWorkgroup();


    addDataPAP();

    //console.log($("#txt_NoBacklog").val());
    //console.log(coba);
    //LoadTbl($("#txt_NoBacklog").val());
    var backlog = "false";


    function cleanData() {
        $('#txt_NRPGL').empty();
    }

    //Get data UserPlan for dropdown NRPGL and OriginatorId
    function addUserPlan() {
        $.ajax({
            url: $("#web_link").val() + "/api/User/Get_UserPlant", //URI,
            type: "GET",
            cache: false,
            success: function (result) {
                //if (ViewBag.orig == null) {
                //    $('#txt_OriginatorID').empty();
                //    //$('#txt_NRPGL').empty();
                //}

                text = '<option></option>';
                $.each(result.Data, function (key, val) {
                    var nrpKary = val.EMPLOYEE_ID;
                    var nrpRemoveSpace = nrpKary.split(' ').join('');
                    text += '<option value="' + nrpRemoveSpace + '">' + nrpRemoveSpace + ' - ' + val.NAME + '</option>';
                });

                //if (ViewBag.orig == null) {
                //    $("#txt_OriginatorID").append(text);
                //    //$("#txt_NRPGL").append(text);
                //}

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
                //$('#txt_WorkGroup').empty();
                text = '<option></option>';
                $.each(result.Data, function (key, val) {
                    text += '<option value="' + val.work_group + '">' + val.work_grp_desc + '</option>';
                });
                //$("#txt_WorkGroup").append(text);
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

    function get_StandarJob(stdjob) {
        $.ajax({
            url: $("#web_link").val() + "/api/RegisterBacklog/Get_ReviewStandarJob?district=" + $("#txt_labDistrict").val() + "&stdjob=" + stdjob, //URI,
            type: "GET",
            cache: false,
            success: function (result) {
                $('#txt_StandarJob').empty();
                text = '<option></option>';
                $.each(result.Data, function (key, val) {
                    text += '<option value="' + val.STD_JOB_NO + '">' + val.STD_JOB_DESC + '</option>';
                });
                $("#txt_StandarJob").append(text);
                $("#txt_StandarJob").val(stdjob).trigger('change');
            }
        });
    }

    //Get data PAP for data input backlog]

    function addDataPAP() {
        //var newNoBacklog = "";
        //var okay = "k";
        $.ajax({

            url: $("#web_link").val() + "/api/RegisterBacklog/GetRegisterBacklog?LabNumber=" + $("#txt_LabNumber").val(), //URI
            success: function (result) {
                var distrik = "";
                console.log(result);
                if (result.Lab == "Technomics" && result.DSTRCT == null) {
                    console.log("masuk1");
                    document.getElementById('txt_labDistrict').value = "INDE";
                    distrik = "INDE";
                } else {
                    distrik = result.DSTRCT;
                }

                if (result.NoBacklog == null) {
                    console.log("masuk if");
                    var getMonth = ("0" + (new Date().getMonth())).slice(-2);
                    $.ajax({
                        url: $("#web_link").val() + "/api/RegisterBacklog/GetLastNoBacklog?id=" + getMonth + new Date().getFullYear() + distrik, //URI
                        success: function (data) {
                            var monthNow = ("0" + (new Date().getMonth())).slice(-2);
                            var newNoBacklog = "";
                            if (data.Data == null) {
                                console.log(result.Lab)
                                if (result.Lab == "Petrolab" || result.Lab == "OSA PAMA") {
                                    newNoBacklog = "O001" + monthNow + new Date().getFullYear() + distrik
                                }
                                else if (result.Lab == "Technomics") {
                                    newNoBacklog = "O001" + monthNow + new Date().getFullYear() + "INDE"
                                    console.log("masuk");
                                    document.getElementById('txt_labDistrict').value = "INDE";
                                }
                            } else {
                                if (result.Lab == "Petrolab" || result.Lab == "OSA PAMA") {
                                    var NoBacklog = data.Data.NoBacklog;
                                    var last4NoBacklog = NoBacklog.substr(1, 4);
                                    var newLastNo = parseInt(last4NoBacklog) + 1;
                                    var ctxt = '' + newLastNo;
                                    var textNo = last4NoBacklog.substr(0, last4NoBacklog.length - ctxt.length) + ctxt;
                                    newNoBacklog = "O" + textNo + monthNow + new Date().getFullYear() + distrik;
                                }
                                else if (result.Lab == "Technomics") {
                                    var NoBacklog = data.Data.NoBacklog;
                                    var last4NoBacklog = NoBacklog.substr(1, 4);
                                    var newLastNo = parseInt(last4NoBacklog) + 1;
                                    var ctxt = '' + newLastNo;
                                    var textNo = last4NoBacklog.substr(0, last4NoBacklog.length - ctxt.length) + ctxt;
                                    newNoBacklog = "O" + textNo + monthNow + new Date().getFullYear() + "INDE";

                                    console.log("masuk1");
                                    document.getElementById('txt_labDistrict').value = "INDE";
                                }
                            }
                            document.getElementById('txt_NoBacklog').value = newNoBacklog;
                            nobacklog = newNoBacklog;
                            //NoBacklog();
                            //LoadTbl(newNoBacklog);
                            //k = newNoBacklog;
                            //console.log(newNoBacklog);
                            //coba = "k";
                            //return newNoBacklog;
                        }
                    })
                }
                else {
                    console.log("masuk else");

                    $.ajax({
                        url: $("#web_link").val() + "/api/RegisterBacklog/GetNoBacklogBCS?nobacklog=" + result.NoBacklog, //URI
                        success: function (backlog) {
                            //var distrik = "";
                            //console.log(backlog.bcs.NO_BACKLOG);
                            debugger;

                            if (backlog.bcs != null) {
                                if (backlog.bcs.NO_BACKLOG != null) {
                                    backlog = "true";
                                    console.log("harusnya hilang");
                                    document.getElementById('txt_NoBacklog').value = result.NoBacklog;
                                    document.getElementById('register').style.display = "none";
                                    document.getElementById('btnAddPart').style.display = "none";
                                    $('#txt_InspectonDate').prop('disabled', true);
                                    $('#txt_BacklogDesc').prop('disabled', true);
                                    $('#txt_InspectonDate').prop('disabled', true);
                                    $('#txt_OriginatorID').prop('disabled', true);
                                    $('#txt_WorkGroup').prop('disabled', true);
                                    $('#txt_StandarJob').prop('disabled', true);
                                    $('#txt_Manpower').prop('disabled', true);
                                    $('#txt_HourE').prop('disabled', true);
                                    $('#txt_PRDate').prop('disabled', true);
                                    $('#txt_NRPGL').prop('disabled', true);
                                }
                            } else {
                                backlog = "false";
                                document.getElementById('txt_NoBacklog').value = result.NoBacklog;
                                document.getElementById('register').style.display = "block";
                                document.getElementById('btnAddPart').style.display = "block";

                                //document.getElementById('txt_cekbcs').value = "false";
                                //document.getElementById('btn_deletepart').style.display = "block";
                                //document.getElementById('btn_editpart').style.display = "block";
                            }
                        }
                    })

                }


                document.getElementById('txt_BacklogDesc').value = result.BacklogDesc;
                if (result.InspectonDate != null) {
                    const tanggal = moment(result.InspectonDate).format("YYYY-MM-DD");
                    document.getElementById('txt_InspectonDate').value = tanggal;
                }
                if (result.WorkGroup != null) {
                    console.log(result.WorkGroup)
                    /*$("#txt_WorkGroup").val(result.WorkGroup).trigger('change');*/
                }
                if (result.StandarJob == null || result.StandarJob == "") {
                    addStandarJob();
                }
                if (result.StandarJob != null) {
                    console.log(result.StandarJob)
                    get_StandarJob(result.StandarJob);
                    console.log($('#txt_StandarJob').val());
                    $("#txt_StandarJob").val(result.StandarJob).trigger('change');
                }

                if (result.NRPGL == null) {
                    //var nrpGl = $("#txt_Inspector").val();
                    //$("#txt_NRPGL").val(nrpGl).trigger('change');
                } else {
                    //$("#txt_NRPGL").val(result.NRPGL).trigger('change');
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
        //coba = "back";
       // console.log(newNoBacklog);

        //LoadTbl(newNoBacklog);
    }

    //var coba = "i";
    ////NoBacklog();
    //function NoBacklog(id) {
    //    coba = "yes";
    //}
    //console.log(coba);

    console.log($("#txt_NoBacklog").val());
    //function LoadTbl(id){*/
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
                        debugger;
                        var showBut = "";
                        if (document.getElementById('txt_backlogBCS').value == "true") {
                            showBut = `<div class="btn-group">
                        <button type="button" value="${row.ID}" onclick="editPart(this.value)" class="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="modal" data-target="#modal_editPart" id="btn_editpart" style="display:none;">
                        <i class="fa fa-pencil"></i>
                        </button>
                        <button type="button" value="${row.ID}" onclick="deletePart(this.value)" class="btn btn-sm btn-secondary" id="btn_deletepart" style="display:none;">
                        <i class="fa fa-times"></i>
                        </button>
                        </div>`;
                        }
                        else {
                            showBut = `<div class="btn-group">
                        <button type="button" value="${row.ID}" onclick="editPart(this.value)" class="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="modal" data-target="#modal_editPart" id="btn_editpart" style="display:block;">
                        <i class="fa fa-pencil"></i>
                        </button>
                        <button type="button" value="${row.ID}" onclick="deletePart(this.value)" class="btn btn-sm btn-secondary" id="btn_deletepart" style="display:block;">
                        <i class="fa fa-times"></i>
                        </button>
                        </div>`;
                        }

                        return showBut
                    }
                }
            ],
        });
    /*}*/

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
            { data: 'mnemonic' },
            { data: 'class' }
        ],
    });

    $('#modal_addPart').on('shown.bs.modal', function (e) {
        tableAddPart.ajax.url(webLink + "/api/RegisterBacklog/GetAddPart?search=&district=").load();
        $.fn.dataTable.tables({ visible: true, api: true }).columns.adjust();
    });

    function editPart(id) {
        console.log(id);
        $.ajax({
            url: $("#web_link").val() + "/api/RegisterBacklog/GetEditPart?id=" + id, //URI,
            type: "GET",
            cache: false,
            success: function (result) {
                //document.getElementById('edittxt_BacklogNo').value = result.Data.NoBackLog;
                //document.getElementById('edittxt_PartNo').value = result.Data.PartNo;
                if (result.Data.FigNo != ""
                ) {
                    document.getElementById('edittxt_FigNo').value = result.Data.FigNo;
                }
                if (result.Data.Qty != 0) {
                    document.getElementById('edittxt_Qty').value = result.Data.Qty;
                }
                if (result.Data.IndexNo != 0) {
                    document.getElementById('edittxt_IndexNo').value = result.Data.IndexNo;
                }
                if (result.Data.FigNo == "") {
                    document.getElementById('edittxt_FigNo').value = 0;
                }
                document.getElementById('btn_update').value = result.Data.NoBackLog + "," + result.Data.PartNo;
                //document.getElementById('btn_update').value = result.Data.NoBackLog + "," + result.Data.PartNo + "," + $("#edittxt_FigNo").val() + "," + $("#edittxt_Qty").val() + "," + $("#edittxt_IndexNo").val();
            }
        });
    };

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
            obj.Mnemonic = data.mnemonic;
            obj.PartClass = data.class;
            obj.FigNo = $('#txt_FigNo').val();
            obj.IndexNo = $('#txt_IndexNo').val();
            obj.Qty = $('#txt_Qty').val();
            obj.DSTRCT = $('#txt_labDistrict').val();

            console.log(obj);

            $.ajax({
                url: webLink + "/api/RegisterBacklog/Create_Backlog", //URI
                data: JSON.stringify(obj),
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    console.log($("#txt_NoBacklog").val())
                    var BL = $("#txt_NoBacklog").val();

                    if (data.Remarks == true) {
                        //$('#tblRecPart').DataTable().ajax.reload();
                        Swal.fire(
                            'Added!',
                            'Part has been Added.',
                            'success'
                        );
                        //var refresh = "/ReviewPAP/RegisterBacklog?labnumber=" + $("#txt_LabNumber").val();
                        //window.location.reload();
                        tabelRecPart.ajax.reload();
                        //tabelRecPart.clear().draw();
                        //tabelRecPart.destroy();
                        /*tabelRecPart.ajax.reload();*/
                        //$('#tblRecPart').DataTable().responsive.recalc();
                        //$('#tblRecPart').DataTable().ajax.reload();

                    }
                    if (data.Remarks == false) {
                        Swal.fire(
                            'Error!',
                            'Message : ' + data.Message,
                            'error'
                        );
                       tabelRecPart.ajax.reload();
                    }
                    //LoadTbl(BL);

                },
                error: function (xhr) {
                    alert(xhr.responseText);
                }
            })
            //tabelRecPart.ajax.reload();
            tabelRecPart.ajax.url(webLink + "/api/RegisterBacklog/GetPart?noBacklog=" + $("#txt_NoBacklog").val()).load();
            $('#txt_sPart').val("");
            $('#txt_FigNo').val("");
            $('#txt_IndexNo').val("");
            $('#txt_Qty').val("");

            //tabelAddPart.ajax.reload();


        })


        //debugger:
       // tabelRecPart.ajax.reload();
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
        })
    }


    function updatePart(param) {

        console.log(param);
        var x = new Array();
        x = param.split(",");
        var backlogno = x[0];
        var partno = x[1];
        var figno = $('#edittxt_FigNo').val();
        var qty = $('#edittxt_Qty').val();
        var indexno = $('#edittxt_IndexNo').val();

        $.ajax({
            url: webLink + "/api/RegisterBacklog/Update_Part?NoBacklog=" + backlogno + "&PartNo=" + partno + "&FigNo=" + figno + "&Qty=" + qty + "&IndexNo=" + indexno,
            //url: webLink + "/api/RegisterBacklog/Update_Part",
            //data: JSON.stringify(obj),
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.Remarks == true) {
                    Swal.fire(
                        'Added!',
                        'Update Part Backlog Success',
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

        var sts = true;

        $('#txt_PRDate').val();
        if ($('#txt_PRDate').val() == "") {
            $("#txt_PRDate").focus();
            sts = false;
            Swal.fire(
                'Required!',
                'Message : Plant Repair Date tidak boleh kosong !'
            );
        }

        if ($('#txt_HourE').val() == "") {
            $("#txt_HourE").focus();
            sts = false;
            Swal.fire(
                'Required!',
                'Message : Hour Estimate tidak boleh kosong !'
            );
        }

        if ($('#txt_NRPGL').val() == "") {
            $("#txt_NRPGL").focus();
            sts = false;
            Swal.fire(
                'Required!',
                'Message : NRP GL tidak boleh kosong !'
            );
        }

        if ($('#txt_InspectonDate').val() == "") {
            $("#txt_InspectonDate").focus();
            sts = false;
            Swal.fire(
                'Required!',
                'Message : Inspecton Date tidak boleh kosong !'
            );
        }
        //$('#txt_Inspector').val();
        //if ($('#txt_Inspector').val() == "") {
        //    $("#txt_Inspector").focus();
        //    sts = false;
        //    Swal.fire(
        //        'Required!',
        //        'Message : Inspector tidak boleh kosong !'
        //    );
        //}
        $('#txt_WorkGroup').val();
        if ($('#txt_WorkGroup').val() == "") {
            $("#txt_WorkGroup").focus();
            sts = false;
            Swal.fire(
                'Required!',
                'Message : Work Group tidak boleh kosong !'
            );
        }
        if ($('#txt_StandarJob').val() == "") {
            $("#txt_StandarJob").focus();
            sts = false;
            Swal.fire(
                'Required!',
                'Message : Standar Job tidak boleh kosong !'
            );
        }

        if ($('#txt_OriginatorID').val() == "") {
            $("#txt_OriginatorID").focus();
            sts = false;
            Swal.fire(
                'Required!',
                'Message : Originator ID tidak boleh kosong !'
            );
        }

        if ($('#txt_Manpower').val() == "") {
            $("#txt_Manpower").focus();
            sts = false;
            Swal.fire(
                'Required!',
                'Message : Man Power tidak boleh kosong !'
            );
        }
        //if ($('#txt_labDistrict').val() == "") {
        //    $("#txt_labDistrict").focus();
        //    sts = false;
        //    Swal.fire(
        //        'Required!',
        //        'Message : District tidak boleh kosong !'
        //    );
        //}

        if (sts == true) {
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
                    tabelRecPart.ajax.reload();
                },
                error: function (xhr) {
                    alert(xhr.responseText);
                }
            })
        }
    }

    function SaveBacklog() {
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

        var sts = true;

        $('#txt_PRDate').val();
        if ($('#txt_PRDate').val() == "") {
            $("#txt_PRDate").focus();
            sts = false;
            Swal.fire(
                'Required!',
                'Message : Plant Repair Date tidak boleh kosong !'
            );
        }

        if ($('#txt_HourE').val() == "") {
            $("#txt_HourE").focus();
            sts = false;
            Swal.fire(
                'Required!',
                'Message : Hour Estimate tidak boleh kosong !'
            );
        }

        if ($('#txt_NRPGL').val() == "") {
            $("#txt_NRPGL").focus();
            sts = false;
            Swal.fire(
                'Required!',
                'Message : NRP GL tidak boleh kosong !'
            );
        }

        if ($('#txt_InspectonDate').val() == "") {
            $("#txt_InspectonDate").focus();
            sts = false;
            Swal.fire(
                'Required!',
                'Message : Inspecton Date tidak boleh kosong !'
            );
        }

        $('#txt_WorkGroup').val();
        if ($('#txt_WorkGroup').val() == "") {
            $("#txt_WorkGroup").focus();
            sts = false;
            Swal.fire(
                'Required!',
                'Message : Work Group tidak boleh kosong !'
            );
        }
        if ($('#txt_StandarJob').val() == "") {
            $("#txt_StandarJob").focus();
            sts = false;
            Swal.fire(
                'Required!',
                'Message : Standar Job tidak boleh kosong !'
            );
        }

        if ($('#txt_OriginatorID').val() == "") {
            $("#txt_OriginatorID").focus();
            sts = false;
            Swal.fire(
                'Required!',
                'Message : Originator ID tidak boleh kosong !'
            );
        }

        if ($('#txt_Manpower').val() == "") {
            $("#txt_Manpower").focus();
            sts = false;
            Swal.fire(
                'Required!',
                'Message : Man Power tidak boleh kosong !'
            );
        }


        if (sts == true) {
            $.ajax({
                url: webLink + "/api/RegisterBacklog/Save_Backlog", //URI
                data: JSON.stringify(obj),
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.Remarks == true) {
                        Swal.fire(
                            'Saved!',
                            'Save Backlog Success',
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
                    tabelRecPart.ajax.reload();
                },
                error: function (xhr) {
                    alert(xhr.responseText);
                }
            })
        }
    }
