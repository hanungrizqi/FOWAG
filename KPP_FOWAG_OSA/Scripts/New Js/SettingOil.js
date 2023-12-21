    var webLink = $("#web_link").val();

    addOilBrand();
    addOilType();
    addOilBrand_Edit();
    addOilType_Edit();


    // Function Setting Oil Brand
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

    //function addOilType() {
    //    $.ajax({
    //        url: $("#web_link").val() + "/api/Oil/Get_DD_OilType", //URI,
    //        type: "GET",
    //        cache: false,
    //        success: function (result) {
    //            $('#txt_oilType').empty();
    //            text = '<option></option>';
    //            $.each(result.Data, function (key, val) {
    //                text += '<option value="' + val.OilType + '">' + val.OilType + '</option>';
    //            });
    //            $("#txt_oilType").append(text);
    //        }
    //    });
    //}

    function addOilBrand_Edit() {
        $.ajax({
            url: $("#web_link").val() + "/api/Oil/Get_OilBrand", //URI,
            type: "GET",
            cache: false,
            success: function (result) {
                $('#txt_oilBrandedit').empty();
                text = '<option></option>';
                $.each(result.Data, function (key, val) {
                    text += '<option value="' + val.OilBrand + '">' + val.OilBrand + '</option>';
                });
                $("#txt_oilBrandedit").append(text);
            }
        });
    }

    function addOilType_Edit(oilBrand) {
        console.log($('#txt_oilBrandedit').val());
        console.log(oilBrand);
        var oilB = "";
        if (oilBrand != "") {
            oilB = $('#txt_oilBrandedit').val();
        } else {
            oilB = oilBrand
        }

        $.ajax({
            url: $("#web_link").val() + "/api/Oil/Get_OilType?oilbrand=" + oilB, //URI,
            type: "GET",
            cache: false,
            success: function (result) {
                $('#txt_oilTypeedit').empty();
                text = '<option></option>';
                $.each(result.Data, function (key, val) {
                    text += '<option value="' + val.OilType + '">' + val.OilType + '</option>';
                });
                $("#txt_oilTypeedit").append(text);
            }
        });
    }

    //function addOilType_Edit() {
    //    $.ajax({
    //        url: $("#web_link").val() + "/api/Oil/Get_DD_OilType", //URI,
    //        type: "GET",
    //        cache: false,
    //        success: function (result) {
    //            $('#txt_oilTypeedit').empty();
    //            text = '<option></option>';
    //            $.each(result.Data, function (key, val) {
    //                text += '<option value="' + val.OilType + '">' + val.OilType + '</option>';
    //            });
    //            $("#txt_oilTypeedit").append(text);
    //        }
    //    });
    //}

    // Function Setting Oil Brand

    var tableSent = $("#tblOil").DataTable({
        ajax: {
            url: webLink + "/api/Oil/Get_OilSpec_All",
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
            { data: 'Id_Spec' },
            { data: 'OilBrand' },
            { data: 'OilType' },
            { data: 'OilSpec' },
            {
                data: null,
                targets: 'no-sort', orderable: false,
                render: function (data, type, row) {
                    return `<div class="btn-group">
                        <button type="button" value="${row.Id_Spec}" onclick="geteditOil(this)" class="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="modal" data-target="#ModalEditOil">
                        <i class="fa fa-pencil"></i>
                        </button>
                        <button type="button" value="${row.Id_Spec}" onclick="deleteOil(this)" class="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="tooltip" title="Delete">
                        <i class="fa fa-times"></i>
                        </button>
                        </div>`
                }
            }
        ],
    });

    function addOil() {
        var obj = new Object();
        obj.oilBrand = $("#txt_oilBrand").val();
        obj.oilType = $("#txt_oilType").val();
        obj.oilSpec = $("#oilSpec").val();
        $.ajax({
            url: webLink + "/api/Oil/Create_OilSpec?oilType=" + $("#txt_oilType").val() + "&oilBrand=" + $("#txt_oilBrand").val() + "&oilSpec=" + $("#oilSpec").val(), //URI
            /*data: JSON.stringify(obj),*/
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.Remarks == true) {
                    Swal.fire(
                        'Added!',
                        'Oil Brand has been Added.',
                        'success'
                    );
                    tableSent.ajax.reload();
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
        $("#oilBrand").val('');
        $("#oilSpec").val('');
        $("#oilType").val('');
        /*document.getElementById('oilBrand').value = null;*/

    }

    function geteditOil(Id) {
        var id = Id.value;
        console.log(id);
        $.ajax({
            url: webLink + "/api/Oil/Get_OilSpec_ByID?id=" + id, //URI
            success: function (result) {
                //document.getElementById('editoilBrand').value = result.Data.OilBrand;
                //document.getElementById('editoilType').value = result.Data.OilType;
                console.log(result.Data.OilBrand);
                console.log(result.Data.OilType);
                var oilB= result.Data.OilBrand;
                $("#txt_oilBrandedit").val(result.Data.OilBrand).trigger('change');
                $("#txt_oilTypeedit").val(result.Data.OilType).trigger('change');
                addOilType_Edit(oilB);
                
                document.getElementById('editType').value = result.Data.OilSpec;
                document.getElementById('editoilSpec').value = result.Data.OilSpec;
                document.getElementById('idUpdate_oil').value = result.Data.Id_Spec;
            }
        })
    }

    function editOil() {
        //var obj = new Object();
        //obj.OilBrand = $("#editoilBrand").val();
        //obj.OilType = $("#editoilType").val();
        //obj.OilSpec = $("#editoilSpec").val();
        Id = $("#idUpdate_oil").val();
        $.ajax({
            url: webLink + "/api/Oil/Update_OilSpec?oilType=" + $("#txt_oilTypeedit").val() + "&oilBrand=" + $("#txt_oilBrandedit").val() + "&oilSpec=" + $("#editoilSpec").val() + "&id=" + Id, //URI
/*            data: JSON.stringify(obj),*/
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.Remarks == true) {
                    Swal.fire(
                        'Updated!',
                        'Oil Brand has been Updated.',
                        'success'
                    );
                    tableSent.ajax.reload();
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

    function deleteOil(Id) {
        var id = Id.value;
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
                    url: webLink + "/api/Oil/Delete_OilSpec?id=" + id, //URI
                    type: "POST",
                    success: function (data) {
                        if (data.Remarks == true) {
                            Swal.fire(
                                'Deleted!',
                                'Oil Brand has been Deleted.',
                                'success'
                            );
                            tableSent.ajax.reload();
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