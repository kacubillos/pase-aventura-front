<template>
  <div class="position-relative" style="margin-top: 1.5%;">
    <div class="position-relative top-0 start-0">
      <h2>Compradores</h2>
      <p> Bienvenido a la pagina principal de compradores </p>

      <div class="row g-3 ">
        <div class="input-group mb-3 col-sm">

          <label class="input-group-text" for="inputGroupSelect01">
            <v-icon name="hi-solid-search"/>
          </label>

          <input type="text" class="form-control btn-sm" placeholder="" aria-label="Nombre de usuario"
            aria-describedby="basic-addon1">

          <button class="btn btn-outline-secondary" type="button" id="button-addon1">
            <v-icon name="hi-solid-search"/>
          </button>
        </div>

        <div class="dropdown col-sm ">
          <a class="btn btn-secondary dropdown-toggle" href="#" role="button" id="dropdownMenuLink"
            data-bs-toggle="dropdown" aria-expanded="false">
            filtros
            <v-icon name="la-filter-solid"/>
          </a>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuLink" style="fo">
            <li><a class="dropdown-item" href="#">Id</a></li>
            <li><a class="dropdown-item" href="#">FNombre</a></li>
            <li><a class="dropdown-item" href="#">Apellido</a></li>
            <li><a class="dropdown-item" href="#">Fecha de nacimiento</a></li>
            <li><a class="dropdown-item" href="#">Fecha de registro</a></li>
          </ul>
        </div>
      </div>


    </div>
    <div class="position-absolute top-0 end-0">
      <router-link to="/compradores/nuevo" class="btn btn-primary mb-3">
        <v-icon name="bi-plus-lg"/>
        Nuevo comprador
      </router-link>
    </div>
  </div>
  <div>
    <div class="table-responsive-xl">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nombres</th>
            <th scope="col">Apellidos</th>
            <th scope="col">Fecha nacimiento</th>
            <th scope="col">Fecha registro</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr>

          </tr>
        </tbody>

      </table>
    </div>
  </div>

  <div>
    <nav aria-label="Page navigation example">
      <ul class="pagination justify-content-center">
        <li class="page-item disabled">
          <a class="page-link">Anterior</a>
        </li>
        <li class="page-item"><a class="page-link" href="#">1</a></li>
        <li class="page-item"><a class="page-link" href="#">2</a></li>
        <li class="page-item"><a class="page-link" href="#">3</a></li>
        <li class="page-item">
          <a class="page-link" href="#">Siguiente</a>
        </li>
      </ul>
    </nav>
  </div>
</template>
  