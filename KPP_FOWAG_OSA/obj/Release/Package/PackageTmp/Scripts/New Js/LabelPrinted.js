jQuery(function () { Codebase.helpers(['select2']); });
//console.log($("#txt_labDistrict").val());
addNRP();
addOilBrand();
addOilType();
addOilSpec();
geteditLabelForm();
console.log($("#txt_labDistrict").val());
showUpdateButton($("#role").val());

function showUpdateButton(role) {
    console.log(role);
    if (role == "5") {
        var btn = document.getElementById('btn-update');
        btn.style.display = "block";
    }
}

function geteditLabelForm() {
    $.ajax({
        url: $("#web_link").val() + "/api/SampleDueDate/Get_Review_ByID?labnum=" + $("#hid_labnum").val(), //URI
        success: function (result) {

            document.getElementById('txt_labNumber').value = $("#hid_labnum").val();
            document.getElementById('txt_WONumber').value = result.Data.NoWO;
            document.getElementById('txt_labDistrict').value = result.Data.District;
            document.getElementById('txt_unitModel').value = result.Data.UnitModel;
            document.getElementById('txt_unitNumber').value = result.Data.UnitNumber;
            document.getElementById('txt_unitHM').value = result.Data.UnitHM;
            document.getElementById('txt_manufacture').value = result.Data.Manufacture;
            if (result.Data.ComponentCode != null && result.Data.Component != null) {
                document.getElementById('txt_component').value = result.Data.ComponentCode + "-" + result.Data.Component;
            } else if (result.Data.ComponentCode != null && result.Data.Component == null) {
                document.getElementById('txt_component').value = result.Data.ComponentCode;
            } else if (result.Data.ComponentCode == null && result.Data.Component == null) {
                document.getElementById('txt_component').value = "";
            } else if (result.Data.Component != null) {
                document.getElementById('txt_component').value = result.Data.Component;
            }
            if (result.Data.SamplingDate != null) {
                const tanggal = moment(result.Data.SamplingDate).format("YYYY-MM-DD");
                document.getElementById('txt_samplingDate').value = tanggal;
            }
            /*document.getElementById('txt_oilBrand').value = result.Data.OilBrand;*/
            if (result.Data.OilBrand != null) {
                $("#txt_oilBrand").val(result.Data.OilBrand).trigger('change');
            }
            if (result.Data.OilType != null) {
                $("#txt_oilType").val(result.Data.OilType).trigger('change');
            }
            //document.getElementById('txt_oilSpec').value = result.Data.OilSpec;
            if (result.Data.OilSpec != null) {
                $("#txt_oilSpec").val(result.Data.OilSpec).trigger('change');
            }
            if (result.Data.NRP != null) {
                console.log(result.Data.NRP);
                //$("#txt_nrp").val(result.Data.NRP).trigger('change');
                document.getElementById('txt_nrp').value = result.Data.NRP;
                document.getElementById('txt_pic').value = result.Data.PIC;
            } if (result.Data.OilChanged != null) {
                $("#txt_oilChanges").val(result.Data.OilChanged).trigger('change');
            } if (result.Data.TypeOilHM != null) {
                $("#txt_oilhmkm").val(result.Data.TypeOilHM).trigger('change');
                $("#txt_hmkm").val(result.Data.TypeOilHM).trigger('change');
            }

            document.getElementById('txt_oilHM').value = result.Data.OilHM;
            getPrinter(result.Data.District);
            //$.ajax({
            //    url: $("#web_link").val() + "/api/SampleDueDate/Get_UnitHM", //URI
            //    success: function (data) {
            //        if (data == null) {
            //            document.getElementById('unitHMOilChanged').value = 0;
            //            setOilHM(result.Data.UnitHM);
            //        } else {

            //            $('#unitHMOilChanged').val(data.UnitHM);
            //            setOilHM(result.Data.UnitHM);
            //        }
            //    }
            //})

        }
    })
}

