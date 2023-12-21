
    jQuery(function () {Codebase.helpers(['select2']); });
    var webLink = $("#web_link").val();

    var table;
    AddDistrict();
    AddUnitModel();
    AddUnitNo();
    AddComp();




    function AddDistrict() {
        $.ajax({
            url: $("#web_link").val() + "/api/WorkGroup/Get_District", //URI,
            type: "GET",
            cache: false,
            success: function (result) {
                $('#filter_distrik').empty();
                text = '<option></option>';
                $.each(result.Data, function (key, val) {
                    console.log(val.dstrct_code);
                    text += '<option value="' + val.dstrct_code + '">' + val.dstrct_code + '</option>';
                });
                $("#filter_distrik").append(text);
                //inputNRP();
            }
        });
    }

    function AddUnitModel() {
        $.ajax({
            url: $("#web_link").val() + "/api/RegisterBacklog/Get_UnitModel", //URI,
            type: "GET",
            cache: false,
            success: function (result) {
                $("#filter_unitmod").empty();
                text = '<option></option>';
                $.each(result.Data, function (key, val) {
                    text += '<option value="' + val.UnitModel + '">' + val.UnitModel + '</option>';
                });
                $("#filter_unitmod").append(text);
            }
        });
    }

    function AddUnitNo() {
        $.ajax({
            url: $("#web_link").val() + "/api/RegisterBacklog/Get_UnitNumber", //URI,
            type: "GET",
            cache: false,
            success: function (result) {
                $('#filter_unitnum').empty();
                text = '<option></option>';
                $.each(result.Data, function (key, val) {
                    console.log(val.dstrct_code);
                    text += '<option value="' + val.EQUIP_NO + '">' + val.EQUIP_NO + '</option>';
                });
                $("#filter_unitnum").append(text);
                //inputNRP();
            }
        });
    }

    function AddComp() {
        $.ajax({
            url: $("#web_link").val() + "/api/RegisterBacklog/Get_CompCode", //URI,
            type: "GET",
            cache: false,
            success: function (result) {
                $('#filter_component').empty();
                text = '<option></option>';
                $.each(result.Data, function (key, val) {
                    text += '<option value="' + val.Type + '">' + val.Type + '</option>';
                });
                $("#filter_component").append(text);
            }
        });
    }

    //addLab();


    //console.log($("#txtLAB").val());
    //if ($("#txtLAB").val() == "0") {
        //    Lab_change();
        //}


        function Lab_change() {
            if ($("#txtLAB").val() == "0") {
                $("#tblReviewPAP").DataTable({
                    "bDestroy": true,
                    scrollX: true,
                    dom: 'f<t>p'
                });
            }
            else if ($("#txtLAB").val() == "1") {
                var param = $("#txtLAB").val();
                loadData(param);
                //document.getElementById('filter_dstrct').style.display = "block";
                ////document.getElementById('filter_number').style.display = "block";
                //document.getElementById('filter_model').style.display = "block";
                //document.getElementById('filter_comp').style.display = "block";
                //document.getElementById('btn_search').style.display = "block";
            }
            else if ($("#txtLAB").val() == "2") {
                var param = $("#txtLAB").val();
                loadData(param);
                //document.getElementById('filter_dstrct').style.display = "block";
                ////document.getElementById('filter_number').style.display = "block";
                //document.getElementById('filter_model').style.display = "block";
                //document.getElementById('filter_comp').style.display = "block";
                //document.getElementById('btn_search').style.display = "block";
            }
            else if ($("#txtLAB").val() == "3") {
                var param = $("#txtLAB").val();
                //loadDataOSA(param);
                loadData(param);
                //document.getElementById('filter_dstrct').style.display = "block";
                ////document.getElementById('filter_number').style.display = "block";
                //document.getElementById('filter_model').style.display = "block";
                //document.getElementById('filter_comp').style.display = "block";
                //document.getElementById('btn_search').style.display = "block";
            }
        }

    function Clean() {
        console.log("clean");
    debugger;
    //$("#filter_distrik").val("");
    //$("#filter_distrik").select2("val", "");
    $("#filter_distrik").val(null).trigger("change");
    //console.log($("#filter_distrik").val());
    //$("#filter_unitmod").val("");
    $("#filter_unitmod").val(null).trigger("change");
    //$("#filter_component").val("");
    $("#filter_component").val(null).trigger("change");
    //$("#txtLAB").val("");
    $("#txtLAB").val(null).trigger("change");
    //$("#filter_unitnum").val("");
    $("#filter_unitnum").val(null).trigger("change");
    }

    function Find() {
        console.log($("#filter_distrik").val());
    console.log($("#filter_unitmod").val());
    console.log($("#filter_component").val());
    var distrik = $("#filter_distrik").val();
    var unitmod = $("#filter_unitmod").val();
    var comp = $("#filter_component").val();
    var lab = $("#txtLAB").val();
    var unitnumber = $("#filter_unitnum").val();

    loadData_Find(distrik, unitmod, comp, unitnumber, lab);
    }

    //$("document").ready(function () {
        //    $("#tblSampelDD_filter.dataTables_filter").append($("#txt_WG"));
        //})

        //loadData();

        //loadTable($("#txt_lab").value);
        //var selectElement = document.querySelector('#txt-lab');
        //var output = selectElement.options[selectElement.selectedIndex].value;

        //$("document").ready(function () {
        //    $("#tblReviewPAP_filter.dataTables_filter").append($("#txt_lab"));
        //})

        //function loadTable(lab) {
        //    debugger;
        //    if ($("#txt_lab").value != "0") {
        //        loadData(output);
        //    }
        //}

        //function addLab() {
        //    $.ajax({
        //        url: webLink + "/api/RegisterBackLog/Get_Lab", //URI,
        //        type: "GET",
        //        cache: false,
        //        success: function (result) {
        //            $('#txt_lab').empty();
        //            text = '<option value="0">Pilih Jenis Lab</option>';
        //            $.each(result.Data, function (key, val) {
        //                text += '<option value="' + val.Id + '">' + val.Lab + '</option>';
        //            });
        //            $("#txt_lab").append(text);
        //        }
        //    });
        //}

        function loadData(param) {

            table = $("#tblReviewPAP").DataTable({
                ajax: {
                    url: webLink + "/api/RegisterBacklog/GetReviewPAP?Lab=" + param,
                    dataSrc: "Data",
                },
                //ajax :{
                //    url: $("#web_link").val() + "/api/RegisterBacklog/GetLastNoBacklog?id=" + getMonth + new Date().getFullYear() + distrik, //URI
                //    dataSrc: "DataBacklog",
                //},
                "bDestroy": true,
                order: [[3, 'desc']],
                scrollX: true,
                dom: 'fl<t>p',
                columnDefs: [
                    { className: "text-center", "targets": [0] }
                ],
                columns: [
                    //{
                    //    "data": null,
                    //    render: function (data, type, row, meta) {
                    //        return meta.row + meta.settings._iDisplayStart + 1;
                    //    }
                    //},
                    { data: 'Lab' },
                    { data: 'LabNumber' },
                    { data: 'DSTRCT' },
                    { data: 'UnitModel' },
                    { data: 'UnitNumber' },
                    { data: 'ComponentCode' },
                    { data: 'UnitHM' },
                    { data: 'OilHM' },
                    { data: 'OilChanged' },
                    { data: 'oilbrand' },
                    { data: 'oiltype' },
                    { data: 'SamplingDate' },
                    { data: 'ReceivedDate' },
                    {
                        data: null,
                        targets: 'no-sort', orderable: false,
                        render: function (data, type, row) {
                            //console.log(row.Condition)

                            var showCon = "";
                            if (row.Lab == "Technomics" && row.Condition == "0") {
                                //console.log("masuk")
                                showCon = "Normal";
                            } else if (row.Lab == "Technomics" && row.Condition == "1") {
                                console.log("masuk")
                                showCon = "Caution";
                            }
                            else if (row.Lab == "Technomics" && row.Condition == "2") {
                                console.log("masuk")
                                showCon = "Critical";
                            } else {
                                showCon = row.Condition;
                            }
                            return showCon;
                        }
                    },
                    { data: 'pb' },
                    { data: 'fe' },
                    { data: 'al' },
                    { data: 'cu' },
                    { data: 'cr' },
                    { data: 'sn' },
                    { data: 'Ni' },
                    { data: 'si' },
                    { data: 'na' },
                    { data: 'mg' },
                    { data: 'zn' },
                    { data: 'Mo' },
                    { data: 'Ca' },
                    { data: 'P' },
                    { data: 'B' },
                    { data: 'tbn' },
                    { data: 'tan' },
                    { data: 'soot' },
                    { data: 'Glycol' },
                    { data: 'visc' },
                    { data: 'Comment' },
                    { data: 'NoBacklog' },
                    {
                        data: null,
                        targets: 'no-sort', orderable: false,
                        render: function (data, type, row) {
                            //console.log(row.Condition)

                            var showStatus = "";
                            if (row.Lab == "Petrolab" && row.Condition == "Urgent") {
                                //console.log("masuk")
                                showStatus = `<a href="/ReviewPAP/RegisterBacklog?labnumber=${row.LabNumber}">Open</a>`;
                            } else if (row.Lab == "Technomics" && row.Condition == "2") {
                                console.log("masuk")
                                showStatus = `<a href="/ReviewPAP/RegisterBacklog?labnumber=${row.LabNumber}">Open</a>`;
                            }
                            else if (row.Lab == "OSA PAMA" && (row.Condition == "PROBLEM" || row.Condition == "CRITICAL")) {
                                //console.log("masuk")
                                showStatus = `<a href="/ReviewPAP/RegisterBacklog?labnumber=${row.LabNumber}">Open</a>`;
                            }
                            return showStatus;
                        }
                    }
                ],

            });
        }

    function loadDataOSA(param) {

        table = $("#tblReviewPAP").DataTable({
            ajax: {
                url: webLink + "/api/RegisterBacklog/GetReviewPAP_OSA?Lab=" + param,
                dataSrc: "Data",
            },
            "bDestroy": true,
            order: [[3, 'desc']],
            scrollX: true,
            dom: 'fl<t>p',
            columnDefs: [
                { className: "text-center", "targets": [0] }
            ],
            columns: [
                //{
                //    "data": null,
                //    render: function (data, type, row, meta) {
                //        return meta.row + meta.settings._iDisplayStart + 1;
                //    }
                //},
                {
                    data: null,
                    targets: 'no-sort', orderable: false,
                    render: function (data, type, row) {

                        var labname = "OSA";
                        return labname;
                    }
                },
                { data: 'LabNumber' },
                { data: 'District' },
                { data: 'UnitModel' },
                { data: 'UnitNumber' },
                { data: 'Component' },
                { data: 'UnitHM' },
                { data: 'OilHM' },
                { data: 'OilChanged' },
                { data: 'OilBrand' },
                { data: 'OilType' },
                { data: 'SamplingDate' },
                { data: 'ReceivedDate' },
                { data: 'Condition' },
                { data: 'Pb' },
                { data: 'Fe' },
                { data: 'Al' },
                { data: 'Cu' },
                { data: 'Cr' },
                { data: 'Sn' },
                { data: 'Ni' },
                { data: 'Si' },
                { data: 'Na' },
                { data: 'Mg' },
                { data: 'Zn' },
                {
                    data: null,
                    targets: 'no-sort', orderable: false,
                    render: function (data, type, row) {
                        {
                            var Mo = "";
                            return Mo;
                        }
                    }
                },
                {
                    data: null,
                    targets: 'no-sort', orderable: false,
                    render: function (data, type, row) {
                        {
                            var Ca = "";
                            return Ca;
                        }
                    }
                },
                {
                    data: null,
                    targets: 'no-sort', orderable: false,
                    render: function (data, type, row) {
                        {
                            var P = "";
                            return P;
                        }
                    }
                },
                {
                    data: null,
                    targets: 'no-sort', orderable: false,
                    render: function (data, type, row) {
                        {
                            var B = "";
                            return B;
                        }
                    }
                },
                { data: 'TBN' },
                { data: 'TAN' },
                { data: 'Soot' },
                { data: 'Glycol' },
                { data: 'Visc' },
                { data: 'Comment' },
                { data: 'Visc' },
                {
                    data: null,
                    targets: 'no-sort', orderable: false,
                    render: function (data, type, row) {
                        {
                            //console.log(row.Condition)

                            var showStatus = "";
                            if (row.Condition == "PROBLEM" || row.Condition == "CRITICAL") {
                                //console.log("masuk")
                                showStatus = `<a href="/ReviewPAP/RegisterBacklog?labnumber=${row.LabNumber}">Open</a>`;
                            }
                            return showStatus;
                        }
                    }
                }
            ],

        });
    }

    function loadData_Find(distrik, unitmodel, comp, unitnumber, lab) {
        $body = $("body");

    $(document).on({
        ajaxStart: function () {$body.addClass("loading"); },
    ajaxStop: function () {$body.removeClass("loading"); }
        });
    console.log(distrik);

    table = $("#tblReviewPAP").DataTable({
        ajax: {
        url: webLink + "/api/RegisterBacklog/GetReviewPAP_Filter?distrik=" + distrik + "&unitmodel=" + unitmodel + "&comp=" + comp + "&unitnumber=" + unitnumber + "&lab=" + lab,
    dataSrc: "Data",
            },
    "bDestroy": true,
    order: [[3, 'desc']],
    scrollX: true,
    dom: 'fl<t>p',
        columnDefs: [
        {className: "text-center", "targets": [0] }
        ],
        columns: [
                //{
            //    "data": null,
            //    render: function (data, type, row, meta) {
            //        return meta.row + meta.settings._iDisplayStart + 1;
            //    }
            //},
            { data: 'Lab' },
            { data: 'LabNumber' },
            { data: 'DSTRCT' },
            { data: 'UnitModel' },
            { data: 'UnitNumber' },
            { data: 'ComponentCode' },
            { data: 'UnitHM' },
            { data: 'OilHM' },
            { data: 'OilChanged' },
            { data: 'oilbrand' },
            { data: 'oiltype' },
            { data: 'SamplingDate' },
            { data: 'ReceivedDate' },
            {
                data: null,
                targets: 'no-sort', orderable: false,
                render: function (data, type, row) {
                    //console.log(row.Condition)

                    var showCon = "";
                    if (row.Lab == "Technomics" && row.Condition == "0") {
                        //console.log("masuk")
                        showCon = "Normal";
                    } else if (row.Lab == "Technomics" && row.Condition == "1") {
                        console.log("masuk")
                        showCon = "Caution";
                    }
                    else if (row.Lab == "Technomics" && row.Condition == "2") {
                        console.log("masuk")
                        showCon = "Critical";
                    } else {
                        showCon = row.Condition;
                    }
                    return showCon;
                }
            },
            { data: 'pb' },
            { data: 'fe' },
            { data: 'al' },
            { data: 'cu' },
            { data: 'cr' },
            { data: 'sn' },
            { data: 'Ni' },
            { data: 'si' },
            { data: 'na' },
            { data: 'mg' },
            { data: 'zn' },
            { data: 'Mo' },
            { data: 'Ca' },
            { data: 'P' },
            { data: 'B' },
            { data: 'tbn' },
            { data: 'tan' },
            { data: 'soot' },
            { data: 'Glycol' },
            { data: 'visc' },
            { data: 'Comment' },
            { data: 'NoBacklog' },
            {
                data: null,
                targets: 'no-sort', orderable: false,
                render: function (data, type, row) {
                    //console.log(row.Condition)

                    var showStatus = "";
                    if (row.Lab == "Petrolab" && row.Condition == "Urgent") {
                        //console.log("masuk")
                        showStatus = `<a href="/ReviewPAP/RegisterBacklog?labnumber=${row.LabNumber}">Open</a>`;
                    } else if (row.Lab == "Technomics" && row.Condition == "2") {
                        console.log("masuk")
                        showStatus = `<a href="/ReviewPAP/RegisterBacklog?labnumber=${row.LabNumber}">Open</a>`;
                    }
                    else if (row.Lab == "OSA PAMA" && (row.Condition == "PROBLEM" || row.Condition == "CRITICAL")) {
                        //console.log("masuk")
                        showStatus = `<a href="/ReviewPAP/RegisterBacklog?labnumber=${row.LabNumber}">Open</a>`;
                    }
                    return showStatus;
                }
            }
            ],

        });
    }


    //function changeLab(lab) {
    //    tableSent.columns(1).search(lab).draw();
    //}

    //function changeDSTRCT(wg) {
    //    tableSent.columns(1).search(distrik).draw();
    //}

    //function changeUNITMOD(uMod) {
    //    tableSent.columns(1).search(unitmodel).draw();
    //}

    //function changeUNITNO(uNo) {
    //    tableSent.columns(1).search(unitno).draw();
    //}

    //function changeCOMP(comp) {
    //    tableSent.columns(1).search(comp).draw();
    //}
