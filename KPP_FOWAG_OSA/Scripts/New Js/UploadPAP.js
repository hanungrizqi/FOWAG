    var webLink = $("#web_link").val();
    var webApp = $("#web_app").val();

    function validateSize(input) {
        const fileSize = input.files[0].size / 1024 / 1024; // in MiB
        if (fileSize > 2) {
            alert('File size exceeds 2 MiB');
            // $(file).val(''); //for clearing with Jquery
        } else {
            // Proceed further
        }
    }

    function Upload() {
        $body = $("body");

        $(document).on({
            ajaxStart: function () { $body.addClass("loading"); },
            ajaxStop: function () { $body.removeClass("loading"); }
        });
        var stsFile = true;


        debugger;
        console.log("Upload")

        var formData = new FormData($("#form_id").get(0));
        var dokumen = document.getElementById("exFile");
        var dokumenFile = dokumen.files[0];
        selectElement = document.querySelector('#txt-format');
        output = selectElement.options[selectElement.selectedIndex].value;

        console.log(dokumenFile);
        debugger;

        const fileSize = dokumen.files[0].size / 1024 / 1024; // in MiB
        if (fileSize > 10) {
            alert("Ukuran File lebih dari max size 10 Mb");
            stsFile = false;
        } else {
            stsFile = true;
        }

        formData.append("list_create", dokumenFile);
        formData.append("formatlab", output);

        if (stsFile == true) {
            $.ajax({
                url: "/UploadPAP/UploadExcel",
                data: formData,
                type: 'POST',
                cache: false,
                contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
                processData: false, // NEEDED, DON'T OMIT THIS
                success: function (result) {
                    debugger;
                    if (result.Remarks == true) {
                        
                        var ListDup = result.listduplikasi;
                        var ListSuk = result.listsukses;
                        var tots = result.Totalsukses;
                        var totd = result.Totalduplikat;


                        if (result.Totalsukses > 0) {

                            if (result.Valid == true) {
                                alert("Upload Success" + "\n" + "Total Upload  = " + result.Totalsukses);
                                document.getElementById("list_invoice").value = null;
                                window.location.href = "/Uploader/Index";
                            }
                            else {
                                console.log(result.Message);
                                alert("Error");
                            }
                        }
                        else if (result.Totalduplikat > 0) {
                            alert("Gagal Upload, Ada Lab Number Duplikat " + result.Totalduplikat);
                            alert("Total Upload  = " + result.Totalsukses + "\n" + "Lab Number sukses = " + ListSuk);
                            alert("Total Duplikat  = " + result.Totalduplikat + "\n" + "Lab Number duplikat = " + ListDup);
                            window.location.href = "/Uploader/Index";
                        }

                    }
                    else {
                        alert("Upload Failed");
                        console.log(result.Message);
                    }
                    //if (result.Remarks == true) {

                    //    if (result.Valid == true) {

                    //        alert("Upload Succsess");
                    //        //window.location.href = "/Uploader/Index";
                    //    }
                    //    else {
                    //        alert("File upload harus format .xls");
                    //    }

                    //}

                    //else {
                    //    alert("Error: " + result.Message);
                    //    console.log(result.Message);
                    //}
                    // console.log("sudah");
                    window.location.href = "/UploadPAP/Index";

                },
                error: function (error) {

                }

            });
        }


    };