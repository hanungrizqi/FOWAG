    jQuery(function () { Codebase.helpers(['select2']); });
    var comp = "";
    addNRP();
    AddCompcode(comp);
    addOilBrand();
    //addOilType();
    //addOilSpec();
    geteditLabelForm();

    $("#qrPreview").hide();
    var qrcode = new QRCode(document.getElementById("qrcode"), {
        width: 100,
        height: 100
    });
    function createQR() {
        var elText = document.getElementById("txt_qr");

        if (!elText.value) {
            alert("Input a text");
            elText.focus();
            return;
        }

        qrcode.makeCode(elText.value);
    }




    function geteditLabelForm() {
        $.ajax({
            url: $("#web_link").val() + "/api/SampleDueDate/Get_SampleDueDateUN_ByID?wo=" + $("#IDWO").val() + '&dstrct=' + $("#District_HD").val(), //URI
            success: function (result) {
                //document.getElementById('txt_status').value = result.Data.Status;
                //$("#paragraf1").text(result.Data.Status);

                if (result.Data.LabNumber == null) {
                    $.ajax({
                        url: $("#web_link").val() + "/api/SampleDueDate/Get_LastLabNumber?id=" + result.Data.DSTRCT + new Date().getFullYear(), //URI
                        success: function (data) {
                            var newLabNo = "";
                            if (data == null) {
                                newLabNo = result.Data.DSTRCT + new Date().getFullYear() + "00001"
                            } else {
                                var labno = data;
                                var last5LabNo = labno.substr(labno.length - 5);
                                var newLastNo = parseInt(last5LabNo) + 1;
                                var ctxt = '' + newLastNo;
                                var textNo = last5LabNo.substr(0, last5LabNo.length - ctxt.length) + ctxt;
                                newLabNo = result.Data.DSTRCT + new Date().getFullYear() + textNo;
                            }
                            document.getElementById('txt_labNumber').value = newLabNo;
                        }
                    })
                } else {
                    document.getElementById('txt_labNumber').value = result.Data.LabNumber;
                }
                document.getElementById('txt_WONumber').value = result.Data.WO;
                document.getElementById('txt_labDistrict').value = result.Data.DSTRCT;
                getPrinter(result.Data.DSTRCT);
                document.getElementById('txt_unitModel').value = result.Data.UnitModel;
                AddCompcode(result.Data.UnitModel);
                document.getElementById('txt_unitNumber').value = result.Data.UnitNumber;
                //document.getElementById('txt_unitHM').value = result.Data.UnitHM;
                document.getElementById('txt_manufacture').value = result.Data.Manufacture;
                //if (result.Data.ComponentCode != null && result.Data.Component != null) {
                //    document.getElementById('txt_component').value = result.Data.ComponentCode + "-" + result.Data.Component;
                //} else if (result.Data.ComponentCode != null && result.Data.Component == null) {
                //    document.getElementById('txt_component').value = result.Data.ComponentCode;
                //} else if (result.Data.ComponentCode == null && result.Data.Component == null) {
                //    document.getElementById('txt_component').value = "";
                //}

                if (result.Data.SamplingDate != null) {
                    const tanggal = moment(result.Data.SamplingDate).format("YYYY-MM-DD");
                    document.getElementById('txt_samplingDate').value = tanggal;
                }
                //document.getElementById('txt_oilBrand').value = result.Data.OilBrand;
                //document.getElementById('txt_oilType').value = result.Data.OilType;
                //document.getElementById('txt_oilSpec').value = result.Data.OilSpec;
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

                /*document.getElementById('txt_oilHM').value = result.Data.OilHM;*/
                $.ajax({
                    url: $("#web_link").val() + "/api/SampleDueDate/Get_UnitHM", //URI
                    success: function (data) {
                        if (data == null) {
                            document.getElementById('unitHMOilChanged').value = 0;
                            setOilHM(result.Data.UnitHM);
                        } else {

                            $('#unitHMOilChanged').val(data.UnitHM);
                            setOilHM(result.Data.UnitHM);
                        }
                    }
                })

            }
        })
    }

    function saveLabelForm() {

        //debugger;
        //var compcode = "";
        //var compname = "";

        //var component = $("#txt_component").val();
        //if (component != "") {

        //    var spiltcom = component.split("-");
        //    compcode = splitcom[0];
        //    compname = splitcom[1];

        //}


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
                url: $("#web_link").val() + "/api/SampleDueDate/Create_SampleDueDate", //URI
                data: JSON.stringify(obj),
                dataType: "json",
                type: "POST",
                contentType: "application/json; charset=utf-8",
                success: function (data) {
                    if (data.Remarks == true) {
                        Swal.fire(
                            'Saved!',
                            'Data has been Saved.',
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
                console.log(result.Data);
                text = '<option></option>';
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

    function addOilType() {
        console.log($('#txt_oilBrand').val());
        $.ajax({
            url: $("#web_link").val() + "/api/Oil/Get_OilType?oilbrand=" + $('#txt_oilBrand').val(), //URI,
            type: "GET",
            cache: false,
            success: function (result) {
                $('#txt_oilType').empty();
                text = '<option></option>';
                $.each(result.Data, function (key, val) {
                    text += '<option value="' + val.OilType + '">' + val.OilType + '</option>';
                });
                $("#txt_oilType").append(text);
            }
        });
    }


    function addOilSpec(oiltype) {
        console.log($('#txt_oilType').val());
        $.ajax({
            url: $("#web_link").val() + "/api/Oil/Get_OilSpec?oiltype=" + $('#txt_oilType').val(), //URI,
            type: "GET",
            cache: false,
            success: function (result) {
                $('#txt_oilSpec').empty();
                text = '<option></option>';
                $.each(result.Data, function (key, val) {
                    text += '<option value="' + val.OilSpec + '">' + val.OilSpec + '</option>';
                });
                $("#txt_oilSpec").append(text);
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

    $('#txt_unitHM').on('change keyup', function () {
        setOilHM(this.value);
    });

    function setOilHM(valHM) {
        if ($('#unitHMOilChanged').val() == 0) {
            $('#txt_oilHM').val(valHM);
        }
        else {
            var OilHM = parseInt(valHM) - parseInt($('#unitHMOilChanged').val());
            $('#txt_oilHM').val(OilHM);
        }
    }

    function printLabel() {
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
                url: $("#web_link").val() + "/api/SampleDueDate/Print_Sample?labNumber=" + $("#txt_labNumber").val() + "&printer=" + $("#txt_printer").val(),
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

    function AddCompcode(id) {
        console.log(id);
        $.ajax({
            url: $("#web_link").val() + "/api/SampleDueDate/Get_CompCode?unitmodel=" + id, //URI,
            type: "GET",
            cache: false,
            success: function (result) {
                $('#txt_component').empty();
                console.log(result.Data);
                text = '<option></option>';
                $.each(result.Data, function (key, val) {
                    text += '<option value="' + val.Component + '">' + val.Component + '</option>';
                });
                $("#txt_component").append(text);
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