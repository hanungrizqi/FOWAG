//scanner QRCODE
$("#idLabelPreview").hide();

var scanner = new Instascan.Scanner({ video: document.getElementById('preview'), scanPeriod: 5, mirror: false });
scanner.addListener('scan', function (content) {
    stopKamera()
    $("#qrPreview").hide();
    $("#idLabelPreview").show();
    //var div = document.getElementById('idLabelPreview');
    //div.innerHTML += 'Lab Number : ' + content;
    var dataScan = `<div class="form-group row">
                    <label class="col-12" for="txt_labnumber">Lab Number</label>
                    <div class="col-md-12">
                         <input type="text" class="form-control" id="txt_labnumber" name="txt_labnumber" value="${content}" disabled>
                    </div>
                    </div>`;
    $("#idLabelPreview").append(dataScan);
});

function closeModal() {
    stopKamera();
    $("#idLabelPreview").empty();
}

function stopKamera() {
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.stop(cameras[0]);
        } else {
            Swal.fire(
                'Error!',
                'No Cameras Found',
                'Error'
            );
        }
    }).catch(function (e) {
        Swal.fire(
            'Error!',
            'Message : ' + e,
            'Error'
        );
    });
}

function scanQR() {
    $("#qrPreview").show();
    Instascan.Camera.getCameras().then(function (cameras) {
        if (cameras.length > 0) {
            scanner.start(cameras[0]);
        } else {
            Swal.fire(
                'Error!',
                'No Cameras Found',
                'Error'
            );
        }
    }).catch(function (e) {
        Swal.fire(
            'Error!',
            'Message : ' + e,
            'Error'
        );
    });
}

//Update Status

function updateStatus() {
    var labnumber = $("#txt_labnumber").val();
    $.ajax({
        url: $("#web_link").val() + "/api/SampleDueDate/Update_status?labnumber=" + labnumber, //URI
        type: "POST",
        success: function (data) {
            if (data.Remarks == false) {
                Swal.fire(
                    'Error!',
                    'Message :' + data.Message,
                    'Error'
                );
            }
            if (data.Remarks == true) {
                Swal.fire(
                    'Updated!',
                    'Status has been Updated.',
                    'success'
                );
                tableSent.ajax.reload();
            }
        },
        error: function (xhr) {
            alert(xhr.responseText);
        }
    })
}