var webLink = $("#web_link").val();


// Function Setting Oil Brand

var tableSent = $("#tblOilBrand").DataTable({
    ajax: {
        url: webLink + "/api/Oil/Get_OilBrand",
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
        { data: 'Id_Brand' },
        { data: 'OilBrand' },
        {
            data: null,
            targets: 'no-sort', orderable: false,
            render: function (data, type, row) {
                return `<div class="btn-group">
                        <button type="button" value="${row.Id_Brand}" onclick="geteditOilBrand(this)" class="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="modal" data-target="#ModalEditOilBrand">
                        <i class="fa fa-pencil"></i>
                        </button>
                        <button type="button" value="${row.Id_Brand}" onclick="deleteOilBrand(this)" class="btn btn-sm btn-secondary js-tooltip-enabled" data-toggle="tooltip" title="Delete">
                        <i class="fa fa-times"></i>
                        </button>
                        </div>`
            }
        }
    ],
});

function addOilBrand() {
    var obj = new Object();
    obj.oilBrand = $("#oilBrand").val();
    $.ajax({
        url: webLink + "/api/Oil/Create_OilBrand", //URI
        data: JSON.stringify(obj),
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
    //$('#oilBrand').empty();
    document.getElementById('oilBrand').value = null;

}

function geteditOilBrand(id) {
    var idBrand = id.value;
    $.ajax({
        url: webLink + "/api/Oil/Get_OilBrand_ByID?id=" + idBrand, //URI
        success: function (result) {
            document.getElementById('editoilBrand').value = result.Data.OilBrand;
            document.getElementById('idUpdate_oilBrand').value = result.Data.Id_Brand;
        }
    })
}

function editOilBrand() {
    var obj = new Object();
    obj.OilBrand = $("#editoilBrand").val();
    obj.Id_Brand = $("#idUpdate_oilBrand").val();
    $.ajax({
        url: webLink + "/api/Oil/Update_OilBrand", //URI
        data: JSON.stringify(obj),
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

function deleteOilBrand(Id) {
    var idBrand = Id.value;
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
                url: webLink + "/api/Oil/Delete_OilBrand?id=" + idBrand, //URI
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