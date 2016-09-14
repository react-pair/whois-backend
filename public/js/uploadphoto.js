var $photo = $('.fileinput-preview');
var $SubmitButton =$('#btn-edit');
var $profileImg = $('.fileinput-preview')

$SubmitButton.on('click',function(){
if($('.fileinput-preview').val()!='') {
var formData = new FormData();
formData.append('file', $(this)[0].files[0]);
$.ajax({
    url: 'mongodb://localhost/whois',
    type: 'POST',
    data: formData,
    async: false,
    success: function (r) {
    if(r.success) {
      alert('sucessful upload');
      $profileImg.addClass('fileinput-preview');
    //success work
     }
    },
    cache: false,
    contentType: false,
    processData: false
});

}

});