function saveLabelForm() {
    //var obj = new Object();
    //obj.LabNumber = $("#txt_labNumber").val();
    //obj.NoWO = $("#txt_WONumber").val();
    //obj.District = $("#txt_labDistrict").val();
    //obj.UnitModel = $("#txt_unitModel").val();
    //obj.UnitNumber = $("#txt_unitNumber").val();
    //obj.UnitHM = $("#txt_unitHM").val();
    //obj.Manufacture = $("#txt_manufacture").val();
    //obj.Component = $("#txt_component").val();
    //obj.SamplingDate = $("#txt_samplingDate").val();
    //obj.OilBrand = $("#txt_oilBrand").val();
    //obj.OilType = $("#txt_oilType").val();
    //obj.OilSpec = $("#txt_oilSpec").val();
    //obj.OilHM = $("#txt_oilHM").val();
    //obj.NRP = $("#txt_nrp").val();
    //obj.PIC = $("#txt_pic").val();
    //obj.OilChanged = $("#txt_oilChanges").val();
    //obj.TypeOilHM = $("#txt_oilhmkm").val();
    //obj.CreatedBy = $("#hd_nrp").val();

    /*console.log($("#txt_oilChanges").val());*/
    $.ajax({
        url: $("#web_link").val() + "/api/SampleDueDate/UpdateSts_SampleDueDate?labnumber=" + $("#hid_labnum").val(), //URI
        //data: JSON.stringify(obj),
        dataType: "json",
        type: "POST",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.Remarks == true) {
                Swal.fire(
                    'On Lab!',
                    'Data has been Received on Lab.',
                    'success'
                );
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

function printLabel() {
    debugger;

    var obj = new Object();
    obj.LabNumber = $("#txt_labNumber").val();
    obj.NoWO = $("#txt_WONumber").val();
    obj.District = $("#txt_labDistrict").val();
    obj.UnitModel = $("#txt_unitModel").val();
    obj.UnitNumber = $("#txt_unitNumber").val();
    obj.UnitHM = $("#txt_unitHM").val();
    obj.Manufacture = $("#txt_manufacture").val();
    obj.Component = $("#txt_component").val();
    obj.SamplingDate = $("#txt_samplingDate").val();
    obj.OilBrand = $("#txt_oilBrand").val();
    obj.OilType = $("#txt_oilType").val();
    obj.OilSpec = $("#txt_oilSpec").val();
    obj.OilHM = $("#txt_oilHM").val();
    obj.NRP = $("#txt_nrp").val();
    obj.PIC = $("#txt_pic").val();
    obj.OilChanged = $("#txt_oilChanges").val();
    obj.TypeOilHM = $("#txt_oilhmkm").val();
    obj.CreatedBy = $("#hd_nrp").val();

    var sts = true;

    if ($("#txt_unitHM").val() == "") {
        $("#txt_unitHM").focus();
        sts = false;
        Swal.fire(
            'Required!',
            'Message : Unit HM tidak boleh kosong !'
        );
    }

    if ($("#txt_samplingDate").val() == "") {
        $("#txt_samplingDate").focus();
        sts = false;
        Swal.fire(
            'Required!',
            'Message : Sampling Date tidak boleh kosong !'
        );
    }
    debugger;
    if ($("#txt_oilBrand").val() == "") {
        $("#txt_oilBrand").focus();
        sts = false;
        Swal.fire(
            'Required!',
            'Message : Oil Brand tidak boleh kosong !'
        );
    }
    if ($("#txt_oilType").val() == "") {
        $("#txt_oilType").focus();
        sts = false;
        Swal.fire(
            'Required!',
            'Message : Oil Type tidak boleh kosong !'
        );
    }
    if ($("#txt_oilSpec").val() == "") {
        $("#txt_oilSpec").focus();
        sts = false;
        Swal.fire(
            'Required!',
            'Message : Oil Spec tidak boleh kosong !'
        );
    }
    //if ($("#txt_oilHM").val() == "") {
    //    $("#txt_oilHM").focus();
    //    sts = false;
    //    Swal.fire(
    //        'Required!',
    //        'Message : Oil HM tidak boleh kosong !'
    //    );
    //}
    if ($("#txt_nrp").val() == "") {
        $("#txt_nrp").focus();
        sts = false;
        Swal.fire(
            'Required!',
            'Message : NRP tidak boleh kosong !'
        );
    }
    //if ($("#txt_pic").val() == "") {
    //    $("#txt_unitHM").focus();
    //    sts = false;
    //    Swal.fire(
    //        'Required!',
    //        'Message : Unit HM tidak boleh kosong !'
    //    );
    //}
    if ($("#txt_oilChanges").val() == "") {
        $("#txt_oilChanges").focus();
        sts = false;
        Swal.fire(
            'Required!',
            'Message : Oil Changes tidak boleh kosong !'
        );
    }
    //if ($("#txt_oilhmkm").val() == "") {
    //    $("#txt_oilhmkm").focus();
    //    sts = false;
    //    Swal.fire(
    //        'Required!',
    //        'Message : Oil HM tidak boleh kosong !'
    //    );
    //}

    if (sts == true) {
        $.ajax({
            url: $("#web_link").val() + "/api/SampleDueDate/Print_Sample?labNumber=" + $("#txt_labNumber").val() + "&printer=" + $("#txt_printer").val(), //URI
            type: "POST",
            success: function (data) {
                if (data.Remarks == true) {
                    Swal.fire(
                        'Printed!',
                        'Labels in queue',
                        'success'
                    );
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
}

function addNRP() {
    $.ajax({
        url: $("#web_link").val() + "/api/User/Get_UserPlant", //URI,
        type: "GET",
        cache: false,
        success: function (result) {
            $('#txt_nrp').empty();
            text = '<option></option>';
            console.log(result.Data);
            $.each(result.Data, function (key, val) {
                text += '<option value="' + val.EMPLOYEE_ID + '">' + val.EMPLOYEE_ID + ' - ' + val.NAME + '</option>';
            });
            $("#txt_nrp").append(text);
        }
    });
}

function addOilBrand() {
    $.ajax({
        url: $("#web_link").val() + "/api/Oil/Get_OilBrand", //URI,
        type: "GET",
        cache: false,
        success: function (result) {
            $('#txt_oilBrand').empty();
            text = '<option></option>';
            $.each(result.Data, function (key, val) {
                text += '<option value="' + val.OilBrand + '">' + val.OilBrand + '</option>';
            });
            $("#txt_oilBrand").append(text);
        }
    });
}

function addOilType(oilBrand) {
    console.log($('#txt_oilBrand').val());
    $.ajax({
        url: $("#web_link").val() + "/api/Oil/Get_OilType?oilbrand=" + oilBrand, //URI,
        type: "GET",
        cache: false,
        success: function (result) {
            //$('#txt_oilType').empty();
            text = '<option></option>';
            $.each(result.Data, function (key, val) {
                text += '<option value="' + val.OilType + '">' + val.OilType + '</option>';
            });
            //$("#txt_oilType").append(text);
        }
    });
}

function getPrinter(distrik) {
    $.ajax({
        url: $("#web_link").val() + "/api/SampleDueDate/Get_Printer?district=" + distrik, //URI,
        type: "GET",
        cache: false,
        success: function (result) {
            $('#txt_printer').empty();
            text = '<option></option>';
            $.each(result.Data, function (key, val) {
                text += '<option value="' + val.PRINTER_NAME + '">' + val.PRINTER_NAME + '</option>';
            });
            $("#txt_printer").append(text);
        }
    });
}


function addOilSpec(oiltype) {
    console.log($('#txt_oilType').val());
    $.ajax({
        url: $("#web_link").val() + "/api/Oil/Get_OilSpec?oiltype=" + oiltype, //URI,
        type: "GET",
        cache: false,
        success: function (result) {
            //$('#txt_oilSpec').empty();
            text = '<option></option>';
            $.each(result.Data, function (key, val) {
                text += '<option value="' + val.OilSpec + '">' + val.OilSpec + '</option>';
            });
            //$("#txt_oilSpec").append(text);
        }
    });
}

function getPIC() {
    $.ajax({
        url: $("#web_link").val() + "/api/User/Get_UserPlantById?nrp=" + $("#txt_nrp").val(), //URI
        success: function (result) {
            document.getElementById('txt_pic').value = result.Data[0].NAME;
        }
    })
}