//creation de la classe

function Profile(nom="",age=0,ville="",email="",numero="000-000-000",Post="",date="",city="") {

    this.nom=nom;
    this.age=age;
    this.num=numero;
    this.city=city;
    this.email=email;
    this.post=Post;
    this.date= date;


}

let ch_mod_id= null

function Affichertout() {
    $("#data").empty();
    $.getJSON('https://656f2fa56529ec1c623781f8.mockapi.io/projet1/v1/chat')
        .done(function(items){
            items.forEach(function(chat) {
                let chatId = chat.id;
                $("#data").append(`
                    <tr data-id="${chatId}">
                        <td>${chat.nom}</td>
                        <td>${chat.age}</td>
                        <td>${chat.city}</td>
                        <td>${chat.email}</td>
                        <td>${chat.phone}</td>
                        <td>${chat.post}</td>
                        <td>${chat.Date}</td>
                        <td>
                            <button class="btn btn-success" data-bs-toggle="modal" data-bs-target="#userform"><i class="bi bi-eye"></i></button>
                            <button class="btn btn-danger" id="${chatId}"><i class="bi bi-trash"></i></button>


                        </td>
 
                    `);
            });
        })
        .fail(function(error){
            $('.alert').text(error.status).removeClass('d-none');
        });
}


function supprimer(id) {

    fetch('https://656f2fa56529ec1c623781f8.mockapi.io/projet1/v1/chat/'+id, {
        method: 'DELETE',
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        // handle error
    }).then(task => {
        // Do something with deleted task
    }).catch(error => {
        // handle error
    })


}

$(document).on('click', '.btn-danger', function() {
    // Get the closest 'tr' element, which represents the row
    let row = $(this).closest('tr');

    // Assuming you have a 'data-id' attribute on each row representing the chat id
    let chatId = row.attr('data-id');

    // Call the function to delete the item
    supprimer(chatId);

    // Remove the row from the HTML
    row.remove();
});
$(document).on('click', '.btn-success', function() {
    // Get the closest 'tr' element, which represents the row
    let row = $(this).closest('tr');

    // Assuming you have a 'data-id' attribute on each row representing the chat id
    let chatId = row.attr('data-id');
    ch_mod_id= chatId;
    // Call the function to delete the item
    affichermodifier(chatId);
});



$(document).ready(function() {
    // Your jQuery code here
    Affichertout()
});

$("#myform").on("submit", function(event) {


    let prof = new Profile();
    prof.nom = $("#name").val();
    prof.age = $("#age").val();
    prof.post = $("#post").val();
    prof.num =  $("#phone").val();
    prof.email = $("#email").val();
    prof.city = $("#city").val();

    fetch('https://656f2fa56529ec1c623781f8.mockapi.io/projet1/v1/chat', {
        method: 'POST',
        headers: {'content-type':'application/json'},
        body: JSON.stringify(prof)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Network response was not ok.');
    }).then(task => {
        Affichertout();
    }).catch(error => {
        console.error('Error during fetch operation:', error);
    });
    Affichertout();

});

//formulaire modifier
function affichermodifier(chatId) {
    $('#data tr').each(function () {
        num = 0;
        // Check if the current row has the desired data-id
        if ($(this).attr('data-id') === chatId) {
            $(this).find('td:not(:last-child)').each(function () {
                let originalText = $(this).text().trim();
                let inputId = `input_${chatId}_${num}`;
                // Get the value of the input
                updateValue(chatId,inputId, originalText); // Call a function to update the corresponding element
                num++;
            });
        }
    });
}

function updateValue(chatId,inputId, inputValue) {
    // Update the corresponding element based on the inputId
    switch (inputId) {
        case `input_${chatId}_0`:
            $("#name").val(inputValue);
            break;
        case `input_${chatId}_1`:
            $("#age").val(inputValue);
            break;
        case `input_${chatId}_2`:
            $("#city").val(inputValue);
            break;
        case `input_${chatId}_3`:
            $("#email").val(inputValue);
            break;
        case `input_${chatId}_4`:
            $("#phone").val(inputValue);
            break;
        case `input_${chatId}_5`:
            $("#post").val(inputValue);
            break;
        case `input_${chatId}_6`:
            $("#start").val(inputValue);
            break;


    }
}


//modifier
function modifier(id) {
    event.preventDefault();
    let marc = new Profile()
    marc.nom = $("#name").val();
    marc.age = $("#age").val();
    marc.post = $("#post").val();
    marc.num =  $("#phone").val();
    marc.email = $("#email").val();
    marc.city = $("#city").val();


    fetch('https://656f2fa56529ec1c623781f8.mockapi.io/projet1/v1/chat/' + id, {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify(marc)
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
        throw new Error('Network response was not ok.');
    }).then(task => {
        console.log('Server response:', task); // Log server response for debugging
        Affichertout();
    }).catch(error => {
        console.error('Error during fetch operation:', error);
    });
}

$("#mod").on("click", function () {
    // Call the function to modify the item
    modifier(ch_mod_id);
});
