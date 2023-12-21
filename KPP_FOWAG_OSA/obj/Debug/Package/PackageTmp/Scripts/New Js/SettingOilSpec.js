    var webLink = $("#web_link").val();


    // Function Setting Oil Brand

    var tableSent = $("#tblOilSpec").DataTable({
        ajax: {
            url: webLink + "/api/Oil/Get_OilSpec",
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
            { data: 'Id' },
            { data: 'OilSpec' },
            {
                data: null,
                targets: 'no-sort', orderable: false,
                render: function (data, type, row) {
                    return `<div class="btn-group">
                        <button type="button" value="${row.Id}" onclick="geteditOilSpec(this)" class="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="modal" data-target="#ModalEditOilSpec">
                        <i class="fa fa-pencil"></i>
                        </button>
                        <button type="button" value="${row.Id}" onclick="deleteOilSpec(this)" class="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="tooltip" title="Delete">
                        <i class="fa fa-times"></i>
                        </button>
                        </div>`
                }
            }
        ],
    });

    function addOilSpec() {
        var obj = new Object();
        obj.oilSpec = $("#oilSpec").val();
        $.ajax({
            url: webLink + "/api/Oil/Create_OilSpec", //URI
            data: JSON.stringify(obj),
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.Remarks == true) {
                    Swal.fire(
                        'Added!',
                        'Oil Spec has been Added.',
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

    function geteditOilSpec(id) {
        var idSpec = id.value;
        $.ajax({
            url: webLink + "/api/Oil/Get_OilSpec_ByID?id=" + idSpec, //URI
            success: function (result) {
                document.getElementById('editoilSpec').value = result.Data.OilSpec;
                document.getElementById('idUpdate_oilSpec').value = result.Data.Id;
            }
        })
    }

    function editOilSpec() {
        var obj = new Object();
        obj.OilSpec = $("#editoilSpec").val();
        obj.Id = $("#idUpdate_oilSpec").val();
        $.ajax({
            url: webLink + "/api/Oil/Update_OilSpec", //URI
            data: JSON.stringify(obj),
            dataType: "json",
            type: "POST",
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data.Remarks == true) {
                    Swal.fire(
                        'Updated!',
                        'Oil Spec has been Updated.',
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

    function deleteOilSpec(Id) {
        var idSpec = Id.value;
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
                    url: webLink + "/api/Oil/Delete_OilSpec?id=" + idSpec, //URI
                    type: "POST",
                    success: function (data) {
                        if (data.Remarks == true) {
                            Swal.fire(
                                'Deleted!',
                                'Oil Spec has been Deleted.',
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