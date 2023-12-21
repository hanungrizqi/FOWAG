    var webLink = $("#web_link").val();
    addOilBrand();
    addOilBrand_Edit()


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

    var tableSent = $("#tblOilType").DataTable({
        ajax: {
            url: webLink + "/api/Oil/Get_OilType_All",
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
            { data: 'Id_Type' },
            { data: 'OilBrand' },
            { data: 'OilType' },
            {
                data: null,
                targets: 'no-sort', orderable: false,
                render: function (data, type, row) {
                    return `<div class="btn-group">
                        <button type="button" value="${row.Id_Type}" onclick="geteditOilType(this)" class="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="modal" data-target="#ModalEditOilType">
                        <i class="fa fa-pencil"></i>
                        </button>
                        <button type="button" value="${row.Id_Type}" onclick="deleteOilType(this)" class="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="tooltip" title="Delete">
                        <i class="fa fa-times"></i>
                        </button>
                        </div>`
                }
            }
        ],
    });

    function addOilType() {
        //var obj = new Object();
        //obj.oilType = $("#oilType").val();
        //obj.oilBrand = $("#txt_oilBrand").val();
        $.ajax({
            url: webLink + "/api/Oil/Create_OilType?oilType=" + $("#oilType").val() + "&oilBrand=" + $("#txt_oilBrand").val(), //URI
            /*data: JSON.stringify(obj),*/
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.Remarks == true) {
                    Swal.fire(
                        'Added!',
                        'Oil Type has been Added.',
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
        addOilBrand();
        $("#oilType").val('');
    }

    function geteditOilType(id) {
        var idType = id.value;
        $.ajax({
            url: webLink + "/api/Oil/Get_OilType_ByID?id=" + idType, //URI
            success: function (result) {
                console.log(result.Data.OilBrand);
                document.getElementById('editoilType').value = result.Data.OilType;
                document.getElementById('idUpdate_oilType').value = result.Data.Id_Type;
                $("#txt_oilBrandedit").val(result.Data.OilBrand).trigger('change');
            }
        })
    }

    function editOilType() {
        //var obj = new Object();
        //obj.OilType = $("#editoilType").val();
        var Id_Type = $("#idUpdate_oilType").val();
        $.ajax({
            url: webLink + "/api/Oil/Update_OilType?oilType=" + $("#editoilType").val() + "&oilBrand=" + $("#txt_oilBrandedit").val() + "&id=" + Id_Type, //URI
/*            data: JSON.stringify(obj),*/
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.Remarks == true) {
                    Swal.fire(
                        'Updated!',
                        'Oil Type has been Updated.',
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

    function deleteOilType(Id) {
        var idType = Id.value;
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
                    url: webLink + "/api/Oil/Delete_OilType?id=" + idType, //URI
                    type: "POST",
                    success: function (data) {
                        if (data.Remarks == true) {
                            Swal.fire(
                                'Deleted!',
                                'Oil Type has been Deleted.',
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