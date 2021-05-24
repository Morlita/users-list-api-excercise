
const usersList  = document.querySelector('#users-list');
const singleUser = document.querySelector('#container-usuario');

// Solo se ejecuta on load del index.html
const listarUsuarios = (page) => {
    usersList.innerHTML = '';

    const usersFromApi = $.getJSON(`https://reqres.in/api/users?page=${page}`, function (data) {
        console.log(data.data); // me gusta ver el objeto o array cuando trabajo

        // Agrego una fila de la tabla por cada usuario
        usersFromApi.responseJSON.data.forEach(function (elem) {

            const firstName = `${elem.first_name}`;
            const lastName  = `${elem.last_name}`;
            const avatar    = `${elem.avatar}`;
            const email     = `${elem.email}`;
            const id        = `${elem.id}`;

            // Agrego los parametros que quiero mandar a la url de destino
            const myUrl = `single-user.html?name=${firstName}&lastname=${lastName}&avatar=${avatar}&id=${id}&email=${email}`;

            usersList.innerHTML += `
            <tr class="h4">
                <th scope="row"><a href="${myUrl}">${id}</a></th>
                <td><a href="${myUrl}">${firstName}</a></td>
                <td><a href="${myUrl}">${lastName}</a></td>
                <td><a href="${myUrl}"><img src="${avatar}" alt="" class= "img-fluid"></td>
            </tr>        
            `
        })
    })
}

// Solo se ejecuta on load del single-user.html
const singleUsuario = () => {

    // Sacar el string y los parametros de la url
    const urlString   = window.location.search;
    const myUrlParams = new URLSearchParams(urlString);
    const firstName  = myUrlParams.get('name');
    const lastName   = myUrlParams.get('lastname');
    const avatar     = myUrlParams.get('avatar');
    const email      = myUrlParams.get('email')
    const id         = myUrlParams.get('id');

    // Numero de usuario para el span del título
    const numUsuario = document.querySelector('#num-usuario');
    numUsuario.textContent = `${id}`

    // Crear la tarjeta del usuario
    singleUser.innerHTML += `
        <div class="card bg-dark text-white shadow m-auto mt-3" style="width: 18rem;">
            <img class="card-img-top" src="${avatar}" alt="Card image cap">
            <div class="card-body">
                <h5 class="card-title">${firstName} ${lastName}</h5>
                <p>${email}</p>
            </div>
        </div>
    `
}